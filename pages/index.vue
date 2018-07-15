<template>
  <div class="home">
    <figure class="home__header">
      <paul-logo />

      <div class="final-table">
        <h2>Scores on the doors!</h2>
        <p>Congratulations to <strong>{{ player }}</strong> for topping the table with <strong>{{ points }} points</strong>!</p>
        <p>Thanks for playing Paul the Octopus this year! We hope you've enjoyed putting your prediction knowledge to the test. See you in two years for Euro 2020!</p>
        <league-table :results="results" />
      </div>

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
        <br>
        <small>Site by <a href="https://www.trysmudford.com">Trys Mudford</a> &amp; <a href="https://www.tomango.co.uk">Tomango</a></small>

      </div>
    </main>
  </div>
</template>

<script>
import axios from '~/plugins/axios'
import paulLogo from '@/components/logo'
import adminOnly from '@/components/admin-only'
import leagueTable from '~/components/league-table'

export default {
  async asyncData() {
    const { data } = await axios.get('/table')
    if (data && data.data && data.data.length) {
      data.data.map(r => {
        r.username = r.username.replace('&#x2F;', "'")
        return r
      })
      
      let points = 0
      data.data.forEach(r => {
        r.positionLabel = r.total === points ? '-' : r.position
        points = r.total
      })
    }

    return {
      results: data.data || []
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
    adminOnly,
    leagueTable
  },

  computed: {
    user () {
      return this.$store.state.user
    },

    points () {
      return this.results[0].total
    },

    player () {
      const total = this.points
      const winners = this.results.filter(r => r.total === total)
      if (winners.length > 1) {
        let players = ''
        const last = winners.pop()
        players = winners.map(w => w.username).join(', ')
        return players + ' & ' + last.username
      } else {
        return winners[0].username
      }
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
  background: url('~/assets/images/left.svg') bottom left /auto 80% no-repeat;
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

.final-table {
  max-width: 650px;
  margin: 0 auto;
  width: 100%;
  background: #FFF;
  font-size: 16px;
  position: relative;
  box-shadow: 0 0 40px rgba(0, 0, 0, 0.3);
  z-index: 10;
  color: #F56969;
}

.final-table h2 {
  text-align: center;
  margin: 20px 0 0;    
}

.final-table p {
  padding: 0 20px;
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
  padding-top: 20px;
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
