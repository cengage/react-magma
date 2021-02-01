// import SVGO from 'svgo';
// import rimraf from 'rimraf';
var queue = require('fastq');
const fg = require('fast-glob');
const path = require('path');
const SVGO = require('svgo');
const fse = require('fs-extra');
const xml2js = require('xml2js');
const iconMap = {};

const v2aliases = [
  `export { ExpandMoreIcon as AngleDownIcon} from './icons/Navigation/ExpandMoreIcon';`,
  `export { ArrowBackIosIcon as AngleLeftIcon} from './icons/Navigation/ArrowBackIosIcon';`,
  `export { ArrowForwardIosIcon as AngleRightIcon} from './icons/Navigation/ArrowForwardIosIcon';`,
  `export { ExpandLessIcon as AngleUpIcon} from './icons/Navigation/ExpandLessIcon';`,
  `export { SortDoubleArrowIcon as ArrowDoubleIcon} from './icons/Navigation/SortDoubleArrowIcon';`,
  `export { SouthIcon as ArrowDown2Icon} from './icons/Navigation/SouthIcon';`,
  `export { WestIcon as ArrowLeft2Icon} from './icons/Navigation/WestIcon';`,
  `export { EastIcon as ArrowRight2Icon} from './icons/Navigation/EastIcon';`,
  `export { NorthIcon as ArrowUp2Icon} from './icons/Navigation/NorthIcon';`,
  `export { BlockIcon as BlockedIcon} from './icons/Content/BlockIcon';`,
  `export { EventIcon as CalendarIcon} from './icons/Actions/EventIcon';`,
  `export { ArrowDropDownIcon as CaretDownIcon} from './icons/Navigation/ArrowDropDownIcon';`,
  `export { ArrowLeftIcon as CaretLeftIcon} from './icons/Navigation/ArrowLeftIcon';`,
  `export { ArrowRightIcon as CaretRightIcon} from './icons/Navigation/ArrowRightIcon';`,
  `export { ArrowDropUpIcon as CaretUpIcon} from './icons/Navigation/ArrowDropUpIcon';`,
  `export { CloseIcon as CrossIcon} from './icons/Navigation/CloseIcon';`,
  `export { InfoIcon as Info2Icon} from './icons/Actions/InfoIcon';`,
  `export { ErrorIcon as Notification2Icon} from './icons/Alert/ErrorIcon';`,
  `export { ErrorOutlineIcon as NotificationIcon} from './icons/Alert/ErrorOutlineIcon';`,
  `export { HelpOutlineIcon as QuestionCircleOIcon} from './icons/Actions/HelpOutlineIcon';`,
  `export { SearchIcon as Search2Icon} from './icons/Actions/SearchIcon';`,
  `export { ScheduleIcon as ClockIcon } from './icons/Actions/ScheduleIcon';`,
];

const addIcon = (group, name) => {
  iconMap[group] = [...(iconMap[group] || []), name];
};

function componentName(group, str) {
  const prefix = str.match(/^\d/) ? group : '';
  let arr = [prefix, ...str.split(/[-_]/)];
  let capital = arr.map(
    (item, index) => item.charAt(0).toUpperCase() + item.slice(1).toLowerCase()
  );
  return [...capital, 'Icon'].join('');
}

const svgo = new SVGO({
  floatPrecision: 4,
  plugins: [
    { cleanupAttrs: true },
    { removeDoctype: true },
    { removeXMLProcInst: true },
    { removeComments: true },
    { removeMetadata: true },
    { removeTitle: true },
    { removeDesc: true },
    { removeUselessDefs: true },
    { removeXMLNS: true },
    { removeEditorsNSData: true },
    { removeEmptyAttrs: true },
    { removeHiddenElems: true },
    { removeEmptyText: true },
    { removeEmptyContainers: true },
    { removeViewBox: true },
    { cleanupEnableBackground: true },
    { minifyStyles: true },
    { convertStyleToAttrs: true },
    { convertColors: true },
    { convertPathData: true },
    { convertTransform: true },
    { removeUnknownsAndDefaults: true },
    { removeNonInheritableGroupAttrs: true },
    {
      removeUselessStrokeAndFill: {
        // https://github.com/svg/svgo/issues/727#issuecomment-303115276
        removeNone: true,
      },
    },
    { removeUnusedNS: true },
    { cleanupIDs: true },
    { cleanupNumericValues: true },
    { cleanupListOfValues: true },
    { moveElemsAttrsToGroup: true },
    { moveGroupAttrsToElems: true },
    { collapseGroups: true },
    { removeRasterImages: true },
    { mergePaths: true },
    { convertShapeToPath: true },
    { sortAttrs: true },
    { removeDimensions: true },
    { removeAttrs: true },
    { removeElementsByAttr: true },
    { removeStyleElement: true },
    { removeScriptElement: true },
  ],
});

const getPaths = (defs = [], use = []) => {
  return defs
    .map(d => {
      return (
        d.path &&
        d.path.reduce(
          (acc, c) => {
            const { d, id } = c['$'];
            const transform = use
              .filter(u => u['$'].xlinkHref === `#${id}`)
              .map(u => u['$'].transform)[0];
            return { paths: [...acc.paths, { d, transform }] };
          },
          { paths: [] }
        )
      );
    })
    .reduce((acc, cur) => {
      return [...acc, cur && cur.paths];
    }, [])
    .reduce((accumulator, currentValue) => accumulator.concat(currentValue), [])
    .filter(a => a);
};

const getCircles = (defs = []) => {
  return defs
    .map(d => {
      return (
        d.circle &&
        d.circle.reduce(
          (acc, c) => {
            const { cx, cy, r } = c['$'];
            return { circles: [...acc.circles, { cx, cy, r }] };
          },
          { circles: [] }
        )
      );
    })
    .reduce((acc, cur) => {
      return [...acc, cur && cur.circles];
    }, [])
    .reduce((accumulator, currentValue) => accumulator.concat(currentValue), [])
    .filter(a => a);
};

const getNames = path => {
  return path.split(/[/.]/).slice(-3);
};

const getIconFile = (icon, name) => `import * as React from 'react';
import { IconProps } from '../../IconProps';
import { renderIcon } from '../../SvgIcon';
const iconType = ${JSON.stringify(icon, null, 2)};

export const ${name} = (props: IconProps) => renderIcon(props, iconType);
`;

const worker = async (svgPath, cb) => {
  const [groupName, iconName] = getNames(svgPath);
  addIcon(groupName, componentName(groupName, iconName));

  const input = await fse.readFile(svgPath, { encoding: 'utf8' });
  const result = await svgo.optimize(input);

  let paths = result.data
    .replace(/fill-opacity=/g, 'fillOpacity=')
    .replace(/xlink:href=/g, 'xlinkHref=')
    .replace(/clip-rule=/g, 'clipRule=')
    .replace(/fill-rule=/g, 'fillRule=')
    .replace(/ clip-path=".+?"/g, '')
    .replace(/<clipPath.+?<\/clipPath>/g, '');

  xml2js.parseString(
    paths,
    { mergeAttrs: false },
    async (
      err,
      { svg: { viewBox, width, height, defs, use = [], path: sPath }, svg }
    ) => {
      try {
        const svgJson = {
          viewBox,
          width,
          height,
          paths: getPaths(defs || [{ path: sPath }], use),
          circles: getCircles(defs),
        };
        await fse.mkdirp(path.join(__dirname, `../src/icons/${groupName}`));
        await fse.writeFile(
          path.join(
            __dirname,
            `../src/icons/${groupName}/${componentName(
              groupName,
              iconName
            )}.tsx`
          ),
          getIconFile(svgJson, componentName(groupName, iconName))
        );
      } catch (e) {
        console.log(svgPath, e.message, JSON.stringify(defs, null, 2));
      }
    }
  );
  cb(null, 'paths');
};

const writeGroupIndexes = () => {
  fse.writeFile(
    path.join(__dirname, `../src/index.ts`),
    [
      `export { IconProps } from './IconProps';`,
      `export { SvgIcon } from './SvgIcon';`,
      ...v2aliases,
      ...Object.keys(iconMap).map(group => `export * from './icons/${group}';`),
      `export { categories } from './categories';`,
    ].join('\n')
  );

  Object.keys(iconMap).forEach(group => {
    fse.writeFile(
      path.join(__dirname, `../src/icons/${group}/index.ts`),
      iconMap[group]
        .map(icon => `export { ${icon} } from './${icon}';`)
        .join('\n')
    );
  });

  fse.writeFile(
    path.join(__dirname, `../src/icons/categories.ts`),
    `export const categories = ${JSON.stringify(iconMap, null, 2)}`
  );
};

fse.removeSync(path.join(__dirname, `../src/icons`));
const q = queue(worker, 8);
q.drain = () => {
  writeGroupIndexes();
};

const icons = fg.sync(path.join(__dirname, '../src/svg/icons/**/*.svg'));
icons.forEach(icon =>
  q.push(icon, function(err, result) {
    if (err) {
      throw err;
    }
  })
);
