import { get, post, put, del } from '@/config/http.config'

import { SysMenu } from '@/types/models'

export function deleteSysMenuById(id: number) {
	return del('/menu/delete', { data: { id } })
}

export function querySysMenuList(data: any) {
	return get('/menu/list', { params: data })
}

export function querySysMenuById(data: any) {
	return get('/menu/single', data)
}

export function querySysMenuByRoleId(data: any) {
	return get('/menu/listByRoleId', data)
}

export function addSysMenu(data: SysMenu) {
	return post('/menu/add', data)
}

export function updateSysMenu(data: SysMenu) {
	return put('/menu/update', data)
}
