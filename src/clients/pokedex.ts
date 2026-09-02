import axios from 'axios'

const pokedexClient = axios.create({
  baseURL: import.meta.env.VITE_POKEDEX_API,
  timeout: 60000,
})

export default pokedexClient
