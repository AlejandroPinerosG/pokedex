<template>
    <section class="onboarding">
        <div class="container">
            <div class="col-12">
                <img :src="currentStep.image" :alt="currentStep.title" class="onboardingImage" />
                <h1 class="text-center">
                    {{ currentStep.title }}
                </h1>
                <p class="text-center onboardingDescription">
                    {{ currentStep.description }}
                </p>
                <div class="onboardingDots">
                    <button v-for="(_, index) in steps" :key="index" type="button" class="onboardingDot"
                        :class="{ 'onboardingDot--active': index === activeStep }"
                        :aria-label="`Ir al paso ${index + 1}`" @click="activeStep = index" />
                </div>
                <button type="button" class="btn btn-primary text-btn" @click="nextStep">
                    {{ currentStep.buttonText }}
                </button>
            </div>
        </div>
    </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import onboardingImage from '@/assets/images/Onboarding.png'
import trainerImage from '@/assets/images/trainer.png'

export default defineComponent({
    name: 'Onboarding',
    data() {
        return {
            activeStep: 0,
            steps: [
                {
                    image: onboardingImage,
                    title: 'Todos los Pokemon en un solo lugar',
                    description: 'Accede a una amplia lista de Pokemon de todas las generaciones creadas por Nintendo',
                    buttonText: 'Continuar',
                },
                {
                    image: trainerImage,
                    title: 'Manten tu Pokedex actualizada',
                    description: 'Registrate y guarda tu perfil, Pokemon favoritos, configuraciones y mucho mas en la aplicacion',
                    buttonText: 'Empecemos',
                },
            ],
        }
    },
    computed: {
        currentStep() {
            return this.steps[this.activeStep]
        },
    },
    methods: {
        nextStep() {
            if (this.activeStep < this.steps.length - 1) {
                this.activeStep += 1
                return
            }

            sessionStorage.setItem('onboardingWatched', 'true')
            this.$router.push('/home')
        },
    },
})
</script>

<style scoped lang="scss">
.onboarding {
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

.onboardingDescription {
    margin: 0;
    color: #666666;
    font-size: 14px;
    line-height: 1.45;
}

.onboardingDots {
    margin: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
}

.onboardingDot {
    width: 10px;
    height: 10px;
    padding: 0;
    border: 0;
    border-radius: 999px;
    background-color: #d7e1f5;
    cursor: pointer;
}

.onboardingDot--active {
    width: 30px;
    background-color: #173EA5;
}

.onboardingImage {
    width: auto;
    height: 250px;
    margin-bottom: 28px;
}
</style>