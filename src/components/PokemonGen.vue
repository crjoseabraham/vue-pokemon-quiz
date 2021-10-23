<template>
  <div class="topbar-container">
    <div><h1>POKéMON QUIZ GAME</h1></div>
    <div>
      Filter:

      <select v-model="selected">
        <option value="1" selected>1st. Gen</option>
        <option value="2">2nd. Gen</option>
        <option value="3">3rd. Gen</option>
        <option value="0">All Pokémon</option>
      </select>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selected: 1,
    }
  },
  props: {
    generation: {
      type: Number,
      required: true,
    },
  },
  watch: {
    selected() {
      this.$emit('reset', parseInt(this.selected))
    },
  },
}
</script>

<style lang="scss" scoped>
.topbar-container {
  background: $topbar-blue-light;
  display: flex;
  align-items: center;
  height: 38px;
  overflow: hidden;

  @include breakpoint(max-width, 'tablet') {
    height: 44px;
  }

  & > div {
    color: #fff;
    position: relative;
    @include text-shadow($text);

    &:first-child {
      background: $topbar-beige;
      width: 45%;
      border: 0.4rem solid $topbar-blue-dark;
      border-bottom-right-radius: 2rem;
      border-top-right-radius: 2rem;
      border-left: none;
      padding: 0 1rem;
      z-index: 5;
      display: none;

      @include breakpoint(min-width, 'tablet') {
        display: block;
      }
    }

    &:last-child {
      width: 100%;
      z-index: 4;
      display: flex;
      justify-content: space-between;
      padding-left: 1rem;
      align-items: center;

      @include breakpoint(min-width, 'tablet') {
        width: 55%;
        font-size: 1.8rem;
        justify-content: flex-end;
      }
    }
  }
}

select {
  margin-left: 1rem;
  border: none;
  width: 15rem;
  height: 40px;
  background: $topbar-select;
  color: #fff;
  @include text-shadow($text);

  &:focus {
    outline: none;
    border: none;
  }

  option {
    border: none;
    outline: none;
    color: #fff;
  }
}
</style>
