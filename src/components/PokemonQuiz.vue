<template>
  <div>
    <h3 class="wide">Guess the pokemon</h3>
    <div class="quiz-container">
      <p>{{ message }}</p>
      <form>
        <ul v-if="showOptions" class="quiz-options">
          <li v-for="pokemon in pokemons" :key="pokemon.id" class="quiz-option">
            <input
              type="radio"
              :value="pokemon.id"
              :id="pokemon.id"
              @change="$emit('checkAnswer', pokemon.id)"
            />
            <label :for="pokemon.id">{{ pokemon.name }}</label>
          </li>
        </ul>
        <ul v-if="showReset" class="quiz-options">
          <li>
            <input
              type="radio"
              id="reset"
              value="Play Again"
              @change="$emit('reset', generation)"
            />
            <label for="reset">Play Again</label>
          </li>
        </ul>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    pokemons: {
      type: Array,
      required: true,
    },
    answer: {
      type: Object,
      required: true,
    },
    generation: {
      type: Number,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    showOptions: {
      type: Boolean,
      required: true,
    },
    showReset: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
}
</script>

<style lang="scss" scoped>
@import '~@/assets/sass/components/_titles_and_text.scss';

.quiz-container {
  background: $ui-info-data;
  border-radius: 0.8rem;
  position: relative;
  margin-top: -1rem;
  padding: 1rem;
  height: 90%;

  p {
    font-size: 1.5rem;
    padding-top: 0.35rem;

    @include breakpoint(min-width, 'tablet') {
      font-size: 2rem;
    }
  }

  form {
    margin-top: 1rem;
  }
}
</style>
