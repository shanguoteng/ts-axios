import { transformRequest, transformResponse } from './helpers/data'
import { processHeaders } from './helpers/headers'
import { AxiosRequestConfig } from './types/index'
const defaults: AxiosRequestConfig = {
  method: 'get',
  timeout: 0,
  headers: {
    common: {
      Accept: 'application/json,text/plain,*/*'
    }
  },
  transformRequest: [
    function(data, headers) {
      processHeaders(headers, data)
      return transformRequest(data)
    }
  ],
  transformResponse: [
    function(data, headers) {
      return transformResponse(data)
    }
  ]
}
const methodsNoData = ['get', 'delete', 'head', 'options']
methodsNoData.forEach(method => {
  defaults.headers[method] = {}
})
const methodsData = ['post', 'put', 'pathch']
methodsData.forEach(method => {
  defaults.headers[method] = {
    'Content-Type': 'application/x-www-form-urlencode'
  }
})
export default defaults
