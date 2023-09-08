<template>
	<template v-for="menu in menus">
		<template v-if="!hasSubMenu(menu)">
			<a-menu-item :key="menu.menu_name">
				<router-link :to="menu.url || ''">
					<component :is="menu.icon" />
					<span>{{ menu.menu_name }}</span>
				</router-link>
			</a-menu-item>
		</template>
		<template v-else>
			<a-sub-menu :key="menu.menu_name">
				<template #icon> <component :is="menu.icon" /> </template>
				<template #title>{{ menu.menu_name }}</template>
				<fm-menu-item :menus="menu.children" />
			</a-sub-menu>
		</template>
	</template>
</template>

<script setup lang="ts">
import { SysMenu } from '@/types/models'

defineOptions({
	name: 'FmMenuItem'
})

defineProps({
	menus: {
		type: Array<SysMenu>,
		default: () => []
	}
})

const hasSubMenu = (menuItem: SysMenu) => {
	return !(!menuItem?.children || menuItem.children.length == 0)
}
</script>
