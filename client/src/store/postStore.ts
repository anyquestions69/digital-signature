import axios from 'axios'
import { defineStore } from 'pinia'
import { authStore } from './authStore'

const BASE_URL = import.meta.env.VITE_BASE_URL || 'http://localhost:3000/api'

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
							'Content-Type': 'multipart/form-data',
							Authorization: `Bearer ${authStore().token}`
						}
					}
				)
				if (createPostResponse.data.result === 'failed') {
					this.status = 'failed'
					console.log(createPostResponse.data.data)
				} else {
					this.status = 'success'
					this.post = createPostResponse.data.data

					//TODO:
					// убрать логи
					console.log(this.status)
					console.log('----------------------------------')
					console.log(this.post)
				}
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
							Authorization: `Bearer ${authStore().token}`
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
					console.log(deletePostResponse.data.data)
				} else {
					this.status = 'success'
				}
				console.log('Post deleted successfully:', deletePostResponse.data)
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
					console.log(updatePostResponse.data.data)
				} else {
					this.status = 'success'
				}
				console.log('Post updated successfully:', updatePostResponse.data)
			} catch (error) {
				console.error('Error updating post:', error)
			}
		}
	},
	getters: {}
})
