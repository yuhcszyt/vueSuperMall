import {requestData} from "./request";

export function getDetail(iid){
  return requestData({
    url:'/detail',
    method:'get',
    params:{
      iid
    }
  })
}
