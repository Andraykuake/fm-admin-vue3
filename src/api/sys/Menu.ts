import {
  get,
  post,
  put,
  del
} from '@/config/http.config'

const baseURL = '/api/v1'

export function deleteSysPermissionById(data: any) {
  return del(baseURL + '/menu/delete', data)
}

export function querySysPermissionList(data: any = {}) {
  return get(baseURL + '/menu/list', data)
}

export function querySysPermissionById(data: any) {
  return get(baseURL + '/menu/single', data)
}

export function querySysPermissionByRoleId(data: any) {
  return get(baseURL + '/menu/listByRoleId', data)
}

export function addSysPermission(data: any) {
  return post(baseURL + '/menu/add', data)
}

export function updateSysPermission(data: any) {
  return put(baseURL + '/menu/update', data)
}