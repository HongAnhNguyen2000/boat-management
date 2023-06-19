<template>
      <div class="grey lighten-4 nft-page create-qr-page contentsWrapStyle" >
      <h3>Bussiness Form </h3>
      <div>
        <div class="mt-5">
            <operator-label
              :isEmphasis="true"
              textField="チェーン"
              :isRequired="true"
            />
            <v-select
              class="pa-0 mt-3"
              solo
            />
        </div>

        <v-row class="mt-3">
          <v-col cols="6"  class="pt-3">
            <h3>CollectionName</h3>
            <v-select
              class="pa-0 mt-1"
              item-text="collectionName"
              item-value="address"
              solo
            />
          </v-col>
          <v-col cols="6" class="pt-3">
            <h3>Username</h3>
           <v-text-field variant="outlined" placeholder="UserName"></v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="6" class="pt-0">
            <v-text-field variant="outlined" placeholder="UserName"></v-text-field>
          </v-col>
          <v-col cols="6" class="pt-0">
            <v-text-field variant="outlined" placeholder="UserName"></v-text-field>
          </v-col>
        </v-row>

        <v-btn
        block
        class="mb-8"
        color="black"
        size="large"
        variant="tonal"
      >
        Regis
      </v-btn>
      </div>
  </div>
</template>
<script lang="ts">
export default {

}
</script>

<style scoped>
 .contentsWrapStyle {
    margin: '2rem';
    padding: '40px 56px'
}
</style>

<style>
.create-qr-page .v-input__slot {
  min-height: 45px!important;
}
.create-qr-page .v-input__slot fieldset {
  background-color: white;
}
.create-qr-page .aboutdate .ma-0 {
  margin-top: 4px!important;
}
</style>