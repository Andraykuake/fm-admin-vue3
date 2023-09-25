/**
 * sys_menu
 */
export interface SysMenu {
	createBy?: string
	createTime?: string
	icon: string
	isRefresh?: string
	menuId?: number | string
	menuName: string
	menuType: string
	orderNum: number | string
	parentId: number | string
	perms: number | string
	remark?: string
	target?: number | string
	updateBy?: number | string
	updateTime?: number | string
	url: string
	visible: string
	children?: Array<SysMenu>
}

/**
 * sys_role
 */
export interface SysRole {
	createdBy?: string
	createdAt?: string
	dataScope: string
	delFlag: string
	remark: string
	roleId?: number
	roleKey: string
	roleName: string
	roleSort?: number
	status?: string
	updatedBy?: string
	updatedAt?: null
}

/**
 * sys_user
 */
export interface SysUser {
	avatar?: string
	createBy?: string
	createTime?: string
	delFlag: string
	deptId?: number | string
	email?: string
	lastLoginDate?: string
	lastLoginIp?: string
	loginName: string
	password: string
	phoneNumber: string
	pwdLastUpdateDate?: string
	remark?: string
	salt: string
	sex: string
	status: string
	updateBy?: string
	updateTime?: string
	userId?: number | string
	userName: string
	userType: string
}
