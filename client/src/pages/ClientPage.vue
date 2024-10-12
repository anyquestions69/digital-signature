<template>
	<Header :headerContent="headerContent" />
	<main class="wrapper__main-client">
		<ClientConteiner />
	</main>
	<Footer />
	<ClientEditPersonalInfo v-if="PagesStore.clientPage.isOpenEditor" />
</template>

<script setup lang="ts">
import { pagesStore } from '../store/pagesStore'
import ClientConteiner from './components/Client/ClientConteiner.vue'
import ClientEditPersonalInfo from './components/Client/ClientEditPersonalInfo.vue'
import Footer from './components/Footer/Footer.vue'
import Header from './components/Header/Header.vue'

const PagesStore = pagesStore()

const headerContent = {
	button: {
		to: '/client/documents',
		text: 'Публикация приказов'
	},
	nav: []
}
</script>
