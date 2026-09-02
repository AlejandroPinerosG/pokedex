<template>
  <pokeballLoader v-if="loading" />
  <ErrorHandler v-else-if="error" :errors="error" />
  <main v-else-if="pokemon" class="pokemonDetail">
    <section
      class="pokemon"
      :style="{ '--pokemonColor': getPokemonTypeTheme(pokemon.types[0]).color }"
    >
      <RouterLink class="backButton" to="/home">
        <FontAwesomeIcon icon="fa-chevron-left" aria-hidden="true" /> </RouterLink
      >|
      <button
        class="pokemonFavorite"
        :class="{ active: favoritesStore.isFavorite(pokemon.id) }"
        type="button"
        @click="favoritesStore.toggleFavorite(pokemon)"
      >
        <FontAwesomeIcon icon="heart" aria-hidden="true" />
      </button>
      <img class="pokemonImage" :src="pokemon.image ?? undefined" :alt="pokemon.name" />
    </section>

    <section class="detailContent">
      <h1 class="pokemonName">{{ pokemon.name }}</h1>
      <p class="pokemonNumber">N.º{{ formatPokemonId(pokemon.id) }}</p>
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
      <p class="pokemonDescription mt-3">{{ pokemon.description }}</p>

      <div class="statsGrid">
        <div>
          <span class="statText">
            <FontAwesomeIcon class="pe-2" icon="fa-weight-hanging" aria-hidden="true" />
            Peso
          </span>
          <div class="statCard">
            <span class="statData">{{ pokemon.weight }}</span>
          </div>
        </div>
        <div>
          <span class="statText">
            <FontAwesomeIcon class="pe-2" icon="fa-ruler-vertical" aria-hidden="true" />
            Altura
          </span>
          <div class="statCard">
            <span class="statData">{{ pokemon.height }}</span>
          </div>
        </div>
        <div>
          <span class="statText">
            <FontAwesomeIcon
              class="pe-2"
              icon="fa-table-cells-large"
              aria-hidden="true"
            />
            Categoría
          </span>
          <div class="statCard">
            <span class="statData">{{ pokemon.category }}</span>
          </div>
        </div>
        <div>
          <span class="statText">
            <FontAwesomeIcon class="pe-2" icon="fa-circle-dot" aria-hidden="true" />
            Habilidad
          </span>
          <div class="statCard">
            <span class="statData">{{ pokemon.ability }}</span>
          </div>
        </div>
      </div>

      <section v-if="pokemon.maleRate !== null" class="genderSection">
        <span class="statText">Género</span>
        <div class="genderBar" :style="{ '--male-rate': `${pokemon.maleRate}%` }"></div>
        <div class="genderValues">
          <span><FontAwesomeIcon class="pe-2" icon="fa-mars" aria-hidden="true" /> {{ pokemon.maleRate }}%</span>
          <span><FontAwesomeIcon class="pe-2" icon="fa-venus" aria-hidden="true" /> {{ pokemon.femaleRate }}%</span>
        </div>
      </section>

      <section class="weakness-section">
        <h2 class="statData mb-3">Debilidades</h2>
      <div class="pokemonTypes">
        <span
          v-for="(weakness, weaknessIndex) in pokemon.weaknesses"
          :key="weaknessIndex"
          class="typeBadge"
          :style="{ '--type-color': getPokemonTypeWeakness(weakness).color }"
        >
          <FontAwesomeIcon
            class="icon iconType"
            :icon="getPokemonTypeWeakness(weakness).icon"
            aria-hidden="true"
          />
          {{ getPokemonTypeWeakness(weakness).label }}
        </span>
      </div>
      </section>
    </section>
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRoute } from 'vue-router'
import pokeballLoader from '@/components/PokeballLoader/pokeballLoader.vue'
import ErrorHandler from '@/components/ErrorHandler/ErrorHandler.vue'
import { getPokemonDetails, type PokemonDetailData } from '@/services/pokemonService'
import type { AppError } from '@/services/types/errors'
import { formatPokemonId } from '@/utils/formatPokemonId'
import { getPokemonTypeWeakness } from '@/utils/pokemonWeakness'
import { getPokemonTypeTheme } from '@/utils/pokemonTypes'
import { useFavoritesStore } from '@/stores/favoritesStore'

export default defineComponent({
  name: 'pokemonDetail',
  components: { pokeballLoader, ErrorHandler },
  setup() {
    return { route: useRoute(), favoritesStore: useFavoritesStore() }
  },
  data() {
    return {
      loading: true,
      pokemon: null as PokemonDetailData | null,
      error: null as AppError | null,
    }
  },
  async mounted() {
    const id = Number(this.route.params.id)
    if (!Number.isInteger(id) || id < 1) {
      this.error = {
        title: 'Pokémon no encontrado',
        description: 'El identificador no es válido.',
        buttonText: 'Volver',
        url: '/home',
      }
      this.loading = false
      return
    }

    try {
      this.pokemon = await getPokemonDetails(id)
    } catch {
      this.error = {
        title: 'No pudimos cargar este Pokémon',
        description: 'Inténtalo de nuevo más tarde.',
        buttonText: 'Volver',
        url: '/home',
      }
    } finally {
      this.loading = false
    }
  },
  methods: {
    formatPokemonId,
    getPokemonTypeTheme,
    getPokemonTypeWeakness,
  },
})
</script>

<style lang="scss" scoped>
.pokemonDetail {
  min-height: 100vh;
  background: #fff;
}
.pokemon {
  position: relative;
  height: 260px;
  overflow: hidden;
  background: var(--pokemonColor);
  border-radius: 0 0 52% 52%;
}
.pokemon::after {
  position: absolute;
  width: 270px;
  height: 270px;
  top: 28px;
  left: 50%;
  border-radius: 50%;
  background: rgb(255 255 255 / 24%);
  content: '';
  transform: translateX(-50%);
}
.pokemonImage {
  position: absolute;
  z-index: 1;
  bottom: 8px;
  left: 50%;
  width: 210px;
  height: 210px;
  object-fit: contain;
  transform: translateX(-50%);
}
.backButton,
.pokemonFavorite {
  position: absolute;
  z-index: 2;
  top: 20px;
  color: #fff;
  font-size: 22px;
}
.backButton {
  left: 20px;
}
.pokemonFavorite {
  right: 20px;
  border: 0;
  background: transparent;
}
.pokemonFavorite.active {
  color: #e53935;
}
.detailContent {
  max-width: 620px;
  margin: 0 auto;
  padding: 22px 20px 36px;
}

.pokemonNumber {
  font-family: Poppins;
  font-weight: 500;
  font-style: Medium;
  font-size: 16px;
  line-height: 100%;
  letter-spacing: 0%;
  color: #424242;
}

.pokemonName {
  font-family: Poppins;
  font-weight: 500;
  font-style: Medium;
  font-size: 32px;
  line-height: 100%;
  letter-spacing: 0%;
  color: #121212;
}

.iconType {
  color: var(--type-color);
}

.type-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
.type-pill {
  border-radius: 999px;
  background: var(--type-color, #6c757d);
  color: #fff;
  padding: 5px 12px;
  font-size: 13px;
  font-weight: 600;
}
.description {
  font-family: Poppins;
  font-weight: 400;
  font-style: Regular;
  font-size: 14px;
  line-height: 145%;
  letter-spacing: 0%;
  color: #424242;
}

.statText {
  font-family: Poppins;
  font-weight: 500;
  font-style: Medium;
  font-size: 12px;
  line-height: 100%;
  letter-spacing: 5%;
  text-transform: uppercase;
  color: #424242;
}

.statData {
  font-family: Poppins;
  font-weight: 500;
  font-style: Medium;
  font-size: 18px;
  line-height: 100%;
  letter-spacing: 0%;
  color: #121212;
}

.statsGrid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}
.statCard {
  border: 1px solid #e3e3e3;
  border-radius: 12px;
  padding: 10px;
  text-align: center;
}

.genderSection > span {
  display: block;
  color: #555;
  font-size: 10px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}
.statCard strong {
  display: block;
  margin-top: 5px;
  font-size: 15px;
  text-transform: capitalize;
}
.genderSection {
  margin-top: 20px;
  text-align: center;
}
.genderBar {
  height: 5px;
  margin-top: 8px;
  border-radius: 5px;
  background: linear-gradient(
    to right,
    #2551C3 0 var(--male-rate),
    #FF7596 var(--male-rate) 100%
  );
}
.genderValues {
  display: flex;
  justify-content: space-between;
  margin-top: 6px;
  font-size: 12px;
}
.weakness-section {
  margin-top: 28px;
}
.weakness-section h2 {
  font-size: 17px;
}
.weakness-pill {
  background: #6c757d;
  text-transform: capitalize;
}
</style>
