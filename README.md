# vue-progressbar

# Table of Contents
* [___Demo___](#demo)  
* [___Requirements___](#requirements)  
* [___Installation___](#installation)  
* [___Usage___](#usage)  
  * [_Constructor Options_](#constructor-options)  
  * [_Implementation_](#implementation)  
  * [_vue-router_](#vue-router)  
    * [_meta/modify options_](#vue-router-metamodify-options)  
* [___Methods___](#methods)  
* [___Examples___](#examples)  
  * [_vue-resource example_](#vue-resource)  
* [___License___](#license)  

# Demo
* [__Demo (not updated yet with newest features)__](http://hilongjw.github.io/vue-progressbar/index.html)  
* [__Demo (updated)__](https://xeonpowder.github.io/vue-progressbar/)
* [__Trailing progress bar + randomizer__](https://dl.dropboxusercontent.com/u/79194953/ShareX/2016/11/2016-11-13_04-29-03.mp4)  
* [__Vue-router meta progress bar__](https://dl.dropboxusercontent.com/u/79194953/ShareX/2016/11/2016-11-13_04-30-24.mp4)  
* [__Multi progress bar support__](https://dl.dropboxusercontent.com/u/79194953/ShareX/2016/11/2016-11-14_03-16-45.mp4)
* [__Gradient support__](https://dl.dropboxusercontent.com/u/79194953/ShareX/2016/11/2016-11-18_12-58-06.mp4)

# Requirements
- [Vue.js](https://github.com/vuejs/vue) `1.x` or `2.x`  

# Installation
```bash
# npm
$ npm install vue-progressbar

# yarn
$ yarn vue-progressbar
```
## Build from source
```
# git
cd /directory/to/clone/to
git clone https://github.com/hilongjw/vue-progressbar.git

cd vue-progressbar

# npm or yarn
npm install | yarn install

# build with npm or yarn
[npm|yarn] run build

```
# Usage

main.js

```javascript
import Vue from 'vue'
import VueProgressBar from 'vue-progressbar'
import App from './App'

const options = {
  debug: true,
  color: '#bffaf3',
  failedColor: '#874b4b',
  thickness: '5px',
  transition: {
    time: '0.7s',
    opacity: '1.6s'
  },
  trail: '-1px',
  autoRevert: true,
  location: 'top',
  inverse: false,
  gradient: {
    use: true,
    gradient: 'predefined'
  },
  init: true,
  bounce: true
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
|`color`|color of the progress bar|`'rgb(19, 91, 55)'`|`RGB`, `HEX`|
|`debug`|output console errors|`false`|`true`, `false`|
|`failedColor`|color of the progress bar upon load fail|`'red'`|`RGB`, `HEX`|
|`inverse`|inverse the direction of the progress bar|`false`|`true`, `false`|
|`location`|change the location of the progress bar|`top`|`left`, `right`, `top`, `bottom`|
|`thickness`|thickness of the progress bar|`'2px'`|`px`, `em`, `pt`, `%`, `vh`, `vw`|
|`transition`|transition speed/opacity of the progress bar|`{time: '0.2s', opacity: '0.6s'}`|`s`, `ms`|
|`trail`|change the type of progress bar, trailing or not|`'-1px'`|`px`|
|`bounce`|change the bounce type of the progress bar|`false`|`true`, `false`|
|`gradient`|should the progress bar use a gradient|`{use: false, gradient: 'predefined'}`|use: [`true`, `false`], gradient: [`'predefined'`, `'-linear-gradient(to [top, left], [RGB, HEX], [RGB, HEX]'`]|
|`init`|when a progress bar is created should it be initialized with data|`true`|`true`, `false`|
## Implementation

App.vue
```html
<template>
    <div id="app">
        <!-- for example router view -->
        <router-view></router-view>
        <!-- setup progressbar -->
        <!-- automatically added to $pb -->
        <!-- required: show - should the progress bar be able to be displayed -->
        <!-- required: reference - name of this specific progress bar -->
        <!-- optional: options - can be passed custom constructor options -->
        <vue-progress-bar :options="options" :show="true" reference="router"></vue-progress-bar>
    </div>
</template>

<script>
export default {
  mounted () {
    //  [App.vue specific] Start the bar and finish it on first load
    this.$pb.start('router')
    let this2 = this
    setTimeout(() => {
      this2.$pb.finish('router')
    }, 400) // 400 is a good number, anything less and the bars will not work nicely.
  },
  created () {
    //  using vue-router before each page change
    this.$router.beforeEach((to, from, next) => {
      this.startReroute(to, from, next)
    })
    //  hook the progress bar to finish after we've finished moving router-view
    this.$router.afterEach((to, from) => {
      //  finish the `router` progress bar
      let this2 = this
      setTimeout(() => {
        this2.$pb.finish('router')
      }, 400) // 400 is a good number, anything less and the bars will not work nicely.
    })
  }
  methods: {
    startReroute (to, from, next) {
      //  vue-router meta style
      this.$pb.start('router', to.meta.progress, 'meta')
      //
      //  randomize style
      let random = {
        color: { r: {min: 0, max: 255}, g: {min: 0, max: 255}, b: {min: 0, max: 255} },
        fail: { r: {min: 250, max: 255}, g: {min: 0, max: 0}, b: {min: 100, max: 150} },
        thickness: { min: 10, max: 20, suffix: 'px' },
        trail: { min: 20, max: 50, suffix: 'px' },
        transition: {
          time: { min: 0.5, max: 1.75 },
          opacity: { min: 0.7, max: 1.4 }
        },
        location: ['top', 'bottom', 'left'],
        inverse: [true, false],
        bounce: [true, false],
        gradient: { 
          use: [true, false],
          gradient: {
            from: { r: {min: 0, max: 255}, g: {min: 0, max: 255}, b: {min: 0, max: 255} },
            to: { r: {min: 0, max: 255}, g: {min: 0, max: 255}, b: {min: 0, max: 255} }
          }
        }
      }
      this.$pb.start('router', random, 'randomize')
      //// or
      this.$pb.randomize('router', random)
      this.$pb.start('router')
      //// or
      this.$pb.start('router', {trail: {min: -1, max: -1}}, 'randomize')      
      //
      //  modify style
      this.$pb.modify('router', {call: 'inverse', modifier: 'set', argument: true})
      this.$pb.start('router')
      //// or 
      this.$pb.modify('router', [{call: 'inverse', modifier: 'set', argument: true}, {call...}])
      this.$pb.start('router')
      //
      // continue to next page
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
          {call: 'thickness', modifier: 'temp', argument: '10px'},
          {call: 'trail', modifier: 'temp', argument: '50px'},
          {call: 'bounce', modifier: 'temp', argument: false },
          {call: 'gradient', modifier: 'temp', argument: {use: true, gradient: 'predefined'}}
        ]
      }
    }
  }
]
```
### vue-router meta/modify options

|call|modifier|argument|example|
|:---|---|---|---|
|color|`set`, `temp`|`string`|`{call: 'color', modifier: 'temp', argument: '#ffb000'}`|
|fail|`set`, `temp`|`string`|`{call: 'fail', modifier: 'temp', argument: '#ffb000'}`|
|inverse|`set`, `temp`|`boolean`|`{call: 'inverse', modifier: 'temp', argument: true}`|
|location|`set`, `temp`|`string`|`{call: 'location', modifier: 'temp', argument: 'top'}`|
|thickness|`set`, `temp`|`string`|`{call: 'thickness', modifier: 'temp', argument: '10px'}`|
|transition|`set`, `temp`|`object`|`{call: 'transition', modifier: 'temp', argument: {time: '0.6s', opacity: '0.6s'}}`|
|trail|`set`, `temp`|`string`|`{call: 'trail', modifier: 'temp', argument: '100px'}`|
|bounce|`set`, `temp`|`boolean`|`{call: 'bounce', modifier: 'temp', argument: false }`|
|gradient|`set`, `temp`|`object`|`{call: 'gradient', modifier: 'temp', argument: {use: true, gradient: 'linear-gradient(to left, #ffffff, #000000)'}}`|
# Methods  
|function|description|parameters|example|return|
|:---|---|---|---|---|
|init|link bar with data (automaticallly in `$pb.create()` if init = true in constructor options)|`name`|`this.$pb.init('router')|`N/A`|
|start|start a progress bar|`name`, `(options)`, `(modifier)`|`this.$pb.start('router')`|`N/A`|
|finish|finish a progress bar|`name`|`this.$pb.finish('router')`|`N/A`|
|fail|fail a progress bar|`name`|`this.$pb.fail('router')`|`N/A`|
|create|craete a progress bar|`(name)`, `(options)`|`this.$pb.create('test')`|`N/A`|
|quickHide|quickly hide a progress bar (automatically in `$pb.start()`)|`name`|`let bQuicklyHidden = this.$pb.quickHide('router')`|`boolean`|
|randomize|randomize a progress bar|`name`, `(meta)`|`this.$pb.randomize('router')`|`N/A`|
|destroy|remove a progress bar from memory|`name`|`let bDestroyed = this.$pb.destroy('test')`|`boolean`|
|progress|increase the progression # of a progress bar (automatically called in `$pb.start()`)|`name`, `(options)`|`this.$pb.progress('test')`|`N/A`|
|modify|modify a property/properties of a progress bar|`name`, `meta`|`this.$pb.modify('router', {call: 'color', modifier: 'temp', argument: '#f0f0f0'})`|`N/A`|
# Examples  
## vue-resource  
```html
<template>
  <div>
    <vue-progress-bar reference="loading"></vue-progress-bar>
  </div>
</template>

<script>
export default {
  methods: {
    test () {
      this.$pb.start('loading')
      this.$http.jsonp('http://api.rottentomatoes.com/api/public/v1.0/lists/movies/in_theaters.json?apikey=7waqfqbprs7pajbz28mqf6vz')
      .then((response) => {
        this.$pb.finish('loading')
      }, (response) => {
        this.$pb.fail('loading')
      })
    }
  }
}
</script>
```

# License

This project uses an open-source [___MIT License___](http://opensource.org/licenses/MIT) 
