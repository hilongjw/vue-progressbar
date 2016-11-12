'use strict'

import vueProgressBar from './vue-progressbar.vue'

const regexColor = new RegExp("(^#[0-9a-fA-F]{6}$)|(^#[0-9a-fA-F]{3}$)|(^rgb([0-9]{1,3}, [0-9]{1,3}, [0-9]{1,3})$)")
const regexLocation = new RegExp("(left|right|top|bottom)")
const regexTime = new RegExp("(\\d+\\.\\d+)(s|ms)|(\\.\\d+)(s|ms)|(\\d+)(s|ms)")
const regexThickness = new RegExp("(\\d+\\.\\d+)(px|em|pt|%|vh|vw)|(\\.\\d+)(px|em|pt|%|vh|vw)|(\\d+)(px|em|pt|%|vh|vw)")

const isVueNext = Vue.version.split('.')[0] === '2'
const inBrowser = typeof window !== 'undefined'

module.exports.install = function(Vue, options = {}) {
  let Progress = {
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
    log (message) {
      if (this.state.settings.debug) {
        console.log(message)
      }
    },
    init (vm) {
      this.$root = vm
      this.state.settings = this.$root.RADON_LOADING_BAR.options
    },
    start (time) {
      this.$root.RADON_LOADING_BAR.temp.use ? this.state.settings = this.$root.RADON_LOADING_BAR.temp : this.state.settings = this.$root.RADON_LOADING_BAR.options
      var _this = this
      if (!time) {
        if (regexTime.test(this.state.settings.transition.time)) {
          this.state.pTime = parseFloat(this.state.settings.transition.time.replace('/(ms|s)/'))
          if (!this.state.settings.transition.time.includes('ms')) {
            this.state.pTime *= 1000
          }
          time = this.state.pTime
        } else {
          this.log('invalid time: ' + this.state.settings.transition.time)
          this.log('valid formats: ##, #.#, .# [ms|s]')
          this.log('example: 1000ms, 1.0s, .10ms')
          this.state.pTime = time = 3000
        }
      }
      if (!this.$root) return
      this.$root.RADON_LOADING_BAR.hidden = false
      this.state.settings.show = true
      this.state.settings.canSuccess = true
      this.state.cut = 10000 / Math.floor(time)
      this.state.timer = setInterval(function() {
        _this.increase( _this.state.cut * Math.random())
        if (_this.$root.RADON_LOADING_BAR.percent > 95) {
          _this.finish()
        }
      }, 100)
    },
    set (num) {
      this.$root.RADON_LOADING_BAR.options.show = true
      this.$root.RADON_LOADING_BAR.options.canSuccess = true
      this.$root.RADON_LOADING_BAR.percent = Math.floor(num)
    },
    h_setFailColor (color, temp) {
      if (temp) {
        this.$root.RADON_LOADING_BAR.temp.failedColor = color
        !this.$root.RADON_LOADING_BAR.temp.use ? this.$root.RADON_LOADING_BAR.temp.use = true : null
      } else {
        this.$root.RADON_LOADING_BAR.options.failedColor = color
      }
    },
    h_setColor (color, temp) {
      if (temp) {
        this.$root.RADON_LOADING_BAR.temp.color = color
        !this.$root.RADON_LOADING_BAR.temp.use ? this.$root.RADON_LOADING_BAR.temp.use = true : null
      } else {
        this.$root.RADON_LOADING_BAR.options.color = color
      }
    },
    h_setLocation (loc, temp) {
      if (temp) {
        this.$root.RADON_LOADING_BAR.temp.location = loc
        !this.$root.RADON_LOADING_BAR.temp.use ? this.$root.RADON_LOADING_BAR.temp.use = true : null
      } else {
        this.$root.RADON_LOADING_BAR.options.location = loc
      }
    },
    h_setTransition (transition, temp) {
      if (temp) {
        this.$root.RADON_LOADING_BAR.temp.transition = transition
        !this.$root.RADON_LOADING_BAR.temp.use ? this.$root.RADON_LOADING_BAR.temp.use = true : null
      } else {
        this.$root.RADON_LOADING_BAR.options.transition = transition
      }
    },
    h_setInverse (inverse, temp) {
      if (temp) {
        this.$root.RADON_LOADING_BAR.temp.inverse = inverse
        !this.$root.RADON_LOADING_BAR.temp.use ? this.$root.RADON_LOADING_BAR.temp.use = true : null
      } else {
        this.$root.RADON_LOADING_BAR.options.inverse = inverse
      }
    },
    h_setThickness (thickness, temp) {
      if (temp) {
        this.$root.RADON_LOADING_BAR.temp.thickness = thickness
        !this.$root.RADON_LOADING_BAR.temp.use ? this.$root.RADON_LOADING_BAR.temp.use = true : null
      } else {
        this.$root.RADON_LOADING_BAR.options.thickness = thickness
      }
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
    readyToRevert () {
      if (this.$root.RADON_LOADING_BAR.hidden) {
        this.revert()
      } else {
        var this2 = this
        this.state.revertTimer = setTimeout(function() {
          this2.readyToRevert()
        }, 500)
      }
    },
    revert () {
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
      }
      this.log('reverted.')
    },
    quickHide () {
      this.$root.RADON_LOADING_BAR.quickHide = true
      this.$root.RADON_LOADING_BAR.percent = 0
      clearInterval(this.state.timer)
      clearTimeout(this.state.hideTimer)
      clearTimeout(this.state.hideTimer2)
      this.state.timer = null
      if (this.state.settings.autoRevert && this.$root.RADON_LOADING_BAR.temp.use) {
        clearTimeout(this.state.revertTimer)
        this.revert()
      }
      return true
    },
    hide () {
      clearInterval(this.state.timer)
      this.state.timer = null
      var this2 = this
      if (this.state.settings.autoRevert && this2.$root.RADON_LOADING_BAR.temp.use) {
        this.readyToRevert()
      }
      this.state.hideTimer = setTimeout(function() {
        this2.$root.RADON_LOADING_BAR.options.show = false
        this2.$root.RADON_LOADING_BAR.percent = 0
        this2.state.hideTimer2 = setTimeout(function() {
          this2.$root.RADON_LOADING_BAR.hidden = true
        }, this2.state.pTime)
      }, this.state.pTime)
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
    },
    callMeta (...args) {
      var temp
      args[1] === 'temp' ? temp = true : temp = false
      if (args[0] === 'color') {
        this.call('set', 'color', args[2], temp)
      } else if (args[0] === 'fail') {
        this.call('set', 'fail', args[2], temp)
      } else if (args[0] === 'location') {
        this.call('set', 'location', args[2], temp)
      } else if (args[0] === 'transition') {
        this.call('set', 'transition', args[2], temp)
      } else if (args[0] === 'inverse') {
        this.call('set', 'inverse', args[2], temp)
      } else if (args[0] === 'thickness') {
        this.call('set', 'thickness', args[2], temp)
      }
    },
    callSetTemp (...args) {
      if (args[0] === 'color') {
        this.validColor(args[1]) ? this.h_setColor(args[1], args[2]) : this.log('invalid color input: \"' + args[1] + '\"')
      } else if (args[0] === 'fail') {
        this.validColor(args[1]) ? this.h_setFailColor(args[1], args[2]) : this.log('invalid color input: \"' + args[1] + '\"')
      } else if (args[0] === 'location') {
        this.validLocation(args[1]) ? this.h_setLocation(args[1], args[2]) : this.log('invalid location input: \"' + args[1] + '\"')
      } else if (args[0] === 'transition') {
        var transition = this.$root.RADON_LOADING_BAR.options.transition
        if (args[1].time !== undefined) {
          this.validTime(args[1].time) ? transition.time = args[1].time : this.log('invalid transition time: \"' + args[1].time + '\". Using default.')
        }
        if (args[1].opacity !== undefined ) {
          this.validTime(args[1].opacity) ? transition.opacity = args[1].opacity : this.log('invalid transition opacity: \"' + args[1].opacity + '\". Using default.')
        }
        this.h_setTransition(transition, args[2])
      } else if (args[0] === 'inverse') {
        typeof args[1] === 'boolean' ? this.h_setInverse(args[1], args[2]) : this.log('invalid inverse: \"' + args[1] + '\"')
      } else if (args[0] === 'thickness') {
        this.validThickness(args[1]) ? this.h_setThickness(args[1], args[2]) : this.log('invalid thickness: \"' + args[1] + '\"')
      }
    },
    callRevert (revert) {
      if (revert === 'color') {
        this.h_setColor(this.$root.RADON_LOADING_BAR.options.color, true)
      } else if (revert === 'fail') {
        this.h_setFailColor(this.$root.RADON_LOADING_BAR.options.fail, true)
      } else if (revert === 'location') {
        this.h_setLocation(this.$root.RADON_LOADING_BAR.options.location, true)
      } else if (revert === 'transition') {
        this.h_setTransition(this.$root.RADON_LOADING_BAR.options.transition, true)
      } else if (revert === 'inverse') {
        this.h_setInverse(this.$root.RADON_LOADING_BAR.options.inverse, true)
      } else if (revert === 'thickness') {
        this.h_setThickness(this.$root.RADON_LOADING_BAR.options.thickness, true)
      }
    },
    call (...args) {
      var args = Array.prototype.slice.call(arguments)
      var temp
      ((args[0] === 'temp' || args[0] === 'set') && args[3] !== undefined) ? temp = args[3] : temp = null
      switch(args[0]) {
        case 'meta':
          this.callMeta(args[1], args[2], args[3])
          break
        case 'temp':
          if (temp === null) temp = true
          this.callSetTemp(args[1], args[2], temp)
          break
        case 'set':
          if (temp === null) temp = false
          this.callSetTemp(args[1], args[2], temp)
          break
        case 'revert':
          this.callRevert(args[1])
          break
      }
    },
    validColor (color) {
      return regexColor.test(color)
    },
    validLocation (location) {
      return regexLocation.test(location)
    },
    validTime (time) {
      return regexTime.test(time)
    },
    validThickness (thickness) {
      return regexThickness.test(thickness)
    },
    parseMeta (meta) {
      for (var x in meta.func) {
        this.call('meta', meta.func[x].call, meta.func[x].modifier, meta.func[x].argument)
      }
    }
  }

  const VueProgressBarEventBus = new Vue({
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
  })

  if (inBrowser) {
    window.VueProgressBarEventBus = VueProgressBarEventBus
    Progress.init(VueProgressBarEventBus)
  }

  Vue.component('vue-progress-bar', vueProgressBar)

  Vue.prototype.$Progress = Progress
}
