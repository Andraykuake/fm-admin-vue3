<template>
	<a-table
		rowKey="menu_id"
		:columns="columns"
		bordered
		:data-source="permissions"
		:scroll="{ y: 'calc(100vh - 340px)' }"
	>
		<template v-slot:headerCell="{ column }">
			<span style="font-weight: bolder;">{{ column.title }}</span>
		</template>
		<template v-slot:bodyCell="{ record, text, column }">
			<template v-if="column.dataIndex == 'menu_type'">
				<a-tag :color="getColumnType(text).color">
					{{ getColumnType(text).text }}
				</a-tag>
			</template>
			<template v-if="column.dataIndex == 'visible'">
				<a-tag :color="text === 0 ? 'green' : 'volcano'">
					{{ text == 0 ? '显示' : '隐藏' }}
				</a-tag>
			</template>
			<template v-if="column.dataIndex == 'operation'">
				<a-button
					class="table-opt"
					type="primary"
					size="small"
					@click="details(record)"
					ghost
					>详情</a-button
				>
				<a-button
					class="table-opt"
					type="primary"
					size="small"
					@click="edit(record)"
					>编辑</a-button
				>
				<a-button class="table-opt" type="primary" size="small" danger
					>删除</a-button
				>
			</template>
		</template>
	</a-table>
</template>

<script setup lang="ts">
import api from '@/api/index'
import { ref, reactive, onBeforeMount } from 'vue'
import { SysMenu } from '@/types/models'
const permissions = ref<SysMenu[]>([])
const columns = reactive([
	{ title: '权限名称', align: 'center', dataIndex: 'menu_name' },
	{ title: '权限路由', align: 'center', dataIndex: 'url', width: '30' },
	{ title: '权限标识', align: 'center', dataIndex: 'perms', width: '20%' },
	{ title: '权限类型', align: 'center', dataIndex: 'menu_type', width: '10%' },
	{ title: '权限状态', align: 'center', dataIndex: 'visible', width: '10%' },
	{ title: '操作', align: 'center', dataIndex: 'operation', width: '209px' }
])

onBeforeMount(() => {
	loadPermissionList()
})

/**
 * 加载权限表格数据
 */
const loadPermissionList = () => {
	api.sysPermission
		.querySysPermissionList({
			params: { type: 3 }
		})
		.then(({ code, data }) => {
			if (code == 200) {
				console.log(data)
				permissions.value = data
			}
		})
}

/**
 * 获取权限类型列所对应的，颜色和文本
 * @param value
 */
const getColumnType = (value: Number) => {
	const column = {
		color: 'volcano',
		text: '按钮'
	}
	if (value == 0) {
		column.color = 'green'
		column.text = '目录'
	} else if (value == 1) {
		column.color = 'geekblue'
		column.text = '菜单'
	}
	return column
}

/**
 * 定义编辑、详情事件
 */
const emit = defineEmits(['editEvent', 'detailsEvent'])
const edit = (row: any) => {
	emit('editEvent', row)
}
const details = (row: any) => {
	emit('detailsEvent', row)
}
</script>

<style>
.table-opt {
	margin: 0 5px;
}
</style>
