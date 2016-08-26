# vue-progressbar

# Demo

The demo page is [HERE](http://hilongjw.github.io/vue-progressbar/index.html).

# Requirements

- [Vue.js](https://github.com/yyx990803/vue) `^1.0.0`

# Installation

## npm

```shell
$ npm install vue-progressbar
```

# Usage

main.js

```javascript

import VueProgressBar from 'vue-progressbar'

Vue.use(VueProgressBar, {
  color: 'rgb(143, 255, 199)',
  failedColor: 'red',
  height: '2px'
})

```

Root App.vue

```html
<template>
    <div id="app">
        <!-- for example router view -->
        <router-view></router-view>
        <!-- set progressbar -->
        <vue-progress-bar></vue-progress-bar>
    </div>
</template>
```

Any child 

```html

<script>
export default {
  methods:{
    start () {
        this.$Progress.start()
    },
    set (num) {
        this.$Progress.set(num)
    },
    increase (num) {
        this.$Progress.increase(num)
    },
    decrease (num) {
        this.$Progress.decrease(num)
    },
    finish () {
        this.$Progress.finish()
    },
    fail () {
        this.$Progress.fail()
    },
    test(){
      this.$Progress.start()

      this.$http.jsonp('http://api.rottentomatoes.com/api/public/v1.0/lists/movies/in_theaters.json?apikey=7waqfqbprs7pajbz28mqf6vz')
      .then((response) => {
          this.$Progress.finish()
      }, (response) => {
          this.$Progress.fail()
      })
    }
  }
}
</script>

```

# License

[The MIT License](http://opensource.org/licenses/MIT)

