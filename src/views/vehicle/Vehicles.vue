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
      Thêm Phương tiện giao thông
    </v-btn>
    <v-table>
      <thead>
        <tr>
          <th class="text-left" @click="sortBy('name')" style="cursor: pointer">
            <span style="display: inline-block">Tên phương tiện</span>
            <div v-if="currentSort === 'name'" style="display: inline-block">
              <v-icon icon="mdi-chevron-down" v-if="isSortASC"></v-icon>
              <v-icon icon="mdi-chevron-up" v-else></v-icon>
            </div>
          </th>
          <th class="text-left">Số đăng ký</th>
          <th
            class="text-left"
            @click="sortBy('vehicle-owner')"
            style="cursor: pointer"
          >
            Chủ phương tiện
            <div
              v-if="currentSort === 'vehicle-owner'"
              style="display: inline-block"
            >
              <v-icon icon="mdi-chevron-down" v-if="isSortASC"></v-icon>
              <v-icon icon="mdi-chevron-up" v-else></v-icon>
            </div>
          </th>
          <th
            class="text-left"
            @click="sortBy('tonnage')"
            style="cursor: pointer"
          >
            Trọng tải
            <div v-if="currentSort === 'tonnage'" style="display: inline-block">
              <v-icon icon="mdi-chevron-down" v-if="isSortASC"></v-icon>
              <v-icon icon="mdi-chevron-up" v-else></v-icon>
            </div>
          </th>
          <th
            class="text-left"
            @click="sortBy('wattage')"
            style="cursor: pointer"
          >
            Công suất
            <div v-if="currentSort === 'wattage'" style="display: inline-block">
              <v-icon icon="mdi-chevron-down" v-if="isSortASC"></v-icon>
              <v-icon icon="mdi-chevron-up" v-else></v-icon>
            </div>
          </th>
          <th
            class="text-left"
            @click="sortBy('year-manufacture')"
            style="cursor: pointer"
          >
            Năm sản xuất
            <div
              v-if="currentSort === 'year-manufacture'"
              style="display: inline-block"
            >
              <v-icon icon="mdi-chevron-down" v-if="isSortASC"></v-icon>
              <v-icon icon="mdi-chevron-up" v-else></v-icon>
            </div>
          </th>
          <th class="text-left">Loại phương tiện</th>
          <th
            class="text-left"
            @click="sortBy('company')"
            style="cursor: pointer"
          >
            Công ty
            <div v-if="currentSort === 'company'" style="display: inline-block">
              <v-icon icon="mdi-chevron-down" v-if="isSortASC"></v-icon>
              <v-icon icon="mdi-chevron-up" v-else></v-icon>
            </div>
          </th>
          <th
            class="text-left"
            @click="sortBy('insurance-deadline')"
            style="cursor: pointer"
          >
            Hạn đăng kiểm
            <div
              v-if="currentSort === 'insurance-deadline'"
              style="display: inline-block"
            >
              <v-icon icon="mdi-chevron-down" v-if="isSortASC"></v-icon>
              <v-icon icon="mdi-chevron-up" v-else></v-icon>
            </div>
          </th>
        </tr>
      </thead>
      <tbody v-if="showVehicles.length > 0 && isReload">
        <tr
          v-for="(item, index) in showVehicles"
          :key="item['registration-number'] + index"
          @click="gotoDetail(item.id)"
          style="cursor: pointer"
        >
          <td>{{ item.name }}</td>
          <td>{{ item["registration-number"] }}</td>
          <td>{{ item["vehicle-owner"] }}</td>
          <td>{{ item.tonnage }}</td>
          <td>{{ item.wattage }}</td>
          <td>{{ item["year-manufacture"] }}</td>
          <td>{{ item.type }}</td>
          <td>{{ item.company }}</td>
          <td>{{ item["insurance-deadline"] }}</td>
        </tr>
      </tbody>
    </v-table>
    <div class="text-center" v-if="pages > 1">
      <v-pagination v-model="page" :length="pages - 1"></v-pagination>
    </div>
  </div>
</template>

<script lang="ts">
import { getInfo, getListVehicle, getUser } from "@/firebase";
import _ from "lodash";

export default {
  data() {
    return {
      vehicles: [] as any,
      showVehicles: [] as any,
      isReload: true,
      isLoading: true,
      isSortASC: true,
      currentSort: "",
      page: 1,
      pages: 1,
    };
  },
  created(): void {
    this.getVehicles();
  },
  watch: {
    page(newVal) {
      if (this.vehicles.length > 0) {
        this.isReload = false;
        this.isLoading = true;
        this.showVehicles = [...this.vehicles].slice(
          (newVal - 1) * 10,
          newVal * 10
        );
        setTimeout(() => {
          this.isReload = true;
          this.isLoading = false;
        }, 500);
      }
    },
  },

  methods: {
    sortBy(field: string) {
      this.isReload = false;
      this.isLoading = true;
      if (this.currentSort === field) {
        this.isSortASC = !this.isSortASC;
      } else {
        this.currentSort = field;
        this.isSortASC = true;
      }
      this.vehicles = _.orderBy(
        [...this.vehicles],
        [field],
        [this.isSortASC ? "asc" : "desc"]
      );
      if (this.vehicles.length > 0) {
        this.showVehicles = [...this.vehicles].slice(
          (this.page - 1) * 10,
          this.page * 10
        );
      }
      setTimeout(() => {
        this.isReload = true;
        this.isLoading = false;
      }, 500);
    },
    async getVehicles() {
      const getDatas: any = await getListVehicle();
      this.vehicles = [...getDatas];
      const listCompany: any = [];
      for (const vehicle of this.vehicles) {
        if (!listCompany.find((e: any) => e.id === vehicle.users_id)) {
          const company = await this.getCompany(vehicle.users_id);
          vehicle.company = company;
          listCompany.push({ id: vehicle.users_id, company: company });
        } else {
          vehicle.company = listCompany.find(
            (e) => e.id === vehicle.users_id
          ).company;
        }
      }
      this.sortBy("name");
      this.pages = this.vehicles.length / 10 + 1;
      if (this.vehicles.length > 0) {
        this.showVehicles = [...this.vehicles].slice(
          (this.page - 1) * 10,
          this.page * 10
        );
      }
      this.isLoading = false;
    },
    async getCompany(userId) {
      const user: any = await getUser(userId);
      if (user) {
        const company = user.infos_id ? await getInfo(user.infos_id) : "";
        return user.infos_id ? company.company : "";
      }
      return "";
    },
    gotoDetail(id) {
      this.$router.push("/vehicle/" + id);
    },
    createUser() {
      this.$router.push("/vehicle/register");
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
