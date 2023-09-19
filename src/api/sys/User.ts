import {
  get,
  post,
  put,
  del
} from '@/config/http.config'
import { SysUser } from '@/types/models'

const baseURL = '/api/v1'

export function deleteSysUserById(id: number) {
  return del(baseURL + '/user/delete', { data: { id } })
}

export function querySysUserList(data: any) {
  return get(baseURL + '/user/list', { params: data })
}

export function querySysUserById(data: any) {
  return post(baseURL + '/user/single', data)
}
export function addSysUser(data: SysUser) {
  return post(baseURL + '/user/add', data)
}

export function updateSysUser(data: SysUser) {
  return put(baseURL + '/user/update', data)
}