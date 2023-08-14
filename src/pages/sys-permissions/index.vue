<template>
	<div class="main-box">
		<Table @detailsEvent="detailsEvent" @editEvent="editEvent" />
		<Edit :visible="editVisible" :data="editData" />
		<Details v-model:visible="detailsVisible" :data="detailsData" />
	</div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import Table from './components/table.vue'
import Edit from './components/edit.vue'
import Details from './components/details.vue'

const editVisible = ref(false)
const editData = ref({})

const detailsVisible = ref(false)
const detailsData = ref({})

const detailsEvent = (data: Object) => {
	detailsVisible.value = true
	detailsData.value = data
}

const editEvent = (data: Object) => {
	editVisible.value = true
	editData.value = data
}
</script>

<style lang="scss" scoped>
.main-box {
	margin-top: 16px;
	height: calc(100% - 40px);
	// overflow: auto;
}
</style>
