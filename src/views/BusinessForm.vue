<template>
  <div class="data-container">
  <div class="grey lighten-4 nft-page create-form-page contentsWrapStyle">
    <h2>Danh sách hành khách vận tải đường thủy nội địa</h2>
    <div>
      <v-row>
        <v-col cols="6" class="pt-3">
        <h3>Chọn phương tiện</h3>
        <v-select
          class="mt-2"
          label="Phương tiện"
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
            placeholder="So dang ky"
            v-model="businessData['meanNumber']"
            disabled
          ></v-text-field>
        </v-col>
      </v-row>

      <v-row class="mt-3">
        <v-col cols="6" class="pt-3">
          <h3>Tên thuyền trưởng</h3>
          <v-text-field
            class="mt-2"
            variant="outlined"
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
              <h4>Đơn vị (ghế)</h4>
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
        <v-col cols="6">
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
              <v-text-field
                    class="mt-1"
                    variant="outlined"
                    placeholder=""
                    v-model="businessData['time']"
                  ></v-text-field>
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
  </div>
</template>
<script lang="ts">
import CustomerTableVue from "../components/CustomerTable.vue";
import { CustomerData } from "../CommonFile";
import { v4 as uuidv4 } from "uuid";
import { getListVehicle, addBussinessData } from '@/firebase'

export default {
  components: { CustomerTableVue },
  data() {
    return {
      businessData: {},
      vehicle: [] as any,
      typeofVehicle: {name: ''},
    };
  },
   created(): void {
    this.getVehicle()
  },
  methods: {
     async getVehicle() {
      const list = await getListVehicle()
      this.vehicle = list
    },
    regisNewBusinessForm(): void {
      const clientData = [...this.businessData['customers'] ?? [], ...this.businessData['shipEmployees'] ?? [], ...this.businessData['guides'] ?? []]
      const localCustomers = this.businessData['customers']?.filter((item) => item.nation === 'Việt Nam')
      const internationalCustomers = this.businessData['customers']?.filter((item) => item.nation === 'Nước ngoài')
      const setAPIData = {
        ...this.businessData,
        clients: clientData.flat(1),
        totalShipMember: !isNaN(this.businessData['guides']?.length + this.businessData['shipEmployees']?.length + 1) ? (this.businessData['guides']?.length + this.businessData['shipEmployees']?.length + 1) : 0,
        localCustomerNumber: localCustomers?.length ?? 0,
        internationalCustomerNumber: internationalCustomers?.length ?? 0
      }
      
      delete setAPIData['shipEmployees']
      delete setAPIData['guides']
      delete setAPIData['customers']
      console.log('s', setAPIData)
      try {
        addBussinessData(setAPIData)
        this.$router.push('list')
      } catch (err) {
        console.log(err)
      }
      
    },
    onChangeCustomerData(value: CustomerData): void {
      this.businessData["customers"] = value;
    },
    onAddNewEmployee(): void {
      const newEmployee = {
        id: uuidv4(),
        name: "",
        type:"employee"
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
        type:"guide"
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
  watch: {
    typeofVehicle(newVal): void {
      this.businessData['meanName'] = newVal.name;
      this.businessData['meanNumber'] = newVal['registration-number']
      this.businessData['ownerName'] = newVal['vehicle-owner']
      this.businessData['tonnage'] = newVal['tonnage']
      this.businessData['seats'] = newVal['wattage']
    }
  }
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
  padding: 40px 56px;
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
