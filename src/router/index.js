import { createRouter, createWebHistory } from 'vue-router'

import Home from '../views/Home.vue'
import DetailCountry from '../views/DetailCountry.vue'

const router = createRouter({
	history: createWebHistory(),
	routes: [
		{ path: '/', component: Home },
		{ path: '/detail-country/:name', component: DetailCountry },
	],
})

export default router
