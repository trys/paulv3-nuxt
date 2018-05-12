<template>
  <small
    v-if="$store.state.user"
    :class="{
      populate: true,
      'active': !!populated
    }"
    @click="$store.commit('togglePopulate')"
  >Populate with your predictions</small>
</template>

<script>
export default {
  computed: {
    populated () {
      return this.$store.state.predictions_populated
    }
  }
}
</script>

<style lang="scss" scoped>
.populate {
  user-select: none;
  cursor: pointer;
  position: absolute;
  right: 20px;
  bottom: 100%;
  margin: 0 0 3px;
  opacity: 0.7;
  padding-left: 30px;
  transition: 300ms opacity;
  
  @media (max-width: 350px) {
    font-size: 0.7em;
  }

  &--push {
    margin-bottom: -23px;
  }

  &:before {
    content: '';
    position: absolute;
    width: 25px;
    height: 15px;
    border: 1px solid;
    left: 0;
    top: 0;
    border-radius: 20px;
  }

  &:after {
    content: '';
    position: absolute;
    height: 11px;
    width: 11px;
    border-radius: 100%;
    background:#FFF;
    left: 2px;
    top: 2px;
    transition: 300ms translate;
  }

  &.active {
    opacity: 1;
  }

  &.active:after {
    transform: translateX(10px);
  }
}
</style>
