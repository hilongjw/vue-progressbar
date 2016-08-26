'use strict'
import vueProgressBar from './vue-progressbar.vue'

module.exports.install = function (Vue, options = {}) {
    let $root = null

    Vue.mixin({
        created () {
            if (!$root) {
                if (this === this.$root) {
                    $root = this
                    Vue.set($root, 'RADON_LOADING_BAR', {
                        percent: 0,
                        options: {
                            canSuccess: true,
                            show: false,
                            color: options.color || 'rgb(143, 255, 199)',
                            failedColor: options.failedColor || 'red',
                            height: options.height || '2px'
                        }
                    })
                    Vue.component('vue-progress-bar', vueProgressBar)
                }
            }
        }
    })

    Vue.prototype.$Progress = {
        timer: null,
        cut: 0,
        start (time) {
            if (!time) time = 3000
            $root.RADON_LOADING_BAR.percent = 0
            $root.RADON_LOADING_BAR.options.show = true
            $root.RADON_LOADING_BAR.options.canSuccess = true
            this.cut = 10000 / Math.floor(time)
            this.timer = setInterval(() => {
                this.increase(this.cut * Math.random())
                if ($root.RADON_LOADING_BAR.percent > 95) {
                    this.finish()
                }
            }, 100)
        },
        set (num) {
            $root.RADON_LOADING_BAR.options.show = true
            $root.RADON_LOADING_BAR.options.canSuccess = true
            $root.RADON_LOADING_BAR.percent = Math.floor(num)
        },
        get () {
            return Math.floor($root.RADON_LOADING_BAR.percent)
        },
        increase (num) {
            $root.RADON_LOADING_BAR.percent = $root.RADON_LOADING_BAR.percent + Math.floor(num)
        },
        decrease (num) {
            $root.RADON_LOADING_BAR.percent = $root.RADON_LOADING_BAR.percent - Math.floor(num)
        },
        hide () {
            clearInterval(this.timer)
            this.timer = null
            setTimeout(() => {
                $root.RADON_LOADING_BAR.options.show = false
                Vue.nextTick(() => {
                    setTimeout(() => {
                        $root.RADON_LOADING_BAR.percent = 0
                    }, 100)
                })
            }, 800)
        },
        finish () {
            $root.RADON_LOADING_BAR.percent = 100
            this.hide()
        },
        fail () {
            $root.RADON_LOADING_BAR.options.canSuccess = false
            $root.RADON_LOADING_BAR.percent = 100
            this.hide()
        }
    }
}