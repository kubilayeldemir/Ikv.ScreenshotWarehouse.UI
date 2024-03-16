<template>
  <div style="border-style: groove hidden ridge; border-color: grey;">
    <b-navbar toggleable="lg" type="dark" variant="dark">
      <b-navbar-brand>
        <nuxt-link class="nuxtlink" to="/">Anasayfa</nuxt-link>
      </b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class="links">
          <NuxtLink class="nuxtlink nav-link" to="/posts">Resimler</NuxtLink>
          <NuxtLink class="nuxtlink nav-link" to="/posts/forum">Forum Arşivi</NuxtLink>
          <NuxtLink class="nuxtlink nav-link" to="/posts/random">Rastgele</NuxtLink>
          <NuxtLink class="nuxtlink nav-link" to="/posts/top-threads">Başlıklar</NuxtLink>
          <NuxtLink class="nuxtlink nav-link" to="/upload">Resim Yükle</NuxtLink>
          <NuxtLink class="nuxtlink nav-link" to="/download">İndir</NuxtLink>
        </b-navbar-nav>
        <b-navbar-nav class="ml-auto">
          <b-nav-form>
          </b-nav-form>
          <client-only>
            <b-nav-item-dropdown v-if="user" right>
              <template #button-content>
                <em>{{ user.username }}</em>
              </template>
              <b-dropdown-item>Profilim</b-dropdown-item>
              <b-dropdown-item @click="logoutUser">Oturumu Kapat</b-dropdown-item>
            </b-nav-item-dropdown>
            <b-navbar-nav v-else right>
              <b-nav-item @click="routeTologin">Giriş yap</b-nav-item>
              <b-nav-item @click="routeToRegister">Üye ol</b-nav-item>
            </b-navbar-nav>
          </client-only>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
import {mapState, mapMutations} from 'vuex';

export default {
  name: "NavigationBar",
  computed: {
    ...mapState(["user"])
  },
  methods: {
    ...mapMutations(['logoutUser']),
    routeTologin() {
      this.$router.push("/login")
    },
    routeToRegister() {
      this.$router.push("/register")
    },
    routeToPosts() {
      this.$router.push("/posts")
    },
    routeToForum() {
      this.$router.push("/posts/forum")
    },
    routeToRandom() {
      this.$router.push("/posts/random")
    },
    routeToUpload() {
      this.$router.push("/upload")
    },
    routeToTopThreads() {
      this.$router.push("/posts/top-threads")
    },
    routeToDownloads() {
      this.$router.push("/download")
    },
  }
}
</script>

<style scoped>
.nuxtlink {
  color: inherit; /* blue colors for links too */
  text-decoration: inherit; /* no underline */
}
</style>
