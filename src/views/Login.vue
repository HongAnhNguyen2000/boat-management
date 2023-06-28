<template>
  <v-app-bar flat>
    <v-app-bar-title>
      <v-icon icon="mdi-circle-slice-4" />
      Boat management
    </v-app-bar-title>
  </v-app-bar>
  <v-alert
    v-model="alert"
    close-text="Close Alert"
    color="deep-purple accent-4"
    class="alert-forgot"
    dark
    dismissible
  >
    <div class="d-flex align-center">
      <span>
        {{ message }}
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
  <div class="container">
    <v-card
      class="mx-auto pa-12 pb-8"
      elevation="8"
      max-width="448"
      rounded="lg"
    >
      <div class="text-subtitle-1 text-medium-emphasis">Email đăng nhập</div>
      <v-text-field variant="outlined" placeholder="Email" v-model="email" />
      <div class="text-subtitle-1 text-medium-emphasis">Mật khẩu</div>
      <v-text-field
        variant="outlined"
        placeholder="Mật khẩu"
        v-model="password"
        type="password"
      />
      <v-link class="mb-3 text-underline" @click="openPopup()"
        >Quên mật khẩu</v-link
      >
      <v-btn
        block
        class="mb-8 mt-3"
        color="black"
        size="large"
        variant="tonal"
        @click="login()"
        :disabled="disable"
      >
        Log In
      </v-btn>
    </v-card>
  </div>

  <v-dialog v-model="open" width="auto">
    <v-card>
      <v-card-text class="d-flex justify-center align-center">
        <p>Liên lạc với ban quản lý qua số điện thoại:</p>
        <br />
        <a href="">{{ contactNumber }}</a>
        <br />
        <p>Để thay đổi mật khẩu</p>
      </v-card-text>
      <div class="d-flex justify-center align-center">
        <v-btn
          class="mb-8 mt-3"
          color="black"
          variant="tonal"
          @click="open = false"
        >
          Đóng
        </v-btn>
      </div>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { getUsers } from "@/firebase";

export default {
  data: () => ({
    visible: false,
    email: "",
    password: "",
    disable: true,
    message: "",
    alert: false,
    open: false,
    contactNumber: "",
  }),
  watch: {
    password() {
      this.validateLogin();
    },
    email() {
      this.validateLogin();
    },
  },
  created(): void {
    this.getUsers();
  },

  methods: {
    async login() {
      const loginVal = { email: this.email, password: this.password };
      const loggedIn = await this.$store.dispatch("logIn", loginVal);
      if (loggedIn) {
        setTimeout(() => {
          if (this.$store.state.user.loggedIn) {
            this.$router.push("list");
          }
        }, 500);
      } else {
        this.alert = true;
        this.message = "Bạn đăng nhập sai xin mời thử lại";
        setTimeout(() => {
          this.alert = false;
        }, 3000);
      }
    },
    async getUsers() {
      const dataUser = await getUsers();
      const pattern = /([\\+84|84|0]+(3|5|7|8|9|1[2|6|8|9]))+([0-9]{8})\b/;
      const manageUser = dataUser.filter(
        (item) => item.role === "manager" && pattern.test(item.phonenumber)
      );
      this.contactNumber =
        manageUser?.length > 0 ? manageUser[0].phonenumber : "09013599921";
    },
    validateLogin() {
      this.disable = this.email === "" || this.password === "";
    },
    openPopup() {
      this.open = true;
    },
    closeAlert() {
      this.alert = false;
    },
  },
};
</script>

<style scoped>
.container {
  margin-top: 150px;
}
.text-underline {
  text-decoration: underline;
  cursor: pointer;
}
</style>
