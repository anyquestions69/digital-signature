<template>
	<div class="user-info__editor box">
		<div class="editor__btn">
			<button title="выход" @click="PagesStore.toggleDocEditForm">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
					<path
						d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"
					/>
				</svg>
			</button>
		</div>
		<div class="editor__conteiner">
			<h1 class="editor__title">Изменение документа</h1>
			<form class="editor__form">
				<div class="form__item">
					<label for="title"></label>
					<input
						type="text"
						id="title"
						:placeholder="PostStore.temp.title || 'Введите название'"
						v-model="newTitle"
					/>
				</div>
				<button @click="editDocInfo">Сохранить</button>
			</form>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { pagesStore } from '../../../store/pagesStore'
import { postStore } from '../../../store/postStore'

const PagesStore = pagesStore()
const PostStore = postStore()

const newTitle = ref('')

const editDocInfo = async () => {
	await PostStore.updatePost(PostStore.temp.id, newTitle.value)
	const postIndex = PostStore.postList.findIndex(
		post => post.id === PostStore.temp.id
	)
	if (postIndex !== -1) {
		PostStore.postList[postIndex].title = newTitle.value
	}
	PagesStore.toggleDocEditForm()
}
</script>

<style lang="scss">
.user-info__editor {
	position: absolute;
	top: 0;
	left: 0;
	overflow: hidden;
	width: 100%;
	height: 100%;
	backdrop-filter: blur(7.5px);
	background: rgba(0, 0, 0, 0.4);

	.editor__btn {
		background: transparent;
		position: relative;

		button {
			width: 40px;
			border: none;
			background: transparent;
			position: absolute;
			right: 0;
			top: 30px;

			svg {
				background: transparent;

				path {
					fill: $main-font-color;
				}
			}
		}
	}

	.editor__conteiner {
		margin-top: 10%;
		background: transparent;

		.editor__title {
			background: transparent;
			text-align: center;
		}

		.editor__form {
			margin-top: 50px;
			background: transparent;
			gap: 20px;
			text-align: center;
			@include Flex(column, center, center);

			.form__item {
				width: 100%;

				label {
				}

				input {
					padding-inline: 30px;
					width: 100%;
					height: 50px;
				}
			}

			button {
				margin-top: 40px;
				width: 100%;
				height: 40px;
			}
		}
	}
}
</style>
