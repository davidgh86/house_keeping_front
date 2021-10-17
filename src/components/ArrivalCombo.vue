<template>
  <div>
    <div class="container-combo">
      <select
        class="apartment-combo"
        v-model="comboValue"
        @change="handleChange"
      >
        <option
          v-for="apartment in allApartments"
          :key="apartment.id"
          :value="apartment.id"
        >
          {{ apartment.name }} - {{ apartment.time }} - {{ apartment.keys }}
        </option>
      </select>
      <q-btn
        color="primary"
        text-color="white"
        icon="edit"
        class="apt-action-button edit-button"
        @click="switchEditButton()"
      ></q-btn>
      <q-btn
        color="primary"
        text-color="white"
        icon="delete"
        class="apt-action-button delete-button"
        @click="emitDelete()"
      ></q-btn>
    </div>
    <div v-show="showDataEdit" class="edit-section">
      <div class="edit-time">
        <label>Arrival time</label>
        <input v-model="selectedApartment.time" />
      </div>
      <div class="edit-keys">
        <label>Keys</label>
        <input v-model="selectedApartment.keys" />
      </div>
      <div class="edit-confirm">
        <q-btn
          color="primary"
          text-color="white"
          icon="check"
          @click="confirmEdition()"
        >
        </q-btn>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "ArrivalCombo",
  props: {
    allApartments:{
      type: Array,
      required: true,
    },
  },
  data: function () {
    return {
      showDataEdit: false,
      selectedItemId: null,
      comboValue: "",
      selectedApartment: {}
    };
  },
  setup() {
    return {
      emitDelete: function () {
        this.$emit("delete");
      },
      switchEditButton: function () {
        this.showDataEdit = !this.showDataEdit;
      },
      handleChange: function () {
        this.selectedApartment = this.allApartments.filter(
          (apartment) => apartment.id === this.comboValue
        )[0];
        this.$emit("changeItem", this.selectedApartment);
      },
      confirmEdition: function () {
        this.$emit("confirmEdition", this.selectedApartment);
      },
    };
  },
  mounted() {},
  computed: {},
});
</script>

<style scoped>
.container-combo {
  display: grid;
  grid-template-columns: 8fr 1fr 1fr;
  grid-auto-rows: minmax(100px, auto);
  grid-gap: 15px;
  text-align: center;
  border-top: 100px;
  font-family: "Open Sans";
  font-weight: 300;
}
.apartment-combo {
  grid-column: 1;
  grid-row: 1;
  background-color: #f5f5f5;
  border-radius: 10px;
  text-align: center;
  padding-right: 20px;
  font-size: 30px;
}
.apt-action-button {
  grid-row: 1;
}
.edit-button {
  grid-column: 2;
}
.delete-button {
  grid-column: 3;
}
.edit-section {
  margin: 0.5rem;
  grid-row: 2;
  display: grid;
  grid-template-columns: 4fr 4fr 1fr;
}
.edit-time {
  grid-column: 1;
}
.edit-keys {
  grid-column: 2;
}
.edit-confirm {
  grid-column: 3;
}
</style>
