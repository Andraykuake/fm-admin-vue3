<template>
	<template v-for="menu in menus">
		<template v-if="!isSubMenu(menu)">
			<a-menu-item :key="menu.name">
				<router-link :to="menu.path || ''">
					<component :is="menu.icon" />
					<span>{{ menu.name }}</span>
				</router-link>
			</a-menu-item>
		</template>
		<template v-else>
			<a-sub-menu :key="menu.name">
				<template #icon> <component :is="menu.icon" /> </template>
				<template #title>{{ menu.name }}</template>
				<fm-menu-item :menus="menu.children" />
			</a-sub-menu>
		</template>
	</template>
</template>

<script setup lang="ts">
import { MenuType } from './menu'

defineOptions({
	name: 'FmMenuItem'
})

defineProps({
	menus: {
		type: Array<MenuType>,
		default: () => []
	}
})

const isSubMenu = (menuItem: MenuType) => {
	return !(!menuItem?.children || menuItem.children.length == 0)
}
</script>
