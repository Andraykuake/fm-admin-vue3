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
				<a-form-item label="分类父级" :rules="[{ required: true }]">
					<a-tree-select
						v-model:value="data.pid"
						:treeData="categoryList"
						placeholder="请选择"
						allow-clear
						:treeDefaultExpandAll="false"
						:field-names="{
							children: 'children',
							value: 'categoryId',
							label: 'name',
							disabled: 'disabled'
						}"
						show-search
						tree-node-filter-prop="name"
					>
						<template #title="{ name, categoryId, children }">
							<span :class="{ 'disabled-node': categoryId == data.categoryId }">
								{{ name }}
								<span v-if="children && children.length"
									>({{ children.length }})</span
								>
							</span>
						</template>
					</a-tree-select>
				</a-form-item>

				<a-form-item label="分类名称" :rules="[{ required: true }]">
					<a-input
						v-model:value="data.name"
						autocomplete="off"
						placeholder="请输入分类名称"
					/>
				</a-form-item>

				<a-form-item label="分类图标">
					<fm-select-icon v-model:value="data.icon" allowClear></fm-select-icon>
				</a-form-item>

				<a-form-item label="启用状态">
					<a-radio-group v-model:value="data.status">
						<a-radio :value="1">启用</a-radio>
						<a-radio :value="0">禁用</a-radio>
					</a-radio-group>
				</a-form-item>

				<a-form-item label="显示排序">
					<a-input-number
						id="inputNumber"
						v-model:value="data.sort"
						placeholder="请输入排序值"
					/>
				</a-form-item>

				<a-form-item label="分类描述">
					<a-textarea
						v-model:value="data.description"
						placeholder="请输入分类描述"
						:auto-size="{ minRows: 2, maxRows: 5 }"
					/>
				</a-form-item>
			</a-form>
		</a-modal>
	</div>
</template>
<script setup lang="ts">
import { message } from 'ant-design-vue'
import { ref, computed, watch } from 'vue'
import FmSelectIcon from '@/components/fm-select-icon/index.vue'
import { ArticleCategory } from '@/types/models'
import api from '@/api'
const props = defineProps({
	title: {
		type: String,
		default: ''
	},
	data: {
		type: Object as PropType<ArticleCategory>,
		default: () => {}
	},
	visible: {
		type: Boolean,
		default: false
	}
})

/**
 * 添加或修改时，指定父级类目
 */
const categoryList = ref([
	{
		categoryId: 0,
		name: '主分类',
		children: []
	}
])

/**
 * 加载分类表格数据
 */
const loadCategoryList = () => {
	api.articleCategory.queryArticleCategoryList().then(({ code, data }) => {
		if (code == 200) {
			categoryList.value[0].children = data
		}
	})
}

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
	saveCategory()
}

/**
 * 保存分类数据，添加或修改
 */
const saveCategory = () => {
	const param = { ...props.data }
	param.icon = props.data.icon == undefined ? '' : props.data.icon
	const http =
		props.title == '添加文章分类'
			? api.articleCategory.addArticleCategory
			: api.articleCategory.updateArticleCategory
	http(param).then((res) => {
		if (res.data == true) {
			message.success(res.message)
			emit('saveCallback')
		}
	})
}

watch(
	() => props.data,
	(v) => {
		// 重新加载列表
		loadCategoryList()
		if (v.pid == v.categoryId) {
		}
	},
	{
		deep: true
	}
)
</script>
