<template>
  <div class="wrapper">
    <div class="header">ARRIVAL APARTMENTS LIST<br>EDIT</div>
    <div class="date">01/11/2021</div>
    <EditableApartmentInfo :apartmentInfo="apartment" v-for="apartment in apartmentList" :key="apartment.id"/>    
  </div>
</template>

<script>
import { defineComponent } from "vue";
import EditableApartmentInfo from "src/components/EditableApartmentStatus.vue";

export default defineComponent({
  name: "CleaningManager",
  components: {
    EditableApartmentInfo,
  },
  data: function () {
    return {
      apartmentList: [
        { id: 0, name: "name1", keys: 3, status: "clean", keysDelivered: 3 },
        { id: 1, name: "name2", time: "11:40", keys: 3, status: "on_cleaning" },
        { id: 2, name: "name3", time: "12:15", status: "dirty", keysDelivered: 3 },
      ],
    };
  },
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
