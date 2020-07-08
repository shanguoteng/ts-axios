import axios from '../../src/index'
// get demo
axios({
  method:'get',
  url:'/base/get',
  params:{
    foo:['bar','baz']
  }
})

axios({
  method:'get',
  url:'/base/get',
  params:{
    foo:{
      bar:'baz'
    }
  }
})
const date = new Date()
axios({
  method: 'get',
  url: '/base/get',
  params: {
    date
  }
})
axios({
  method: 'get',
  url: '/base/get',
  params: {
    foo: '@:$, '
  }
})

axios({
  method: 'get',
  url: '/base/get',
  params: {
    baz: 'bar',
    foo: null,
  }
})

axios({
  method: 'get',
  url: '/base/get#hash',
  params: {
    foo: 'baz'
  }
})

axios({
  method: 'get',
  url: '/base/get?baz=foo',
  params: {
    foo: 'bar'
  }
})
// post demo
axios({
  method:'post',
  url:'/base/post',
  data:{
    foo:'bar',
    baz:2
  }
}).then(res=>console.log(res))

axios({
  method:'post',
  url:'/base/post2',
  data:{
    foo:'bar',
    baz:2
  },
  responseType:'json',
  headers:{
    'content-type':'application/json;charset=utf-8'
  }
}).then(res=>console.log(res))
const arr = new Int32Array([21,32])
axios({
  method:'post',
  url:'/base/buffer',
  data:arr
})