<template>
 <v-layout row justify-center>
      <v-toolbar app dark color="blue-grey darken-1" class="hidden-xs-and-down">
        <v-toolbar-title>Boat management</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
         <v-btn
           v-for="item in nav"
           :key="item.icon"
           to="#"
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
export default {
  components: { BusinessForm },
   data () {
    return {
      dialog: false,
      nav: [
        {
          icon: 'Regis Form',
          text: 'Form',
          title: 'Back to Form page',
          active: true
        },
        {
          icon: 'List',
          text: 'List',
          title: 'List',
          active: false
        },

      ]
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
