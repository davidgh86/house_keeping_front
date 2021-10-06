<template>
  <div class="wrapper">
    <div class="name apartment_radius" :class="[cleaninStatus]">{{ apartmentInfo.name }}</div>
    <div class="time">{{ apartmentInfo.time }}</div>
    <div class="keys apartment_radius" :class="[deliveredKeysStatus]">{{ apartmentInfo.keys }}</div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ApartmentInfo',
  props: {
    apartmentInfo: {
      type: Object,
      required: true
    }
  },
  mounted() {
  },
  computed: {
    cleaninStatus: function () {
      if (this.apartmentInfo.status === "dirty") {
        return "status_dirty";
      } else if (this.apartmentInfo.status === "on_cleaning"){
        return "status_on_cleaning";
      } else if (this.apartmentInfo.status === "clean") {
        return "status_clean"
      }else{
        return ""
      }
    },

    deliveredKeysStatus: function () {
      if (!this.apartmentInfo.keys){
        return ""
      }
      if (!this.apartmentInfo.keysDelivered){
        return "status_dirty"
      }
      if (this.apartmentInfo.keysDelivered !== this.apartmentInfo.keys) {
        return "status_dirty"
      } else {
        return "status_clean"
      }
    }
  }
})
</script>

<style scoped>
.wrapper{
  display:grid;
  padding:0.6rem;
  grid-template-columns: 1fr 10fr 2fr 2fr 1fr
}
.name{
  grid-column: 2;
}
.time{
  grid-column: 3;
}
.keys{
  grid-column: 4;
}
.status_clean{
  background-color:green;
}
.status_dirty{
  background-color:red;
}
.status_on_cleaning{
  background-color:orange;
}
.apartment_radius{
  border-radius: 0.94rem;
}
</style>
