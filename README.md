# vue-apis

## Installation
```
npm install vue-apis
// or
yarn add vue-apis
```

### Usage
```
import Vue from 'vue'
import VueApis from 'vue-apis'

Vue.use(VueApis, options)
```

### Options
option key | type | default value | description
---------- | ---- | ------------- | -----------
apis | object | {} | api set 
showLoading | function | undefined | show loading layout function
hideLoading | function | undefined | hide loading layout function

### Example
main.js
```js
import Vue from 'vue'
import VueApis from 'vue-apis'
import Api from './api'

Vue.use(VueApis, {
  apis: Api,
  showLoading: () => {
    console.log('showLoading')
  },
  hideLoading: () => {
    console.log('hideLoading')
  }
})
```
api.js
```js
import { ApiOptions, ApiMethod } from 'vue-apis'

const $api = {
  readme () {
    return new ApiOptions()
    .setUrl(`https://raw.githubusercontent.com/ChangedenCZD/vue-apis/master/README.md`)
      .setMethod(ApiMethod.GET)
      .setParams({
        timestamp: Date.now()
      })
      .setHeaders({
        Authorization: `Bearer ${Date.now()}`
      })
      .request()
  }
}

export default $api
```
home.vue
```html
<template>
  <div v-html="readme"></div>
</template>
<script>
  export default {
    data () {
      return {
        readme: ''
      }
    },
    async created () {
      const res = await this.$apis.readme()
      this.readme = res
    }
  }
</script>
```

### Source Code
* [Official Demo Source](https://github.com/ChangedenCZD/official-web-for-vue)
* [Plugin Source](https://github.com/ChangedenCZD/vue-apis)
