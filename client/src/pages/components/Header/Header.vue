<template>
	<header
		class="wrapper__header box"
		:style="`padding-bottom: ${!mobileMenuIsOpen ? '20px' : '0px'}`"
	>
		<div class="header__conteiner">
			<a href="/" class="conteiner__logo">
				<img class="logo__img" src="../../../assets/img/logo.png" alt="logo" />
				<div class="logo__text">
					<h1>Созвездие</h1>
					<p>Система распределённых реестров</p>
				</div>
			</a>
			<nav class="conteiner__nav" v-if="width_screen > 1024">
				<ul class="nav__list">
					<li
						class="list__item"
						v-for="item in props.headerContent.nav"
						:key="item.id"
					>
						<a>
							{{ item.text }}
						</a>
					</li>
				</ul>
			</nav>
			<RouterLink
				class="conteiner__auth"
				:to="headerContent.button.to"
				v-if="width_screen > 1024"
				>{{ headerContent.button.text }}</RouterLink
			>
			<HeaderBurgerMenu v-else @click="openMobileMenu" />
		</div>
		<HeaderMobileConteiner
			v-if="btnIsClicked "
			:class="`header__mobile-menu ${ btnIsClicked ? ( mobileMenuIsOpen ? 'show' : 'unshow' ) : '' }`"
			:headerContent="props.headerContent"
		/>
	</header>
</template>

<script setup lang="ts">
import { defineProps, ref } from 'vue'

import HeaderBurgerMenu from './HeaderBurgerMenu.vue'
import HeaderMobileConteiner from './HeaderMobileConteiner.vue'
import { HeaderContent } from './HeaderInterfaces'


// Обработка props
const props = defineProps<{
	headerContent: HeaderContent
}>()

// Обработка изменения ширины экрана
const width_screen = ref( window.screen.width )
const handleResize = () => {
	width_screen.value = window.screen.width

	closeAdaptive( width_screen.value )
}

const closeAdaptive = ( inputWith: number ) => {
	if( inputWith > 1024 ) {
		mobileMenuIsOpen.value = false
		btnIsClicked.value = false
	}
}

window.addEventListener('resize', handleResize)

// Обработка мобильного меню
const mobileMenuIsOpen = ref( false )
const btnIsClicked = ref( false )

const openMobileMenu = () => {
	btnIsClicked.value = true
	mobileMenuIsOpen.value = !mobileMenuIsOpen.value
}
</script>

<style lang="scss" scoped>
.wrapper__header {
	width: 100%;
	margin-top: 20px;
	border-bottom: 3px solid $main-line-color;

	.header__conteiner {
		@include FlexRow;

		.conteiner__logo {
			@include FlexRow(start);
			gap: 20px;

			@media (max-width: 490px) {
				gap: 0px;
				width: 250px;
			}

			.logo__img {
				user-select: none;
				width: 80px;
				height: auto;

				@media (max-width: 490px) {
					scale: 0.8;
				}

				@media (max-width: 425px) {
					width: 60px;
					height: 60px;
				}
			}

			.logo__text {
				margin-top: 10px;

				h1 {
					@include Title;
					font-size: 36px !important;
				}

				p {
					margin-top: 5px;
					letter-spacing: -0.5px;
				}

				@media (max-width: 1090px) {
					scale: 0.9;
					width: 300px;
				}

				@media (max-width: 490px) {
					scale: 0.8;
				}
			}
		}

		.conteiner__nav {
			.nav__list {
				@include FlexRow(center);
				gap: 40px;

				@media (max-width: 1090px) {
					gap: 20px;
					translate: -20px 0;
				}

				.list__item {
					cursor: pointer;
					position: relative;

					&::after {
						content: '';
						position: absolute;
						left: 0;
						bottom: -3px;
						width: 100%;
						height: 3px;
						border-radius: 10px;
						background: $main-font-color;
						transform: scaleX(0);
						transition: transform 0.5s ease;
					}

					&:hover {
						color: $main-font-color;
						translate: 0 0;

						&::after {
							transform: scaleX(1);
							transform-origin: left;
						}
					}
				}
			}
		}

		.conteiner__auth {
			border: 2px solid;
			border-radius: 40px;
			padding: 15px 20px;
			transition: all 0.5s ease;

			&:hover {
				translate: 5px -5px;
				color: $main-line-color;
				box-shadow: -5px 5px 5px $main-line-color;
			}

			@media (max-width: 1090px) {
				scale: 0.9;
			}
		}
	}

	.header__mobile-menu {
		overflow: hidden;

		@keyframes showMobileMenu {
			from {
				height: 0;
				opacity: 0;
				transform: translateY(-100%);
				display: none;
			}

			to {
				height: 180px;
				opacity: 1;
				transform: translateY(0);
				display: block;
			}
		}

		@keyframes unShowMobileMenu {
			from {
				height: 180px;
				opacity: 1;
				transform: translateY(0);
				display: block;
			}

			to {
				height: 0;
				opacity: 0;
				transform: translateY(-100%);
				display: none;
			}
		}

		&.show {
			animation: showMobileMenu 1s ease forwards;
		}

		&.unshow {
			animation: unShowMobileMenu 1s ease forwards;
		}
	}
}
</style>
