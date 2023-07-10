<template>
	<a-layout-header style="background: #fff; padding: 0">
		<fm-icon :icon="iconName" :size="16" class="trigger" @click="handleCollapsed" />
		<!-- <menu-unfold-outlined /> -->
	</a-layout-header>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import FmIcon from '../components/fm-icon/index.vue'

const props = defineProps({
	collapsed: {
		type: Boolean,
		default: false
	}
})
const iconName = computed(() => {
	return props.collapsed ? 'UpCircleFilled' : 'UpCircleFilled'
})

const emit = defineEmits(['update:collapsed'])
const handleCollapsed = () => {
	emit('update:collapsed', !props.collapsed)
}
</script>
<style lang="scss" scoped>
.trigger {
	font-size: 18px;
	line-height: 64px;
	padding: 0 24px;
	cursor: pointer;
	transition: color 0.3s;
}

.trigger:hover {
	color: #1890ff;
}
</style>
