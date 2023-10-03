import type { RouteRecordRaw } from 'vue-router'
const routes: RouteRecordRaw[] = [
	{
		meta: {
			title: '出现错误了-飞码社区',
			keywords: 'Fly Code Ape',
			keepAlive: false
		},
		name: '出问题喽',
		path: '/404',
		component: () => import('@/pages/error/404.vue')
	}
]

export const ErrorRouters = routes
