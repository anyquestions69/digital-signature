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
			path: '/auth',
			name: 'AuthPage',
			meta: {
				title: 'Авторизация',
				needAuth: false
			},
			component: AuthPage
		},
		{
			path: '/documents',
			name: 'DocumentsPage',
			meta: {
				title: 'Список приказов',
				needAuth: true
			},
			component: DocumentsPage
		},
		{
			path: '/document/:id',
			name: 'PdfPage',
			meta: {
				title: 'Приказ',
				needAuth: true
			},
			component: PdfPage
		},
		{
			path: '/client',
			name: 'ClientPage',
			meta: {
				title: 'Личный кабинет',
				needAuth: true
			},
			component: ClientPage
		}
	]
})

router.beforeEach(
	(to: RouteLocationNormalized, _from: RouteLocationNormalized, next) => {
		document.title = to.meta.title ? String(to.meta.title) : 'Ошибка'
		next()
	}
)

export default router
