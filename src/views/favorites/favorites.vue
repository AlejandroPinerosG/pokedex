<template>
  <div>
    <pokeballLoader v-if="showLoader" />
    <ErrorHandler v-else-if="noFavorites" :errors="error" />
    <div v-else class="container p-4">
      <div class="row d-flex align-items-center pt-0">
        <div class="col-1">
            <router-link to="/home">
              <FontAwesomeIcon
                class="icon iconFavorite"
                icon="fa-chevron-left"
                aria-hidden="true"
              />
            </router-link>
        </div>
        <div class="col-10 d-flex align-items-center justify-content-center">
          <h2 class="text-btn text-align-center">Favoritos</h2>
        </div>
      </div>
      <pokemonCard :data="favoritesStore.favorites" />
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import pokemonCard from '@/components/pokemonCard/pokemonCard.vue'
import { useFavoritesStore } from '@/stores/favoritesStore'
import pokeballLoader from '@/components/PokeballLoader/pokeballLoader.vue'
import ErrorHandler from '@/components/ErrorHandler/ErrorHandler.vue'
import { type PokemonCardData } from '@/services/pokemonService'

export default defineComponent({
  name: 'favorites',
  setup() {
    return { favoritesStore: useFavoritesStore() }
  },
  components: {
    pokemonCard,
    pokeballLoader,
    ErrorHandler,
  },
  data() {
    return {
      FavoritesPokemons: [] as PokemonCardData[],
      loading: false,
      error: {
        title: 'No has marcado ningún Pokémon como favorito',
        description:
          'Haz clic en el ícono de corazón de tus Pokémon favoritos y aparecerán aquí.',
        buttonText: '',
      },
    }
  },
  computed: {
    showLoader(): boolean {
      return false
    },
    noFavorites(): boolean {
      return this.favoritesStore.favorites.length === 0
    },
  },
  async mounted() {},
  methods: {},
})
</script>

<style lang="scss" scoped>
.searchContainer {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.typeBadge {
  display: inline-flex;
  gap: 0.5rem;
  border: solid 1px #9e9e9e;
  border-radius: 999px;
  color: #9e9e9e;
  font-weight: 600;
  line-height: 1;
  padding: 5px 10px 5px 10px;
  position: relative;
  display: inline-flex;
  align-items: center;
}

.iconFavorite {
  color:#9e9e9e;
}
</style>
