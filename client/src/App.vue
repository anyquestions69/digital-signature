<template>
	<div class="wrapper">
		<RouterView />
	</div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import { RouterView } from 'vue-router'
import { useToast } from 'vue-toastification'
import socket from './socket'
import { authStore } from './store/authStore'

const toast = useToast()
const AuthStore = authStore()
const role = AuthStore.role
onMounted(() => {
	if (role === 'Admin') {
		socket.on('postSigned', (data: { postId: number; message: string }) => {
			console.log(`Пост ID: ${data.postId} - ${data.message}`)
			toast.success(`Пост ID: ${data.postId} - ${data.message}`)
		})
	}
})

onUnmounted(() => {
	socket.off('postSigned')
})
</script>

<style lang="scss">
.wrapper {
	width: 100%;
	overflow: hidden;
}
</style>
