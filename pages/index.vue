<template>
  <div class="home">
    <figure class="home__header">
      <paul-logo />
      <b style="left: 70%; top: 20%"></b>
      <b style="left: 20%; top: 40%"></b>
      <b style="left: 35%; top: 60%"></b>
      <b style="left: 10%; top: 80%"></b>
      <b style="left: 80%; top: 70%"></b>
      <b style="left: 60%; top: 10%"></b>
    </figure>
    <main class="home__main">
      <nav class="home__nav">
        <template v-if="user !== false">
          <nuxt-link v-if="!user" :to="{ name: 'account-login' }" class="button">Login</nuxt-link>
          <nuxt-link v-if="!user" :to="{ name: 'account-signup' }" class="button">Sign up</nuxt-link>
          <nuxt-link v-else :to="{ name: 'account-logout' }" class="button">Logout</nuxt-link>
          <admin-only>
            <button type="submit" class="button" form="build">Build</button>
            <form method="POST" action="https://api.netlify.com/build_hooks/5afd7635b3127423d9ed00ee" id="build" target="_blank"/>
          </admin-only>
        </template>
      </nav>
      <div class="home__content">
        <h2>Today's fixtures</h2>

        <div class="fixtures" v-if="today.length">
          <fixture-preview
            v-for="fixture in today"
            :key="fixture.id"
            :fixture="fixture"
          />
        </div>
        <div v-else>
          <h5>There's an empty schedule, check back tomorrow</h5>
        </div>

      </div>
    </main>
  </div>
</template>

<script>
import paulLogo from '@/components/logo'
import fixturePreview from '@/components/fixture'
import adminOnly from '@/components/admin-only'
export default {
  async asyncData({ store }) {
    return {
      fixtures: await store.dispatch('getFixtures')
    }
  },

  head: {
    title: 'Home'
  },

  components: {
    paulLogo,
    fixturePreview,
    adminOnly
  },

  computed: {
    user () {
      return this.$store.state.user
    },

    today () {
      let td = new Date()
      td.setMinutes(td.getMinutes() - td.getTimezoneOffset())
      const today = td.toISOString().slice(0,10)
      return this.fixtures.filter(fixture => {
        return today == fixture.date.substring(0, 10)
      })
    }
  }
}
</script>

<style scoped>
.home {
  display: flex;
  width: 100%;
  min-height: 100vh;
  flex-direction: column;
}

.home__header {
  position: relative;
  padding: 20px 0 10vh;
  background: url('~/assets/images/wave.svg') bottom -4px left /100% 10vh no-repeat,
  url('~/assets/images/left.svg') bottom left /auto 80% no-repeat,
  url('~/assets/images/right.svg') bottom right /auto 40% no-repeat;
  overflow: hidden;
  margin: 0;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

b {
  position: absolute;
  width: 10px;
  height: 10px;
  border-radius: 100%;
  border: 2px solid #F7A381;
  z-index: 1;
}

b:nth-child(2n) {
  background: #F7A381;
}

.home__main {
  background: #FFF;
  padding: 10px 20px 20px;
  position: relative;
  z-index: 1;
  margin-top: -1px;
}

.home__nav {
  display: flex;
  justify-content: center;
  min-height: 40px;
}

.home__nav .button {
  width: 130px;
}

.home__nav .button + .button {
  margin-left: 10px;
}

.home__content {
  color: #F56969;
  text-align: center;
}

.home__content h2:before {
  content: '';
  display: block;
  width: 20px;
  margin: 20px auto 20px;
  background: #f5c9c9;
  height: 4px;
}

</style>
