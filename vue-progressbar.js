module.exports.install = function(Vue, options) {
  let progressHolder = null
  Vue.prototype.$progress = {
    setHolder(it) {
        this.progressHolder = it
      },
      start(time) {
        if (time == undefined) {
          time = 3000
        }
        this.progressHolder.precent = 0
        this.progressHolder.options.show = true
        this.progressHolder.options.canSuccess = true
        let cut = 10000 / Math.floor(time)
        let timer = setInterval(() => {
          this.increase(cut * Math.random())
          if (this.progressHolder.precent > 95) {
          	this.finish()
            clearInterval(timer)
          }
        }, 100)
      },
      set(num) {
      	this.progressHolder.options.show = true
        this.progressHolder.options.canSuccess = true
        this.progressHolder.precent = Math.floor(num)
      },
      get(num) {
        return Math.floor(this.progressHolder.precent)
      },
      increase(num) {
        this.progressHolder.precent = this.progressHolder.precent + Math.floor(num)
      },
      decrease(num) {
        this.progressHolder.precent = this.progressHolder.precent - Math.floor(num)
      },
      finish() {
        this.progressHolder.precent = 100
        setTimeout(() => {
          this.progressHolder.options.show = false
        }, 800)
      },
      failed() {
        this.progressHolder.options.canSuccess = false
        this.progressHolder.precent = 100
        setTimeout(() => {
          this.progressHolder.options.show = false
        }, 800)
      }
  }
}
