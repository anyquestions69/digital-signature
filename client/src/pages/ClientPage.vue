<template>
	<Header :headerContent="headerContent" />
	<main class="wrapper__main-client">
		<ClientConteiner />
	</main>
	<Footer />
	<ClientEditPersonalInfo v-if="PagesStore.clientPage.isOpenEditor" />
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import socket from '../socket'
import { authStore } from '../store/authStore'
import { pagesStore } from '../store/pagesStore'
import ClientConteiner from './components/Client/ClientConteiner.vue'
import ClientEditPersonalInfo from './components/Client/ClientEditPersonalInfo.vue'
import Footer from './components/Footer/Footer.vue'
import Header from './components/Header/Header.vue'

const AuthStore = authStore()
const PagesStore = pagesStore()
const role = AuthStore.role

const headerContent = {
	button: {
		to: '/client/documents',
		text: 'Публикация приказов'
	},
	nav: []
}

onMounted(() => {
	console.log('Socket')
	if (role === 'Admin') {
		socket.on('postSigned', (data: { postId: number; message: string }) => {
			alert(`Пост ID: ${data.postId} - ${data.message}`)
		})
	}
})

onUnmounted(() => {
	socket.off('postSigned')
})
</script>
