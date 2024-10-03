import axios from 'axios'
import dotenv from 'dotenv'
import { defineStore } from 'pinia'

dotenv.config({ path: '.env' })
const BASE_URL = process.env.BASE_URL || 'http://localhost:3000/api'

interface AuthConfig {
	username: string
	password: string
}

export const authStore = defineStore('authStore', {
	state: () => ({
		id: null,
		username: null,
		phone: null,
		role: 'Guest'
	}),
	actions: {
		async regUser(regConfig: AuthConfig): Promise<any> {
			try {
				const regRespose = await axios.post(
					BASE_URL + '/auth/register',
					regConfig
				)
				console.table({ regConfig, regRespose })
				if (!regRespose) {
					throw new Error('Registration failed')
				}
			} catch (err) {
				console.error(err)
			}
		},
		async loginUser(logConfig: AuthConfig): Promise<any> {
			try {
				const logRespose = await axios.post(BASE_URL + 'auth/login', logConfig)
				if (!logRespose) {
					throw new Error('Login failed')
				}
			} catch (error) {
				console.error(error)
			}
		},
		async getUser(userConfig: any): Promise<any> {
			try {
				const userRespose = await axios.post(
					BASE_URL + 'auth/profile',
					userConfig
				)
				if (!userRespose) {
					throw new Error('Failed to get user config')
				}
			} catch (error) {
				console.error(error)
			}
		}
	},
	getters: {}
})
