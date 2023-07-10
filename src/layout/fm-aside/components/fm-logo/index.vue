<template>
	<div class="logo css37cbba7baa2536b">
		<img class="logo-img" src="@/assets/logo.png" alt="" />
		<h1 class="logo-text" v-show="!collapsed">飞码社区</h1>
	</div>
</template>

<script setup lang="ts">
defineProps({
	collapsed: {
		type: Boolean,
		default: false
	}
})
</script>

<style lang="scss" scoped>
.logo {
	font-weight: bolder;
	font-size: 24px;
	// background: #3f51b5;
	height: 67px;
	padding: 16px 20px;
	display: flex;
	align-items: center;
	.logo-img {
		width: 40px;
		height: 35px;
	}
	h1 {
		font-size: 22px;
		display: inline-block;
		color: #fff;
		margin: 0;
		margin-left: 10px;
		vertical-align: middle;
		animation: fade-in;
		animation-duration: 1s;
	}

	@keyframes fade-in {
		0% {
			opacity: 0;
		}
		100% {
			opacity: 1;
		}
	}
}
</style>
