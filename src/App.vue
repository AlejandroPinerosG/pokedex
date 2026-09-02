<template>
  <router-view />
    <pokemonMenu
      :is-mobile="isMobile"
    />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useDevice } from '@/composables/useDevice'
import pokemonMenu from '@/components/menu/pokemonMenu.vue'

export default defineComponent({
  name: 'App',
  setup() {
    return useDevice()
  },
  components: {
    pokemonMenu,
  },
  data() {
    return {
    }
  },
  computed: {
  },
  async mounted() {
  },
  methods: {
  },
})
</script>

<style lang="scss">
</style>
