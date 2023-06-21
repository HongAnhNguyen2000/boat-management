<template>
  <div class="grey lighten-4 nft-page create-form-page contentsWrapStyle">
    <h2>Danh sách hành khách vận tải đường thủy nội địa</h2>
    <div>
      <v-row class="mt-5">
        <v-col cols="8" class="pt-3">
          <h3>Tên phương tiện</h3>
          <v-text-field
            class="mt-2"
            variant="outlined"
            placeholder="Ten phuong tien"
            v-model="businessData['meanName']"
          ></v-text-field>
        </v-col>
        <v-col cols="4" class="pt-3">
          <h3>Số đăng kí</h3>
          <v-text-field
            class="mt-2"
            variant="outlined"
            placeholder="So dang ky"
            v-model="businessData['meanNumber']"
          ></v-text-field>
        </v-col>
      </v-row>

      <v-row class="mt-3">
        <v-col cols="6" class="pt-3">
          <h3>Tên thuyền trưởng</h3>
          <v-text-field
            class="mt-2"
            variant="outlined"
            placeholder="Ten thuyen truong"
            v-model="businessData['captain']"
          ></v-text-field>
        </v-col>
        <v-col cols="6" class="pt-3">
          <h3>Tên chủ tàu</h3>

          <v-text-field
            class="mt-2"
            variant="outlined"
            placeholder="Ten chu tau"
            v-model="businessData['ownerName']"
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
                placeholder="Tan"
                type="number"
                v-model="businessData['tonnage']"
              ></v-text-field>
            </v-col>
            <v-col cols="6" class="mt-3">
              <h4>Đơn vị (ghế)</h4>
              <v-text-field
                class="mt-2"
                variant="outlined"
                placeholder="Ghe"
                type="number"
                v-model="businessData['seats']"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="6" class="pt-0">
          <h3>Số lượng hành khách</h3>
          <v-row mt="2">
            <v-col cols="6" class="mt-3">
              <h4>Quốc tịch(Việt Nam)</h4>
              <v-text-field
                class="mt-2"
                variant="outlined"
                placeholder="Viet Nam"
                type="number"
                v-model="businessData['localCustomerNumber']"
              ></v-text-field>
            </v-col>
            <v-col cols="6" class="mt-3">
              <h4>Quốc tịch (Nước ngoài)</h4>
              <v-text-field
                class="mt-2"
                variant="outlined"
                placeholder="Nuoc ngoai"
                type="number"
                v-model="businessData['foreignCustomerNumber']"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="2">
          <h4>Tổng thuyen vien</h4>
          <v-text-field
            class="mt-2"
            variant="outlined"
            type="number"
            placeholder=""
            v-model="businessData['customerNumber']"
          ></v-text-field>
        </v-col>
        <v-col cols="5">
          <h4>Hướng dẫn viên - 2</h4>
          <v-table class="table-customer mt-2">
            <thead>
              <tr>
                <th>STT</th>
                <th>Ten huong dan vien</th>
                <th>
                  <v-btn variant="outlined" @click="onAddNewGuide"> + </v-btn>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in businessData['guides']" :key="index">
                <td>{{ index + 1 }}</td>
                <td>
                  <v-text-field
                    density="compact"
                    class="mt-5"
                    variant="outlined"
                    placeholder=""
                    v-model="item.name"
                  ></v-text-field>
                </td>
                <td>
                  <v-btn variant="outlined" @click="onDeleteGuide(item.id)"> - </v-btn>
                </td>
              </tr>
            </tbody>
          </v-table>
        </v-col>
        <v-col cols="5">
          <h4>Nhân viên</h4>
          <v-table class="table-customer mt-2">
            <thead>
              <tr>
                <th>STT</th>
                <th>Ten nhan vien phuc vu</th>
                <th>
                  <v-btn variant="outlined" @click="onAddNewEmployee">+</v-btn>
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
                  ></v-text-field>
                </td>
                <td>
                  <v-btn variant="outlined" @click="onDeleteEmployee(item.id)">
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
              <h4>Bến rời</h4>
              <v-select
                class="mt-2"
                label="From"
                :items="['Nha Trang', 'Khánh Hòa']"
                variant="solo"
                v-model="businessData['fromStation']"
              />
            </v-col>
            <v-col cols="4" class="mt-3">
              <h4>Bến đến</h4>
              <v-select
                class="mt-2"
                label="To"
                :items="['Hòn Tắm', 'Khánh Hòa']"
                variant="solo"
                v-model="businessData['toStation']"
              />
            </v-col>
            <v-col cols="4">
              <h4 class="mt-3">Thời gian rời bến</h4>
              <date-picker></date-picker>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" class="pt-0">
          <customer-table-vue
            :customers="businessData['customers']"
            @onChangeCustomerData="onChangeCustomerData"
          />
        </v-col>
      </v-row>
      <div class="d-flex flex-row mt-15 button-regis">
        <v-btn
          class="mb-8 mt-5"
          color="black"
          variant="tonal"
          @click="regisNewBusinessForm"
        >
          Đăng kí
        </v-btn>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import DatePicker from "./atoms/DatePicker.vue";
import CustomerTableVue from "./CustomerTable.vue";
import { CustomerData } from "../CommonFile";
import { v4 as uuidv4 } from "uuid";

export default {
  components: { DatePicker, CustomerTableVue },
  data() {
    return {
      businessData: {},
    };
  },
  methods: {
    regisNewBusinessForm(): void {
      console.log("businessData", this.businessData);
    },
    onChangeCustomerData(value: CustomerData): void {
      this.businessData["customers"] = value;
    },
    onAddNewEmployee(): void {
      const newEmployee = {
        id: uuidv4(),
        name: "",
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
    },
        onAddNewGuide(): void {
      const newGuide = {
        id: uuidv4(),
        name: "",
      };
      if (!Array.isArray(this.businessData["guides"])) {
        this.businessData["guides"] = [];
      }
      this.businessData["guides"].push(newGuide);
    },
    onDeleteGuide(id: string): void {
      this.businessData["guides"] = this.businessData[
        "guides"
      ].filter((item) => item.id !== id);
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
