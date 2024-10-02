<template>
	<Header :head_content="head_content" />
	<main class="wrapper__main-documents box">
		<DocBody />
	</main>
	<Footer />
</template>

<script setup lang="ts">
import DocBody from './components/Doc/DocBody.vue'
import Footer from './components/Footer/Footer.vue'
import Header from './components/Header/Header.vue'

const head_content = {
	button: {
		to: '/client',
		text: 'Личный кабинет'
	},
	nav: [
		{
			id: 0,
			name: 'Документы'
		}
	]
}
</script>

<style lang="scss">
.wrapper__main-documents {
	@include Flex;
	margin: 100px 0;
}
</style>
