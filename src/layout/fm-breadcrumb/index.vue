<template>
	<a-breadcrumb>
		<a-breadcrumb-item v-for="breadcrumb in $route.meta.breadcrumbList" :key="breadcrumb">
			{{ breadcrumb }}
		</a-breadcrumb-item>
	</a-breadcrumb>
</template>
