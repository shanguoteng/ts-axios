import { AxiosRequestConfig,AxiosPromise ,AxiosResponse} from './types'
import {parseHeaders} from './helpers/headers'
export default function xhr(config: AxiosRequestConfig):AxiosPromise {
  return new Promise((resolve,reject)=>{
    const { data = null, url, method = 'get', headers,responseType,timeout } = config
    const request = new XMLHttpRequest()
    if(responseType){
      request.responseType = responseType
    }
    if(timeout){
      request.timeout = timeout
    }
    request.open(method.toUpperCase(), url, true)
    // 状态变化的回调
    request.onreadystatechange = function handleLoad (){
      // 请求没有接收到
      if(request.readyState!==4){
        return
      }
      if(request.status ===0){
        return
      }
      // 错误处理
      request.onerror = function handleError(){
        reject(new Error('Network Error'))
      }
      // 超时错误
      request.ontimeout = function handleTimeout(){
        reject(new Error(`Timeout of ${timeout} ms exceeded `))
      }
      const responseHeaders = parseHeaders(request.getAllResponseHeaders())
      const reqonseData = responseType!=='text'?request.response:request.responseText
      const  response:AxiosResponse = {
        data:reqonseData,
        status:request.status,
        statusText:request.statusText,
        headers:responseHeaders,
        config,
        request
      }
      handleResponse(response)
    }
    Object.keys(headers).forEach(name => {
      if (data === name && name.toLowerCase() === 'content-type') {
        delete headers[name]
      } else {
        request.setRequestHeader(name, headers[name])
      }
    })
    request.send(data)

    function handleResponse(response:AxiosResponse):void{
      if(response.status>=200&&response.status<300){
        resolve(response)
      }else{
        reject(new Error(`Request failed with status code ${response.status}` ))
      }
    }
  })
}
