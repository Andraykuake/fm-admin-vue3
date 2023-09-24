import {
  get,
  post,
  put,
  del
} from '@/config/http.config'
import { SysRole } from '@/types/models'

export function deleteSysRoleById(id: number) {
  return del('/role/delete', { data: { id } })
}

export function querySysRoleList(data: any) {
  return get('/role/list', { params: data })
}

export function querySysRoleById(data: any) {
  return get('/role/single', data)
}

export function querySysRoleByRoleId(data: any) {
  return get('/role/listByRoleId', data)
}

export function addSysRole(data: SysRole) {
  return post('/role/add', data)
}

export function updateSysRole(data: SysRole) {
  return put('/role/update', data)
}