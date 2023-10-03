import type { RouteRecordRaw } from 'vue-router'
/**
 * 系统管理路由
 */
const routes: RouteRecordRaw[] = [
	{
		path: '/system/user',
		name: '用户管理',
		meta: { keepAlive: true },
		component: () => import('@/pages/system/user/index.vue')
	},
	{
		path: '/system/role',
		name: '角色管理',
		meta: { keepAlive: true },
		component: () => import('@/pages/system/role/index.vue')
	},
	{
		path: '/system/menu',
		name: '菜单管理',
		meta: { keepAlive: true }, // 启用缓存
		component: () => import('@/pages/system/menu/index.vue')
	},
	{
		path: '/system/icon',
		name: '系统图标',
		meta: { keepAlive: false },
		component: () => import('@/pages/system/icon/index.vue')
	}
]

export const SystemRouters = routes
