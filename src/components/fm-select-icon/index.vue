<template>
	<div class="icon-select-options">
		<a-select
			v-model:value="modelValue"
			dropdownClassName="fm-select-box"
			:allowClear="allowClear"
			placeholder="请选择图标"
		>
			<!-- 使用 option 插槽自定义选项的样式 -->
			<template v-for="icon in icons" :key="icon">
				<a-select-option :value="icon">
					<div class="fm-select-item">
						<component :is="icon" :style="{ fontSize: '22px' }" />
						<span>&nbsp;&nbsp;&nbsp;&nbsp;{{ icon }}</span>
					</div>
				</a-select-option>
			</template>
		</a-select>
	</div>
</template>

<script setup lang="ts">
import * as AIcons from '@ant-design/icons-vue'
import { computed } from 'vue'
const props = defineProps({
	value: {
		type: String,
		default: ''
	},
	allowClear: {
		type: Boolean,
		default: false
	}
})

/**
 * 当前组件是否可见，利用计算属性实现响应式
 */
const emit = defineEmits(['update:value'])
const modelValue = computed({
	get: () => {
		console.log(props.value)
		return props.value
	},
	set: (value) => {
		emit('update:value', value)
	}
})
const icons = computed(() => {
	const keys = Object.keys(AIcons)
	return keys.slice(0, keys.length - 4)
})
</script>

<style lang="scss">
.icon-select-options {
}
.fm-select-item {
	display: flex;
	align-items: center;
}
</style>
