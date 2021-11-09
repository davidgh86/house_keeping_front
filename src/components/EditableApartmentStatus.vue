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
        <textarea class="message-container"></textarea>
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
import { defineComponent, computed } from 'vue'

export default defineComponent({
  name: 'EditableApartmentStatus',
  props: {
    apartmentInfo: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      apartmentInfoData: this.apartmentInfo,
      deliveredKeys: 0,
      showMessageBox: false,
      interval: null,
    }
  },
  setup(){
    return {
      changeStatus: function (){
        if (!this.apartmentInfoData || !this.apartmentInfoData.cleaningStatus || !this.apartmentInfoData.cleaningStatus.cleaningStatus) {
          return ""
        }
        if (this.apartmentInfoData.cleaningStatus.cleaningStatus === "OCCUPIED") {
          this.apartmentInfoData.cleaningStatus.cleaningStatus = "READY_TO_CLEAN"
        } else if (this.apartmentInfoData.cleaningStatus.cleaningStatus === "READY_TO_CLEAN") {
          this.apartmentInfoData.cleaningStatus.cleaningStatus = "ON_CLEANING"
        } else if (this.apartmentInfoData.cleaningStatus.cleaningStatus === "ON_CLEANING"){
          this.apartmentInfoData.cleaningStatus.cleaningStatus = "CLEAN"
        } else if (this.apartmentInfoData.cleaningStatus.cleaningStatus === "CLEAN") {
          this.apartmentInfoData.cleaningStatus.cleaningStatus = "READY_TO_CLEAN"
        }else {
          this.apartmentInfoData.cleaningStatus.cleaningStatus = "READY_TO_CLEAN"
        }
        this.sendUpdateWithTimeout()
      },
      sendUpdate: function(){
        alert("apartment info data " + JSON.stringify(this.apartmentInfoData.cleaningStatus.cleaningStatus) + " deliveredKeys " + this.deliveredKeys)
        this.interval = null;
      },
      sendUpdateWithTimeout: function(){
        if (this.interval){
          clearTimeout(this.interval)
        }
        this.interval = setTimeout(() => {
          this.sendUpdate()
        }, 4000)
      },
      addKey: function (){
        this.deliveredKeys++;
        this.sendUpdateWithTimeout()
      },
      restoreKey: function() {
        this.deliveredKeys = 0;
        this.sendUpdateWithTimeout()
      },
      swithMessageBox: function() {
        this.showMessageBox = !this.showMessageBox
      },
      sendMessage: function(){
        alert("send message")
        this.sendUpdateWithTimeout()
      },
      sendOnDestory: function(){
        if (this.interval){
          clearTimeout(this.interval)
          this.sendUpdate()
        }
      }
    }
  },
  created() {
    window.addEventListener("beforeunload", function (e) {
    console.log("aaa1")
  var confirmationMessage = "\o/";

  //event.preventDefault();
  
  console.log("aaa2")
  e.returnValue = confirmationMessage; 
  console.log("aaa3")    // Gecko, Trident, Chrome 34+
  return confirmationMessage;              // Gecko, WebKit, Chrome <34
});
  },
  // mounted() {
  // },
  // beforeMount() {
  //   //window.addEventListener("beforeunload", this.sendOnDestory())
  // },
  // unmounted() {
  //     alert("beforeDestroy")
  // },
  // beforeUnmount(){
  //   this.sendOnDestory()
  // },
  methods: {
    handler: function handler(event) {
      console.log("asfdasf")
      var confirmationMessage = "\o/";

      e.returnValue = confirmationMessage;     // Gecko, Trident, Chrome 34+
      return confirmationMessage;
    }
  },
  computed: {
    cleaninStatus: function () {
      if (!this.apartmentInfoData || !this.apartmentInfoData.cleaningStatus || !this.apartmentInfoData.cleaningStatus.cleaningStatus) {
        return ""
      }
      if (this.apartmentInfoData.cleaningStatus.cleaningStatus === "OCCUPIED") {
        return "status_occupied"
      } else if (this.apartmentInfoData.cleaningStatus.cleaningStatus === "READY_TO_CLEAN") {
        return "status_dirty";
      } else if (this.apartmentInfoData.cleaningStatus.cleaningStatus === "ON_CLEANING"){
        return "status_on_cleaning";
      } else if (this.apartmentInfoData.cleaningStatus.cleaningStatus === "CLEAN") {
        return "status_clean"
      }else{
        return ""
      }
    },
    deliveredKeysStatus: function () {
      if (!this.apartmentInfoData.keys){
        return ""
      }
      if (this.apartmentInfoData.keys !== this.keysDelivered) {
        return "status_dirty"
      } else {
        return "status_clean"
      }
    },
    getTime: function(){
      let time = this.apartmentInfoData.limitTime
      if (!time){
        return "Not today"
      }
      let date = new Date(time)
      return date.getHours().toString().padStart(2, '0') + ":" + date.getMinutes().toString().padStart(2, '0')
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
