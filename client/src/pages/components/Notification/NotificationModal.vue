<!-- NotificationModal.vue -->
<template>
	<div v-if="visible" class="modal-backdrop">
		<div class="modal">
			<h3>Уведомление</h3>
			<p>{{ message }}</p>
			<button @click="close">Закрыть</button>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{ message: string }>()

const visible = ref(true)

const close = () => {
	visible.value = false
}
</script>

<style scoped>
.modal-backdrop {
	position: fixed;
	top: 0;
	left: 0;
	width: 100vw;
	height: 100vh;
	background: rgba(0, 0, 0, 0.5);
	display: flex;
	justify-content: center;
	align-items: center;
}
.modal {
	background: transparent;
	padding: 20px;
	border-radius: 5px;
	box-shadow: 0px 0px 4px rgb(255, 255, 255, 0.5);
}
button {
	margin-top: 10px;
	padding: 8px 12px;
	background-color: #007bff;
	color: white;
	border: none;
	border-radius: 4px;
	cursor: pointer;
}
</style>
