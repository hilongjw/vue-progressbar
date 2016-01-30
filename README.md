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

main.js

```javascript

import progress = require('vue-progressbar')

Vue.use(progress)

```

app.vue

```html
<script>
import progress from 'vue-progressbar/progress.vue'
export default {
  data() {
      return {
        myProgress: {
          precent: 0,
          options: {
            show: true,
            canSuccess: true,
            color: 'rgb(143, 255, 199)',
            failedColor: 'red',
            height: '2px'
          }
        }
      }
    },
    components: {
      progress
    },
    ready() {
      this.$progress.setHolder(this.myProgress)
    }
}
</script>
<template>
  <progress :precent.sync="myProgress.precent" :options="myProgress.options"> </progress>
  <router-view></router-view>
</template>


```

any child 

```html

<script>
export default {
  methods:{
    start(){
      this.$progress.start()
    },
    set(num){
      this.$progress.set(num)
    },
    increase(num){
      this.$progress.increase(num)
    },
    decrease(num){
      this.$progress.decrease(num)
    },
    finish(){
      this.$progress.finish()
    },
    failed(){
      this.$progress.failed()
    },
    test(){
      this.start()
      let timer = setInterval(() =>{
        this.increase(Math.random()*10)
        if(this.$progress.get() > 90){
          this.finish()
           clearInterval(timer)
        }
      },100)
    }
  }
}
</script>

```



# License

[The MIT License](http://opensource.org/licenses/MIT)

