import request from '@/utils/request'

// 查询技能培训机构目录列表
export function listOrgan(query) {
  return request({
    url: '/system/organ/list',
    method: 'get',
    params: query
  })
}

// 查询技能培训机构目录详细
export function getOrgan(id) {
  return request({
    url: '/system/organ/' + id,
    method: 'get'
  })
}

// 新增技能培训机构目录
export function addOrgan(data) {
  return request({
    url: '/system/organ',
    method: 'post',
    data: data
  })
}

// 修改技能培训机构目录
export function updateOrgan(data) {
  return request({
    url: '/system/organ',
    method: 'put',
    data: data
  })
}

// 删除技能培训机构目录
export function delOrgan(id) {
  return request({
    url: '/system/organ/' + id,
    method: 'delete'
  })
}

// 导出技能培训机构目录
export function exportOrgan(query) {
  return request({
    url: '/system/organ/export',
    method: 'get',
    params: query
  })
}