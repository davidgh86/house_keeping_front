<template>
  <div class="wrapper">
    <div class="header">ARRIVAL APARTMENTS LIST<br>EDIT</div>
    <div class="date">01/11/2021</div>
    <EditableApartmentInfo :apartmentInfo="apartment" v-for="apartment in apartmentList" :key="apartment.id"/>    
  </div>
</template>

<script>
import { defineComponent, onMounted, ref, inject } from "vue";
import EditableApartmentInfo from "src/components/EditableApartmentStatus.vue";

export default defineComponent({
  name: "CleaningManager",
  components: {
    EditableApartmentInfo,
  },
  setup() {
    const serviceApi = inject('api')
    const apartmentList = ref([])

    onMounted(() => {
      // TODO add date
      serviceApi.getCurrentIntervals(1635361769000).then(response => {
        apartmentList.value = response
      })
    })

    return {
      apartmentList
    }
    
  }
});
</script>

<style scoped>
.wrapper {
  font-family: "Arial";
  font-style: normal;
  text-align: center;
  font-size: 0.8rem;
}
.header {
  background-image: linear-gradient(to right, #009eda, #025389);
  color: white;
  font-family: "Arial";
  font-style: normal;
  font-size: 1.1rem;
  text-align: center;
}
.date {
  font-family: "Arial";
  font-style: normal;
  font-size: 1rem;
  text-align: center;
}

.apartment_list {
  grid-column: 1 / 10;
  grid-row: 3;
}
</style>
