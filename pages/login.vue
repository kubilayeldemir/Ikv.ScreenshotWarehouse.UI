<template>
  <b-container>
    <client-only>
      <div v-if="!user" class="row col-10 col-lg-6 ml-3 pt-3">
        <p>İkv Ss deposuna giriş yapmak için lütfen aşağıdaki alanları doldur.</p>
        <hr/>
        <b-form @submit="login" v-if="show" class="mt-3">

          <b-form-group
            id="input-group-1"
            label="Kullanıcı Adın:"
            label-for="input-1"
            description=""
          >
            <b-form-input
              id="input-1"
              v-model="form.username"
              type="text"
              placeholder="Kullanıcı adı"
              required
            ></b-form-input>
          </b-form-group>

          <b-form-group id="input-group-2" label="Şifren:" label-for="input-2">
            <b-form-input
              type="password"
              id="input-2"
              v-model="form.password"
              placeholder="sifre"
              required
            ></b-form-input>
          </b-form-group>

          <b-button type="submit" variant="primary">Giriş yap</b-button>

        </b-form>
        <!--              <b-card class="mt-3" header="Kontrol tahtasdı">-->
        <!--                <pre class="m-0">{{ form }}</pre>-->
        <!--              </b-card>-->
      </div>
      <div v-if="!user" class="row col-10 col-lg-6 ml-3 pt-3">
        <nuxt-link to="/register">
          <b-button type="reset" variant="danger">Üye olma sayfasına git</b-button>
        </nuxt-link>
      </div>
      <div v-else>Zaten giriş yapmışsınız. Bir sorun yaşıyor iseniz oturumu kapatıp tekrar açın.</div>
      <div>
        <b-modal ref="my-modal" hide-footer title="Giriş başarılı!">
          <div class="d-block text-center">
            <h2>Başarılı şekilde giriş yaptın!</h2>
          </div>
          <b-button class="mt-3" variant="outline-danger" block @click="hideSuccessModal">Kapat</b-button>
        </b-modal>
        <b-modal ref="error-modal" hide-footer title="Giriş başarısız!">
          <div class="d-block text-center">
            <h2>Kullanıcı adı veya şifren yanlış!</h2>
            <br>
            <code>{{ this.errorText }}</code>
          </div>
          <b-button class="mt-3" variant="outline-danger" block @click="hideErrorModal">Kapat</b-button>
        </b-modal>
      </div>
    </client-only>
  </b-container>
</template>

<script>
import {api} from "@/utils/api";
import {mapState, mapMutations} from 'vuex';

export default {
  name: "login",
  data() {
    return {
      form: {
        username: '',
        password: '',
      },
      show: true,
      errorText: ''
    }
  },
  computed: {
    ...mapState([
      'user'
    ])
  },
  methods: {
    ...mapMutations(['loginUser']),
    async login(event) {
      event.preventDefault()
      try {
        const res = await api.post('/user/login', this.form);
        if (res.status == 200) {
          let d = new Date();
          d.setTime(d.getTime() + 1 * 24 * 60 * 60 * 1000);
          let expires = "expires=" + d.toUTCString();
          document.cookie =
            "jwt=" + res.data.jwt + ";" + expires + ";path=/";
          this.$store.commit('loginUser', res.data.user)
          // this.showSuccessModal()
          this.$router.push('/')
        } else {
          this.showErrorModal()
        }
      } catch (err) {
        console.log(err)
        this.showErrorModal()
        this.errorText = err.response?.data?.errors
      }
    },
    showSuccessModal() {
      this.$refs['my-modal'].show()
    },
    hideSuccessModal() {
      this.$refs['my-modal'].hide()
    },
    showErrorModal() {
      this.$refs['error-modal'].show()
    },
    hideErrorModal() {
      this.$refs['error-modal'].hide()
    }
  }
}
</script>

<style scoped>

</style>
