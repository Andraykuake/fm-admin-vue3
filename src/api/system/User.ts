import { get, post, put, del } from '@/config/http.config'
import { SysUser } from '@/types/models'

export function deleteSysUserById(id: number) {
	return del('/user/delete', { data: { id } })
}

export function querySysUserList(data: any) {
	return get('/user/list', { params: data })
}

export function querySysUserById(data: any) {
	return post('/user/single', data)
}
export function addSysUser(data: SysUser) {
	return post('/user/add', data)
}

export function updateSysUser(data: SysUser) {
	return put('/user/update', data)
}
