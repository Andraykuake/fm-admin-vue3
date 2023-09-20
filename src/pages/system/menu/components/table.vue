<template>
	<a-table
		rowKey="menuId"
		:columns="columns"
		bordered
		:pagination="{ pageSize: 50 }"
		:data-source="permissions"
		:scroll="{ y: true }"
	>
		<template v-slot:headerCell="{ column }">
			<span style="font-weight: bolder;">{{ column.title }}</span>
		</template>
		<template v-slot:bodyCell="{ record, text, column }">
			<template v-if="column.dataIndex == 'icon' && text != '#'">
				<component
					:is="text"
					style="
						 {
							font-size: 26px;
						}
					"
				/>
			</template>
			<template v-if="column.dataIndex == 'menuType'">
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
				<a-popconfirm
					title="确认删除吗？"
					ok-text="确认"
					cancel-text="取消"
					@confirm="del(record.menu_id)"
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
import { SysMenu } from '@/types/models'
const permissions = ref<SysMenu[]>([])
const columns = reactive([
	{
		title: '菜单名称',
		align: 'center',
		dataIndex: 'menuName',
		width: '120px'
	},
	{ title: '图标', align: 'center', dataIndex: 'icon', width: '60px' },
	{ title: '排序', align: 'center', dataIndex: 'orderNum', width: '60px' },
	{ title: '路由', align: 'center', dataIndex: 'url', width: '120px' },
	{ title: '标识', align: 'center', dataIndex: 'perms', width: '120px' },
	{
		title: '类型',
		align: 'center',
		dataIndex: 'menuType',
		width: '60px'
	},
	{ title: '状态', align: 'center', dataIndex: 'visible', width: '60px' },
	{
		title: '操作',
		align: 'center',
		dataIndex: 'operation',
		width: '209px',
		fixed: 'right'
	}
])

onBeforeMount(() => {
	loadMenuList({ type: 3 })
})

/**
 * 加载菜单表格数据
 */
const loadMenuList = (params: object) => {
	console.log(params)
	api.sysMenu
		.querySysMenuList({
			...params
		})
		.then(({ code, data }) => {
			if (code == 200) {
				console.log(data)
				permissions.value = data
			}
		})
}

/**
 * 获取菜单类型列所对应的，颜色和文本
 * @param value
 */
const getColumnType = (value: String) => {
	const column = {
		color: 'volcano',
		text: '按钮'
	}
	if (value == 'M') {
		column.color = 'green'
		column.text = '目录'
	} else if (value == 'C') {
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

/**
 * 根据id删除菜单
 * @param id
 */
const del = async (id: number) => {
	const { data, message: msg } = await api.sysMenu.deleteSysMenuById(id)
	if (data) {
		message.success(msg)
		// loadMenuList()
		location.reload()
	} else {
		message.error(msg)
	}
}

defineExpose({
	refresh: loadMenuList
})
</script>

<style>
.table-opt {
	margin: 0 5px;
}
</style>
