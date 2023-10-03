import type { RouteRecordRaw } from 'vue-router'
const routes: RouteRecordRaw[] = [
	{
		path: '/article/category',
		name: '文章分类',
		meta: { keepAlive: false },
		component: () => import('@/pages/article/category/index.vue')
	}
]

export const ArticleRouters = routes
