import request from '@/request'
export function userInfo(userId) {
    userId = parseInt(userId)
    return request({
      url: `/users/info/${userId}`,
      method: 'post'
    })
  }
  
  export function getUserInfo(userId) {
    userId = parseInt(userId)
    return request({
      url: `/users/${userId}`,
      method: 'post'
    })
  }
  
  export function myArticle(userId) {
    userId = parseInt(userId)
    return request({
        url: `/users/article/${userId}`,
        method: 'post'
    })
  }
  export function updateUser(token, form) {
    return request({
      headers: {'Authorization': token},
      url: '/users/change/info',
      method: 'post',
      data: form
  })
  }