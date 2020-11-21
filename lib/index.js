'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var reactNative = require('react-native');
var _ = require('lodash');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var ___default = /*#__PURE__*/_interopDefaultLegacy(_);

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

var objectWithoutProperties = function (obj, keys) {
  var target = {};

  for (var i in obj) {
    if (keys.indexOf(i) >= 0) continue;
    if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
    target[i] = obj[i];
  }

  return target;
};

var slicedToArray = function () {
  function sliceIterator(arr, i) {
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"]) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  return function (arr, i) {
    if (Array.isArray(arr)) {
      return arr;
    } else if (Symbol.iterator in Object(arr)) {
      return sliceIterator(arr, i);
    } else {
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    }
  };
}();

var THEME_KEYS_BY_PROPS = {
  margin: "space",
  marginTop: "space",
  marginRight: "space",
  marginBottom: "space",
  marginLeft: "space",
  padding: "space",
  paddingRight: "space",
  paddingLeft: "space",
  paddingTop: "space",
  paddingBottom: "space",

  fontSize: "fontSizes",

  color: "colors",
  backgroundColor: "colors",
  borderColor: "colors",

  fontFamily: "fonts",

  fontWeight: "fontWeights",

  lineHeight: "lineHeights",

  letterSpacing: "letterSpacings",

  width: "sizes",
  height: "sizes",
  minWidth: "sizes",
  maxWidth: "sizes",
  minHeight: "sizes",
  maxHeight: "sizes",

  borderWidth: "borderWidths",

  borderStyle: "borderStyles",

  borderRadius: "radii",

  zIndex: "zIndices"
};

var getStretchIndex = function getStretchIndex(breakpointIndex, propertyValSize) {
  var breakpointsSize = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 4;

  if (breakpointsSize !== 4) {
    return 0;
  }

  if (propertyValSize === 5) return breakpointIndex;

  if (propertyValSize === 1) return 0;

  if (propertyValSize === 4) {
    if (breakpointIndex === 4) return 3;
    return breakpointIndex;
  }

  var middle = breakpointsSize / 2;
  if (breakpointIndex < middle) return 0;
  if (breakpointIndex === middle) return 1;
  var lastIndex = propertyValSize - 1;

  return lastIndex;
};

var getWindowWidth = function getWindowWidth() {
  return reactNative.Dimensions.get("window").width;
};

function useWindowDimensions() {
  var _Dimensions$get = reactNative.Dimensions.get("window"),
      width = _Dimensions$get.width,
      height = _Dimensions$get.height;

  var _useState = React.useState({
    width: width,
    height: height,
    aspectRatio: width / height
  }),
      _useState2 = slicedToArray(_useState, 2),
      dimensions = _useState2[0],
      setDimensions = _useState2[1];

  var onChange = function onChange(_ref) {
    var _ref$window = _ref.window,
        width = _ref$window.width,
        height = _ref$window.height;

    setDimensions({ width: width, height: height, aspectRatio: width / height });
  };

  React.useEffect(function () {
    reactNative.Dimensions.addEventListener("change", onChange);
    return function () {
      reactNative.Dimensions.removeEventListener("change", onChange);
    };
  });

  return dimensions;
}

function osObjArg(_ref2) {
  var web = _ref2.web,
      ios = _ref2.ios,
      android = _ref2.android,
      native = _ref2.native;

  if (reactNative.Platform.OS === "web") return web;
  if (reactNative.Platform.OS === "ios" && !___default['default'].isNil(ios)) return ios;
  if (reactNative.Platform.OS === "android" && !___default['default'].isNil(android)) return android;
  return native;
}

function os(targets) {
  if (___default['default'].isPlainObject(targets)) return osObjArg(targets);

  if (!___default['default'].isArray(targets)) {
    console.error("Invalid call to os() with", targets);
    return targets;
  }

  if (targets.length === 2) return osObjArg({ web: targets[0], native: targets[1] });

  if (targets.length === 3) return osObjArg({ web: targets[0], ios: targets[1], android: targets[2] });

  console.error("Invalid call to os() with", targets);
  return targets[0];
}

var processBreakpoint = function processBreakpoint(breakpoint, attrs) {
    return ___default['default'].mapValues(attrs, function (attr) {
        if (!___default['default'].isArray(attr)) return attr;
        var stretchIndex = getStretchIndex(breakpoint, ___default['default'].size(attr));
        if (___default['default'].isArray(attr)) return attr[stretchIndex];
    });
};

var attrsAreArrays = function attrsAreArrays(attrs) {
    return !!___default['default'].find(attrs, function (attr) {
        return ___default['default'].isArray(attr);
    });
};
function processAttrs(breakpoints, attrs) {
    if (___default['default'].size(breakpoints) !== 4) {
        console.error("Theme breakpoints should be of length 4");
        return [];
    }

    if (!attrsAreArrays(attrs)) return attrs;
    var processedAttrs = [];
    ___default['default'].times(___default['default'].size(breakpoints) + 1, function (breakpoint) {
        processedAttrs[breakpoint] = processBreakpoint(breakpoint, attrs);
    });
    return processedAttrs;
}

var PROPERTY_CONFIG_NOT_IN_THEME = "PROPERTY_CONFIG_NOT_IN_THEME";
var breakpointsIsValid = function breakpointsIsValid(breakpoints) {
  if (___default['default'].size(breakpoints) !== 4) {
    console.error("Theme breakpoints should be of length 4. Given:", breakpoints);
    return false;
  }
  return true;
};

var getThemePropVal = function getThemePropVal(stylePropKey, theme) {
  var themeKey = THEME_KEYS_BY_PROPS[stylePropKey];
  if (!themeKey) return PROPERTY_CONFIG_NOT_IN_THEME;
  return theme[themeKey];
};

var processSingleStylePropVal = function processSingleStylePropVal(singleStylePropVal, themePropVal) {
  if (themePropVal === PROPERTY_CONFIG_NOT_IN_THEME) return singleStylePropVal;

  if (___default['default'].isString(singleStylePropVal) && singleStylePropVal.match(/px/)) {
    return Number(singleStylePropVal.replace("px", ""));
  }

  return themePropVal[singleStylePropVal] || singleStylePropVal;
};

var isValidStylePropValArray = function isValidStylePropValArray(stylePropValArray, theme) {
  var propertyValSize = ___default['default'].size(stylePropValArray);
  if (propertyValSize > ___default['default'].size(theme.breakpoints) + 1) {
    console.error("propertyVal should not have more elements than theme breakpoints", stylePropValArray);
    return false;
  }
  return true;
};

var processStyleProp = function processStyleProp(stylePropKey, stylePropVal, breakpoint, theme) {
  var themePropVal = getThemePropVal(stylePropKey, theme);

  if (!___default['default'].isArray(stylePropVal) && themePropVal === PROPERTY_CONFIG_NOT_IN_THEME) return stylePropVal;

  if (!___default['default'].isArray(stylePropVal)) return processSingleStylePropVal(stylePropVal, themePropVal);

  if (!isValidStylePropValArray(stylePropVal, theme)) return;

  var stretchIndex = getStretchIndex(breakpoint, ___default['default'].size(stylePropVal), ___default['default'].size(theme.breakpoints));

  return processSingleStylePropVal(stylePropVal[stretchIndex], themePropVal);
};

var processSingleStyle = function processSingleStyle(style, breakpoint, theme) {
  return ___default['default'].mapValues(style, function (property, stylePropKey) {
    var prop = processStyleProp(stylePropKey, property, breakpoint, theme);
    return prop;
  });
};

var processBreakpoint$1 = function processBreakpoint(oceanoStyles, breakpoint, theme) {
  return ___default['default'].mapValues(oceanoStyles, function (style) {
    return processSingleStyle(style, breakpoint, theme);
  });
};

var styleAreArrays = function styleAreArrays(style) {
  return !!___default['default'].find(style, function (s) {
    return ___default['default'].isArray(s);
  });
};

var stylesAreArray = function stylesAreArray(styles) {
  return !!___default['default'].find(styles, function (s) {
    return styleAreArrays(s);
  });
};
function processStyles(theme, styles) {
  if (!breakpointsIsValid(theme.breakpoints)) return;
  if (!stylesAreArray(styles)) return processBreakpoint$1(styles, 0, theme);
  return ___default['default'].map([0, 1, 2, 3, 4], function (breakpoint) {
    return processBreakpoint$1(styles, breakpoint, theme);
  });
}

function processStyle(theme, style) {
  if (!breakpointsIsValid(theme.breakpoints)) return;
  if (!styleAreArrays(style)) return processSingleStyle(style, 0, theme);

  return ___default['default'].map([0, 1, 2, 3, 4], function (index) {
    return processSingleStyle(style, index, theme);
  });
}

var defaultTheme = {
  colors: {
    primary: "#007BFF",
    secondary: "#6C757D",
    success: "#27A744",
    error: "#DD3446",
    warning: "#FFC106",
    red0: "rgb(128,0,0)",
    red1: "rgb(189,0,0)",
    red2: "rgb(255,0,0)",
    red3: "rgb(255,122,122)",
    light: "rgb(255,230,200)",
    turq0: "#e5fff9",
    turq1: "#a3ffea",
    turq2: "#a3ffeb"
  },
  breakpoints: [375, 768, 1024, 1680],
  borderWidths: [1, 2, 4, 8],
  fontSizes: [12, 14, 16, 20, 24, 32, 48, 64],
  space: [0, 3, 6, 12, 24, 48, 96],
  sizes: [0, 3, 6, 12, 24, 48, 96],
  fonts: {
    sans: "system-ui, sans-serif",
    mono: "Menlo, monospace"
  },
  fontWeights: {
    normal: "normal",
    medium: "500",
    bold: "bold"
  }
};
var ThemeContext = React__default['default'].createContext(defaultTheme);
var ThemeProvider = ThemeContext.Provider;
var ThemeConsumer = ThemeContext.Consumer;

var getBreakpoint = function getBreakpoint(breakpoints) {
  var width = getWindowWidth();

  if (width < breakpoints[0]) return 0;
  if (width < breakpoints[1]) return 1;
  if (width < breakpoints[2]) return 2;
  if (width < breakpoints[3]) return 3;

  return 4;
};

function arrayOrVal(x, index) {
  return ___default['default'].isArray(x) ? x[index] : x;
}

var useStyled = (function (_ref) {
  var _ref$styles = _ref.styles,
      styles = _ref$styles === undefined ? {} : _ref$styles,
      _ref$style = _ref.style,
      style = _ref$style === undefined ? {} : _ref$style,
      _ref$attrs = _ref.attrs,
      attrs = _ref$attrs === undefined ? {} : _ref$attrs;

  var myTheme = React.useContext(ThemeContext);
  var prevBreakpoint = getBreakpoint(myTheme.breakpoints);

  var objs = React.useMemo(function () {
    return {
      styles: processStyles(myTheme, styles),
      style: processStyle(myTheme, style),
      attrs: processAttrs(myTheme.breakpoints, attrs)
    };
  }, [0]);

  var getReturnProps = function getReturnProps(breakpoint) {
    return {
      styles: arrayOrVal(objs.styles, breakpoint),
      style: arrayOrVal(objs.style, breakpoint),
      attrs: arrayOrVal(objs.attrs, breakpoint),
      breakpoint: breakpoint,
      theme: myTheme
    };
  };

  var setIfChanged = function setIfChanged(breakpoint) {
    if (breakpoint === prevBreakpoint) return;

    prevBreakpoint = breakpoint;
    setReturnProps(getReturnProps(breakpoint));
  };

  var _useState = React.useState(getReturnProps(prevBreakpoint)),
      _useState2 = slicedToArray(_useState, 2),
      returnProps = _useState2[0],
      setReturnProps = _useState2[1];

  React.useLayoutEffect(function () {
    var handleWindowResize = function handleWindowResize() {
      var breakpoint = getBreakpoint(myTheme.breakpoints);
      setIfChanged(breakpoint);
    };

    reactNative.Dimensions.addEventListener("change", handleWindowResize);

    return function () {
      reactNative.Dimensions.removeEventListener("change", handleWindowResize);
    };
  }, [0]);

  return returnProps;
});

var styledSingle = function styledSingle(name, Component, singleStyle, attrs) {
  var Styled = function Styled(_ref) {
    var children = _ref.children,
        props = objectWithoutProperties(_ref, ["children"]);

    var _useStyled = useStyled({
      style: singleStyle,
      attrs: attrs
    }),
        style = _useStyled.style,
        attr = _useStyled.attrs;

    var myStyle = _extends({}, style, props.style);

    return React__default['default'].createElement(
      Component,
      _extends({}, attr, props, { style: myStyle }),
      children
    );
  };
  Styled.displayName = name || "Styled";
  return Styled;
};

var styledMultiple = function styledMultiple(name, Component, styles, attrs) {
  var Styled = function Styled(_ref2) {
    var children = _ref2.children,
        props = objectWithoutProperties(_ref2, ["children"]);

    var _useStyled2 = useStyled({ styles: styles, attrs: attrs }),
        style = _useStyled2.styles,
        attr = _useStyled2.attrs;

    var myStyle = {};

    ___default['default'].each(style, function (obj, key) {
      myStyle[key] = _extends({}, obj, props[key]);
    });

    return React__default['default'].createElement(
      Component,
      _extends({}, attr, props, myStyle),
      children
    );
  };
  Styled.displayName = name || "Styled";
  return Styled;
};

var getStyleKind = function getStyleKind(s) {
  var kind = "SINGLE";

  for (var prop0 in s) {
    if (___default['default'].isPlainObject(s[prop0])) kind = "MULTIPLE";
    break;
  }

  return kind;
};

var styledNamed = function styledNamed(name, C, s, a) {
  if (getStyleKind(s) === "MULTIPLE") return styledMultiple(name, C, s, a);
  return styledSingle(name, C, s, a);
};

function styled() {
  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  if (args[0] === "RCTView") {
    return styledNamed.apply(undefined, [""].concat(args));
  }

  if (___default['default'].isString(args[0])) {
    return styledNamed.apply(undefined, args);
  }

  return styledNamed.apply(undefined, [""].concat(args));
}

exports.ThemeContext = ThemeContext;
exports.ThemeProvider = ThemeProvider;
exports.defaultTheme = defaultTheme;
exports.os = os;
exports.styled = styled;
exports.useStyled = useStyled;
exports.useWindowDimensions = useWindowDimensions;
