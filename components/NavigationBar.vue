<template>
  <div style="border-style: groove hidden ridge; border-color: grey">
    <b-navbar toggleable="lg" type="dark" variant="dark">
      <!--      background-color: #4a4d4f-->
      <b-navbar-brand href="#">
        <nuxt-link to="/">Anasayfa</nuxt-link>
      </b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item href="/posts">Resimler</b-nav-item>
          <b-nav-item href="/upload">Resim Yükle</b-nav-item>
          <b-nav-item href="#" disabled>Resimlerim</b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-form>
            asd
          </b-nav-form>

          <b-nav-item-dropdown text="Lang" right>
            <b-dropdown-item href="#">EN</b-dropdown-item>
            <b-dropdown-item href="#">ES</b-dropdown-item>
            <b-dropdown-item href="#">RU</b-dropdown-item>
            <b-dropdown-item href="#">FA</b-dropdown-item>
          </b-nav-item-dropdown>
          <client-only>
            <b-nav-item-dropdown v-if="user" right>
              <!-- Using 'button-content' slot -->
              <template #button-content>
                <em>{{ user.username }}</em>
              </template>
              <b-dropdown-item href="#">Profilim</b-dropdown-item>
              <b-dropdown-item href="#">Oturumu Kapat</b-dropdown-item>
            </b-nav-item-dropdown>
          </client-only>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
import {mapState} from "vuex";

export default {
  name: "NavigationBar",
  computed: {
    ...mapState([
      "user"])
  }
}
</script>

<style scoped>
a {
  color: inherit; /* blue colors for links too */
  text-decoration: inherit; /* no underline */
}
</style>
