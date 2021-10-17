<template>
  <div>
    <div class="wrapper">
      <div class="name apartment_radius" :class="[cleaninStatus]" @click="changeStatus">{{ apartmentInfoData.name }}</div>
      <div class="time">{{ apartmentInfoData.time }}</div>
      <div class="keys apartment_radius" :class="[deliveredKeysStatus]" @click="addKey">{{ deliveredKeys }} / {{ apartmentInfoData.keys }}</div>
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
          @click="restoreKey()"
        ></q-btn>
      <!-- </div> -->
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'

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
    }
  },
  setup(){
    return {
      changeStatus: function (){
        if (this.apartmentInfoData.status === "dirty") {
          this.apartmentInfoData.status = "on_cleaning";
        } else if (this.apartmentInfoData.status === "on_cleaning"){
          this.apartmentInfoData.status = "clean";
        } else if (this.apartmentInfoData.status === "clean") {
          this.apartmentInfoData.status = "dirty"
        }else{
          this.apartmentInfoData.status = "dirty"
        }
      },
      addKey: function (){
        this.deliveredKeys++;
      },
      restoreKey: function() {
        this.deliveredKeys = 0;
      },
      swithMessageBox: function() {
        this.showMessageBox = !this.showMessageBox
      }
    }
  },
  mounted() {
  },
  computed: {
    cleaninStatus: function () {
      if (this.apartmentInfoData.status === "dirty") {
        return "status_dirty";
      } else if (this.apartmentInfoData.status === "on_cleaning"){
        return "status_on_cleaning";
      } else if (this.apartmentInfoData.status === "clean") {
        return "status_clean"
      }else{
        return ""
      }
    },
    deliveredKeysStatus: function () {
      if (!this.apartmentInfoData.keys){
        return ""
      }
      if (this.apartmentInfoData.keys !== this.deliveredKeys) {
        return "status_dirty"
      } else {
        return "status_clean"
      }
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
.apartment_radius{
  border-radius: 0.94rem;
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
