# vue-progressbar

# Demo

The demo page is [HERE](http://hilongjw.github.io/vue-progressbar/index.html).

# Requirements

- [Vue.js](https://github.com/yyx990803/vue) `^1.0.0`

# Instllation

## npm

```shell
$ npm install vue-progressbar
```

# Usage

```html
<!-- your component -->
<script>
import progress from 'vue-progressbar'

export default {
  data () {
    return {
      precent: 20,
        options: {
          show: true,
          color: '#F44336',
          height: '2px'
        }
    }
  },
  components: {
      progress
  },
  methods:{
    start(){
      this.precent = 0
      this.options.show = true
    },
    increase(num){
      this.precent = this.precent + Math.floor(num)
    },
    decrease(num){
      this.precent = this.precent - Math.floor(num)
    },
    reset(){
      this.precent = 0
    },
    finish(){
      this.precent = 100
      setTimeout(() => {
        this.options.show = false
      },800)
    },
    test(){
      this.start()
      let timer = setInterval(() =>{
        this.increase(Math.random()*10)
        if(this.precent > 90){
          this.finish()
           clearInterval(timer)
        }
      },100)
    }
    
  }
}
</script>

<template>
  <progress :precent="precent" :options="options" />
</template>

```

# API


# License

[The MIT License](http://opensource.org/licenses/MIT)

