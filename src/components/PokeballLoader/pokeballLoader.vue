<template>
  <div class="pokeball-loader">
    <img
      :src="img"
      alt="Pokéball"
      class="loading-pokeball"
    />
  </div>
</template>

<script>
import pokeballImage from '@/assets/images/pokeball.png'

export default {
  name: 'pokeballLoader',
  data() {
    return {
      img: pokeballImage,
    }
  },
}
</script>

<style scoped>
.pokeball-loader {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.loading-pokeball {
  width: 300px;
  height: 300px;
  animation: rotate3d 1.5s ease-in-out infinite;
}

@media (max-width: 768px) {
  .loading-pokeball {
    width: 155px;
    height: 155px;
  }
}

@keyframes rotate3d {
  0% {
    transform: rotateY(0deg);
  }

  50% {
    transform: rotateY(180deg);
  }

  100% {
    transform: rotateY(360deg);
  }
}
</style>
