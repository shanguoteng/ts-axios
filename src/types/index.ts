/*
 * @Author: shanguoteng
 * @Date: 2020-07-08 20:13:35
 * @LastEditors: shanguoteng
 * @LastEditTime: 2020-08-04 09:39:35
 * @FilePath: \typescript-library-starter\src\types\index.ts
 */ 
export type Method = 'get'|'Get'
| 'delete' | 'DELETE'
| 'head'  | 'HEAD'
| 'options' | 'OPTIONS'
| 'post'  |'POST'
| 'put' | 'PUT'
| 'patch' | 'PATCH'
export interface AxiosRequestConfig{
  url:string
  method?:Method
  data?:any
  params?:any
  headers?:any
  responseType?:XMLHttpRequestResponseType
  timeout?:number
}
export interface AxiosResponse{
  data:any
  status:number
  statusText:string
  headers:any
  config:AxiosRequestConfig
  request:any
}
export interface AxiosPromise extends Promise<AxiosResponse>{

}