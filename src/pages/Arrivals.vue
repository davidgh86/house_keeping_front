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
              <q-select v-model="modifyApartment" :options="apartments" label="Apartment"></q-select>
              <q-input type="number" v-model="modifyKeys" label="Keys"></q-input>
              <q-input type="date" v-model="modifyCheckInDate" label="Check in date"></q-input>
              <q-toggle v-model="modifySpecifyCheckInTime"></q-toggle>
              <q-input v-if="modifySpecifyCheckInTime" type="time" v-model="modifyCheckInTime" label="Check in time"></q-input>
              <q-input type="date" v-model="modifyCheckOutDate" label="Check out date"></q-input>
              <q-toggle v-model="modifySpecifyCheckOutTime"></q-toggle>
              <q-input v-if="modifySpecifyCheckOutTime" type="time" v-model="modifyCheckOutTime" label="Check out time"></q-input>
              <q-btn color="primary" label="OK" @click="confirmUpdate(props)"></q-btn>
              <q-btn color="primary" label="Cancel" @click="cancelUpdate(props)"></q-btn>
            </div>
          </q-td>
        </q-tr>
      </template>
    </q-table>
    <div>Create new user</div>
    <div>
      <q-select filled v-model="newApartment" :options="apartments" label="Apartment"></q-select>
      <q-input type="number" v-model="newApartment.keys" label="Provided keys"></q-input>
      <div>
        <div class="q-gutter-md row items-start">
          <div class="seletor-time-container">
            <div>Pick time range</div>
            <q-date v-model="dateRange" mask="YYYY-MM-DD HH:mm" range></q-date>
          </div>
          <div class="seletor-time-container">
            <q-toggle v-model="newSpecifyCheckInTime" label="Specified check in Time" class="selector-time-toogle-container"></q-toggle>
            <q-time v-model="dateRange.from" mask="YYYY-MM-DD HH:mm" v-if="newSpecifyCheckInTime" class="selector-time-time-container"></q-time>
          </div>
          <div class="seletor-time-container">
            <q-toggle v-model="newSpecifyCheckOutTime" label="Specified check out Time" class="selector-time-toogle-container"></q-toggle>
            <q-time v-model="dateRange.to" mask="YYYY-MM-DD HH:mm" v-if="newSpecifyCheckOutTime" class="selector-time-time-container"></q-time>
          </div>
        </div>
      </div>
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
    label: 'Apartment',
    align: 'left',
    field: row => {
      return row.apartment.apartmentName
    },
  },
  {
    name: 'expectedKeys',
    required: true,
    label: 'Keys',
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
    field: row => {
      return new Date(row.checkInDate).toLocaleString();
    }
  },
  {
    name: 'specifiedCheckInTime',
    required: true,
    label: 'Arrival time confirmed',
    align: 'left',
    field: 'specifiedCheckInTime',
  },
  {
    name: 'checkOutDate',
    required: true,
    label: 'Check out date',
    align: 'left',
    field: row => {
      return new Date(row.checkOutDate).toLocaleString();
    }
  },
  {
    name: 'specifiedCheckOutTime',
    required: true,
    label: 'Departure time confirmed',
    align: 'left',
    field: 'specifiedCheckOutTime',
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
    const apartments = ref([])
    const newApartment = ref('')
    const newExpectedKeys = ref('')
    const dateRange = ref({ from: '', to: '' })
    const newSpecifyCheckInTime = ref(false)
    const newSpecifyCheckOutTime = ref(false)
    const elementExpanded = ref(false)
    const rows = ref([])
    const loading = ref(false)
    const pagination = ref({
      page: 1,
      rowsPerPage: 10
    })

    const modifyApartment = ref()
    const modifyCheckInDate = ref()
    const modifyCheckInTime = ref()
    const modifyCheckOutDate = ref()
    const modifyCheckOutTime = ref()
    const modifySpecifyCheckInTime = ref()
    const modifySpecifyCheckOutTime = ref()
    const modifyKeys = ref()

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
        // editUserEmail.value = properties.row.email
        // editUserRole.value = properties.row.role
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
      let dateFrom = dateRange.value.from
      if (!newSpecifyCheckInTime.value) {
        dateFrom = dateFrom.slice(0, -5) + "15:30"
      }
      dateFrom = Date.parse(dateFrom)

      let dateTo = dateRange.value.to
      if (!newSpecifyCheckOutTime.value) {
        dateTo = dateTo.slice(0, -5) + "10:30"
      }
      dateTo = Date.parse(dateTo)

      serviceApi.createNewBooking({
        apartment: newApartment.value.apartmentId,
        expectedKeys: newApartment.value.keys,
        checkInDate: dateFrom,
        specifiedCheckInTime: newSpecifyCheckInTime.value,
        checkOutDate: dateTo,
        specifiedCheckOutTime: newSpecifyCheckOutTime.value
      }).then((response) => {
        // TODO loading
        onRequest({
          pagination: pagination.value
        })
      }).catch((error) => {
        alert("Error creating Booking: "+ error.response.data.message)
      })
    }

    function cancelCreate(){

      newApartment.value = ''
      newExpectedKeys.value = ''
      dateRange.value = { from: '', to: '' }
      newSpecifyCheckInTime.value = false
      newSpecifyCheckOutTime.value = false
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

      serviceApi.getAllBookings(offset, limit).then(response => {
        pagination.value.page = response.page
        pagination.value.rowsPerPage = rowsPerPage
        pagination.value.rowsNumber = response.totalDocs

        let returnedData = response.docs
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
      
      serviceApi.getAllApartments().then(response => {
        apartments.value = response.map(item => {
          return {
            label: item.apartmentName,
            apartmentId: item._id,
            keys: item.keys
          }
        })
      }).catch(error => {
        alert("Error retrieving apartments")
      })
    })

    return {
      loading,
      pagination,
      columns,
      rows,

      apartments,

      newApartment,
      dateRange,
      newExpectedKeys,
      newSpecifyCheckInTime,
      newSpecifyCheckOutTime,

      modifyApartment,
      modifyCheckInDate,
      modifyCheckInTime,
      modifyCheckOutDate,
      modifyCheckOutTime,
      modifySpecifyCheckInTime,
      modifySpecifyCheckOutTime,
      modifyKeys,

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
.seletor-time-container {
  display: grid;
  grid-template-columns: 1fr;
}


</style>
