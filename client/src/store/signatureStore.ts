import { defineStore } from 'pinia'
// import axios from "axios";
import dotenv from 'dotenv'

dotenv.config({ path: '.env' })
// const BASE_URL = process.env.BASE_URL || "http://localhost:3000/api"

export const signatureStore = defineStore('signatureStore', {
	state: () => ({}),
	actions: {
		async subscribeSignature() {
			try {
			} catch (error) {
				console.error(error)
			}
		},
		async checkSignature() {
			try {
			} catch (error) {
				console.error(error)
			}
		}
	},
	getters: {}
})
