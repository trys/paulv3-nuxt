<template>
  <div class="table-wrapper">
    <table>
      <thead>
        <tr>
          <th>#</th>
          <th>User</th>
          <th>Points</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(result, i) in results" :key="i">
          <td>{{ result.position }}</td>
          <td>{{ result.username }}</td>
          <td>{{ result.total }}</td>
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
