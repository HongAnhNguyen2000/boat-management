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
              <v-text-field
                variant="outlined"
                label="Họ tên khách hàng*"
                placeholder="Họ tên khách hàng*"
                v-model="customerData['name']"
                required
                :rules="[rules.required, rules.counter]"
              />
            </v-col>
            <v-col cols="6" sm="6" md="6" class="birth-field">
              <v-text-field
                variant="outlined"
                label="Năm sinh*"
                placeholder="Năm sinh*"
                v-model="customerData['birthYear']"
                required
                :rules="[rules.required, rules.counterBirth, rules.isNumber]"
              />
            </v-col>
          </v-row>

          <v-row>
            <v-text-field
              label="CCCD"
              variant="outlined"
              v-model="customerData['cardId']"
              required
            />
          </v-row>
          <v-row>
            <v-text-field
              label="Nơi tạm trú"
              variant="outlined"
              v-model="customerData['place']"
              required
            />
          </v-row>
          <v-row>
            <v-text-field
              label="Ghi chú"
              variant="outlined"
              v-model="customerData['note']"
              required
            />
          </v-row>
          <v-row>
            <v-col cols="6" class="name-field">
              <v-select
                :items="['Nam', 'Nữ']"
                label="Giới tính*"
                v-model="customerData['gender']"
                required
                :rules="[rules.required]"
              />
            </v-col>
            <v-col cols="6" class="birth-field">
              <v-select
                :items="['Việt Nam', 'Nước ngoài']"
                label="Quốc tịch*"
                required
                v-model="customerData['nation']"
                :rules="[rules.required]"
              />
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue-darken-1" variant="text" @click="onClosePopUp">
          đóng
        </v-btn>
        <v-btn
          color="blue-darken-1"
          variant="text"
          @click="onActionButton"
          :disabled="checkDisabledButton"
        >
          lưu
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { v4 as uuidv4 } from "uuid";
import _ from "lodash";
export default {
  props: {
    setOpen: {
      type: Boolean,
      default: false,
    },
    chosenCustomerId: {
      type: String,
      default: "",
    },
    customerValue: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      openProp: this.setOpen,
      customerData: {},
      checkDisabledButton: true,
      rules: {
        required: (value: any) => !!value || "Xin mời nhập trường yêu cầu.",
        counter: (value: any) =>
          value.length > 1 || "Xin mời nhập tối thiểu 2 ký tự",
        isNumber: (value: any) =>
          /^\d+$/.test(value) || "Xin mời nhập đúng định dạng",
        counterBirth: (value: any) =>
          value.length === 4 || "Xin mời nhập 4 ký tự",
      },
    };
  },
  created(): void {
    this.init();
  },
  watch: {
    customerData: {
      handler(newVal) {
        this.checkDisabled();
      },
      deep: true,
    },
    setOpen(newValue: boolean): void {
      this.openProp = newValue;
    },
    customerValue(newVal): void {
      this.customerData = newVal;
    },
  },
  methods: {
    init(): void {
      this.customerData = { ...this.customerValue };
    },
    checkDisabled() {
      const falseTrue =
        _.isEmpty(this.customerData["name"]) ||
        _.isEmpty(this.customerData["birthYear"]) ||
        _.isEmpty(this.customerData["gender"]) ||
        !/^\d+$/.test(this.customerData["birthYear"]) ||
        this.customerData["name"]?.length < 2 ||
        this.customerData["birthYear"]?.length !== 4 ||
        _.isEmpty(this.customerData["nation"]);

      this.checkDisabledButton = falseTrue;
    },
    regisNewCustomer(): void {
      const newCustomer = {
        ...this.customerData,
        id: uuidv4(),
        type: "Customer",
      };
      this.$emit("onAddNewCustomer", newCustomer);
    },
    onChangeCustomerData(): void {
      this.$emit("onChangeCustomer", this.customerData);
    },
    onActionButton(): void {
      if (this.chosenCustomerId && this.chosenCustomerId.length > 0) {
        this.onChangeCustomerData();
      } else {
        this.regisNewCustomer();
      }
    },
    onClosePopUp(): void {
      this.$emit("onHandleActionDialog", false);
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
