<template>
  <div>
    <div class="container">
      <div>
        <span v-if="showPokemon">Lv.1</span>
        <span v-else>&nbsp;</span>
        <h2 v-if="showPokemon">{{ answer.name }}</h2>
        <h2 v-else>&nbsp;</h2>
      </div>

      <div class="picture">
        <img :src="getPictureSrc" :alt="answer.name" v-if="showPokemon" />
        <span v-else-if="getPictureSrc === undefined">&nbsp;</span>
        <img
          v-else
          :src="getPictureSrc"
          alt="Who is this Pokemon?"
          class="hidden"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    answer: {
      type: Object,
      required: true,
    },
    showPokemon: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  computed: {
    getPictureSrc() {
      if (this.answer.picture !== undefined)
        return this.answer.picture.other.dream_world.front_default
    },
  },
}
</script>

<style lang="scss" scoped>
.container {
  border: 0.4rem solid $app-bg;
  height: 100%;
  background: $ui-purple;
  display: flex;
  flex-flow: column;
  padding: 0.4rem 0.2rem;

  @include breakpoint(min-width, 'tablet') {
    border-right: 0.4rem solid $app-bg;
    border-bottom: 0.4rem solid $app-bg;
    border-top: none;
    border-left: none;
  }

  div:first-child {
    height: 15%;
    display: flex;
    justify-content: space-between;

    h2,
    span {
      color: $text-light;
      @include text-shadow($text);
    }
  }

  .picture {
    border: 4px solid $ui-purple-border;
    border-radius: 5px;
    background-image: url('~@/assets/img/grey-bg.png');
    background-repeat: repeat;
    background-position: top left;
    height: 85%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

img {
  max-height: 10rem;
  max-width: 15rem;
  display: block;
  -moz-user-select: none;
  -ms-user-select: none;
  -webkit-user-drag: none;
  -webkit-user-select: none;

  @include breakpoint(min-width, 'tablet') {
    max-height: 15rem;
    max-width: 20rem;
  }

  &.hidden {
    filter: brightness(0);
  }
}
</style>
