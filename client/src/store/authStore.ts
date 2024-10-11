import axios from 'axios'
import { defineStore } from 'pinia'

const BASE_URL = import.meta.env.VITE_BASE_URL || 'http://localhost:3000/api'

interface RegConfig {
	username: string
	password: string
	repass: string
	name: string
	job: string
	division: string
}

interface LogConfig {
	username: string
	password: string
}

interface EditConfig {
	name: string
	post: string
	division: string
}

export const authStore = defineStore('authStore', {
	state: () => ({
		id: 0, 
		username: '',
		name: '', 
		role: 'Guest',
		post: '', 
		division: '', 
		key: '', 
		token: '', 
		status: '', 
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
				} else {
					this.key = regResponse.data.key
					this.token = regResponse.data.token
					this.status = 'success'
					this.username = regConfig.username
					this.name = regConfig.name
					this.id = regResponse.data.data.id
				}

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
					this.id = logResponse.data.data.id
					await this.getUser(this.id)
				}
			} catch (err: any) {
				console.info(`Unexpected error: ${err.message}`)
			}
		},

		async getUser(id: number) {
			try {
				const userResponse = await axios.get(
					`${BASE_URL}/user/${id}`
				)

				if (userResponse.data.result === 'failed') {
					this.status = 'failed'
				} else {
					this.username = userResponse.data.username
					this.name = userResponse.data.name
					this.role = userResponse.data.role
					this.post = userResponse.data.job
					this.division = userResponse.data.division
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

		async editPersInfo(editConfig: EditConfig) {
			try {
				if (!this.id) {
					this.status = 'failed'
					console.error('Пользователь не зарегистрирован')
				}
				const editData = {
					name: editConfig.name,
					job: editConfig.post,
					division: editConfig.division
				}
				const editResponse = await axios.put(
					`${BASE_URL}/admin/user/${this.id}`,
					editData,
					{
						headers: {
							Authorization: `Bearer ${this.token}`
						}
					}
				)
				if ((editResponse.data.result = 'success')) {
					this.name = editConfig.name
					this.post = editConfig.post
					this.division = editConfig.division
					this.status = 'success'
				} else {
					this.status = 'failed'
					console.error('Ошибка при обновлении данных пользователя')
				}
			} catch (error) {
				console.error('Ошибка изменения информации пользователя:', error)
			}
		},

		 async getChief(id:number) {
			const userResponse = await axios.get(
				`${BASE_URL}/user/${id}`
			)
			return userResponse.data.name
		},
		
		sysExit() {
			this.id = 0
			this.username = ''
			this.name = ''
			this.role = 'Guest'
			this.key = ''
			this.token = ''
			this.status = ''
			this.post = ''
			this.division = ''
		}
	},
	getters: {}
})
