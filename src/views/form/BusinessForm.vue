<template>
  <div class="data-container">
    <v-alert
      v-model="alert"
      close-text="Close Alert"
      class="alert-forgot"
      :color="colorAlert"
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
    <div class="grey lighten-4 nft-page create-form-page contentsWrapStyle">
      <h2>Danh sách hành khách vận tải đường thủy nội địa</h2>
      <div v-if="isNotReset">
        <v-row>
          <v-col cols="6" class="pt-3">
            <h3>Chọn phương tiện <span style="color: red">*</span></h3>
            <v-select
              :disabled="isDisable"
              class="mt-2"
              placeholder="Phương tiện"
              :items="vehicle"
              :item-title="'name'"
              v-model="typeofVehicle"
              variant="solo"
              return-object
            />
          </v-col>
        </v-row>
        <v-row class="mt-5">
          <v-col cols="8" class="pt-3">
            <h3>Tên phương tiện</h3>
            <v-text-field
              class="mt-2"
              variant="outlined"
              placeholder="Tên phương tiện"
              v-model="businessData['meanName']"
              disabled
            ></v-text-field>
          </v-col>
          <v-col cols="4" class="pt-3">
            <h3>Số đăng kí</h3>
            <v-text-field
              class="mt-2"
              variant="outlined"
              placeholder="Số đăng kí"
              v-model="businessData['meanNumber']"
              disabled
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row class="mt-3">
          <v-col cols="6" class="pt-3">
            <h3>Tên thuyền trưởng <span style="color: red">*</span></h3>
            <v-text-field
              class="mt-2"
              variant="outlined"
              v-model="businessData['captain']"
              :disabled="isDisable"
            ></v-text-field>
          </v-col>
          <v-col cols="6" class="pt-3">
            <h3>Chủ phương tiện</h3>

            <v-text-field
              class="mt-2"
              variant="outlined"
              placeholder="Chủ phương tiện"
              v-model="businessData['ownerName']"
              disabled
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="6" class="pt-0">
            <h3>Trọng tải đăng ký</h3>
            <v-row mt="2">
              <v-col cols="6" class="mt-3">
                <h4>Đơn vị (tấn)</h4>
                <v-text-field
                  class="mt-2"
                  variant="outlined"
                  v-model="businessData['tonnage']"
                  disabled
                ></v-text-field>
              </v-col>
              <v-col cols="6" class="mt-3">
                <h4>Công suất (ghế)</h4>
                <v-text-field
                  class="mt-2"
                  variant="outlined"
                  v-model="businessData['seats']"
                  disabled
                ></v-text-field>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="6">
            <h4>Hướng dẫn viên</h4>
            <v-table class="table-customer mt-2">
              <thead>
                <tr>
                  <th>STT</th>
                  <th>Tên hướng dẫn viên</th>
                  <th>
                    <v-btn
                      color="green"
                      variant="outlined"
                      @click="onAddNewGuide"
                      :disabled="isDisableAddNewGuide"
                    >
                      +
                    </v-btn>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(item, index) in businessData['guides']"
                  :key="index"
                >
                  <td>{{ index + 1 }}</td>
                  <td>
                    <v-text-field
                      density="compact"
                      class="mt-5"
                      variant="outlined"
                      placeholder=""
                      v-model="item.name"
                      :disabled="isDisable"
                    ></v-text-field>
                  </td>
                  <td>
                    <v-btn
                      variant="outlined"
                      @click="onDeleteGuide(item.id)"
                      :disabled="isDisable"
                      color="red"
                    >
                      -
                    </v-btn>
                  </td>
                </tr>
              </tbody>
            </v-table>
          </v-col>
          <v-col cols="6">
            <h4>Nhân viên</h4>
            <v-table class="table-customer mt-2">
              <thead>
                <tr>
                  <th>STT</th>
                  <th>Tên nhân viên phục vụ</th>
                  <th>
                    <v-btn
                      color="green"
                      variant="outlined"
                      @click="onAddNewEmployee"
                      :disabled="isDisableAddNewEmployee"
                      >+</v-btn
                    >
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(item, index) in businessData['shipEmployees']"
                  :key="index"
                >
                  <td>{{ index + 1 }}</td>
                  <td>
                    <v-text-field
                      density="compact"
                      class="mt-5"
                      variant="outlined"
                      placeholder=""
                      v-model="item.name"
                      :disabled="isDisable"
                    ></v-text-field>
                  </td>
                  <td>
                    <v-btn
                      variant="outlined"
                      @click="onDeleteEmployee(item.id)"
                      :disabled="isDisable"
                      color="red"
                    >
                      -
                    </v-btn>
                  </td>
                </tr>
              </tbody>
            </v-table>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" class="pt-0">
            <h3>Bến tàu</h3>
            <v-row mt="2">
              <v-col cols="4" class="mt-3">
                <h4>Bến rời <span style="color: red">*</span></h4>
                <v-select
                  class="mt-2"
                  label="Bến rời*"
                  :items="['Nha Trang']"
                  variant="solo"
                  v-model="businessData['fromStation']"
                  :disabled="isDisable"
                />
              </v-col>
              <v-col cols="4" class="mt-3">
                <h4>Bến đến <span style="color: red">*</span></h4>
                <v-select
                  class="mt-2"
                  label="Bến đến*"
                  :items="[
                    'Hòn Tắm',
                    'Hòn Tre',
                    'Hòn Thì',
                    'Hòn Đỏ',
                    'Hòn Mỹ Giang',
                    'Hòn Mun',
                  ]"
                  variant="solo"
                  v-model="businessData['toStation']"
                  :disabled="isDisable"
                />
              </v-col>
              <v-col cols="4">
                <h4 class="mt-3">
                  Thời gian rời bến <span style="color: red">*</span>
                </h4>
                <v-select
                  class="mt-2"
                  label="Thời gian rời bến*"
                  :items="times"
                  variant="solo"
                  v-model="businessData['time']"
                  :disabled="isDisable"
                />
              </v-col>
            </v-row>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" class="pt-0">
            <customer-table-vue
              :customers="businessData['customers']"
              @onChangeCustomerData="onChangeCustomerData"
              :disabled="isDisable"
            />
          </v-col>
        </v-row>
        <div class="d-flex flex-row mt-15 button-regis">
          <v-btn
            class="mb-8 mt-5"
            color="green"
            variant="tonal"
            @click="regisNewBusinessForm"
            v-if="isEnterprise"
            :disabled="isDisable || checkDisabledButton"
          >
            Đăng kí
          </v-btn>
          <div v-if="isDisable && !isEnterprise">
            <v-btn
              class="mb-8 mt-5 ml-5"
              color="primary"
              variant="tonal"
              :disabled="isDisableProcess"
              @click="accepted"
            >
              {{ process }}
            </v-btn>
            <v-btn
              class="mb-8 mt-5 ml-5"
              color="error"
              variant="tonal"
              @click="denie"
            >
              Từ chối
            </v-btn>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import CustomerTableVue from "../../components/CustomerTable.vue";
import { CustomerData } from "../../CommonFile";
import { v4 as uuidv4 } from "uuid";
import _ from "lodash";
import {
  getListVehicle,
  addBussinessData,
  getFormData,
  updateFormData,
} from "@/firebase";
import { json } from "stream/consumers";

export default {
  components: { CustomerTableVue },
  data() {
    return {
      businessData: {} as any,
      vehicle: [] as any,
      typeofVehicle: { name: "" },
      idVehicle: "",
      formID: "" as any,
      isDisable: false,
      deniedFlag: false,
      isDisableProcess: true,
      isNotReset: true,
      isEnterprise: false,
      checkDisabledButton: true,
      isDisableAddNewEmployee: false,
      isDisableAddNewGuide: false,
      process: "Chấp nhận",
      messageAlert: "",
      colorAlert: "",
      alert: false,
      userRole: this.$store.state?.user?.data?.role,
      roleSameChange: [
        { role: "manager", permission: "requesting" },
        { role: "authority", permission: "purchased" },
        { role: "accountant", permission: "processing" },
      ],
      times: [
        "08:00",
        "08:30",
        "09:00",
        "09:30",
        "10:00",
        "10:30",
        "11:00",
        "11:30",
        "14:00",
        "14:30",
        "15:00",
        "15:30",
        "16:00",
        "16:30",
        "17:00",
        "17:30",
      ],
    };
  },
  created(): void {
    this.init();
    this.getTimeToday();
  },
  methods: {
    getTimeToday() {
      const d = new Date();
      const m = d.getMinutes();
      let h = d.getHours();
      if (h === 0) {
        h = 24;
      }

      const currentTime = h + "" + m;
      this.times = this.times.filter((time) => {
        return parseInt(time.replace(":", "")) > parseInt(currentTime);
      });
    },
    init() {
      this.getVehicle();
      this.formID = this.$route.params.formID;
      this.getformDetail();
      this.isDisable = !_.isEmpty(this.formID);
      this.userRole = this.$store.state?.user?.data?.role;
      this.isEnterprise = this.userRole === "enterprise";
      this.deniedFlag = this.businessData["type"] === "accept";
      switch (this.userRole) {
        case "manager":
          this.process = "Đang xử lý";
          break;
        case "accountant":
          this.process = "Đã thu tiền";
          break;
        default:
          this.process = "Chấp nhận";
          break;
      }
      process;
    },
    async getVehicle() {
      const list = await getListVehicle();
      this.vehicle = list.filter(
        (detailVehicle) =>
          detailVehicle.infos_id === this.$store.state?.user?.data.infos_id
      );
    },
    handleData() {
      const clientData = [
        ...(this.businessData["customers"] ?? []),
        ...(this.businessData["shipEmployees"] ?? []),
        ...(this.businessData["guides"] ?? []),
      ];
      const localCustomers = this.businessData["customers"]?.filter(
        (item) => item.nation === "Việt Nam"
      );
      const internationalCustomers = this.businessData["customers"]?.filter(
        (item) => item.nation === "Nước ngoài"
      );
      const now = new Date();
      const created_at = `${("0" + now.getDate()).slice(-2)}/${(
        "0" +
        (now.getMonth() + 1)
      ).slice(
        -2
      )}/${now.getFullYear()} ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;
      const shipEmployees = [...this.businessData["shipEmployees"]];
      if (!_.isEmpty(shipEmployees)) {
        this.businessData["shipEmployees"] = shipEmployees.filter(
          (employee) => employee.name !== ""
        );
      }
      const guides = [...this.businessData["guides"]];
      if (!_.isEmpty(guides)) {
        this.businessData["guides"] = guides.filter(
          (guide) => guide.name !== ""
        );
      }
      const customers = [...this.businessData["customers"]];
      if (!_.isEmpty(customers)) {
        this.businessData["customers"] = customers.filter(
          (customer) => customer.name !== ""
        );
      }
      const setAPIData = {
        ...this.businessData,
        clients: clientData.flat(1),
        totalShipMember: !isNaN(
          this.businessData["guides"]?.length +
            this.businessData["shipEmployees"]?.length +
            1
        )
          ? this.businessData["guides"]?.length +
            this.businessData["shipEmployees"]?.length +
            1
          : 0,
        localCustomerNumber: localCustomers?.length ?? 0,
        internationalCustomerNumber: internationalCustomers?.length ?? 0,
        created_at,
        idVehicle: this.idVehicle,
      };

      delete setAPIData["shipEmployees"];
      delete setAPIData["guides"];
      delete setAPIData["customers"];
      return setAPIData;
    },
    async regisNewBusinessForm() {
      const setAPIData = this.handleData();
      const data = { ...setAPIData, type: "requesting" };
      const createForm = await addBussinessData(data);
      if (createForm) {
        this.colorAlert = "green";
        this.alert = true;
        this.messageAlert = "Bạn tạo bản đăng ký thành công";
        setTimeout(() => {
          this.$router.push("/list");
        }, 2000);
      } else {
        this.colorAlert = "red";
        this.alert = true;
        this.messageAlert = "Bạn tạo bản đăng ký không thành công. Xin thử lại";
        setTimeout(() => {
          this.alert = false;
        }, 3000);
      }
    },
    onChangeCustomerData(value: CustomerData): void {
      if (!this.isDisable) {
        this.businessData["customers"] = value;
      }
    },
    onAddNewEmployee(): void {
      const newEmployee = {
        id: uuidv4(),
        name: "",
        type: "employee",
      };
      if (!Array.isArray(this.businessData["shipEmployees"])) {
        this.businessData["shipEmployees"] = [];
      }
      this.businessData["shipEmployees"].push(newEmployee);
    },
    onDeleteEmployee(id: string): void {
      this.businessData["shipEmployees"] = this.businessData[
        "shipEmployees"
      ].filter((item) => item.id !== id);
      this.checkDisabled();
    },
    onAddNewGuide(): void {
      const newGuide = {
        id: uuidv4(),
        name: "",
        type: "guide",
      };
      if (!Array.isArray(this.businessData["guides"])) {
        this.businessData["guides"] = [];
      }
      this.businessData["guides"].push(newGuide);
    },
    onDeleteGuide(id: string): void {
      this.businessData["guides"] = this.businessData["guides"].filter(
        (item) => item.id !== id
      );
      this.checkDisabled();
    },
    async getformDetail(): Promise<void> {
      if (this.formID && this.formID !== "") {
        this.businessData = await getFormData(this.formID);
        this.businessData["customers"] = this.businessData["clients"].filter(
          (e) => e.type === "Customer"
        );
        this.businessData["shipEmployees"] = this.businessData[
          "clients"
        ].filter((e) => e.type === "employee");
        this.businessData["guides"] = this.businessData["clients"].filter(
          (e) => e.type === "guide"
        );
        this.idVehicle = this.businessData["idVehicle"];

        const theRole = this.roleSameChange.find(
          (e) => e.role === this.userRole
        );
        this.isDisableProcess =
          theRole?.permission !== this.businessData["type"];
      }
    },
    async accepted(): Promise<void> {
      let type = "requesting";
      switch (this.$store.state?.user?.data?.role) {
        case "manager":
          type = "processing";
          break;

        case "accountant":
          type = "purchased";
          break;

        case "authority":
          type = "accept";
          break;

        default:
          type = "requesting";
          break;
      }
      const setAPIData = this.handleData();
      const data = { ...setAPIData, type: type };
      await updateFormData(this.formID, data);
      this.$router.push("/list");
    },
    async denie(): Promise<void> {
      const type = "reject";
      const setAPIData = this.handleData();
      const data = { ...setAPIData, type: type };
      await updateFormData(this.formID, data);
      this.$router.push("/list");
    },
    checkDisabled() {
      if (this.businessData["shipEmployees"]) {
        const shipEmployees = JSON.parse(
          JSON.stringify(this.businessData["shipEmployees"])
        );
        this.isDisableAddNewEmployee = false;
        if (this.businessData["shipEmployees"]?.length > 0) {
          this.isDisableAddNewEmployee =
            shipEmployees[shipEmployees.length - 1].name === "";
        }
      }
      if (this.businessData["guides"]) {
        const guides = JSON.parse(JSON.stringify(this.businessData["guides"]));

        this.isDisableAddNewGuide = false;
        if (this.businessData["guides"]?.length > 0) {
          this.isDisableAddNewGuide = guides[guides.length - 1].name === "";
        }
      }
      if (
        this.businessData["customers"] &&
        this.businessData["customers"]?.length > 0
      ) {
        const customer = JSON.parse(
          JSON.stringify(this.businessData["customers"])
        );
        const checkCustomer = customer.filter(
          (customer: any) => customer.name && customer.name !== ""
        );
        const falseTrue =
          checkCustomer.length === 0 ||
          _.isEmpty(this.businessData["meanName"]) ||
          _.isEmpty(this.businessData["captain"]) ||
          _.isEmpty(this.businessData["fromStation"]) ||
          _.isEmpty(this.businessData["toStation"]) ||
          _.isEmpty(this.businessData["time"]);

        this.checkDisabledButton = falseTrue;
      } else {
        this.checkDisabledButton = true;
      }
    },
    closeAlert() {
      this.alert = false;
    },
  },
  watch: {
    typeofVehicle(newVal): void {
      this.idVehicle = newVal.id;
      this.businessData["meanName"] = newVal.name;
      this.businessData["meanNumber"] = newVal["registration-number"];
      this.businessData["ownerName"] = newVal["vehicle-owner"];
      this.businessData["tonnage"] = newVal["tonnage"];
      this.businessData["seats"] = newVal["wattage"];
    },
    businessData: {
      handler(newVal) {
        this.checkDisabled();
      },
      deep: true,
    },
    $route(to, from) {
      this.isNotReset = false;
      if (to.path === "/form") {
        this.businessData = {};
        this.vehicle = [];
        this.typeofVehicle = { name: "" };
        this.idVehicle = "";
        this.formID = "";
        this.isDisable = false;
      }
      this.init();
      setTimeout(() => {
        this.isNotReset = true;
      }, 500);
    },
  },
};
</script>

<style scoped>
.contentsWrapStyle {
  margin: "2rem";
  padding: "40px 56px";
}
</style>

<style>
.data-container {
  margin: 2rem;
  padding: 0px 30px 56px 30px;
}
@media screen and (max-width: 830px) {
  .data-container {
    padding: 0;
  }
}

.create-form-page .v-input__slot {
  min-height: 45px !important;
}
.create-form-page .v-input__slot fieldset {
  background-color: white;
}
.create-form-page .aboutdate .ma-0 {
  margin-top: 4px !important;
}
.number-input {
  margin-top: 20px;
}
.button-regis {
  align-items: center;
  justify-content: center;
}
.table-customer {
  border: 1px solid #e3e1e1;
}
</style>
