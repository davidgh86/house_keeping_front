<template>
  <div class="wrapper">
    <div class="header">HSK Admin</div>
    <div class="subheading">XX/XX/XXXX</div>

    <div class="selectionbox">
      <div v-for="(comboId, index) in combosIds"
          :key="comboId" class="apt-row" v-bind:style="getStyleRow(index + 1)">
        <apartment-combo :allApartments="allApartments" 
          @confirmEdition="confirmEdition(comboId, $event)" 
          @changeItem="updateApartment(comboId, $event)"
          @delete="removeElement(comboId)"/>
      </div>
    </div>
    <div class="selectionbox">
      <div class="plus" @click="addElement">
        <i class="fas fa-plus"></i>
      </div>
      <div
        class="confirm"
        href="www.citybreakapartments.com"
        @click="goToApartments()"
      >
        CONFIRM
      </div>
      <img
        src="https://www.citybreakapartments.com/wp-content/uploads/2017/10/CityBreakApartments2.png"
        alt="City Break Logo"
      />
    </div>
  </div>
</template>

<script>
import { v4 as uuidv4 } from "uuid";
import { defineComponent } from "vue";
import ApartmentCombo from "components/ApartmentCombo.vue";

export default defineComponent({
  name: "Admin",
  components: {
    ApartmentCombo
  },
  setup() {
    return {
      addElement: function (value) {
        let uuid = uuidv4();
        this.combosIds.push(uuid);
      },
      removeElement: function (uuid) {
        this.combosIds = this.combosIds.filter(function (value){
          return value !== uuid
        })
        delete this.selectedApartments[uuid];
      },
      confirmEdition: function(uuid, apartment){
        this.updateApartment(uuid, apartment)
        alert("update send to back")
        // TODO 
      },
      updateApartment: function(uuid, apartment){
        this.selectedApartments[uuid] = apartment
      },
      getStyleRow: function (rowNumber) {
        return { gridRow: rowNumber };
      },
      goToApartments: function () {
        // TODO send alert list to back
        alert("Send all alerts to back")
        this.$router.push("/apartments");
      },
    };
  },

  watch: {
    getVisibilityStyle: function (uuid) {
        return { visibility: this.visible[uuid] };
      },
  },

  mounted() {
  },
  data: function () {
    return {
      allApartments: [
        { id: 0, name: "name1", keys: 3, status: "clean", keysDelivered: 3 },
        { id: 1, name: "name2", time: "11:40", keys: 3, status: "on_cleaning" },
        {
          id: 2,
          name: "name3",
          time: "12:15",
          status: "dirty",
          keys: 5,
          keysDelivered: 3,
        },
        { id: 3, name: "name4", keys: 3, status: "clean", keysDelivered: 3 },
        { id: 4, name: "name5", time: "11:40", keys: 3, status: "on_cleaning" },
        {
          id: 5,
          name: "name6",
          time: "12:15",
          keys: 8,
          status: "dirty",
          keysDelivered: 3,
        },
      ],
      combosIds: [],
      visible: {},
      selectedApartments: {},
    };
  },
  methods: {},
  computed: {
    apartmentNames: function () {
      return this.allApartments.map((appartment) => {
        return appartment.name;
      });
    },
    apartmentIds: function () {
      return this.allApartments.map((appartment) => {
        return appartment.id;
      });
    },
  },
});
</script>

<style scoped>
.header {
  grid-row: 1;
  background-image: linear-gradient(to right, #009eda, #025389);
  color: white;
  font-family: "Open Sans";
  font-style: normal;
  font-size: 4.6875rem;
  text-align: center;
  padding: 0.9375rem;
}
.subheading {
  grid-column: 1;
  grid-row: 2;
  font-family: "Open Sans";
  font-style: normal;
  font-size: 5rem;
  text-align: center;
  margin-top: 3.125rem;
  margin-bottom: 3.125rem;
}
div.selectionbox {
  display: grid;
  grid-template-columns: 1fr 4fr 1fr;
  grid-auto-rows: minmax(6.25rem, auto);
  grid-gap: 0.9375rem;
  text-align: center;
  border-top: 6.25rem;
  font-family: "Open Sans";
  font-weight: 300;
}
.apt-row {
  grid-column: 2;
}
.apt-edit {
  margin: 0.2rem;
  grid-row: 2;
}
.plus {
  grid-column: 3;
  grid-row: 8;
  color: white;
  background-color: #025389;
  border-radius: 50%;
  text-align: center;
  font-size: 3.125rem;
  vertical-align: middle;
  font-size: 6.875rem;
  min-height: 9.375rem;
}
.confirm {
  grid-column: 2;
  grid-row: 9;
  border-radius: 1.5625rem;
  display: block;
  height: 6.25rem;
  width: 25rem;
  text-align: center;
  margin-left: auto;
  margin-right: auto;
  font-family: "Open Sans";
  font-size: 4.375rem;
  font-weight: 600;
  background-color: #025389;
  color: white;
}
img {
  grid-column: 2;
  grid-row: 10;
  display: block;
  margin-top: 1.5625rem;
  margin-left: auto;
  margin-right: auto;
}
</style>
