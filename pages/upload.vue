<template>
  <div class="container">
    <div class="col-12 col-lg-8">
      <p>Bu sayfa ile yüklemek istediğin görüntüleri çoklu olarak yükleyebilirsin</p>
      <p>PNG veya JPG formatındaki dosyalar desteklenmektedir</p>
      <p>İkv ekran görüntülerin isimlerinden ne zaman çekildiği tarihi elde edilmektedir.
        Bu sayede ekran görüntülerini tarihlerine göre arayabileceksiniz.</p>
      <div v-if="!isUploading">
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

      <div v-else>
        <p v-if="!isUploaded">Dosyalar yükleniyor...{{ progressBarValue.toFixed(0) }}/100</p>
        <p v-else>Dosyalar yüklendi!</p>
        <b-progress class="mt-2" :value="progressBarValue" variant="success" striped
                    :animated="!isUploaded"></b-progress>
        <b-textarea v-if="isUploaded" v-model="responseData" size="sm"></b-textarea>
      </div>
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
      buttonDisabled: false,
      isUploading: false,
      progressBarEnable: false,
      progressBarAnimate: true,
      progressBarValue: 0,
      isUploaded: false
    }
  },
  computed: {
    saveButtonCondition: function () {
      if (!this.buttonDisabled) {
        return this.files.length < 1
      }
      return true
    }
  },
  methods: {
    async postBulkSavePartitioned() {
      this.isUploading = true
      const partitionCount = 5
      this.buttonDisabled = true
      if (this.files.length < partitionCount) {
        await this.postBulkSave(this.files);
        // await new Promise(r => setTimeout(r, 2000));
        this.progressBarValue = 100
      } else {
        for (let i = 0; i < this.files.length; i += partitionCount) {
          let partitonedPosts = this.files.slice(i, i + partitionCount)
          await this.postBulkSave(partitonedPosts);
          // await new Promise(r => setTimeout(r, 2000));
          this.progressBarValue = (i + partitionCount) / this.files.length * 100
        }
      }
      this.files = []
      this.progressBarAnimate = false
      this.isUploaded = true
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
        console.log(res)
        this.responseData = this.responseData.concat(res.data)

      } catch (e) {
        console.log(e)
      }
    },
    async toBase64(file) {
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
