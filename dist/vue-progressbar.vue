<template>
<div :show='show' :options='options' :reference='reference' :class='classStyle' :style='style'>
</div>
</template>

<script>
import gradients from './assets/gradient-classes'

const inBrowser = typeof window !== 'undefined'

export default {
  name: 'VueProgress',
  serverCacheKey: (props) => 'Progress-' + props.reference,
  props: ['reference', 'options', 'show'],
  data () {
    return {
      progression: -1,
      canUpdate: true,
      defaultData: {
        init: true,
        initiated: false,
        started: false,
        finished: false,
        percent: 0,
        hidden: true,
        progression: 0,
        quickHide: false,
        quicklyHid: false,
        temp: {
          gradient:{
            use: false,
            gradient: ''
          },
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
          trail: '-1px',
          transition: {
            time: '0.2s',
            opacity: '0.6s'
          },
          bounce: false
        },
        options: {
          gradient:{
            use: false,
            gradient: ''
          },
          autoRevert: true,
          canSuccess: true,
          color: 'rgb(19, 91, 55)',
          debug: false,
          failedColor: 'red',
          inverse: false,
          location: 'top',
          show: false,
          thickness: '2px',
          trail: '-1px',
          transition: {
            time: '0.2s',
            opacity: '0.6s'
          },
          bounce: false
        }
      }
    }
  },
  created () {
    if (this.$pb.version()) {
      this.$pb.create(this.reference, this.options)
    } else {
      this.canUpdate = false
    }
  },
  methods: {
    generateGradient () {
      var length = 0
      for (var variable in gradients.classes) {
        if (gradients.classes.hasOwnProperty(variable)) {
          length++
        }
      }
      var x = gradients.classes[Math.floor(Math.random() * (length - 5)) + 5]
      return x
    }
  },
  computed: {
    style () {
      let progression = this.bar.progression
      let bar = this.bar.data
      if (this.canUpdate && bar.initiated) {
        let qHide = bar.quickHide
        let hidden = bar.hidden
        let percent = bar.percent
        let options = !bar.temp.use ? bar.options : bar.temp
        let opacity = options.show ? 1 : 0
        let bounce = options.bounce
        let trail = parseFloat(options.trail.replace('/(px)/'))
        let position = options.location
        let gradient = options.gradient
        let inverse = options.inverse
        let transitionTime = options.transition.time
        let opacityTime = options.transition.opacity
        let thickness = options.thickness
        let style = {}
        style.opacity = opacity
        this.classStyle = '__cov-progress '
        if (!gradient.use) {
          options.canSuccess ? style['background-color'] = options.color : style['background-color'] = options.failedColor + ' !important'
        } else if (gradient.use && !qHide) {
          var regexGradient = new RegExp('(predefined)|((linear-gradient)\\(to (top|bottom|left|right), (rgb\\([0-9]{1,3}, [0-9]{1,3}, [0-9]{1,3}\\)|#[a-zA-Z0-9]{6}|#[a-zA-Z0-9]{3}|), (rgb\\([0-9]{1,3}, [0-9]{1,3}, [0-9]{1,3}\\)|#[a-zA-Z0-9]{6}|#[a-zA-Z0-9]{3}|)\\))');
          if (progression !== this.progression) {
            this.progression = progression
            if (gradient.gradient === 'predefined') {
              gradient.gradient = this.generateGradient()
            }
          }
          if (options.canSuccess) {
            if (gradients.classes.includes(gradient.gradient)) {
              this.classStyle += gradient.gradient + ' '
            } else if (regexGradient.test(gradient.gradient)){
              style['background'] = gradient.gradient
            }
          } else {
            style['background'] = options.failedColor
          }
        }
        if (position === 'top' || position === 'bottom') {
          position === 'top' ? style.top = '0px' : style.bottom = '0px'
          if (!qHide) {
            style.transition = 'width ' + transitionTime + ', margin ' + transitionTime + ', height 1ms, left ' + transitionTime + ', right ' + transitionTime + ', opacity ' + opacityTime
            if (inverse) {
              this.classStyle += 'right '
              if (trail >= 0) {
                style.width = trail + 'px'
                style.margin = '0 ' + (percent) + 'vw 0 ' + -1 * percent + 'vw'
                if (percent <= ((window.innerWidth - (window.innerWidth - trail)) / 100)) {
                  style.right = (-1 * trail) + 'px'
                } else {
                  style.right = '0px'
                }
              } else {
                style.right = '0px'
                style.width = percent + '%'
              }
            } else {
              this.classStyle += 'left '
              if (trail >= 0) {
                style.width = trail + 'px'
                style.margin = '0 ' + (-1 * percent) + 'vw 0 ' + percent + 'vw'
                if (percent <= ((window.innerWidth - (window.innerWidth - trail)) / 100)) {
                  style.left = (-1 * trail) + 'px'
                } else {
                  style.left = '0px'
                }
              } else {
                style.left = '0px'
                style.width = percent + '%'
              }
            }
            style.height = thickness
          }
          if (qHide || hidden) {
            style.transition = 'height 1ms, margin 1ms, width 1ms, top 1ms, bottom 1ms, left 1ms, right 1ms, opacity 1ms'
            style.opacity = 0
            inverse ? style.right = '0px' : style.left = '0px'
            style.width = '0px'
            style.height = '0px'
          }
        } else if (position === 'left' || position === 'right') {
          position === 'left' ? style.left = '0px' : style.right = '0px'
          if (!qHide) {
            style.transition = 'left ' + transitionTime + ', height ' + transitionTime + ', margin ' + transitionTime + ', width 1ms, top ' + transitionTime + ', bottom ' + transitionTime + ', opacity ' + opacityTime
            if (inverse) {
              this.classStyle += 'top side '
              if (trail >= 0) {
                style.height = trail + 'px'
                style.margin = percent + 'vh 0 ' + (-1 * percent) + 'vh 0'
                if (percent <= ((window.innerHeight - (window.innerHeight - trail)) / 100)) {
                  style.top = (-1 * trail) + 'px'
                } else {
                  style.top = '0px'
                }
              } else {
                style.height = percent + '%'
                style.top = '0px'
              }
            } else {
              this.classStyle += 'bottom side '
              if (trail >= 0) {
                style.height = trail + 'px'
                style.margin = (-1 * percent) + 'vh 0 ' + percent + 'vh 0'
                if (percent <= ((window.innerHeight - (window.innerHeight - trail)) / 100)) {
                  style.bottom = (-1 * trail) + 'px'
                } else {
                  style.bottom = '0px'
                }
              } else {
                style.height = percent + '%'
                style.bottom = '0px'
              }
            }
            style.width = thickness
          }
          if (qHide || hidden) {
            style.transition = 'width 1ms, margin 1ms, height 1ms, left 1ms, right 1ms, top 1ms, bottom 1ms, opacity 1ms'
            style.opacity = 0
            inverse ? style.top = '0px' : style.bottom = '0px'
            style.height = '0px'
            style.width = '0px'
          }
        }
        return style
      }
      return {}
    },
    bar () {
      if (this.$pb.version()) {
        var bar = this.$pb.get(this.reference)
        if (bar !== null) {
          return bar.progressions[bar.progression]
        } else {
          return this.defaultData
        }
      }
    }
  }
}
</script>
<style src='./assets/stylelist.css'>

</style>
