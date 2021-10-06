<template>
  <div>
    <div class="flexContainer">
      <ApartmentInfo class="flexItem" :apartmentInfo="apartmentList[0]"/>
      <ApartmentInfo class="flexItem" :apartmentInfo="apartmentList[1]"/>
    </div>
    <div class="flexContainer">
      <ApartmentInfo class="flexItem" :apartmentInfo="apartmentList[2]"/>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import ApartmentInfo from 'components/ApartmentInfo.vue'

export default defineComponent({
  name: 'ApartmentList',
  components: {
    ApartmentInfo
  },
  props: {
    apartmentList: {
      type: Array,
      required: true
    }
  },
  mounted() {
  }
})
</script>
<style scoped>
.flexContainer {
  display: block;
}

@media only screen and (min-width: 1024px) {
  .flexContainer {
    display: flex;
  }
}

.flexContainer .flexItem{
  width: 50%;
}
</style>
