<template>
	<template v-for="menu in menus">
		<template v-if="!hasSubMenu(menu)">
			<a-menu-item :key="menu.menuName">
				<router-link :to="menu.url || ''">
					<component :is="menu.icon" />
					<span>{{ menu.menuName }}</span>
				</router-link>
			</a-menu-item>
		</template>
		<template v-else>
			<a-sub-menu :key="menu.menuName">
				<template #icon> <component :is="menu.icon" /> </template>
				<template #title>{{ menu.menuName }}</template>
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
