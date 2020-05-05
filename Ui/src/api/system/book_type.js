import request from '@/utils/request'

// 查询书籍类型列表
export function listBook_type(query) {
  return request({
    url: '/system/book_type/list',
    method: 'get',
    params: query
  })
}

// 查询书籍类型列表2
export function listBook_type2() {
  return request({
    url: '/system/book_type/list2',
    method: 'get'
  })
}

// 查询书籍类型详细
export function getBook_type(id) {
  return request({
    url: '/system/book_type/' + id,
    method: 'get'
  })
}

// 新增书籍类型
export function addBook_type(data) {
  return request({
    url: '/system/book_type',
    method: 'post',
    data: data
  })
}

// 修改书籍类型
export function updateBook_type(data) {
  return request({
    url: '/system/book_type',
    method: 'put',
    data: data
  })
}

// 删除书籍类型
export function delBook_type(id) {
  return request({
    url: '/system/book_type/' + id,
    method: 'delete'
  })
}

// 导出书籍类型
export function exportBook_type(query) {
  return request({
    url: '/system/book_type/export',
    method: 'get',
    params: query
  })
}
