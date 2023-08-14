<template>
	<div class="details-box">
		<a-modal v-model:visible="isVisible" title="详情" centered>
			<template #footer>
				<a-button key="back" @click="handleClose">关闭</a-button>
			</template>

			<a-form :model="data" name="basic" :label-col="{ span: 5 }" :wrapper-col="{ span: 19 }" autocomplete="off">
				<a-form-item label="权限名称">
					<span>{{ data.name }}</span>
				</a-form-item>
				<a-form-item label="权限路由">
					<span>{{ data.path }}</span>
				</a-form-item>
				<a-form-item label="权限标识">
					<span>{{ data.perms }}</span>
				</a-form-item>
				<a-form-item label="权限类型">
					<a-tag :color="getColumnType(data.type).color">
						{{ getColumnType(data.type).text }}
					</a-tag>
				</a-form-item>
				<a-form-item label="权限状态">
					<a-tag :color="data.status === 1 ? 'green' : 'volcano'">
						{{ data.status == 1 ? '生效' : '删除' }}
					</a-tag>
				</a-form-item>
				<a-form-item label="权限排序">
					<span>{{ data.order_num }}</span>
				</a-form-item>
				<a-form-item label="权限级别">
					<span>{{ data.level }}</span>
				</a-form-item>
				<a-form-item label="创建时间">
					<span>{{ data.create_time }}</span>
				</a-form-item>
				<a-form-item label="权限级别">
					<span>{{ data.update_time }}</span>
				</a-form-item>
			</a-form>
		</a-modal>
	</div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
	data: {
		type: Object,
		default: () => {}
	},
	visible: {
		type: Boolean,
		default: false
	}
})

const emit = defineEmits(['update:visible'])

const isVisible = computed({
	get: () => {
		return props.visible
	},
	set: (value) => {
		emit('update:visible', value)
	}
})

const handleClose = () => {
	isVisible.value = false
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
</script>
