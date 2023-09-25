<template>
	<a-table
		rowKey="roleId"
		:columns="columns"
		bordered
		:pagination="{ pageSize: 20 }"
		:data-source="roles"
		:scroll="{ y: true }"
	>
		<template v-slot:headerCell="{ column }">
			<span style="font-weight: bolder;">{{ column.title }}</span>
		</template>
		<template v-slot:bodyCell="{ record, text, column }">
			<template v-if="column.dataIndex == 'dataScope'">
				<a-tag :color="text === '1' ? 'volcano' : 'green'">
					{{ getAuthScope(text).text }}
				</a-tag>
			</template>
			<template v-if="column.dataIndex == 'status'">
				<a-tag :color="text === '0' ? 'volcano' : 'green'">
					{{ text == '0' ? '正常' : '停用' }}
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
					@confirm="del(record.roleId)"
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
import { SysRole } from '@/types/models'
const roles = ref<SysRole[]>([])
const columns = reactive([
	{
		title: '角色名称',
		align: 'center',
		dataIndex: 'roleName',
		width: '120px'
	},
	{
		title: '排序',
		align: 'center',
		dataIndex: 'roleSort',
		width: '70px'
	},
	{
		title: '权限类型',
		align: 'center',
		dataIndex: 'dataScope',
		width: '120px'
	},
	{ title: '角色状态', align: 'center', dataIndex: 'status', width: '120px' },
	{ title: '备注', align: 'center', dataIndex: 'remark', width: '100px' },
	{
		title: '创建时间',
		align: 'center',
		dataIndex: 'createdAt',
		width: '120px'
	},
	{
		title: '创建人',
		align: 'center',
		dataIndex: 'createdBy',
		width: '120px'
	},
	{
		title: '操作',
		align: 'center',
		dataIndex: 'operation',
		width: '130px',
		fixed: 'right'
	}
])

onBeforeMount(() => {
	loadUserList({})
})

/**
 * 加载角色表格数据
 */
const loadUserList = (params: object) => {
	console.log(params)
	api.sysRole
		.querySysRoleList({
			...params
		})
		.then(({ code, data }) => {
			if (code == 200) {
				console.log(data)
				roles.value = data
			}
		})
}

/**
 * 定义编辑、详情事件
 */
const emit = defineEmits(['editEvent', 'detailsEvent'])
const edit = (row: any) => {
	emit('editEvent', row)
}

/**
 * 根据id删除角色
 * @param id
 */
const del = async (id: number) => {
	const { data, message: msg } = await api.sysRole.deleteSysRoleById(id)
	if (data) {
		message.success(msg)
		loadUserList({})
	} else {
		message.error(msg)
	}
}

/**
 * 获取权限描述
 * @param scope
 */
const getAuthScope = (scope: string) => {
	if (scope == '1') {
		return {
			text: '所有权限',
			color: 'volcano'
		}
	} else if (scope == '2') {
		return {
			text: '自定义权限',
			color: 'green'
		}
	} else {
		return {
			text: '部门权限',
			color: 'blue'
		}
	}
}

defineExpose({
	refresh: loadUserList
})
</script>

<style>
.table-opt {
	margin: 0 5px;
}
</style>
