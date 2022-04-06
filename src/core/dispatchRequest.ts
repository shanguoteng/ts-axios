import { transformRequest, transformResponse } from '../helpers/data'
import { flattenHeaders, processHeaders } from '../helpers/headers'
import { buildURL } from '../helpers/url'
import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from '../types/index'
import transfrom from './transfrom'
import xhr from './xhr'
export default function dispatchRequest(config: AxiosRequestConfig): AxiosPromise {
  processConfig(config)
  throwIfCancellationRequest(config)
  return xhr(config).then(res => {
    return transformResponseData(res)
  })
}
function processConfig(config: AxiosRequestConfig) {
  config.url = transformURL(config)
  config.data = transfrom(config.data, config.headers, config.transformRequest)
  flattenHeaders(config.headers, config.method!)
}
function transformURL(config: AxiosRequestConfig) {
  const { url, params } = config
  return buildURL(url!, params)
}
function transformResponseData(res: AxiosResponse): AxiosResponse {
  res.data = transfrom(res.data, res.headers, res.config.transformResponse)
  return res
}
function throwIfCancellationRequest(config: AxiosRequestConfig): void {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequest()
  }
}
