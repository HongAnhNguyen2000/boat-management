<template>
  <div class="data-container">
    <div class="grey lighten-4 nft-page create-qr-page contentsWrapStyle">
      <v-text-field
        variant="outlined"
        placeholder="Tên phương tiện"
        v-model="name"
        :rules="[rules.required]"
      ></v-text-field>
      <v-text-field
        variant="outlined"
        placeholder="Số đăng ký"
        v-model="registrationNumber"
        :rules="[rules.required]"
      />
      <v-text-field
        variant="outlined"
        placeholder="Hạn bảo hiểm"
        v-model="insuranceDeadline"
        :rules="[rules.required]"
      />
      <v-text-field
        variant="outlined"
        placeholder="Ảnh bảo hiểm"
        v-model="insurancePhoto"
        :rules="[rules.required]"
      />
      <v-text-field
        variant="outlined"
        placeholder="Hạn đăng kiểm"
        v-model="registrationDeadline"
        :rules="[rules.required]"
      />
      <v-text-field
        variant="outlined"
        placeholder="Ảnh đăng kiểm"
        v-model="registrationPhoto"
        :rules="[rules.required]"
      />
      <v-text-field
        variant="outlined"
        placeholder="Trọng tải"
        v-model="tonnage"
        :rules="[rules.required]"
      />
      <v-text-field
        variant="outlined"
        placeholder="Loại phương tiện"
        v-model="type"
        :rules="[rules.required]"
      />
      <v-text-field
        variant="outlined"
        placeholder="Chủ phương tiện"
        v-model="vehicleOwner"
        :rules="[rules.required]"
      />
      <v-text-field
        variant="outlined"
        placeholder="Công suất"
        v-model="wattage"
        :rules="[rules.required]"
      />
      <v-text-field
        variant="outlined"
        placeholder="Năm sản xuất"
        v-model="yearManufacture"
      />
      <div>
        <h3>Chọn công ty</h3>
        <v-select
          class="mt-2"
          label="Công ty"
          :items="companies"
          item-value="users_id"
          item-text="company"
          item-title="company"
          v-model="usersId"
          variant="solo"
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
      Đăng ký
    </v-btn>
  </div>
</template>

<script lang="ts">
import {
  addVehicle,
  getInfo,
  getInfos,
  getListVehicle,
  getUsers,
} from "@/firebase";
export default {
  data() {
    return {
      dialog: false,
      nav: [
        {
          icon: "Regis Form",
          text: "Form",
          title: "Back to Form page",
          active: true,
        },
        {
          icon: "List",
          text: "List",
          title: "List",
          active: false,
        },
      ],
      registrationNumber: "",
      insuranceDeadline: "",
      insurancePhoto: "",
      name: "",
      registrationDeadline: "",
      registrationPhoto: "",
      tonnage: "",
      type: "",
      vehicleOwner: "",
      wattage: "",
      yearManufacture: "",
      usersId: "",
      users: [] as any,
      companies: [] as any,
      rules: {
        required: (value: any) => !!value || "Required.",
      },
    };
  },
  created() {
    this.getUsers();
  },
  methods: {
    async regis() {
      const params = {
        "registration-number": this.registrationNumber,
        "insurance-deadline": this.insuranceDeadline,
        "insurance-photo": this.insurancePhoto,
        name: this.name,
        "registration-deadline": this.registrationDeadline,
        "registration-photo": this.registrationPhoto,
        tonnage: this.tonnage,
        type: this.type,
        "vehicle-owner": this.vehicleOwner,
        wattage: this.wattage,
        "year-manufacture": this.yearManufacture,
        users_id: this.usersId,
      };
      await addVehicle(params);
      this.$router.push("/vehicles");
    },
    async getUsers(): Promise<void> {
      const getDatas: any = await getUsers();
      const users = getDatas.filter((data) => data.role === "enterprise");
      this.users = users;
      for (const user of users) {
        const fetInfo = await getInfo(user.infos_id);
        this.companies.push({
          ...fetInfo,
          users_id: user.id,
        });
      }
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
