<template>
  <v-app-bar flat>
    <v-app-bar-title>
      <v-icon icon="mdi-circle-slice-4" />
      Boat management
    </v-app-bar-title>
  </v-app-bar>
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
      <v-btn
        block
        class="mb-8"
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
    login() {
      const loginVal = { email: this.email, password: this.password };
      this.$store.dispatch("logIn", loginVal);
      setTimeout(() => {
        if (this.$store.state.user.loggedIn) {
          this.$router.push("list");
        }
      }, 500);
    },
    validateLogin() {
      this.disable = this.email === "" || this.password === "";
    },
  },
};
</script>

<style scoped>
.container {
  margin-top: 150px;
}
</style>
