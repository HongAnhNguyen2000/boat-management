<template>

  <div class="data-container">
    <div class="grey lighten-4 nft-page create-qr-page contentsWrapStyle" >
      <v-text-field variant="outlined" placeholder="UserName"></v-text-field>
      <v-text-field variant="outlined" placeholder="registration-number" v-model="registrationNumber"/>
      <v-text-field variant="outlined" placeholder="insurance-deadline" v-model="insuranceDeadline"/>
      <v-text-field variant="outlined" placeholder="insurance-photo" v-model="insurancePhoto"/>
      <v-text-field variant="outlined" placeholder="name" v-model="name"/>
      <v-text-field variant="outlined" placeholder="registration-deadline" v-model="registrationDeadline"/>
      <v-text-field variant="outlined" placeholder="registration-photo" v-model="registrationPhoto"/>
      <v-text-field variant="outlined" placeholder="tonnage" v-model="tonnage"/>
      <v-text-field variant="outlined" placeholder="type" v-model="type"/>
      <v-text-field variant="outlined" placeholder="vehicle-owner" v-model="vehicleOwner"/>
      <v-text-field variant="outlined" placeholder="wattage" v-model="wattage"/>
      <v-text-field variant="outlined" placeholder="year-manufacture" v-model="yearManufacture"/>
    </div>
    <v-btn
        block
        class="mb-8"
        color="black"
        size="large"
        variant="tonal"
        @click="regis"
      >
        Regis
      </v-btn>
  </div>

    
</template>

<script lang="ts">
import { addVehicle, getListVehicle } from '@/firebase'
export default {
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
      ],
      registrationNumber: '',
      insuranceDeadline: '',
      insurancePhoto: '',
      name: '',
      registrationDeadline: '',
      registrationPhoto: '',
      tonnage: '',
      type: '',
      vehicleOwner: '',
      wattage: '',
      yearManufacture: '',
    }
  },
  methods: {
    async regis() {
      const params = {
        "registration-number": this.registrationNumber,
        "insurance-deadline": this.insuranceDeadline,
        "insurance-photo": this.insurancePhoto,
        "name": this.name,
        "registration-deadline": this.registrationDeadline,
        "registration-photo": this.registrationPhoto,
        "tonnage": this.tonnage,
        "type": this.type,
        "vehicle-owner": this.vehicleOwner,
        "wattage": this.wattage,
        "year-manufacture": this.yearManufacture,
      }
      await addVehicle(params)
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
