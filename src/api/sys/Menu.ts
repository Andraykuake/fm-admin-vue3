import {
  get,
  post,
  put,
  del
} from '@/config/http.config'

import { SysMenu } from '@/types/models'

const baseURL = '/api/v1'

export function deleteSysMenuById(id: number) {
  return del(baseURL + '/menu/delete', { data: { id } })
}

export function querySysMenuList(data: any) {
  return get(baseURL + '/menu/list', { params: data })
}

export function querySysMenuById(data: any) {
  return get(baseURL + '/menu/single', data)
}

export function querySysMenuByRoleId(data: any) {
  return get(baseURL + '/menu/listByRoleId', data)
}

export function addSysMenu(data: SysMenu) {
  return post(baseURL + '/menu/add', data)
}

export function updateSysMenu(data: SysMenu) {
  return put(baseURL + '/menu/update', data)
}