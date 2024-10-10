import { defineStore } from 'pinia'
// import axios from "axios";

// const BASE_URL = import.meta.env.VITE_BASE_URL || 'http://localhost:3000/api'

export const adminStore = defineStore('adminStore', {
	state: () => ({
		id: null, // не передаем 
		username: '',
		nickname: 'Fallen Angel',
		name: 'Дудкин Александр Сергеевич',
		post: 'Зам. нач. кафедры',
		division: '61 кафедра',
		img: '',
		role: 'Guest',
		key: '',
		token: 'xccxcxcxcxc',
		status: ''
	}),
	actions: {
		async getUserList() {
			try {
			} catch (error) {
				console.error(error)
			}
		},
		async getTargetUser() {
			try {
			} catch (error) {
				console.error(error)
			}
		}
	},
	getters: {}
})
