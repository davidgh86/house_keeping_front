<template>
  <div class="wrapper">
    <div class="header">HSK Admin</div>

    <q-table
      title="Arrivals"
      :rows="rows"
      :columns="columns"
      v-model:pagination="pagination"
      row-key="apartment._id"
      :loading="loading"
      @request="onRequest"
    >
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td auto-width>
            <q-btn size="sm" color="primary" round dense @click="expandRow(props)" icon="edit"></q-btn>&nbsp;
            <q-btn size="sm" color="primary" round dense @click="deleteArrival(props.key)" icon="delete"></q-btn>
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
            <div class="text-left">
              <q-input v-model="props.row.email" label="Email"></q-input>
              <q-input v-model="props.row.role" label="Role"></q-input>
              <q-btn color="primary" label="OK" @click="confirmUpdate(props)"></q-btn>
              <q-btn color="primary" label="Cancel" @click="cancelUpdate(props)"></q-btn>
            </div>
          </q-td>
        </q-tr>
      </template>
    </q-table>
    <div>Create new user</div>
    <div>
      <q-input v-model="newUserName" label="Username"></q-input>
      <q-input v-model="newPassword" label="Password"></q-input>
      <q-input v-model="newUserEmail" label="Email"></q-input>
      <q-input v-model="newUserRole" label="Role"></q-input>
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
    name: 'apartment',
    required: true,
    label: 'Apartment name',
    align: 'left',
    field: 'apartment.apartmentName',
  },
  {
    name: 'expectedKeys',
    required: true,
    label: 'Key provided',
    align: 'left',
    field: 'expectedKeys',
  },
  {
    name: 'returnedKeys',
    required: true,
    label: 'Returned keys',
    align: 'left',
    field: 'returnedKeys',
  },
  {
    name: 'checkInDate',
    required: true,
    label: 'Check in date',
    align: 'left',
    field: 'checkInDate',
  },
  {
    name: 'checkInTimeNull',
    required: true,
    label: 'Arrival time confirmed',
    align: 'left',
    field: 'checkInTimeNull',
  },
  {
    name: 'checkOutDate',
    required: true,
    label: 'Check out date',
    align: 'left',
    field: 'checkOutDate',
  },
  {
    name: 'checkOutTimeNull',
    required: true,
    label: 'Departure time confirmed',
    align: 'left',
    field: 'checkOutTimeNull',
  },
  {
    name: 'cleaningStatus',
    required: true,
    label: 'Cleaning Status',
    align: 'left',
    field: row => {
      let arrayStatus = row.cleaningStatus
      if (!arrayStatus || arrayStatus.length==0){
        return "Not cleaning necessary"
      } else {
        return arrayStatus[arrayStatus.length - 1]
      }
    },
  },
  {
    name: 'timeCleaned',
    required: true,
    label: 'Time cleaned',
    align: 'left',
    field: 'timeCleaned',
  },
  {
    name: 'timeCleaned',
    required: true,
    label: 'Time cleaned',
    align: 'left',
    field: 'timeCleaned',
  },
  {
    name: 'message',
    required: true,
    label: 'Message',
    align: 'left',
    field: 'message',
  }
]



export default defineComponent({
  name: "Arrivals",
  setup () {
    const arrivalDate = ref(new Date())
    const newApartmentId = ref('')
    const newExpectedKeys = ref('')
    const newReturnedKeys = ref('')
    const newCheckInDate = ref('')
    const newCheckInTimeNull = ref('')
    const newCheckOutDate = ref('')
    const newCheckOutTimeNull = ref('')
    const editUserEmail = ref('')
    const editUserRole = ref()
    const elementExpanded = ref(false)
    const rows = ref([])
    const loading = ref(false)
    const pagination = ref({
      page: 1,
      rowsPerPage: 10
    })
    const serviceApi = inject('api')

    function deleteArrival(username) {
      serviceApi.removeUser(username).then((response) => {
        rows.value = rows.value.filter(usr => usr.username !== username)
      }).catch((error) => {
        alert("Remove apartment failed")
      })
    }

    function expandRow(properties){
      if (!elementExpanded.value){
        editUserEmail.value = properties.row.email
        editUserRole.value = properties.row.role
        properties.expand = true
        elementExpanded.value = true
      } else {
        properties.expand = false
        elementExpanded.value = false
      }
    }

    function updateUser(username, email, role){
      return serviceApi.modifyUser(username, {
        username: username,
        email: email,
        role: role
      })
    }

    function confirmUpdate(properties) {
      updateUser(properties.key, properties.row.email, properties.row.role).then(() => {
      }).catch((error) => {
        alert("Error updating")
      }).finally(() => {
        properties.expand = false
        elementExpanded.value = false
      })
    }

    function cancelUpdate(properties) {
      properties.row.email = editUserEmail.value
      properties.row.role = editUserRole.value
      properties.expand = false
      elementExpanded.value = false
    }

    function confirmCreate(){
       serviceApi.createNewUser({
         username: newUserName.value,
         password: newPassword.value,
         email: newUserEmail.value,
         role: newUserRole.value
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
      newUserEmail.value = ''
      newUserRole.value =''
      newUserName.value = ''
      newPassword.value =''
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

      serviceApi.getAllUsers(offset, limit).then(response => {
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

      newUserEmail,
      newUserRole,
      newUserName,
      newPassword,

      onRequest,
      deleteArrival,
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
