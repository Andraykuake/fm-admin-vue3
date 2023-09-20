<template>
	<div class="main-box-head">
		<a-form :model="params" name="basic" layout="inline">
			<a-form-item label="菜单名称">
				<a-input
					v-model:value="params.menuName"
					style="width: 130px"
					autocomplete="off"
					placeholder="请输入菜单名称"
					@keyup.enter="search"
				/>
			</a-form-item>
			<a-form-item label="菜单路由">
				<a-input
					style="width: 130px"
					v-model:value="params.url"
					autocomplete="off"
					placeholder="请输入菜单路由"
					@keyup.enter="search"
				/>
			</a-form-item>
			<a-form-item label="菜单状态">
				<a-select
					v-model:value="params.visible"
					show-search
					placeholder="选择状态"
					style="width: 80px"
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
			<a-button type="primary" @click="addMenu">
				<template #icon><plus-outlined /></template>
				添加
			</a-button>
		</div>
	</div>
</template>
<script setup lang="ts">
import { ref } from 'vue'

const params = ref({
	menuName: '',
	url: '',
	visible: ''
})

const options = ref([
	{
		label: '全部',
		value: ''
	},
	{
		label: '显示',
		value: 0
	},
	{
		label: '隐藏',
		value: 1
	}
])

const reset = () => {
	params.value.menuName = ''
	params.value.url = ''
	params.value.visible = ''
}

const emit = defineEmits(['addEvent', 'searchEvent'])
const addMenu = () => {
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
