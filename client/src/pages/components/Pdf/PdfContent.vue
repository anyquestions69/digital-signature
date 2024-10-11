<template>
	<div class="main__pdf">
		<div :style="{ width: '1028px', height: '700px' }">
			<VPdfViewer v-if="pdfSrc" :src="pdfSrc" base="http://localhost:5173" />
			<div v-else>
				<p>PDF не загружен или недоступен</p>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { VPdfViewer } from '@vue-pdf-viewer/viewer'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { postStore } from '../../../store/postStore'

const PostStore = postStore()

const pdfSrc = ref<string | null>(null)

const route = useRoute()
const postId = Number(route.params.id)

const fetchPdfBase64 = async (id: number) => {
	await PostStore.getPost(id)

	const base64Pdf = PostStore.post.content

	if (base64Pdf) {
		return base64Pdf
	}

	return null
}

onMounted(async () => {
	const base64Pdf = await fetchPdfBase64(postId)

	if (base64Pdf) {
		pdfSrc.value = `data:application/pdf;base64,${base64Pdf}`
	} else {
		console.error('Ошибка: PDF не найден или не загружен.')
	}
})
</script>

<style lang="scss">
.main__pdf {
	margin: 100px 0;
	@include Flex;
	pointer-events: none;

	.pdf__content {
		width: 400px;
		height: 500px;
		pointer-events: auto;
	}
}
</style>
