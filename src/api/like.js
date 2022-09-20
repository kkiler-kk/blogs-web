import request from '@/request'
export function isLike(data) {
    return request({
      url: '/like/is/like',
      method: 'post',
      data
    })
  }