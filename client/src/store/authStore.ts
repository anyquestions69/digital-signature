import axios from 'axios'
import { defineStore } from 'pinia'

const BASE_URL = import.meta.env.VITE_BASE_URL || 'http://localhost:3000/api'

interface RegConfig {
	username: string
	password: string
	repass: string
	name: string
}

interface LogConfig {
	username: string
	password: string
}

interface UserConfig {
	access_token: string
}

interface EditConfig {
	name: string,
	post: string,
	division: string
}

export const authStore = defineStore('authStore', {
	state: () => ({
		// конфиг при регистрации
		username: '',
		name: 'Неизвестно', // передаем надо добавить в AuthForm ввод имени

		role: 'Guest',

		post: 'Неизвестно', // не передаем а надо завтра вместе надо решить по какой логике это делать типа при редактировании лк или регистрации
		division: 'Неизвестно', // тоже самое

		key: '', // получаем
		token: '', // получаем
		status: '', // получаем

		id: null, // не передаем
		img: '' // не передаем
	}),

	actions: {
		async regUser(regConfig: RegConfig) {
			try {
				const regResponse = await axios.post(
					BASE_URL + '/auth/register',
					regConfig
				)

				if (regResponse.data.result === 'failed') {
					this.status = 'failed'
					console.log(regResponse.data.data)
				} else {
					this.key = regResponse.data.key
					this.token = regResponse.data.token
					this.status = 'success'
					this.username = regConfig.username
					this.name = regConfig.name
				}

				// TODO:
				// убрать логи
				console.log(this.key)
				console.log('---------------------------')
				console.log(this.token)
				console.log('---------------------------')
				console.log(this.status)
			} catch (err: any) {
				console.info(`Unexpected error: ${err.message}`)
			}
		},

		async loginUser(logConfig: LogConfig) {
			try {
				const logResponse = await axios.post(
					BASE_URL + '/auth/login',
					logConfig
				)

				if (logResponse.data.result === 'failed') {
					this.status = 'failed'
					console.log(logResponse.data.data)
				} else {
					this.token = logResponse.data.access_token
					this.status = 'success'
					this.username = logConfig.username
				}
				// TODO:
				// убрать логи
				console.log(this.token)
				console.log('---------------------------')
				console.log(this.status)
			} catch (err: any) {
				console.info(`Unexpected error: ${err.message}`)
			}
		},

		async getUser(userConfig: UserConfig) {
			try {
				const userResponse = await axios.post(
					BASE_URL + '/auth/profile',
					userConfig
				)

				if (userResponse.data.result === 'failed') {
					this.status = 'failed'
					console.log(userResponse.data.data)
				} else {
					this.username = userResponse.data.username
					this.name = userResponse.data.name
					this.role = userResponse.data.role
					this.status = 'success'
				}
			} catch (error: unknown) {
				if (error instanceof Error) {
					console.info(error.message)
				} else {
					console.error('Неизвестная ошибка:', error)
				}
			}
		},

		async editPersInfo( editConfig: EditConfig ) {
			try {
				this.name = editConfig.name
				this.post = editConfig.post
				this.division = editConfig.division
			} catch ( error ) {
				console.error('Ошибка изменения информации пользователя:', error)
			}
		},

		sysExit() {
			this.id = null
			this.username = ''
			this.name = ''
			this.role = 'Guest'
			this.key = ''
			this.token = ''
			this.status = ''
		}
	},
	getters: {}
})
