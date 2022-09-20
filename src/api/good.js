import request from '@/request'
export function mygoodCount(userId) {
    return request({
        url: `/fans/${userId}`,
        method: 'post'
      })
}
