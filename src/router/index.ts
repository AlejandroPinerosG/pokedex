import { createRouter, createWebHistory } from 'vue-router'
import { Onboarding } from '@/views/index.ts'
import pokedex from '@/views/pokedex/pokedex.vue'
import regions from '@/views/regions/regions.vue'
import favorites from '@/views/favorites/favorites.vue'
import pokemonDetail from '@/views/pokemonDetail/pokemonDetail.vue'

const router = createRouter({
	history: createWebHistory(),
	routes: [
		{
			path: '/',
			redirect: '/home',
		},
		{
			path: '/onboarding',
			name: 'onboarding',
			component: Onboarding,
		},
		{
			path: '/home',
			name: 'home',
			component: pokedex,
		},
		{
			path: '/regions',
			name: 'regions',
			component: regions,
		},
		{
			path: '/favorites',
			name: 'favorites',
			component: favorites,
		},
		{
			path: '/pokemon/:id',
			name: 'pokemon-detail',
			component: pokemonDetail,
		},
	],
})

router.beforeEach((to) => {
	const isOnboardingWatched = sessionStorage.getItem('onboardingWatched') === 'true'

	if (to.path === '/onboarding' && isOnboardingWatched) {
		return '/home'
	}

	if (to.path !== '/onboarding' && !isOnboardingWatched) {
		return '/onboarding'
	}

	return true
})

export default router
