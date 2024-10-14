<template>
	<div class="main-documents__body">
		<div class="document_nav-panel">
			<DocSelectForm />
			<DocSearchForm />
		</div>
		<ul class="document__list">
			<li v-for="elem in PostList" :key="elem.id" class="list__elem">
				<div class="elem__text">
					<div>
						<p>{{ elem.title }}</p>
						<p>
							Должностное лицо:
							<span>{{ elem.author || 'Загрузка...' }}</span>
						</p>
						<p>
							Дата: <span>{{ elem.date || 'Загрузка...' }}</span>
						</p>
					</div>
				</div>
				<RouterLink :to="`documents/${elem.id}`">
					<button>
						<p>Перейти</p>
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
							<path
								d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"
							/>
						</svg>
					</button>
				</RouterLink>
				<div class="elem__tools" v-if="AuthStore.role === 'Admin'">
					<button title="изменить" @click="PagesStore.toggleDocEditForm()">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
							<path d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1 0 32c0 8.8 7.2 16 16 16l32 0zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"/>
						</svg>
					</button>
					<button title="удалить">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
							<path d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0L284.2 0c12.1 0 23.2 6.8 28.6 17.7L320 32l96 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 96C14.3 96 0 81.7 0 64S14.3 32 32 32l96 0 7.2-14.3zM32 128l384 0 0 320c0 35.3-28.7 64-64 64L96 512c-35.3 0-64-28.7-64-64l0-320zm96 64c-8.8 0-16 7.2-16 16l0 224c0 8.8 7.2 16 16 16s16-7.2 16-16l0-224c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16l0 224c0 8.8 7.2 16 16 16s16-7.2 16-16l0-224c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16l0 224c0 8.8 7.2 16 16 16s16-7.2 16-16l0-224c0-8.8-7.2-16-16-16z"/>
						</svg>
					</button>
				</div>
			</li>
		</ul>
		<button class="document__btn" @click="nextPage" v-if="PostStore.scroll">
			Следующая...
		</button>
		<button class="document__btn" @click="prevPage" v-if="page > 1">
			Предыдущая...
		</button>
	</div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { postStore } from '../../../store/postStore'
import { authStore } from '../../../store/authStore'

import DocSearchForm from './DocSearchForm.vue'
import DocSelectForm from './DocSelectForm.vue'
import { pagesStore } from '../../../store/pagesStore'

const PostStore = postStore()
const AuthStore = authStore()
const PagesStore = pagesStore()

const page = ref(1)
const limit = 7

onMounted(async () => {
	await PostStore.getPostList(page.value, limit)
})

const nextPage = async () => {
	if (PostStore.scroll) {
		page.value += 1
		await PostStore.getPostList(page.value, limit)
	}
}

const prevPage = async () => {
	if (page.value !== 1) {
		page.value -= 1
		await PostStore.getPostList(page.value, limit)
	}
}

const PostList = computed(() => PostStore.getRenderingPosts)
</script>

<style lang="scss">
.main-documents__body {
	@include Flex;
	width: 100%;

	.document_nav-panel {
		@include Flex(row, space-around, center);
		width: 90%;
		padding: 10px 20px;
		border: 2px solid rgb(51, 51, 51);
		box-shadow: 1px 1px 5px white;
		border-radius: 20px;

		select {
			border: 1px solid wheat;
			padding: 5px 10px;
			border-radius: 10px;
		}

		div {
			position: relative;
			input {
				border-radius: 10px;
				padding: 5px 10px;
				border: 1px solid wheat;
			}
			svg {
				position: absolute;
				background: transparent;
				width: 20px;
				top: 5px;
				right: 10px;
				path {
					fill: $main-font-color;
				}
			}
		}
		button {
			border-radius: 10px;
			padding: 10px 20px;
			font-size: 18px;
		}
	}

	.document__list {
		margin-top: 30px;
		@include Flex;
		width: 80%;
		padding: 40px 20px;
		gap: 20px;

		.list__elem {
			padding: 10px 10px 10px 30px;
			border-radius: 20px;
			width: 100%;
			border: 2px solid white;
			position: relative;
			@include FlexRow;

			.elem__text {
				background: transparent;

				div {
					p {
						background: transparent;
						&:first-of-type {
							margin-bottom: 20px;
						}
						&:last-of-type {
							margin-top: 10px;
							span {
								margin-left: 20px;
								text-decoration: underline;
							}
						}
					}
				}
			}

			button {
				padding: 20px 10px;
				@include ItemLink(5px);
				background: transparent;
				height: 100%;
				border: none;
				p {
					background: transparent;
				}
				svg {
					background: transparent;
				}
			}

			.elem__tools {
				position: absolute;
				top: 20px;
				right: 30%;
				@include Flex( row, space-between, center );
				gap: 20px;

				button {
					all: unset;
					border: 0;
					cursor: pointer;

					svg {
						all: unset;
						width: 20px;
						transition: all 0.5s ease;
					}

					&:hover {
						svg {
							scale: 1.05;
							translate: 2px -2px;
						}
					}
				}
			}
		}
	}

	.document__btn {
		padding: 10px 20px;
		margin-top: 30px;
		font-size: 20px;
		width: 40%;
		border-radius: 20px;
	}
}
</style>
