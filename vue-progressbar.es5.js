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
          setTimeout(function() {
            this2.revert();
          }, 300);
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
    tempFailColor: function(color) {
      this.state.tFailColor = this.$root.RADON_LOADING_BAR.options.failedColor;
      this.$root.RADON_LOADING_BAR.options.failedColor = color;
    },
    tempColor: function(color) {
      this.state.tColor = this.$root.RADON_LOADING_BAR.options.color;
      this.$root.RADON_LOADING_BAR.options.color = color;
    },
    revertColor: function() {
      this.$root.RADON_LOADING_BAR.options.color = this.state.tColor;
      this.state.tColor = '';
    },
    revertFailColor: function() {
      this.$root.RADON_LOADING_BAR.options.failedColor = this.state.tFailColor;
      this.state.tFailColor = '';
    },
    revert: function() {
      if (this.$root.RADON_LOADING_BAR.options.autoRevert) {
        if (this.state.tColor !== '') {
          this.revertColor();
        }
        if (this.state.tFailColor !== '') {
          this.revertFailColor();
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
          height: options.height || '2px',
          autoRevert: options.autoRevert !== undefined ? options.autoRevert : true
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