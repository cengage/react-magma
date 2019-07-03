export default function reactMagmaDom({ types: t, template }) {
  const buildRequire = template(`import {IMPORT_NAME} from 'SOURCE'`);

  const removeNamespaces = (namespace, importPath) => {
    if (namespace.referenced) {
      const namespaceNames = namespace.referencePaths.map(path => {
        const name = path.container.property.name;
        const type = path.container.type;
        path.parentPath.replaceWith(
          type === 'JSXMemberExpression'
            ? t.JSXIdentifier(name)
            : t.identifier(name)
        );
        if (
          (path.parentPath.container.type === 'JSXMemberExpression' ||
            path.parentPath.container.type === 'MemberExpression') &&
          path.parentPath.container.object.name === 'Icons'
        ) {
          const name = path.parentPath.container.property.name;
          path.parentPath.parentPath.replaceWith(
            type === 'JSXMemberExpression'
              ? t.JSXIdentifier(name)
              : t.identifier(name)
          );
          return { name, path: `${importPath}/Icons/type` };
        }
        return { name };
      });
      const uniqueNames = [...new Set(namespaceNames)];

      return uniqueNames.map(({ name, path }) => {
        return buildRequire({
          IMPORT_NAME: t.identifier(name),
          SOURCE: `${path || importPath}/${name}`
        });
      });
    }
  };

  return {
    visitor: {
      ImportDeclaration(path) {
        if (path.node.source.value === 'react-magma-dom') {
          const specifiers = path.node.specifiers;
          const names = specifiers.map(specifier => {
            const specifierLocalName = specifier.local.name;
            const specifierType = specifier.type;
            let importPathString = 'react-magma-dom/dist/components';
            if (specifierType === 'ImportSpecifier') {
              const specifierImportedName = specifier.imported.name;
              if (specifierImportedName === 'GlobalStyles') {
                importPathString = 'react-magma-dom/dist/theme';
              }

              if (specifierImportedName === 'Icons') {
                const namespace = path.scope.bindings[specifierLocalName];

                return removeNamespaces(
                  namespace,
                  `${importPathString}/Icons/type`
                );
              }

              if (specifierImportedName !== specifierLocalName) {
                const namespace = path.scope.bindings[specifierLocalName];

                namespace.referencePaths.map(path => {
                  path.replaceWith(t.JSXIdentifier(specifierImportedName));
                });
              }

              return buildRequire({
                IMPORT_NAME: t.identifier(specifierImportedName),
                SOURCE: `${importPathString}/${specifierImportedName}`
              });
            } else if (
              specifierType === 'ImportNamespaceSpecifier' ||
              specifierType === 'ImportDefaultSpecifier'
            ) {
              const namespace = path.scope.bindings[specifierLocalName];

              return removeNamespaces(namespace, importPathString);
            }
          });

          path.replaceWithMultiple([].concat.apply([], names));
        }
      }
    }
  };
}
