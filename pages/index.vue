<template>
  <div>
    <div style="display:none;">İstanbul Kıyamet Vakti oyunun ekran görüntülerini bulabileceğiz ve ekran görüntülerinizi
      yükleyebileceğiniz bir paylaşım sitesi.. İKV Fan Sitesi
    </div>

    <b-row class="mt-3">
      <div class="col-12 col-lg-4">
        <NuxtLink to="/posts" class="link-text">
          <b-row class="pb-3">
            <div class="col-12"><img
              src="https://res.cloudinary.com/dmo4hvhcj/image/upload/v1651842135/web/client_psdida.jpg"/>
            </div>
          </b-row>
          Ekran görüntülerine bakmak için tıkla
        </NuxtLink>
      </div>
      <div class="col-0 col-lg-4"></div>
      <div class="col-12 col-lg-4 mt-5 mt-lg-0">
        <NuxtLink to="/posts/forum" class="link-text">
          <b-row class="pb-3">
            <div class="col-12"><img
              src="https://res.cloudinary.com/dmo4hvhcj/image/upload/v1651843521/web/ikvv_vdikxr.jpg"/>
            </div>
          </b-row>
          Forum Arşivine Bakmak İçin Tıkla
        </NuxtLink>
      </div>
    </b-row>

    <div class="pb-3 mt-3">
      İkv Forumdaki yüklediğin fotoğrafları görmek ister misin?
      Aşağıya ikv forum kullanıcı adını yaz!
      <b-form-input
        id="input-1"
        v-model="searchByUsername"
        type="text"
        placeholder="İkv Forumdaki Kullanıcı adı: Ör: Nerull"
        required
      ></b-form-input>
      <b-button class="mt-1" :disabled="!searchByUsername" variant="success"
                @click="this.routeToUserPage">Ara
      </b-button>
    </div>
  </div>

</template>

<script>
export default {
  name: 'IndexPage',
  data() {
    return {
      searchByUsername: ""
    }
  },
  methods: {
    routeToUserPage() {
      this.$router.push("/u/" + this.searchByUsername)
    }
  },
  meta: [
    {
      hid: "İkv SS Deposu",
      name: "İkv SS Deposu",
      content: "İstanbul Kıyamet Vakti oyununun ekran görüntülerini bulabileceğiniz ve yükleyebileceğiniz bir paylaşım sitesi."
    }
  ],
}
</script>

<style scoped>
.link-text{
  color: white;text-decoration: none;font-family:'Courier New';
}
</style>
