<template>
  <div v-if="open" class="filterBackdrop" @click.self="cancelar">
    <aside class="filterPanel" aria-labelledby="filterTitle">
      <div class="d-flex align-items-center justify-content-between p-3">
        <button
        class="btn-close"
        type="button"
        aria-label="Cerrar filtros"
        @click="cancelar"
        ></button>
      </div>
      <header class="d-flex align-items-center justify-content-center pt-0">
        <h2 class="text-btn text-align-center">Filtra por tus preferencias</h2>
      </header>

      <div class="filterSection">
        <div
          class="d-flex align-items-center justify-content-between border-bottom pb-3 mb-2"
        >
          <h3 class="filterSubtitle mb-0">Tipo</h3>
          <FontAwesomeIcon icon="chevron-up" aria-hidden="true" />
        </div>

        <div class="filterOptions">
          <label v-for="type in types" :key="type.value" class="filterOption">
            <span class="textOption">{{ type.label }}</span>
            <input
              v-model="draftTypes"
              class="form-check-input m-0"
              type="checkbox"
              :value="type.value"
            />
          </label>
        </div>
      </div>

      <footer class="filterActions d-grid gap-2">
        <button class="btn btn-primary text-btn  py-2" type="button" @click="filtrar">
          Aplicar
        </button>
        <button class="btn btn-light text-btn py-2" type="button" @click="cancelar">
          Cancelar
        </button>
      </footer>
    </aside>
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue'

const TYPES = [
  { value: 'bug', label: 'Bicho' },
  { value: 'dark', label: 'Siniestro' },
  { value: 'dragon', label: 'Dragón' },
  { value: 'electric', label: 'Eléctrico' },
  { value: 'fairy', label: 'Hada' },
  { value: 'fighting', label: 'Lucha' },
  { value: 'fire', label: 'Fuego' },
  { value: 'flying', label: 'Volador' },
  { value: 'ghost', label: 'Fantasma' },
  { value: 'grass', label: 'Planta' },
  { value: 'ground', label: 'Tierra' },
  { value: 'ice', label: 'Hielo' },
  { value: 'normal', label: 'Normal' },
  { value: 'poison', label: 'Veneno' },
  { value: 'psychic', label: 'Psíquico' },
  { value: 'rock', label: 'Roca' },
  { value: 'steel', label: 'Acero' },
  { value: 'water', label: 'Agua' },
]

export default defineComponent({
  name: 'PokemonFilter',
  props: {
    open: {
      type: Boolean,
      required: true,
    },
    selectedTypes: {
      type: Array as PropType<string[]>,
      default: () => [],
    },
  },
  emits: ['filtrar', 'cancelar'],
  data() {
    return {
      draftTypes: [...this.selectedTypes],
      types: TYPES,
    }
  },
  watch: {
    open(isOpen: boolean) {
      if (isOpen) this.draftTypes = [...this.selectedTypes]
    },
  },
  methods: {
    filtrar() {
      this.$emit('filtrar', this.draftTypes)
    },
    cancelar() {
      this.$emit('cancelar')
    },
  },
})
</script>

<style lang="scss" scoped>
.filterBackdrop {
  position: fixed;
  z-index: 1050;
  inset: 0;
  display: flex;
  align-items: flex-end;
  background-color: rgba(0, 0, 0, 0.72);
}

.filterPanel {
  display: flex;
  width: 100%;
  max-height: min(80dvh, 720px);
  flex-direction: column;
  border-radius: 24px 24px 0 0;
  background: #ffffff;
}

.filterPanel > header,
.filterSection {
  padding: 24px 20px 0;
}

.filterSection {
  display: flex;
  min-height: 0;
  flex: 1;
  flex-direction: column;
}

.filterSubtitle {
  font-family: Poppins;
  font-weight: 600;
  font-style: SemiBold;
  font-size: 16px;
  line-height: 100%;
  letter-spacing: 0%;
}

.filterOptions {
  min-height: 0;
  flex: 1;
  overflow-y: auto;
  padding-bottom: 12px;
}

.textOption {
font-family: Poppins;
  font-weight: 500;
  font-style: Medium;
  font-size: 14px;
  line-height: 100%;
  letter-spacing: 0%;
  color: #424242;
}

.filterOption {
  display: flex;
  min-height: 38px;
  align-items: center;
  justify-content: space-between;
  color: #4d4d4d;
  cursor: pointer;
  padding-right: 1rem;
}

.filterActions {
  margin-top: auto;
  padding: 20px;
  border-top: 1px solid #e9e9e9;
}

@media (min-width: 768px) {
  .filterBackdrop {
    align-items: stretch;
    justify-content: flex-end;
  }

  .filterPanel {
    width: 360px;
    max-height: none;
    border-radius: 0;
  }
}
</style>
