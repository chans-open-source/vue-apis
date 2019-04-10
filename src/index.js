import ApiOptions from './options'
import ApiMethod from './method'
import { token, showLoading, hideLoading } from './key'
import { version } from '../package.json'

const VueApis = {
  ApiOptions,
  ApiMethod,
  Function: {
    showLoading,
    hideLoading
  },
  install (Vue, options) {
    options = options || {}

    const $apis = options['apis'] || {}

    const methods = {}
    if (typeof options['showLoading'] === 'function') {
      methods[showLoading] = options['showLoading']
    }
    if (typeof options['hideLoading'] === 'function') {
      methods[hideLoading] = options['hideLoading']
    }
    $apis['__methods__'] = methods

    Object.keys(methods).forEach(key => ApiOptions.assembleFunction(key, methods[key], token))

    $apis['__version__'] = version

    if (typeof options['interceptors'] !== 'undefined') {
      ApiOptions.assembleInterceptors(options['interceptors'])
    }

    Vue.prototype.$apis = $apis
  }
}

export default VueApis
