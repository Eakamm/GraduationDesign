import request from '@/utils/request'

// 查询图书的比价信息
export function getBookHistoryPrice(full_url) {
  return request({
    url: '/tool/chart/DateAndPrice',
    method: 'get',
    params: {
      full_url: full_url
    }
  })
}

// 查询最受关注图书的词云文件
export function getMostWatchedBook() {
  return request({
    url: '/tool/chart/mostWatchedBook',
    method: 'get'
  })
}

// 查询图书评论的词云文件
export function getCommitsWordCloud(url) {
  return request({
    url: '/tool/chart/bookCommitsWordCloud',
    method: 'get',
    params: {
      url: url
    }
  })
 }

// 获取书籍统计
export function getBookNumbersByAttributes(type) {
  return request({
    url: '/tool/attributes/NumberByAttributes',
    method: 'get',
    params: {
      attributes: type
    }
  })
}
