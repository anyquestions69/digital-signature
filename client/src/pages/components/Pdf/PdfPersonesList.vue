<template>
	<div class="list-of-clients box">
		<div class="conteiner">
			<div class="conteiner__content">
				<div class="content__editor-btn">
					<button title="выход" @click="PagesStore.togglePersonPdfList">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
							<path
								d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"
							/>
						</svg>
					</button>
				</div>
				<div class="content__block">
					<div class="block__content">
						<div class="content__failed">
							<h1>Не подписали:</h1>
							<ul class="content__list">
								<li v-for="item in personList.failed" :key="item.id">
									<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
										<path
											d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"
										/>
									</svg>
									<p>{{ item.name }}</p>
								</li>
							</ul>
						</div>
						<div class="content__success">
							<h1>Подписали:</h1>
							<ul class="content__list">
								<li v-for="item in personList.success" :key="item.id">
									<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
										<path
											d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"
										/>
									</svg>
									<p>{{ item.name }}</p>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { pagesStore } from '../../../store/pagesStore'
import { postStore } from '../../../store/postStore'

const PagesStore = pagesStore()
const PostStore = postStore()

const route = useRoute()

const postId = Number(route.params.id)

PostStore.getSubs(postId)

const personList = PostStore.subscribers

console.log(PostStore.subscribers)
</script>

<style scoped lang="scss">
.list-of-clients {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	z-index: 100;

	.conteiner {
		position: relative;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;

		.conteiner__content {
			position: relative;

			.content__editor-btn {
				top: 0;
				right: 0;
				position: absolute;
				background: transparent;

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

			.content__block {
				position: absolute;
				margin-top: 100px;
				width: 100%;

				.block__content {
					position: relative;
					width: 100%;
					height: 100%;
					@include Flex(column, center, center);
					gap: 50px;

					.content__list {
						margin-top: 30px;
						@include Flex(column, start, start);
						gap: 10px;

						li {
							margin-left: 100px;
							@include Flex(row, start, center);
							gap: 20px;
							width: 300px;

							svg {
								width: 20px;
							}
						}
					}

					.content__success {
						width: 100%;
						margin-bottom: 50px;

						.content__list {
							li {
								svg {
									path {
										fill: green;
									}
								}
							}
						}
					}

					.content__failed {
						width: 100%;

						.content__list {
							li {
								svg {
									path {
										fill: rgb(157, 3, 90);
									}
								}
							}
						}
					}
				}
			}
		}
	}
}
</style>
