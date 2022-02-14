<template>
  <div class="dark-mode ">
    <header-component></header-component>
    <Nuxt class="d-flex flex-column align-items-center"/>
  </div>
</template>

<script>
import {mapState} from "vuex";

export default {
  name: "default",
  head() {
    return {
      title: "İstanbul Kıyamet Vakti SS Deposu",
      meta: [
        {
          hid: "İkv SS Deposu",
          name: "İkv SS Deposu",
          content: "İstanbul Kıyamet Vakti oyununun instagramı"
        }
      ]
    }
  },
  computed: {
    ...mapState([
      "user"])
  },
}
</script>

<style scoped>
.dark-mode {
  background-color: #202124;
  height: auto;
  overflow: hidden;
  min-height: 100vh;
  color: white;
}
</style>


<style>

</style>
