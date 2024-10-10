<template>
	<div class="nav__panel">
		<div class="nav__person-info">
			<div class="person__img">
				<img src="../../../assets/img/user.png" alt="user" />
			</div>
			<div class="person__info">
				<p class="name">{{ AuthStore.username }}</p>
			</div>
		</div>
		<ul class="panel__list">
			<div class="list__body">
				<li
					class="list__item"
					v-for="item in PagesStore.clientPage.navList"
					:key="item.id"
					@click="PagesStore.changeNavVariant(item.id)"
				>
					<p>
						{{ item.text }}
					</p>
				</li>
			</div>
			<li class="list__item-end" @click="exitFromSys">
				<p>Выйти</p>
			</li>
		</ul>
	</div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

import { authStore } from '../../../store/authStore.ts'
import { pagesStore } from '../../../store/pagesStore.ts'


const AuthStore = authStore()
const PagesStore = pagesStore()
const router = useRouter()

const exitFromSys = () => {
	AuthStore.sysExit()
	router.push('/api/auth')
}
</script>

<style lang="scss">
@mixin Item($bg-color: #414141) {
	width: 100%;
	height: 50px;
	cursor: pointer;
	@include FlexRow;
	padding: 5px 20px;

	&:hover {
		background: $bg-color;
	}

	p {
		background: transparent;
	}
}

.nav__panel {
	@include Flex;
	width: 100%;

	.nav__person-info {
		@include Flex(column, space-between, start);
		padding: 20px;
		width: 100%;
		height: 120px;
		border-bottom: 2px solid $border-color;
		gap: 10px;

		.person__img {
			width: 50px;
			height: 50px;
			border-radius: 50%;
			background: red;

			img {
				user-select: none;
				width: 100%;
				height: 100%;
				object-fit: cover;
			}
		}

		.person__info {
			p {
                margin-left: 5px;
                margin-top: 5px;

				&.name {
					font-size: 18px;
					font-weight: 600;
				}

				&.position {
					margin-top: 10px;
					font-size: 14px;
					font-weight: 200;
				}
			}
		}
	}

	.panel__list {
		@include Flex(column, space-between, stretch);
		flex-wrap: wrap;
		align-content: space-around;
		width: 100%;
		min-height: 512.5px;
		height: auto;

		.list__body {
			width: 100%;

			.list__item {
				@include Item();
			}
		}

		.list__item-end {
			@include Item(rgba(255, 0, 0, 0.3));
		}
	}
}
</style>
