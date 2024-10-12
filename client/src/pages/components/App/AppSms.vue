<template>
	<div class="app__sms"></div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
//@ts-ignore
import { useToast } from 'vue-toastification'
import 'vue-toastification/dist/index.css'
import socket from '../../../socket'
import { authStore } from '../../../store/authStore'
const toast = useToast()
const AuthStore = authStore()
const role = AuthStore.role
onMounted(() => {
	console.log('socket!!!')

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

<style lang="css" scoped>
.app__sms {
	position: absolute;
	top: 100px;
	left: 100px;
}
</style>
