<template>
	<a-table
		rowKey="menuId"
		:columns="columns"
		bordered
		:pagination="{ pageSize: 20 }"
		:data-source="users"
		:scroll="{ y: true }"
	>
		<template v-slot:headerCell="{ column }">
			<span style="font-weight: bolder;">{{ column.title }}</span>
		</template>
		<template v-slot:bodyCell="{ record, text, column }">
			<template v-if="column.dataIndex == 'userType'">
				<a-tag :color="text === '00' ? 'volcano' : 'green'">
					{{ text == '00' ? '系统用户' : '注册用户' }}
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
					@confirm="del(record.userId)"
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
import { SysUser } from '@/types/models'
const users = ref<SysUser[]>([])
const columns = reactive([
	{
		title: '用户名称',
		align: 'center',
		dataIndex: 'userName',
		width: '120px'
	},
	{
		title: '登录名称',
		align: 'center',
		dataIndex: 'loginName',
		width: '120px'
	},
	{ title: '登录密码', align: 'center', dataIndex: 'password', width: '120px' },
	{ title: '邮箱', align: 'center', dataIndex: 'email', width: '120px' },
	{
		title: '手机号',
		align: 'center',
		dataIndex: 'phoneNumber',
		width: '100px'
	},
	{ title: '用户类型', align: 'center', dataIndex: 'userType', width: '100px' },
	{ title: '用户状态', align: 'center', dataIndex: 'status', width: '100px' },
	{ title: '备注', align: 'center', dataIndex: 'remark', width: '100px' },
	{
		title: '最后登录IP',
		align: 'center',
		dataIndex: 'lastLoginIp',
		width: '120px'
	},
	{
		title: '最后登录时间',
		align: 'center',
		dataIndex: 'lastLoginDate',
		width: '100px'
	},
	{
		title: '操作',
		align: 'center',
		dataIndex: 'operation',
		width: '210px',
		fixed: 'right'
	}
])

onBeforeMount(() => {
	loadUserList({})
})

/**
 * 加载用户表格数据
 */
const loadUserList = (params: object) => {
	console.log(params)
	api.sysUser
		.querySysUserList({
			...params
		})
		.then(({ code, data }) => {
			if (code == 200) {
				console.log(data)
				users.value = data
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
const details = (row: any) => {
	emit('detailsEvent', row)
}

/**
 * 根据id删除用户
 * @param id
 */
const del = async (id: number) => {
	const { data, message: msg } = await api.sysUser.deleteSysUserById(id)
	if (data) {
		message.success(msg)
		loadUserList({})
	} else {
		message.error(msg)
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
