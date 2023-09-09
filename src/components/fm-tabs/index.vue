<template>
	<a-tabs type="editable-card" size="small" hide-add :activeKey="activeTab.path" @edit="handleTabEdit" @change="change">
		<template #rightExtra>
			<div class="more-opt">
				<a-dropdown :trigger="['click']">
					<a class="more-icon" @click.prevent>
						<more-outlined />
					</a>
					<template #overlay>
						<a-menu>
							<a-menu-item @click="closeOtherTab" :disabled="tabs.length <= 1"> 关闭其它 </a-menu-item>
							<a-menu-item @click="closeTabByKey(activeTab.path)"> 关闭当前 </a-menu-item>
							<a-menu-item @click="closeAllTab"> 关闭全部 </a-menu-item>
							<a-menu-item @click="reloadRouter"> 刷新当前页 </a-menu-item>
						</a-menu>
					</template>
				</a-dropdown>
			</div>
		</template>
		<a-tab-pane v-for="tab in tabs" :key="tab.path" :tab="tab.name" :closable="tabs.length > 1"> </a-tab-pane>
	</a-tabs>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useTabsStore, useActiveTabStore } from '@/hooks/tabs'
import { inject } from 'vue'

type tabType = { path: string }

const router = useRouter()
const { tabs } = storeToRefs(useTabsStore())
const { activeTab } = storeToRefs(useActiveTabStore())

const closeTabByKey = (path: string) => {
	const rmTabIndex = tabs.value.findIndex((tab: tabType) => tab.path === path)
	const isActive = tabs.value[rmTabIndex].path == activeTab.value.path
	tabs.value.splice(rmTabIndex, 1)
	if (isActive) {
		router.push(tabs.value[tabs.value.length - 1])
	}
}

const closeOtherTab = () => {
	tabs.value = [activeTab.value]
}

const closeAllTab = () => {
	tabs.value = []
	router.push('/')
}

const handleTabEdit = (targetKey: KeyType, action: string) => {
	if (action === 'remove') {
		closeTabByKey(targetKey)
	}
}

const change = (path: string) => {
	const index = tabs.value.findIndex((tab: tabType) => tab.path === path)
	router.push(tabs.value[index])
}

const reloadRouter = inject('reloadRouter')
</script>

<style lang="scss" scoped>
.ant-tabs {
	margin-top: 3px;
	padding: 0.5rem 1rem;
	background: #fff;
	.ant-tabs-tab {
		margin-right: 0.3rem;
	}
	.more-opt {
		margin-bottom: 0.5rem;
	}
	.more-icon {
		font-size: 1rem;
		font-weight: 700;
		color: #000;
	}
}
</style>
