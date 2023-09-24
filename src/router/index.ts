import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createMemoryHistory, createWebHistory } from 'vue-router'
import { useTabsStore, useActiveTabStore } from '@/hooks/tabs'
const routes: RouteRecordRaw[] = [
	{
		meta: {
			title: '飞码技术社区后台管理系统',
			keywords: 'Fly Code Ape',
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
			},
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
	},
	{
		meta: {
			title: '分类-飞码社区',
			keywords: 'Fly Code Ape'
		},
		name: '分类',
		path: '/category/:id',
		component: () => import('@/pages/workspace.vue')
	},
	
	{
		path: '/:catchAll(.*)',
		redirect: '/404'
	}
]
const _router = createRouter({
	history: createWebHistory() || createWebHistory(),
	routes: routes
})

_router.beforeEach((to, from, next) => {
	/**
	 * breadcrumb 动态组织面包屑数据
	 */
	if (to.name) {
		const breadcrumbList: any[] = []
		const matchedRoutes = to.matched
		matchedRoutes.forEach((route) => {
			breadcrumbList.push(route.name as any)
		})
		to.meta.breadcrumbList = breadcrumbList
	}

	/**
	 * tabs 标签页数据处理
	 */
	const tabsStore = useTabsStore()
	const activeTabStore = useActiveTabStore()
	const tab = tabsStore.tabs.find((tab: any) => tab.path === to.path)
	if (!tab) {
		activeTabStore.activeTab = to
		tabsStore.tabs.push(activeTabStore.activeTab)
	} else {
		activeTabStore.activeTab = tab
	}

	next()
})

export const router = _router
