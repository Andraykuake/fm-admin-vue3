<template>
	<a-tabs type="editable-card" hide-add v-model:selectedTab="selectedTab" @edit="handleTabEdit">
		<a-tab-pane v-for="tab in tabs" :key="tab.key" :tab="tab.title" :closable="tabs.length > 1">
			<router-view :key="tab.key"></router-view>
		</a-tab-pane>
	</a-tabs>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const tabs = ref([{ title: 'Tab 1', key: '1' }])

const selectedTab = ref(tabs.value[0].key)

const handleTabEdit = (targetKey: string | MouseEvent, action: string) => {
	if (action === 'remove') {
		const index = tabs.value.findIndex((tab) => tab.key === targetKey)
		tabs.value.splice(index, 1)
	}
}

router.beforeEach((to) => {
	const tab = tabs.value.find((tab) => tab.key === to.path)
	if (!tab) {
		tabs.value.push({
			key: to.path,
			title: to.meta.breadcrumb as string
		})
		selectedTab.value = to.meta.breadcrumb as string
	} else {
		selectedTab.value = tab.title
	}
})
</script>

<style lang="scss" scoped>
.ant-tabs {
	margin-top: 3px;
}
</style>
