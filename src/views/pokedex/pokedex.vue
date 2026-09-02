<template>
  <pokeballLoader v-if="loading" />
  <ErrorHandler v-else-if="error" :errors="error" />
  <template v-else>
    <div class="container p-4">
      <div class="row col-12 d-flex searchContainer align-items-center">
        <div class="col-10 pe-0">
          <span class="typeBadge d-flex w-100">
            <FontAwesomeIcon
              class="icon iconSearch"
              icon="fa-magnifying-glass"
              aria-hidden="true"
            />
            <input
              type="text"
              class="form-control"
              :value="selectedTypesText"
              disabled
              placeholder="Procurar Pókemon..."
              aria-label="filtrar pokémon"
              aria-describedby="addon-wrapping"
            />
          </span>
        </div>
        <div class="col-1 p-0">
          <button
            class="btn btn-outline-dark d-flex align-items-center gap-2"
            type="button"
            @click="filterOpen = true"
          >
            <FontAwesomeIcon
              class="icon iconSearch"
              icon="fa-magnifying-glass"
              aria-hidden="true"
            />
            <span v-if="!isMobile">Filtrar</span>
          </button>
        </div>
        <div  v-if="selectedTypes.length" class="resultsInfo">
          <span class="text-filter"
            >Se han encontrado
            <strong>{{ filteredPokemons.length }} resultados</strong></span
          >

          <button
            class="btn btn-link"
            type="button"
            @click="clearFilters"
          >
            Borrar filtro
          </button>
        </div>
      </div>
    </div>
    <pokemonCard :data="filteredPokemons" />
    <PokemonFilter
      :open="filterOpen"
      :selected-types="selectedTypes"
      @filtrar="applyFilters"
      @cancelar="filterOpen = false"
    />
  </template>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import pokemonCard from '@/components/pokemonCard/pokemonCard.vue'
import pokeballLoader from '@/components/PokeballLoader/pokeballLoader.vue'
import ErrorHandler from '@/components/ErrorHandler/ErrorHandler.vue'
import PokemonFilter from '@/components/PokemonFilter/PokemonFilter.vue'
import { getPokemonPage, type PokemonCardData } from '@/services/pokemonService'
import type { AppError } from '@/services/types/errors'
import { useDevice } from '@/composables/useDevice'
import { getPokemonTypeTheme } from '@/utils/pokemonTypes'

export default defineComponent({
  name: 'pokedex',
  setup() {
    return useDevice()
  },
  components: {
    pokemonCard,
    pokeballLoader,
    ErrorHandler,
    PokemonFilter,
  },
  data() {
    return {
      pokemons: [] as PokemonCardData[],
      nextPage: null as number | null,
      loading: false,
      error: null as AppError | null,
      filterOpen: false,
      selectedTypes: [] as string[],
    }
  },
  computed: {
    selectedTypesText(): string {
      return this.selectedTypes
        .map((type) => {
          const theme = getPokemonTypeTheme(type)
          return theme.label === 'Desconocido' ? type : theme.label
        })
        .join(', ')
    },
    filteredPokemons(): PokemonCardData[] {
      if (this.selectedTypes.length === 0) return this.pokemons

      return this.pokemons.filter((pokemon) =>
        pokemon.types.some((type) => this.selectedTypes.includes(type)),
      )
    },
  },
  async mounted() {
    await this.loadNextPage()
  },
  methods: {
    applyFilters(types: string[]) {
      this.selectedTypes = types
      this.filterOpen = false
    },
    async loadNextPage() {
      this.loading = true
      try {
        const response = await getPokemonPage(0)
        this.pokemons.push(...response.pokemons)
        this.nextPage = Number(response.next)
        console.log('Pokémon data loaded successfully:', response)
      } catch (error) {
        console.error('Error loading Pokémon data:', error)
        this.error = {
          title: 'Algo salió mal...',
          description:
            'No pudimos cargar la información en este momento. Verifica tu conexión o intenta nuevamente más tarde.',
          buttonText: 'Reintentar',
          url: '/home',
        }
      } finally {
        this.loading = false
      }
    },
    clearFilters() {
      this.selectedTypes = [];
    },
  },
})
</script>

<style lang="scss" scoped>
.searchContainer {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.btn-outline-dark {
  border: solid 1px #9e9e9e;
  border-radius: 50px;
  color: #9e9e9e;
  font-weight: 600;
  line-height: 1;
  padding: 9px;
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

.iconSearch {
  color:#9e9e9e;
}

</style>
