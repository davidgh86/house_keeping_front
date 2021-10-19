<template>
  <div class="wrapper">
    <div class="header">HSK Admin</div>
    <div class="date">XX/XX/XXXX</div>

    <q-table
      title="Treats"
      :rows="rows"
      :columns="columns"
      v-model:pagination="pagination"
      :loading="loading"
      @request="onRequest"
    ></q-table>
    
    
  </div>
</template>

<script>

import { defineComponent, ref, onMounted, getCurrentInstance, inject } from "vue";

const columns = [
        {
          name: 'name',
          required: true,
          label: 'Apartment name',
          align: 'left',
          field: 'apartmentName',
        },
        {
          name: 'keys',
          required: true,
          label: 'Number of keys',
          align: 'left',
          field: 'keys',
        },
      ]



export default defineComponent({
  name: "Apartments",
  setup () {
    const rows = ref([])
    const filter = ref('')
    const loading = ref(false)
    const pagination = ref({
      page: 1,
      rowsPerPage: 3,
      rowsNumber: 10
    })
    const serviceApi = inject('api')

    function onRequest (props) {

      // const app = getCurrentInstance()
      // const serviceApi = app.appContext.config.globalProperties.$api

      const { page, rowsPerPage } = props.pagination

      loading.value = true

      let offset = (page - 1) * rowsPerPage

      serviceApi.getAllApartments(offset, rowsPerPage).then(response => {
        pagination.value.page = response.data.page
        pagination.value.rowsPerPage = rowsPerPage
        pagination.value.rowsNumber = response.data.totalDocs

        let returnedData = response.data.docs
        rows.value.splice(0, rows.value.length, ...returnedData)
        //rows.value = response.data.docs

        loading.value = false
      }).catch((error) => {
        alert(error)
        loading.value = false
      });
    }

    onMounted(() => {
      // get initial data from server (1st page)
      onRequest({
        pagination: pagination.value
      })
    })

    return {
      loading,
      pagination,
      columns,
      rows,

      onRequest
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


</style>
