export type PokemonTypeTheme = {
  label: string
  color: string
  icon: string
  CardContainer: string
  imageContainer: string
}

const TYPE_THEMES: Record<string, PokemonTypeTheme> = {
  grass: {
    label: 'Planta',
    color: '#8BC34A',
    CardContainer: '#8BC34A80',
    imageContainer: '#8BC34A',
    icon: 'leaf',
  },
  poison: {
    label: 'Veneno',
    color: '#9b59b6',
    CardContainer: '#9b59b680',
    imageContainer: '#9d23c5',
    icon: 'skull',
  },
  fire: {
    label: 'Fuego',
    color: '#FF9800',
    CardContainer: '#FF980080',
    imageContainer: '#FF9800',
    icon: 'fire',
  },
  water: {
    label: 'Agua',
    color: '#3498db',
    CardContainer: '#3498db80',
    imageContainer: '#3498db80',
    icon: 'droplet',
  },
  electric: {
    label: 'Eléctrico',
    color: '#f1c40f',
    CardContainer: '#f1c40f80',
    imageContainer: '#f1c40f80',
    icon: 'bolt',
  },
  bug: {
    label: 'Bicho',
    color: '#A6B91A',
    CardContainer: '#A6B91A80',
    imageContainer: '#A6B91A',
    icon: 'bug',
  },
  flying: {
    label: 'Volador',
    color: '#06B6C9',
    CardContainer: '#06B6C980',
    imageContainer: '#06B6C9',
    icon: 'feather',
  },
  ice: {
    label: 'Hielo',
    color: '#3B82F6',
    CardContainer: '#3B82F680',
    imageContainer: '#3B82F6',
    icon: 'snowflake',
  },
  ground: {
    label: 'Tierra',
    color: '#e7872e',
    CardContainer: '#e7872e80',
    imageContainer: '#e7872e',
    icon: 'mountain',
  },
  psychic: {
    label: 'Psíquico',
    color: '#5a6a80',
    CardContainer: '#5a6a8080',
    imageContainer: '#5a6a80',
    icon: 'spinner',
  },
  normal: {
    label: 'Normal',
    color: '#A8A77A',
    CardContainer: '#A8A77A80',
    imageContainer: '#A8A77A',
    icon: 'star',
  },
}

const DEFAULT_THEME = {
  label: 'Desconocido',
  color: '#cccccc',
  icon: 'circle-question',
}

const TYPE_WEAKNESSES: Record<string, PokemonTypeTheme> = {
  Planta: {
    label: 'Planta',
    color: '#8BC34A',
    CardContainer: '#8BC34A80',
    imageContainer: '#8BC34A',
    icon: 'leaf',
  },
  Veneno: {
    label: 'Veneno',
    color: '#9b59b6',
    CardContainer: '#9b59b680',
    imageContainer: '#9d23c5',
    icon: 'skull',
  },
  Fuego: {
    label: 'Fuego',
    color: '#FF9800',
    CardContainer: '#FF980080',
    imageContainer: '#FF9800',
    icon: 'fire',
  },
  Agua: {
    label: 'Agua',
    color: '#3498db',
    CardContainer: '#3498db80',
    imageContainer: '#3498db80',
    icon: 'droplet',
  },
  Eléctrico: {
    label: 'Eléctrico',
    color: '#f1c40f',
    CardContainer: '#f1c40f80',
    imageContainer: '#f1c40f80',
    icon: 'bolt',
  },
  Bicho: {
    label: 'Bicho',
    color: '#A6B91A',
    CardContainer: '#A6B91A80',
    imageContainer: '#A6B91A',
    icon: 'bug',
  },
  Volador: {
    label: 'Volador',
    color: '#06B6C9',
    CardContainer: '#06B6C980',
    imageContainer: '#06B6C9',
    icon: 'feather',
  },
  Hielo: {
    label: 'Hielo',
    color: '#3B82F6',
    CardContainer: '#3B82F680',
    imageContainer: '#3B82F6',
    icon: 'snowflake',
  },
  Tierra: {
    label: 'Tierra',
    color: '#e7872e',
    CardContainer: '#e7872e80',
    imageContainer: '#e7872e',
    icon: 'mountain',
  },
  Psíquico: {
    label: 'Psíquico',
    color: '#5a6a80',
    CardContainer: '#5a6a8080',
    imageContainer: '#5a6a80',
    icon: 'spinner',
  },
  Normal: {
    label: 'Normal',
    color: '#A8A77A',
    CardContainer: '#A8A77A80',
    imageContainer: '#A8A77A',
    icon: 'star',
  },
}

export const getPokemonTypeTheme = (type: string) => TYPE_THEMES[type] ?? DEFAULT_THEME

export const getPokemonTypeWeakness = (type: string) => TYPE_WEAKNESSES[type] ?? DEFAULT_THEME
