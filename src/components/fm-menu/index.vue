<template>
	<a-menu
		theme="dark"
		mode="inline"
		:openKeys="openKeys"
		:selectedKeys="selectedKeys"
		@openChange="onOpenChange"
	>
		<fm-menu-item :menus="menus" />
	</a-menu>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import FmMenuItem from './fm-menu-item.vue'
import { SysMenu } from '@/types/models'

defineOptions({
	name: 'FmMenuItem'
})
const props = defineProps({
	selectedKeys: {
		type: Array as () => string[],
		default: []
	},
	menus: {
		type: Array<SysMenu>,
		default: () => [
			// {
			// 	id: 1,
			// 	name: '工作台',
			// 	path: '/',
			// 	icon: '',
			// 	level: 1
			// },
			// {
			// 	id: 2,
			// 	name: '系统管理',
			// 	path: '/',
			// 	icon: '',
			// 	level: 1,
			// 	children: [
			// 		{
			// 			id: 11,
			// 			name: '用户管理',
			// 			path: '/user',
			// 			icon: '',
			// 			level: 2
			// 		},
			// 		{
			// 			id: 22,
			// 			name: '角色管理',
			// 			path: '/role',
			// 			icon: '',
			// 			level: 2
			// 		},
			// 		{
			// 			id: 33,
			// 			name: '权限管理',
			// 			path: '/priess',
			// 			icon: '',
			// 			level: 2
			// 		}
			// 	]
			// }
		]
	}
})

const openKeys = ref(props.selectedKeys)
const rootSubmenuKeys = ref<string[]>([])

const onOpenChange = (keys: string[]) => {
	const latestOpenKey = keys.find((key) => openKeys.value.indexOf(key) === -1)
	if (rootSubmenuKeys.value.indexOf(latestOpenKey!) === -1) {
		openKeys.value = keys
	} else {
		openKeys.value = latestOpenKey ? [latestOpenKey] : []
	}
}

watch(
	() => props.menus,
	(value: Array<SysMenu>) => {
		value.map((menu) => {
			rootSubmenuKeys.value.push(menu.menu_name)
		})
	}
)
</script>

<style lang="scss" scoped>
.ant-menu {
	height: calc(100% - 67px);
	overflow: auto;
}
</style>
../../types/menu
