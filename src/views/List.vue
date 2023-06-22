<template>
  <div class="data-container">
    <p>Hello</p>
    </div>
</template>

<script lang="ts">
import { addVehicle, getListVehicle } from '@/firebase'
export default {
  data () {
    return {
      dialog: false,
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
