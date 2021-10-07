<template>
  <div>
    <div v-for="pair in appartmentPairs" :key="pair.index" class="flexContainer">
      <ApartmentInfo v-for="apartmentData in pair" :apartmentInfo="apartmentData" :key="apartmentData.id" class="flexItem"/>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import ApartmentInfo from 'components/ApartmentInfo.vue'

export default defineComponent({
  name: 'ApartmentList',
  components: {
    ApartmentInfo
  },
  props: {
    apartmentList: {
      type: Array,
      required: true
    }
  },
  mounted() {
  },
  methods: {
    chunkArrayInGroups: function(arr, size) {
      let result = [];
      for(var i = 0; i < arr.length; i += size) {
        result.push(
          arr.slice(i, i+size)
        );
      }
      return result;
    } 
  },
  computed: {
    appartmentPairs: function () {
      return this.chunkArrayInGroups(this.apartmentList, 2)
    }
  }
})
</script>
<style scoped>
.flexContainer {
  display: block;
}

@media only screen and (min-width: 1024px) {
  .flexContainer {
    display: flex;
  }
}

.flexContainer .flexItem{
  width: 50%;
}
</style>
