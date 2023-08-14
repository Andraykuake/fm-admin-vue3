<template>
	<div class="edit-box">
		{{ data.name }}
	</div>
</template>
<script setup lang="ts">
defineProps({
	data: {
		type: Object,
		default: () => {}
	},
	visible: {
		type: Boolean,
		default: false
	}
})
</script>
