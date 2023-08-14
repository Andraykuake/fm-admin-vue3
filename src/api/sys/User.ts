import {
  get,
  post,
  put,
  del
} from '@/config/http.config'

export function deleteSysUserById(data: any) {
  return del('/admin/sysUser/delete', data)
}

export function querySysUserList(data: any) {
  return get('/admin/sysUser/list', data)
}

export function querySysUserById(data: any) {
  return post('/admin/sysUser/single', data)
}
export function addSysUser(data: any) {
  return post('/admin/sysUser/add', data)
}

export function updateSysUser(data: any) {
  return put('/admin/sysUser/update', data)
}