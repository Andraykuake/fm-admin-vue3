export interface MenuType {
	id: number
	permission_id: string
	name: string
	path: string
	perms: string
	type: number
	description: string
	parent_id: number
	order_num: number
	icon: string
	status: number
	level: number
	key: number
	create_time: string
	update_time: string
	children: Array<MenuType>
}
