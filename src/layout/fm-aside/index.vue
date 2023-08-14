<template>
	<a-layout-sider :collapsed="collapsed" :trigger="null" collapsible>
		<fm-logo :collapsed="collapsed" />
		<fm-menu :selectedKeys="selectedKeys" />
	</a-layout-sider>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import FmLogo from './components/fm-logo/index.vue'
import FmMenu from './components/fm-menu/index.vue'

const currentRoute = useRoute()
const router = useRouter()
console.log(router)
const props = defineProps({
	collapsed: {
		type: Boolean,
		default: false
	}
})

const selectedKeys = ref<string[]>([])

// 跟随页面路由变化，切换菜单选中状态
watch(
	() => currentRoute.fullPath,
	() => {
		if (currentRoute.name === '登录' || props.collapsed) return
		selectedKeys.value = [currentRoute.name as string]
	},
	{
		immediate: true
	}
)
</script>
<style lang="scss" scoped></style>
