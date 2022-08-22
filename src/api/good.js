import request from '@/request'
export function mygoodCount(userId) {
    return request({
        url: `/follow/${userId}`,
        method: 'post'
      })
}