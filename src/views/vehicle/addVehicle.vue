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
    <h2 class="mb-5">Tạo phương tiện mới</h2>
    <div class="grey lighten-4 nft-page create-qr-page contentsWrapStyle">
      <v-row>
        <v-col cols="6">
          <h4>Tên phương tiện <span style="color: red">*</span></h4>
          <v-text-field
            variant="outlined"
            v-model="vehicle.name"
            :rules="[rules.required]"
            required
          />
        </v-col>
        <v-col cols="6">
          <h4>Số đăng ký <span style="color: red">*</span></h4>
          <v-text-field
            variant="outlined"
            v-model="vehicle.registrationNumber"
            :rules="[rules.required]"
          />
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="6">
          <v-row>
            <v-col cols="4">
              <h4>Trọng tải <span style="color: red">*</span></h4>

              <v-text-field
                variant="outlined"
                v-model="vehicle.tonnage"
                :rules="[rules.required, rules.isNumber]"
              />
            </v-col>
            <v-col cols="4">
              <h4>Công suất <span style="color: red">*</span></h4>

              <v-text-field
                variant="outlined"
                v-model="vehicle.wattage"
                :rules="[rules.required, rules.isNumber]"
              />
            </v-col>
            <v-col cols="4">
              <h4>
                Năm sản xuất
                <span style="color: red">*</span>
              </h4>
              <vue-date-picker
                v-model="vehicle.yearManufacture"
                locale="vi"
                format="yyyy"
                year-picker
              />
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="6">
          <h4>Chọn công ty <span style="color: red">*</span></h4>
          <v-select
            :items="companies"
            item-value="id"
            item-text="company"
            item-title="company"
            v-model="vehicle.infosId"
            variant="solo"
          />
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="6">
          <h4>Hạn bảo hiểm <span style="color: red">*</span></h4>

          <vue-date-picker
            v-model="vehicle.insuranceDeadline"
            locale="vi"
            format="dd-MM-yyyy"
          />
        </v-col>
        <v-col cols="6">
          <h4>Hạn đăng kiểm <span style="color: red">*</span></h4>
          <date-picker
            v-model="vehicle.registrationDeadline"
            locale="vi"
            format="dd-MM-yyyy"
          />
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="6">
          <h4>
            Loại phương tiện
            <span style="color: red">*</span>
          </h4>

          <v-text-field
            variant="outlined"
            v-model="vehicle.type"
            :rules="[rules.required]"
          />
        </v-col>
        <v-col cols="6">
          <h4>
            Chủ phương tiện
            <span style="color: red">*</span>
          </h4>
          <v-text-field
            variant="outlined"
            v-model="vehicle.vehicleOwner"
            :rules="[rules.required]"
          />
        </v-col>
      </v-row>
    </div>
    <div class="d-flex justify-center align-center">
      <v-btn
        class="mb-8 mt-5"
        width="150px"
        color="green"
        variant="tonal"
        :disabled="disabled"
        @click="regis"
      >
        Đăng ký
      </v-btn>
    </div>
  </div>
</template>

<script lang="ts">
import { addVehicle, getInfos } from "@/firebase";
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
      messageAlert: "",
      alert: false,
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
      companies: [] as any,
      disabled: true,
      rules: {
        required: (value: any) => !!value || "Xin mời nhập trường yêu cầu.",
        isNumber: (value: any) =>
          /^\d+$/.test(value) || "Xin mời nhập đúng định dạng",
      },
    };
  },
  created() {
    this.getCompanies();
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
      const actionAddVehicle = await addVehicle(params);
      if (actionAddVehicle) {
        this.colorAlert = "green";
        this.alert = true;
        this.messageAlert = "Bạn tạo phương tiện thành công";
        setTimeout(() => {
          this.$router.push("/vehicles");
        }, 2000);
      } else {
        this.colorAlert = "red";

        this.alert = true;
        this.messageAlert = "Bạn tạo phương tiện không thành công. Xin thử lại";
        setTimeout(() => {
          this.alert = false;
        }, 3000);
      }
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
