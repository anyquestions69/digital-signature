<template>
	<div class="main__form">
		<h1 class="form__title">
			{{ `${isReg ? 'Регистрация' : 'Авоторизация'}` }}
		</h1>
		<form>
			<div class="form__item">
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
			</div>
			<div class="form__item">
				<label
					for="password"
					:style="`top: ${isFocusPassword || password ? '-20px' : '0px'}`"
					>Пароль</label
				>
				<input
					type="text"
					id="password"
					v-model="password"
					@focus="upPasswordInput"
					@blur="downPasswordInput"
				/>
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
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { authStore } from '../../../store/authStore.ts'

const isReg = ref(true)
const AuthStore = authStore()
const username = ref('')
const password = ref('')

const isFocusUsername = ref(false)
const isFocusPassword = ref(false)

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

const changeMode = () => {
	isReg.value = !isReg.value
}
//TODO:
// поля для ввода репаса и имени
const regUser = (username: string, password: string) => {
	AuthStore.regUser({
		username: username,
		password: password,
		repass: password,
		name: username
	})
}

const loginUser = (username: string, password: string) => {
	AuthStore.loginUser({
		username: username,
		password: password,
		repass: password,
		name: username
	})
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
		margin-top: 60px;
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
			}
		}

		button {
			margin-top: 30px;
			height: 40px;
		}
	}
}
</style>
