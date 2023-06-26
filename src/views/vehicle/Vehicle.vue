<template>
  <div class="data-container">
    <div class="grey user-info">
      <h2>Thông tin phương tiện</h2>
      <p class="mt-3">
        <span> Tên: </span>
        <span>
          {{ name }}
        </span>
      </p>
      <p class="mt-3">
        <span> Số đăng ký: </span>
        <span>
          {{ registrationNumber }}
        </span>
      </p>
      <p class="mt-3">
        <span> Chủ phương tiện: </span>
        <span>
          {{ vehicleOwner }}
        </span>
      </p>
      <p class="mt-3">
        <span> Trọng tải: </span>
        <span>
          {{ tonnage }} tấn
        </span>
      </p>
      <p class="mt-3">
        <span> Công suất: </span>
        <span>
          {{ wattage }}
        </span>
      </p>
      <p class="mt-3">
        <span> Năm sản xuất: </span>
        <span>
          {{ yearManufacture }}
        </span>
      </p>
      <p class="mt-3">
        <span> Loại phương tiện: </span>
        <span>
          {{ type }}
        </span>
      </p>
      <p class="mt-3">
        <span> Công ty: </span>
        <span>
          {{ company }}
        </span>
      </p>
      <p class="mt-3">
        <span> Hạn đăng kiểm: </span>
        <span>
          {{ insuranceDeadline }}
        </span>
      </p>
    </div>
    <div>
      <v-btn
        class="mt-8 button-action"
        color="black"
        variant="tonal"
        @click="regis"
      >
        Cập nhật phương tiện
      </v-btn>
    </div>
  </div>
</template>

<script lang="ts">
import { getInfo, getUser, getVehicle } from "@/firebase";
import _ from "lodash";
export default {
  data() {
    return {
      registrationNumber: "",
      name: "",
      vehicleOwner: "",
      tonnage: "",
      wattage: "",
      yearManufacture: "",
      type: "",
      insuranceDeadline: "",
      company: "" as any,
      vehicle_id: "" as any,
    };
  },
  created() {
    this.vehicle_id = this.$route.params.vehicleID;
    this.getVehicle();
  },
  methods: {
    async regis() {
      this.$router.push("/vehicle/update/" + this.vehicle_id);
    },
    async getVehicle(): Promise<void> {
      if (_.isEmpty(this.vehicle_id)) {
        this.$router.push("/vehicles");
      } else {
        const vehicleDetail = await getVehicle(this.vehicle_id);
        this.registrationNumber = vehicleDetail['registration-number']
        this.name = vehicleDetail['name']
        this.vehicleOwner = vehicleDetail['vehicle-owner']
        this.tonnage = vehicleDetail['tonnage']
        this.wattage = vehicleDetail['wattage']
        this.yearManufacture = vehicleDetail['year-manufacture']
        this.type = vehicleDetail['type']
        this.insuranceDeadline = vehicleDetail['insurance-deadline']
        this.company = await this.getCompany(vehicleDetail['users_id'])
      }
    },
    async getCompany(userId){
      const user:any = await getUser(userId)
      const company = user.infos_id ? await getInfo(user.infos_id) : ''
      return user.infos_id ? company.company : ''
    },
  },
};
</script>
<style scoped>
.data-container {
  margin: 2rem;
  padding: 40px 56px;
}
p span:first-child {
  width: 140px;
}
p {
  display: flex;
}
.data-container {
  display: flex;
  flex-direction: column;
}
.button-action {
}
</style>
