import {
  get,
  post,
  put,
  del
} from '@/config/http.config'

export function deleteSysPermissionById(data: any) {
  return del('/admin/sysPermission/delete', data)
}

export function querySysPermissionList(data: any = {}) {
  return get('/admin/sysPermission/list', data)
}

export function querySysPermissionById(data: any) {
  return get('/admin/sysPermission/single', data)
}

export function querySysPermissionByRoleId(data: any) {
  return get('/admin/sysPermission/listByRoleId', data)
}

export function addSysPermission(data: any) {
  return post('/admin/sysPermission/add', data)
}

export function updateSysPermission(data: any) {
  return put('/admin/sysPermission/update', data)
}