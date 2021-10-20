<template>
  <div class="wrapper">
    <div class="header">HSK Admin</div>
    <div class="date">XX/XX/XXXX</div>

    <q-table
      title="Treats"
      :rows="rows"
      :columns="columns"
      v-model:pagination="pagination"
      row-key="_id"
      :loading="loading"
      @request="onRequest"
    >
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td auto-width>
            <q-btn size="sm" color="primary" round dense @click="expandRow(props)" icon="edit"></q-btn>&nbsp;
            <q-btn size="sm" color="primary" round dense @click="deleteApartment(props.key)" icon="delete"></q-btn>
          </q-td>
          <q-td
            v-for="col in props.cols"
            :key="col.name"
            :props="props"
          >
            {{ col.value }}
          </q-td>
        </q-tr>
        <q-tr v-show="props.expand" :props="props">
          <q-td colspan="100%">
            <!-- <div class="text-left">This is expand slot for row above: {{ props.key }} {{ props.row.apartmentName }}.</div> -->
            <div class="text-left">
              <q-input v-model="props.row.apartmentName"></q-input>
              <q-input type="number" v-model="props.row.keys" dense autofocus></q-input>
              <q-btn color="primary" label="OK" @click="confirmUpdate(props)"></q-btn>
              <q-btn color="primary" label="Cancel" @click="cancelUpdate(props)"></q-btn>
            </div>
          </q-td>
        </q-tr>
      </template>
    </q-table>
    <div>Create new apartment</div>
    <div>
      <q-input v-model="newApartmentName"></q-input>
      <q-input type="number" v-model="newApartmentKey" dense autofocus></q-input>
      <q-btn color="primary" label="OK" @click="confirmCreate()"></q-btn>
      <q-btn color="primary" label="Cancel" @click="cancelCreate()"></q-btn>
    </div>
    
  </div>
</template>

<script>

import { defineComponent, ref, onMounted, inject } from "vue";

const columns = [
  {
    
  },
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
    const newApartmentName = ref('')
    const newApartmentKey = ref('')
    const editApartmentName = ref('')
    const editApartmentKeys = ref()
    const elementExpanded = ref(false)
    const rows = ref([])
    const loading = ref(false)
    const pagination = ref({
      page: 1,
      rowsPerPage: 10
    })
    const serviceApi = inject('api')

    function deleteApartment(apartmentId) {
      serviceApi.removeApartment(apartmentId).then((response) => {
        rows.value = rows.value.filter(apt => apt._id !== apartmentId)
      }).catch((error) => {
        alert("Remove apartment failed")
      })
    }

    function expandRow(properties){
      if (!elementExpanded.value){
        editApartmentName.value = properties.row.apartmentName
        editApartmentKeys.value = properties.row.keys
        properties.expand = true
        elementExpanded.value = true
      } else {
        properties.expand = false
        elementExpanded.value = false
      }
    }

    function updateApartment(id, name, keys){
      return serviceApi.modifyApartment(id, {
        apartmentName: name,
        keys: keys
      })
    }

    function confirmUpdate(properties) {
      updateApartment(properties.key, properties.row.apartmentName, properties.row.keys).then(() => {
      }).catch((error) => {
        alert("Error updating")
      }).finally(() => {
        properties.expand = false
        elementExpanded.value = false
      })
    }

    function cancelUpdate(properties) {
      properties.row.apartmentName = editApartmentName.value
      properties.row.keys = editApartmentKeys.value
      properties.expand = false
      elementExpanded.value = false
    }

    function confirmCreate(){
       serviceApi.createNewApartment({
         apartmentName: newApartmentName.value,
         keys: newApartmentKey.value
       }).then((response) => {
         // TODO loading
          onRequest({
            pagination: pagination.value
          })
       }).catch((error) => {
         alert("Apartment creation failed")
       })
    }

    function cancelCreate(){
      newApartmentName.value = ''
      newApartmentKey.value=''
    }

    function onRequest (props) {

      // const app = getCurrentInstance()
      // const serviceApi = app.appContext.config.globalProperties.$api

      const { page, rowsPerPage } = props.pagination

      loading.value = true

      let offset = (page - 1) * rowsPerPage
      let limit = rowsPerPage

      if (limit === 0){
        limit = pagination.value.rowsNumber
      }

      serviceApi.getAllApartments(offset, limit).then(response => {
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

      newApartmentName,
      newApartmentKey,

      onRequest,
      deleteApartment,
      expandRow,
      confirmUpdate,
      cancelUpdate,

      confirmCreate,
      cancelCreate
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
