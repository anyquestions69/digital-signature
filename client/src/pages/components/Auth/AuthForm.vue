<template>
	<div class="main__form">
		<h1 class="form__title">
			{{ `${isReg ? 'Регистрация' : 'Авторизация'}` }}
		</h1>
		<form>
			<div
				class="form__item"
				:style="`border-color: ${
					((isCliced && username.length < 3) ||
						(username.length > 0 && username.length < 3)) &&
					isReg
						? '#d00754'
						: ''
				};`"
			>
				<label
					for="username"
					:style="`top: ${isFocusUsername || username ? '-20px' : '0px'}`"
					>Имя</label
				>
				<input
					type="text"
					id="username"
					v-model="username"
					@focus="upUsernameInput"
					@blur="downUsernameInput"
				/>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 512 512"
					v-if="false"
				>
					<path
						d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c-9.4 9.4-9.4 24.6 0 33.9l47 47-47 47c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l47-47 47 47c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-47-47 47-47c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-47 47-47-47c-9.4-9.4-24.6-9.4-33.9 0z"
					/>
				</svg>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 512 512"
					v-if="false"
				>
					<path
						d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-111 111-47-47c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l64 64c9.4 9.4 24.6 9.4 33.9 0L369 209z"
					/>
				</svg>
			</div>
			<div
				class="form__item"
				:style="`border-color: ${
					(password != repass || (!password && isCliced)) && isReg
						? '#d00754'
						: ''
				};`"
			>
				<label
					for="password"
					:style="`top: ${isFocusPassword || password ? '-20px' : '0px'}`"
					>Пароль</label
				>
				<input
					type="password"
					id="password"
					v-model="password"
					@focus="upPasswordInput"
					@blur="downPasswordInput"
				/>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 512 512"
					v-if="false"
				>
					<path
						d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c-9.4 9.4-9.4 24.6 0 33.9l47 47-47 47c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l47-47 47 47c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-47-47 47-47c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-47 47-47-47c-9.4-9.4-24.6-9.4-33.9 0z"
					/>
				</svg>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 512 512"
					v-if="false"
				>
					<path
						d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-111 111-47-47c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l64 64c9.4 9.4 24.6 9.4 33.9 0L369 209z"
					/>
				</svg>
			</div>
			<div
				class="form__item"
				v-if="isReg"
				:style="`border-color: ${
					(password != repass || (!repass && isCliced)) && isReg
						? '#d00754'
						: ''
				};`"
			>
				<label
					for="repass"
					:style="`top: ${isFocusRePassword || repass ? '-20px' : '0px'}`"
					>Повторите пароль</label
				>
				<input
					type="password"
					id="repass"
					v-model="repass"
					@focus="upRePasswordInput"
					@blur="downRePasswordInput"
				/>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 512 512"
					v-if="false"
				>
					<path
						d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c-9.4 9.4-9.4 24.6 0 33.9l47 47-47 47c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l47-47 47 47c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-47-47 47-47c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-47 47-47-47c-9.4-9.4-24.6-9.4-33.9 0z"
					/>
				</svg>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 512 512"
					v-if="false"
				>
					<path
						d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-111 111-47-47c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l64 64c9.4 9.4 24.6 9.4 33.9 0L369 209z"
					/>
				</svg>
			</div>
			<div class="form__info">
				<label>{{
					`${isReg ? 'Уже зарегистрированы?' : 'Еще нет аккаунта?'}`
				}}</label>
				<a @click="changeMode">{{ `${isReg ? 'Войти' : 'Регистрация'}` }}</a>
			</div>
			<button type="button" v-if="isReg" @click="regUser(username, password)">
				Зарегистрироваться
			</button>
			<button type="button" v-else @click="loginUser(username, password)">
				Войти
			</button>
		</form>
		<NotificationModal v-if="showNotification" :message="notificationMessage" />
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

import { authStore } from '../../../store/authStore.ts'
import NotificationModal from '../Notification/NotificationModal.vue'

const router = useRouter()
const AuthStore = authStore()

const isReg = ref(true)
const username = ref('')
const password = ref('')
const repass = ref('')

const isFocusUsername = ref(false)
const isFocusPassword = ref(false)
const isFocusRePassword = ref(false)

const isCliced = ref(false)

const showNotification = ref(false)
const notificationMessage = ref('')

const showNotificationModal = (message: string) => {
	notificationMessage.value = message
	showNotification.value = true
}

const upUsernameInput = () => {
	isFocusUsername.value = true
}
const downUsernameInput = () => {
	isFocusUsername.value = false
}

const upPasswordInput = () => {
	isFocusPassword.value = true
}
const downPasswordInput = () => {
	isFocusPassword.value = false
}

const upRePasswordInput = () => {
	isFocusRePassword.value = true
}
const downRePasswordInput = () => {
	isFocusRePassword.value = false
}

const changeMode = () => {
	isReg.value = !isReg.value
}

const regUser = async (username: string, password: string) => {
	isCliced.value = true
	await AuthStore.regUser({
		username: username,
		password: password,
		repass: password,
		name: 'Неизвестно',
		division: 'Неизвестно',
		job: 'Неизвестно'
	})
	if (AuthStore.status === 'failed') {
		showNotificationModal(AuthStore.err)
	} else if (AuthStore.token) {
		router.push('/client')
	}
}

const loginUser = async (username: string, password: string) => {
	isCliced.value = true
	await AuthStore.loginUser({
		username: username,
		password: password
	})

	if (AuthStore.token) {
		router.push('/client')
	}
}
</script>

<style lang="scss">
.main__form {
	width: 35%;
	height: 65%;
	padding: 6% 4%;
	border: 2px solid white;
	border-radius: 20px;
	box-shadow: -5px 5px 5px rgba(255, 255, 255, 0.5);

	.form__title {
		width: 100%;
		text-align: center;
	}

	form {
		margin-top: 40px;
		display: flex;
		flex-direction: column;
		gap: 30px;

		.form__item {
			position: relative;
			width: 100%;
			height: 30px;
			border-bottom: 1px solid white;

			label {
				position: absolute;
				background: transparent;
				transition: all 0.5s ease;
			}

			input {
				width: 100%;
				height: 100%;
			}
		}

		.form__info {
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			transition: all 0.5s ease;

			a {
				cursor: pointer;
				color: white;
				transition: all 0.5s ease;

				&:hover {
					text-decoration: underline;
				}
			}
		}

		button {
			margin-top: 30px;
			height: 40px;
			border-radius: 15px;
		}
	}
}
</style>
