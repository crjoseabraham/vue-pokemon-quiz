import pokemonApi from '../api/PokemonApi'

const getPokemons = async (gen) => {
  const mixedPokemons = indexesArray(gen).sort(() => Math.random() - 0.5)
  const pokemons = await getPokemonData(mixedPokemons.splice(0, 4))

  return pokemons
}

// Generate array for all indexes
const indexesArray = (gen) => {
  let pokemonsArr = []

  switch (gen) {
    case 1: // Get 1st Generation pokemon
      pokemonsArr = Array.from(Array(151))
      return pokemonsArr.map((_, index) => index + 1)

    case 2: // Get 2nd Generation pokemon
      pokemonsArr = Array.from(Array(100))
      return pokemonsArr.map((_, index) => index + 152)

    case 3: // Get 3rd Generation pokemon
      pokemonsArr = Array.from(Array(135))
      return pokemonsArr.map((_, index) => index + 252)

    case 0: // Get all
      pokemonsArr = Array.from(Array(386))
      return pokemonsArr.map((_, index) => index + 1)
  }
}

// Get desired data for 4 random pokemons
const getPokemonData = async ([a, b, c, d] = []) => {
  const promiseArr = [
    pokemonApi.get(`/${a}`),
    pokemonApi.get(`/${b}`),
    pokemonApi.get(`/${c}`),
    pokemonApi.get(`/${d}`),
  ]

  const pokemons = await Promise.all(promiseArr)

  return pokemons.map(({ data }) => ({
    id: data.id,
    name: data.name.toUpperCase(),
    picture: data.sprites,
    type: data.types.map((typeArr) => typeArr.type.name),
    abilities: data.abilities.map((abilitiesArr) => abilitiesArr.ability.name),
  }))
}

export default getPokemons
