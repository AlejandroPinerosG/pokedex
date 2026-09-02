import { defineStore } from 'pinia'
import type { PokemonCardData } from '@/services/pokemonService'

export const useFavoritesStore = defineStore('favorites', {
  state: () => ({
    favorites: [] as PokemonCardData[],
  }),
  getters: {
    isFavorite: (state) => (pokemonId: number) =>
      state.favorites.some((favorite) => favorite.id === pokemonId),
  },
  actions: {
    toggleFavorite(pokemon: PokemonCardData) {
      const index = this.favorites.findIndex((favorite) => favorite.id === pokemon.id)

      if (index === -1) {
        this.favorites.push(pokemon)
        return
      }

      this.favorites.splice(index, 1)
    },
  },
})
