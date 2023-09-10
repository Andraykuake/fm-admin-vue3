<template>
	<div class="main-box">
		<Header @addEvent="addEvent" />
		<Table ref="tableRef" @detailsEvent="detailsEvent" @editEvent="editEvent" />
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
import Header from './components/head.vue'
import Table from './components/table.vue'
import Edit from './components/edit.vue'
import Details from './components/details.vue'
import { SysMenu } from '@/types/models'

/**
 * 菜单详情
 */
const detailsVisible = ref(false)
const detailsData = ref({})
const detailsEvent = (data: SysMenu) => {
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
const addEvent = () => {
	title.value = '添加菜单'
	editVisible.value = true
	editData.value = {
		create_by: '',
		create_time: '',
		icon: '',
		is_refresh: '',
		menu_name: '',
		menu_type: 'M',
		order_num: 0,
		parent_id: 0,
		perms: '',
		remark: '',
		target: '',
		url: '',
		visible: '0'
	}
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
