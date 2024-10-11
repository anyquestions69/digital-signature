import {
	createRouter,
	createWebHashHistory,
	RouteLocationNormalized
} from 'vue-router'

import AuthPage from '../pages/AuthPage.vue'
import ClientPage from '../pages/ClientPage.vue'
import DocumentsPage from '../pages/DocumentsPage.vue'
import InfoPage from '../pages/InfoPage.vue'
import PdfPage from '../pages/PdfPage.vue'

import { authStore } from '../store/authStore'


const router = createRouter({
	history: createWebHashHistory(),
	routes: [
		{
			path: '/info',
			alias: '/',
			name: 'InfoPage',
			meta: {
				title: 'Главная',
				needAuth: false
			},
			component: InfoPage
		},
		{
			path: '/api/auth',
			name: 'AuthPage',
			meta: {
				title: 'Авторизация',
				needAuth: false
			},
			component: AuthPage
		},
		{
			path: '/client',
			name: 'ClientPage',
			meta: {
				title: 'Личный кабинет',
				needAuth: true
			},
			component: ClientPage
		},
		{
			path: '/client/documents',
			name: 'DocumentsPage',
			meta: {
				title: 'Список приказов',
				needAuth: true
			},
			component: DocumentsPage
		},
		{
			path: '/client/documents/:id',
			name: 'PdfPage',
			meta: {
				title: 'Приказ',
				needAuth: true
			},
			component: PdfPage
		}
	]
})

router.beforeEach(
	(to: RouteLocationNormalized, _from: RouteLocationNormalized, next) => {
		document.title = to.meta.title ? String(to.meta.title) : 'Ошибка'

		if( to.meta.needAuth ) {

			if( authStore().token ) {
				next()
			} else {
				next({ path: '/api/auth' })
			}

		} else {
			next()
		}
	}
)

export default router
