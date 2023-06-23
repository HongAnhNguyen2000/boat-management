<template>

  <div class="data-container">
    <div class="grey lighten-4 nft-page create-qr-page contentsWrapStyle" >
      <v-text-field variant="outlined" placeholder="Tên phương tiện" v-model="name"></v-text-field>
      <v-text-field variant="outlined" placeholder="Số đăng ký" v-model="registrationNumber"/>
      <v-text-field variant="outlined" placeholder="Hạn bảo hiểm" v-model="insuranceDeadline"/>
      <v-text-field variant="outlined" placeholder="Ảnh bảo hiểm" v-model="insurancePhoto"/>
      <v-text-field variant="outlined" placeholder="Hạn đăng kiểm" v-model="registrationDeadline"/>
      <v-text-field variant="outlined" placeholder="Ảnh đăng kiểm" v-model="registrationPhoto"/>
      <v-text-field variant="outlined" placeholder="Trọng tải" v-model="tonnage"/>
      <v-text-field variant="outlined" placeholder="Loại phương tiện" v-model="type"/>
      <v-text-field variant="outlined" placeholder="Chủ phương tiện" v-model="vehicleOwner"/>
      <v-text-field variant="outlined" placeholder="Công suất" v-model="wattage"/>
      <v-text-field variant="outlined" placeholder="Năm sản xuất" v-model="yearManufacture"/>
    </div>
    <v-btn 
        block
        class="mb-8"
        color="black"
        size="large"
        variant="tonal"
        @click="regis"
      >
        Đăng ký
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
