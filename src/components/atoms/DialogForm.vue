<template>
  <v-dialog
    v-model="openProp"
    width="500"
    class="font-weight-medium"
    persistent
  >
    <v-card>
      <v-card-title>
        <span class="text-h5">Thông tin khách hàng</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="6" sm="6" md="6" class="name-field">
              <v-text-field variant="outlined"  label="Họ tên khách hàng" v-model="customerData['name']" required></v-text-field>
            </v-col>
            <v-col cols="6" sm="6" md="6" class="birth-field">
              <v-text-field variant="outlined"  label="Nam sinh" v-model="customerData['birthYear']" required></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-text-field label="CCCD" variant="outlined" v-model="customerData['cardId']" required></v-text-field>
          </v-row>
          <v-row>
            <v-text-field label="Noi tam tru" variant="outlined" v-model="customerData['place']" required></v-text-field>
          </v-row>
          <v-row>
            <v-text-field label="Ghi chu" variant="outlined" v-model="customerData['note']" required></v-text-field>
          </v-row>
          <v-row>
          <v-col cols="6" class="name-field">
            <v-select :items="['Nam', 'Nữ']" label="Gioi tinh" v-model="customerData['gender']" required></v-select>
          </v-col>
          <v-col cols="6" class="birth-field">
              <v-select
              :items="['Việt Nam', 'Nước ngoài']"
              label="Quoc tich"
              required
              v-model="customerData['nation']"
            ></v-select>
          </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue-darken-1" variant="text" @click="onClosePopUp">
          Close
        </v-btn>
        <v-btn color="blue-darken-1" variant="text" @click="onActionButton">
          Save
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { v4 as uuidv4 } from 'uuid';
export default {
  props: {
    setOpen: {
      type: Boolean,
      default: false,
    },
    chosenCustomerId: {
      type: String,
      default: '',
    },
    customerValue: {
      type: Object,
      default: () => {},
    }
  },
  data() {
    return {
      openProp: this.setOpen,
      customerData: {}
    };
  },
  created(): void {
    this.init();
  },
  methods: {
    init(): void {
      this.customerData = { ...this.customerValue }
    },
    regisNewCustomer(): void {
      const newCustomer = { ...this.customerData, id: uuidv4(), type: "Customer"}
      this.$emit('onAddNewCustomer', newCustomer)
    },
    onChangeCustomerData(): void {
      this.$emit('onChangeCustomer', this.customerData)
    },
    onActionButton(): void {
      if (this.chosenCustomerId && this.chosenCustomerId.length > 0) {
        this.onChangeCustomerData()
      } else {
        this.regisNewCustomer()
      }
    },
    onClosePopUp(): void {
      this.$emit('onHandleActionDialog', false)
    }
  },
  watch: {
    setOpen(newValue: boolean): void {
      this.openProp = newValue;
    },
    customerValue(newVal): void {
      this.customerData = newVal
    },
  },
};
</script>

<style scoped>
.name-field {
    padding-left: 0 !important;
}
.birth-field {
    padding-right: 0 !important;
}
</style>
