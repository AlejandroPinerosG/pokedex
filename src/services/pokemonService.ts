
import pokedexClient from '@/clients/pokedex'

const PAGE_SIZE = 20

type PokemonListItem = {
  name: string
  url: string
}

type PokemonListResponse = {
  count: number
  next: string | null
  previous: string | null
  results: PokemonListItem[]
}

type PokemonDetailResponse = {
  id: number
  name: string
  sprites: {
    other?: {
      ['official-artwork']?: {
        front_default: string | null
      }
    }
  }
  types: Array<{
    slot: number
    type: { name: string }
  }>
}

export type PokemonCardData = {
  id: number
  name: string
  image: string | null
  types: string[]
}

const cache = new Map<string, PokemonCardData>()

async function getPokemonDetail(
  resource: PokemonListItem,
): Promise<PokemonCardData> {
  const cached = cache.get(resource.name)
  if (cached) return cached

  const { data } = await pokedexClient.get<PokemonDetailResponse>(resource.url)

  const pokemon = {
    id: data.id,
    name: data.name,
    image: data.sprites.other?.['official-artwork']?.front_default ?? null,
    types: data.types
      .sort((a, b) => a.slot - b.slot)
      .map((item) => item.type.name),
  }

  cache.set(resource.name, pokemon)
  return pokemon
}

export async function getPokemonPage(offset: number): Promise<{
  pokemons: PokemonCardData[]
  next: string | null
  count: number
}> {
  const { data } = await pokedexClient.get<PokemonListResponse>('pokemon', {
    params: {
      limit: PAGE_SIZE,
      offset,
    },
  })

  const pokemons = await Promise.all(
    data.results.map((resource) => getPokemonDetail(resource)),
  )
  return {
    pokemons,
    next: data.next,
    count: data.count,
  }
}

export type PokemonDetailData = PokemonCardData & {
  description: string
  height: string
  weight: string
  category: string
  ability: string
  maleRate: number | null
  femaleRate: number | null
  weaknesses: string[]
}

type PokemonApiDetail = PokemonDetailResponse & {
  height: number
  weight: number
  abilities: Array<{ ability: { name: string } }>
}

type NamedResource = { name: string }

type PokemonSpeciesResponse = {
  gender_rate: number
  flavor_text_entries: Array<{ flavor_text: string; language: NamedResource }>
  genera: Array<{ genus: string; language: NamedResource }>
}

type NamedApiResponse = {
  names: Array<{ name: string; language: NamedResource }>
}

type TypeResponse = NamedApiResponse & {
  damage_relations: { double_damage_from: NamedResource[] }
}

const detailCache = new Map<number, PokemonDetailData>()

const localizedName = (data: NamedApiResponse, fallback: string) =>
  data.names.find((item) => item.language.name === 'es')?.name ?? fallback

export async function getPokemonDetails(id: number): Promise<PokemonDetailData> {
  const cached = detailCache.get(id)
  if (cached) return cached

  const { data: pokemon } = await pokedexClient.get<PokemonApiDetail>(`pokemon/${id}`)
  const { data: species } = await pokedexClient.get<PokemonSpeciesResponse>(`pokemon-species/${id}`)

  const [abilityResponse, ...typeResponses] = await Promise.all([
    pokedexClient.get<NamedApiResponse>(`ability/${pokemon.abilities[0]?.ability.name ?? ''}`),
    ...pokemon.types.map((item) => pokedexClient.get<TypeResponse>(`type/${item.type.name}`)),
  ])

  const weaknessNames = [
    ...new Set(typeResponses.flatMap(({ data }) => data.damage_relations.double_damage_from.map((type) => type.name))),
  ]
  const weaknessLabels = await Promise.all(
    weaknessNames.map(async (type) => {
      const { data } = await pokedexClient.get<NamedApiResponse>(`type/${type}`)
      return localizedName(data, type)
    }),
  )

  const genderRate = species.gender_rate
  const detail: PokemonDetailData = {
    id: pokemon.id,
    name: pokemon.name,
    image: pokemon.sprites.other?.['official-artwork']?.front_default ?? null,
    types: pokemon.types.sort((a, b) => a.slot - b.slot).map((item) => item.type.name),
    description:
      species.flavor_text_entries
        .find((item) => item.language.name === 'es')
        ?.flavor_text.replace(/[\f\n]/g, ' ') ?? '',
    height: `${(pokemon.height / 10).toLocaleString('es-CO')} m`,
    weight: `${(pokemon.weight / 10).toLocaleString('es-CO')} kg`,
    category:
      species.genera.find((item) => item.language.name === 'es')?.genus.replace(' Pokémon', '') ?? '',
    ability: localizedName(abilityResponse.data, pokemon.abilities[0]?.ability.name ?? ''),
    maleRate: genderRate === -1 ? null : 100 - (genderRate / 8) * 100,
    femaleRate: genderRate === -1 ? null : (genderRate / 8) * 100,
    weaknesses: weaknessLabels,
  }

  detailCache.set(id, detail)
  return detail
}
