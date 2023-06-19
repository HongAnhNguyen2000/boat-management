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
      <div class="text-subtitle-1 text-medium-emphasis">Account</div>
        <v-text-field variant="outlined" placeholder="UserName" v-model="username"/>
      <div class="text-subtitle-1 text-medium-emphasis">Password</div>
        <v-text-field variant="outlined" placeholder="Password" v-model="password"/>
      <v-btn
        block
        class="mb-8"
        color="black"
        size="large"
        variant="tonal"
        @click="login()"
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
      username: '',
      password: ''
    }),
    methods: {
      login() {
        this.$store.dispatch("logIn", this.username, this.password);
        // this.$router.push('/home')
      }
    }
  }
</script>

<style scoped>
.container {
    margin-top: 150px;
}
</style>