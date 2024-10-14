import axios from 'axios'
import { defineStore } from 'pinia'
import { authStore } from './authStore'
import { pagesStore } from './pagesStore'

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
		subscribers: [] as Object[],
		scroll: false
	}),

	actions: {
		async getPostList(page: number, limit: number) {
			try {
				const postListResponse = await axios.get(`${BASE_URL}/post`, {
					params: { page: page, limit: limit }
				})
				if (postListResponse.data.result === 'failed') {
					this.status = 'failed'
					this.err = postListResponse.data.data
				} else {
					this.status = 'success'
					this.postList = postListResponse.data.data
					this.scroll = postListResponse.data.scroll
				}
				
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
				(this.subscribers = [] as string[]),
				(this.scroll = false)
		},
		parseDate( dateString: string ) : Date {
			const [day, month, year] = dateString.split('.').map(Number);
			return new Date(year, month - 1, day);
		}
	},
	getters: {
		getRenderingPosts(): Post[] {
			var PostList = this.postList

			if( pagesStore().docPage.selectedValue === '0' ) {
				//сортировка по наименованию
				PostList = PostList.sort( (a, b) => a.title.localeCompare(b.title) )
			} else if ( pagesStore().docPage.selectedValue === '1' ) {
				//сортировка по должностному лицу
				PostList = PostList.sort( (a, b) => a.userId - b.userId )
			} else {
				//Сортировка по дате
				PostList = PostList.sort( (a, b) => new Date( b.date ).getTime() - new Date( a.date ).getTime() )
			}

			if ( pagesStore().docPage.searchValue ) {
				return PostList.filter( elem => elem.title.toLowerCase().includes( pagesStore().docPage.searchValue.toLowerCase() )
										 || elem.date.toLowerCase().includes( pagesStore().docPage.searchValue.toLowerCase() )
										 || elem.date.toLowerCase().includes( pagesStore().docPage.searchValue.toLowerCase() ) )
			}
			
			return PostList

		}
	}
})
