import { AxiosPromise, AxiosResponse } from '../types/index'
import { AxiosRequestConfig } from '../types'
import { parseHeaders } from '../helpers/headers'
import { createError } from '../helpers/error'
import { isFormData } from '../helpers/utils'

export default function xhr(config: AxiosRequestConfig): AxiosPromise {
  return new Promise((resolve, reject) => {
    const {
      url,
      method = 'get',
      data = null,
      headers,
      responseType,
      timeout,
      cancelToken,
      withCredentials,
      onDownloadProgress,
      onUploadProgress
    } = config
    const request = new XMLHttpRequest()
    if (responseType) {
      request.responseType = responseType
    }
    if (timeout) {
      request.timeout = timeout
    }
    if (withCredentials) {
      request.withCredentials = withCredentials
    }
    if (onDownloadProgress) {
      request.onprogress = onDownloadProgress
    }
    if (onUploadProgress) {
      request.upload.onprogress = onUploadProgress
    }
    if (isFormData(data)) {
      delete headers['Content-Type']
    }
    request.open(method.toLowerCase(), url!, true)
    request.onreadystatechange = function handleLoad() {
      if (request.readyState !== 4) {
        return
      }
      if (request.status === 0) {
        return
      }
      const responseHeaders = parseHeaders(request.getAllResponseHeaders())
      const responseData = responseType !== 'text' ? request.response : request.responseText
      const response: AxiosResponse = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        request,
        config
      }
      handleResponse(response)
    }
    request.onerror = function handleError() {
      reject(createError('Netword Error', config, null, request))
    }
    request.ontimeout = function handleTimeout() {
      reject(createError(`Timeout of ${timeout}ms  exceeded`, config, 'ECONNABORTED', reject))
    }
    Object.keys(headers).forEach(name => {
      if (data === null && name.toLocaleLowerCase(name) === 'content-type') {
        delete headers[name]
      } else {
        request.setRequestHeader(name, headers[name])
      }
    })
    function handleResponse(response: AxiosResponse): void {
      if (response.status >= 200 && response.status < 300) {
        resolve(response)
      } else {
        reject(
          createError(
            `Request failed with status code ${response.status}`,
            config,
            null,
            request,
            response
          )
        )
      }
    }
    if (cancelToken) {
      cancelToken.promise.then(reason => {
        request.abort()
        reject(reason)
      })
    }
    request.send(data)
  })
}
