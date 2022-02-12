<template>
  <div class="container">
    <div class="col-12 col-lg-8">
      <p>Bu sayfa ile yüklemek istediğin görüntüleri çoklu olarak yükleyebilirsin</p>
      <p>PNG veya JPG formatındaki dosyalar desteklenmektedir</p>
      <p>İkv ekran görüntülerin isimlerinden ne zaman çekildiği tarihi elde edilmektedir.
        Bu sayede ekran görüntülerini tarihlerine göre arayabileceksiniz.</p>

      <client-only>
        <b-form-file
          accept=".jpg, .png, .jpeg"
          v-model="files"
          multiple
          placeholder="Dosyaları seçin veya buraya sürükleyin"
          drop-placeholder="Dosyayı tam buraya bırak..."
        ></b-form-file>
      </client-only>

      <div class="mt-3">Seçilen dosya sayısı: {{ files.length }}</div>

      <b-button class="mt-1" :disabled="saveButtonCondition" variant="success"
                @click="this.postBulkSavePartitioned">Dosyaları Yükle
      </b-button>
    </div>
  </div>
</template>

<script>
import {getAxiosConfigWithJwt} from "~/utils/api";

export default {
  name: "upload",
  data() {
    return {
      files: [],
      file2: [],
      requestData: [],
      responseData: [],
      buttonDisabled: false
    }
  },
  computed: {
    saveButtonCondition: function () {
      if (!this.buttonDisabled){
        return this.files.length < 1
      }
      return true
    }
  },
  methods: {
    async postBulkSavePartitioned() {
      const partitionCount = 5
      this.buttonDisabled = true
      await new Promise(r => setTimeout(r, 2000));

      if (this.files.length < partitionCount) {
        await this.postBulkSave(this.files);
      } else {
        for (let i = 0; i < this.files.length; i += partitionCount) {
          let partitonedPosts = this.files.slice(i, i + partitionCount)
          await this.postBulkSave(partitonedPosts);
        }
      }
      this.files = []
      this.buttonDisabled = false
    },
    async postBulkSave(files) {
      var requestBody = []
      for (const x of files) {
        var base64Value = await this.toBase64(x)
        requestBody.push({
          fileName: x.name,
          fileBase64: base64Value
        })
      }
      this.requestData = requestBody
      try {
        const res = await this.$axios.post('/post/bulk', requestBody, getAxiosConfigWithJwt());
        this.responseData = res

      } catch (e) {
        console.log(e)
      }
    },
    toBase64(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
      });
    },
    async printBase64() {
      var x = await this.toBase64(this.file2);
      console.log(x)
    }
  }
}
</script>

<style scoped>

</style>
