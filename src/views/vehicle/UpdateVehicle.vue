<template>
  <v-alert
    v-model="alert"
    close-text="Close Alert"
    :color="colorAlert"
    class="alert-forgot"
    dark
    dismissible
  >
    <div class="d-flex align-center">
      <span>
        {{ messageAlert }}
      </span>
      <v-btn
        color="white"
        size="large"
        variant="tonal"
        class="ml-auto"
        @click="closeAlert()"
        >Đóng</v-btn
      >
    </div>
  </v-alert>
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
      <div class="mt-3 mb-8">
        <date-picker
          v-model="vehicle.insuranceDeadline"
          locale="vi"
          format="dd/MM/yyyy"
          placeholder="Hạn bảo hiểm*"
          label="Hạn bảo hiểm*"
          auto-apply
          partial-flow
          :flow="['calendar']"
        />
      </div>
      <div class="mt-3 mb-8">
        <date-picker
          v-model="vehicle.registrationDeadline"
          locale="vi"
          format="dd/MM/yyyy"
          placeholder="Hạn đăng kiểm*"
          label="Hạn đăng kiểm*"
          class="mt-3"
          auto-apply
          partial-flow
          :flow="['calendar']"
        />
      </div>
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
        placeholder="Hạn đăng kiểm*"
        label="Hạn đăng kiểm*"
        v-model="vehicle.registrationDeadline"
        :rules="[rules.required]"
        class="mt-3"
      />
      <v-text-field
        variant="outlined"
        placeholder="Trọng tải*"
        label="Trọng tải*"
        v-model="vehicle.tonnage"
        :rules="[rules.required, rules.isNumber]"
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
        :rules="[rules.required, rules.isNumber]"
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
      color="green"
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
import { getInfo, getInfos, getVehicle, updateVehicle } from "@/firebase";
import _ from "lodash";

export default {
  data() {
    return {
      dialog: false,
      colorAlert: "",
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
        name: "",
        registrationDeadline: "",
        tonnage: "",
        type: "",
        vehicleOwner: "",
        wattage: "",
        yearManufacture: "",
        infosId: "",
      },
      messageAlert: "",
      alert: false,
      companies: [] as any,
      vehicle_id: "" as any,
      disabled: true,
      rules: {
        required: (value: any) => !!value || "Xin mời nhập trường yêu cầu.",
        isNumber: (value: any) =>
          /^\d+$/.test(value) || "Xin mời nhập đúng định dạng",
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
      handler(newVal) {
        this.disabled = this.validate();
      },
      deep: true,
    },
  },
  methods: {
    validate() {
      return (
        _.isEmpty(this.vehicle["registrationNumber"]) ||
        _.isEmpty(this.vehicle["insuranceDeadline"].toString()) ||
        _.isEmpty(this.vehicle["name"]) ||
        _.isEmpty(this.vehicle["registrationDeadline"].toString()) ||
        _.isEmpty(this.vehicle["tonnage"]) ||
        _.isEmpty(this.vehicle["type"]) ||
        _.isEmpty(this.vehicle["vehicleOwner"]) ||
        _.isEmpty(this.vehicle["wattage"]) ||
        this.rules.isNumber(this.vehicle["wattage"]) !== true ||
        this.rules.isNumber(this.vehicle["tonnage"]) !== true ||
        _.isEmpty(this.vehicle["yearManufacture"].toString()) ||
        _.isEmpty(this.vehicle["infosId"])
      );
    },
    async regis() {
      const params = {
        "registration-number": this.vehicle["registrationNumber"],
        name: this.vehicle["name"],
        tonnage: this.vehicle["tonnage"],
        type: this.vehicle["type"],
        "vehicle-owner": this.vehicle["vehicleOwner"],
        wattage: this.vehicle["wattage"],
        "year-manufacture": this.vehicle["yearManufacture"],
        infos_id: this.vehicle["infosId"],
      };
      if (this.vehicle["registrationDeadline"]) {
        const now = new Date(this.vehicle["registrationDeadline"]);
        params["registration-deadline"] = `${("0" + now.getDate()).slice(
          -2
        )}/${("0" + (now.getMonth() + 1)).slice(-2)}/${now.getFullYear()}`;
      }
      if (this.vehicle["insuranceDeadline"]) {
        const now = new Date(this.vehicle["insuranceDeadline"]);
        params["insurance-deadline"] = `${("0" + now.getDate()).slice(-2)}/${(
          "0" +
          (now.getMonth() + 1)
        ).slice(-2)}/${now.getFullYear()}`;
      }
      const actionUpdateVehicle = await updateVehicle(this.vehicle_id, params);
      if (actionUpdateVehicle) {
        this.colorAlert = "green";

        this.alert = true;
        this.messageAlert = "Bạn cập nhật phương tiện thành công";
        setTimeout(() => {
          this.$router.push("/vehicles");
        }, 2000);
      } else {
        this.colorAlert = "red";

        this.alert = true;
        this.messageAlert =
          "Bạn cập nhật phương tiện không thành công. Xin thử lại";
        setTimeout(() => {
          this.alert = false;
        }, 3000);
      }
    },
    async getVehicle(): Promise<void> {
      if (_.isEmpty(this.vehicle_id)) {
        this.$router.push("/vehicles");
      } else {
        const vehicleDetail = await getVehicle(this.vehicle_id);
        this.vehicle["registrationNumber"] =
          vehicleDetail["registration-number"];
        this.vehicle["name"] = vehicleDetail["name"];
        this.vehicle["vehicleOwner"] = vehicleDetail["vehicle-owner"];
        this.vehicle["tonnage"] = vehicleDetail["tonnage"];
        this.vehicle["wattage"] = vehicleDetail["wattage"];
        this.vehicle["yearManufacture"] = vehicleDetail["year-manufacture"];
        this.vehicle["type"] = vehicleDetail["type"];
        this.vehicle["insuranceDeadline"] = vehicleDetail["insurance-deadline"];
        this.vehicle["registrationDeadline"] =
          vehicleDetail["registration-deadline"];
        this.vehicle["company"] =
          (await this.getCompany(vehicleDetail["infos_id"])) ?? "";
        this.vehicle["infosId"] = vehicleDetail["infos_id"];
      }
    },
    async getCompany(infos_id) {
      const company = await getInfo(infos_id);
      return company ? company.company : "";
    },
    async getCompanies() {
      this.companies = await getInfos();
    },
    closeAlert() {
      this.alert = false;
    },
  },
};
</script>
<style scoped>
.data-container {
  margin: 2rem;
  padding: 40px 56px;
}
@media screen and (max-width: 830px) {
  .data-container {
    padding: 0;
  }
}
</style>
