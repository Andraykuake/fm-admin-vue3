<template>
	<div class="main-box">
		<Table
			ref="tableRef"
			@detailsEvent="detailsEvent"
			@editEvent="editEvent"
			@addEvent="addEvent"
		/>
		<Edit
			v-model:visible="editVisible"
			:data="editData"
			:title="title"
			@saveCallback="saveCallback"
		/>
		<Details v-model:visible="detailsVisible" :data="detailsData" />
	</div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import Table from './components/table.vue'
import Edit from './components/edit.vue'
import Details from './components/details.vue'
import { SysMenu } from '@/types/models'

/**
 * 菜单详情
 */
const detailsVisible = ref(false)
const detailsData = ref({})
const detailsEvent = (data: Object) => {
	detailsVisible.value = true
	detailsData.value = { ...data }
}

/**
 * 编辑
 */
const title = ref('')
const editVisible = ref(false)
const editData = ref<SysMenu>()
const editEvent = (data: SysMenu) => {
	title.value = '编辑菜单'
	editVisible.value = true
	editData.value = { ...data }
}

/**
 * 添加
 */
const addEvent = (data: SysMenu) => {
	title.value = '添加菜单'
	editVisible.value = true
	editData.value = data
}

/**
 * 保存回调函数，用于保存成功后，刷新菜单列表
 */
const tableRef = ref()
const saveCallback = () => tableRef.value.refresh()
</script>

<style lang="scss" scoped>
.main-box {
	margin-top: 16px;
	height: calc(100% - 40px);
	// overflow: auto;
}
</style>
