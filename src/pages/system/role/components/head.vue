<template>
	<div class="main-box-head">
		<a-form :model="params" name="basic" layout="inline">
			<a-form-item label="角色名称">
				<a-input
					v-model:value="params.roleName"
					style="width: 130px;"
					autocomplete="off"
					placeholder="请输入角色名称"
					@keyup.enter="search"
				/>
			</a-form-item>
			<a-form-item label="角色状态">
				<a-select
					v-model:value="params.status"
					show-search
					placeholder="选择状态"
					style="width: 80px;"
					:options="options"
				></a-select>
			</a-form-item>
			<a-form-item>
				<a-button type="primary" @click="search">
					<template #icon><SearchOutlined /></template>
					搜索
				</a-button>
			</a-form-item>
			<a-form-item>
				<a-button @click="reset">
					<template #icon><reload-outlined /></template>
					重置
				</a-button>
			</a-form-item>
		</a-form>

		<div class="action-box">
			<a-button type="primary" @click="addRole">
				<template #icon><plus-outlined /></template>
				添加
			</a-button>
		</div>
	</div>
</template>
<script setup lang="ts">
import { ref } from 'vue'

const params = ref({
	roleName: '',
	status: ''
})

const options = ref([
	{
		label: '全部',
		value: ''
	},
	{
		label: '正常',
		value: 0
	},
	{
		label: '停用',
		value: 1
	}
])

const reset = () => {
	params.value.roleName = ''
	params.value.status = ''
	search()
}

const emit = defineEmits(['addEvent', 'searchEvent'])
const addRole = () => {
	emit('addEvent')
}
const search = () => {
	emit('searchEvent', params.value)
}
</script>

<style lang="scss">
.main-box-head {
	margin-bottom: 16px;
	/* display: flex; */
	/* gap: 20px; */
	/* row-gap: 20px; */
	.ant-form-inline .ant-form-item {
		margin-bottom: 16px;
	}
}
</style>
