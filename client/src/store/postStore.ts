import axios from 'axios'
import { defineStore } from 'pinia'
import { authStore } from './authStore'

const BASE_URL = import.meta.env.VITE_BASE_URL || 'http://localhost:3000/api'

interface Post {
	id: number
	title: string
	filename: string
	content: string
	date: string
	delivered?: boolean
	signatures: Array<User>
	userId: number
}

interface User {
	hash: string
	user: {
		id: number
		username: string
		name: string
	}
}

interface PostConfig {
	title: string
	file: File
}

interface SubscribeConfig {
	id: number
	key: File
}

export const postStore = defineStore('postStore', {
	state: () => ({
		postList: [] as Post[],
		post: {} as Post,
		status: 'success',
		err: '',
		subscribers: [] as Object[]
	}),

	actions: {
		async getPostList(page: number, limit: number) {
			try {
				const postListResponse = await axios.get(`${BASE_URL}/post`, {
					params: { page: page, limit: limit }
				})
				this.postList = postListResponse.data.data
			} catch (error) {
				console.error('Error fetching post list:', error)
			}
		},

		async getPost(id: number) {
			try {
				const postResponse = await axios.get(`${BASE_URL}/post/${id}`)
				this.post = postResponse.data.data
				this.status = postResponse.data.result
			} catch (error) {
				console.error('Error fetching post:', error)
			}
		},

		async createPost(postConfig: PostConfig) {
			try {
				const formData = new FormData()
				formData.append('title', postConfig.title)
				formData.append('file', postConfig.file)
				const createPostResponse = await axios.post(
					`${BASE_URL}/admin/post`,
					formData,
					{
						headers: {
							Authorization: `Bearer ${authStore().token}`
						}
					}
				)
				if (createPostResponse.data.result === 'failed') {
					this.status = 'failed'
					this.err = createPostResponse.data.data
				} else {
					this.status = 'success'
					this.post = createPostResponse.data.data
				}
			} catch (error) {
				console.error('Error creating post:', error)
			}
		},

		async subscribePost(subscribeConfig: SubscribeConfig) {
			try {
				const formData = new FormData()
				formData.append('file', subscribeConfig.key)
				const subscribePostResponse = await axios.post(
					`${BASE_URL}/sign/${subscribeConfig.id}`,
					formData,
					{
						headers: {
							Authorization: `Bearer ${authStore().token}`
						}
					}
				)
				if (subscribePostResponse.data.result === 'failed') {
					this.status = 'failed'
				} else {
					this.subscribers.push({
						id: subscribePostResponse.data.signatures.user.id,
						name: subscribePostResponse.data.signatures.user.name
					})
					this.status = 'success'
				}
			} catch (error) {
				console.error('Error subscribing to post:', error)
			}
		},

		async deletePost(id: number) {
			try {
				const deletePostResponse = await axios.delete(
					`${BASE_URL}/admin/post/${id}`,
					{
						headers: {
							'Content-Type': 'multipart/form-data',
							Authorization: `Bearer ${authStore().token}`
						}
					}
				)
				if (deletePostResponse.data.result === 'failed') {
					this.status = 'failed'
				} else {
					this.status = 'success'
				}
			} catch (error) {
				console.error('Error deleting post:', error)
			}
		},

		async updatePost(id: number, title: string) {
			try {
				const updatePostResponse = await axios.patch(
					`${BASE_URL}/admin/post/${id}`,
					title,
					{
						headers: {
							'Content-Type': 'multipart/form-data',
							Authorization: `Bearer ${authStore().token}`
						}
					}
				)
				if (updatePostResponse.data.result === 'failed') {
					this.status = 'failed'
					this.err = updatePostResponse.data.data
				} else {
					this.status = 'success'
				}
			} catch (error) {
				console.error('Error updating post:', error)
			}
		},

		checkSig(userId: number) {
			let userExists = false
			if (this.post.signatures)
				userExists = this.post.signatures.some(
					signature => signature.user.id === userId
				)
			return userExists
		},

		sysExit() {
			;(this.postList = [] as Post[]),
				(this.post = {} as Post),
				(this.status = 'success'),
				(this.subscribers = [] as string[])
		}
	},
	getters: {
		getRenderingPosts(): Post[] {
			return this.postList
		}
	}
})
