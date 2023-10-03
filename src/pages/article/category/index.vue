<template>
	<div class="main-box">
		<Header @addEvent="addEvent" @searchEvent="searchEvent" />
		<Table ref="tableRef" @editEvent="editEvent" />
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
import { ArticleCategory } from '@/types/models'

/**
 * 编辑
 */
const title = ref('')
const editVisible = ref(false)
const editData = ref<ArticleCategory>()
const editEvent = (data: ArticleCategory) => {
	title.value = '编辑文章分类'
	editVisible.value = true
	editData.value = { ...data }
}

/**
 * 添加
 */
const addEvent = () => {
	title.value = '添加文章分类'
	editVisible.value = true
	editData.value = {
		createdBy: '',
		createdAt: '',
		icon: '',
		pid: 0,
		sort: '',
		name: '',
		status: 0,
		description: ''
	}
}

/**
 * 搜索文章分类时的回调函数
 * @param params
 */
const searchEvent = (params: object) => tableRef.value.refresh(params)

/**
 * 保存回调函数，用于保存成功后，刷新文章分类列表
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
