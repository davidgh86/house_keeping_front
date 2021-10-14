<template>
  <q-item clickable @click="goToLink">
    <q-item-section
      avatar
    >
      <q-icon name="logout" />
    </q-item-section>

    <q-item-section>
      <q-item-label>Logout</q-item-label>
      <q-item-label caption>
        {{ caption }}
      </q-item-label>
    </q-item-section>
  </q-item>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'LogoutLink',
  props: {
    caption: {
      type: String,
      default: ''
    }
  },
  methods: {
    goToLink: function () {
      this.$store.dispatch('auth/logout', this.$api)
        .then(() => {
          this.$router.push('/login')
        })
    }
  }
})
</script>
