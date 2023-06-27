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
      roleUser: "",
    };
  },
  created(): void {
    this.getVehicle();
    console.log("1");
    if (!this.$store.state.user.loggedIn) {
      this.$router.push("/");
    }
  },
  watch: {
    $route(to, from) {
      if (this.$store.state.user.data?.role) {
        this.roleUser = this.$store.state.user.data?.role;
        this.checkRoleUser(this.$store.state.user.data?.role);
      }
      if (
        this.roleUser !== "manager" &&
        (["/users", "/vehicles"].includes(to.path) ||
          to.path.includes("/vehicle"))
      ) {
        this.$router.push("/list");
      }
      if (this.roleUser !== "enterprise" && to.path === "/form") {
        this.$router.push("/list");
      }
      if (!this.$store.state.user.loggedIn) {
        this.$router.push("/");
      }
    },
  },
  methods: {
    async getVehicle() {
      const list = await getListVehicle();
      this.vehicle = list;
    },
    logOutUser() {
      this.$store.dispatch("reset");
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
            icon: "Quản lý người dùng",
            text: "Quản lý người dùng",
            title: "Quản lý người dùng",
            url: "/users",
            active: false,
          },
          {
            icon: "Quản lý phương tiện",
            text: "Quản lý phương tiện",
            title: "Quản lý phương tiện",
            url: "/vehicles",
            active: false,
          }
        );
      }
      this.nav.push({
        icon: "Người dùng",
        text: "Cập nhật Thông tin",
        title: "Cập nhật Thông tin",
        url: "/update-user",
        active: false,
      });
    },
  },
};
</script>
