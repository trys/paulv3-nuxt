<template>
  <div :class="`layout layout--${$route.name}`">
    <site-menu />
    <nuxt />
  </div>
</template>

<script>
import SiteMenu from '~/components/menu'

export default {
  components: {
    SiteMenu
  }
};
</script>
