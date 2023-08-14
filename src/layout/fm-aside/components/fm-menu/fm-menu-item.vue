<template>
	<template v-for="menu in menus">
		<template v-if="!isSubMenu(menu)">
			<a-menu-item :key="menu.name">
				<router-link :to="menu.path">
					<user-outlined />
					<span>{{ menu.name }}</span>
				</router-link>
			</a-menu-item>
		</template>
		<template v-else>
			<a-sub-menu :key="menu.name">
				<template #icon> <user-outlined /> </template>
				<template #title>{{ menu.name }}</template>
				<fm-menu-item :menus="menu.children" />
			</a-sub-menu>
		</template>
	</template>
</template>

<script setup lang="ts">
import { PropType } from 'vue'
import { UserOutlined } from '@ant-design/icons-vue'
import { RouteRecordRaw } from 'vue-router'

defineOptions({
	name: 'FmMenuItem'
})

defineProps({
	menus: {
		type: Array as PropType<RouteRecordRaw[]>,
		default: () => []
	}
})

const isSubMenu = (menuItem: RouteRecordRaw) => {
	return !(!menuItem?.children || menuItem.children.length == 0)
}
</script>
