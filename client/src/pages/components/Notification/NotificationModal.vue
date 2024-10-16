<!-- NotificationModal.vue -->
<template>
	<div v-if="visible" class="modal-backdrop">
		<ul class="modal__list">
			<li class="modal">
				<h3>Уведомление!</h3>
				<p>{{ props.message }}</p>
				<button @click="close" title="закрыть">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
						<path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/>
					</svg>
				</button>
			</li>
		</ul>
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

@keyframes fadeInFromBottom {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.modal-backdrop {
	position: fixed;
	bottom: 20px;
	right: 20px;
	display: flex;
	justify-content: center;
	align-items: center;

	.modal__list {
		background: transparent
	}
}
.modal {
	position: relative;
	background: transparent;
	padding: 25px;
	border-radius: 5px;
	max-width: 460px;
	backdrop-filter: blur(7.5px);
	background: rgba(249, 237, 8, 0.4);
	box-shadow: 0px 0px 5px rgb(255, 255, 255, 0.5);
	overflow-wrap: break-word;



	animation: fadeInFromBottom 0.5s ease-out forwards;

	h3 {
		background: transparent;
		margin-bottom: 20px;
	}

	p {
		background: transparent;
		margin-top: 8px;
	}
}
button {
	top: 10px;
	right: 10px;
	position: absolute;
	background: transparent;
	border: none;
	cursor: pointer;

	svg {
		background: transparent;
		width: 20px;

		path {
			fill: $main-font-color;
		}
	}
}
</style>
