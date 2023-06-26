<template>
  <v-overlay v-model="isLoading" contained class="align-center justify-center">
    <v-progress-circular indeterminate color="primary"></v-progress-circular>
  </v-overlay>
  <div class="data-container">
    <v-btn
      class="mb-8"
      color="black"
      size="large"
      variant="tonal"
      @click="createUser"
    >
      <v-icon class="white--text mr-2">mdi-plus</v-icon>
      Tạo người dùng
    </v-btn>
    <v-table>
      <thead>
        <tr>
          <th
            class="text-left"
            @click="sortBy('email')"
            style="cursor: pointer"
          >
            <span style="display: inline-block">Email</span>
            <div v-if="currentSort === 'email'" style="display: inline-block">
              <v-icon icon="mdi-chevron-down" v-if="isSortASC"></v-icon>
              <v-icon icon="mdi-chevron-up" v-else></v-icon>
            </div>
          </th>
          <th class="text-left">Tên</th>
          <th class="text-left">Số điện thoại</th>
          <th class="text-left">Tên người dùng</th>
          <th class="text-left" @click="sortBy('role')" style="cursor: pointer">
            <span style="display: inline-block">Vai trò</span>
            <div v-if="currentSort === 'role'" style="display: inline-block">
              <v-icon icon="mdi-chevron-down" v-if="isSortASC"></v-icon>
              <v-icon icon="mdi-chevron-up" v-else></v-icon>
            </div>
          </th>
          <th class="text-left"></th>
        </tr>
      </thead>
      <tbody v-if="showUsers.length > 0 && isReload">
        <tr
          v-for="(item, index) in showUsers"
          :key="item.email + index"
          @click="gotoDetail(item.id)"
          style="cursor: pointer"
        >
          <td>{{ item.email }}</td>
          <td>{{ item.name }}</td>
          <td>{{ item.phonenumber }}</td>
          <td>{{ item.username }}</td>
          <td>{{ labelType.find((label) => label.en === item.role)?.vi }}</td>
        </tr>
      </tbody>
    </v-table>
    <div class="text-center" v-if="pages > 1">
      <v-pagination v-model="page" :length="pages"></v-pagination>
    </div>
  </div>
</template>

<script lang="ts">
import { getInfo, getUsers } from "@/firebase";
import _ from "lodash";

export default {
  data() {
    return {
      users: [] as any,
      showUsers: [] as any,
      isReload: true,
      isSortASC: true,
      currentSort: "",
      page: 1,
      pages: 1,
      labelType: [
        { en: "manager", vi: "Ban quản lý" },
        { en: "authority", vi: "Cảng vụ" },
        { en: "border", vi: "Biên phòng" },
        { en: "accountant", vi: "Kế toán" },
        { en: "enterprise", vi: "Doanh nghiệp" },
      ],
    };
  },
  created(): void {
    this.getUsers();
  },
  watch: {
    page(newVal) {
      if (this.users.length > 0) {
        this.isReload = false;
        this.showUsers = [...this.users].slice((newVal - 1) * 10, newVal * 10);
        setTimeout(() => {
          this.isReload = true;
        }, 500);
      }
    },
  },

  methods: {
    sortBy(field: string) {
      if (this.currentSort === field) {
        this.isSortASC = !this.isSortASC;
      } else {
        this.currentSort = field;
        this.isSortASC = true;
      }
      this.users = _.orderBy(
        [...this.users],
        [field],
        [this.isSortASC ? "asc" : "desc"]
      );
      if (this.users.length > 0) {
        this.showUsers = [...this.users].slice(
          (this.page - 1) * 10,
          this.page * 10
        );
      }
    },
    async getUsers() {
      const getDatas: any = await getUsers();
      this.users = [...getDatas, ...getDatas, ...getDatas];
      for (const user of getDatas) {
        if (user.infos_id) {
          const fetInfo = await getInfo(user.infos_id);
          user.company = fetInfo.company;
        }
      }
      this.sortBy("role");
      this.pages = this.users.length / 10 + 1;
      if (this.users.length > 0) {
        this.showUsers = [...this.users].slice(
          (this.page - 1) * 10,
          this.page * 10
        );
      }
    },
    gotoDetail(id) {
      this.$router.push("/user/" + id);
    },
    createUser() {
      this.$router.push("/user/register");
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
