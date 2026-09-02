<template>
  <section class="pokemonCard">
    <div class="container">
      <div class="row g-3">
        <div v-for="pokemon in data" :key="pokemon.id" class="col-12 col-md-6 col-lg-4">
          <div
            class="CardContainer row g-0 h-100"
            :style="{
              '--type-color': getPokemonTypeTheme(pokemon.types[0]).CardContainer,
            }"
            @click="goToDetail(pokemon.id)"
          >
            <div class="col-8 py-3">
              <h4 class="secondary-text">No{{ formatPokemonId(pokemon.id) }}</h4>
              <h2 class="primary-text">{{ pokemon.name }}</h2>
              <div class="pokemonTypes">
                <span
                  v-for="(type, typeIndex) in pokemon.types"
                  :key="typeIndex"
                  class="typeBadge"
                  :style="{ '--type-color': getPokemonTypeTheme(type).color }"
                >
                  <FontAwesomeIcon
                    class="icon iconType"
                    :icon="getPokemonTypeTheme(type).icon"
                    aria-hidden="true"
                  />
                  {{ getPokemonTypeTheme(type).label }}
                </span>
              </div>
            </div>
            <div
              class="imageContainer col-4 position-relative overflow-hidden d-flex align-items-center justify-content-center p-3"
              :style="{
                '--type-color': getPokemonTypeTheme(pokemon.types[0]).imageContainer,
              }"
            >
              <button
                class="favoriteButton position-absolute top-0 end-0 m-2 d-inline-flex align-items-center justify-content-center"
                :class="{ 'is-favorite': favoritesStore.isFavorite(pokemon.id) }"
                type="button"
                @click="favoritesStore.toggleFavorite(pokemon)"
              >
                <FontAwesomeIcon class="iconFavorite" icon="heart" aria-hidden="true" />
              </button>
              <img
                class="pokemonImage w-100 h-100 object-fit-contain"
                :src="pokemon.image ?? undefined"
                :alt="pokemon.name"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script lang="ts">
import { defineComponent, type PropType } from 'vue'
import type { PokemonCardData } from '@/services/pokemonService'
import { getPokemonTypeTheme } from '@/utils/pokemonTypes'
import { formatPokemonId } from '@/utils/formatPokemonId'
import { useFavoritesStore } from '@/stores/favoritesStore'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'pokemonCard',
  setup() {
    return { favoritesStore: useFavoritesStore(), router: useRouter() }
  },
  props: {
    data: {
      type: Array as PropType<PokemonCardData[]>,
      required: true,
    },
  },
  methods: {
    formatPokemonId(id: number) {
      return formatPokemonId(id)
    },
    getPokemonTypeTheme(type: string) {
      return getPokemonTypeTheme(type)
    },
    goToDetail(id: number) {
      this.router.push({ name: 'pokemon-detail', params: { id } })
    },
  },
})
</script>

<style lang="scss" scoped>
.CardContainer {
  background-color: var(--type-color);
  width: 100%;
  border-radius: 16px;
  justify-content: space-between;
  padding-left: 16px;
}

.imageContainer {
  background-color: var(--type-color);
  aspect-ratio: 1 / 1;
  border-radius: 16px;
}

.iconType {
  color: var(--type-color);
}

.favoriteButton {
  z-index: 2;
  width: 32px;
  height: 32px;
  padding: 0;
  border: 3px solid #ffffff;
  border-radius: 50%;
  background-color: rgba(23, 23, 23, 0.14);
  color: #ffffff;
  font-size: 38px;
}

.favoriteButton.is-favorite {
  background-color: #ffffff;
  color: #e53935;
}

.favoriteButton.is-favorite .iconFavorite {
  color: #e53935;
}

.iconFavorite {
  height: 16px;
  width: 16px;
  color: #ffffff;
  font-size: 38px;
}

.pokemonImage {
  z-index: 1;
  object-fit: contain;
}
</style>
