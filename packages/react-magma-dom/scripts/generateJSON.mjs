import fs from 'fs';
import { mkdirp } from 'mkdirp';
import * as TypeDoc from 'typedoc';
import typescript from 'typescript';

mkdirp('dist');

// specifically point to tsconfig, otherwise TypeDoc fails
const tsconfig = typescript.findConfigFile(
  '../tsconfig.json', // Changed from tsconfig.js to tsconfig.json
  typescript.sys.fileExists
);
const outPath = './dist/properties.json';
const inPath = ['./src/components', './src/hooks'];
// Exclude story files to reduce warnings
const excludePatterns = ['**/*.stories.tsx', '**/*.stories.ts'];

const defaultDescriptions = {
  children: 'The content of the component',
  isInverse:
    'If true, the component will have inverse styling to better appear on a dark background',
};

const defaultDefaults = {
  isInverse: 'false',
};

const generateJson = async () => {
  // Create a new TypeDoc application
  const app = await TypeDoc.Application.bootstrapWithPlugins({
    entryPoints: inPath,
    tsconfig: tsconfig,
    emit: 'both',
    excludeExternals: true,
    excludeInternal: true,
    skipErrorChecking: true,
    entryPointStrategy: 'expand',
    exclude: excludePatterns,
    validation: {
      notExported: false,
      invalidLink: false,
      notDocumented: false,
    },
    blockTags: ['@children', '@false', '@default', '@deprecated'],
  });

  console.log('TypeDoc app initialized successfully');

  // Convert the project using the current API
  const project = await app.convert();

  if (!project) {
    console.error('Project conversion failed!');
    throw new Error('Failed to convert TypeDoc project');
  }

  console.log('Project converted successfully, writing JSON...');

  await app.generateJson(project, outPath);

  // Verify the file was created
  if (!fs.existsSync(outPath)) {
    throw new Error(`TypeDoc failed to generate the output file: ${outPath}`);
  }

  console.log(`Successfully generated TypeDoc JSON at ${outPath}`);
};

const filterJson = () => {
  const jsonOrig = JSON.parse(fs.readFileSync(outPath, 'utf8'));

  console.log('Processing TypeDoc JSON output...');

  const findById = id => {
    return jsonOrig.children
      .flatMap(child => child.children)
      .filter(child => child && child.id === id)
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
    console.log(
      `Cleaning children, current count: ${children ? children.length : 0}`
    );

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

  // Filter functions adapted for the new schema
  const filterEmotion = definition =>
    definition &&
    definition.name !== 'css' &&
    definition.type !== 'InterpolationWithTheme';

  const filterReactDefinitions = definition => {
    if (!definition || !definition.sources || !definition.sources.length) {
      return true;
    }

    return !definition.sources[0].fileName.includes(
      'node_modules/@types/react'
    );
  };

  const filterMotionDefinitions = definition => {
    if (!definition || !definition.sources || !definition.sources.length) {
      return true;
    }

    return !definition.sources[0].fileName.includes(
      'node_modules/framer-motion'
    );
  };

  const filterExtendedDefinitions = omitted => definition => {
    if (!definition || !definition.inheritedFrom) {
      return true;
    }
    const inheritedName = definition.inheritedFrom.name || '';

    return !omitted.includes(inheritedName.split('.')[0]);
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
  // Process interfaces/type aliases into the exact same format as the original function
  const jsonFinal = jsonOrig.children
    .flatMap(child => child.children)
    .filter(child => child && (child.kind === 256 || child.kind === 4194304))
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

  console.log(`Filtered JSON contains ${jsonFinal.length} properties`);
  fs.writeFileSync(outPath, JSON.stringify(jsonFinal, null, 2));
};

generateJson()
  .then(() => {
    console.log('JSON generation complete, now filtering...');
    filterJson();
  })
  .catch(error => {
    console.error('Error during JSON generation:', error);
  });
