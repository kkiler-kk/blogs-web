import request from '@/request'
export function userInfo(userId) {
    userId = parseInt(userId)
    return request({
      url: `/users/info/${userId}`,
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