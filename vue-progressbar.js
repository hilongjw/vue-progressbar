'use strict'

import vueProgressBar from './vue-progressbar.vue'

module.exports.install = function (Vue, options = {}) {
    const isVueNext = Vue.version.split('.')[0] === '2'
    
    let Progress = {
        $root: null,
        state: {
            timer: null,
            cut: 0
        },
        init (vm) {
            this.$root = vm
        },
        start (time) {
            if (!time) time = 3000
            if (!this.$root) return
            this.$root.RADON_LOADING_BAR.percent = this.$root.RADON_LOADING_BAR.percent
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
        pause () {
            clearInterval(this.state.timer)
        },
        finish () {
            if (!this.$root) return
            this.$root.RADON_LOADING_BAR.percent = 100
            this.hide()
        },
        fail () {
            this.$root.RADON_LOADING_BAR.options.canSuccess = false
            this.$root.RADON_LOADING_BAR.percent = 100
            this.hide()
        }
    }

    const VueProgressBarEventBus = new Vue({
        data: {
            RADON_LOADING_BAR: {
                percent: 0,
                options: {
                    canSuccess: true,
                    show: false,
                    color: options.color || 'rgb(143, 255, 199)',
                    failedColor: options.failedColor || 'red',
                    height: options.height || '2px'
                }
            }
        }  
    })

    window.VueProgressBarEventBus = VueProgressBarEventBus

    Progress.init(VueProgressBarEventBus)
    
    Vue.component('vue-progress-bar', vueProgressBar)

    Vue.prototype.$Progress = Progress
}