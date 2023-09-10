<template>
	<div class="main-box-head">
		<a-form :model="param" name="basic" layout="inline">
			<a-form-item label="菜单名称">
				<a-input
					v-model:value="param.menu_name"
					style="width: 130px;"
					autocomplete="off"
					placeholder="请输入菜单名称"
				/>
			</a-form-item>
			<a-form-item label="菜单路由">
				<a-input
					style="width: 130px;"
					v-model:value="param.menu_name"
					autocomplete="off"
					placeholder="请输入菜单路由"
				/>
			</a-form-item>
			<a-form-item label="菜单状态">
				<a-select
					v-model:value="param.status"
					show-search
					placeholder="选择状态"
					style="width: 80px;"
					:options="options"
				></a-select>
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

const param = ref({
	menu_name: '',
	status: ''
})

const options = ref([
	{
		label: '显示',
		value: 0
	},
	{
		label: '隐藏',
		value: 1
	}
])

const emit = defineEmits(['addEvent'])
const addMenu = () => {
	emit('addEvent')
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
