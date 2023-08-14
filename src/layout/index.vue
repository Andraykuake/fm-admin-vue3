<template>
	<a-layout>
		<fm-aside :collapsed="collapsed" />
		<a-layout>
			<fm-header v-model:collapsed="collapsed" />
			<fm-tabs />
			<a-layout-content>
				<fm-breadcrumb />
				<router-view v-if="isRouterAlive"></router-view>
			</a-layout-content>
		</a-layout>
	</a-layout>
</template>

<script setup lang="ts">
import { provide, ref, nextTick } from 'vue'
import FmHeader from './fm-header/index.vue'
import FmTabs from './fm-tabs/index.vue'
import FmAside from './fm-aside/index.vue'
import FmBreadcrumb from './fm-breadcrumb/index.vue'

const collapsed = ref<boolean>(false)

/**
 * router-view 是否被激活，用于实现页面刷新
 */
const isRouterAlive = ref(true)

/**
 * 用于重新加载路由，实现页面刷新
 */
const reloadRouter = () => {
	isRouterAlive.value = false
	nextTick(() => {
		isRouterAlive.value = true
	})
}

/**
 * 注入到下级组件，在tabs中有刷新当前页面的需求
 */
provide('reloadRouter', reloadRouter)
</script>

<style lang="scss" scoped>
.ant-layout {
	height: 100vh;
	.ant-layout-content {
		margin: 1rem;
		padding: 1rem;
		background: #fff;
		min-height: 280px;
	}
}
</style>
