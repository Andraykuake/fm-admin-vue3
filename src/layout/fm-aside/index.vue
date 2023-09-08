<template>
	<a-layout-sider :collapsed="collapsed" :trigger="null" collapsible>
		<fm-logo :collapsed="collapsed" />
		<fm-menu :selectedKeys="selectedKeys" :menus="menus" />
	</a-layout-sider>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import FmLogo from './components/fm-logo/index.vue'
import FmMenu from './components/fm-menu/index.vue'
import { SysMenu } from '@/types/models'

import api from '@/api/index'

const currentRoute = useRoute()

const menus = ref<Array<SysMenu>>([])

const props = defineProps({
	collapsed: {
		type: Boolean,
		default: false
	}
})

const selectedKeys = ref<string[]>([])

onMounted(() => {
	api.sysPermission.querySysPermissionList({ type: 1 }).then((res) => {
		if (res.code == 200) {
			console.log(res.data)
			menus.value = res.data
		}
	})
})

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
