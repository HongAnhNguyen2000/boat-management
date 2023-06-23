<template>
  <div class="d-flex flex-row add-new-customer">
    <h3>Danh sách hành khách</h3>
    <v-btn variant="outlined" @click="onShowDialog(null)" :disabled="disabled">+Thêm</v-btn>
  </div>
  <v-table fixed-header :height="dataCustomers && dataCustomers.length > 0 ? '300px' : '56px'" mt="2" class="customer-table">
    <thead>
      <tr>
        <th class="text-left">STT</th>
        <th class="text-left">Họ và tên khách</th>
        <th class="text-left">Năm sinh</th>
        <th class="text-left">Giới tính</th>
        <th class="text-left">Số CMND(hộ chiếu)</th>
        <th class="text-left">Quốc tịch</th>
        <th class="text-left">Nơi tạm trú</th>
        <th class="text-left">Ghi chú</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item, index) in dataCustomers" :key="index">
        <td>{{ index + 1 }}</td>
        <td>{{ item.name }}</td>
        <td>{{ item.birthYear }}</td>
        <td>{{ item.gender }}</td>
        <td>{{ item.cardId }}</td>
        <td>{{ item.nation }}</td>
        <td>{{ item.place }}</td>
        <td>{{ item.note }}</td>
        <td>
          <v-btn variant="outlined" @click="onShowDialog(item.id)"
            :disabled="disabled">Sửa</v-btn
          >
        </td>
      </tr>
    </tbody>
  </v-table>

  <dialog-form :setOpen="setOpen" :chosenCustomerId="chosenCustomerId" :customerValue="chosenCustomerValue" @onChangeCustomer="onChangeData" @onAddNewCustomer="onAddNewData" @onHandleActionDialog="onHandleActionDialog"/>
</template>

<script lang="ts">
import { PropType } from 'vue';
import { CustomerData } from '../CommonFile'


import DialogForm from "./atoms/DialogForm.vue";
export default {
  components: { DialogForm },
  props: {
    customers: {
      type: Array as PropType<CustomerData[]>,
      default: () => ([])
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      dataCustomers: [...this.customers],
      setOpen: false,
      chosenCustomerId: '',
      chosenCustomerValue: {}
    };
  },
  watch:{
    customers(newVal) {
      console.log('newVal', newVal)
      this.dataCustomers = [...newVal]
    },
    dataCustomers(newVal): void {
      this.$emit('onChangeCustomerData', newVal)
    }
  },
  methods: {
    onShowDialog(customerId) {
      this.chosenCustomerId = customerId
      this.chosenCustomerValue = this.dataCustomers.find((item) => item.id === customerId) ?? {}
      this.setOpen = true;
    },
    onChangeData(newValue): void {
      const updatedItems = this.dataCustomers.map(item => {
        if (item.id === newValue.id) {
          item = newValue;
        }
        return item
      })
      this.dataCustomers = updatedItems;
      this.onHandleActionDialog(false)
    },
    onAddNewData(newVal): void {
      this.dataCustomers = [...this.dataCustomers, newVal]
      this.onHandleActionDialog(false)
    },
    onHandleActionDialog(newVal: boolean): void {
      this.setOpen = newVal
    }
  },
};
</script>

<style scoped>
.add-new-customer {
  justify-content: space-between;
  margin: 10px
}
.customer-table {
  border: 1px solid #e3e1e1;
}
</style>
