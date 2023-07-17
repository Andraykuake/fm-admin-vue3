<template>
	<a-menu theme="dark" mode="inline" :selectedKeys="selectedKeys">
		<fm-menu-item :menus="menus" />
	</a-menu>
</template>

<script setup lang="ts">
import { PropType } from 'vue'
import { RouteRecordRaw } from 'vue-router'
import FmMenuItem from './fm-menu-item.vue'

defineOptions({
	name: 'FmMenuItem'
})
defineProps({
	selectedKeys: {
		type: Array as () => string[],
		default: ['工作台']
	},
	menus: {
		type: Array as PropType<RouteRecordRaw[]>,
		default: () => [
			{
				id: 1,
				name: '工作台',
				path: '/',
				icon: '',
				level: 1
			},
			{
				id: 2,
				name: '系统管理',
				path: '/',
				icon: '',
				level: 1,
				children: [
					{
						id: 11,
						name: '用户管理',
						path: '/user',
						icon: '',
						level: 2
					},
					{
						id: 22,
						name: '角色管理',
						path: '/role',
						icon: '',
						level: 2
					},
					{
						id: 33,
						name: '权限管理',
						path: '/priess',
						icon: '',
						level: 2
					}
				]
			}
		]
	}
})
</script>
