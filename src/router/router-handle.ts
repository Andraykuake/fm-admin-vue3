import { useTabsStore, useActiveTabStore } from '@/hooks/tabs'

/**
 * 导航守卫
 * @param to
 * @param from
 * @param next
 */
export const routerHandle = (to: any, from: any, next: () => void) => {
	/**
	 * breadcrumb 动态组织面包屑数据
	 */
	if (to.name) {
		const breadcrumbList: any[] = []
		const matchedRoutes = to.matched
		matchedRoutes.forEach((route: { name: any }) => {
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
}
