<template>
  <div :class="`layout layout--${$route.name}`">
    <site-menu />
    <nuxt />
    <no-ssr v-if="$store.state.user">
      <add-prediction />
    </no-ssr>
  </div>
</template>

<script>
import SiteMenu from '~/components/menu'
import AddPrediction from '~/components/add-prediction'

export default {
  components: {
    SiteMenu,
    AddPrediction
  }
};
</script>
