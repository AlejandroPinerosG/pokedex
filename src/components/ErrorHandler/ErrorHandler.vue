<template>
  <section class="errorHandler">
    <div class="container">
      <div class="col-12">
        <img :src="errorImage" :alt="errorImage" class="errorImage" />
        <h1 class="text-center">
          {{ errors?.title }}
        </h1>
        <p class="text-center errorDescription">
          {{ errors?.description }}
        </p>
        <button v-if="errors?.buttonText" type="button" class="btn btn-primary mt-3" @click="goToHome">
          {{ errors?.buttonText }}
        </button>
      </div>
    </div>
  </section>
</template>


<script lang="ts">
import { defineComponent, PropType } from 'vue'
import errorImage from '@/assets/images/error.png'
import { AppError } from '@/services/types/errors'

export default defineComponent({
  name: 'errorHandler',
  data() {
    return {
      errorImage,
    }
  },
  props: {
    errors: {
      type: Object as PropType<AppError>,
      required: true,
    },
  },
  methods: {
    goToHome() {
      window.location.href = this.errors?.url || '/'
    },
  },
})
</script>

<style lang="scss" scoped>
.errorHandler {
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

.errorDescription {
    margin: 0;
    color: #666666;
    font-size: 14px;
    line-height: 1.45;
}

.errorImage {
  width: auto;
  height: 250px;
  margin-bottom: 28px;
}
</style>
