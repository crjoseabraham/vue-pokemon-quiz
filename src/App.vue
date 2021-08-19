<template>
  <div class="app-container">
    <pokemon-gen :generation="generation" @reset="reset"></pokemon-gen>
    <div class="flex-main-container">
      <pokemon-picture
        :answer="answer"
        :showPokemon="showPokemon"
      ></pokemon-picture>
      <pokemon-info :answer="answer" :showInfo="showInfo"></pokemon-info>
      <pokemon-quiz
        :pokemons="pokemons"
        :answer="answer"
        :message="message"
        :generation="generation"
        :showOptions="showOptions"
        :showReset="showReset"
        @checkAnswer="checkAnswer"
        @reset="reset"
      ></pokemon-quiz>
    </div>
  </div>
</template>

<script>
import initialState from '@/helpers/initialState.js'
import getPokemons from '@/helpers/getPokemons.js'
import PokemonPicture from '@/components/PokemonPicture.vue'
import PokemonInfo from '@/components/PokemonInfo.vue'
import PokemonQuiz from '@/components/PokemonQuiz.vue'
import PokemonGen from '@/components/PokemonGen.vue'

export default {
  data() {
    return initialState()
  },
  components: { PokemonPicture, PokemonInfo, PokemonQuiz, PokemonGen },
  methods: {
    async mixPokemonArray() {
      const randomInt = Math.floor(Math.random() * 4)
      this.pokemons = await getPokemons(this.generation)
      this.answer = this.pokemons[randomInt]
    },
    checkAnswer(selectedId) {
      this.showOptions = false
      this.message = ''
      this.loadingMessage()

      setTimeout(() => {
        if (selectedId === this.answer.id) this.displayMessage('correct')
        else this.displayMessage('incorrect')

        this.showPokemon = true
        this.showInfo = true
        this.showReset = true
      }, 800)
    },
    loadingMessage(inc = 1) {
      setTimeout(() => {
        this.message += `. `
        inc = inc + 1

        if (inc > 4) return
        else this.loadingMessage(inc)
      }, 200)
    },
    displayMessage(type) {
      switch (type) {
        case 'correct':
          this.message = `Correct!! It is ${this.answer.name}`
          break
        case 'incorrect':
          this.message = `Whoops! It is ${this.answer.name}`
          break
      }
    },
    reset(gen) {
      Object.assign(this.$data, initialState())
      this.generation = gen
      this.mixPokemonArray()
    },
  },
  mounted() {
    this.mixPokemonArray()
  },
}
</script>

<style lang="scss" scoped>
#app {
  & .app-container {
    background: #fff;
    width: calc(100vmin - 1.2rem);
    height: 100%;
    position: relative;
    margin: auto;
    overflow: hidden;

    @include breakpoint(min-width, 'tablet') {
      margin-top: 2%;
    }

    @include breakpoint(min-width, 'laptop') {
      margin-top: 0;
      width: calc(100vmin + 8rem);
      height: 100vmin;
    }
  }
}

.flex-main-container {
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  height: 94.5%;

  background-image: url('~@/assets/img/orange-bg.png');
  background-repeat: repeat;
  background-position: left top;

  @include breakpoint(min-width, 'tablet') {
    border: 0.4rem solid $app-bg;
    flex-direction: row;
    flex-wrap: wrap;
  }

  & > div:nth-child(1) {
    order: 1;
    flex: 1 0 auto;
    align-self: auto;
    width: 100%;

    @include breakpoint(min-width, 'tablet') {
      width: 50%;
    }
  }

  & > div:nth-child(2) {
    order: 3;
    flex: 1 0 auto;
    align-self: auto;
    width: 100%;
    height: 60%;

    @include breakpoint(min-width, 'tablet') {
      width: 50%;
      order: 2;
      border-top: 0.4rem solid #ffebd6;
      border-left: 0.4rem solid #ffebd6;
    }
  }

  & > div:nth-child(3) {
    order: 2;
    flex: 0 0 100%;
    height: 40%;

    padding: 0.5rem 0.3rem;

    @include breakpoint(min-width, 'tablet') {
      order: 3;
      background-image: linear-gradient(to right, #ffebd6 50%, transparent 50%);
      background-position: top left;
      background-repeat: no-repeat;
      background-size: 100% 0.4rem;
      border-left: 0.4rem solid#ffebd6;
    }
  }
}
</style>
