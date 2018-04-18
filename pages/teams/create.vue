<template>
  <div>
    <h1>Add a team</h1>
    <form @submit.prevent="create">
      <p>
        <label for="name">Name</label>
        <input type="text" name="name" id="name" required />
      </p>

      <p>
        <label for="name">Group</label>
        <select name="group" id="group" required>
          <option value="a">A</option>
          <option value="b">B</option>
          <option value="c">C</option>
          <option value="d">D</option>
          <option value="e">E</option>
          <option value="f">F</option>
          <option value="g">G</option>
          <option value="h">H</option>
        </select>
      </p>

      <p>
        <input type="submit" value="Add team">
      </p>
    </form>
  </div>
</template>

<script>
export default {
  middleware: 'auth',

  head: {
    title: 'Teams'
  },

  methods: {
    async create (event) {
      const name = event.target.name.value;
      const group = event.target.group.value;
      if (name && group) {
        const slug = name.toLowerCase().replace(/\s/g, '-');

        try {
          await this.$store.dispatch('api', {
            url: '/teams',
            method: 'POST',
            data: {
              name,
              group,
              slug
            }
          })

          event.target.reset()
          event.target.name.focus()
        } catch(e) {
          console.error(e);
        }
      }
    }
  }
}
</script>