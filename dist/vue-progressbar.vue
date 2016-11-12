<style>
.__cov-progress {
  position: fixed;
  opacity: 1;
  z-index: 999999;
}
</style>
<template>
  <div>
    <div class="__cov-progress" :style="style">
    </div>
  </div>
</template>
<script>
const inBrowser = typeof window !== 'undefined'
export default {
  name: 'VueProgress',
  serverCacheKey: () => 'Progress',
  data () {
    return {
      quicklyHid: false,
    }
  },
  computed: {
    style() {
      if (this.quicklyHid) {
        this.quicklyHid = this.progress.quickHide = false
      }
      let options
      !this.progress.temp.use ? options = this.progress.options : options = this.progress.temp
      let position = options.location
      let style = {
        'background-color': options.canSuccess ? options.color : options.failedColor,
        'opacity': options.show ? 1 : 0
      }
      if (position == 'top' || position == 'bottom') {
        position === 'top' ? style.top = '0px' : style.bottom = '0px'
        options.inverse ? style.right = '0px' : style.left = '0px'
        !this.progress.quickHide ? style.transition = "width " + options.transition.time + ", opacity " + options.transition.opacity : "width 1ms, opacity 1ms"
        !this.progress.quickHide ? style.height = options.thickness : style.height = '0px'
        !this.progress.quickHide ? style.width = this.progress.percent + '%' : style.width = '0%'
      } else if (position == 'left' || position == 'right') {
        position === 'left' ? style.left = '0px' : style.right = '0px'
        options.inverse ? style.top = '0px' : style.bottom = '0px'
        !this.progress.quickHide ? style.transition = "height " + options.transition.time + ", opacity " + options.transition.opacity : "height 1ms, opacity 1ms"
        !this.progress.quickHide ? style.width = options.thickness : style.width = "0px"
        !this.progress.quickHide ? style.height = this.progress.percent + '%' : style.height = '0%'
      }
      this.progress.quickHide ? this.quicklyHid = true : null
      options.debug ? console.log('percent: ' + this.progress.percent + '%') : null;
      return style
    },
    progress() {
      if (inBrowser) {
        return window.VueProgressBarEventBus.RADON_LOADING_BAR
      } else {
        return {
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
          }
        }
      }
    }
  }
}
</script>
