import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useTabsStore = defineStore('tabs', () => {
	const tabs: any = ref([])
	const addTab = (tab: any) => {
		tabs.value.push(tab)
	}
	return { tabs, addTab }
})

export const useActiveTabStore = defineStore('activeTab', () => {
	const activeTab: any = ref({})
	return { activeTab }
})
