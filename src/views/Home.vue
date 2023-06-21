<template>
 <v-layout row justify-center>
      <v-toolbar app dark color="blue-grey darken-1" class="hidden-xs-and-down">
        <v-toolbar-title>Boat management</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
         <v-btn
           v-for="item in nav"
           :key="item.icon"
           :to="item.url"
           :title="item.title"
           flat
         >{{ item.text }}</v-btn>
        </v-toolbar-items>
      </v-toolbar>
  </v-layout>
  <div class="data-container">
  <business-form/>
  </div>

    
</template>

<script lang="ts">
import BusinessForm from '@/components/BusinessForm.vue'
import { getListVehicle } from '@/firebase'
export default {
  components: { BusinessForm },
   data () {
    return {
      dialog: false,
      vehicle: [] as any,
      nav: [
        {
          icon: 'Regis Form',
          text: 'Form',
          title: 'Back to Form page',
          url: '#',
          active: true
        },
        {
          icon: 'List',
          text: 'List',
          title: 'List',
          url: '#',
          active: false
        },
        {
          icon: 'AddVihicle',
          text: 'Add Vihicle',
          title: 'Add Vihicle',
          url: '/add-vehicle',
          active: false
        },

      ]
    }
  },
  created() {
    this.getVehicle()
  },
  methods: {
    async getVehicle() {
      const list = await getListVehicle()
      this.vehicle = list
      console.log(list)
    }
  }
}
</script>
<style scoped>
.data-container {
  margin: 2rem;
padding: 40px 56px;
}
</style>
