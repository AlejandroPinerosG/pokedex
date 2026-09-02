<template>
<nav class="navbar">
  <div class="container d-flex justify-content-evenly">
    <div class="" id="navbarNav">
      <ul class="navbar-nav">
        <li class="nav-item">
          <RouterLink class="nav-link active menuItem text-menu" aria-current="page" to="/home">
            <span>
              <FontAwesomeIcon
                class="icon iconMenu"
                icon="fa-house"
                aria-hidden="true"
              />
            </span>
            Pokedex
          </RouterLink>
        </li>
        <li class="nav-item">
          <RouterLink class="nav-link active menuItem text-menu" aria-current="page" to="/regions">
            <span>
              <FontAwesomeIcon
                class="icon iconMenu"
                icon="fa-globe"
                aria-hidden="true"
              />
            </span>
            Regiones
          </RouterLink>
        </li>
        <li class="nav-item">
          <RouterLink class="nav-link active menuItem text-menu" to="/favorites">
            <span>
              <FontAwesomeIcon
                class="icon iconMenu"
                icon="heart"
                aria-hidden="true"
              />
            </span>
            Favoritos
          </RouterLink>
        </li>
        <li class="nav-item">
          <RouterLink class="nav-link active menuItem text-menu" aria-current="page" to="/profile">
            <span>
              <FontAwesomeIcon
                class="icon iconMenu"
                icon="fa-user"
                aria-hidden="true"
              />
            </span>
            Perfil
          </RouterLink>
        </li>
      </ul>
    </div>
  </div>
</nav>
</template>
<script lang="ts">

import { defineComponent} from 'vue'

export default defineComponent({
  name: 'pokemonMenu',
  props: {
    isMobile: Boolean,
  },
  methods: {
    goTo(path: string) {
      window.location.href = path
    },
  },
})
</script>

<style lang="scss" scoped>

.menuItem {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  padding: 0rem 1rem 0rem;
}

.iconMenu {
  color:#424242;
}
</style>
