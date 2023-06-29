<template>
  <div class="data-container">
    <div class="grey user-info">
      <h2>Thông tin người dùng</h2>
      <p class="mt-3">
        <span> Email: </span>
        <span>
          {{ email }}
        </span>
      </p>
      <p class="mt-3">
        <span> Tên: </span>
        <span>
          {{ name }}
        </span>
      </p>
      <p class="mt-3">
        <span> Số điện thoại: </span>
        <span>
          {{ phonenumber }}
        </span>
      </p>
      <p class="mt-3">
        <span> Vai trò người dùng: </span>
        <span>
          {{ labelType.find((label) => label.en === role)?.vi }}
        </span>
      </p>
      <p v-if="company && company != ''" class="mt-3">
        <span> Công ty: </span>
        <span>
          {{ company }}
        </span>
      </p>
    </div>
    <div>
      <v-btn
        class="mt-8 button-action"
        color="green"
        variant="elevated"
        @click="regis"
      >
        Cập nhật Người dùng
      </v-btn>
    </div>
  </div>
</template>

<script lang="ts">
import { getInfos, getUser } from "@/firebase";
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
      role: "",
      user_id: "" as any,
    };
  },
  created() {
    this.user_id =
      this.$route.params.userID ?? this.$store.state?.user?.data.id;
    this.getUser();
    this.getInfo();
  },
  methods: {
    async regis() {
      this.$router.push("/user/update/" + this.user_id);
    },
    async getUser(): Promise<void> {
      const userDetail = await getUser(this.user_id);
      this.email = userDetail.email;
      this.name = userDetail.name;
      this.password = userDetail.password;
      this.phonenumber = userDetail.phonenumber;
      this.infos_id = userDetail.infos_id;
      this.role = userDetail.role;
    },
    async getInfo(): Promise<void> {
      const companies = await getInfos();
      const company = companies.find(
        (company: any) => company.id === this.infos_id
      );
      this.company = company ? company.company : "";
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
    margin: 2rem;
  }
}

p span:first-child {
  width: 140px;
}
p {
  display: flex;
}
.data-container {
  display: flex;
  flex-direction: column;
}
.button-action {
}
</style>
