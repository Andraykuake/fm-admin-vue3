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
				<a-form-item label="菜单父级" :rules="[{ required: true }]">
					<a-tree-select
						v-model:value="data.parentId"
						:treeData="menuList"
						placeholder="请选择"
						allow-clear
						:treeDefaultExpandAll="false"
						:field-names="{
							children: 'children',
							value: 'menuId',
							label: 'menuName'
						}"
						show-search
						tree-node-filter-prop="menuName"
					>
						<template #title="{ menuName, children }">
							<span>
								{{ menuName }}
								<span v-if="children && children.length"
									>({{ children.length }})</span
								>
							</span>
						</template>
					</a-tree-select>
				</a-form-item>

				<a-form-item label="菜单名称" :rules="[{ required: true }]">
					<a-input
						v-model:value="data.menuName"
						autocomplete="off"
						placeholder="请输入菜单名称"
					/>
				</a-form-item>

				<a-form-item label="菜单图标">
					<fm-select-icon v-model:value="data.icon" allowClear></fm-select-icon>
				</a-form-item>

				<a-form-item label="菜单路由">
					<a-input
						v-model:value="data.url"
						autocomplete="off"
						placeholder="请输入菜单路由"
					/>
				</a-form-item>

				<a-form-item label="菜单标识">
					<a-input
						v-model:value="data.perms"
						autocomplete="off"
						placeholder="请输入菜单标识"
					/>
				</a-form-item>

				<a-form-item label="菜单类型" :rules="[{ required: true }]">
					<a-radio-group v-model:value="data.menuType">
						<a-radio value="M">目录</a-radio>
						<a-radio value="C">菜单</a-radio>
						<a-radio value="F">按钮</a-radio>
					</a-radio-group>
				</a-form-item>

				<a-form-item label="显示状态">
					<a-radio-group v-model:value="data.visible">
						<a-radio value="0">显示</a-radio>
						<a-radio value="1">隐藏</a-radio>
					</a-radio-group>
				</a-form-item>

				<a-form-item label="显示排序">
					<a-input-number
						id="inputNumber"
						v-model:value="data.orderNum"
						placeholder="请输入排序值"
					/>
				</a-form-item>
			</a-form>
		</a-modal>
	</div>
</template>
<script setup lang="ts">
import { message } from 'ant-design-vue'
import { ref, computed, onMounted, watch } from 'vue'
import FmSelectIcon from '@/components/fm-select-icon/index.vue'
import { SysMenu } from '@/types/models'
import api from '@/api'
const props = defineProps({	
	title: {
		type: String,
		default: ''
	},
	data: {
		type: Object as PropType<SysMenu>,
		default: () => {}
	},
	visible: {
		type: Boolean,
		default: false
	}
})

onMounted(() => {
	loadMenuList()
})

/**
 * 添加或修改时，指定父级类目
 */
const menuList = ref([
	{
		menuId: 0,
		menuName: '主类目',
		children: []
	}
])

/**
 * 加载菜单表格数据
 */
const loadMenuList = () => {
	api.sysMenu.querySysMenuList({ type: 3 }).then(({ code, data }) => {
		if (code == 200) {
			menuList.value[0].children = data
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
	saveMenu()
}

/**
 * 保存菜单数据，添加或修改
 */
const saveMenu = () => {
	const http =
		props.title == '添加菜单'
			? api.sysMenu.addSysMenu
			: api.sysMenu.updateSysMenu
	http(props.data).then((res) => {
		if (res.data == true) {
			message.success(res.message)
			location.reload()
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
