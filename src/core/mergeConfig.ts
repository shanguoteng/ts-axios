import { deepMerge, isPlainObject } from '../helpers/utils'
import { AxiosRequestConfig } from './../types/index'
function defaultToConfig2(val1: any, val2: any): any {
  return typeof val2 !== 'undefined' ? val2 : val1
}
function valueFromConfig2(val1: any, val2: any): any {
  if (typeof val2 !== 'undefined') {
    return val2
  }
}
function mergeDeepProperties(val1: any, val2: any) {
  if (isPlainObject(val2)) {
    return deepMerge(val1, val2)
  } else if (typeof val2 !== 'undefined') {
    return val2
  } else if (isPlainObject(val1)) {
    return deepMerge(val1)
  } else if (typeof val1 !== 'undefined') {
    return val1
  }
}
const mergeMap = Object.create(null)
const keyFromConfig2 = ['url', 'params', 'data']
const keyMergeDeep = ['headers']
keyFromConfig2.forEach(key => {
  mergeMap[key] = valueFromConfig2
})
keyMergeDeep.forEach(key => {
  mergeMap[key] = mergeDeepProperties
})
export default function mergeConfig(
  config1: AxiosRequestConfig,
  config2?: AxiosRequestConfig
): AxiosRequestConfig {
  if (!config2) {
    config2 = {}
  }
  const config = Object.create(null)
  for (let key in config2) {
    mergeFields(key)
  }
  for (let key in config1) {
    if (!config2[key]) {
      mergeFields(key)
    }
  }
  return config
  function mergeFields(key: string): void {
    const merge = mergeMap[key] || defaultToConfig2
    config[key] = merge(config1[key], config2![key])
  }
}
