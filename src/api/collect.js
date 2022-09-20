import request from '@/request'

export function myCollect(id) {
    return request({
        url: `/collect/user/${id}`,
        method: 'post'
      })
}

export function isGood(data) {
  return request({
    url: '/collect/is/collect',
    method: 'post',
    data
  })
}