/*
 * @Author: shanguoteng
 * @Date: 2020-07-08 21:10:31
 * @LastEditors: shanguoteng
 * @LastEditTime: 2020-07-19 20:53:52
 * @FilePath: \typescript-library-starter\src\helpers\util.ts
 */ 
const toString = Object.prototype.toString

export function isDate(val: any):val is Date{
  return toString.call(val)==='[object Date]'
}

export function isObject(val: any): val is Object {
  return val !==null && typeof val ==='object'
}
export function isPlainObject(val:any):val is Object {
  return toString.call(val)==='[object Object]'
}