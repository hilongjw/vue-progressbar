'use strict'
import vueProgressBar from './vue-progressbar.vue'

module.exports.install = function (Vue, options = {}) {
    Vue.component('vue-progress-bar', vueProgressBar)
    let Progress = {
        $root: null,
        state: {
            timer: null,
            cut: 0
        },
        init (vm) {
            this.$root = vm
            let data = vm.$options.data
            data = typeof data === 'function'
                ? data.call(vm)
                : data || {}

            if (!data) {
                console.error('data functions should return an object.')
            }

            data['RADON_LOADING_BAR'] ={
                percent: 0,
                options: {
                    canSuccess: true,
                    show: false,
                    color: options.color || 'rgb(143, 255, 199)',
                    failedColor: options.failedColor || 'red',
                    height: options.height || '2px'
                }
            }
            vm.$options.data = data
        },
        start (time) {
            if (!time) time = 3000
            this.$root.RADON_LOADING_BAR.percent = 0
            this.$root.RADON_LOADING_BAR.options.show = true
            this.$root.RADON_LOADING_BAR.options.canSuccess = true
            this.state.cut = 10000 / Math.floor(time)
            this.state.timer = setInterval(() => {
                this.increase(this.state.cut * Math.random())
                if (this.$root.RADON_LOADING_BAR.percent > 95) {
                    this.finish()
                }
            }, 100)
        },
        set (num) {
            this.$root.RADON_LOADING_BAR.options.show = true
            this.$root.RADON_LOADING_BAR.options.canSuccess = true
            this.$root.RADON_LOADING_BAR.percent = Math.floor(num)
        },
        get () {
            return Math.floor(this.$root.RADON_LOADING_BAR.percent)
        },
        increase (num) {
            this.$root.RADON_LOADING_BAR.percent = this.$root.RADON_LOADING_BAR.percent + Math.floor(num)
        },
        decrease (num) {
            this.$root.RADON_LOADING_BAR.percent = this.$root.RADON_LOADING_BAR.percent - Math.floor(num)
        },
        hide () {
            clearInterval(this.state.timer)
            this.state.timer = null
            setTimeout(() => {
                this.$root.RADON_LOADING_BAR.options.show = false
                Vue.nextTick(() => {
                    setTimeout(() => {
                        this.$root.RADON_LOADING_BAR.percent = 0
                    }, 100)
                })
            }, 800)
        },
        finish () {
            this.$root.RADON_LOADING_BAR.percent = 100
            this.hide()
        },
        fail () {
            this.$root.RADON_LOADING_BAR.options.canSuccess = false
            this.$root.RADON_LOADING_BAR.percent = 100
            this.hide()
        }
    }

    Vue.mixin({
        beforeCreate () {
            if (!Progress.$root) {
                if (this === this.$root) {
                    Progress.init(this)
                }
            }
        }
    })

    Vue.prototype.$Progress = Progress
}
