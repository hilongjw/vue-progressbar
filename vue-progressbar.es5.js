'use strict';

var _vueProgressbar = require('./vue-progressbar.vue');

var _vueProgressbar2 = _interopRequireDefault(_vueProgressbar);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports.install = function (Vue) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    var isVueNext = Vue.version.split('.')[0] === '2';
    var inBrowser = typeof window !== 'undefined';

    var DEFAULT_OPTION = {
        canSuccess: true,
        show: false,
        color: '#73ccec',
        failedColor: 'red',
        thickness: '2px',
        transition: {
            speed: '0.2s',
            opacity: '0.6s'
        },
        autoRevert: true,
        location: 'top',
        inverse: false
    };

    var Progress = {
        $vm: null,
        state: {
            tFailColor: '',
            tColor: '',
            timer: null,
            cut: 0
        },
        init: function init(vm) {
            this.$vm = vm;
        },
        start: function start(time) {
            var _this = this;

            if (!this.$vm) return;
            if (!time) time = 3000;
            this.$vm.RADON_LOADING_BAR.percent = 0; // this.$vm.RADON_LOADING_BAR.percent
            this.$vm.RADON_LOADING_BAR.options.show = true;
            this.$vm.RADON_LOADING_BAR.options.canSuccess = true;
            this.state.cut = 10000 / Math.floor(time);
            this.state.timer = setInterval(function () {
                _this.increase(_this.state.cut * Math.random());
                if (_this.$vm.RADON_LOADING_BAR.percent > 95) {
                    _this.finish();
                }
            }, 100);
        },
        set: function set(num) {
            this.$vm.RADON_LOADING_BAR.options.show = true;
            this.$vm.RADON_LOADING_BAR.options.canSuccess = true;
            this.$vm.RADON_LOADING_BAR.percent = Math.floor(num);
        },
        get: function get() {
            return Math.floor(this.$vm.RADON_LOADING_BAR.percent);
        },
        increase: function increase(num) {
            this.$vm.RADON_LOADING_BAR.percent = this.$vm.RADON_LOADING_BAR.percent + Math.floor(num);
        },
        decrease: function decrease(num) {
            this.$vm.RADON_LOADING_BAR.percent = this.$vm.RADON_LOADING_BAR.percent - Math.floor(num);
        },
        hide: function hide() {
            var _this2 = this;

            clearInterval(this.state.timer);
            this.state.timer = null;
            setTimeout(function () {
                _this2.$vm.RADON_LOADING_BAR.options.show = false;
                Vue.nextTick(function () {
                    setTimeout(function () {
                        _this2.$vm.RADON_LOADING_BAR.percent = 0;
                    }, 100);
                    if (_this2.$vm.RADON_LOADING_BAR.options.autoRevert) {
                        setTimeout(function () {
                            _this2.revert();
                        }, 300);
                    }
                });
            }, 800);
        },
        pause: function pause() {
            clearInterval(this.state.timer);
        },
        finish: function finish() {
            if (!this.$vm) return;
            this.$vm.RADON_LOADING_BAR.percent = 100;
            this.hide();
        },
        fail: function fail() {
            this.$vm.RADON_LOADING_BAR.options.canSuccess = false;
            this.$vm.RADON_LOADING_BAR.percent = 100;
            this.hide();
        },
        setFailColor: function setFailColor(color) {
            this.$vm.RADON_LOADING_BAR.options.failedColor = color;
        },
        setColor: function setColor(color) {
            this.$vm.RADON_LOADING_BAR.options.color = color;
        },
        setLocation: function setLocation(loc) {
            this.$vm.RADON_LOADING_BAR.options.location = loc;
        },
        setTransition: function setTransition(transition) {
            this.$vm.RADON_LOADING_BAR.options.transition = transition;
        },
        tempFailColor: function tempFailColor(color) {
            this.state.tFailColor = this.$vm.RADON_LOADING_BAR.options.failedColor;
            this.$vm.RADON_LOADING_BAR.options.failedColor = color;
        },
        tempColor: function tempColor(color) {
            this.state.tColor = this.$vm.RADON_LOADING_BAR.options.color;
            this.$vm.RADON_LOADING_BAR.options.color = color;
        },
        tempLocation: function tempLocation(loc) {
            this.state.tLocation = this.$vm.RADON_LOADING_BAR.options.location;
            this.$vm.RADON_LOADING_BAR.options.location = loc;
        },
        tempTransition: function tempTransition(transition) {
            this.state.tTransition = this.$vm.RADON_LOADING_BAR.options.transition;
            this.$vm.RADON_LOADING_BAR.options.transition = transition;
        },
        revertColor: function revertColor() {
            this.$vm.RADON_LOADING_BAR.options.color = this.state.tColor;
            this.state.tColor = '';
        },
        revertFailColor: function revertFailColor() {
            this.$vm.RADON_LOADING_BAR.options.failedColor = this.state.tFailColor;
            this.state.tFailColor = '';
        },
        revertLocation: function revertLocation() {
            this.$vm.RADON_LOADING_BAR.options.location = this.state.tLocation;
            this.state.tLocation = '';
        },
        revertTransition: function revertTransition() {
            this.$vm.RADON_LOADING_BAR.options.transition = this.state.tTransition;
            this.state.tTransition = {};
        },
        revert: function revert() {
            if (this.$vm.RADON_LOADING_BAR.options.autoRevert) {
                if (this.state.tColor) {
                    this.revertColor();
                }
                if (this.state.tFailColor) {
                    this.revertFailColor();
                }
                if (this.state.tLocation) {
                    this.revertLocation();
                }
                if (this.state.tTransition && (this.state.tTransition.speed !== undefined || this.state.tTransition.opacity !== undefined)) {
                    this.revertTransition();
                }
            }
        },
        parseMeta: function parseMeta(meta) {
            for (var x in meta.func) {
                var func = meta.func[x];
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

    var progressOptions = Object.assign(DEFAULT_OPTION, options);

    var VueProgressBarEventBus = new Vue({
        data: {
            RADON_LOADING_BAR: {
                percent: 0,
                options: progressOptions
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