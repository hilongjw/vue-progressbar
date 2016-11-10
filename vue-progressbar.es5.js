'use strict';

var _vueProgressbar = require('./vue-progressbar.vue');

var _vueProgressbar2 = _interopRequireDefault(_vueProgressbar);

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
      tFailColor: '',
      tColor: '',
      tLocation: '',
      tTransition: {},
      timer: null,
      cut: 0
    },
    init: function init(vm) {
      this.$root = vm;
    },
    start: function start(time) {
      var _this = this;

      if (!time) time = 3000;
      if (!this.$root) return;
      this.$root.RADON_LOADING_BAR.percent = this.$root.RADON_LOADING_BAR.percent;
      this.$root.RADON_LOADING_BAR.options.show = true;
      this.$root.RADON_LOADING_BAR.options.canSuccess = true;
      this.state.cut = 10000 / Math.floor(time);
      this.state.timer = setInterval(function() {
        _this.increase(_this.state.cut * Math.random());
        if (_this.$root.RADON_LOADING_BAR.percent > 95) {
          _this.finish();
        }
      }, 100);
    },
    set: function set(num) {
      this.$root.RADON_LOADING_BAR.options.show = true;
      this.$root.RADON_LOADING_BAR.options.canSuccess = true;
      this.$root.RADON_LOADING_BAR.percent = Math.floor(num);
    },
    get: function get() {
      return Math.floor(this.$root.RADON_LOADING_BAR.percent);
    },
    increase: function increase(num) {
      this.$root.RADON_LOADING_BAR.percent = this.$root.RADON_LOADING_BAR.percent + Math.floor(num);
    },
    decrease: function decrease(num) {
      this.$root.RADON_LOADING_BAR.percent = this.$root.RADON_LOADING_BAR.percent - Math.floor(num);
    },
    hide: function hide() {
      clearInterval(this.state.timer);
      this.state.timer = null;
      var this2 = this;
      setTimeout(function() {
        this2.$root.RADON_LOADING_BAR.options.show = false;
        Vue.nextTick(function() {
          setTimeout(function() {
            this2.$root.RADON_LOADING_BAR.percent = 0;
          }, 100);
          if (this2.$root.RADON_LOADING_BAR.options.autoRevert) {
            setTimeout(function() {
              this2.revert();
            }, 300);
          }
        });
      }, 800);
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
      this.$root.RADON_LOADING_BAR.options.canSuccess = false;
      this.$root.RADON_LOADING_BAR.percent = 100;
      this.hide();
    },
    setFailColor: function(color) {
      this.$root.RADON_LOADING_BAR.options.failedColor = color;
    },
    setColor: function(color) {
      this.$root.RADON_LOADING_BAR.options.color = color;
    },
    setLocation: function(loc) {
      this.$root.RADON_LOADING_BAR.options.location = loc;
    },
    setTransition: function(transition) {
      this.$root.RADON_LOADING_BAR.options.transition = transition;
    },
    tempFailColor: function(color) {
      this.state.tFailColor = this.$root.RADON_LOADING_BAR.options.failedColor;
      this.$root.RADON_LOADING_BAR.options.failedColor = color;
    },
    tempColor: function(color) {
      this.state.tColor = this.$root.RADON_LOADING_BAR.options.color;
      this.$root.RADON_LOADING_BAR.options.color = color;
    },
    tempLocation: function(loc) {
      this.state.tLocation = this.$root.RADON_LOADING_BAR.options.location;
      this.$root.RADON_LOADING_BAR.options.location = loc;
    },
    tempTransition: function(transition) {
      this.state.tTransition = this.$root.RADON_LOADING_BAR.options.transition;
      this.$root.RADON_LOADING_BAR.options.transition = transition;
    },
    revertColor: function() {
      this.$root.RADON_LOADING_BAR.options.color = this.state.tColor;
      this.state.tColor = '';
    },
    revertFailColor: function() {
      this.$root.RADON_LOADING_BAR.options.failedColor = this.state.tFailColor;
      this.state.tFailColor = '';
    },
    revertLocation: function() {
      this.$root.RADON_LOADING_BAR.options.location = this.state.tLocation;
      this.state.tLocation = '';
    },
    revertTransition: function() {
      this.$root.RADON_LOADING_BAR.options.transition = this.state.tTransition;
      this.state.tTransition = {};
    },
    revert: function() {
      if (this.state.tColor !== '') {
        this.revertColor();
      }
      if (this.state.tFailColor !== '') {
        this.revertFailColor();
      }
      if (this.state.tLocation !== '') {
        this.revertLocation();
      }
      if (this.state.tTransition.speed !== undefined || this.state.tTransition.opacity !== undefined) {
        this.revertTransition();
      }
    },
    parseMeta: function(meta) {
      for (var x in meta.func) {
        let func = meta.func[x];
        switch (func.call) {
          case 'color':
            switch (func.modifier) {
              case 'set':
                this.setColor(func.argument);
                break;
              case 'temp':
                this.tempColor(func.argument);
                break;
            }
            break;
          case 'fail':
            switch (func.modifier) {
              case 'set':
                this.setFailColor(func.argument);
                break;
              case 'temp':
                this.tempFailColor(func.argument);
                break;
            }
            break;
          case 'location':
            switch (func.modifier) {
              case 'set':
                this.setLocation(func.argument);
                break;
              case 'temp':
                this.tempLocation(func.argument);
                break;
            }
            break;
          case 'transition':
            switch (func.modifier) {
              case 'set':
                this.setTransition(func.argument);
                break;
              case 'temp':
                this.tempTransition(func.argument);
                break;
            }
            break;
        }
      }
    }
  };

  var VueProgressBarEventBus = new Vue({
    data: {
      RADON_LOADING_BAR: {
        percent: 0,
        options: {
          canSuccess: true,
          show: false,
          color: options.color || 'rgb(143, 255, 199)',
          failedColor: options.failedColor || 'red',
          thickness: options.thickness || '2px',
          autoRevert: options.autoRevert !== undefined ? options.autoRevert : true,
          location: options.location || 'top',
          inverse: options.inverse || false,
          transition: options.transition || {
            speed: '0.2s',
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
