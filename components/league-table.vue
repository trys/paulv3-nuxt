<template>
  <div class="table-wrapper">
    <table>
      <thead>
        <tr>
          <th class="position">#</th>
          <th class="user">User</th>
          <th class="points">Points</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="result in results" :key="result.user_id">
          <td class="position">{{ result.positionLabel }} <span :class="{
            'shift': true,
            'shift-up': result.shift && result.shift > 0,
            'shift-down': result.shift && result.shift < 0,
            'shift-static': !result.shift
          }"></span></td>
          <td class="user">
            <nuxt-link :to="{ name: 'users-id', params: { id: result.user_id } }">
              {{ result.username }}
            </nuxt-link>
          </td>
          <td class="points">{{ result.total }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  export default {
    props: {
      results: {
        type: Array,
        required: true
      }
    }
  }
</script>

<style lang="scss" scoped>
.position {
  width: 40px;
  text-align: right;
  padding-left: 0;
  padding-right: 5px;
  position: relative;
}

.points {
  padding-left: 5px;
  text-align: right;
}

.shift {
  -webkit-clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
  clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
  position: absolute;
  width: 11px;
  height: 11px;
  right: 100%;
  top: 50%;
  margin: -5.5px 0 0;
}

.shift-up {
  background: #20bf6b;
}

.shift-down {
  background: #F56969;
  transform: scaleY(-1);
}

.shift-static {
  -webkit-clip-path: polygon(100% 50%, 0 0, 0 100%);
  clip-path: polygon(100% 50%, 0 0, 0 100%);
  background: #BFC2C1;
  
}

@media (min-width: 30em) {
  .position {
    width: 50px;
    padding-right: 15px;
  }
}

</style>
