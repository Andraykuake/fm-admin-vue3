import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createMemoryHistory, createWebHistory } from 'vue-router'

const routes: RouteRecordRaw[] = [
	{
		meta: {
			title: '飞码技术社区后台管理系统',
			keywords: 'Fly Code Ape',
			breadcrumb: '首页'
		},
		path: '/',
		redirect: '/home',
		component: () => import('@/layout/index.vue'),
		children: [
			{
				path: '/home',
				meta: {
					breadcrumb: '工作台'
				},
				component: () => import('@/pages/home.vue')
			},
			{
				path: '/user',
				meta: {
					breadcrumb: '用户管理'
				},
				component: () => import('@/pages/user.vue')
			},
			{
				path: '/role',
				meta: {
					breadcrumb: '角色管理'
				},
				component: () => import('@/pages/role.vue')
			},
			{
				path: '/priess',
				meta: {
					breadcrumb: '权限管理'
				},
				component: () => import('@/pages/priess.vue')
			}
		]
	},
	{
		meta: {
			title: '分类-飞码社区',
			keywords: 'Fly Code Ape'
		},
		path: '/category/:id',
		component: () => import('@/pages/home.vue')
	},
	{
		meta: {
			title: '出现错误了-飞码社区',
			keywords: 'Fly Code Ape'
		},
		path: '/404',
		component: () => import('@/pages/home.vue')
	}
]
const _router = createRouter({
	history: createWebHistory() || createWebHistory(),
	routes: routes
})

_router.beforeEach((to, from, next) => {
	if (to.meta.breadcrumb) {
		// 动态设置面包屑
		const breadcrumbList: string[] = []
		const matchedRoutes = to.matched
		matchedRoutes.forEach((route) => {
			const breadcrumb = typeof route.meta.breadcrumb === 'function' ? route.meta.breadcrumb(to) : route.meta.breadcrumb
			breadcrumbList.push(breadcrumb)
		})
		to.meta.breadcrumbList = breadcrumbList
	}

	// const existingTab = tabs.value.find((tab) => tab.key === to.path)
	// if (!existingTab) {
	// 	const newTab = {
	// 		key: to.path,
	// 		title: to.name || 'New Tab'
	// 	}
	// 	tabs.value.push(newTab)
	// 	selectedTab.value = newTab.key
	// } else {
	// 	selectedTab.value = existingTab.key
	// }

	next()
})

export const router = _router
