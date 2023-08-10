<template>
  <div class="dark-mode ">
    <header-component></header-component>
    <Nuxt class="d-flex flex-column align-items-center"/>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

export default {
  name: "default",
  head() {
    return {
      title: "İstanbul Kıyamet Vakti SS Deposu - İKV",
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
  methods:{
    ...mapMutations(['loginUser'])
  },
  mounted() {
    const cookies = document.cookie.split(';');
    const desiredCookie = 'jwt';

    const cookieExists = cookies.some(cookie => {
      return cookie.trim().startsWith(`${desiredCookie}=`);
    });

    if (!cookieExists) {
      this.$store.commit('logoutUser')
    }
  }
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
.form-control {
  color: rgb(180, 175, 167);
  background-color: rgb(24, 26, 27);
  border-color: rgb(60, 65, 68);
}
.form-control:focus {
  color: rgb(180, 175, 167);
  background-color: rgb(24, 26, 27);
  border-color: rgb(6, 66, 132);
  outline-color: initial;
  box-shadow: rgb(8 97 192 / 25%) 0px 0px 0px 0.2rem;
}
.dropdown-menu {
  color: rgb(189, 154, 111);
  background-color: rgb(24, 26, 27);


  border-color: initial;
}
.dropdown-item{
  color: white;
}
.custom-file-label {
  color: rgb(180, 175, 167);
  background-color: rgb(24, 26, 27);
  border-color: rgb(60, 65, 68);
}
.custom-file-label::after{
  color: rgb(180, 175, 167);
  background-color: rgb(24, 26, 27);
  border-color: rgb(60, 65, 68);
}
.pagination > li > a
{
  background-color: black;
  color: #ffffff;
}
.pagination > li > a:hover
{
  background-color: #92a8d1;
}
.page-item.disabled .page-link {
  color: #ffffff;
  background-color: #000000;
  border-color: #dee2e6;
}

</style>
