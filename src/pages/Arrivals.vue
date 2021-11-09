<template>
  <div class="wrapper">
    <div class="header">HSK Admin</div>    
      <q-uploader
      :url="uploadUrl"
      :headers="uploadHeaders"
      :form-fields="formFields"
      :multiple="multiple"
      field-name="file"
      @uploaded="onUploaded"
      style="max-width: 300px"

    ></q-uploader>
  </div>
</template>

<script>

import { defineComponent, ref, onMounted, inject } from "vue";

export default defineComponent({
  name: "Arrivals",
  setup () {
    
    const serviceApi = inject('api')
    const arrivals = ref([])
    const departures = ref([])
    const intervals = ref([])

    function onUploaded(info) {
      console.log(info)
      console.log(info.xhr.response)
      let response = JSON.parse(info.xhr.response)

      arrivals.value = response.bookings.arrivals
      departures.value = response.bookings.departures
      intervals.value = response.intervals
    }

    return {
      uploadUrl: serviceApi.getUploadPath(),
      uploadHeaders: [
        {name: 'Authorization', value: serviceApi.getToken()},
        {name: 'Time-Zone', value: serviceApi.getTimeZone()},
      ],
      formFields: [
        {name: 'date', value: 1635361769000}
      ],
      multiple:false,
      onUploaded: onUploaded,
      arrivals,
      departures,
      intervals
    }
  }
  
});


</script>

<style scoped>
.header {
  grid-row: 1;
  background-image: linear-gradient(to right, #009eda, #025389);
  color: white;
  font-family: "Arial";
  font-style: normal;
  font-size: 1.1rem;
  text-align: center;
  padding: 0.9375rem;
}
.date {
  grid-column: 1;
  grid-row: 2;
  font-family: "Arial";
  font-style: normal;
  font-size: 1rem;
  text-align: center;
  margin-top: 1rem;
  margin-bottom: 3.125rem;
}
.seletor-time-container {
  display: grid;
  grid-template-columns: 1fr;
}


</style>
