import request from '@/utils/request'

export function runScrapy(type, page_count) {
  return request({
    url: '/system/scrapy/crawl',
    method: 'get',
    params: {
      type: type,
      page_count: page_count
    }
  })
}