import Cancel, { isCancel } from './cancel/Cancel'
import CancelToken from './cancel/CancelToken'
import Axios from './core/Axios'
import mergeConfig from './core/mergeConfig'
import defaults from './defaults'
import { extend } from './helpers/utils'
import { AxiosRequestConfig, AxiosStatic } from './types/index'
function createInstance(config: AxiosRequestConfig): AxiosStatic {
  const context = new Axios(config)
  const instance = Axios.prototype.request.bind(context)
  extend(instance, context)
  return instance as AxiosStatic
}
const axios = createInstance(defaults)
axios.create = function(config?: AxiosRequestConfig) {
  return createInstance(mergeConfig(defaults, config))
}
axios.CancelToken = CancelToken
axios.Cancel = Cancel
axios.isCancel = isCancel
export default axios
