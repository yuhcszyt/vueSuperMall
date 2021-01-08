import {request,requestData} from "./request";

export function getHomeMultidata() {
    return request({ url:'/home/multidata',
      //method:'post'
      method:'get'}
    )
}

export function getHomeGoods(type,page) {
  return requestData({ url:'/home/data',
    //method:'post'
    method:'get',
    params:{
      type,
      page
    }}
  )
}
