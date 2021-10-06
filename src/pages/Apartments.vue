<template>
  <div class="wrapper">
    <div class="header">ARRIVAL APARTMENTS LIST - STATUS </div>
    <div class="date">01/11/2021</div>

    <ApartmentList :apartmentList="apartmentsInfo" class="apartment_list"/>

  </div>
</template>

<script>
import { defineComponent } from 'vue';
import ApartmentList from 'components/ApartmentList.vue'

export default defineComponent({
  name: 'Apartments',
  components: {
    ApartmentList
  },
  data: function(){
    return {
      apartmentsInfo: [
        {name: "name1", keys: 3, status: "clean", keysDelivered: 3},
        {name: "name2", time: "11:40", keys: 3, status: "on_cleaning"},
        {name: "name3", time: "12:15", status: "dirty", keysDelivered: 3}
      ]
    }
  }
})
</script>

<style scoped>
.wrapper {
  font-family: 'Open Sans';
  font-style: normal;
  text-align: center;
  font-size: 1.5625rem;
}
.header {
  background-color: #025389;
  color: white;
  font-family: 'Open Sans';
  font-style: normal;
  font-size: 3.125rem;
  text-align: center;
}
.date {
  font-family: 'Open Sans';
  font-style: normal;
  font-size: 3.125rem;
  text-align: center;
}
/* .status_clean{
  background-color:green;
}
.status_dirty{
  background-color:red;
}
.status_on_cleaning{
  background-color:orange;
}
.apartment_name_first_column{
  grid-column: 2;
}
.apartment_name_second_column{
  grid-column: 6;
}
.apartment_keys_first_column{
  grid-column: 4;
}
.apartment_keys_second_column{
  grid-column: 8;
}
.apartment_time_first_column{
  grid-column: 3;
}
.apartment_time_second_column{
  grid-column: 7;
}
.apartment_radius{
  border-radius: 0.94rem;
}
.row1 {
  grid-row: 3;
}
.row2 {
  grid-row: 4;
}
.row3 {
  grid-row: 5;
}
.row4 {
  grid-row: 6;
}
.row5 {
  grid-row: 7;
}
.row6 {
  grid-row: 8;
}
.row7 {
  grid-row: 9;
}
.row8 {
  grid-row: 10;
} */
.apartment_list{
  grid-column: 1 / 10;
  grid-row: 3;
}

</style>
