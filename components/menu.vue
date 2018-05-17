<template>
  <header role="banner">
    <button type="button" :class="{ active, navicon: true }" @click="$store.commit('toggleMenu')">Menu</button>
    <nav :class="{ active }">
      <nuxt-link :to="{ name: 'index' }">Home</nuxt-link>
      <nuxt-link :to="{ name: 'fixtures' }">Fixtures</nuxt-link>
      <nuxt-link :to="{ name: 'groups' }">Teams</nuxt-link>
      <nuxt-link :to="{ name: 'challenges' }">Challenges</nuxt-link>
      <nuxt-link :to="{ name: 'table' }">Table</nuxt-link>

    </nav>
  </header>
</template>

<script>
export default {
  computed: {
    active () {
      return this.$store.state.menu
    }
  },

  watch: {
    '$route': function () {
      this.$store.commit('closeMenu')
    }
  }
}
</script>

<style scoped>
  .navicon {
    -webkit-tap-highlight-color: transparent;
    height: 16px;
    width: 25px;
    background: url('data:image/svg+xml;charset=utf-8;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iMTYiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48cGF0aCBmaWxsPSIjRjdBMzgxIiBkPSJNMjUgMGgyNXYySDI1ek0yNSA3aDI1djJIMjV6TTI1IDE0aDI1djJIMjV6Ii8+PHBhdGggZmlsbD0iI0ZGRkZGRiIgZD0iTTAgMGgyNXYySDB6TTAgN2gyNXYySDB6TTAgMTRoMjV2MkgweiIvPjwvZz48L3N2Zz4=') 0 0 no-repeat;
    padding: 0;
    overflow: hidden;
    text-indent: 200%;
    white-space: nowrap;
    position: absolute;
    right: 30px;
    top: 30px;
    z-index: 200;
    border: none;
    transition: 300ms background-position;
    outline: none;
    cursor: pointer;
  }

  .navicon.active {
    position: fixed;
    background-position: -25px 0;
    transform: scale(-1);
  }

  nav {
    background: #E55959;
    justify-content: center;
    text-transform: uppercase;
    flex-direction: column;
    letter-spacing: 0.4em;
    align-items: center;
    font-weight: 700;
    font-size: 1.25em;
    position: fixed;
    display: flex;
    z-index: 100;
    height: 100%;
    width: 100%;
    left: 0;
    top: 0;

    transition: 400ms opacity, 400ms visibility, 400ms transform;
    transition-timing-function: cubic-bezier(0.72, 0.02, 0.29, 1);
    visibility: hidden;
    transform: translateX(-100%);
    opacity: 0;
  }

  nav.active {
    opacity: 1;
    visibility: visible;
    transform: translateX(0);
  }

  nav a {
    margin: 10px;
    position: relative;
  }

  nav a:after {
    content: '';
    position: absolute;
    width: calc(100% - 0.4em);
    height: 2px;
    background: #FFF;
    bottom: 0;
    left: 0;

    transform: scaleX(0);
    transition: 150ms transform linear;
  }

  nav a:hover:after,
  .nuxt-link-exact-active:after {
    transform: scaleX(1);
  }
</style>
