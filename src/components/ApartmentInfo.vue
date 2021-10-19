<template>
  <q-item clickable @click="goToLink">
    <q-item-section
      v-if="icon"
      avatar
    >
      <q-icon :name="icon" />
    </q-item-section>

    <q-item-section>
      <q-item-label>{{ title }}</q-item-label>
      <q-item-label caption>
        {{ caption }}
      </q-item-label>
    </q-item-section>
  </q-item>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ApartmentInfo',
  props: {
    apartment: {
      type: Object
    }
  },
  methods: {
    goToLink: function () {
      if (!!this.link){
        this.$router.push(this.link)
      }
    }
  }
})
</script>

<style scoped>
.apartment-row {
  display: grid;
  grid-column-gap: 1em;
  grid-template-columns: 1fr 5fr 2fr 1fr 1fr
}
.apartment-keys {
  grid-column: 3;
}
.apartment-name {
  grid-column: 2;
}
.edit-button {
  grid-column: 4
}
</style>
