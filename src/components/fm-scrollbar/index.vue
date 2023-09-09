<template>
	<div class="fm-scrollable-container">
		<div class="content">
			<slot></slot>
		</div>
	</div>
</template>
<script setup lang="ts"></script>

<style lang="scss" scoped>
.fm-scrollable-container {
	overflow: auto;
	max-height: 300px; /* 设置最大高度以启用垂直滚动条 */
	&::-webkit-scrollbar {
		width: 8px;
	}
	&::-webkit-scrollbar-thumb {
		background-color: #888;
	}
}
</style>
