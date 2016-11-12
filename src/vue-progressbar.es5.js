'use strict';

var _vueProgressbar = require('./vue-progressbar.vue');

var _vueProgressbar2 = _interopRequireDefault(_vueProgressbar);

const regexColor = new RegExp("(^#[0-9a-fA-F]{6}$)|(^#[0-9a-fA-F]{3}$)|(^rgb\\([0-9]{1,3}, [0-9]{1,3}, [0-9]{1,3}\\)$)");
const regexLocation = new RegExp("(left|right|top|bottom)");
const regexTime = new RegExp("(\\d+\\.\\d+)(s|ms)|(\\.\\d+)(s|ms)|(\\d+)(s|ms)");
const regexThickness = new RegExp("(\\d+\\.\\d+)(px|em|pt|%|vh|vw)|(\\.\\d+)(px|em|pt|%|vh|vw)|(\\d+)(px|em|pt|%|vh|vw)");

var getRandomIntInclusive = function(min, max) {
  min = Math.floor(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

var getRandomColor = function(color) {
  var r = {min: 255, max: 255}, g = {min: 255, max: 255}, b = {min: 255, max: 255};
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
  return 'rgb('+getRandomIntInclusive(r.min, r.max)+', '+getRandomIntInclusive(g.min, g.max)+', '+getRandomIntInclusive(b.min, b.max)+')';
}
var getRandomThickness = function(thickness) {
  var min = 2, max = 7, suffix = 'px';
  if (thickness !== undefined) {
    thickness.min !== undefined ? min = thickness.min : null;
    thickness.max !== undefined ? max = thickness.max : null;
    thickness.suffix !== undefined ? suffix = thickness.suffix : null;
  }
  return getRandomIntInclusive(min, max)+suffix;
}
var getRandomTransition = function(transition) {
  var timeDec, opacityDec, timeInt, opacityInt, x;
  if (transition !== undefined) {
    if (transition.time.min !== undefined && transition.time.max !== undefined) {
      if (transition.time.min % 1 === 0 || transition.time.max % 1 === 0) {
        timeDec = 0;
      } else {
        timeDec = getRandomIntInclusive(Math.floor((transition.time.min % 1)*100), Math.floor((transition.time.max % 1)*100));
      }
      timeInt = getRandomIntInclusive(transition.time.min, transition.time.max);
    } else {
      timeInt = getRandomIntInclusive(0, 1);
      timeInt < 1 ? timeDec = getRandomIntInclusive(50, 99) : timeDec = getRandomIntInclusive(0, 50);
    }
    if (transition.opacity.min !== undefined && transition.opacity.max !== undefined) {
      if (transition.opacity.min % 1 === 0 || transition.opacity.max % 1 === 0) {
        opacityDec = 0;
      } else {
        opacityDec = getRandomIntInclusive(Math.floor((transition.opacity.min % 1)*100), Math.floor((transition.opacity.max % 1)*100));
      }
      opacityInt = getRandomIntInclusive(transition.opacity.min, transition.opacity.max);
    } else {
      opacityInt = getRandomIntInclusive(0, 1);
      opacityInt < 1 ? opacityDec = getRandomIntInclusive(50, 99) : opacityDec = getRandomIntInclusive(0, 50);
    }
  } else {
    timeInt = getRandomIntInclusive(0, 1);
    opacityInt = getRandomIntInclusive(0, 1);
    timeInt < 1 ? timeDec = getRandomIntInclusive(50, 99) : timeDec = getRandomIntInclusive(0, 50);
    opacityInt < 1 ? opacityDec = getRandomIntInclusive(50, 99) : opacityDec = getRandomIntInclusive(0, 50);
  }
  x = {time: timeInt+'.'+timeDec+'s', opacity: opacityInt+'.'+opacityDec+'s'};
  return x;
}
var getRandomLocation = function(location) {
  if (location !== undefined) {
    return location[getRandomIntInclusive(0, location.length-1)]
  } else {
    switch(getRandomIntInclusive(0, 3)) {
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
}
var getRandomInverse = function(inverse) {
  if (inverse !== undefined) {
    return inverse[getRandomIntInclusive(0, inverse.length-1)];
  } else {
    switch(getRandomIntInclusive(0, 1)) {
      case 0:
        return false;
      case 1:
        return true;
    }
  }
}

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

module.exports.install = function(Vue) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var isVueNext = Vue.version.split('.')[0] === '2';
  var inBrowser = typeof window !== 'undefined';

  var Progress = {
    $root: null,
    state: {
      pTime: null,
      settings: null,
      timer: null,
      hideTimer: null,
      hideTimer2: null,
      revertTimer: null,
      cut: 0
    },
    log: function log(message) {
      if (this.state.settings.debug) {
        console.log(message);
      }
    },
    init: function init(vm) {
      this.$root = vm;
      this.state.settings = this.$root.RADON_LOADING_BAR.options;
    },
    start: function start(time) {
      this.$root.RADON_LOADING_BAR.temp.use ? this.state.settings = this.$root.RADON_LOADING_BAR.temp : this.state.settings = this.$root.RADON_LOADING_BAR.options;
      var _this = this;
      if (!time) {
        if (regexTime.test(this.state.settings.transition.time)) {
          this.state.pTime = parseFloat(this.state.settings.transition.time.replace('/(ms|s)/'));
          if (!this.state.settings.transition.time.includes('ms')) {
            this.state.pTime *= 1000;
          }
          time = this.state.pTime;
        } else {
          this.log('invalid time: ' + this.state.settings.transition.time);
          this.log('valid formats: ##, #.#, .# [ms|s]');
          this.log('example: 1000ms, 1.0s, .10ms');
          this.state.pTime = time = 3000;
        }
      }
      if (!this.$root) return;
      this.$root.RADON_LOADING_BAR.hidden = false;
      this.state.settings.show = true;
      this.state.settings.canSuccess = true;
      this.state.cut = 10000 / Math.floor(time);
      this.state.timer = setInterval(function() {
        _this.increase( _this.state.cut * Math.random());
        if (_this.$root.RADON_LOADING_BAR.percent > 95) {
          _this.finish();
        }
      }, 100);
    },
    //  set functions
    set: function set(num) {
      this.state.settings.show = true;
      this.state.settings.canSuccess = true;
      this.$root.RADON_LOADING_BAR.percent = Math.floor(num);
    },
    h_setFailColor: function h_setFailColor(color, temp) {
      if (temp) {
        this.$root.RADON_LOADING_BAR.temp.failedColor = color;
        !this.$root.RADON_LOADING_BAR.temp.use ? this.$root.RADON_LOADING_BAR.temp.use = true : null;
      } else {
        this.$root.RADON_LOADING_BAR.options.failedColor = color;
      }
    },
    h_setColor: function h_setFailColor(color, temp) {
      if (temp) {
        this.$root.RADON_LOADING_BAR.temp.color = color;
        !this.$root.RADON_LOADING_BAR.temp.use ? this.$root.RADON_LOADING_BAR.temp.use = true : null;
      } else {
        this.$root.RADON_LOADING_BAR.options.color = color;
      }
    },
    h_setLocation: function h_setFailColor(loc, temp) {
      if (temp) {
        this.$root.RADON_LOADING_BAR.temp.location = loc;
        !this.$root.RADON_LOADING_BAR.temp.use ? this.$root.RADON_LOADING_BAR.temp.use = true : null;
      } else {
        this.$root.RADON_LOADING_BAR.options.location = loc;
      }
    },
    h_setTransition: function h_setFailColor(transition, temp) {
      if (temp) {
        this.$root.RADON_LOADING_BAR.temp.transition = transition;
        !this.$root.RADON_LOADING_BAR.temp.use ? this.$root.RADON_LOADING_BAR.temp.use = true : null;
      } else {
        this.$root.RADON_LOADING_BAR.options.transition = transition;
      }
    },
    h_setInverse: function h_setFailColor(inverse, temp) {
      if (temp) {
        this.$root.RADON_LOADING_BAR.temp.inverse = inverse;
        !this.$root.RADON_LOADING_BAR.temp.use ? this.$root.RADON_LOADING_BAR.temp.use = true : null;
      } else {
        this.$root.RADON_LOADING_BAR.options.inverse = inverse;
      }
    },
    h_setThickness: function h_setFailColor(thickness, temp) {
      if (temp) {
        this.$root.RADON_LOADING_BAR.temp.thickness = thickness;
        !this.$root.RADON_LOADING_BAR.temp.use ? this.$root.RADON_LOADING_BAR.temp.use = true : null;
      } else {
        this.$root.RADON_LOADING_BAR.options.thickness = thickness;
      }
    },
    //  get functions
    get: function get() {
      return Math.floor(this.$root.RADON_LOADING_BAR.percent);
    },
    increase: function increase(num) {
      this.$root.RADON_LOADING_BAR.percent = this.$root.RADON_LOADING_BAR.percent + Math.floor(num);
    },
    decrease: function decrease(num) {
      this.$root.RADON_LOADING_BAR.percent = this.$root.RADON_LOADING_BAR.percent - Math.floor(num);
    },
    readyToRevert: function readyToRevert() {
      if (this.$root.RADON_LOADING_BAR.hidden) {
        this.revert();
      } else {
        var this2 = this;
        this.state.revertTimer = setTimeout(function() {
          this2.readyToRevert();
        }, 500);
      }
    },
    revert: function revert() {
      this.$root.RADON_LOADING_BAR.temp = {
        use: false,
        debug: this.$root.RADON_LOADING_BAR.options.debug,
        canSuccess: this.$root.RADON_LOADING_BAR.options.canSuccess,
        show: this.$root.RADON_LOADING_BAR.options.show,
        color: this.$root.RADON_LOADING_BAR.options.color,
        failedColor: this.$root.RADON_LOADING_BAR.options.failedColor,
        thickness: this.$root.RADON_LOADING_BAR.options.thickness,
        autoRevert: this.$root.RADON_LOADING_BAR.options.autoRevert,
        location: this.$root.RADON_LOADING_BAR.options.location,
        inverse: this.$root.RADON_LOADING_BAR.options.inverse,
        transition: this.$root.RADON_LOADING_BAR.options.transition
      };
    },
    quickHide: function quickHide() {
      this.$root.RADON_LOADING_BAR.quickHide = true;
      this.$root.RADON_LOADING_BAR.percent = 0;
      clearInterval(this.state.timer);
      clearTimeout(this.state.hideTimer);
      clearTimeout(this.state.hideTimer2);
      this.state.timer = null;
      if (this.state.settings.autoRevert && this.$root.RADON_LOADING_BAR.temp.use) {
        clearTimeout(this.state.revertTimer);
        this.revert();
      }
      return true;
    },
    hide: function hide() {
      clearInterval(this.state.timer);
      this.state.timer = null;
      var this2 = this;
      if (this.state.settings.autoRevert && this2.$root.RADON_LOADING_BAR.temp.use) {
        this.readyToRevert();
      }
      this.state.hideTimer = setTimeout(function() {
        this2.$root.RADON_LOADING_BAR.options.show = false;
        this2.$root.RADON_LOADING_BAR.percent = 0;
        this2.state.hideTimer2 = setTimeout(function() {
          this2.$root.RADON_LOADING_BAR.hidden = true;
        }, this2.state.pTime);
      }, this.state.pTime);
    },
    pause: function pause() {
      clearInterval(this.state.timer);
    },
    finish: function finish() {
      if (!this.$root) return;
      this.$root.RADON_LOADING_BAR.percent = 100;
      this.hide();
    },
    fail: function fail(customColor) {
      this.state.settings.canSuccess = false;
      this.$root.RADON_LOADING_BAR.percent = 100;
      this.hide();
    },
    callMeta: function callMeta() {
      var args = Array.prototype.slice.call(arguments)
      var temp;
      args[1] === 'temp' ? temp = true : temp = false;
      if (args[0] === 'color') {
        this.call('set', 'color', args[2], temp);
      } else if (args[0] === 'fail') {
        this.call('set', 'fail', args[2], temp);
      } else if (args[0] === 'location') {
        this.call('set', 'location', args[2], temp);
      } else if (args[0] === 'transition') {
        this.call('set', 'transition', args[2], temp);
      } else if (args[0] === 'inverse') {
        this.call('set', 'inverse', args[2], temp);
      } else if (args[0] === 'thickness') {
        this.call('set', 'thickness', args[2], temp);
      }
    },
    callSetTemp: function callSetTemp() {
      var args = Array.prototype.slice.call(arguments)
      if (args[0] === 'color') {
        this.validColor(args[1]) ? this.h_setColor(args[1], args[2]) : this.log('invalid color input: \"' + args[1] + '\"');
      } else if (args[0] === 'fail') {
        this.validColor(args[1]) ? this.h_setFailColor(args[1], args[2]) : this.log('invalid color input: \"' + args[1] + '\"');
      } else if (args[0] === 'location') {
        this.validLocation(args[1]) ? this.h_setLocation(args[1], args[2]) : this.log('invalid location input: \"' + args[1] + '\"');
      } else if (args[0] === 'transition') {
        var transition = this.$root.RADON_LOADING_BAR.options.transition;
        if (args[1].time !== undefined) {
          this.validTime(args[1].time) ? transition.time = args[1].time : this.log('invalid transition time: \"' + args[1].time + '\". Using default.');
        }
        if (args[1].opacity !== undefined ) {
          this.validTime(args[1].opacity) ? transition.opacity = args[1].opacity : this.log('invalid transition opacity: \"' + args[1].opacity + '\". Using default.');
        }
        this.h_setTransition(transition, args[2]);
      } else if (args[0] === 'inverse') {
        typeof args[1] === 'boolean' ? this.h_setInverse(args[1], args[2]) : this.log('invalid inverse: \"' + args[1] + '\"');
      } else if (args[0] === 'thickness') {
        this.validThickness(args[1]) ? this.h_setThickness(args[1], args[2]) : this.log('invalid thickness: \"' + args[1] + '\"');
      }
    },
    callRevert: function callRevert(revert) {
      if (revert === 'color') {
        this.h_setColor(this.$root.RADON_LOADING_BAR.options.color, true);
      } else if (revert === 'fail') {
        this.h_setFailColor(this.$root.RADON_LOADING_BAR.options.fail, true);
      } else if (revert === 'location') {
        this.h_setLocation(this.$root.RADON_LOADING_BAR.options.location, true);
      } else if (revert === 'transition') {
        this.h_setTransition(this.$root.RADON_LOADING_BAR.options.transition, true);
      } else if (revert === 'inverse') {
        this.h_setInverse(this.$root.RADON_LOADING_BAR.options.inverse, true);
      } else if (revert === 'thickness') {
        this.h_setThickness(this.$root.RADON_LOADING_BAR.options.thickness, true);
      }
    },
    call: function call() {
      var args = Array.prototype.slice.call(arguments)
      var temp;
      ((args[0] === 'temp' || args[0] === 'set') && args[3] !== undefined) ? temp = args[3] : temp = null;
      switch(args[0]) {
        case 'meta':
          this.callMeta(args[1], args[2], args[3]);
          break;
        case 'temp':
          if (temp === null) temp = true;
          this.callSetTemp(args[1], args[2], temp);
          break;
        case 'set':
          if (temp === null) temp = false;
          this.callSetTemp(args[1], args[2], temp);
          break;
        case 'revert':
          this.callRevert(args[1]);
          break;
      }
    },
    validColor: function validColor(color) {
      return regexColor.test(color);
    },
    validLocation: function validLocation(location) {
      return regexLocation.test(location);
    },
    validTime: function validTime(time) {
      return regexTime.test(time);
    },
    validThickness: function validThickness(thickness) {
      return regexThickness.test(thickness);
    },
    parseMeta: function parseMeta(meta) {
      for (var x in meta.func) {
        this.call('meta', meta.func[x].call, meta.func[x].modifier, meta.func[x].argument);
      }
    },
    randomize: function randomize(meta) {
      var data = { color: null, fail: null, thickness: null, location: null, inverse: null, transition: null};
      (meta !== undefined && meta.color !== undefined) ? data.color = getRandomColor(meta.color) : data.color = getRandomColor();
      (meta !== undefined && meta.fail !== undefined) ? data.fail = getRandomColor(meta.fail) : data.fail = getRandomColor();
      (meta !== undefined && meta.thickness !== undefined) ? data.thickness = getRandomThickness(meta.thickness) : data.thickness = getRandomThickness();
      (meta !== undefined && meta.location !== undefined) ? data.location = getRandomLocation(meta.location) : data.location = getRandomLocation() ;
      (meta !== undefined && meta.inverse !== undefined) ? data.inverse = getRandomInverse(meta.inverse) : data.inverse = getRandomInverse();
      (meta !== undefined && meta.transition !== undefined) ? data.transition = getRandomTransition(meta.transition) : data.transition = getRandomTransition();
      var unparsed = {
        func: [
          {call: 'color', modifier: 'temp', argument: data.color},
          {call: 'fail', modifier: 'temp', argument: data.fail},
          {call: 'thickness', modifier: 'temp', argument: data.thickness},
          {call: 'location', modifier: 'temp', argument: data.location},
          {call: 'inverse', modifier: 'temp', argument: data.inverse},
          {call: 'transition', modifier: 'temp', argument: data.transition}
        ]
      };
      this.parseMeta(unparsed);
    }
  };
  var VueProgressBarEventBus = new Vue({
    data: {
      RADON_LOADING_BAR: {
        percent: 0,
        hidden: true,
        quickHide: false,
        temp: {
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
          transition: {
            time: '0.2s',
            opacity: '0.6s'
          }
        },
        options: {
          autoRevert: options.autoRevert !== undefined ? options.autoRevert : true,
          canSuccess: true,
          color: options.color || 'rgb(19, 91, 55)',
          debug: options.debug || false,
          failedColor: options.failedColor || 'red',
          inverse: options.inverse || false,
          location: options.location || 'top',
          show: false,
          thickness: options.thickness || '2px',
          transition: options.transition || {
            time: '0.2s',
            opacity: '0.6s'
          }
        }
      }
    }
  });

  if (inBrowser) {
    window.VueProgressBarEventBus = VueProgressBarEventBus;
    Progress.init(VueProgressBarEventBus);
  }

  Vue.component('vue-progress-bar', _vueProgressbar2.default);

  Vue.prototype.$Progress = Progress;
};
