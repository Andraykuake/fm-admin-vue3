import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createMemoryHistory, createWebHistory } from 'vue-router'

import { routerHandle } from './router-handle'

import { ArticleRouters } from './article'
import { SystemRouters } from './system'
import { ErrorRouters } from './error'

const routes: RouteRecordRaw[] = [
	{
		meta: {
			title: '飞码技术社区后台管理系统',
			keywords: 'Fly Code Ape'
		},
		path: '/',
		name: '首页',
		redirect: '/workspace',
		component: () => import('@/layout/index.vue'),
		children: [
			{
				path: '/workspace',
				name: '工作台',
				meta: { keepAlive: false },
				component: () => import('@/pages/workspace.vue')
			},
			...ArticleRouters,
			...SystemRouters,
			...ErrorRouters
		]
	},
	{
		path: '/:catchAll(.*)',
		redirect: '/404'
	}
]

/**
 * 创建 router 实例对象
 */
const _router = createRouter({
	history: createWebHistory() || createWebHistory(),
	routes: routes
})

/**
 * 导航守卫
 */
_router.beforeEach(routerHandle)
export const router = _router
