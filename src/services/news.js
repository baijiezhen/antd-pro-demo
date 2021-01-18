import request from '@/utils/request';
export async function queryNews() {
  return request('/api/news');
}
