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
            v-model="selectedFiles"
            multiple
            placeholder="Dosyaları seçin veya buraya sürükleyin"
            drop-placeholder="Dosyayı tam buraya bırak..."
          ></b-form-file>
        </client-only>

        <div class="mt-3">Seçilen dosya sayısı: {{ selectedFiles.length }}</div>

        <b-button class="mt-1" :disabled="saveButtonCondition" variant="success"
                  @click="this.postBulkSavePartitioned">Dosyaları Yükle
        </b-button>
      </div>

      <div v-else>
        <p v-if="!isUploaded">Dosyalar yükleniyor...{{ progressBarValue.toFixed(0) }}/100</p>
        <p v-else>Dosyalar yüklendi!</p>
        <b-progress class="mt-2" :value="progressBarValue" variant="success" striped
                    :animated="!isUploaded"></b-progress>
        <b-textarea v-if="isUploaded" v-model="responseData.toString()" size="sm"></b-textarea>
      </div>
      <div v-if="isUploaded">
        <b-icon icon="exclamation-circle-fill" variant="success"></b-icon>
        Başarıyla yüklenen dosya sayısı: {{ successfulPostSaveCount }}
        <br>
        <b-icon icon="exclamation-circle-fill" variant="danger"></b-icon>
        Dosya boyutunun büyük olması sebebiyle kaydedilmeyen dosya sayısı: {{ fileSizeNotValidPosts.length }}
        <b-icon title="Her dosya en fazla 1 MB boyutunda olabilir" icon="question-circle-fill"
                variant="warning"></b-icon>
        <br>
        <b-icon icon="exclamation-circle-fill" variant="danger"></b-icon>
        Yüklemesi başarısız olan dosya sayısı: {{ unsuccessfulPostSaveCount }}
        <b-icon :title="returnUnSuccessfullSaveErrors()" icon="question-circle-fill"
                variant="warning"></b-icon>
      </div>
    </div>
  </div>
</template>

<script>
import {getAxiosConfigWithJwt} from "~/utils/api";
import {BIcon, BIconExclamationCircleFill, BIconQuestionCircleFill} from 'bootstrap-vue'

export default {
  name: "upload",
  data() {
    return {
      selectedFiles: [],
      fileSizeNotValidPosts: [],
      filesToUpload: [],
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
        return this.selectedFiles.length < 1
      }
      return true
    },
    successfulPostSaveCount: function () {
      if (!this.isUploaded) {
        return 0
      }
      return this.responseData.filter(x => x.isOk === true).length
    },
    unsuccessfulPostSaveCount: function () {
      if (!this.isUploaded) {
        return 0
      }
      return this.responseData.filter(x => x.isOk === false).length
    }
  },
  methods: {
    async postBulkSavePartitioned() {
      this.validatePosts()
      this.isUploading = true
      const partitionCount = 5
      this.buttonDisabled = true
      if (this.filesToUpload.length < partitionCount) {
        await this.postBulkSave(this.filesToUpload);
        // await new Promise(r => setTimeout(r, 2000));
        this.progressBarValue = 100
      } else {
        for (let i = 0; i < this.filesToUpload.length; i += partitionCount) {
          let partitonedPosts = this.filesToUpload.slice(i, i + partitionCount)
          await this.postBulkSave(partitonedPosts);
          // await new Promise(r => setTimeout(r, 2000));
          this.progressBarValue = (i + partitionCount) / this.selectedFiles.length * 100
        }
      }
      this.selectedFiles = []
      this.filesToUpload = []
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
      try {
        const res = await this.$axios.post('/post/bulk', requestBody, getAxiosConfigWithJwt());
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
    validatePosts() {
      let validatedPosts = []
      validatedPosts = validatedPosts.concat(this.filterPostsByFileSize(this.selectedFiles))
      this.filesToUpload = validatedPosts;
    },
    filterPostsByFileSize(files) {
      const maxFileSize = 1000 * 1000
      this.fileSizeNotValidPosts = files.filter(x => x.size >= maxFileSize)
      return files.filter(x => x.size < maxFileSize);
    },
    returnUnSuccessfullSaveErrors() {
      let notOkPosts = this.responseData.filter(x => x.isOk === false)
      return notOkPosts.map(x => x.error).join('-')
    }
  },
  components: {
    BIcon,
    BIconExclamationCircleFill,
    BIconQuestionCircleFill
  }
}
</script>

<style scoped>

</style>
