<template>
  <div class="data-container">
  <div class="grey lighten-4 nft-page create-form-page contentsWrapStyle">
    <h2>Danh sách hành khách vận tải đường thủy nội địa</h2>
    <div>
      <v-row>
        <v-col cols="6" class="pt-3">
        <h3>Chọn phương tiện</h3>
        <v-select
          :disabled="isDisable"
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
            :disabled="isDisable"
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
                  <v-btn variant="outlined" @click="onAddNewGuide" :disabled="isDisable"> + </v-btn>
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
                    :disabled="isDisable"
                  ></v-text-field>
                </td>
                <td>
                  <v-btn variant="outlined" @click="onDeleteGuide(item.id)" :disabled="isDisable"> - </v-btn>
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
                  <v-btn variant="outlined" @click="onAddNewEmployee" :disabled="isDisable">+</v-btn>
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
                  <v-btn variant="outlined" @click="onDeleteEmployee(item.id)" :disabled="isDisable">
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
                :disabled="isDisable"
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
                :disabled="isDisable"
              />
            </v-col>
            <v-col cols="4">
              <h4 class="mt-3">Thời gian rời bến</h4>
              <v-text-field
                    class="mt-1"
                    variant="outlined"
                    placeholder=""
                    v-model="businessData['time']"
                    :disabled="isDisable"
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
            :disabled="isDisable"
          />
        </v-col>
      </v-row>
      <div class="d-flex flex-row mt-15 button-regis">
        <v-btn
          class="mb-8 mt-5"
          color="black"
          variant="tonal"
          @click="regisNewBusinessForm"
          :disabled="isDisable || !checkDisabled()"
        >
          Đăng kí
        </v-btn>
        <div v-if="isDisable && this.$store.state?.user?.data?.role !== 'enterprise'">
          <v-btn
            class="mb-8 mt-5 ml-5"
            color="primary"
            variant="tonal"
            :disabled="!deniedFlag"
            @click="accepted"
          >
            Chấp thuận
          </v-btn>
          <v-btn
            class="mb-8 mt-5 ml-5"
            color="error"
            variant="tonal"
            v-if="deniedFlag"
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
import CustomerTableVue from "../components/CustomerTable.vue";
import { CustomerData } from "../CommonFile";
import { v4 as uuidv4 } from "uuid";
import { getListVehicle, addBussinessData, getFormData, updateFormData } from '@/firebase'

export default {
  components: { CustomerTableVue },
  data() {
    return {
      businessData: {},
      vehicle: [] as any,
      typeofVehicle: {name: ''},
      idVehicle: '',
      formID: '' as any,
      isDisable: false,
      deniedFlag: false
    };
  },
  created(): void {
    this.init();
  },
  methods: {
    init(){
      this.getVehicle();
      this.formID = this.$route.params.formID;
      this.getformDetail();
      this.isDisable = this.$store.state?.user?.data?.role !== 'enterprise' || (this.formID && this.formID !== '')
      this.deniedFlag = this.businessData['type'] === 'accept'

    },
    async getVehicle() {
      const list = await getListVehicle()
      this.vehicle = list
    },
    handleData() {
      const clientData = [...this.businessData['customers'] ?? [], ...this.businessData['shipEmployees'] ?? [], ...this.businessData['guides'] ?? []]
      const localCustomers = this.businessData['customers']?.filter((item) => item.nation === 'Việt Nam')
      const internationalCustomers = this.businessData['customers']?.filter((item) => item.nation === 'Nước ngoài')
      const now = new Date();
      const created_at = now.toLocaleDateString() + ' ' + now.toLocaleTimeString()

      const setAPIData = {
        ...this.businessData,
        clients: clientData.flat(1),
        totalShipMember: !isNaN(this.businessData['guides']?.length + this.businessData['shipEmployees']?.length + 1) ? (this.businessData['guides']?.length + this.businessData['shipEmployees']?.length + 1) : 0,
        localCustomerNumber: localCustomers?.length ?? 0,
        internationalCustomerNumber: internationalCustomers?.length ?? 0,
        created_at,
        idVehicle: this.idVehicle
      }
      
      delete setAPIData['shipEmployees']
      delete setAPIData['guides']
      delete setAPIData['customers']
      return setAPIData
    },
    regisNewBusinessForm(): void {
      const setAPIData = this.handleData()
      const data = {...setAPIData, type: 'requesting'};
      try {
        addBussinessData(data)
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
    async getformDetail(): Promise<void> {
      if (this.formID && this.formID !== '') {
        this.businessData = await getFormData(this.formID)
        this.businessData['customers'] = this.businessData["clients"].filter(e => e.type === 'Customer')
        this.businessData['shipEmployees'] = this.businessData["clients"].filter(e => e.type === 'employee')
        this.businessData['guides'] = this.businessData["clients"].filter(e => e.type === 'guide')
        this.idVehicle = this.businessData['idVehicle']
      }
    },
    async accepted(): Promise<void> {
      let type = 'requesting'
      switch (this.$store.state?.user?.data?.role) {
        case 'manager':
          type = 'processing'
          break;
        
        case 'accountant':
          type = 'purchased'
          break;
        
        case 'border':
          type = 'accept'
          break;
      
        default:
          type = 'requesting'
          break;
      }
      const setAPIData = this.handleData();
      const data = {...setAPIData, type: type};
      await updateFormData(this.formID, data)
      this.$router.push('/list')
    },
    async denie(): Promise<void> {
      const type = 'reject'
      const setAPIData = this.handleData();
      const data = {...setAPIData, type: type};
      await updateFormData(this.formID, data)
      this.$router.push('/list')
    },
    checkDisabled(): boolean {
      return this.businessData['customers']?.length > 0 && this.businessData['meanName']
    }
  },
  watch: {
    typeofVehicle(newVal): void {
      this.idVehicle = newVal.id
      this.businessData['meanName'] = newVal.name;
      this.businessData['meanNumber'] = newVal['registration-number']
      this.businessData['ownerName'] = newVal['vehicle-owner']
      this.businessData['tonnage'] = newVal['tonnage']
      this.businessData['seats'] = newVal['wattage']
    },
    '$route' (to, from){
      if (to.path === '/form') {
        this.businessData = {};
        this.vehicle = [];
        this.typeofVehicle = {name : ''};
        this.idVehicle = '';
        this.formID = '';
        this.isDisable = false
      }
      this.init()
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
