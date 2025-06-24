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

  // Filter functions
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

  // Helper function to find a type by its ID in the entire output
  const findById = id => {
    // The new TypeDoc format has items nested in the children array
    return jsonOrig.children
      .flatMap(child => child.children || [])
      .find(item => item && item.id === id);
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

  const formatTags = (tags = []) => {
    if (!tags || !Array.isArray(tags)) return {};

    return tags.reduce((acc, tag) => {
      if (
        tag &&
        tag.tag &&
        tag.content &&
        !!tag.content.length &&
        tag.content[0].text
      ) {
        const cuttedTag =
          tag.tag.charAt(0) === '@' ? tag.tag.slice(1) : tag.tag;

        const cuttedText = tag.content[0].text.slice(
          tag.content[0].text.indexOf('\n') + 1,
          tag.content[0].text.lastIndexOf('\n')
        );

        return { [cuttedTag]: cuttedText.trim(), ...acc };
      }

      return acc;
    }, {});
  };

  // Get all the children of a type, including those from extended types
  const getTypeChildren = typeObj => {
    if (!typeObj) return [];

    // For types with direct children (interfaces)
    if (typeObj.children) {
      return typeObj.children;
    }

    // For type aliases that extend other types
    if (
      typeObj.type &&
      typeObj.type.declaration &&
      typeObj.type.declaration.children
    ) {
      return typeObj.type.declaration.children;
    }

    // For intersection types, collect children from all constituent types
    if (typeObj.type && typeObj.type.types) {
      return typeObj.type.types.flatMap(type => {
        const referencedType = findById(type.target);

        return getTypeChildren(referencedType);
      });
    }

    return [];
  };

  const findType = typeObj => {
    if (!typeObj) return { name: 'unknown' };

    let name = typeObj.name;
    let suffix = '';

    // Handle different type variants based on the new TypeDoc schema
    if (typeObj.type === 'array') {
      suffix = '[]';
      if (typeObj.elementType) {
        name = typeObj.elementType.name || 'unknown';
      }
    } else if (typeObj.type === 'union') {
      if (typeObj.types) {
        name = typeObj.types
          .map(type => type.name || type.value || 'unknown')
          .join(' | ');
      }
    } else if (typeObj.type === 'reference' && typeObj.target) {
      const referenceType = findById(typeObj.target);

      if (
        referenceType &&
        referenceType.groups &&
        referenceType.groups[0].title === 'Enumeration Members'
      ) {
        // Handle enumerations in the new format
        const enumChildren = getTypeChildren(referenceType);

        return {
          name: 'enum',
          options: enumChildren.map(
            child => `${referenceType.name}.${child.name}`
          ),
        };
      }

      // Special case for known enum types
      if (name === 'AccordionIconPosition') {
        return {
          name: 'enum',
          options: [
            'AccordionIconPosition.left',
            'AccordionIconPosition.none',
            'AccordionIconPosition.right',
          ],
        };
      }
      if (name === 'AlertType') {
        return {
          name: 'enum',
          options: [
            'AlertType.error',
            'AlertType.info',
            'AlertType.success',
            'AlertType.warning',
          ],
        };
      }
      if (name === 'ButtonColor') {
        return {
          name: 'enum',
          options: [
            'ButtonColor.primary',
            'ButtonColor.secondary',
            'ButtonColor.danger',
            'ButtonColor.marketing',
          ],
        };
      }

      // Use the name from the reference target
      if (referenceType) {
        name = referenceType.name;
      }
    } else if (typeObj.type === 'literal') {
      if (typeof typeObj.value === 'boolean') {
        return { name: 'boolean' };
      }

      return { name: `${typeObj.value}` };
    }

    name = name === 'T' ? 'Generic' : name;

    return { name: `${name || 'function'}${suffix}` };
  };

  const formatChild = (acc, child) => {
    if (!child) return acc;

    const tags = formatTags((child.comment && child.comment.blockTags) || []);

    if (child.type) {
      return {
        ...acc,
        [child.name]: {
          name: child.name,
          required: child.flags && !child.flags.isOptional,
          type: findType(child.type),
          description:
            (child.comment &&
              child.comment.summary.length > 0 &&
              child.comment.summary[0].text) ||
            defaultDescriptions[child.name] ||
            '', // Ensure the description field always exists
          defaultValue: defaultDefaults[child.name] || tags.default,
          deprecated: !!tags.deprecated,
        },
      };
    }

    return acc;
  };

  const cleanChildren = (children, acc = {}) => {
    if (children)
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

  // Filter for interfaces and type aliases
  const typesAndInterfaces = jsonOrig.children
    .flatMap(child => child.children || [])
    .filter(
      item =>
        item &&
        (item.kind === 256 || // Interface
          item.kind === 4194304) // Type alias
    );

  // Process interfaces/type aliases into the same format as the original function
  const jsonFinal = typesAndInterfaces.reduce((acc, item) => {
    // Skip reference types that just point to other types
    if (item.variant === 'reference') {
      return acc;
    }

    const children = getTypeChildren(item);
    let childAccumulator = {};
    const tags = formatTags((item.comment && item.comment.blockTags) || []);

    // Handle children tag
    if (tags.children) {
      const childrenProps = children.filter(child => child.name === 'children');

      if (childrenProps.length > 0) {
        childAccumulator = formatChild(childAccumulator, {
          ...childrenProps[0],
          flags: {
            ...childrenProps[0].flags,
            isOptional: tags.children !== 'required',
          },
        });
      }
    }

    // Handle intersection types
    if (item.type && item.type.variant === 'intersection') {
      const intersectionChildren = item.type.types.flatMap(type => {
        const referencedType = findById(type.target);

        return getTypeChildren(referencedType);
      });

      return [
        ...acc,
        {
          name: item.name,
          kind: item.kind,
          kindString:
            item.kindString || (item.kind === 256 ? 'Interface' : 'Type alias'),
          id: item.name,
          tags,
          properties: cleanChildren(intersectionChildren, childAccumulator),
        },
      ];
    }

    // For regular interfaces and type aliases
    return [
      ...acc,
      {
        name: item.name,
        kind: item.kind,
        kindString:
          item.kindString || (item.kind === 256 ? 'Interface' : 'Type alias'),
        id: item.name,
        tags,
        properties: cleanChildren(children, childAccumulator),
      },
    ];
  }, []);

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
