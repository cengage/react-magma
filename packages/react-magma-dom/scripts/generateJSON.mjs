import fs from 'fs';
import { mkdirp } from 'mkdirp';
import * as TypeDoc from 'typedoc';
import typescript from 'typescript';

mkdirp('dist');

const tsconfig = typescript.findConfigFile(
  '../tsconfig.json',
  typescript.sys.fileExists
);
const outPath = './dist/properties.json';
const inPath = ['./src/components', './src/hooks'];

const defaultDescriptions = {
  children: 'The content of the component',
  isInverse:
    'If true, the component will have inverse styling to better appear on a dark background',
};

const defaultDefaults = {
  isInverse: 'false',
};

const generateJson = async () => {
  const app = await TypeDoc.Application.bootstrapWithPlugins({
    tsconfig,
    entryPoints: inPath,
    entryPointStrategy: 'expand',
    includeDeclarations: true,
    excludeExternals: true,
    stripInternal: true,
    ignoreCompilerErrors: true,
  });

  const project = await app.convert();

  if (project) {
    const json = app.serializer.projectToObject(project);
    fs.writeFileSync(outPath, JSON.stringify(json, null, 2));
  }
};

const filterJson = () => {
  const jsonOrig = JSON.parse(fs.readFileSync(outPath, 'utf8'));
  // console.log(JSON.stringify(jsonOrig, null, 2))

  const findById = id => {
    return jsonOrig.children
      .flatMap(child => child.children)
      .filter(child => child && child.id === id)
      .pop();
  };
  const findByName = name => {
    return jsonOrig.children
      .flatMap(child => child.children)
      .filter(child => child.name === name)
      .pop();
  };

  const sortObject = unordered => {
    const ordered = {};

    Object.keys(unordered)
      .sort()
      .forEach(function (key) {
        ordered[key] = unordered[key];
      });

    return ordered;
  };

  const cleanChildren = (children, acc = {}) => {
    if (!children) return acc;

    return sortObject(
      children
        .filter(a => a)
        .filter(filterReactDefinitions)
        .filter(filterMotionDefinitions)
        .filter(filterEmotion)
        .filter(filterExtendedDefinitions(['BasePaginationProps']))
        .reduce(formatChild, acc)
    );
  };

  const findType = ({ type, id, name, elementType = {}, types = [] }) => {
    name = name || elementType.name;
    let suffix = '';

    if (type === 'array') {
      suffix = '[]';
    }
    if (type === 'union') {
      name = types.map(type => type.name).join(' | ');
    }
    if (type === 'reference') {
      const referenceType = findById(id);

      if (referenceType && referenceType.kindString === 'Enumeration') {
        return {
          name: 'enum',
          options: referenceType.children.map(
            child => `${referenceType.name}.${child.name}`
          ),
        };
      }
    }

    name = name === 'T' ? 'Generic' : name;

    return { name: `${name || 'function'}${suffix}` };
  };

  const filterEmotion = definition =>
    definition.type !== 'InterpolationWithTheme' && definition.name !== 'css';

  const filterReactDefinitions = definition =>
    definition.sources[0].fileName !== 'node_modules/@types/react/index.d.ts';

  const filterMotionDefinitions = definition =>
    !definition.sources[0].fileName.startsWith(
      'node_modules/framer-motion/types'
    );

  const filterExtendedDefinitions = omitted => definition => {
    return !omitted.includes(
      definition.inheritedFrom && definition.inheritedFrom.name.split('.')[0]
    );
  };

  const formatTags = (tags = []) => {
    return tags.reduce((acc, { tag, text }) => {
      return { [tag]: text.trim(), ...acc };
    }, {});
  };

  const formatChild = (acc, child) => {
    const tags = formatTags((child.comment && child.comment.tags) || []);

    if (child && child.type) {
      return {
        ...acc,
        [child.name]: {
          name: child.name,
          required: child.flags && !child.flags.isOptional,
          type: findType(child.type),
          description:
            (child.comment && child.comment.shortText) ||
            defaultDescriptions[child.name],
          defaultValue: defaultDefaults[child.name] || tags.default,
          deprecated: !!tags.deprecated,
        },
      };
    }

    return {};
  };

  const jsonFinal = jsonOrig.children
    .flatMap(child => child.children)
    .filter(
      child =>
        child &&
        (child.kindString === 'Interface' || child.kindString === 'Type alias')
    )
    .reduce((acc, child) => {
      const {
        children,
        groups,
        sources,
        extendedTypes,
        extendedBy,
        id,
        ...rest
      } = child;

      let childAccumulator = {};
      const tags = formatTags((child.comment && child.comment.tags) || []);

      if (tags.children) {
        childAccumulator = formatChild(childAccumulator, {
          ...child.children
            .filter(child => child.name === 'children')
            .flatMap(child => {
              return {
                ...child,
                flags: {
                  ...child.flags,
                  isOptional: tags.children !== 'required',
                },
              };
            })[0],
        });
      }

      if (rest.type && rest.type.type === 'intersection') {
        return [
          ...acc,
          {
            ...rest,
            id: rest.name,
            properties: cleanChildren(
              rest.type.types.reduce((childAcc, childType) => {
                return childAcc.concat(findById(childType.id).children);
              }, []),
              childAccumulator
            ),
          },
        ];
      }

      return [
        ...acc,
        {
          ...rest,
          id: rest.name,
          tags,
          properties: cleanChildren(children, childAccumulator),
        },
      ];
    }, []);

  fs.writeFileSync(outPath, JSON.stringify(jsonFinal, null, 2));
};
// TODO: Uncomment the following lines to run the script
// generateJson();
// filterJson();
