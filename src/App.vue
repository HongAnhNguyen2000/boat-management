<template>
  <div>
    <v-layout row justify-center v-if="!isLogginUrl">
      <v-toolbar
        app
        dark
        color="blue-grey darken-1"
        class="hidden-xs-and-down"
        v-if="roleUser"
      >
        <v-toolbar-title><img src="../logo.svg" /></v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn
            v-for="item in nav"
            :key="item.icon"
            :to="item.url"
            :title="item.title"
            flat
          >
            <img :src="item.icon" />
            {{ item.text }}</v-btn
          >
          <v-btn flat @click="logOutUser">
            <img src="../logout.svg" />
            Đăng xuất
          </v-btn>
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
  },
  watch: {
    $route(to, from) {
      console.log(this.$route.path);
      this.isLogginUrl = this.$route.path === "/";
      if (!(to.path === "/" || to.path === "/forgot")) {
        if (!this.$store.state.user.loggedIn) {
          this.$router.push("/");
        }
      }
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
          icon: "../lists.svg",
          text: "Danh sách",
          title: "Danh sách",
          url: "/list",
          active: true,
        },
      ];
      if (role === "manager") {
        this.nav.push(
          {
            icon: "../all_users.svg",
            text: "Quản lý người dùng",
            title: "Quản lý người dùng",
            url: "/users",
            active: false,
          },
          {
            icon: "../ship.svg",
            text: "Quản lý phương tiện",
            title: "Quản lý phương tiện",
            url: "/vehicles",
            active: false,
          }
        );
      }
      this.nav.push({
        icon: "../update_profile.svg",
        text: "Thông tin người dùng",
        title: "Thông tin người dùng",
        url: "/update-user",
        active: false,
      });
    },
  },
};
</script>
<style>
table tbody tr:hover {
  background: #d0d0d0;
}
table tr:nth-child(even) {
  background: #f4f4f4;
}
.min-width-table table {
  min-width: 1300px;
}
table thead {
  background-color: #c7c7c794;
}
.v-toolbar-items img {
  max-width: 30px;
  max-height: 30px;
  margin-right: 4px;
}
</style>
