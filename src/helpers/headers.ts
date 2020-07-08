import { isPlainObject } from './util'
// import { normalize } from 'path'

/**
 * @description: 将headers里面的小写属性统一转为大写
 * @param {headers} 请求头
 * @param {normalizedName} 请求头的属性。例如content-type
 */
function normalizeHeaderName(headers: any, normalizedName: string): void {
  if (!headers) {
    return
  }
  // 遍历headers对象的所有key
  Object.keys(headers).forEach(name => {
    // 如果传入小写的content-type。统一转化为大写
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = headers[name]
      delete headers[name]
    }
  })
}

export function processHeaders(headers: any, data: any): any {
  normalizeHeaderName(headers, 'Content-Type')
  if (isPlainObject(data)) {
    if (headers && !headers['Content-Type']) {
      headers['Content-Type'] = 'application/json;charset=utf-8'
    }
  }
  return headers
}
export function parseHeaders(headers:string):any{
  let parsed = Object.create(null)
  if(!headers){
    return parsed
  }
  headers.split('\r\n').forEach((line)=>{
    let [key,val] = line.split(':')
    key = key.trim().toLowerCase()
    if(!key){
      return
    }
    if(val){
      val = val.trim()
    }
    parsed[key]=val
  })
  return parsed
}