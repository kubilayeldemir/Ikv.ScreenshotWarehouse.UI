<template>
  <div class="bg-dark text-white" style="height: 100%; min-height: 100vh; min-width: 100vw">
    <no-ssr>
      <p v-if="this.user != null">Hoşgeldin {{ this.user.username }}</p>
    </no-ssr>
    <Nuxt/>
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

</style>


<style>

</style>
