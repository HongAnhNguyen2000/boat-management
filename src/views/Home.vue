<template>
  <div v-if="!roleUser" class="overlay">
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
    </div>
  <div>
  <v-layout row justify-center>
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
        >{{ item.text }}</v-btn>
        <v-btn flat @click="logOutUser">
          Đăng xuất
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
  </v-layout>
  <div class="data-container">
    <business-form />
  </div>
</div>
</template>

<script lang="ts">
import BusinessForm from '@/components/BusinessForm.vue'
import { getListVehicle } from '@/firebase'
import { mapState } from 'vuex'

export default {
  components: { BusinessForm },
  data() {
    return {
      dialog: false,
      vehicle: [] as any,
      nav: [
        {
          icon: 'Danh sách',
          text: 'Danh sách',
          title: 'Danh sách',
          url: '#',
          active: false
        },
      ],
    }
  },
  created(): void {
    this.getVehicle()
  },
  computed: {
    roleUser() {
      return this.$store.state.user.data?.role || ''
    }
  },
  async mounted() {
    await this.$nextTick()
    this.checkRoleUser(this.roleUser)
  },
  methods: {
    async getVehicle() {
      const list = await getListVehicle()
      this.vehicle = list
    },
    logOutUser() {
      this.$store.dispatch("logOut")
    },
    checkRoleUser(role: string) {

      if (role === 'enterprise') {
        this.nav.push({
          icon: 'Đăng kí',
          text: 'Đăng kí',
          title: 'Back to Form page',
          url: '#',
          active: true
        })
      }
      if (role === 'manager') {
        this.nav.push({
          icon: 'Phương tiện',
          text: 'Thêm phương tiện',
          title: 'Thêm phương tiện',
          url: '/add-vehicle',
          active: false
        })
      }
    }
  },
  watch: {
    roleUser(newVal) {
      this.checkRoleUser(newVal)
    }
  }
}
</script>

<style scoped>
.data-container {
  margin: 2rem;
  padding: 40px 56px;
}
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.8);
  z-index: 9999;
}
</style>
