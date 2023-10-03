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
				<a-form-item label="角色名称" :rules="[{ required: true }]">
					<a-input
						v-model:value="data.roleName"
						autocomplete="off"
						placeholder="请输入角色名称"
					/>
				</a-form-item>

				<a-form-item label="权限字符" :rules="[{ required: true }]">
					<a-input
						v-model:value="data.roleKey"
						autocomplete="off"
						placeholder="请输入权限字符"
					/>
				</a-form-item>

				<a-form-item label="角色排序" :rules="[{ required: true }]">
					<a-input-number
						v-model:value="data.roleSort"
						:min="0"
						autocomplete="off"
						placeholder="请输入排序"
					/>
				</a-form-item>

				<a-form-item label="角色状态" :rules="[{ required: true }]">
					<a-radio-group v-model:value="data.status">
						<a-radio value="0">正常状态</a-radio>
						<a-radio value="1">停用状态</a-radio>
					</a-radio-group>
				</a-form-item>

				<a-form-item label="角色权限">
					<!-- 复选框操作项 -->
					<a-checkbox-group
						v-model:value="roleAuthOpt"
						:options="roleAuthOptOptions"
					/>
					<!-- 权限列表 -->
					<div class="menu-tree-box">
						<a-tree
							checkable
							v-model:checkedKeys="checkedMenuIds"
							v-model:expandedKeys="expandedMenuIds"
							:checkStrictly="checkStrictly"
							:tree-data="menuList"
							:fieldNames="{
								children: 'children',
								title: 'menuName',
								key: 'menuId'
							}"
						>
						</a-tree>
					</div>
				</a-form-item>

				<a-form-item label="备注信息">
					<a-textarea
						v-model:value="data.remark"
						placeholder="请输入备注信息"
						:auto-size="{ minRows: 2, maxRows: 5 }"
					/>
				</a-form-item>
			</a-form>
		</a-modal>
	</div>
</template>
<script setup lang="ts">
import { message } from 'ant-design-vue'
import { computed, onMounted, ref, watch } from 'vue'
import { SysMenu, SysRole } from '@/types/models'
import api from '@/api'
const props = defineProps({
	title: {
		type: String,
		default: ''
	},
	data: {
		type: Object as PropType<SysRole>,
		default: () => {}
	},
	visible: {
		type: Boolean,
		default: false
	}
})

onMounted(() => {
	loadMenuList({ type: 3 })
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
	saveRole()
}

/**
 * 保存角色数据，添加或修改
 */
const saveRole = () => {
	const param = { menuIds: checkedMenuIds.value, ...props.data }
	const http =
		props.title == '添加角色'
			? api.sysRole.addSysRole
			: api.sysRole.updateSysRole
	http(param).then((res) => {
		if (res.data == true) {
			message.success(res.message)
			emit('saveCallback')
		}
	})
}

/**
 * 角色权限：复选框操作项
 */
const roleAuthOpt = ref(['link'])
const roleAuthOptOptions = [
	{ label: '展开/折叠', value: 'open' },
	{ label: '是否全选', value: 'all' },
	{ label: '父子联动', value: 'link' }
]
// 菜单权限列表
const menuList = ref<Array<SysMenu>>([])
/**
 * 加载菜单表格数据
 */
const loadMenuList = (params: object) => {
	api.sysMenu
		.querySysMenuList({
			...params
		})
		.then(({ code, data }) => {
			if (code == 200) {
				menuList.value = data
			}
		})
}

// 勾选的节点;展开的节点;父子节点关联
const checkedMenuIds = ref<Array<number>>([])
const expandedMenuIds = ref<Array<number>>([])
const checkStrictly = ref(false)

/**
 * 递归获取所有的 menuId
 * @param menus
 */
const getAllMenuKeys = (menus: Array<SysMenu>) => {
	let keys: number[] = []
	for (const menu of menus) {
		keys.push(menu.menuId as number)
		if (menu.children && menu.children.length > 0) {
			keys = keys.concat(getAllMenuKeys(menu.children))
		}
	}
	return keys
}

/**
 * 监听复选框操作，确认如何执行
 */
watch(
	() => roleAuthOpt.value,
	(v: string[]) => {
		// 1.节点是否全部展开
		expandedMenuIds.value = v.includes('open')
			? getAllMenuKeys(menuList.value)
			: (checkedMenuIds.value = [])

		// 2.节点是否全部勾选
		checkedMenuIds.value = v.includes('all')
			? getAllMenuKeys(menuList.value)
			: (checkedMenuIds.value = [])

		// 3.父子节点选中是否关联
		checkStrictly.value = !v.includes('link')
	},
	{
		deep: true
	}
)

/**
 * 监听 SysMenus 变化, 每次显示编辑面板时
 * 即更新 菜单权限选中项, SysMenus 为当前角色下拥有的菜单权限
 */
watch(
	() => props.data?.SysMenus,
	(sysMenus) => {
		checkedMenuIds.value = []
		if (sysMenus) {
			sysMenus.forEach((menu) => {
				checkedMenuIds.value.push(menu.menuId as number)
			})
		}
	},
	{
		deep: true
	}
)
</script>

<style lang="scss" scoped>
.menu-tree-box {
	border: 1px solid #d9d9d9;
	padding: 11px;
	margin-top: 10px;
	height: 200px;
	overflow: auto;
}
</style>
