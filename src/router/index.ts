import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createMemoryHistory, createWebHistory } from 'vue-router'
import { useTabsStore, useActiveTabStore } from '@/hooks/tabs'
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
				meta: {},
				component: () => import('@/pages/workspace.vue')
			},
			{
				path: '/users',
				name: '用户管理',
				component: () => import('@/pages/sys-user/index.vue')
			},
			{
				path: '/roles',
				name: '角色管理',
				component: () => import('@/pages/sys-role/index.vue')
			},
			{
				path: '/permissions',
				name: '权限管理',
				component: () => import('@/pages/sys-permissions/index.vue')
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
		meta: {
			title: '出现错误了-飞码社区',
			keywords: 'Fly Code Ape'
		},
		path: '/404',
		component: () => import('@/pages/workspace.vue')
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
