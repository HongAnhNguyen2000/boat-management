<template>
  <div class="data-container">
    <h2 class="mb-5">Cập nhật phương tiện</h2>
    <div class="grey lighten-4 nft-page create-qr-page contentsWrapStyle">
      <v-text-field
        variant="outlined"
        placeholder="Tên phương tiện*"
        label="Tên phương tiện*"
        v-model="vehicle.name"
        :rules="[rules.required]"
      />
      <v-text-field
        variant="outlined"
        placeholder="Số đăng ký*"
        label="Số đăng ký*"
        v-model="vehicle.registrationNumber"
        :rules="[rules.required]"
        class="mt-3"
      />
      <v-text-field
        variant="outlined"
        placeholder="Hạn bảo hiểm*"
        label="Hạn bảo hiểm*"
        v-model="vehicle.insuranceDeadline"
        :rules="[rules.required]"
        class="mt-3"
      />
      <v-text-field
        variant="outlined"
        placeholder="Ảnh bảo hiểm*"
        label="Ảnh bảo hiểm*"
        v-model="vehicle.insurancePhoto"
        :rules="[rules.required]"
        class="mt-3"
      />
      <v-text-field
        variant="outlined"
        placeholder="Hạn đăng kiểm*"
        label="Hạn đăng kiểm*"
        v-model="vehicle.registrationDeadline"
        :rules="[rules.required]"
        class="mt-3"
      />
      <v-text-field
        variant="outlined"
        placeholder="Ảnh đăng kiểm*"
        label="Ảnh đăng kiểm*"
        v-model="vehicle.registrationPhoto"
        :rules="[rules.required]"
        class="mt-3"
      />
      <v-text-field
        variant="outlined"
        placeholder="Trọng tải*"
        label="Trọng tải*"
        v-model="vehicle.tonnage"
        :rules="[rules.required]"
        class="mt-3"
      />
      <v-text-field
        variant="outlined"
        placeholder="Loại phương tiện*"
        label="Loại phương tiện*"
        v-model="vehicle.type"
        :rules="[rules.required]"
        class="mt-3"
      />
      <v-text-field
        variant="outlined"
        placeholder="Chủ phương tiện*"
        label="Chủ phương tiện*"
        v-model="vehicle.vehicleOwner"
        :rules="[rules.required]"
        class="mt-3"
      />
      <v-text-field
        variant="outlined"
        placeholder="Công suất*"
        label="Công suất*"
        v-model="vehicle.wattage"
        :rules="[rules.required]"
        class="mt-3"
      />
      <v-text-field
        variant="outlined"
        placeholder="Năm sản xuất*"
        label="Năm sản xuất*"
        v-model="vehicle.yearManufacture"
      />
      <div>
        <h3>Chọn công ty</h3>
        <v-select
          class="mt-2"
          :items="companies"
          item-value="id"
          item-text="company"
          item-title="company"
          :value="vehicle['company']"
          v-model="vehicle.infosId"
          variant="solo"
        />
      </div>
    </div>
    <v-btn
      block
      class="mb-8"
      color="black"
      size="large"
      variant="tonal"
      @click="regis"
      :disabled="disabled"
    >
      Cập nhật
    </v-btn>
  </div>
</template>

<script lang="ts">
import {
  getInfo,
  getInfos,
  getVehicle,
  updateVehicle,
} from "@/firebase";
import _ from "lodash";

export default {
  data() {
    return {
      dialog: false,
      nav: [
        {
          icon: "Regis Form",
          text: "Form",
          title: "Back to Form page",
          active: true,
        },
        {
          icon: "List",
          text: "List",
          title: "List",
          active: false,
        },
      ],
      vehicle: {
        registrationNumber: "",
        insuranceDeadline: "",
        insurancePhoto: "",
        name: "",
        registrationDeadline: "",
        registrationPhoto: "",
        tonnage: "",
        type: "",
        vehicleOwner: "",
        wattage: "",
        yearManufacture: "",
        infosId: ''
      },
      companies: [] as any,
      vehicle_id: "" as any,
      disabled: true,
      rules: {
        required: (value: any) => !!value || "Xin mời nhập trường yêu cầu.",
      },
    };
  },
  created() {
    this.vehicle_id = this.$route.params.vehicleID;
    if (_.isEmpty(this.vehicle_id)) {
      this.$router.push("/vehicles");
    }
    this.getCompanies();
    this.getVehicle();
  },
  watch: {
    vehicle: {
      handler(newVal){
        console.log(this.vehicle['company'])
        console.log(this.vehicle['infosId'])
        this.disabled = !this.validate();
      },
      deep: true
    },
  },
  methods: {
    validate() {
      return (
        !_.isEmpty(this.vehicle['registrationNumber']) &&
        !_.isEmpty(this.vehicle['insuranceDeadline']) &&
        !_.isEmpty(this.vehicle['insurancePhoto']) &&
        !_.isEmpty(this.vehicle['name']) &&
        !_.isEmpty(this.vehicle['registrationDeadline']) &&
        !_.isEmpty(this.vehicle['registrationPhoto']) &&
        !_.isEmpty(this.vehicle['tonnage']) &&
        !_.isEmpty(this.vehicle['type']) &&
        !_.isEmpty(this.vehicle['vehicleOwner']) &&
        !_.isEmpty(this.vehicle['wattage']) &&
        !_.isEmpty(this.vehicle['yearManufacture']) &&
        !_.isEmpty(this.vehicle['infosId'])
      );
    },
    async regis() {
      const params = {
        "registration-number": this.vehicle['registrationNumber'],
        "insurance-deadline": this.vehicle['insuranceDeadline'],
        "insurance-photo": this.vehicle['insurancePhoto'],
        'name': this.vehicle['name'],
        "registration-deadline": this.vehicle['registrationDeadline'],
        "registration-photo": this.vehicle['registrationPhoto'],
        'tonnage': this.vehicle['tonnage'],
        'type': this.vehicle['type'],
        "vehicle-owner": this.vehicle['vehicleOwner'],
        'wattage': this.vehicle['wattage'],
        "year-manufacture": this.vehicle['yearManufacture'],
        'infos_id': this.vehicle['infosId'],
      };
      await updateVehicle(this.vehicle_id, params);
      this.$router.push("/vehicles");
    },
    async getVehicle(): Promise<void> {
      if (_.isEmpty(this.vehicle_id)) {
        this.$router.push("/vehicles");
      } else {
        const vehicleDetail = await getVehicle(this.vehicle_id);
        this.vehicle['registrationNumber'] = vehicleDetail["registration-number"];
        this.vehicle['name'] = vehicleDetail["name"];
        this.vehicle['insurancePhoto'] = vehicleDetail["insurance-photo"];
        this.vehicle['vehicleOwner'] = vehicleDetail["vehicle-owner"];
        this.vehicle['tonnage'] = vehicleDetail["tonnage"];
        this.vehicle['wattage'] = vehicleDetail["wattage"];
        this.vehicle['yearManufacture'] = vehicleDetail["year-manufacture"];
        this.vehicle['type'] = vehicleDetail["type"];
        this.vehicle['insuranceDeadline'] = vehicleDetail["insurance-deadline"];
        this.vehicle['registrationPhoto'] = vehicleDetail["registration-photo"];
        this.vehicle['registrationDeadline'] = vehicleDetail["registration-deadline"];
        this.vehicle['company'] = (await this.getCompany(vehicleDetail["infos_id"])) ?? "";
        this.vehicle['infosId'] = vehicleDetail["infos_id"];
      }
    },
    async getCompany(infos_id) {
      const company = await getInfo(infos_id)
      return company ? company.company : ''
    },
    async getCompanies() {
      this.companies = await getInfos()
    },
  },
};
</script>
<style scoped>
.data-container {
  margin: 2rem;
  padding: 40px 56px;
}
</style>
