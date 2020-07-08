import {AxiosRequestConfig,AxiosPromise,AxiosResponse} from './types'
import {buildURL} from './helpers/url'
import {transformRequest,transformReponse} from './helpers/data';
import {processHeaders} from './helpers/headers'
import xhr from './xhr'
function axios(config: AxiosRequestConfig):AxiosPromise{
  processConfig(config)
  return xhr(config).then((res)=>{
    return transformResponseData(res)
  })
}

function processConfig(config: AxiosRequestConfig): void{ 
  config.url = transformURL(config)
  // 处理headers
  config.headers = transformHeaders(config)
  // 如果是普通对象。转化成字符串
  config.data = transformRequestData(config)
}
// 处理url地址
function transformURL(config:AxiosRequestConfig):string {
  const {url,params} = config
  return buildURL(url,params)
}
// 处理post请求的data数据
function transformRequestData(config:AxiosRequestConfig):any{
  return transformRequest(config.data)
}
// 处理headers
function transformHeaders (config:AxiosRequestConfig):any{
  const {headers={},data}  = config
  return processHeaders(headers,data)
}
// 将动态返回的json字符串转化成json对象
function transformResponseData(res:AxiosResponse):AxiosResponse{
  res.data = transformReponse(res.data)
  return res
}
export default axios