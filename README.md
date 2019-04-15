# vue-apis
[![LICENSE](https://img.shields.io/badge/license-MIT%20(The%20996%20Prohibited%20License)-blue.svg)](https://github.com/996icu/996.ICU/blob/master/LICENSE)

[
![NPM version](https://img.shields.io/npm/v/vue-apis.svg)
![NPM download](https://img.shields.io/npm/dm/vue-apis.svg)
![NPM download](https://img.shields.io/npm/dw/vue-apis.svg)
](https://www.npmjs.com/package/vue-apis)
[
![npm](https://img.shields.io/npm/l/vue-apis.svg)
](https://github.com/Chans-Open-Source/vue-apis/blob/master/LICENSE)

[
![GitHub watchers](https://img.shields.io/github/watchers/Chans-Open-Source/vue-apis.svg)
![GitHub stars](https://img.shields.io/github/stars/Chans-Open-Source/vue-apis.svg)
![GitHub forks](https://img.shields.io/github/forks/Chans-Open-Source/vue-apis.svg)
![GitHub issues](https://img.shields.io/github/issues/Chans-Open-Source/vue-apis.svg)
![GitHub last commit (branch)](https://img.shields.io/github/last-commit/Chans-Open-Source/vue-apis.svg)
](https://github.com/Chans-Open-Source/vue-apis)


* A vue plug-in integrated with axios. Build the API using chain programming and return the request instance as a Promise. A nice simplification of how apis are built, and how they are referenced.
* 一个集成了axios的vue插件。使用链式编程方式构建api，并以Promise返回请求实例。很好地简化了api的构建方式，和引用方式（通过this.$apis.apiName进行引用）。

## Browser Support

![Chrome](https://raw.github.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png) | ![Firefox](https://raw.github.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png) | ![Safari](https://raw.github.com/alrra/browser-logos/master/src/safari/safari_48x48.png) | ![Opera](https://raw.github.com/alrra/browser-logos/master/src/opera/opera_48x48.png) | ![Edge](https://raw.github.com/alrra/browser-logos/master/src/edge/edge_48x48.png) | ![IE](https://raw.github.com/alrra/browser-logos/master/src/archive/internet-explorer_9-11/internet-explorer_9-11_48x48.png) |
--- | --- | --- | --- | --- | --- |
Latest ✔ | Latest ✔ | Latest ✔ | Latest ✔ | Latest ✔ | 11 ✔ |

[![Browser Matrix](https://saucelabs.com/open_sauce/build_matrix/axios.svg)](https://saucelabs.com/u/axios)

## Installing
```
npm install vue-apis
// or
yarn add vue-apis
```

## Usage
### Import
```
import Vue from 'vue'
import VueApis from 'vue-apis'

Vue.use(VueApis, options)
```

### Options
| option key | type | default value | description |
| ---------- | ---- | ------------- | ----------- |
| apis | object | {} | api set | |
| showLoading | function | undefined | show loading layout function |
| hideLoading | function | undefined | hide loading layout function |
| interceptors | [InterceptorObject](#InterceptorObject) | undefined | You can intercept requests or responses before they are handled by then or catch. |

#### InterceptorObject
| field | type | description |
| --- | --- | --- |
| request | [RequestObject](#RequestObject) / Function | When the instance is 'Function', it is a 'then' callback to the interceptor |
| response | [ResponseObject](#ResponseObject) / Function | When the instance is 'Function', it is a 'then' callback to the interceptor |

##### RequestObject
| Function | e.g. |
| --- | --- |
| then | (config) => { return config; } |
| catch | (error) => { return Promise.reject(error); } |


##### ResponseObject
| Function | e.g. |
| --- | --- |
| then | (response) => { return response; } |
| catch | (error) => { return Promise.reject(error); } |

### Example
* main.js
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
  },
  interceptors: {
    request: {
      then(config) {
        // Do something before request is sent
        return config;
      },
      catch(error) {
        // Do something with request error
        return Promise.reject(error);
      }
    },
    response: {
      then(response) {
        // Do something with response data
        return response;
      },
      catch(error) {
        // Do something with response error
        return Promise.reject(error);
      }
    }
  }
})
```
* api.js
```js
import { ApiOptions, ApiMethod } from 'vue-apis'

const $api = {
  readme () {
    return new ApiOptions()
    .setUrl(`https://raw.githubusercontent.com/Chans-Open-Source/vue-apis/master/README.md`)
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
* home.vue
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

## Source Code
* [Official Demo Source](https://github.com/Chans-Open-Source/official-web-for-vue)
* [Plugin Source](https://github.com/Chans-Open-Source/vue-apis)
