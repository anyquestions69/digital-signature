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
							<span>
								{{ chiefs[elem.id] || 'Загрузка...' }}
							</span>
						</p>
						<p>
							Дата:
							<span>{{ formatDate(elem.date) || 'Загрузка...' }}</span>
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
			</li>
		</ul>
		<button class="document__btn" @click="PagesStore.addCounter()">Показать ещё...</button>
	</div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { format } from 'date-fns'
import { ru } from 'date-fns/locale'
import { onMounted, ref } from 'vue'
import { authStore } from '../../../store/authStore'
import { postStore } from '../../../store/postStore'
import { pagesStore } from '../../../store/pagesStore'

import DocSelectForm from './DocSelectForm.vue'
import DocSearchForm from './DocSearchForm.vue'

const AuthStore = authStore()
const PostStore = postStore()
const PagesStore = pagesStore()

// Реактивный объект для хранения начальников
const chiefs = ref<{ [key: number]: string }>({})

const formatDate = (date: any) => {
	return format(date, 'dd.MM.yyyy', { locale: ru })
}

const fetchChiefs = async () => {
	for (const post of PostStore.postList) {
		const name = await AuthStore.getChief(post.userId)
		chiefs.value[post.id] = name
	}
}

onMounted(async () => {
	await PostStore.getPostList()
	await fetchChiefs()
})

const PostList = computed( () => PostStore.getRenderingPosts )
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
