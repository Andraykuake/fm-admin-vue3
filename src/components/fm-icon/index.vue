<script setup lang="ts">
import { h, watch } from 'vue'
import * as $icon from '@ant-design/icons-vue'
/*
 * 自动引入antd icon图标
 **/
defineOptions({
	name: 'FmIcon'
})
const props = defineProps({
	icon: {
		type: String,
		default: () => ''
	},
	size: {
		type: Number
	}
})

watch(
	() => props.icon,
	(newV) => {
		/*
		 * 判断是icon还是antd的图标
		 * */
		if (props.icon.indexOf('icon-') != -1) {
			h('i', {
				class: 'iconfont ' + props.icon,
				style: { fontSize: props.size }
			})
		} else {
			h($icon[props.icon], {
				style: { fontSize: props.size }
			})
		}
	}
)
</script>
