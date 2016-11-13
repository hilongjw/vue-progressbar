<style>
.__cov-progress {
  position: fixed;
  opacity: 1;
  z-index: 999999;
}
.top {
  top: 0px;
}
.bottom {
  bottom: 0px;
}
.right {
  right: 0px;
}
.left {
  left: 0px;
}
</style>
<template>
  <div>
    <div :class="styleClass" :style="style">
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
      quicklyHid: false
    }
  },
  computed: {
    styleClass() {
      let options
      !this.progress.temp.use ? options = this.progress.options : options = this.progress.temp
      let position = options.location
      if (position == 'top' || position == 'bottom') {
        if (options.inverse) {
          return "__cov-progress right"
        } else {
          return "__cov-progress left"
        }
      } else if(position == 'left' || position == 'right') {
        if (options.inverse) {
          return "__cov-progress top"
        } else {
          return "__cov-progress bottom"
        }
      }
    },
    style() {
      if (this.quicklyHid) {
        this.quicklyHid = this.progress.quickHide = false
      }
      let options
      !this.progress.temp.use ? options = this.progress.options : options = this.progress.temp
      let position = options.location
      let trailAsNumber = parseFloat(options.trail.replace('/(px)/'))
      let style = {
        'background-color': options.canSuccess ? options.color : options.failedColor,
        'opacity': options.show ? 1 : 0
      }
      if (position == 'top' || position == 'bottom') {
        position == 'top' ? style.top = '0px' : style.bottom = '0px'
        !this.progress.quickHide && !this.progress.hidden ? style.height = options.thickness : style.height = '0px'
        if (trailAsNumber >= 0) {
          if (options.inverse) {
            style.margin = "0 " + this.progress.percent + "vw 0 " + (-1*this.progress.percent) + "vw"
            !this.progress.hidden && this.progress.percent === 0 ? style.right = (-1*trailAsNumber) + 'px' : style.right = '0px'
          } else {
            style.margin = "0 " + (-1*this.progress.percent) + "vw 0 " + this.progress.percent + "vw"
            !this.progress.hidden && this.progress.percent === 0 ? style.left = (-1*trailAsNumber) + 'px' : style.left = '0px'
          }
          if (this.progress.hidden) {
            style.width = '0px'
            style.height = '0px'
          } else if (!this.progress.quickHide) {
            style.width = trailAsNumber + 'px'
          } else {
            style.width = '0px'
            style.height = '0px'
          }
          !this.progress.quickHide ? style.transition = "left " + options.transition.time + ", right " + options.transition.time + ", margin " + options.transition.time + ", width 1ms, opacity " + options.transition.opacity : style.transition = "height 1ms, margin 1ms, width 1ms, left 1ms, right 1ms, opacity 1ms"
        } else {
          options.inverse ? style.right = '0px' : style.left = '0px'
          !this.progress.quickHide ? style.transition = "width " + options.transition.time + ", opacity " + options.transition.opacity : style.transition = "width 1ms, opacity 1ms"
          !this.progress.quickHide ? style.width = this.progress.percent + '%' : style.width = '0%'
        }
      } else if (position == 'left' || position == 'right') {
        position == 'left' ? style.left = '0px' : style.right = '0px'
        !this.progress.quickHide && !this.progress.hidden ? style.width = options.thickness : style.width = "0px"
        if (trailAsNumber >= 0) {
          if (options.inverse) {
            style.margin = this.progress.percent + "vh 0 " + (-1*this.progress.percent) + "vh 0"
            !this.progress.hidden && this.progress.percent === 0 ? style.top = (-1*trailAsNumber) + 'px' : style.top = '0px'
          } else {
            style.margin = (-1*this.progress.percent) + "vh 0 " + this.progress.percent + "vh 0"
            !this.progress.hidden && this.progress.percent === 0 ? style.bottom = (-1*trailAsNumber) + 'px' : style.bottom = '0px'
          }
          if (this.progress.hidden) {
            style.height = '0px'
            style.width = '0px'
          } else if (!this.progress.quickHide) {
            style.height = trailAsNumber + 'px'
          } else {
            style.height = '0px'
            style.width = '0px'
          }
          !this.progress.quickHide ? style.transition = "margin " + options.transition.time + ", height 1ms, top " + options.transition.time + ", bottom " + options.transition.time + ", opacity " + options.transition.opacity : style.transition = "width 1ms, margin 1ms, height 1ms, top 1ms, bottom 1ms, opacity 1ms"
        } else {
          options.inverse ? style.bottom = '0px' : style.top = '0px'
          !this.progress.quickHide ? style.transition = "height " + options.transition.time + ", opacity " + options.transition.opacity : style.transition = "height 1ms, opacity 1ms"
          !this.progress.quickHide ? style.height = this.progress.percent + '%' : style.height = '0%'
        }
      }
      this.progress.quickHide ? this.quicklyHid = true : null
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
            trail: '-1px',
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
            trail: '-1px',
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
