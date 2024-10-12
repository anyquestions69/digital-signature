<template>
	<div class="wrapper">
		<RouterView />
	</div>
	<!-- <AppSms /> -->
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
// import AppSms from './pages/components/App/AppSms.vue'
</script>

<style lang="scss">
.wrapper {
	width: 100%;
	overflow: hidden;
}
</style>
