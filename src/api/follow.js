import request from '@/request'
export function myFollow(userId) {
    userId = parseInt(userId)
    return request({
      url: `/follow/follow/${userId}`,
      method: 'post'
    })
  }
  export function myFan(userId) {
    userId = parseInt(userId)
    return request({
      url: `/follow/fans/${userId}`,
      method: 'post'
    })
  }
  
  export function addFollow(token) {
    return request({
      headers: {'Authorization': token},
      url: '/users/info',
      method: 'post'
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
  