import request from '@/request'
export function myFollow(userId) {
    userId = parseInt(userId)
    return request({
      url: `/follow/follow/${userId}`,
      method: 'post'
    })
  }
  export function getUserFollow( userId) {
    return request({
      url: `/follow/` + parseInt(userId),
      method: 'post'
    })
  }
  export function isFollow(data) {
    return request({
      url: '/follow/is/follow',
      method: 'post',
      data: data
    })
  }
  
  export function myFan(userId) {
    userId = parseInt(userId)
    return request({
      url: `/follow/fans/${userId}`,
      method: 'post'
    })
  }
  export function addFollow(token, followId) {
    return request({
      headers: {'Authorization': token},
      url: '/follow/add',
      method: 'post',
      data: {"followId": parseInt(followId)}
    })
  }
  export function removeFollow(token, followId) {
    return request({
      headers: {'Authorization': token},
      url: '/follow/remove',
      method: 'post',
      data: {"followId": parseInt(followId)}
    })
  }
  export function deleteFollow(token) {
    return request({
      headers: {'Authorization': token},
      url: '/users/info',
      method: 'post'
    })
  }
  export function followAndFanCount(userId) {
    userId = parseInt(userId)
    return request({
      url: `/follow/${userId}`,
      method: 'post'
    })
  }
  