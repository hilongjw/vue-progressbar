# vue-progressbar

# Table of Contents
* [___Demo___](#demo)
* [___Requirements___](#requirements)
* [___Installation___](#installation)
* [___Usage___](#usage)  
 * [___Constructor Options___](#constructor-options)
 * [___Implementation___](#implementation)
 * [___vue-router___](#vue-router)  
   * [___meta options___](#vue--router-meta-options)  
* [___Methods___](#methods)
* [___Advanced Methods___](#advanced-methods)
* [___Examples___](#examples)
* [___License___](#license)

# Demo
[___Demo___](http://hilongjw.github.io/vue-progressbar/index.html)
# Requirements
- [Vue.js](https://github.com/vuejs/vue) `1.x` or `2.x`  

# Installation
```bash
# npm
$ npm install vue-progressbar

#yarn
$ yarn vue-progressbar
```
# Usage

main.js

```javascript
import Vue from 'vue'
import VueProgressBar from 'vue-progressbar'
import App from './App'

const options = {
  autoRevert: true,
  color: '#bffaf3',
  debug: true,
  failedColor: '#874b4b',
  inverse: false,
  location: 'top',
  thickness: '5px',
  transition: {
    time: '0.7s',
    opacity: '0.6s'
  }
}

Vue.use(VueProgressBar, options)

new Vue({
  ...App
}).$mount('#app')


```
## Constructor Options
|key|description|defualt|options|
|:---|---|---|---|
|`autoRevert`|will temporary color changes automatically revert upon completion or fail|`true`|`true`, `false`|
|`color`|color of the progress bar|`'rgb(143, 255, 199)'`|`RGB`, `HEX`|
|`debug`|output console errors|`false`|`true`, `false`|
|`failedColor`|color of the progress bar upon load fail|`'red'`|`RGB`, `HEX`|
|`inverse`|inverse the direction of the progress bar|`false`|`true`, `false`|
|`location`|change the location of the progress bar|`top`|`left`, `right`, `top`, `bottom`|
|`thickness`|thickness of the progress bar|`'2px'`|`px`, `em`, `pt`, `%`, `vh`, `vw`|
|`transition`|transition speed/opacity of the progress bar|`{time: '0.2s', opacity: '0.6s'}`|`s`, `ms`|

## Implementation

App.vue
```html
<template>
    <div id="app">
        <!-- for example router view -->
        <router-view></router-view>
        <!-- set progressbar -->
        <vue-progress-bar></vue-progress-bar>
    </div>
</template>

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
      //  do we need to quickly hide the current progress bar?
      if (this.$Progress.quickHide()) {
        //  yes, progress bar was hidden, lets wait 100ms then reroute
        let this2 = this
        setTimeout(() => {
          this2.startReroute(to, from, next)
        }, 100)
      } else {
        //  no, we can reroute
        this.startReroute(to, from, next)
      }
    })
    //  hook the progress bar to finish after we've finished moving router-view
    this.$router.afterEach((to, from) => {
      //  finish the progress bar
      this.$Progress.finish()
    })
  }
  methods: {
    startReroute (to, from, next) {
      //  parse the meta if there is any
      to.meta.progress !== undefined ? this.$Progress.parseMeta(to.meta.progress) : null
      //  start the progress bar
      this.$Progress.start()
      //  go to next page
      next()
    }
  }
}
</script>
```
## vue-router
```js
export default [
  {
    path: '/achievement',
    name: 'achievement',
    component: './components/Achievement.vue'
    meta: {
      progress: {
        func: [
          {call: 'color', modifier: 'temp', argument: '#7000ff'},
          {call: 'fail', modifier: 'temp', argument: '#6e0000'},
          {call: 'location', modifier: 'temp', argument: 'top'},
          {call: 'transition', modifier: 'temp', argument: {time: '2.0s', opacity: '0.6s'}},
          {call: 'inverse', modifier: 'temp', argument: true},
          {call: 'thickness', modifier: 'temp', argument: '10px'}
        ]
      }
    }
  }
]
```
### vue-router meta options

|call|modifier|argument|example|
|:---|---|---|---|
|color|`set`, `temp`|`string`|`{call: 'color', modifier: 'temp', argument: '#ffb000'}`|
|fail|`set`, `temp`|`string`|`{call: 'fail', modifier: 'temp', argument: '#ffb000'}`|
|inverse|`set`, `temp`|`boolean`|`{call: 'inverse', modifier: 'temp', argument: true}`|
|location|`set`, `temp`|`string`|`{call: 'location', modifier: 'temp', argument: 'top'}`|
|thickness|`set`, `temp`|`string`|`{call: 'thickness', modifier: 'temp', argument: '10px'}`|
|transition|`set`, `temp`|`object`|`{call: 'transition', modifier: 'temp', argument: {time: '0.6s', opacity: '0.6s'}}`|

# Methods
|function|description|parameters|example|return|
|:---|---|---|---|---|
|decrease|decrease the progress bar by a certain %|`number: integer`|`this.$Progress.decrease(number)`|`N/A`|
|fail|cause the progress bar to end and fail|`N/A`|`this.$Progress.fail()`|`N/A`|
|finish|finish the progress bar loading|`N/A`|`this.$Progress.finish()`|`N/A`|
|increase|increase the progress bar by a certain %|`number: integer`|`this.$Progress.increase(number)`|`N/A`|
|parseMeta|parses progress meta data|`meta: object`|`this.$Progress.parseMeta(meta)`|`N/A`|
|quickHide|quickly stops and hides the progress bar|`N/A`|`this.$Progress.quickHide()`|true|
|revert|revert all temporary changes|`N/A`|`this.$Progress.revert()`|`N/A`|
|set|set the progress bar %|`number: integer`|`this.$Progress.set(number)`|`N/A`|
|start|start the progress bar loading|`N/A`|`this.$Progress.start()`|`N/A`|
# Advanced Methods
|function|description|parameters|example|
|:---|---|---|---|
|call|call function bus|`call: string`, `...args`|`this.$Progress.call('temp', 'color', '#ff00ff', true)`|
|callSetTemp|sets call property (temporarily or permanently)|`property: string`, `value: dynamic`, `temp: boolean`|`this.$Progress.callSetTemp('color', '#ff00ff', true)`|
|callRevert|reverts call property to default|`call: string`|`this.$Progress.callRevert('thickness')`|
|callMeta|middleware function for parseMeta|`property: string`, `modifier: string`, `value: dynamic`|`this.$Progress.callMeta('color', 'temp', '#ff00ff')`|
# Examples
`call`
```html
<script>
export default {
  methods: {
    example () {
      this.$Progress.call('set', 'color', '#f0f0f0')
      //  since 3rd argument is true, it will be set temporarily
      this.$Progress.callSetTemp('color', '#120100', true)
      //  4th argument is optional
      //  since 4th argument is false, it will set `permanently` instead of `temporarily`
      //  even though 1st argument is `temp`
      //  if the first argument is `temp` the default of the 4th argument is `true`, and `set` defaults to `false`
      this.$Progress.call('temp', 'thickness', '20px', false)
      //  this.$Progress.parseMeta loops over array of meta data
      //  but you can call meta if you'd like
      this.$Progress.call('meta', 'temp', 'thickness', '20px')
      //  will set the temporary flag of inverse back to default
      this.$Progress.callRevert('inverse')
      //  functions below do the same thing
      this.$Progress.callMeta('fail', 'set', '#ee0000')
      this.$Progress.call('set', 'fail', '#ee0000')
      this.$Progress.call('temp', 'fail', '#ee0000', false)
      this.$Progress.callSetTemp('fail', '#ee0000', false)
      //  after the progress bar finishes and disappears either naturally or forced by
      this.$Progress.finish()
      //  all temporary sets will be reverted to default IF `autoRevert` is set to true.
    }
  }
}
</script>
```
`vue-resource`
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
