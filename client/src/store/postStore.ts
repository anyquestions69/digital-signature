import axios from 'axios'
import { defineStore } from 'pinia'
import { authStore } from './authStore'

const BASE_URL = import.meta.env.VITE_BASE_URL || 'http://localhost:3000/api'

const AuthStore = authStore()
interface Post {
	id: number
	title: string
	filename: string
	delivered?: boolean
	signatures?: Array<Object>
}

interface PostConfig {
	title: string
	file: FormData
}

interface SubscribeConfig {
	id: number
	key: FormData
}

export const postStore = defineStore('postStore', {
	state: () => ({
		postList: [] as Post[],
		post: null,
		status: 'success',
		subscribers: [] as string[]
	}),
	actions: {
		async getPostList() {
			try {
				const postListResponse = await axios.get(`${BASE_URL}/post`)
				this.postList = postListResponse.data
			} catch (error) {
				console.error('Error fetching post list:', error)
			}
		},

		async getPost(id: number) {
			try {
				const postResponse = await axios.get(`${BASE_URL}/post/${id}`)
				this.post = postResponse.data
			} catch (error) {
				console.error('Error fetching post:', error)
			}
		},

		async createPost(postConfig: PostConfig) {
			try {
				const createPostResponse = await axios.post(
					`${BASE_URL}/admin/post`,
					postConfig,
					{
						headers: {
							'Content-Type': 'multipart/form-data'
						}
					}
				)
				console.log('Post created successfully:', createPostResponse.data)
			} catch (error) {
				console.error('Error creating post:', error)
			}
		},

		async subscribePost(subscribeConfig: SubscribeConfig) {
			try {
				const subscribePostResponse = await axios.post(
					`${BASE_URL}/sign/${subscribeConfig.id}`,
					subscribeConfig.key,
					{
						headers: {
							'Content-Type': 'multipart/form-data',
							Authorization: `Bearer ${AuthStore.token}`
						}
					}
				)
				if (subscribePostResponse.data.result === 'failed') {
					this.status = 'failed'
					console.log(subscribePostResponse.data.data)
				} else {
					this.subscribers.push(
						subscribePostResponse.data.signatures.user.username
					)
				}
			} catch (error) {
				console.error('Error subscribing to post:', error)
			}
		}
	},
	getters: {}
})
