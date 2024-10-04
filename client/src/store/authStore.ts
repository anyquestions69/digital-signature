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

export const authStore = defineStore('authStore', {
	state: () => ({
		id: null,
		username: '',
		name: '',
		role: 'Guest',
		key: '',
		token: '',
		status: ''
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
		async getUser(
			userConfig: any
		): Promise<{ success: boolean; message?: string }> {
			try {
				const userResponse = await axios.post(
					BASE_URL + 'auth/profile',
					userConfig
				)

				if (!userResponse || !userResponse.data.success) {
					throw new Error('Failed to get user config')
				}

				return { success: true, message: 'User info retrieved successfully' }
			} catch (error: unknown) {
				if (error instanceof Error) {
					console.error(error.message)
					return {
						success: false,
						message: error.message || 'Failed to get user config'
					}
				} else {
					console.error('Неизвестная ошибка:', error)
					return { success: false, message: 'Unknown error occurred' }
				}
			}
		}
	},
	getters: {}
})
