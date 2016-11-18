'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _vueProgressbar = require('./vue-progressbar.vue');

var _vueProgressbar2 = _interopRequireDefault(_vueProgressbar);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var dProgressbar = function dProgressbar() {
  var p = {
    $root: null,
    state: {
      pTime: null,
      settings: null,
      timer: null,
      hideTimer: null,
      hideTimer2: null,
      revertTimer: null,
      cut: 0,
      stages: null
    },
    log: function log(message) {
      return fLog(this, message);
    },
    init: function init(data) {
      return fInit(this, data);
    },
    start: function start(time) {
      return fStart(this, time);
    },
    set: function set(num) {
      return fSet(this, num);
    },
    get: function get() {
      return fGet(this);
    },
    increase: function increase(num) {
      return fIncrease(this, num);
    },
    decrease: function decrease(num) {
      return fDecrease(this, num);
    },
    readyToRevert: function readyToRevert() {
      return fReadyToRevert(this);
    },
    revert: function revert() {
      return fRevert(this);
    },
    quickHide: function quickHide() {
      return fQuickHide(this);
    },
    hide: function hide() {
      return fHide(this);
    },
    pause: function pause() {
      return fPause(this);
    },
    finish: function finish() {
      return fFinish(this);
    },
    fail: function fail() {
      return fFail(this);
    },
    callMeta: function callMeta() {
      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return fCallMeta(this, args);
    },
    callSetTemp: function callSetTemp() {
      for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      return fCallSetTemp(this, args);
    },
    callRevert: function callRevert(revert) {
      return fCallRevert(this, revert);
    },
    call: function call() {
      for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        args[_key3] = arguments[_key3];
      }

      return fCall(this, args);
    },
    parseMeta: function parseMeta(meta) {
      return fParseMeta(this, meta);
    },
    randomize: function randomize(meta) {
      return fRandomize(this, meta);
    },
    progress: function progress(bar, options) {
      return fProgress(bar, options);
    }
  };
  return p;
};
var dProgression = function dProgression(progression, options) {
  var uuid = gUUID('##-#-#');
  if (options === undefined || options === null) {
    options = {};
  }
  return {
    identifier: uuid,
    progression: progression,
    data: dBardata(options),
    bar: dProgressbar()
  };
};
var dBardata = function dBardata(options) {
  var d = {
    init: options.init !== undefined ? options.init : true,
    initiated: false,
    started: false,
    finished: false,
    percent: 0,
    hidden: true,
    quickHide: false,
    quicklyHid: false,
    temp: {
      gradient: {
        use: false,
        gradient: ''
      },
      use: false,
      autoRevert: true,
      canSuccess: true,
      color: 'rgb(19, 91, 55)',
      debug: false,
      failedColor: 'red',
      inverse: false,
      location: 'top',
      show: false,
      thickness: '2px',
      trail: '-1px',
      transition: {
        time: '0.2s',
        opacity: '0.6s'
      },
      bounce: false
    },
    options: {
      gradient: options.gradient !== undefined ? options.gradient : {
        use: false,
        gradient: ''
      },
      autoRevert: options.autoRevert !== undefined ? options.autoRevert : true,
      canSuccess: true,
      color: options.color || 'rgb(19, 91, 55)',
      debug: options.debug !== undefined ? options.debug : false,
      failedColor: options.failedColor !== undefined ? options.failedColor : 'red',
      inverse: options.inverse !== undefined ? options.inverse : false,
      location: options.location !== undefined ? options.location : 'top',
      show: false,
      thickness: options.thickness !== undefined ? options.thickness : '2px',
      trail: options.trail !== undefined ? options.trail : '-1px',
      transition: options.transition !== undefined ? options.transition : {
        time: '0.2s',
        opacity: '0.6s'
      },
      bounce: options.bounce !== undefined ? options.bounce : false
    }
  };
  return d;
};
/* eslint-disable */
var gProgressBar = function gProgressBar() {
  var name = (arguments.length <= 0 ? undefined : arguments[0]) !== null ? arguments.length <= 0 ? undefined : arguments[0] : null;
  var options = (arguments.length <= 1 ? undefined : arguments[1]) !== null ? arguments.length <= 1 ? undefined : arguments[1] : {};
  var progression = (arguments.length <= 1 ? undefined : arguments[2]) !== null ? arguments.length <= 2 ? undefined : arguments[2] : 0;
  if (name === undefined || name === null) {
    name = gUUID('##-#');
  }
  if (progression === undefined || progression === null) {
    progression = 0;
  }
  return {
    reference: name,
    progression: progression,
    progressions: [dProgression(progression, options)],
    queue: []
  };
};
/* eslint-enable */
var gUUID = function gUUID(seed) {
  var s4 = function s4() {
    return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
  };
  var uuid = '';
  if (seed !== undefined) {
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;
    try {
      for (var _iterator = seed[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var c = _step.value;
        switch (c) {
          case '-':
            uuid += '-';
            break;
          default:
            uuid += s4();
            break;
        }
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }
  } else {
    uuid = s4() + '-' + s4();
  }
  return uuid;
};
var gIntInclusive = function gIntInclusive(min, max) {
  min = Math.floor(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
var gColor = function gColor(color) {
  var r = {
    min: 0,
    max: 255
  };
  var g = {
    min: 0,
    max: 255
  };
  var b = {
    min: 0,
    max: 255
  };
  if (color !== undefined) {
    if (color.r !== undefined) {
      color.r.min !== undefined ? r.min = color.r.min : null;
      color.r.max !== undefined ? r.max = color.r.max : null;
    }
    if (color.g !== undefined) {
      color.g.min !== undefined ? g.min = color.g.min : null;
      color.g.max !== undefined ? g.max = color.g.max : null;
    }
    if (color.b !== undefined) {
      color.b.min !== undefined ? b.min = color.b.min : null;
      color.b.max !== undefined ? b.max = color.b.max : null;
    }
  }
  return 'rgb(' + gIntInclusive(r.min, r.max) + ', ' + gIntInclusive(g.min, g.max) + ', ' + gIntInclusive(b.min, b.max) + ')';
};
var gThickness = function gThickness(thickness) {
  var min = 2;
  var max = 7;
  var suffix = 'px';
  if (thickness !== undefined) {
    thickness.min !== undefined ? min = thickness.min : null;
    thickness.max !== undefined ? max = thickness.max : null;
    thickness.suffix !== undefined ? suffix = thickness.suffix : null;
  }
  return gIntInclusive(min, max) + suffix;
};
var gTrail = function gTrail(trail) {
  var min = 50;
  var max = 100;
  var suffix = 'px';
  if (trail !== undefined) {
    trail.min !== undefined ? min = trail.min : null;
    trail.max !== undefined ? max = trail.max : null;
    trail.suffix !== undefined ? suffix = trail.suffix : null;
  }
  return gIntInclusive(min, max) + suffix;
};
var gTransition = function gTransition(transition) {
  var timeDec, opacityDec, timeInt, opacityInt, x;
  if (transition !== undefined) {
    if (transition.time.min !== undefined && transition.time.max !== undefined) {
      if (transition.time.min % 1 === 0 || transition.time.max % 1 === 0) {
        timeDec = 0;
      } else {
        timeDec = gIntInclusive(Math.floor(transition.time.min % 1 * 100), Math.floor(transition.time.max % 1 * 100));
      }
      timeInt = gIntInclusive(transition.time.min, transition.time.max);
    } else {
      timeInt = gIntInclusive(0, 1);
      timeInt < 1 ? timeDec = gIntInclusive(50, 99) : timeDec = gIntInclusive(0, 50);
    }
    if (transition.opacity.min !== undefined && transition.opacity.max !== undefined) {
      if (transition.opacity.min % 1 === 0 || transition.opacity.max % 1 === 0) {
        opacityDec = 0;
      } else {
        opacityDec = gIntInclusive(Math.floor(transition.opacity.min % 1 * 100), Math.floor(transition.opacity.max % 1 * 100));
      }
      opacityInt = gIntInclusive(transition.opacity.min, transition.opacity.max);
    } else {
      opacityInt = gIntInclusive(0, 1);
      opacityInt < 1 ? opacityDec = gIntInclusive(50, 99) : opacityDec = gIntInclusive(0, 50);
    }
  } else {
    timeInt = gIntInclusive(0, 1);
    opacityInt = gIntInclusive(0, 1);
    timeInt < 1 ? timeDec = gIntInclusive(50, 99) : timeDec = gIntInclusive(0, 50);
    opacityInt < 1 ? opacityDec = gIntInclusive(50, 99) : opacityDec = gIntInclusive(0, 50);
  }
  x = {
    time: timeInt + '.' + timeDec + 's',
    opacity: opacityInt + '.' + opacityDec + 's'
  };
  return x;
};
var gLocation = function gLocation(location) {
  if (location !== undefined) {
    var length = 0;
    for (var variable in location) {
      if (location.hasOwnProperty(variable)) {
        length++;
      }
    }
    return location[gIntInclusive(0, length - 1)];
  } else {
    switch (gIntInclusive(0, 3)) {
      case 0:
        return 'top';
      case 1:
        return 'bottom';
      case 2:
        return 'left';
      case 3:
        return 'right';
    }
  }
};
var gInverse = function gInverse(inverse) {
  if (inverse !== undefined) {
    if (Array.isArray(inverse)) {
      var length = 0;
      for (var variable in inverse) {
        if (inverse.hasOwnProperty(variable)) {
          length++;
        }
      }
      return inverse[gIntInclusive(0, length - 1)];
    } else if (typeof inverse === 'boolean') {
      return inverse;
    }
  }
  switch (gIntInclusive(0, 1)) {
    case 0:
      return false;
    case 1:
      return true;
  }
};
var gBounce = function gBounce(bounce) {
  if (bounce !== undefined) {
    if (Array.isArray(bounce)) {
      var length = 0;
      for (var variable in bounce) {
        if (bounce.hasOwnProperty(variable)) {
          length++;
        }
      }
      return bounce[gIntInclusive(0, length - 1)];
    } else if (typeof bounce === 'boolean') {
      return bounce;
    }
  }
  switch (gIntInclusive(0, 1)) {
    case 0:
      return false;
    case 1:
      return true;
  }
};
var gGradient = function gGradient(gradient, location) {
  var from = {
    r: { min: 0, max: 255 },
    g: { min: 0, max: 255 },
    b: { min: 0, max: 255 }
  };
  var to = {
    r: { min: 0, max: 255 },
    g: { min: 0, max: 255 },
    b: { min: 0, max: 255 }
  };
  var direction = 'to left';
  var use = true;
  if (gradient !== undefined && gradient !== null) {
    if (gradient.use !== null && gradient.use !== undefined) {
      if (Array.isArray(gradient.use)) {
        gradient.use ? use = true : use = false;
      } else {
        var length = 0;
        for (var variable in gradient.use) {
          if (gradient.use.hasOwnProperty(variable)) {
            length++;
          }
        }
        use = gradient.use[gIntInclusive(0, length - 1)];
      }
    } else {
      switch (gIntInclusive(0, 1)) {
        case 0:
          use = false;
        case 1:
          use = true;
      }
    }
    if (typeof gradient.gradient === 'string') {
      if (gradient.gradient === 'predefined') {
        return { use: use, gradient: 'predefined' };
      } else if (regexGradient.test(gradient.gradient)) {
        return { use: use, gradient: gradient.gradient };
      }
    }
    if (gradient.gradient.from !== null && gradient.gradient.from !== undefined) {
      gradient.gradient.from.r.min !== null && gradient.gradient.from.r.min !== undefined ? from.r.min = gradient.gradient.from.r.min : null;
      gradient.gradient.from.r.max !== null && gradient.gradient.from.r.max !== undefined ? from.r.max = gradient.gradient.from.r.max : null;
      gradient.gradient.from.g.min !== null && gradient.gradient.from.g.min !== undefined ? from.g.min = gradient.gradient.from.g.min : null;
      gradient.gradient.from.g.max !== null && gradient.gradient.from.g.max !== undefined ? from.g.max = gradient.gradient.from.g.max : null;
      gradient.gradient.from.b.min !== null && gradient.gradient.from.b.min !== undefined ? from.b.min = gradient.gradient.from.b.min : null;
      gradient.gradient.from.b.max !== null && gradient.gradient.from.b.max !== undefined ? from.b.max = gradient.gradient.from.b.max : null;
    }
    if (gradient.gradient.to !== null && gradient.gradient.to !== undefined) {
      gradient.gradient.to.r.min !== null && gradient.gradient.to.r.min !== undefined ? to.r.min = gradient.gradient.to.r.min : null;
      gradient.gradient.to.r.max !== null && gradient.gradient.to.r.max !== undefined ? to.r.max = gradient.gradient.to.r.max : null;
      gradient.gradient.to.g.min !== null && gradient.gradient.to.g.min !== undefined ? to.g.min = gradient.gradient.to.g.min : null;
      gradient.gradient.to.g.max !== null && gradient.gradient.to.g.max !== undefined ? to.g.max = gradient.gradient.to.g.max : null;
      gradient.gradient.to.b.min !== null && gradient.gradient.to.b.min !== undefined ? to.b.min = gradient.gradient.to.b.min : null;
      gradient.gradient.to.b.max !== null && gradient.gradient.to.b.max !== undefined ? to.b.max = gradient.gradient.to.b.max : null;
    }
  } else {
    return { use: use, gradient: 'predefined' };
  }
  if (location !== undefined && location !== null) {
    if (location === 'top' || location === 'bottom') {
      direction = 'to left';
    } else if (location === 'left' || location === 'right') {
      direction = 'to top';
    }
  }
  from = 'rgb(' + gIntInclusive(from.r.min, from.r.max) + ', ' + gIntInclusive(from.g.min, from.g.max) + ', ' + gIntInclusive(from.b.min, from.b.max) + ')';
  to = 'rgb(' + gIntInclusive(to.r.min, to.r.max) + ', ' + gIntInclusive(to.g.min, to.g.max) + ', ' + gIntInclusive(to.b.min, to.b.max) + ')';
  gradient = 'linear-gradient(' + direction + ', ' + from + ', ' + to + ')';
  return { use: use, gradient: gradient };
};
var regexColor = new RegExp('(^#[0-9a-fA-F]{6}$)|(^#[0-9a-fA-F]{3}$)|(^rgb\\([0-9]{1,3}, [0-9]{1,3}, [0-9]{1,3}\\)$)');
var regexLocation = new RegExp('(left|right|top|bottom)');
var regexTime = new RegExp('(\\d+\\.\\d+)(s|ms)|(\\.\\d+)(s|ms)|(\\d+)(s|ms)');
var regexThickness = new RegExp('(\\d+\\.\\d+)(px|em|pt|%|vh|vw)|(\\.\\d+)(px|em|pt|%|vh|vw)|(\\d+)(px|em|pt|%|vh|vw)');
var regexTrail = new RegExp('(\\d+\\.\\d+)(px|em|pt|%|vh|vw)|(\\.\\d+)(px|em|pt|%|vh|vw)|(\\d+)(px|em|pt|%|vh|vw)');
var regexGradient = new RegExp('(predefined)|((linear-gradient)\\(to (top|bottom|left|right), (rgb\\([0-9]{1,3}, [0-9]{1,3}, [0-9]{1,3}\\)|#[a-zA-Z0-9]{6}|#[a-zA-Z0-9]{3}|), (rgb\\([0-9]{1,3}, [0-9]{1,3}, [0-9]{1,3}\\)|#[a-zA-Z0-9]{6}|#[a-zA-Z0-9]{3}|)\\))');
var hValidColor = function hValidColor(color) {
  return regexColor.test(color);
};
var hValidLocation = function hValidLocation(location) {
  return regexLocation.test(location);
};
var hValidTime = function hValidTime(time) {
  return regexTime.test(time);
};
var hValidThickness = function hValidThickness(thickness) {
  return regexThickness.test(thickness);
};
var hValidTrail = function hValidTrail(trail) {
  return regexTrail.test(trail);
};
var hValidGradient = function hValidGradient(gradient) {
  return regexGradient.test(gradient);
};
var hValidate = function hValidate() {
  for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
    args[_key4] = arguments[_key4];
  }

  if (args !== undefined && args[0] !== undefined && args[1] !== undefined) {
    switch (args[0]) {
      case 'color':
        return hValidColor(args[1]);
      case 'fail':
        return hValidColor(args[1]);
      case 'location':
        return hValidLocation(args[1]);
      case 'time':
        return hValidTime(args[1]);
      case 'thickness':
        return hValidThickness(args[1]);
      case 'trail':
        return hValidTrail(args[1]);
      case 'inverse':
        return typeof args[1] === 'boolean';
      case 'bounce':
        return typeof args[1] === 'boolean';
      case 'transition':
        return hValidTime(args[1].time) && hValidTime(args[1].opacity);
      case 'gradient':
        return hValidGradient(args[1].gradient);
    }
  } else {
    fLog(b, 'Error: not enough arguments');
  }
};
var hSetFailColor = function hSetFailColor(progressbar, color, temp) {
  if (temp) {
    progressbar.$root.temp.failedColor = color;
    progressbar.$root.temp.use ? progressbar.$root.temp.use = true : null;
  } else {
    progressbar.$root.options.failedColor = color;
  }
};
var hSetColor = function hSetColor(progressbar, color, temp) {
  if (temp) {
    progressbar.$root.temp.color = color;
    progressbar.$root.temp.use ? progressbar.$root.temp.use = true : null;
  } else {
    progressbar.$root.options.color = color;
  }
};
var hSetLocation = function hSetLocation(progressbar, loc, temp) {
  if (temp) {
    progressbar.$root.temp.location = loc;
    progressbar.$root.temp.use ? progressbar.$root.temp.use = true : null;
  } else {
    progressbar.$root.options.location = loc;
  }
};
var hSetTransition = function hSetTransition(progressbar, transition, temp) {
  if (temp) {
    progressbar.$root.temp.transition = transition;
    progressbar.$root.temp.use ? progressbar.$root.temp.use = true : null;
  } else {
    progressbar.$root.options.transition = transition;
  }
};
var hSetInverse = function hSetInverse(progressbar, inverse, temp) {
  if (temp) {
    progressbar.$root.temp.inverse = inverse;
    progressbar.$root.temp.use ? progressbar.$root.temp.use = true : null;
  } else {
    progressbar.$root.options.inverse = inverse;
  }
};
var hSetThickness = function hSetThickness(progressbar, thickness, temp) {
  if (temp) {
    progressbar.$root.temp.thickness = thickness;
    progressbar.$root.temp.use ? progressbar.$root.temp.use = true : null;
  } else {
    progressbar.$root.options.thickness = thickness;
  }
};
var hSetTrail = function hSetTrail(progressbar, trail, temp) {
  if (temp) {
    progressbar.$root.temp.trail = trail;
    progressbar.$root.temp.use ? progressbar.$root.temp.use = true : null;
  } else {
    progressbar.$root.options.trail = trail;
  }
};
var hSetBounce = function hSetBounce(progressbar, bounce, temp) {
  if (temp) {
    progressbar.$root.temp.bounce = bounce;
    progressbar.$root.temp.use ? progressbar.$root.temp.use = true : null;
  } else {
    progressbar.$root.options.bounce = bounce;
  }
};
var hSetGradient = function hSetGradient(progressbar, gradient, temp) {
  if (temp) {
    progressbar.$root.temp.gradient = gradient;
    progressbar.$root.temp.use ? progressbar.$root.temp.use = true : null;
  } else {
    progressbar.$root.options.gradient = gradient;
  }
};
var hSet = function hSet() {
  for (var _len5 = arguments.length, args = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
    args[_key5] = arguments[_key5];
  }

  args[1] === 'color' ? hSetColor(args[0], args[2], args[3]) : null;
  args[1] === 'fail' ? hSetFailColor(args[0], args[2], args[3]) : null;
  args[1] === 'location' ? hSetLocation(args[0], args[2], args[3]) : null;
  args[1] === 'transition' ? hSetTransition(args[0], {
    time: args[2].time,
    opacity: args[2].opacity
  }, args[3]) : null;
  args[1] === 'inverse' ? hSetInverse(args[0], args[2], args[3]) : null;
  args[1] === 'thickness' ? hSetThickness(args[0], args[2], args[3]) : null;
  args[1] === 'trail' ? hSetTrail(args[0], args[2], args[3]) : null;
  args[1] === 'bounce' ? hSetBounce(args[0], args[2], args[3]) : null;
  args[1] === 'gradient' ? hSetGradient(args[0], {
    use: args[2].use,
    gradient: args[2].gradient
  }, args[3]) : null;
};

var fLog = function fLog(progressbar, message) {
  if (progressbar.state.settings.debug) {
    console.log(message);
  }
};
var fInit = function fInit(progressbar, data) {
  progressbar.$root = data;
  progressbar.state.settings = progressbar.$root.options;
  progressbar.$root.initiated = true;
};
var fStart = function fStart(progressbar, time) {
  progressbar.$root.temp.use ? progressbar.state.settings = progressbar.$root.temp : progressbar.state.settings = progressbar.$root.options;
  if (!time) {
    if (hValidate('time', progressbar.state.settings.transition.time)) {
      progressbar.state.pTime = parseFloat(progressbar.state.settings.transition.time.replace('/(ms|s)/'));
      if (!progressbar.state.settings.transition.time.includes('ms')) {
        progressbar.state.pTime *= 1000;
      }
      time = progressbar.state.pTime;
    } else {
      fLog(progressbar, 'invalid time: ' + progressbar.state.settings.transition.time);
      fLog(progressbar, 'valid formats: ##, #.#, .# [ms|s]');
      fLog(progressbar, 'example: 1000ms, 1.0s, .10ms');
      progressbar.state.pTime = time = 3000;
    }
  }
  if (!progressbar.$root) return;
  progressbar.$root.hidden = false;
  progressbar.$root.quicklyHid = false;
  progressbar.$root.started = true;
  progressbar.state.settings.show = true;
  progressbar.state.settings.canSuccess = true;
  progressbar.state.cut = 10000 / Math.floor(time);
  var progressbar2 = progressbar;
  progressbar.state.timer = setInterval(function () {
    if (progressbar2.state.timer !== null) {
      fIncrease(progressbar2, progressbar2.state.cut * Math.random());
      if (progressbar2.$root.percent > 95 && !progressbar2.$root.quicklyHid) {
        fFinish(progressbar2);
      }
    }
  }, 100);
};
var fSet = function fSet(progressbar, num) {
  progressbar.state.settings.show = true;
  progressbar.state.settings.canSuccess = true;
  progressbar.$root.percent = Math.floor(num);
};
var fGet = function fGet(progressbar) {
  return Math.floor(progressbar.$root.percent);
};
var fIncrease = function fIncrease(progressbar, num) {
  progressbar.$root.percent = progressbar.$root.percent + Math.floor(num);
};
var fDecrease = function fDecrease(progressbar, num) {
  progressbar.$root.percent = progressbar.$root.percent - Math.floor(num);
};
var fReadyToRevert = function fReadyToRevert(progressbar) {
  if (progressbar.$root.hidden || progressbar.$root.quickHide) {
    fRevert(progressbar);
  } else {
    (function () {
      var progressbar2 = progressbar;
      progressbar.state.revertTimer = setTimeout(function () {
        fLog(progressbar2, 'not ready');
        fReadyToRevert(progressbar2);
      }, 500);
    })();
  }
};
var fRevert = function fRevert(progressbar) {
  fLog(progressbar, 'revert');
  progressbar.$root.temp = {
    use: false,
    debug: progressbar.$root.options.debug,
    canSuccess: progressbar.$root.options.canSuccess,
    show: progressbar.$root.options.show,
    color: progressbar.$root.options.color,
    failedColor: progressbar.$root.options.failedColor,
    thickness: progressbar.$root.options.thickness,
    autoRevert: progressbar.$root.options.autoRevert,
    location: progressbar.$root.options.location,
    inverse: progressbar.$root.options.inverse,
    transition: progressbar.$root.options.transition,
    trail: progressbar.$root.options.trail,
    gradient: progressbar.$root.options.gradient,
    bounce: progressbar.$root.options.bounce
  };
};
var fQuickHide = function fQuickHide(progressbar) {
  if (progressbar.$root.finished) return false;
  clearInterval(progressbar.state.timer);
  progressbar.state.timer = null;
  if (progressbar.state.hideTimer !== null) {
    clearTimeout(progressbar.state.hideTimer);
    clearTimeout(progressbar.state.hideTimer2);
    progressbar.state.hideTimer2 = null;
    progressbar.state.hideTimer = null;
  }
  progressbar.$root.quickHide = true;
  progressbar.$root.percent = 0;
  progressbar.$root.hidden = true;
  if (progressbar.state.settings.autoRevert && progressbar.$root.temp.use) {
    clearTimeout(progressbar.state.revertTimer);
    progressbar.state.revertTimer = null;
    fRevert(progressbar);
  }
  progressbar.$root.finished = true;
  return true;
};
var fHide = function fHide(progressbar) {
  clearInterval(progressbar.state.timer);
  progressbar.state.timer = null;
  var progressbar2 = progressbar;
  progressbar.state.hideTimer = setTimeout(function () {
    if (!progressbar2.$root.finished) {
      progressbar2.$root.options.show = false;
      if (progressbar2.state.settings.bounce) {
        progressbar2.$root.percent = 0;
      }
      if (progressbar2.state.settings.autoRevert && progressbar2.$root.temp.use) {
        fReadyToRevert(progressbar);
      }
      progressbar2.state.hideTimer2 = setTimeout(function () {
        if (!progressbar2.$root.finished) {
          if (progressbar2.$root.percent !== 0) {
            progressbar2.$root.percent = 0;
          }
          progressbar2.$root.hidden = true;
          progressbar2.$root.finished = true;
        }
      }, progressbar2.state.pTime);
    }
  }, progressbar2.state.pTime);
};
var fPause = function fPause(progressbar) {
  clearInterval(progressbar.state.timer);
};
var fFinish = function fFinish(progressbar) {
  if (!progressbar.$root || progressbar.$root.finished) return;
  progressbar.$root.percent = 100;
  fHide(progressbar);
};
var fFail = function fFail(progressbar, customColor) {
  progressbar.state.settings.canSuccess = false;
  progressbar.$root.percent = 100;
  fHide(progressbar);
};
var fCallMeta = function fCallMeta() {
  fCall(arguments.length <= 0 ? undefined : arguments[0], 'set', arguments.length <= 1 ? undefined : arguments[1], arguments.length <= 3 ? undefined : arguments[3], (arguments.length <= 2 ? undefined : arguments[2]) === 'temp');
};
var fCallSetTemp = function fCallSetTemp() {
  if ((arguments.length <= 1 ? undefined : arguments[1]) !== undefined && (arguments.length <= 2 ? undefined : arguments[2]) !== undefined && (arguments.length <= 3 ? undefined : arguments[3]) !== undefined) {
    hValidate(arguments.length <= 1 ? undefined : arguments[1], arguments.length <= 2 ? undefined : arguments[2]) ? hSet(arguments.length <= 0 ? undefined : arguments[0], arguments.length <= 1 ? undefined : arguments[1], arguments.length <= 2 ? undefined : arguments[2], arguments.length <= 3 ? undefined : arguments[3]) : fLog(arguments.length <= 0 ? undefined : arguments[0], 'invalid \'' + (arguments.length <= 1 ? undefined : arguments[1]) + '\' input: \'' + (arguments.length <= 2 ? undefined : arguments[2]) + '\'');
  }
};
var fCallRevert = function fCallRevert(progressbar, revert) {
  hSet(progressbar, revert, progressbar.$root.options.color, true);
};
var fCall = function fCall() {
  var temp = ((arguments.length <= 1 ? undefined : arguments[1]) === 'temp' || (arguments.length <= 1 ? undefined : arguments[1]) === 'set') && (arguments.length <= 4 ? undefined : arguments[4]) !== undefined ? temp = arguments.length <= 4 ? undefined : arguments[4] : temp = null;
  switch (arguments.length <= 1 ? undefined : arguments[1]) {
    case 'meta':
      fCallMeta(arguments.length <= 0 ? undefined : arguments[0], arguments.length <= 2 ? undefined : arguments[2], arguments.length <= 3 ? undefined : arguments[3], arguments.length <= 4 ? undefined : arguments[4]);
      break;
    case 'temp':
      if (temp === null) temp = true;
      fCallSetTemp(arguments.length <= 0 ? undefined : arguments[0], arguments.length <= 2 ? undefined : arguments[2], arguments.length <= 3 ? undefined : arguments[3], temp);
      break;
    case 'set':
      if (temp === null) temp = false;
      fCallSetTemp(arguments.length <= 0 ? undefined : arguments[0], arguments.length <= 2 ? undefined : arguments[2], arguments.length <= 3 ? undefined : arguments[3], temp);
      break;
    case 'revert':
      fCallRevert(arguments.length <= 0 ? undefined : arguments[0], arguments.length <= 2 ? undefined : arguments[2]);
      break;
  }
};
var fParseMeta = function fParseMeta(progressbar, meta) {
  for (var x in meta.func) {
    fCall(progressbar, 'meta', meta.func[x].call, meta.func[x].modifier, meta.func[x].argument);
  }
};
var fRandomize = function fRandomize(progressbar, meta) {
  var data = {
    color: null,
    fail: null,
    thickness: null,
    location: null,
    inverse: null,
    transition: null,
    trail: null,
    bounce: null,
    gradient: null
  };
  data.color = meta !== undefined && meta.color !== undefined ? gColor(meta.color) : gColor();
  data.fail = meta !== undefined && meta.fail !== undefined ? gColor(meta.fail) : gColor();
  data.thickness = meta !== undefined && meta.thickness !== undefined ? gThickness(meta.thickness) : gThickness();
  data.location = meta !== undefined && meta.location !== undefined ? gLocation(meta.location) : gLocation();
  data.inverse = meta !== undefined && meta.inverse !== undefined ? gInverse(meta.inverse) : gInverse();
  data.transition = meta !== undefined && meta.transition !== undefined ? gTransition(meta.transition) : gTransition();
  data.trail = meta !== undefined && meta.trail !== undefined ? gTrail(meta.trail) : gTrail();
  data.bounce = meta !== undefined && meta.bounce !== undefined ? gBounce(meta.bounce) : gBounce();
  data.gradient = meta !== undefined && meta.gradient !== undefined ? gGradient(meta.gradient, data.location) : gGradient(null, data.location);
  var unparsed = {
    func: [{
      call: 'color',
      modifier: 'temp',
      argument: data.color
    }, {
      call: 'fail',
      modifier: 'temp',
      argument: data.fail
    }, {
      call: 'thickness',
      modifier: 'temp',
      argument: data.thickness
    }, {
      call: 'location',
      modifier: 'temp',
      argument: data.location
    }, {
      call: 'inverse',
      modifier: 'temp',
      argument: data.inverse
    }, {
      call: 'transition',
      modifier: 'temp',
      argument: data.transition
    }, {
      call: 'trail',
      modifier: 'temp',
      argument: data.trail
    }, {
      call: 'bounce',
      modifier: 'temp',
      argument: data.bounce
    }, {
      call: 'gradient',
      modifier: 'temp',
      argument: data.gradient
    }]
  };
  fParseMeta(progressbar, unparsed);
};
var fProgress = function fProgress(bar, options) {
  for (var x = 0; x < bar.queue.length; x++) {
    if (bar.progressions[bar.queue[x]].data.finished) {
      bar.queue.splice(x, 1);
    }
  }
  bar.progressions.push(dProgression(++bar.progression, options));
  bar.progressions[bar.progression].bar.init(bar.progressions[bar.progression].data);
};
var install = function install(Vue) {
  var version = function version() {
    return '2.x.x';
  };
  var vueVersion = function vueVersion() {
    return Vue.version;
  };
  var versionCheck = function versionCheck() {
    return vueVersion().split('.')[0] === version().split('.')[0];
  };
  var OPTIONS = (arguments.length <= 1 ? undefined : arguments[1]) !== undefined ? arguments.length <= 1 ? undefined : arguments[1] : undefined;
  if (versionCheck()) {
    console.log('[%cProgressBar%c][%cVueJS%c-%c' + Vue.version + '%c] Version verified!', 'color: ' + gColor() + ';', 'color: #000;', 'color: ' + gColor() + ';', 'color: #000;', 'color: ' + gColor() + ';', 'color: #000;');
  } else {
    console.error('[%cProgressBar%c][%cVueJS%c-%c' + Vue.version + '%c] Out of date! Please update to \'v%c2.x%c\'', 'color: ' + gColor() + ';', 'color: #000;', 'color: ' + gColor() + ';', 'color: #000;', 'color: ' + gColor() + ';', 'color: #000;', 'color: ' + gColor() + ';', 'color: #000;');
    return;
  }
  var ProgressBarBus = new Vue({
    data: {
      bars: [],
      queue: [],
      startTimer: null,
      startTimer2: null,
      startTimer3: null
    },
    methods: {
      version: function version() {
        return versionCheck();
      },
      init: function init(name) {
        if (versionCheck()) {
          var bar = name;
          if (typeof bar === 'string') {
            bar = this.get(bar);
          }
          if (bar !== null && bar !== undefined) {
            if (!bar.progressions[bar.progression].data.initiated) {
              bar.progressions[bar.progression].data.initiated = true;
              bar.progressions[bar.progression].bar.init(bar.progressions[bar.progression].data);
              if (bar.progressions[bar.progression].bar.state.settings.debug) {
                console.log('[%cProgressBar%c][%c' + bar.reference + '%c-%c' + bar.progression + '%c] Initialized!', 'color: ' + gColor() + ';', 'color: #000;', 'color: ' + gColor() + ';', 'color: #000;', 'color: ' + gColor() + ';', 'color: #000;');
              }
            } else {
              console.log('[%cProgressBar%c][%c' + bar.reference + '%c] Already initialized!', 'color: ' + gColor() + ';', 'color: #000;', 'color: ' + gColor() + ';', 'color: #000;');
            }
          } else {
            console.error('[%cProgressBar%c][%c' + name + '%c] Does not exist! Failed to quick hide.', 'color: ' + gColor() + ';', 'color: #000;', 'color: ' + gColor() + ';', 'color: #000;');
          }
        } else {
          console.error('[%cProgressBar%c][%cVueJS%c-%c' + Vue.version + '%c] Out of date! Please update to \'v%c2.x%c\'', 'color: ' + gColor() + ';', 'color: #000;', 'color: ' + gColor() + ';', 'color: #000;', 'color: ' + gColor() + ';', 'color: #000;', 'color: ' + gColor() + ';', 'color: #000;');
        }
      },
      get: function get(name) {
        if (versionCheck()) {
          var _iteratorNormalCompletion2 = true;
          var _didIteratorError2 = false;
          var _iteratorError2 = undefined;

          try {
            for (var _iterator2 = this.bars[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
              var bar = _step2.value;

              if (bar.reference === name) {
                return bar;
              }
            }
          } catch (err) {
            _didIteratorError2 = true;
            _iteratorError2 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion2 && _iterator2.return) {
                _iterator2.return();
              }
            } finally {
              if (_didIteratorError2) {
                throw _iteratorError2;
              }
            }
          }

          return null;
        } else {
          console.error('[%cProgressBar%c][%cVueJS%c-%c' + Vue.version + '%c] Out of date! Please update to \'v%c2.x%c\'', 'color: ' + gColor() + ';', 'color: #000;', 'color: ' + gColor() + ';', 'color: #000;', 'color: ' + gColor() + ';', 'color: #000;', 'color: ' + gColor() + ';', 'color: #000;');
        }
      },
      create: function create(name, options) {
        if (versionCheck()) {
          if (options === undefined) {
            if (OPTIONS === undefined) {
              options = {};
            } else {
              options = OPTIONS;
            }
          }
          var bar = name;
          bar = this.get(bar);
          if (bar !== null && bar !== undefined) {
            console.error('[%cProgressBar%c][%c' + bar.reference + '%c] Already exists! Creation denied.', 'color: ' + gColor() + ';', 'color: #000;', 'color: ' + gColor() + ';', 'color: #000;');
            return;
          }
          bar = gProgressBar(name, options);
          this.bars.push(bar);
          console.log('[%cProgressBar%c][%c' + bar.reference + '%c] Added!', 'color: ' + gColor() + ';', 'color: #000;', 'color: ' + gColor() + ';', 'color: #000;');
          if (bar.progressions[bar.progression].data.init) {
            bar.progressions[bar.progression].data.init = false;
            this.init(bar);
          } else {
            console.log('[%cProgressBar%c][%c' + bar.reference + '%c] Manual initialization required!', 'color: ' + gColor() + ';', 'color: #000;', 'color: ' + gColor() + ';', 'color: #000;');
          }
        } else {
          console.error('[%cProgressBar%c][%cVueJS%c-%c' + Vue.version + '%c] Out of date! Please update to \'v%c2.x%c\'', 'color: ' + gColor() + ';', 'color: #000;', 'color: ' + gColor() + ';', 'color: #000;', 'color: ' + gColor() + ';', 'color: #000;', 'color: ' + gColor() + ';', 'color: #000;');
        }
      },
      start: function start(name, options, modifier) {
        if (versionCheck()) {
          var bar = name;
          if (typeof bar === 'string') {
            bar = this.get(bar);
          }
          if (bar !== null && bar !== undefined) {
            if (bar.progressions[bar.progression].data.initiated) {
              if (bar.progressions[bar.progression].data.started) {
                var this2 = this;
                this.quickHide(bar);
                this2.startTimer = setTimeout(function () {
                  if (options !== null && options !== undefined) {
                    if (modifier !== null && modifier !== undefined) {
                      if (modifier === 'randomize') {
                        bar.progressions[bar.progression].bar.randomize(options);
                        this2.startTimer2 = setTimeout(function () {
                          this2.progress(bar, bar.progressions[bar.progression].data.temp);
                          this2.startTimer3 = setTimeout(function () {
                            bar.queue.push(bar.progression);
                            bar.progressions[bar.progression].bar.start();
                            if (bar.progressions[bar.progression].bar.state.settings.debug) {
                              console.log('[%cProgressBar%c][%c' + bar.reference + '%c-%c' + bar.progression + '%c] Started!', 'color: ' + gColor() + ';', 'color: #000;', 'color: ' + gColor() + ';', 'color: #000;', 'color: ' + gColor() + ';', 'color: #000;');
                            }
                          }, 100);
                        }, 100);
                      } else if (modifier === 'meta') {
                        bar.progressions[bar.progression].bar.parseMeta(options);
                        this2.startTimer2 = setTimeout(function () {
                          this2.progress(bar, bar.progressions[bar.progression].data.temp);
                          this2.startTimer3 = setTimeout(function () {
                            bar.queue.push(bar.progression);
                            bar.progressions[bar.progression].bar.start();
                            if (bar.progressions[bar.progression].bar.state.settings.debug) {
                              console.log('[%cProgressBar%c][%c' + bar.reference + '%c-%c' + bar.progression + '%c] Started!', 'color: ' + gColor() + ';', 'color: #000;', 'color: ' + gColor() + ';', 'color: #000;', 'color: ' + gColor() + ';', 'color: #000;');
                            }
                          }, 100);
                        }, 100);
                      }
                    } else {
                      this2.progress(bar, options);
                      bar.queue.push(bar.progression);
                      bar.progressions[bar.progression].bar.start();
                      if (bar.progressions[bar.progression].bar.state.settings.debug) {
                        console.log('[%cProgressBar%c][%c' + bar.reference + '%c-%c' + bar.progression + '%c] Started!', 'color: ' + gColor() + ';', 'color: #000;', 'color: ' + gColor() + ';', 'color: #000;', 'color: ' + gColor() + ';', 'color: #000;');
                      }
                    }
                  } else {
                    this2.progress(bar);
                    bar.queue.push(bar.progression);
                    bar.progressions[bar.progression].bar.start();
                    if (bar.progressions[bar.progression].bar.state.settings.debug) {
                      console.log('[%cProgressBar%c][%c' + bar.reference + '%c-%c' + bar.progression + '%c] Started!', 'color: ' + gColor() + ';', 'color: #000;', 'color: ' + gColor() + ';', 'color: #000;', 'color: ' + gColor() + ';', 'color: #000;');
                    }
                  }
                }, 100);
              } else {
                this.progress(bar);
                bar.queue.push(bar.progression);
                bar.progressions[bar.progression].bar.start();
                if (bar.progressions[bar.progression].bar.state.settings.debug) {
                  console.log('[%cProgressBar%c][%c' + bar.reference + '%c-%c' + bar.progression + '%c] Started!', 'color: ' + gColor() + ';', 'color: #000;', 'color: ' + gColor() + ';', 'color: #000;', 'color: ' + gColor() + ';', 'color: #000;');
                }
              }
            } else {
              console.error('[%cProgressBar%c][%c' + bar.reference + '%c] Failed to start! Manual initialization required!', 'color: ' + gColor() + ';', 'color: #000;', 'color: ' + gColor() + ';', 'color: #000;');
            }
          } else {
            console.error('[%cProgressBar%c][%c' + name + '%c] Does not exist! Failed to start.', 'color: ' + gColor() + ';', 'color: #000;', 'color: ' + gColor() + ';', 'color: #000;');
          }
        } else {
          console.error('[%cProgressBar%c][%cVueJS%c-%c' + Vue.version + '%c] Out of date! Please update to \'v%c2.x%c\'', 'color: ' + gColor() + ';', 'color: #000;', 'color: ' + gColor() + ';', 'color: #000;', 'color: ' + gColor() + ';', 'color: #000;', 'color: ' + gColor() + ';', 'color: #000;');
        }
      },
      finish: function finish(name) {
        if (versionCheck()) {
          var bar = name;
          if (typeof bar === 'string') {
            bar = this.get(bar);
          }
          if (bar !== null && bar !== undefined) {
            var key = bar.queue.shift();
            if (key !== null && key !== undefined) {
              if (bar.progressions[key] !== null && bar.progressions[key] !== undefined) {
                if (bar.progressions[key].data.initiated) {
                  if (bar.progressions[key].data.started && !bar.progressions[key].data.finished) {
                    bar.progressions[key].bar.finish();
                    console.log('[%cProgressBar%c][%c' + bar.reference + '%c-%c' + key + '%c] Finished!', 'color: ' + gColor() + ';', 'color: #000;', 'color: ' + gColor() + ';', 'color: #000;', 'color: ' + gColor() + ';', 'color: #000;');
                  } else {
                    console.log('[%cProgressBar%c][%c' + bar.reference + '%c-%c' + key + '%c] Failed to finish! Either not started or already finished!', 'color: ' + gColor() + ';', 'color: #000;', 'color: ' + gColor() + ';', 'color: #000;', 'color: ' + gColor() + ';', 'color: #000;');
                  }
                } else {
                  if (bar.progressions[key].data.temp.debug || bar.progressions[key].data.options.debug) {
                    console.error('[%cProgressBar%c][%c' + bar.reference + '%c-%c' + key + '%c] Failed to finish! Manual initialization required!', 'color: ' + gColor() + ';', 'color: #000;', 'color: ' + gColor() + ';', 'color: #000;', 'color: ' + gColor() + ';', 'color: #000;');
                  }
                }
              } else {
                console.warn('[%cProgressBar%c][%c' + bar.reference + '%c-%c' + key + '%c] Failed to finish! already on progression: [%c' + bar.progression + '%c]', 'color: ' + gColor() + ';', 'color: #000;', 'color: ' + gColor() + ';', 'color: #000;', 'color: ' + gColor() + ';', 'color: #000;', 'color: ' + gColor() + ';', 'color: #000;');
              }
            } else {
              console.warn('[%cProgressBar%c][%c' + bar.reference + '%c] Failed to finish! already on progression: [%c' + bar.progression + '%c]', 'color: ' + gColor() + ';', 'color: #000;', 'color: ' + gColor() + ';', 'color: #000;', 'color: ' + gColor() + ';', 'color: #000;');
            }
          } else {
            console.error('[%cProgressBar%c][%c' + name + '%c] Does not exist! Failed to finish.', 'color: ' + gColor() + ';', 'color: #000;', 'color: ' + gColor() + ';', 'color: #000;');
          }
        } else {
          console.error('[%cProgressBar%c][%cVueJS%c-%c' + Vue.version + '%c] Out of date! Please update to \'v%c2.x%c\'', 'color: ' + gColor() + ';', 'color: #000;', 'color: ' + gColor() + ';', 'color: #000;', 'color: ' + gColor() + ';', 'color: #000;', 'color: ' + gColor() + ';', 'color: #000;');
        }
      },
      fail: function fail(name) {
        if (versionCheck()) {
          var bar = name;
          if (typeof bar === 'string') {
            bar = this.get(bar);
          }
          if (bar !== null && bar !== undefined) {
            if (bar.progressions[bar.progression].data.initiated) {
              if (bar.progressions[bar.progression].data.started && !bar.progressions[bar.progression].data.finished) {
                bar.progressions[bar.progression].bar.fail();
                if (bar.progressions[bar.progression].bar.state.settings.debug) {
                  console.log('[%cProgressBar%c][%c' + bar.reference + '%c-%c' + bar.progression + '%c] Failed!', 'color: ' + gColor() + ';', 'color: #000;', 'color: ' + gColor() + ';', 'color: #000;', 'color: ' + gColor() + ';', 'color: #000;');
                }
              } else {
                if (bar.progressions[bar.progression].bar.state.settings.debug) {
                  console.log('[%cProgressBar%c][%c' + bar.reference + '%c-%c' + bar.progression + '%c] Failed to fail! Either not started or already finished!', 'color: ' + gColor() + ';', 'color: #000;', 'color: ' + gColor() + ';', 'color: #000;', 'color: ' + gColor() + ';', 'color: #000;');
                }
              }
            } else {
              if (bar.progressions[bar.progression].data.temp.debug || bar.progressions[bar.progression].data.options.debug) {
                console.error('[%cProgressBar%c][%c' + bar.reference + '%c] Failed to fail! Manual initialization required!', 'color: ' + gColor() + ';', 'color: #000;', 'color: ' + gColor() + ';', 'color: #000;');
              }
            }
          } else {
            console.error('[%cProgressBar%c][%c' + name + '%c] Does not exist! Failed to fail.', 'color: ' + gColor() + ';', 'color: #000;', 'color: ' + gColor() + ';', 'color: #000;');
          }
        } else {
          console.error('[%cProgressBar%c][%cVueJS%c-%c' + Vue.version + '%c] Out of date! Please update to \'v%c2.x%c\'', 'color: ' + gColor() + ';', 'color: #000;', 'color: ' + gColor() + ';', 'color: #000;', 'color: ' + gColor() + ';', 'color: #000;', 'color: ' + gColor() + ';', 'color: #000;');
        }
      },
      quickHide: function quickHide(name) {
        if (versionCheck()) {
          var bar = name;
          if (typeof bar === 'string') {
            bar = this.get(bar);
          }
          if (bar !== null && bar !== undefined) {
            if (bar.progressions[bar.progression].data.initiated) {
              if (bar.progressions[bar.progression].data.started) {
                if (bar.progressions[bar.progression].bar.quickHide()) {
                  console.log('[%cProgressBar%c][%c' + bar.reference + '%c-%c' + bar.progression + '%c] Quickly Hidden!', 'color: ' + gColor() + ';', 'color: #000;', 'color: ' + gColor() + ';', 'color: #000;', 'color: ' + gColor() + ';', 'color: #000;');
                  return true;
                } else {
                  console.log('[%cProgressBar%c][%c' + bar.reference + '%c-%c' + bar.progression + '%c] Failed to quickhide! already hidden!', 'color: ' + gColor() + ';', 'color: #000;', 'color: ' + gColor() + ';', 'color: #000;', 'color: ' + gColor() + ';', 'color: #000;');
                }
              } else {
                console.log('[%cProgressBar%c][%c' + bar.reference + '%c-%c' + bar.progression + '%c] Failed to quickhide, bar not started!', 'color: ' + gColor() + ';', 'color: #000;', 'color: ' + gColor() + ';', 'color: #000;', 'color: ' + gColor() + ';', 'color: #000;');
              }
            } else {
              if (bar.progressions[bar.progression].data.temp.debug || bar.progressions[bar.progression].data.options.debug) {
                console.log('[%cProgressBar%c][%c' + bar.reference + '%c-%c' + bar.progression + '%c] Failed to quickhide! Manual initialization required!', 'color: ' + gColor() + ';', 'color: #000;', 'color: ' + gColor() + ';', 'color: #000;', 'color: ' + gColor() + ';', 'color: #000;');
              }
            }
          } else {
            console.error('[%cProgressBar%c][%c' + name + '%c] Does not exist! Failed to quick hide.', 'color: ' + gColor() + ';', 'color: #000;', 'color: ' + gColor() + ';', 'color: #000;');
          }
        } else {
          console.error('[%cProgressBar%c][%cVueJS%c-%c' + Vue.version + '%c] Out of date! Please update to \'v%c2.x%c\'', 'color: ' + gColor() + ';', 'color: #000;', 'color: ' + gColor() + ';', 'color: #000;', 'color: ' + gColor() + ';', 'color: #000;', 'color: ' + gColor() + ';', 'color: #000;');
        }
        return false;
      },
      randomize: function randomize(name, meta) {
        if (versionCheck()) {
          var bar = name;
          if (typeof bar === 'string') {
            bar = this.get(bar);
          }
          if (bar !== null && bar !== undefined) {
            if (meta === undefined) {
              meta = {};
            }
            if (bar.progressions[bar.progression].data.initiated) {
              if (!bar.progressions[bar.progression].data.started) {
                bar.progressions[bar.progression].bar.randomize(meta);
                if (bar.progressions[bar.progression].bar.state.settings.debug) {
                  console.log('[%cProgressBar%c][%c' + bar.reference + '%c-%c' + bar.progression + '%c] Randomized!', 'color: ' + gColor() + ';', 'color: #000;', 'color: ' + gColor() + ';', 'color: #000;', 'color: ' + gColor() + ';', 'color: #000;');
                }
              } else {
                if (bar.progressions[bar.progression].bar.state.settings.debug) {
                  console.log('[%cProgressBar%c][%c' + bar.reference + '%c-%c' + bar.progression + '%c] Cannot randomize after bar has started!', 'color: ' + gColor() + ';', 'color: #000;', 'color: ' + gColor() + ';', 'color: #000;', 'color: ' + gColor() + ';', 'color: #000;');
                }
              }
            } else {
              if (bar.progressions[bar.progression].data.temp.debug || bar.progressions[bar.progression].data.options.debug) {
                console.log('[%cProgressBar%c][%c' + bar.reference + '%c-%c' + bar.progression + '%c] Failed to randomize! Manual initialization required', 'color: ' + gColor() + ';', 'color: #000;', 'color: ' + gColor() + ';', 'color: #000;', 'color: ' + gColor() + ';', 'color: #000;');
              }
            }
          } else {
            console.error('[%cProgressBar%c][%c' + name + '%c] Does not exist! Failed to quick hide.', 'color: ' + gColor() + ';', 'color: #000;', 'color: ' + gColor() + ';', 'color: #000;');
          }
        } else {
          console.error('[%cProgressBar%c][%cVueJS%c-%c' + Vue.version + '%c] Out of date! Please update to \'v%c2.x%c\'', 'color: ' + gColor() + ';', 'color: #000;', 'color: ' + gColor() + ';', 'color: #000;', 'color: ' + gColor() + ';', 'color: #000;', 'color: ' + gColor() + ';', 'color: #000;');
        }
      },
      destroy: function destroy(name) {
        if (this.version()) {
          var bar = name;
          if (typeof bar === 'string') {
            bar = this.get(bar);
          }
          if (bar !== null && bar !== undefined) {
            this.bars.slice(this.bars.indexOf(bar));
            if (bar.progressions[bar.progression].data.initiated && bar.progressions[bar.progression].bar.state.settings.debug || bar.progressions[bar.progression].data.options.debug || bar.progressions[bar.progression].data.temp.use && bar.progressions[bar.progression].data.temp.debug) {
              console.log('[%cProgressBar%c][%c' + bar.reference + '%c] Destroyed and no longer accessable!', 'color: ' + gColor() + ';', 'color: #000;', 'color: ' + gColor() + ';', 'color: #000;');
            }
            return true;
          } else {
            console.error('[%cProgressBar%c][%c' + name + '%c] Does not exist! Failed to destroy.', 'color: ' + gColor() + ';', 'color: #000;', 'color: ' + gColor() + ';', 'color: #000;');
          }
        } else {
          console.error('[%cProgressBar%c][%cVueJS%c-%c' + Vue.version + '%c] Out of date! Please update to \'v%c2.x%c\'', 'color: ' + gColor() + ';', 'color: #000;', 'color: ' + gColor() + ';', 'color: #000;', 'color: ' + gColor() + ';', 'color: #000;', 'color: ' + gColor() + ';', 'color: #000;');
        }
        return false;
      },
      progress: function progress(name, options) {
        if (this.version()) {
          var bar = name;
          if (typeof bar === 'string') {
            bar = this.get(bar);
          } else {
            bar = name;
          }
          if (bar !== null && bar !== undefined) {
            if (bar.progressions[bar.progression].data.initiated) {
              if (options === null || options === undefined) {
                options = bar.progressions[bar.progression].bar.state.settings;
              }
              bar.progressions[bar.progression].bar.progress(bar, options);
              if (bar.progressions[bar.progression].bar.state.settings.debug) {
                console.log('[%cProgressBar%c][%c' + bar.reference + '%c-%c' + bar.progression + '%c] Progressed!', 'color: ' + gColor() + ';', 'color: #000;', 'color: ' + gColor() + ';', 'color: #000;', 'color: ' + gColor() + ';', 'color: #000;');
              }
            } else {
              if (options === null || options === undefined) {
                if (bar.progressions[bar.progression].data.temp.use) {
                  bar.progressions[bar.progression].bar.progress(bar, bar.progressions[bar.progression].data.temp);
                  if (bar.progressions[bar.progression].data.temp.debug) {
                    console.log('[%cProgressBar%c][%c' + bar.reference + '%c-%c' + bar.progression + '%c] Progressed!', 'color: ' + gColor() + ';', 'color: #000;', 'color: ' + gColor() + ';', 'color: #000;', 'color: ' + gColor() + ';', 'color: #000;');
                  }
                } else {
                  bar.progressions[bar.progression].bar.progress(bar, bar.progressions[bar.progression].data.options);
                  if (bar.progressions[bar.progression].data.options.debug) {
                    console.log('[%cProgressBar%c][%c' + bar.reference + '%c-%c' + bar.progression + '%c] Progressed!', 'color: ' + gColor() + ';', 'color: #000;', 'color: ' + gColor() + ';', 'color: #000;', 'color: ' + gColor() + ';', 'color: #000;');
                  }
                }
              } else {
                bar.progressions[bar.progression].bar.progress(bar, options);
                if (bar.progressions[bar.progression].data.temp.use && bar.progressions[bar.progression].data.temp.debug || bar.progressions[bar.progression].data.options.debug) {
                  console.log('[%cProgressBar%c][%c' + bar.reference + '%c-%c' + bar.progression + '%c] Progressed!', 'color: ' + gColor() + ';', 'color: #000;', 'color: ' + gColor() + ';', 'color: #000;', 'color: ' + gColor() + ';', 'color: #000;');
                }
              }
            }
          } else {
            console.error('[%cProgressBar%c][%c' + name + '%c] Does not exist! Failed to quick hide.', 'color: ' + gColor() + ';', 'color: #000;', 'color: ' + gColor() + ';', 'color: #000;');
          }
        } else {
          console.error('[%cProgressBar%c][%cVueJS%c-%c' + Vue.version + '%c] Out of date! Please update to \'v%c2.x%c\'', 'color: ' + gColor() + ';', 'color: #000;', 'color: ' + gColor() + ';', 'color: #000;', 'color: ' + gColor() + ';', 'color: #000;', 'color: ' + gColor() + ';', 'color: #000;');
        }
      },
      modify: function modify(name, meta) {
        if (this.version()) {
          var bar = name;
          if (typeof bar === 'string') {
            bar = this.get(bar);
          }
          if (bar !== null && bar !== undefined) {
            if (bar.progressions[bar.progression].data.initiated) {
              if (meta !== null && meta !== undefined) {
                if (!Array.isArray(meta)) {
                  meta = { func: [meta] };
                } else {
                  meta = { func: meta };
                }
                bar.progressions[bar.progression].bar.parseMeta(meta);
                if (bar.progressions[bar.progression].bar.state.settings.debug) {
                  console.log('[%cProgressBar%c][%c' + bar.reference + '%c-%c' + bar.progression + '%c] Modified!', 'color: ' + gColor() + ';', 'color: ' + gColor() + ';', 'color: ' + gColor() + ';', 'color: #000;', 'color: ' + gColor() + ';', 'color: #000;');
                }
              } else {
                if (bar.progressions[bar.progression].bar.state.settings.debug) {
                  console.log('[%cProgressBar%c][%c' + bar.reference + '%c-%c' + bar.progression + '%c] Not Modified! No meta data defined!', 'color: ' + gColor() + ';', 'color: ' + gColor() + ';', 'color: #000;', 'color: ' + gColor() + ';', 'color: #000;');
                }
              }
            } else {
              if (bar.progressions[bar.progression].data.temp.debug || bar.progressions[bar.progression].data.options.debug) {
                console.log('[%cProgressBar%c][%c' + bar.reference + '%c-%c' + bar.progression + '%c] Failed to randomize! Manual initialization required', 'color: ' + gColor() + ';', 'color: #000;', 'color: ' + gColor() + ';', 'color: #000;', 'color: ' + gColor() + ';', 'color: #000;');
              }
            }
          } else {
            console.error('[%cProgressBar%c][%c' + name + '%c] Does not exist! Failed to modify.', 'color: ' + gColor() + ';', 'color: #000;', 'color: ' + gColor() + ';', 'color: #000;');
          }
        } else {
          console.error('[%cProgressBar%c][%cVueJS%c-%c' + Vue.version + '%c] Out of date! Please update to \'v%c2.x%c\'', 'color: ' + gColor() + ';', 'color: #000;', 'color: ' + gColor() + ';', 'color: #000;', 'color: ' + gColor() + ';', 'color: #000;', 'color: ' + gColor() + ';', 'color: #000;');
        }
      }
    }
  });
  Vue.component('vue-progress-bar', _vueProgressbar2.default);
  Vue.prototype.$pb = ProgressBarBus;
};

exports.default = install;