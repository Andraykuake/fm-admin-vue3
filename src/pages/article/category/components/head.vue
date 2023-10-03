<template>
	<div class="main-box-head">
		<a-form
			:model="params"
			name="basic"
			layout="inline"
			v-if="searchFormVisible"
		>
			<a-form-item label="分类名称">
				<a-input
					v-model:value="params.name"
					style="width: 130px;"
					autocomplete="off"
					placeholder="请输入分类名称"
					@keyup.enter="search"
				/>
			</a-form-item>
			<a-form-item label="分类状态">
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
			<div class="left-tool">
				<a-button type="primary" @click="addMenu">
					<template #icon><plus-outlined /></template>
					添加
				</a-button>
			</div>
			<div class="right-tool">
				<!-- 搜索表单显隐控制按钮 -->
				<a-tooltip placement="top">
					<template #title>
						<span>{{
							searchFormVisible ? '隐藏搜索表单' : '显示搜索表单'
						}}</span>
					</template>
					<a-button
						shape="circle"
						@click="searchFormVisible = !searchFormVisible"
					>
						<template #icon><SearchOutlined /></template>
					</a-button>
				</a-tooltip>
			</div>
		</div>
	</div>
</template>
<script setup lang="ts">
import { ref } from 'vue'

const params = ref({
	name: '',
	status: ''
})

const options = ref([
	{
		label: '全部',
		value: ''
	},
	{
		label: '启用',
		value: 1
	},
	{
		label: '禁用',
		value: 0
	}
])

const searchFormVisible = ref(true)

// 搜索表单重置
const reset = () => {
	params.value.name = ''
	params.value.status = ''
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

	.action-box {
		display: flex;
		justify-content: space-between;
	}
}
</style>
