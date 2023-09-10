<template>
	<div class="details-box">
		<a-modal v-model:visible="isVisible" title="详情" centered>
			<template #footer>
				<a-button key="back" @click="handleClose">关闭</a-button>
			</template>

			<a-form :model="data" name="basic">
				<a-row :gutter="12">
					<a-col :span="12">
						<a-form-item label="菜单名称">
							<span>{{ data.menu_name }}</span>
						</a-form-item>
					</a-col>
					<a-col :span="12">
						<a-form-item label="菜单路由">
							<span>{{ data.url }}</span>
						</a-form-item>
					</a-col>
				</a-row>

				<a-row :gutter="12">
					<a-col :span="12">
						<a-form-item label="菜单标识">
							<span>{{ data.perms }}</span>
						</a-form-item>
					</a-col>
					<a-col :span="12">
						<a-form-item label="菜单类型">
							<a-tag :color="getColumnType(data.menu_type).color">
								{{ getColumnType(data.menu_type).text }}
							</a-tag>
						</a-form-item>
					</a-col>
				</a-row>

				<a-row :gutter="12">
					<a-col :span="12">
						<a-form-item label="菜单状态">
							<a-tag :color="data.visible === 0 ? 'green' : 'volcano'">
								{{ data.visible == 0 ? '显示' : '隐藏' }}
							</a-tag>
						</a-form-item>
					</a-col>
					<a-col :span="12">
						<a-form-item label="菜单排序">
							<span>{{ data.order_num }}</span>
						</a-form-item>
					</a-col>
				</a-row>
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
</script>
