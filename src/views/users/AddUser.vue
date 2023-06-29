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
  <div class="data-container" style="max-width: 768px; margin: auto">
    <h2 class="mb-5">Tạo người dùng mới</h2>
    <div class="grey lighten-4 nft-page create-qr-page contentsWrapStyle">
      <v-row>
        <v-col cols="6">
          <h4>Email <span style="color: red">*</span></h4>
          <v-text-field
            variant="outlined"
            v-model="email"
            :rules="[rules.required, rules.email]"
          />
        </v-col>
        <v-col cols="6">
          <h4>Số điện thoại <span style="color: red">*</span></h4>
          <v-text-field
            variant="outlined"
            v-model="phonenumber"
            :rules="[rules.required, rules.phonenumber]"
          />
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="6">
          <h4>Chọn vai trò</h4>
          <v-select
            label="Vai trò người dùng"
            :items="labelType"
            v-model="role"
            item-value="en"
            item-text="vi"
            item-title="vi"
            variant="solo"
          />
        </v-col>
        <v-col cols="6">
          <h4>Chọn công ty</h4>
          <v-select
            label="Công ty"
            :items="companies"
            item-value="id"
            item-text="company"
            item-title="company"
            v-model="company"
            variant="solo"
          />
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="6">
          <h4>Mật khẩu mới</h4>

          <v-text-field
            variant="outlined"
            placeholder="Mật khẩu mới"
            type="password"
            v-model="newPassword"
            :rules="passwordRules"
          />
        </v-col>
        <v-col cols="6">
          <h4>Nhập lại mật khẩu</h4>
          <v-text-field
            variant="outlined"
            placeholder="Nhập lại mật khẩu"
            type="password"
            :rules="confirmPasswordRules"
            v-model="newPasswordRepeat"
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
        Tạo Người dùng
      </v-btn>
    </div>
  </div>
</template>

<script lang="ts">
import { addUser, getInfos } from "@/firebase";
import _ from "lodash";
export default {
  data() {
    return {
      labelType: [
        { en: "manager", vi: "Ban quản lý" },
        { en: "authority", vi: "Cảng vụ" },
        { en: "border", vi: "Biên phòng" },
        { en: "accountant", vi: "Kế toán" },
        { en: "enterprise", vi: "Doanh nghiệp" },
      ],
      email: "",
      name: "",
      password: "",
      phonenumber: "",
      infos_id: "",
      company: "",
      role: { en: "enterprise", vi: "Doanh nghiệp" } as any,
      currentRole: "",
      companies: [] as any,
      user_id: "" as any,
      message: "",
      newPassword: "",
      newPasswordRepeat: "",
      colorAlert: "",
      isEnterprise: true,
      messageAlert: "",
      alert: false,
      disabled: true,
      passwordRules: [
        (value: any) =>
          (value && value.length >= 6) || "Mật khẩu ít nhất có 6 ký tự",
      ],
      confirmPasswordRules: [
        (value: any) =>
          value === this.newPassword || "Mật khẩu xác nhận không trùng khớp.",
      ],
      rules: {
        required: (value: any) => !!value || "Xin mời nhập trường yêu cầu.",
        counter: (value: any) =>
          value.length >= 6 || "Xin mời nhập tối thiểu 6 ký tự",
        email: (value: any) => {
          const pattern =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || "Email không hợp lệ.";
        },
        phonenumber: (value: any) => {
          const pattern = /([\\+84|84|0]+(3|5|7|8|9|1[2|6|8|9]))+([0-9]{8})\b/;
          return pattern.test(value) || "Số điện thoại không hợp lệ.";
        },
      },
    };
  },
  created() {
    this.getInfo();
  },
  watch: {
    role(newVal) {
      this.isEnterprise = newVal === "enterprise";
      this.company = "";
    },
    email() {
      this.disabled = this.checkValidate();
    },
    name() {
      this.disabled = this.checkValidate();
    },
    newPassword() {
      this.disabled = this.checkValidate();
    },
    newPasswordRepeat() {
      this.disabled = this.checkValidate();
    },
    phonenumber() {
      this.disabled = this.checkValidate();
    },
  },
  methods: {
    checkValidate() {
      const testPhone = this.rules.phonenumber(this.phonenumber);
      return (
        _.isEmpty(this.email) ||
        _.isEmpty(this.name) ||
        _.isEmpty(this.newPassword) ||
        _.isEmpty(this.phonenumber) ||
        (typeof testPhone === "boolean" && !testPhone) ||
        typeof testPhone === "string" ||
        this.newPassword !== this.newPasswordRepeat
      );
    },
    validate() {
      return this.newPassword === this.newPasswordRepeat;
    },
    async regis() {
      if (await this.validate()) {
        const params = {
          email: this.email,
          name: this.name,
          password: this.newPassword,
          phonenumber: this.phonenumber,
          role: this.role.en,
        };
        if (this.role.en === "enterprise") {
          params["infos_id"] = this.company;
        }
        const actionAddUser = await addUser(params);
        if (actionAddUser) {
          this.colorAlert = "green";
          this.alert = true;
          this.messageAlert = "Bạn tạo người dùng thành công";
          setTimeout(() => {
            this.$router.push("/users");
          }, 2000);
        } else {
          this.colorAlert = "red";

          this.alert = true;
          this.messageAlert =
            "Bạn tạo người dùng không thành công. Xin thử lại";
          setTimeout(() => {
            this.alert = false;
          }, 3000);
        }
      }
    },
    async getInfo(): Promise<void> {
      this.companies = await getInfos();
      this.company = this.infos_id
        ? this.companies.find((company: any) => company.id === this.infos_id)
            .company
        : "";
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
