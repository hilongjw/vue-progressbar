# vue-progressbar

# Demo

The demo page is [HERE](http://hilongjw.github.io/vue-progressbar/index.html).

# Requirements

- [Vue.js](https://github.com/yyx990803/vue) `1.x` or `2.x`

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

<!-- for a progress bar on each router page change -->
<script>
export default {
  created () {
    //  [App.vue specific] When App.vue is first loaded start the progress bar
    this.$Progress.start()
    //  hook the progress bar to start before we move router-view
    this.$router.beforeEach((to, from, next) => {
      //  start the progress bar
      this.$Progress.start()
      //  continue to next page
      next()
    })
    //  hook the progress bar to finish after we've finished moving router-view
    this.$router.afterEach((to, from) => {
      //  finish the progress bar
      this.$Progress.finish()
    })
  },
  mounted () {
    //  [App.vue specific] When App.vue is finish loading finish the progress bar
    this.$Progress.finish()
  }
}
</script>
```

Methods
```js
//  start the progress bar loading
this.$Progress.start()

//  set the progress bar %
this.$Progress.set(num)

//  increase the progress bar by a certain %
this.$Progress.increase(num)

//  decrease the progress bar by a certain %
this.$Progress.decrease(num)

//  finish the progress bar loading
this.$Progress.finish()

//  cause the progress bar to end and fail
this.$Progress.fail()
```

Example (using vue-resource)
```html

<script>
export default {
  methods: {
    test () {
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
