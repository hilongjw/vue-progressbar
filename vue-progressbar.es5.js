'use strict';

var _vueProgressbar = require('./vue-progressbar.vue');

var _vueProgressbar2 = _interopRequireDefault(_vueProgressbar);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports.install = function (Vue) {
    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    var $root = null;

    Vue.mixin({
        created: function created() {
            if (!$root) {
                if (this === this.$root) {
                    $root = this;
                    Vue.set($root, 'RADON_LOADING_BAR', {
                        percent: 0,
                        options: {
                            canSuccess: true,
                            show: false,
                            color: options.color || 'rgb(143, 255, 199)',
                            failedColor: options.failedColor || 'red',
                            height: options.height || '2px'
                        }
                    });
                    Vue.component('vue-progress-bar', _vueProgressbar2.default);
                }
            }
        }
    });

    Vue.prototype.$Progress = {
        timer: null,
        cut: 0,
        start: function start(time) {
            var _this = this;

            if (!time) time = 3000;
            $root.RADON_LOADING_BAR.percent = 0;
            $root.RADON_LOADING_BAR.options.show = true;
            $root.RADON_LOADING_BAR.options.canSuccess = true;
            this.cut = 10000 / Math.floor(time);
            this.timer = setInterval(function () {
                _this.increase(_this.cut * Math.random());
                if ($root.RADON_LOADING_BAR.percent > 95) {
                    _this.finish();
                }
            }, 100);
        },
        set: function set(num) {
            $root.RADON_LOADING_BAR.options.show = true;
            $root.RADON_LOADING_BAR.options.canSuccess = true;
            $root.RADON_LOADING_BAR.percent = Math.floor(num);
        },
        get: function get() {
            return Math.floor($root.RADON_LOADING_BAR.percent);
        },
        increase: function increase(num) {
            $root.RADON_LOADING_BAR.percent = $root.RADON_LOADING_BAR.percent + Math.floor(num);
        },
        decrease: function decrease(num) {
            $root.RADON_LOADING_BAR.percent = $root.RADON_LOADING_BAR.percent - Math.floor(num);
        },
        hide: function hide() {
            clearInterval(this.timer);
            this.timer = null;
            setTimeout(function () {
                $root.RADON_LOADING_BAR.options.show = false;
                Vue.nextTick(function () {
                    setTimeout(function () {
                        $root.RADON_LOADING_BAR.percent = 0;
                    }, 100);
                });
            }, 800);
        },
        finish: function finish() {
            $root.RADON_LOADING_BAR.percent = 100;
            this.hide();
        },
        fail: function fail() {
            $root.RADON_LOADING_BAR.options.canSuccess = false;
            $root.RADON_LOADING_BAR.percent = 100;
            this.hide();
        }
    };
};