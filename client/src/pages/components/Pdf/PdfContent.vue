<template>
	<div v-if="pdfSrc" class="pdf__status box">
		<div class="status__text">
			<p>
				Статус:
				<span :style="`background: ${isSuccessStatus ? '#1bb28a' : '#77173c'}`">
					{{ isSuccessStatus ? 'Подписан' : 'Не подписан' }}
				</span>
			</p>
		</div>
	</div>
	<component :is="PDF" :src="pdfSrc" v-if="pdfSrc" class="box main__pdf" />
	<p v-else>Документ не загружен или не найден!</p>
	<form v-if="!isSuccessStatus && pdfSrc" class="status__form">
		<button type="button">
			Поставить подпись
			<input type="file" @change="handleKeyFileChange" accept=".pem" />
		</button>
	</form>
</template>

<script setup lang="ts">
import PDF from 'pdf-vue3'

import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { authStore } from '../../../store/authStore'
import { postStore } from '../../../store/postStore'

const AuthStore = authStore()

const keyFile = ref<File | null>(null)
const pdfSrc = ref<string | null>(null)
const isSuccessStatus = ref(false)
const route = useRoute()
const PostStore = postStore()
const postId = Number(route.params.id)

onMounted(async () => {
	try {
		await PostStore.getPost(postId)
		isSuccessStatus.value = PostStore.checkSig(AuthStore.id)

		const base64Pdf = PostStore.post.content || null

		if (base64Pdf) {
			pdfSrc.value = `data:application/pdf;base64,${base64Pdf}`
		} else {
			console.error('PDF не найден или не загружен.')
		}
	} catch (error) {
		console.error('Ошибка при получении поста:', error)
	}
})

const handleKeyFileChange = async (event: Event) => {
	const target = event.target as HTMLInputElement
	if (target.files && target.files[0]) {
		keyFile.value = target.files[0]
		try {
			await PostStore.subscribePost({ id: postId, key: keyFile.value })
			if (PostStore.status === 'success') {
				isSuccessStatus.value = true
			} else {
				console.error('Ошибка при подписке: Не удалось поставить ЭЦП')
			}
		} catch (error) {
			console.error('Ошибка при подписке:', error)
		}
	}
}
</script>

<style lang="scss">
.pdf__status {
	margin-top: 100px;
	width: 100%;

	.status__text {
		font-size: 20px;

		span {
			padding: 10px 20px;
			background: #1bb28a;
			border-radius: 10px;
			color: white;
		}
	}
}

.main__pdf {
	margin: 50px 0;
	z-index: 100;

	.pdf-vue3-pageTooltip {
		background: transparent !important;
	}

	.pdf-vue3-backToTopBtn {
		div {
			cursor: pointer;

			svg {
				background: transparent;
			}
		}
	}
}

.status__form {
	width: 100%;
	margin-bottom: 100px;
	text-align: center;

	button {
		width: 40%;
		position: relative;
		margin-left: 15px;
		padding: 10px 20px;
		cursor: pointer;
		border-radius: 10px;

		input {
			position: absolute;
			width: 100%;
			height: 100%;
			top: 0;
			left: 0;
			opacity: 0;
			cursor: pointer;
		}
	}
}
</style>
