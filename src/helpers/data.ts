/*
 * @Author: shanguoteng
 * @Date: 2020-07-19 20:46:44
 * @LastEditors: shanguoteng
 * @LastEditTime: 2020-08-02 17:38:27
 * @FilePath: \typescript-library-starter\src\helpers\data.ts
 */ 
import {isPlainObject} from './util'
import { type } from 'os'
export function transformRequest(data:any):any{
  if(isPlainObject(data)){
    return JSON.stringify(data)
  }
  return data
}
export function transformReponse(data:any):any{
  if(typeof data ==='string'){
    try {
      data = JSON.parse(data)
    } catch (e) {
      // do nothing
    }
  }
  return data
}