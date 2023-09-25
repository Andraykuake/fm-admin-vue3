<template>
	<div class="main-box">
		<Header @addEvent="addEvent" @searchEvent="searchEvent" />
		<Table ref="tableRef" @detailsEvent="detailsEvent" @editEvent="editEvent" />
		<Edit
			v-model:visible="editVisible"
			:data="editData"
			:title="title"
			@saveCallback="saveCallback"
		/>
	</div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import Header from './components/head.vue'
import Table from './components/table.vue'
import Edit from './components/edit.vue'
import { SysRole } from '@/types/models'

/**
 * 角色详情
 */
const detailsVisible = ref(false)
const detailsData = ref({})
const detailsEvent = (data: SysRole) => {
	detailsVisible.value = true
	detailsData.value = { ...data }
}

/**
 * 编辑
 */
const title = ref('')
const editVisible = ref(false)
const editData = ref<SysRole>()
const editEvent = (data: SysRole) => {
	title.value = '编辑角色'
	editVisible.value = true
	editData.value = { ...data }
}

/**
 * 添加
 */
const addEvent = () => {
	title.value = '添加角色'
	editVisible.value = true
	editData.value = {
		delFlag: '',
		roleName: '',
		remark: '',
		status: '0',
		roleKey: '',
		roleSort: 0,
		dataScope: ''
	}
}

/**
 * 搜索角色时的回调函数
 * @param params
 */
const searchEvent = (params: object) => tableRef.value.refresh({ ...params })

/**
 * 保存回调函数，用于保存成功后，刷新角色列表
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
