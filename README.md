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
  data() {
      return {
        precent: 0,
        options: {
          color: '#73ccec',
          height: '2px'
        }
      }
    },
    components: {
      progress
    },
    ready() {
      setInterval(() => {
        this.precent++
          if (this.precent > 100) {
            this.precent = 0
          }
      }, 100)
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

