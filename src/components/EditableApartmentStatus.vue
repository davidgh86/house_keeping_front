<template>
  <div>
    <div class="wrapper">
      <div class="name apartment_radius" :class="[cleaninStatus]" @click="changeStatus">{{ apartmentInfoData.apartmentName }}</div>
      <div class="time">{{ getTime }}</div>
      <div class="keys apartment_radius" :class="[deliveredKeysStatus]" @click="addKey">{{ deliveredKeys }} / {{ apartmentInfoData.expectedKeys }}</div>
      <q-btn
          color="primary"
          text-color="white"
          icon="restorekey"
          class="apt-action-button delete-button"
          @click="restoreKey()"
        ></q-btn>
      <q-btn
          color="primary"
          text-color="white"
          icon="message"
          class="apt-action-button delete-button"
          @click="swithMessageBox()"
        ></q-btn>
    </div>
    <div class="send-container" v-show="showMessageBox">
        <textarea class="message-container" v-model="messageText"></textarea>
        <q-btn
          class="send-button-container"
          color="primary"
          text-color="white"
          icon="send"
          @click="sendMessage()"
        ></q-btn>
      <!-- </div> -->
    </div>
  </div>
</template>

<script>
import { defineComponent, computed, inject, ref } from 'vue'

export default defineComponent({
  name: 'EditableApartmentStatus',
  props: {
    apartmentInfo: {
      type: Object,
      required: true
    }
  },
  setup(props){
    const serviceApi = inject('api')

    const apartmentInfoData = ref(props.apartmentInfo)
    const deliveredKeys = ref(props.apartmentInfo.returnedKeys)
    const showMessageBox = ref(false)
    var interval = null
    const messageText = ref('')

    // if (!window.apartmensUpdateInterval) {
    //   window["interval_apartement_"+props.apartmentInfo.apartmentCode] = {}
    // }

    const sendUpdate = async function(){
      try {
        let updatedInterval = await serviceApi.updateInterval({
          apartmentCode: apartmentInfoData.value.apartmentCode,
          bookingCode: apartmentInfoData.value.bookingCode,
          cleaningStatus: apartmentInfoData.value.cleaningStatus,
          returnedKeys: deliveredKeys.value
        })
        apartmentInfoData.value = updatedInterval
      }catch(error) {
        alert(JSON.stringify(error))
      }
      
      interval = null;
    }

    const sendOnDestory = async function() {
      if (interval){
        clearTimeout(interval)
        await sendUpdate()
      }
    }

    window.addEventListener("beforeunload", async (e) => {
      await sendOnDestory()
      return null;
    });

    function changeStatus (){
      if (!apartmentInfoData.value.cleaningStatus || !apartmentInfoData.value.cleaningStatus.cleaningStatus) {
        apartmentInfoData.value.cleaningStatus = {cleaningStatus:  "OCCUPIED"}
        sendUpdateWithTimeout()
        return;
      }
      if (apartmentInfoData.value.cleaningStatus.cleaningStatus === "OCCUPIED") {
        apartmentInfoData.value.cleaningStatus.cleaningStatus = "READY_TO_CLEAN"
      } else if (apartmentInfoData.value.cleaningStatus.cleaningStatus === "READY_TO_CLEAN") {
        apartmentInfoData.value.cleaningStatus.cleaningStatus = "ON_CLEANING"
      } else if (apartmentInfoData.value.cleaningStatus.cleaningStatus === "ON_CLEANING"){
        apartmentInfoData.value.cleaningStatus.cleaningStatus = "CLEAN"
      } else if (apartmentInfoData.value.cleaningStatus.cleaningStatus === "CLEAN") {
        apartmentInfoData.value.cleaningStatus.cleaningStatus = "OCCUPIED"
      }else {
        apartmentInfoData.value.cleaningStatus.cleaningStatus = "READY_TO_CLEAN"
      }
      sendUpdateWithTimeout()
    };

    function sendUpdateWithTimeout(){
      if (interval){
        clearTimeout(interval)
      }
      interval = setTimeout(() => {
        sendUpdate()
      }, 4000)
    };

    function addKey(){
      if (deliveredKeys.value || deliveredKeys.value === 0 ){
        deliveredKeys.value = deliveredKeys.value + 1;
      } else {
        deliveredKeys.value = 0;
      }
      sendUpdateWithTimeout()
    }

    function restoreKey(){
      deliveredKeys.value = null;
      sendUpdateWithTimeout()
    }
    
    function swithMessageBox() {
      showMessageBox.value = !showMessageBox.value
    }

    function sendMessage(){
      alert("send message: " + messageText.value)
    }

    const cleaninStatus = computed(() => {
      if (!apartmentInfoData.value || !apartmentInfoData.value.cleaningStatus || !apartmentInfoData.value.cleaningStatus.cleaningStatus) {
        return ""
      }
      if (apartmentInfoData.value.cleaningStatus.cleaningStatus === "OCCUPIED") {
        return "status_occupied"
      } else if (apartmentInfoData.value.cleaningStatus.cleaningStatus === "READY_TO_CLEAN") {
        return "status_dirty";
      } else if (apartmentInfoData.value.cleaningStatus.cleaningStatus === "ON_CLEANING"){
        return "status_on_cleaning";
      } else if (apartmentInfoData.value.cleaningStatus.cleaningStatus === "CLEAN") {
        return "status_clean"
      }else{
        return ""
      }
    })

    const deliveredKeysStatus = computed(() => {
      if (!apartmentInfoData.value.keys){
        return ""
      }
      if (apartmentInfoData.value.keys !== keysDelivered.value) {
        return "status_dirty"
      } else {
        return "status_clean"
      }
    })

    const getTime = computed(() => {
      let time = apartmentInfoData.value.limitTime
      if (!time){
        return "Not today"
      }
      let date = new Date(time)
      return date.getHours().toString().padStart(2, '0') + ":" + date.getMinutes().toString().padStart(2, '0')
    })

    return {

      changeStatus,
      addKey,
      restoreKey,
      swithMessageBox,
      sendMessage,
      sendOnDestory,

      apartmentInfoData,
      deliveredKeys,
      showMessageBox,
      messageText,

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
  grid-template-columns: 1fr 10fr 2fr 2fr 1fr 1fr 1fr;
  grid-column-gap: 0.5rem;
}
.name{
  grid-column: 2;
}
.time{
  grid-column: 3;
}
.keys{
  grid-column: 4;
}
.status_clean{
  background-color:green;
}
.status_dirty{
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
  font-size: 1.5rem;
}
.button-reset{
  grid-column: 5;
}
.button-message{
  grid-column: 6;
}
.send-container{
  display: grid;
  grid-template-columns: 1fr 10fr 1fr 1fr;
  grid-column-gap: 1rem;
}
.send-button-container{
  grid-column: 3
}
.message-container{
  grid-column: 2
}
</style>
