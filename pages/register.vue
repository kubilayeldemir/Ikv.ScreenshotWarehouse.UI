<template>
  <b-container>
    <client-only>
      <div v-if="!user" class="row col-10 col-lg-6 ml-3 pt-3">
        İkv Ss deposuna üye olmak için lütfen aşağıdaki alanları doldur.
        <hr/>
        <b-form @submit="register" @reset="onReset" v-if="show" class="mt-3">
          <b-form-group
            id="input-group-1"
            label="Email Adresi:"
            label-for="input-1"
            description="Mail adresin sadece şifreni unutursan kullanılacak."
          >
            <b-form-input
              id="input-1"
              v-model="form.email"
              type="email"
              placeholder="Email adresin"
              required
            ></b-form-input>
          </b-form-group>

          <b-form-group
            id="input-group-3"
            label="Kullanıcı Adın:"
            label-for="input-3"
            description=""
          >
            <b-form-input
              id="input-3"
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
              placeholder="Şifre 4 karakterden az olamaz"
              required
            ></b-form-input>
          </b-form-group>

          <b-button type="submit" variant="primary">Üye ol</b-button>
          <b-button type="reset" variant="danger">Temizle</b-button>
        </b-form>
        <!--      <b-card class="mt-3" header="Kontrol tahtasdı">-->
        <!--        <pre class="m-0">{{ form }}</pre>-->
        <!--      </b-card>-->
      </div>
      <div>
        <b-modal ref="my-modal" hide-footer title="Üye oldun!">
          <div class="d-block text-center">
            <h2>Başarılı şekilde üye oldun {{ this.form.username }}!</h2>
          </div>
          <b-button class="mt-3" variant="outline-danger" block @click="hideSuccessModal">Kapat</b-button>
        </b-modal>
        <b-modal ref="error-modal" hide-footer title="Üye olma başarısız!">
          <div class="d-block text-center">
            <h2>Üye olurken bir hata oluştu!</h2>
            <br>
            <code>{{ this.errorText }}</code>
          </div>
          <b-button class="mt-3" variant="outline-danger" block @click="hideErrorModal">Kapat</b-button>
        </b-modal>
      </div>
      <div v-if="!user" class="row col-10 col-lg-6 ml-3 pt-3">
        <nuxt-link to="/login">
          <b-button variant="info">Giriş yapma sayfasına git</b-button>
        </nuxt-link>
      </div>
      <div v-else>Zaten giriş yapmışsınız. Bir sorun yaşıyor iseniz oturumu kapatıp tekrar açın.</div>
    </client-only>
  </b-container>
</template>

<script>
import {api} from "@/utils/api";
import {mapState} from 'vuex';


export default {
  name: "login",
  data() {
    return {
      form: {
        email: '',
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
    async register(event) {
      event.preventDefault()
      try {
        const res = await api.post('/user/register', this.form);
        if (res.status == 200) {
          this.showSuccessModal()
        } else {
          this.showErrorModal()
        }
      } catch (err) {
        console.log(err)
        this.showErrorModal()
        this.errorText = err.response.data.errors

      }
    },
    onReset(event) {
      event.preventDefault()
      this.form.email = ''
      this.form.password = ''
      this.form.username = ''
      this.show = false
      this.errorText = ''
      this.$nextTick(() => {
        this.show = true
      })
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
    },
  }
}
</script>

<style scoped>
hr {
  margin-top: 1rem;
  margin-bottom: 1rem;
  border: 0;
  border-top: 1px solid rgb(100, 201, 201);
}
</style>
