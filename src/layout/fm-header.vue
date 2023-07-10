<template>
	<a-layout-header style="background: #fff; padding: 0">
		<component :is="iconName" @click="handleCollapsed" class="collapse-icon"></component>
	</a-layout-header>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
	collapsed: {
		type: Boolean,
		default: false
	}
})
const iconName = computed(() => {
	return props.collapsed ? 'menu-unfold-outlined' : 'menu-fold-outlined'
})

const emit = defineEmits(['update:collapsed'])
const handleCollapsed = () => {
	emit('update:collapsed', !props.collapsed)
}
</script>
<style lang="scss" scoped>
.collapse-icon {
	font-size: 18px;
	line-height: 64px;
	padding: 0 24px;
	cursor: pointer;
	transition: color 0.3s;
}

.collapse-icon:hover {
	color: #1890ff;
}
</style>
