<template>
	<Header :headerContent="headerContent" />
	<main class="wrapper__main-client">
		<ClientConteiner />
	</main>
	<Footer />
	<ClientEditPersonalInfo v-if="PagesStore.clientPage.isOpenEditor" />

	<!-- Модальное окно для уведомлений -->
	<NotificationModal v-if="showNotification" :message="notificationMessage" />
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import socket from '../socket'
import { authStore } from '../store/authStore'
import { pagesStore } from '../store/pagesStore'
import { postStore } from '../store/postStore'
import ClientConteiner from './components/Client/ClientConteiner.vue'
import ClientEditPersonalInfo from './components/Client/ClientEditPersonalInfo.vue'
import Footer from './components/Footer/Footer.vue'
import Header from './components/Header/Header.vue'
import NotificationModal from './components/Notification/NotificationModal.vue'

const PagesStore = pagesStore()

const headerContent = {
	button: {
		to: '/client/documents',
		text: 'Публикация приказов'
	},
	nav: []
}

const AuthStore = authStore()
const PostStore = postStore()
const role = AuthStore.role

// Состояния для управления модальным окном
const showNotification = ref(false)
const notificationMessage = ref('')

// Функция для показа уведомления
const showNotificationModal = (message: string) => {
	notificationMessage.value = message
	showNotification.value = true
}

// Подписка на WebSocket
onMounted(() => {
	if (role === 'Admin') {
		socket.on('postSigned', (data: { postId: number; message: string }) => {
			PostStore.getPost(data.postId)
			console.log(PostStore.post)
			console.log(`Приказ ${PostStore.post.title}  ${data.message}`)
			showNotificationModal(`Приказ ${PostStore.post.title}  ${data.message}`)
		})
	}
})

onUnmounted(() => {
	socket.off('postSigned')
})
</script>
