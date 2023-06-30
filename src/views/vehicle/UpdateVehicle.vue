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
    </div>
  </v-alert>
  <div class="data-container">
    <h2 class="mb-5">Cập nhật phương tiện</h2>
    <div class="grey lighten-4 nft-page create-qr-page contentsWrapStyle">
      <v-row>
        <v-col cols="12" md="6">
          <h4>Tên phương tiện <span style="color: red">*</span></h4>
          <v-text-field
            variant="outlined"
            v-model="vehicle.name"
            :rules="[rules.required]"
          />
        </v-col>
        <v-col cols="12" md="6">
          <h4>Số đăng ký <span style="color: red">*</span></h4>
          <v-text-field
            variant="outlined"
            v-model="vehicle.registrationNumber"
            :rules="[rules.required]"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="6">
          <h4>Hạn bảo hiểm <span style="color: red">*</span></h4>
          <date-picker
            v-model="vehicle.insuranceDeadline"
            locale="vi"
            format="dd-MM-yyyy"
            select-text="Chọn"
            cancel-text="Đóng"
            :day-names="[
              'Thứ 2',
              'Thứ 3',
              'Thứ 4',
              'Thứ 5',
              'Thứ 6',
              'Thứ 7',
              'Chủ Nhật',
            ]"
          />
        </v-col>
        <v-col cols="12" md="6">
          <h4>Hạn đăng kiểm <span style="color: red">*</span></h4>
          <date-picker
            v-model="vehicle.registrationDeadline"
            locale="vi"
            format="dd-MM-yyyy"
            select-text="Chọn"
            cancel-text="Đóng"
            :day-names="[
              'Thứ 2',
              'Thứ 3',
              'Thứ 4',
              'Thứ 5',
              'Thứ 6',
              'Thứ 7',
              'Chủ Nhật',
            ]"
          />
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" sm="6">
          <v-row>
            <v-col cols="12" md="4">
              <h4>Trọng tải (tấn) <span style="color: red">*</span></h4>

              <v-text-field
                variant="outlined"
                v-model="vehicle.tonnage"
                :rules="[rules.required, rules.isNumber]"
              />
            </v-col>
            <v-col cols="12" md="4">
              <h4>Công suất <span style="color: red">*</span></h4>

              <v-text-field
                variant="outlined"
                v-model="vehicle.wattage"
                :rules="[rules.required, rules.isNumber]"
              />
            </v-col>
            <v-col cols="12" md="4">
              <h4>
                Năm sản xuất
                <span style="color: red">*</span>
              </h4>
              <vue-date-picker
                v-model="vehicle.yearManufacture"
                locale="vi"
                format="yyyy"
                year-picker
                :max-date="new Date()"
                select-text="Chọn"
                cancel-text="Đóng"
                :year-range="[1900, new Date().getFullYear()]"
              />
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="12" sm="6">
          <h4>Chọn công ty</h4>
          <v-select
            :items="companies"
            item-value="id"
            item-text="company"
            item-title="company"
            :value="vehicle['company']"
            v-model="vehicle.infosId"
            variant="solo"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="6">
          <h4>Loại phương tiện <span style="color: red">*</span></h4>

          <v-text-field
            variant="outlined"
            v-model="vehicle.type"
            :rules="[rules.required]"
          />
        </v-col>
        <v-col cols="12" md="6">
          <h4>
            Tên chủ tàu
            <span style="color: red">*</span>
          </h4>

          <v-text-field
            variant="outlined"
            v-model="vehicle.vehicleOwner"
            :rules="[rules.required]"
          />
        </v-col>
      </v-row>

      <div class="mt-3 mb-8"></div>
      <div class="mt-3 mb-8"></div>
    </div>
    <v-btn
      block
      class="mb-8"
      color="green"
      size="large"
      variant="elevated"
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
import Datepicker from "@vuepic/vue-datepicker";
export default {
  components: {
    "date-picker": Datepicker,
  },

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
      let checkInsuranceDeadline = false;
      let checkRegistrationDeadline = false;
      if (typeof this.vehicle["insuranceDeadline"] === "string") {
        checkInsuranceDeadline = _.isEmpty(this.vehicle["insuranceDeadline"]);
      } else {
        checkInsuranceDeadline = this.vehicle["insuranceDeadline"] === null;
      }
      if (typeof this.vehicle["registrationDeadline"] === "string") {
        checkRegistrationDeadline = _.isEmpty(
          this.vehicle["registrationDeadline"]
        );
      } else {
        checkRegistrationDeadline =
          this.vehicle["registrationDeadline"] === null;
      }
      return (
        _.isEmpty(this.vehicle["registrationNumber"]) ||
        checkInsuranceDeadline ||
        _.isEmpty(this.vehicle["name"]) ||
        checkRegistrationDeadline ||
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
        params["registration-deadline"] = `${("0" + (now.getMonth() + 1)).slice(
          -2
        )}/${("0" + now.getDate()).slice(-2)}/${now.getFullYear()}`;
      }
      if (this.vehicle["insuranceDeadline"]) {
        const now = new Date(this.vehicle["insuranceDeadline"]);
        params["insurance-deadline"] = `${("0" + (now.getMonth() + 1)).slice(
          -2
        )}/${("0" + now.getDate()).slice(-2)}/${now.getFullYear()}`;
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
        this.vehicle["insuranceDeadline"] = vehicleDetail[
          "insurance-deadline"
        ].replaceAll("-", "/");
        this.vehicle["registrationDeadline"] = vehicleDetail[
          "registration-deadline"
        ].replaceAll("-", "/");
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
  padding: 0px 30px 56px 30px;
}
@media screen and (max-width: 830px) {
  .data-container {
    padding: 0;
    margin: 2rem;
  }
}
</style>

<style>
input.dp__pointer {
  height: 60px;
}
button.dp__action_select {
  color: white;
  height: 30px;
}
.dp__action_cancel {
  height: 30px;
}
</style>
