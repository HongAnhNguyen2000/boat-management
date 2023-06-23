<template>
  <div class="data-container">
    <v-table>
      <thead>
        <tr>
          <th class="text-left">
            Thời gian tạo
          </th>
          <th class="text-left">
            Thuyền trưởng
          </th>
          <th class="text-left">
            Số đăng ký
          </th>
          <th class="text-left">
            Loại Phương Tiện
          </th>
          <th class="text-left">
            Bến rời
          </th>
          <th class="text-left">
            Bến đến
          </th>
          <th class="text-left">
            Thời gian xuất phát
          </th>
          <th class="text-left">
            Trạng thái
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(item, index) in listBussinessData"
          :key="item.name + index"
          @click="gotoDetail(item.id)"
          style="cursor:pointer"
        >
          <td>{{ item.created_at }}</td>
          <td>{{ item.captain }}</td>
          <td><div v-html="item.vehicle['registration-number'] ?? ''"/></td>
          <td><div v-html="item.vehicle['type'] ?? ''"/></td>
          <td>{{ item.toStation }}</td>
          <td>{{ item.fromStation }}</td>
          <td>{{ item.time }}</td>
          <td>{{ item.type }}</td>
        </tr>
      </tbody>
    </v-table>
  </div>
</template>

<script lang="ts">
import { addVehicle, getBussinessData, getListVehicle, getVehicle } from '@/firebase'
import { getEventListeners } from 'events'
export default {
  data () {
    return {
      listBussinessData: [],
      vehicles: [],
    }
  },
  created(): void {
    this.getBussinessData()
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
    },
    async getBussinessData() {
      const getDatas = await getBussinessData()
      const forms = []
      const idVehicles = []
      for (const form of getDatas) {
        let vehicle: any = {}
        if (!idVehicles.includes(form['idVehicle'])) {
          idVehicles.push(form['idVehicle'])
          const getDataVehicle = await getVehicle(form['idVehicle']);
          vehicle = {...getDataVehicle, idVehicle: form['idVehicle']}
          this.vehicles.push(vehicle)
        } else {
          vehicle = this.vehicles.find(vehicle => vehicle['idVehicle'] === form['idVehicle'])
          console.log(vehicle)
        }
        console.log('vehicle', vehicle)
        forms.push({...form, vehicle});
      }
      this.listBussinessData = forms
    },
    gotoDetail(id) {
      this.$router.push('form/'+id)
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
