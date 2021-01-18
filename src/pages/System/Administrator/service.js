import request from '@/utils/request';
export async function queryTableList(params) {
  return request('/api/table_list', {
    params,
  });
}
