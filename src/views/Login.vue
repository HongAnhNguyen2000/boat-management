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
      <v-link class="mb-3 text-underline" @click="goForgotPage()"
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
</template>

<script lang="ts">
export default {
  data: () => ({
    visible: false,
    email: "",
    password: "",
    disable: true,
    message: "",
    alert: false,
  }),
  watch: {
    password() {
      this.validateLogin();
    },
    email() {
      this.validateLogin();
    },
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
    validateLogin() {
      this.disable = this.email === "" || this.password === "";
    },
    goForgotPage() {
      this.$router.push("/forgot");
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
