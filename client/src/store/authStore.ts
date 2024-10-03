import axios from 'axios'
import { defineStore } from 'pinia'

const BASE_URL = import.meta.env.VITE_BASE_URL || 'http://localhost:3000/api'

interface AuthConfig {
	username: string
	password: string
	repass: string
	name: string
}

export const authStore = defineStore('authStore', {
	state: () => ({
		id: null,
		username: '',
		name: '',
		role: 'Guest',
		key: '',
		token: ''
	}),
	actions: {
		async regUser(
			regConfig: AuthConfig
		): Promise<{ success: boolean; message?: string; key?: string }> {
			try {
				const regResponse = await axios.post(
					BASE_URL + '/auth/register',
					regConfig
				)

				if (!regResponse || regResponse.status !== 201) {
					console.log(regResponse)
					throw new Error('Registration failed')
				}
				this.key = regResponse.data
				return {
					success: true,
					message: 'Registration successful',
					key: regResponse.data
				}
			} catch (err: unknown) {
				if (err instanceof Error) {
					console.error(err.message)
					return {
						success: false,
						message: err.message || 'Registration failed'
					}
				} else {
					console.error('Неизвестная ошибка:', err)
					return { success: false, message: 'Unknown error occurred' }
				}
			}
		},
		async loginUser(
			logConfig: AuthConfig
		): Promise<{ success: boolean; message?: string; token?: string }> {
			try {
				const logResponse = await axios.post(BASE_URL + 'auth/login', logConfig)

				if (!logResponse || !logResponse.data.success) {
					throw new Error('Login failed')
				}

				return { success: true, message: 'Login successful' }
			} catch (error: unknown) {
				if (error instanceof Error) {
					console.error(error.message)
					return { success: false, message: error.message || 'Login failed' }
				} else {
					console.error('Неизвестная ошибка:', error)
					return { success: false, message: 'Unknown error occurred' }
				}
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
