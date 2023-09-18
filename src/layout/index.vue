<template>
	<a-layout>
		<!-- 左侧菜单 -->
		<fm-aside :collapsed="collapsed" />
		<a-layout>
			<!-- 头部内容 -->
			<fm-header v-model:collapsed="collapsed" />
			<!-- 标签导航 -->
			<fm-tabs>
				<!-- 主内容区 -->
				<a-layout-content>
					<router-view v-if="isRouterAlive" v-slot="{ Component }">
						<!-- 需要缓存 -->
						<keep-alive v-if="$route.meta.keepAlive">
							<component :is="Component" />
						</keep-alive>
						<!-- 不需要缓存 -->
						<component :is="Component" v-else />
					</router-view>
				</a-layout-content>
			</fm-tabs>
		</a-layout>
	</a-layout>
</template>

<script setup lang="ts">
import { provide, ref, nextTick } from 'vue'
import FmHeader from '@/components/fm-header/index.vue'
import FmTabs from '@/components/fm-tabs/index.vue'
import FmAside from '@/components/fm-aside/index.vue'

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
		height: calc(100vh - 170px);
		overflow-y: scroll;
		box-sizing: border-box;
	}
}
</style>
