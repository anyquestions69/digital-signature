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

<style lang="scss" scoped>
.modal-backdrop {
	position: fixed;
	top: 0;
	right: 0;
	width: 100vw;
	height: 100vh;
	backdrop-filter: blur(7.5px);
	background: rgba(0, 0, 0, 0.4);

	display: flex;
	justify-content: center;
	align-items: center;
	// justify-content: end;
	// align-items: end;
}
.modal {
	// position: relative;
	// right: 30px;
	// bottom: 30px;
	background: transparent;
	padding: 20px;
	border-radius: 5px;
	box-shadow: 0px 0px 5px rgb(255, 255, 255, 0.5);

	h3 {
		background: transparent;
	}

	p {
		background: transparent;
		margin-top: 8px;
	}
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
