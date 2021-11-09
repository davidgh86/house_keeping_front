<template>
  <div class="wrapper">
    <div class="name apartment_radius" :class="[cleaninStatus]">{{ apartmentInfo.apartmentName }}</div>
    <div class="time">{{ getTime }}</div>
    <div class="keys apartment_radius" :class="[deliveredKeysStatus]">{{ apartmentInfo.expectedKeys }}</div>
  </div>
</template>

<script>
import { defineComponent, computed } from 'vue'

export default defineComponent({
  name: 'ApartmentStatus',
  props: {
    apartmentInfo: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const cleaninStatus = computed(() => {
      if (!props.apartmentInfo || !props.apartmentInfo.cleaningStatus || !props.apartmentInfo.cleaningStatus.cleaningStatus) {
        return ""
      }
      if (props.apartmentInfo.cleaningStatus.cleaningStatus === "OCCUPIED") {
        return "status_occupied"
      } else if (props.apartmentInfo.cleaningStatus.cleaningStatus === "READY_TO_CLEAN") {
        return "status_ready_to_clean";
      } else if (props.apartmentInfo.cleaningStatus.cleaningStatus === "ON_CLEANING"){
        return "status_on_cleaning";
      } else if (props.apartmentInfo.cleaningStatus.cleaningStatus === "CLEAN") {
        return "status_clean"
      }else{
        return ""
      }
    })

    const getTime = computed(() => {
      let time = props.apartmentInfo.limitTime
      if (!time){
        return "Not today"
      }
      let date = new Date(time)
      return date.getHours().toString().padStart(2, '0') + ":" + date.getMinutes().toString().padStart(2, '0')
    });
    
    const deliveredKeysStatus = computed(() => {
      if (!props.apartmentInfo.keys){
        return ""
      }
      if (!props.apartmentInfo.keysDelivered){
        return "status_ready_to_clean"
      }
      if (props.apartmentInfo.keysDelivered !== this.apartmentInfo.keys) {
        return "status_ready_to_clean"
      } else {
        return "status_clean"
      }
    })

    return {
      cleaninStatus,
      deliveredKeysStatus,
      getTime
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
  font-size: 2rem;
}
.time{
  grid-column: 3;
  font-size: 1.8rem;
}
.keys{
  grid-column: 4;
}
.status_clean{
  background-color:green;
}
.status_ready_to_clean{
  background-color:red;
}
.status_on_cleaning{
  background-color:orange;
}
.status_occupied{
  background-color:grey;
}
.apartment_radius{
  border-radius: 0.94rem;
}
</style>
