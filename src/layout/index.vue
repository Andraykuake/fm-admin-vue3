<template>
	<a-layout>
		<fm-aside :collapsed="collapsed" />
		<a-layout>
			<fm-header v-model:collapsed="collapsed" />
			<fm-tabs />
			<a-layout-content :style="{ margin: '24px 16px', padding: '24px', background: '#fff', minHeight: '280px' }">
				<fm-breadcrumb />
			</a-layout-content>
		</a-layout>
	</a-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import FmHeader from './fm-header.vue'
import FmTabs from './fm-tabs.vue'
import FmAside from './fm-aside/index.vue'
import FmBreadcrumb from './fm-breadcrumb.vue'

const collapsed = ref<boolean>(false)
</script>

<style lang="scss" scoped>
.ant-layout {
	height: 100vh;
	.ant-layout-content {
		margin: '24px 16px';
		padding: '24px';
		background: '#fff';
		min-height: '280px';
	}
}
</style>
