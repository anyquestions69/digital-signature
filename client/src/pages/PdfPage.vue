<template>
	<Header :headerContent="headerContent" />
	<main class="wrapper__main-pdf box">
		<PdfContent />
	</main>
	<Footer />
</template>

<script setup lang="ts">
import Footer from './components/Footer/Footer.vue'
import Header from './components/Header/Header.vue'
import PdfContent from './components/Pdf/PdfContent.vue'

const headerContent = {
	button: {
		to: '/client/documents',
		text: 'Список документов'
	},
	nav: []
}
</script>
