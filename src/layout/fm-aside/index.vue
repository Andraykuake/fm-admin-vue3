<template>
	<a-layout-sider :collapsed="collapsed" :trigger="null" collapsible>
		<fm-logo :collapsed="collapsed" />
		<fm-menu />
	</a-layout-sider>
</template>

<script setup lang="ts">
import { watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import FmLogo from './components/fm-logo/index.vue'
import FmMenu from './components/fm-menu/index.vue'

const currentRoute = useRoute()
const router = useRouter()
console.log(router)
defineProps({
	collapsed: {
		type: Boolean,
		default: false
	}
})

// 跟随页面路由变化，切换菜单选中状态
watch(
	() => currentRoute.fullPath,
	() => {
		// if (currentRoute.name === LOGIN_NAME || props.collapsed) return
		// state.openKeys = getOpenKeys()
		// const meta = currentRoute.meta
		// if (meta?.activeMenu) {
		// 	const targetMenu = getTargetMenuByActiveMenuName(meta.activeMenu)
		// 	state.selectedKeys = [targetMenu?.name ?? meta?.activeMenu] as string[]
		// } else {
		// 	state.selectedKeys = [currentRoute.meta?.activeMenu ?? currentRoute.name] as string[]
		// }
	},
	{
		immediate: true
	}
)
</script>
<style lang="scss" scoped></style>
