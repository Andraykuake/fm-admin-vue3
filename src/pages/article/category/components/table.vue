<template>
	<a-table
		rowKey="categoryId"
		:columns="columns"
		bordered
		:pagination="false"
		:data-source="articleCategorys"
		:scroll="{ y: true }"
	>
		<template v-slot:headerCell="{ column }">
			<span style="font-weight: bolder;">{{ column.title }}</span>
		</template>
		<template v-slot:bodyCell="{ record, text, column }">
			<template v-if="column.dataIndex == 'icon' && text != ''">
				<component
					:is="text"
					style="
						 {
							font-size: 26px;
						}
					"
				/>
			</template>
			<template v-if="column.dataIndex == 'status'">
				<a-tag :color="text === 1 ? 'green' : 'volcano'">
					{{ text == 1 ? '启用' : '禁用' }}
				</a-tag>
			</template>
			<template v-if="column.dataIndex == 'operation'">
				<a-button
					class="table-opt"
					type="primary"
					size="small"
					@click="edit(record)"
					>编辑</a-button
				>
				<a-popconfirm
					title="确认删除吗？"
					ok-text="确认"
					cancel-text="取消"
					@confirm="del(record.categoryId)"
				>
					<template #icon
						><question-circle-outlined style="color: red;"
					/></template>
					<a-button class="table-opt" type="primary" size="small" danger
						>删除</a-button
					>
				</a-popconfirm>
			</template>
		</template>
	</a-table>
</template>

<script setup lang="ts">
import api from '@/api/index'
import { message } from 'ant-design-vue'
import { ref, reactive, onBeforeMount } from 'vue'
import { ArticleCategory } from '@/types/models'
const articleCategorys = ref<ArticleCategory[]>([])
const columns = reactive([
	{
		title: '分类名称',
		align: 'center',
		dataIndex: 'name',
		width: '120px'
	},
	{ title: '图标', align: 'center', dataIndex: 'icon', width: '100px' },
	{ title: '描述', align: 'left', dataIndex: 'description', width: '200px' },
	{ title: '排序', align: 'center', dataIndex: 'sort', width: '100px' },
	{ title: '状态', align: 'center', dataIndex: 'status', width: '100px' },
	{
		title: '创建时间',
		align: 'center',
		dataIndex: 'createdAt',
		width: '150px'
	},
	{
		title: '更新时间',
		align: 'center',
		dataIndex: 'updatedAt',
		width: '150px'
	},
	{
		title: '操作',
		align: 'center',
		dataIndex: 'operation',
		width: '140px',
		fixed: 'right'
	}
])

onBeforeMount(() => {
	loadArticleCategoryList()
})

/**
 * 加载文章分类表格数据
 */
const loadArticleCategoryList = (params: object = {}) => {
	console.log(params)
	api.articleCategory
		.queryArticleCategoryList({
			...params
		})
		.then(({ code, data }) => {
			if (code == 200) {
				console.log(data)
				articleCategorys.value = data
			}
		})
}

/**
 * 定义编辑、详情事件
 */
const emit = defineEmits(['editEvent'])
const edit = (row: any) => {
	emit('editEvent', row)
}

/**
 * 根据id删除文章分类
 * @param id
 */
const del = async (id: number) => {
	const {
		data,
		message: msg
	} = await api.articleCategory.deleteArticleCategoryById(id)
	if (data) {
		message.success(msg)
		loadArticleCategoryList()
	} else {
		message.error(msg)
	}
}

defineExpose({
	refresh: loadArticleCategoryList
})
</script>

<style>
.table-opt {
	margin: 0 5px;
}
</style>
