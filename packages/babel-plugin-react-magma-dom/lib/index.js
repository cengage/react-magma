"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = reactMagmaDom;

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function reactMagmaDom(_ref) {
  var t = _ref.types,
      template = _ref.template;
  var buildRequire = template("import {IMPORT_NAME} from 'SOURCE'");

  var removeNamespaces = function removeNamespaces(namespace, importPath) {
    if (namespace.referenced) {
      var namespaceNames = namespace.referencePaths.map(function (path) {
        var name = path.container.property.name;
        var type = path.container.type;
        path.parentPath.replaceWith(type === 'JSXMemberExpression' ? t.JSXIdentifier(name) : t.identifier(name));

        if ((path.parentPath.container.type === 'JSXMemberExpression' || path.parentPath.container.type === 'MemberExpression') && path.parentPath.container.object.name === 'Icons') {
          var _name = path.parentPath.container.property.name;
          path.parentPath.parentPath.replaceWith(type === 'JSXMemberExpression' ? t.JSXIdentifier(_name) : t.identifier(_name));
          return {
            name: _name,
            path: "".concat(importPath, "/Icons/type")
          };
        }

        return {
          name: name
        };
      });

      var uniqueNames = _toConsumableArray(new Set(namespaceNames));

      return uniqueNames.map(function (_ref2) {
        var name = _ref2.name,
            path = _ref2.path;
        return buildRequire({
          IMPORT_NAME: t.identifier(name),
          SOURCE: "".concat(path || importPath, "/").concat(name)
        });
      });
    }
  };

  return {
    visitor: {
      ImportDeclaration: function ImportDeclaration(path) {
        if (path.node.source.value === 'react-magma-dom') {
          var specifiers = path.node.specifiers;
          var names = specifiers.map(function (specifier) {
            var specifierLocalName = specifier.local.name;
            var specifierType = specifier.type;
            var importPathString = 'react-magma-dom/dist/components';

            if (specifierType === 'ImportSpecifier') {
              var specifierImportedName = specifier.imported.name;

              if (specifierImportedName === 'GlobalStyles') {
                importPathString = 'react-magma-dom/dist/theme';
              }

              if (specifierImportedName === 'Icons') {
                var namespace = path.scope.bindings[specifierLocalName];
                return removeNamespaces(namespace, "".concat(importPathString, "/Icons/type"));
              }

              if (specifierImportedName !== specifierLocalName) {
                var _namespace = path.scope.bindings[specifierLocalName];

                _namespace.referencePaths.map(function (path) {
                  path.replaceWith(t.JSXIdentifier(specifierImportedName));
                });
              }

              return buildRequire({
                IMPORT_NAME: t.identifier(specifierImportedName),
                SOURCE: "".concat(importPathString, "/").concat(specifierImportedName)
              });
            } else if (specifierType === 'ImportNamespaceSpecifier' || specifierType === 'ImportDefaultSpecifier') {
              var _namespace2 = path.scope.bindings[specifierLocalName];
              return removeNamespaces(_namespace2, importPathString);
            }
          });
          path.replaceWithMultiple([].concat.apply([], names));
        }
      }
    }
  };
}