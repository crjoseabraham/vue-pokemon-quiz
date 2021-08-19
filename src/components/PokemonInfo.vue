<template>
  <div>
    <div class="container">
      <ul>
        <li>
          <h3>N.°</h3>
          <div>
            <span v-if="showInfo">{{
              answer.id < 100 ? `0${answer.id}` : answer.id
            }}</span>
            <span v-else>&nbsp;</span>
          </div>
        </li>
        <li>
          <h3>Name</h3>
          <div>
            <span v-if="showInfo">{{ answer.name }}</span>
            <span v-else>&nbsp;</span>
          </div>
        </li>
        <li>
          <h3>Type</h3>
          <div>
            <div
              class="types"
              v-for="(type, index) in answer.type"
              :key="index"
            >
              <span v-if="showInfo" :class="type">{{ type }}</span>
              <span v-else>&nbsp;</span>
            </div>
          </div>
        </li>
        <li class="li-columns">
          <h3>Abilities</h3>
          <div class="abilities">
            <template v-for="(ability, index) in answer.abilities" :key="index">
              <span v-if="showInfo">{{ ability }}</span>
              <span v-else>&nbsp;</span>
            </template>
          </div>
        </li>
      </ul>
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
    showInfo: {
      type: Boolean,
      required: true,
    },
  },
}
</script>

<style lang="scss" scoped>
@import '~@/assets/sass/components/_titles_and_text.scss';
</style>
