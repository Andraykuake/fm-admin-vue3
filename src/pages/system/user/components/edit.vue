<template>
	<div class="edit-box">
		<a-modal
			:visible="isVisible"
			:title="title"
			ok-text="保存"
			cancel-text="取消"
			@ok="handleOk"
			@cancel="handleClose"
			centered
		>
			<a-form :model="data" name="basic" v-bind="layout">
				<a-form-item label="用户名称" :rules="[{ required: true }]">
					<a-input
						v-model:value="data.userName"
						autocomplete="off"
						placeholder="请输入用户名称"
					/>
				</a-form-item>

				<a-form-item label="用户类型" :rules="[{ required: true }]">
					<a-radio-group v-model:value="data.userType">
						<a-radio value="00">系统用户</a-radio>
						<a-radio value="01">注册用户</a-radio>
					</a-radio-group>
				</a-form-item>

				<a-form-item label="登录名称" :rules="[{ required: true }]">
					<a-input
						v-model:value="data.loginName"
						autocomplete="off"
						placeholder="请输入登录名称"
					/>
				</a-form-item>

				<a-form-item label="登录密码" :rules="[{ required: true }]">
					<a-input
						v-model:value="data.password"
						autocomplete="off"
						placeholder="请输入登录密码"
					/>
				</a-form-item>

				<a-form-item label="用户邮箱">
					<a-input
						v-model:value="data.email"
						autocomplete="off"
						placeholder="请输入邮箱"
					/>
				</a-form-item>

				<a-form-item label="手机号码">
					<a-input
						v-model:value="data.phoneNumber"
						autocomplete="off"
						placeholder="请输入手机号码"
					/>
				</a-form-item>

				<a-form-item label="用户状态" :rules="[{ required: true }]">
					<a-radio-group v-model:value="data.status">
						<a-radio value="0">正常状态</a-radio>
						<a-radio value="1">停用状态</a-radio>
					</a-radio-group>
				</a-form-item>

				<a-form-item label="备注信息">
					<a-textarea
						v-model:value="data.remark"
						placeholder="请输入排序值"
						:auto-size="{ minRows: 2, maxRows: 5 }"
					/>
				</a-form-item>
			</a-form>
		</a-modal>
	</div>
</template>
<script setup lang="ts">
import { message } from 'ant-design-vue'
import { computed, watch } from 'vue'
import { SysUser } from '@/types/models'
import api from '@/api'
const props = defineProps({
	title: {
		type: String,
		default: ''
	},
	data: {
		type: Object as PropType<SysUser>,
		default: () => {}
	},
	visible: {
		type: Boolean,
		default: false
	}
})

/**
 * 表单格式
 */
const layout = {
	labelCol: { span: 5 },
	wrapperCol: { span: 19 }
}

/**
 * 当前组件是否可见，利用计算属性实现响应式
 */
const emit = defineEmits(['update:visible', 'saveCallback'])
const isVisible = computed({
	get: () => {
		return props.visible
	},
	set: (value) => {
		emit('update:visible', value)
	}
})

/**
 * 取消操作
 */
const handleClose = () => {
	isVisible.value = false
}

/**
 * 保存操作
 */
const handleOk = () => {
	handleClose()
	saveUser()
}

/**
 * 保存用户数据，添加或修改
 */
const saveUser = () => {
	const param = { ...props.data }
	const http =
		props.title == '添加用户'
			? api.sysUser.addSysUser
			: api.sysUser.updateSysUser
	console.log(param)
	http(props.data).then((res) => {
		if (res.data == true) {
			message.success(res.message)
			emit('saveCallback')
		}
	})
}

watch(
	() => props.data,
	(v) => {
		console.log(v)
	},
	{
		deep: true
	}
)
</script>
