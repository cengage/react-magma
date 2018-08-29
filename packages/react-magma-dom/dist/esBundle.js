import { Component, createElement, Fragment } from 'react';

var Button = function (_a) {
    var text = _a.text;
    return (createElement("button", null, text));
};

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */

/* global Reflect, Promise */

var extendStatics = function (d, b) {
  extendStatics = Object.setPrototypeOf || {
    __proto__: []
  } instanceof Array && function (d, b) {
    d.__proto__ = b;
  } || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
  };

  return extendStatics(d, b);
};

function __extends(d, b) {
  extendStatics(d, b);

  function __() {
    this.constructor = d;
  }

  d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function () {
  __assign = Object.assign || function __assign(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];

      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }

    return t;
  };

  return __assign.apply(this, arguments);
};

var ToggleCore =
/** @class */
function (_super) {
  __extends(ToggleCore, _super);

  function ToggleCore(props) {
    var _this = _super.call(this, props) || this;

    _this.handleToggle = _this.handleToggle.bind(_this);
    return _this;
  }

  ToggleCore.prototype.handleToggle = function () {
    this.setState(function (state) {
      return {
        isOn: !state.isOn
      };
    });
  };

  ToggleCore.prototype.render = function () {
    return this.props.children(__assign({}, this.state, this.props, {
      handleToggle: this.handleToggle
    }));
  };

  ToggleCore.state = {
    isOn: false
  };
  return ToggleCore;
}(Component);

var Toggle = function (props) { return (createElement(ToggleCore, null, function (_a) {
    var isOn = _a.isOn, handleToggle = _a.handleToggle;
    return (createElement(Fragment, null,
        createElement("input", { type: "checkbox", id: "check", onChange: handleToggle, checked: isOn }),
        createElement("label", { htmlFor: "check" },
            "Check: ",
            isOn ? 'On' : 'Off')));
})); };

export { Button, Toggle };
