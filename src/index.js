'use strict'

import vueProgressBar from './vue-progressbar.vue'

function assign (target, source) { // eslint-disable-line no-unused-vars
    for (var index = 1, key, src; index < arguments.length; ++index) {
        src = arguments[index];

        for (key in src) {
            if (Object.prototype.hasOwnProperty.call(src, key)) {
                target[key] = src[key];
            }
        }
    }

    return target
}

function install (Vue, options = {}) {
    const isVueNext = Vue.version.split('.')[0] === '2'
    const inBrowser = typeof window !== 'undefined'

    const DEFAULT_OPTION = {
        canSuccess: true,
        show: false,
        color: '#73ccec',
        position: 'fixed',
        failedColor: 'red',
        thickness: '2px',
        transition: {
            speed: '0.2s',
            opacity: '0.6s',
            termination: 300
        },
        autoRevert: true,
        location: 'top',
        inverse: false,
        autoFinish: true
    }

    let Progress = {
        $vm: null,
        state: {
            tFailColor: '',
            tColor: '',
            timer: null,
            cut: 0
        },
        init (vm) {
            this.$vm = vm
        },
        start (time) {
            if (!this.$vm) return
            if (!time) time = 3000
            this.$vm.RADON_LOADING_BAR.percent = 0 // this.$vm.RADON_LOADING_BAR.percent
            this.$vm.RADON_LOADING_BAR.options.show = true
            this.$vm.RADON_LOADING_BAR.options.canSuccess = true
            this.state.cut = 10000 / Math.floor(time)
            clearInterval(this.state.timer)
            this.state.timer = setInterval(() => {
                this.increase(this.state.cut * Math.random())
                if (this.$vm.RADON_LOADING_BAR.percent > 95 && this.$vm.RADON_LOADING_BAR.options.autoFinish) {
                    this.finish()
                }
            }, 100)
        },
        set (num) {
            this.$vm.RADON_LOADING_BAR.options.show = true
            this.$vm.RADON_LOADING_BAR.options.canSuccess = true
            this.$vm.RADON_LOADING_BAR.percent = Math.floor(num)
        },
        get () {
            return Math.floor(this.$vm.RADON_LOADING_BAR.percent)
        },
        increase (num) {
            this.$vm.RADON_LOADING_BAR.percent = Math.min(99, this.$vm.RADON_LOADING_BAR.percent + Math.floor(num))
        },
        decrease (num) {
            this.$vm.RADON_LOADING_BAR.percent = this.$vm.RADON_LOADING_BAR.percent - Math.floor(num)
        },
        hide () {
            clearInterval(this.state.timer)
            this.state.timer = null
            setTimeout(() => {
                this.$vm.RADON_LOADING_BAR.options.show = false
                Vue.nextTick(() => {
                    setTimeout(() => {
                        this.$vm.RADON_LOADING_BAR.percent = 0
                    }, 100)
                    if (this.$vm.RADON_LOADING_BAR.options.autoRevert) {
                        setTimeout(() => {
                            this.revert()
                        }, 300)
                    }
                })
            }, this.$vm.RADON_LOADING_BAR.options.transition.termination)
        },
        pause () {
            clearInterval(this.state.timer)
        },
        finish () {
            if (!this.$vm) return
            this.$vm.RADON_LOADING_BAR.percent = 100
            this.hide()
        },
        fail () {
            this.$vm.RADON_LOADING_BAR.options.canSuccess = false
            this.$vm.RADON_LOADING_BAR.percent = 100
            this.hide()
        },
        setFailColor (color) {
            this.$vm.RADON_LOADING_BAR.options.failedColor = color
        },
        setColor (color) {
            this.$vm.RADON_LOADING_BAR.options.color = color
        },
        setLocation (loc) {
            this.$vm.RADON_LOADING_BAR.options.location = loc
        },
        setTransition (transition) {
            this.$vm.RADON_LOADING_BAR.options.transition = transition
        },
        tempFailColor (color) {
            this.state.tFailColor = this.$vm.RADON_LOADING_BAR.options.failedColor
            this.$vm.RADON_LOADING_BAR.options.failedColor = color
        },
        tempColor (color) {
            this.state.tColor = this.$vm.RADON_LOADING_BAR.options.color
            this.$vm.RADON_LOADING_BAR.options.color = color
        },
        tempLocation (loc) {
            this.state.tLocation = this.$vm.RADON_LOADING_BAR.options.location
            this.$vm.RADON_LOADING_BAR.options.location = loc
        },
        tempTransition (transition) {
            this.state.tTransition = this.$vm.RADON_LOADING_BAR.options.transition
            this.$vm.RADON_LOADING_BAR.options.transition = transition
        },
        revertColor () {
            this.$vm.RADON_LOADING_BAR.options.color = this.state.tColor
            this.state.tColor = ''
        },
        revertFailColor () {
            this.$vm.RADON_LOADING_BAR.options.failedColor = this.state.tFailColor
            this.state.tFailColor = ''
        },
        revertLocation () {
            this.$vm.RADON_LOADING_BAR.options.location = this.state.tLocation
            this.state.tLocation = ''
        },
        revertTransition () {
            this.$vm.RADON_LOADING_BAR.options.transition = this.state.tTransition
            this.state.tTransition = {}
        },
        revert () {
            if (this.$vm.RADON_LOADING_BAR.options.autoRevert) {
                if (this.state.tColor) {
                    this.revertColor()
                }
                if (this.state.tFailColor) {
                    this.revertFailColor()
                }
                if (this.state.tLocation) {
                    this.revertLocation()
                }
                if (this.state.tTransition && (this.state.tTransition.speed !== undefined || this.state.tTransition.opacity !== undefined)) {
                    this.revertTransition()
                }
            }
        },
        parseMeta (meta) {
            for (var x in meta.func) {
                let func = meta.func[x];
                switch (func.call) {
                    case 'color':
                        switch (func.modifier) {
                            case 'set':
                                this.setColor(func.argument)
                                break
                            case 'temp':
                                this.tempColor(func.argument)
                                break
                        }
                        break;
                    case 'fail':
                        switch (func.modifier) {
                            case 'set':
                                this.setFailColor(func.argument)
                                break
                            case 'temp':
                                this.tempFailColor(func.argument)
                                break
                        }
                        break;
                    case 'location':
                        switch (func.modifier) {
                            case 'set':
                                this.setLocation(func.argument)
                                break
                            case 'temp':
                                this.tempLocation(func.argument)
                                break
                        }
                        break
                    case 'transition':
                        switch (func.modifier) {
                            case 'set':
                                this.setTransition(func.argument)
                                break
                            case 'temp':
                                this.tempTransition(func.argument)
                                break
                        }
                        break
                }
            }
        }
    }

    const progressOptions = assign(DEFAULT_OPTION, options)

    const VueProgressBarEventBus = new Vue({
        data: {
            RADON_LOADING_BAR: {
                percent: 0,
                options: progressOptions
            }
        }
    })

    if (inBrowser) {
        window.VueProgressBarEventBus = VueProgressBarEventBus
        Progress.init(VueProgressBarEventBus)
    }

    Vue.component('vue-progress-bar', vueProgressBar)

    Vue.prototype.$Progress = Progress
}

export default {
    install
}
