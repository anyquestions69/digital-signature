<template>
	<div v-if="pdfSrc" class="pdf__status box">
		<div>
			<div class="status__text" v-if="AuthStore.role === 'Guest' ">
				<p>
					Статус:
					<span :style="`background: ${isSuccessStatus ? '#1bb28a' : '#77173c'}`">
						{{ isSuccessStatus ? 'Подписан' : 'Не подписан' }}
					</span>
				</p>
			</div>
			<div class="status__text" v-else>
				<p>
					Статус:
					<span :style="`background: ${isSuccessStatus ? '#1bb28a' : '#77173c'}`">
						{{ isSuccessStatus ? 'Подписан всеми' : 'Не подписан' }}
					</span>
				</p>
				<button @click="PagesStore.togglePersonPdfList">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" title="Список доведентя">
						<path d="M152.1 38.2c9.9 8.9 10.7 24 1.8 33.9l-72 80c-4.4 4.9-10.6 7.8-17.2 7.9s-12.9-2.4-17.6-7L7 113C-2.3 103.6-2.3 88.4 7 79s24.6-9.4 33.9 0l22.1 22.1 55.1-61.2c8.9-9.9 24-10.7 33.9-1.8zm0 160c9.9 8.9 10.7 24 1.8 33.9l-72 80c-4.4 4.9-10.6 7.8-17.2 7.9s-12.9-2.4-17.6-7L7 273c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l22.1 22.1 55.1-61.2c8.9-9.9 24-10.7 33.9-1.8zM224 96c0-17.7 14.3-32 32-32l224 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-224 0c-17.7 0-32-14.3-32-32zm0 160c0-17.7 14.3-32 32-32l224 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-224 0c-17.7 0-32-14.3-32-32zM160 416c0-17.7 14.3-32 32-32l288 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-288 0c-17.7 0-32-14.3-32-32zM48 368a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"/>
					</svg>
				</button>
			</div>
		</div>
	</div>
	<component
		:is="PDF"
		:src="pdfSrc"
		v-if="pdfSrc"
		style="height: 700px"
		class="box main__pdf"
	/>
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
import { pagesStore } from '../../../store/pagesStore'

const AuthStore = authStore()

const keyFile = ref<File | null>(null)
const pdfSrc = ref<string | null>(null)
const isSuccessStatus = ref(false)
const route = useRoute()
const PostStore = postStore()
const PagesStore = pagesStore()
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
		@include Flex( row, space-between, center );

		span {
			padding: 10px 20px;
			background: #1bb28a;
			border-radius: 10px;
			color: white;
		}

		button {
			width: 40px;
			border: 0;

			svg {

				path {
					fill: $main-font-color;
				}
			}
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
