<template>
  <div class="data-container">
    <h2 class="mb-5">Tạo phương tiện mới</h2>
    <div class="grey lighten-4 nft-page create-qr-page contentsWrapStyle">
      <v-text-field
        variant="outlined"
        placeholder="Tên phương tiện*"
        label="Tên phương tiện*"
        v-model="vehicle.name"
        :rules="[rules.required]"
        required
      />
      <v-text-field
        variant="outlined"
        placeholder="Số đăng ký*"
        label="Số đăng ký*"
        v-model="vehicle.registrationNumber"
        :rules="[rules.required]"
      />
      <v-text-field
        variant="outlined"
        placeholder="Hạn bảo hiểm*"
        label="Hạn bảo hiểm*"
        v-model="vehicle.insuranceDeadline"
        :rules="[rules.required]"
      />
      <v-text-field
        variant="outlined"
        placeholder="Ảnh bảo hiểm*"
        label="Ảnh bảo hiểm*"
        v-model="vehicle.insurancePhoto"
        :rules="[rules.required]"
      />
      <v-text-field
        variant="outlined"
        placeholder="Hạn đăng kiểm*"
        label="Hạn đăng kiểm*"
        v-model="vehicle.registrationDeadline"
        :rules="[rules.required]"
      />
      <v-text-field
        variant="outlined"
        placeholder="Ảnh đăng kiểm*"
        label="Ảnh đăng kiểm*"
        v-model="vehicle.registrationPhoto"
        :rules="[rules.required]"
      />
      <v-text-field
        variant="outlined"
        placeholder="Trọng tải*"
        label="Trọng tải*"
        v-model="vehicle.tonnage"
        :rules="[rules.required]"
      />
      <v-text-field
        variant="outlined"
        placeholder="Loại phương tiện*"
        label="Loại phương tiện*"
        v-model="vehicle.type"
        :rules="[rules.required]"
      />
      <v-text-field
        variant="outlined"
        placeholder="Chủ phương tiện*"
        label="Chủ phương tiện*"
        v-model="vehicle.vehicleOwner"
        :rules="[rules.required]"
      />
      <v-text-field
        variant="outlined"
        placeholder="Công suất*"
        label="Công suất*"
        v-model="vehicle.wattage"
        :rules="[rules.required]"
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
          label="Công ty"
          :items="companies"
          item-value="id"
          item-text="company"
          item-title="company"
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
      :disabled="disabled"
      @click="regis"
    >
      Đăng ký
    </v-btn>
  </div>
</template>

<script lang="ts">
import {
  addVehicle,
  getInfos,
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
      disabled: true,
      rules: {
        required: (value: any) => !!value || "Xin mời nhập trường yêu cầu.",
      },
    };
  },
  created() {
    this.getCompanies();
  },
  watch: {
    vehicle: {
      handler(newVal){
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
      await addVehicle(params);
      this.$router.push("/vehicles");
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
