<template>
  <section class="regionsHandler">
    <div class="container">
      <div class="col-12">
        <img :src="regionsImage" :alt="regionsImage" class="regionsImage" />
        <h1 class="text-center">
          ¡Muy pronto disponible!
        </h1>
        <p class="text-center regionsDescription">
          Estamos trabajando para traerte esta sección. Vuelve más adelante para descubrir todas las novedades.
        </p>
      </div>
    </div>
  </section>
</template>


<script lang="ts">
import { defineComponent } from 'vue'
import regionsImage from '@/assets/images/regions.png'

export default defineComponent({
  name: 'regions',
  data() {
    return {
      regionsImage,
    }
  },
})
</script>

<style lang="scss" scoped>
.regionsHandler {
  min-height: 100vh;
  padding: 10rem 0.75rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  background-color: #ffffff;
  font-family: 'Poppins', sans-serif;
  text-align: center;
}

.regionsDescription {
    margin: 0;
    color: #666666;
    font-size: 14px;
    line-height: 1.45;
}

.regionsImage {
  width: auto;
  height: 250px;
  margin-bottom: 28px;
}
</style>
