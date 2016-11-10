# vue-progressbar

Table of Contents
* [___Demo___](https://github.com/XeonPowder/vue-progressbar#demo)
* [___Requirements___](https://github.com/XeonPowder/vue-progressbar#requirements)
* [___Installation___](https://github.com/XeonPowder/vue-progressbar#installation)
* [___Usage___](https://github.com/XeonPowder/vue-progressbar#usage)
* [___Methods___](https://github.com/XeonPowder/vue-progressbar#methods)
* [___Examples___](https://github.com/XeonPowder/vue-progressbar#examples)
* [___License___](https://github.com/XeonPowder/vue-progressbar#license)

# Demo
[___Demo___](http://hilongjw.github.io/vue-progressbar/index.html)
# Requirements
- [Vue.js](https://github.com/vuejs/vue) `1.x` or `2.x`  

# Installation
```shell
$ npm install vue-progressbar
```
# Usage

main.js

```javascript
import Vue from 'vue'
import VueProgressBar from 'vue-progressbar'
import App from './App'

const options = {
  color: '#bffaf3',
  failedColor: '#874b4b',
  height: '5px',
  autoRevert: true
}

Vue.use(VueProgressBar, options)

new Vue({
  ...App
}).$mount('#app')

```
possible `options` include:

* `color: '#000000'`  
 * default: `'rgb(143, 255, 199)'`
 * description: `color of the progress bar`
* `failedColor: 'rgb(255, 0, 0)'`
 * default: `'red'`
 * description: `color of the progress bar upon load fail`
* `height: '2px'`
 * default: `'2px'`
 * description: `height of the progress bar`
* `autoRevert: false`
 * default: `true`
 * description: `will temporary color changes automatically revert upon completion or fail`


Template App.vue
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
Basic App.vue
```html
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
Meta App.vue
```html
<script>
export default {
  mounted () {
    //  [App.vue specific] When App.vue is finish loading finish the progress bar
    this.$Progress.finish()
  },
  created () {
    //  [App.vue specific] When App.vue is first loaded start the progress bar
    this.$Progress.start()

    //  hook the progress bar to start before we move router-view
    this.$router.beforeEach((to, from, next) => {

      //  does the page we want to go to have a meta.progress object
      if (to.meta.progress !== undefined) {

        //  set p for easier calling
        let p = to.meta.progress

        //  loop through the array of func from the meta
        for (var x in p.func) {

          //  set func for easier calling
          let func = p.func[x]

          //  switch on the func's call field
          switch (func.call) {

            //  temp == short for tempColor
            case 'temp':
              //  set the progress color (temporarily)
              this.$Progress.tempColor(func.color)
              break

            //  tempFail == short for tempFailColor
            case 'tempFail':
              //  set the fail color (temporarily)
              this.$Progress.tempFailColor(func.color)
              break

            // set == short for setColor
            case 'set':
              //  set the progress color (permanently)
              this.$Progress.setColor(func.color)
              break

            // setFail == short for setFailColor        
            case 'setFail':
              //  set the fail color (permanently)
              this.$Progress.setFailColor(func.color)
              break
          }
        }
      }
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
  }
}
</script>
```
vue-router meta
```js
export default [
  {
    path: '/achievement',
    name: 'achievement',
    component: './components/Achievement.vue'
    meta: {
      progress: {
        func: [
          {call: 'temp', color: '#ffb000'},
          {call: 'tempFail', color: '#6e0000'}
        ]
      }
    }
  }
]
```
# Methods
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

//  cause the fail color to permanently change
this.$Progress.setFailColor(color)

//  cause the progress color to permanently change
this.$Progress.setColor(color)

//  cause the fail color to change (temporarily)
this.$Progress.tempFailColor(color)

//  cause the progress color to change (temporarily)
this.$Progress.tempColor(color)

//  cause the temporarily set progress color to revert back to it's previous color
this.$Progress.revertColor(color)

//  cause the temporarily set fail color to revert back to it's previous color
this.$Progress.revertFailColor(color)

//  cause the temporarily set progress and/or fail color to their previous colors
this.$Progress.revert()
```
# Examples
Loading Data (vue-resource)
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
