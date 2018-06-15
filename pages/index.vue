<template>
  <div class="home">
    <figure class="home__header">
      <paul-logo />
      <p>Welcome to <strong>Paul the Octopus</strong> - the prediction game created in homage to the clever little critter that became world famous for his footballing foresight.</p>
      <p>Sign up and put your powers of prophecy to the test throughout this summer's World Cup against literally dozens of other users.</p>
      <b style="left: 70%; top: 20%"></b>
      <b style="left: 20%; top: 40%"></b>
      <b style="left: 35%; top: 60%"></b>
      <b style="left: 10%; top: 80%"></b>
      <b style="left: 80%; top: 70%"></b>
      <b style="left: 60%; top: 10%"></b>
      <b style="left: 25%; top: 15%" class="secondary"></b>
      <b style="left: 22.5%; top: 65%" class="secondary"></b>
      <b style="left: 10%; top: 10%" class="secondary"></b>
      <b style="left: 90%; top: 30%" class="secondary"></b>
      <b style="left: 70%; top: 45%" class="secondary"></b>
    </figure>
    <main class="home__main">
      <nav class="home__nav">
        <template v-if="user !== false">
          <nuxt-link v-if="!user" :to="{ name: 'account-login' }" class="button">Login</nuxt-link>
          <nuxt-link v-if="!user" :to="{ name: 'account-signup' }" class="button">Sign up</nuxt-link>
          <nuxt-link v-else :to="{ name: 'account-logout' }" class="button">Logout</nuxt-link>
          <admin-only>
            <button @click="$store.dispatch('build')" class="button">Build</button>
          </admin-only>
        </template>
      </nav>
      <div class="home__content">
        <no-ssr>
          <div>
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
        </no-ssr>

        <small>Site by <a href="https://www.trysmudford.com">Trys Mudford</a> &amp; <a href="https://www.tomango.co.uk">Tomango</a></small>

      </div>
    </main>
  </div>
</template>

<script>
import Thyme from '@trys/thyme'
import paulLogo from '@/components/logo'
import fixturePreview from '@/components/fixture'
import adminOnly from '@/components/admin-only'
export default {
  async asyncData({ store }) {
    return {
      fixtures: await store.dispatch('getFixtures')
    }
  },

  head () {
    return {
      title: 'Home',
      meta: [
        { property: 'og:url', content: `https://paultheoctop.us${this.$route.path}` },
        { property: 'og:title', content: 'Home | Paul the Octopus' },
        { name: 'twitter:title', content: 'Home | Paul the Octopus' }
      ]
    }
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
      const today = new Thyme()
      return this.fixtures.filter(fixture => today.equals(new Thyme(fixture.date))).sort((a, b) => a.date > b.date)
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

.secondary {
  opacity: 0;
}

p {
  max-width: 500px;
  text-align: center;
  margin: 0 auto 30px;
  padding: 0 15px;
  position: relative;
  z-index: 2;
  text-shadow: -1px 1px 2px rgba(0, 0, 0, 0.5);
}

@media screen and (min-width: 40em) {
  .secondary {
    opacity: 1;
  }

  .home__header {
    font-size: 1.25em;
  }

  .home__header p {
    max-width: 700px;
  }
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

.home__nav .button + .button,
.home__nav .button + div .button {
  margin-left: 10px;
}

.home__nav .button + div {
  display: inline-block;
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
