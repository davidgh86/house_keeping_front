<template>
  <div class="wrapper">
    <div class="header"> ARRIVAL APARTMENTS LIST - STATUS -</div>
    <div class="date">01/12/2021</div>

    <StatusList :apartmentList="apartmentsInfo" class="apartment_list" />
  </div>
</template>

<script>
import { defineComponent, ref, onMounted, inject, onBeforeUnmount } from "vue";
import StatusList from "components/StatusList.vue";

export default defineComponent({
  name: "StatusPage",
  components: {
    StatusList,
  },
  setup() {
    const serviceApi = inject('api')
    const apartmentsInfo = ref([])
    let ws = null

    const updateStatus = function(apartmentInfo) {
      for (var i = 0; i < apartmentsInfo.value.length; i++){
        if (apartmentsInfo.value[i].apartmentCode === apartmentInfo.apartmentCode){
          apartmentsInfo.value[i] = apartmentsInfo
        }
      }
    } 

    onMounted(() => {
      serviceApi.getCurrentIntervals(1635361769000).then(response => {
        apartmentsInfo.value = response
      })
      ws = new WebSocket(serviceApi.getWsPath())
      ws.onopen = function (event) {
        // TODO check if working
        console.log("Connected to ws")
      }
      ws.onmessage = function (event) {
        // TODO check if working
        updateStatus(event.data)
        console.log("--> " + event.data)
      }
    })

    onBeforeUnmount(() => {
      if (ws){
        ws.close();
      }
    })

    return {
      // 'OCCUPIED', 'READY_TO_CLEAN', 'ON_CLEANING', 'CLEAN'
      apartmentsInfo
    }
  }
});
</script>

<style scoped>
.wrapper {
  font-family: "Arial";
  font-style: normal;
  text-align: center;
  font-size: 3rem;
}
.header {
  background-image: linear-gradient(to right, #009eda, #025389);
  color: white;
  font-family: "Arial";
  font-style: normal;
  font-size: 2.5rem;
  text-align: center;
  font-weight: 200;
}
.date {
  font-family: "Arial";
  font-style: normal;
  font-size: 2rem;
  text-align: center;
}

.apartment_list {
  grid-column: 1 / 10;
  grid-row: 3;
}
</style>
