import { Method } from './../types/index'
import { deepMerge, isPlainObject } from './utils'
function normalizeHeaderName(headers: any, normalizeName: string): void {
  if (!headers) {
    return
  }
  Object.keys(headers).forEach(name => {
    if (name !== normalizeName && name.toLocaleUpperCase() === normalizeName.toLocaleUpperCase()) {
      headers[normalizeName] = headers[name]
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
export function parseHeaders(headers: string): any {
  const parsed = Object.create(null)
  if (!headers) {
    return parsed
  }
  headers.split('\r\n').forEach(line => {
    let [key, val] = line.split(':')
    key = key.trim().toLocaleLowerCase()
    if (!key) {
      return
    }
    if (val) {
      val = val.trim().toLocaleLowerCase()
    }
    parsed[key] = val
  })
  return parsed
}
export function flattenHeaders(headers: any, method: Method) {
  if (!headers) {
    return
  }
  headers = deepMerge(headers.common, headers.method, headers)
  const methodsToDelete = ['get', 'delete', 'head', 'options', 'put', 'post', 'patch', 'common']
  methodsToDelete.forEach(method => {
    delete headers[method]
  })
  return headers
}
