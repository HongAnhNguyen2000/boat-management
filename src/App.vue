<template>
  <div>
    <v-layout row justify-center v-if="roleUser">
      <v-toolbar app dark color="blue-grey darken-1" class="hidden-xs-and-down">
        <v-toolbar-title>Quản lý tàu</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn
            v-for="item in nav"
            :key="item.icon"
            :to="item.url"
            :title="item.title"
            flat
            >{{ item.text }}</v-btn
          >
          <v-btn flat @click="logOutUser"> Đăng xuất </v-btn>
        </v-toolbar-items>
      </v-toolbar>
    </v-layout>
    <router-view />
  </div>
</template>

<script lang="ts">
interface NavType {
  icon: string;
  url: string;
  title: string;
  text: string;
  active: boolean;
}
import { getListVehicle } from "@/firebase";
export default {
  data() {
    return {
      dialog: false,
      vehicle: [] as any,
      isLogginUrl: this.$route.path === "/",
      nav: [] as NavType[],
    };
  },
  created(): void {
    this.getVehicle();
  },
  computed: {
    roleUser() {
      return this.$store.state.user.data?.role || "";
    },
  },
  async mounted() {
    await this.$nextTick();
    this.checkRoleUser(this.roleUser);
  },
  methods: {
    async getVehicle() {
      const list = await getListVehicle();
      this.vehicle = list;
    },
    logOutUser() {
      this.$store.dispatch("logOut");
    },
    checkRoleUser(role: string) {
      this.nav = [
        {
          icon: "Danh sách",
          text: "Danh sách",
          title: "Danh sách",
          url: "/list",
          active: true,
        },
        {
          icon: "Người dùng",
          text: "Cập nhật người dùng",
          title: "Cập nhật người dùng",
          url: "/update-user",
          active: false,
        },
      ];
      if (role === "enterprise") {
        this.nav.push({
          icon: "Đăng kí",
          text: "Đăng kí",
          title: "Quay lại trang Form",
          url: "/form",
          active: false,
        });
      } else if (role === "manager") {
        this.nav.push(
          {
            icon: "Phương tiện",
            text: "Thêm phương tiện",
            title: "Thêm phương tiện",
            url: "/add-vehicle",
            active: false,
          },
          {
            icon: "Quản lý người dùng",
            text: "Quản lý người dùng",
            title: "Quản lý người dùng",
            url: "/users",
            active: false,
          }
        );
      }
    },
  },
  watch: {
    roleUser(newVal) {
      this.checkRoleUser(newVal);
    },
  },
};
</script>
