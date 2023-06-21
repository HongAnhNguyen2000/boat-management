<template>
  <v-dialog v-model="display" class="mt-3">
    <template v-slot:activator="{ on }">
      <v-text-field
      class="mt-2"
        v-on="on"
        hide-details="auto"
        readonly
        outlined
        clearable
      >
        <template v-slot:progress>
          <slot name="progress">
            <v-progress-linear color="primary" indeterminate absolute height="2"></v-progress-linear>
          </slot>
        </template>
      </v-text-field>
    </template>

    <v-card>
      <v-card-text class="px-0 py-0">
        <v-tabs fixed-tabs>
          <v-tab key="calendar">
            <slot name="dateIcon">
              <span style="font-size: 24px">日付</span>
            </slot>
          </v-tab>
          <v-tab key="timer">
            <slot name="timeIcon">
              <span style="font-size: 24px">時刻</span>
            </slot>
          </v-tab>
          <v-tab-item key="calendar">
            <v-time-picker
              ref="timer"
              class="v-time-picker-custom"
              full-width
              use-seconds
              format="24hr"

            />
          </v-tab-item>
        </v-tabs>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <slot name="actions" :parent="this">
          <v-btn color="grey lighten-1" text >clear</v-btn>
          <v-btn color="green darken-1" text>ok</v-btn>
        </slot>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>



<script lang="ts">
  export default {
    data: () => ({
      display: false
    }),

  }
</script>




<style>
.v-date-picker-table--date td {
  padding: 0 !important;
}
</style>