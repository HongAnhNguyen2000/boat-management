<template>
  <div class="data-container">
    <div class="grey lighten-4 nft-page create-qr-page contentsWrapStyle">
      <v-text-field
        variant="outlined"
        placeholder="Email"
        v-model="email"
        :rules="[rules.required, rules.email]"
      />
      <v-text-field
        variant="outlined"
        placeholder="Tên"
        v-model="name"
        :rules="[rules.required]"
      />
      <v-text-field
        variant="outlined"
        placeholder="Số điện thoại"
        v-model="phonenumber"
        :rules="[rules.required]"
      />
      <v-text-field
        variant="outlined"
        placeholder="Tên đăng nhập"
        v-model="username"
        :rules="[rules.required]"
      />
      <div v-if="currentRole !== 'enterprise' && role.en === 'enterprise'">
        <h3>Chọn vai trò</h3>
        <v-select
          class="mt-2"
          label="Vai trò người dùng"
          :items="labelType"
          v-model="role"
          item-value="en"
          item-text="vi"
          item-title="vi"
          variant="solo"
        />
      </div>
      <div v-if="currentRole !== 'enterprise' && role.en === 'enterprise'">
        <h3>Chọn công ty</h3>
        <v-select
          class="mt-2"
          label="Công ty"
          :items="companies"
          item-value="id"
          item-text="company"
          item-title="company"
          v-model="company"
          variant="solo"
        />
      </div>
      <hr />
      <div class="pt-5">
        <h3 class="mb-3">Thay đổi mật khẩu (bỏ qua nếu không muốn thay đổi)</h3>
        <v-text-field
          variant="outlined"
          placeholder="Mật khẩu mới"
          type="password"
          v-model="newPassword"
          :rules="passwordRules"
        />
        <v-text-field
          variant="outlined"
          placeholder="Mật khẩu mới nhắc lại"
          type="password"
          :rules="confirmPasswordRules"
          v-model="newPasswordRepeat"
        />
      </div>
    </div>
    <v-btn
      block
      class="mb-8"
      color="black"
      size="large"
      variant="tonal"
      @click="regis"
    >
      Cập nhật Người dùng
    </v-btn>
  </div>
</template>

<script lang="ts">
import { getInfos, getUser, updateUser } from "@/firebase";
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
      username: "",
      infos_id: "",
      company: "",
      role: {} as any,
      currentRole: "",
      companies: [] as any,
      user_id: "" as any,
      message: "",
      newPassword: "",
      newPasswordRepeat: "",
      alert: false,
      passwordRules: [
        (value: any) =>
          (value && value.length >= 6) || "Mật khẩu ít nhất có 6 ký tự",
      ],
      confirmPasswordRules: [
        (value: any) =>
          value === this.newPassword || "Mật khẩu xác nhận không trùng khớp.",
      ],
      rules: {
        required: (value: any) => !!value || "Required.",
        counter: (value: any) => value.length <= 20 || "Max 20 characters",
        email: (value: any) => {
          const pattern =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || "Invalid e-mail.";
        },
      },
    };
  },
  created() {
    this.user_id =
      this.$route.params.userID ?? this.$store.state?.user?.data.id;
    this.getUser();
  },
  watch: {
    $route(to, from) {
      this.user_id =
        this.$route.params.userID ?? this.$store.state?.user?.data.id;
      this.getUser();
    },
  },
  methods: {
    validate() {
      if (
        (this.newPassword || this.newPasswordRepeat) &&
        this.newPassword === this.newPasswordRepeat
      ) {
        this.password = this.newPassword;
      }
    },
    async regis() {
      await this.validate();
      const params = {
        email: this.email,
        name: this.name,
        password: this.password,
        phonenumber: this.phonenumber,
        username: this.username,
        infos_id: this.company,
        role: this.role.en,
      };
      await updateUser(this.user_id, params);
      this.$router.push("/users");
    },
    async getUser(): Promise<void> {
      const userDetail = await getUser(this.user_id);
      this.email = userDetail.email;
      this.name = userDetail.name;
      this.password = userDetail.password;
      this.phonenumber = userDetail.phonenumber;
      this.username = userDetail.username;
      this.infos_id = userDetail.infos_id;
      this.role = this.labelType.find((label) => label.en === userDetail.role);
      this.getInfo();
    },
    async getInfo(): Promise<void> {
      this.companies = await getInfos();
      this.company = this.infos_id
        ? this.companies.find((company: any) => company.id === this.infos_id)
            .company
        : "";
    },
  },
};
</script>
<style scoped>
.data-container {
  margin: 2rem;
  padding: 40px 56px;
}
</style>
