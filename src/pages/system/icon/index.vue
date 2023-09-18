<template>
	<div class="icon-box">
		<div class="icon-topic" v-for="(iconTopic, index) in icons" :key="index">
			<h2>{{ iconTopic.title }}</h2>
			<ul class="icon-list">
				<li
					v-for="iconKey in Object.keys(iconTopic.icons).slice(
						0,
						Object.keys(iconTopic.icons).length - 4
					)"
					class="icon-item"
					:key="iconKey"
					@click="copyCode(iconKey)"
				>
					<component :is="iconKey" :style="{ fontSize: '26px' }" />
					<span>{{ iconKey }}</span>
				</li>
			</ul>
		</div>
	</div>
</template>

<script setup lang="ts">
import { message } from 'ant-design-vue'
import * as AIcons from '@ant-design/icons-vue'
import { reactive } from 'vue'
console.log(AIcons)
const icons = reactive([
	{
		title: 'ant-design/icons-vue',
		icons: AIcons
	}
])

const copyCode = (key: string) => {
	// 获取要复制的文本
	var textToCopy = key
	var inputElement = document.createElement('input')
	inputElement.value = textToCopy
	document.body.appendChild(inputElement)
	inputElement.select()
	// 使用document.execCommand('copy')方法复制文本到剪贴板
	document.execCommand('copy')
	// 删除<input>元素
	document.body.removeChild(inputElement)
	message.success(textToCopy)
}
</script>

<style lang="scss">
.icon-box {
	.icon-topic {
		.icon-list {
			display: flex;
			flex-wrap: wrap;
			gap: 18px;
			.icon-item {
				display: flex;
				flex: 1;
				align-items: center;
				flex-flow: column;
				padding: 10px 15px;
				background: #ebeaea;
				min-width: 200px;
				border-radius: 2px;
				gap: 15px;
				cursor: pointer;
				&:hover {
					box-shadow: 1px 1px 7px 3px #d3d3d3;
				}
			}
		}
	}
}
</style>
