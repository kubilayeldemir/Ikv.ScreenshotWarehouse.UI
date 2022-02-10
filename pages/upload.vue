<template>
  <div>
    <client-only>
      <b-form-file
        accept=".jpg, .png"
        v-model="files"
        multiple
        placeholder="Choose a file or drop it here..."
        drop-placeholder="Drop file here..."
      ></b-form-file>
      <div class="mt-3">Selected file: {{ files[0] ? files[0].name : '' }}</div>
    </client-only>

    <b-form-file accept=".jpg, .png" v-model="file2" class="mt-3"></b-form-file>
    <div class="mt-3">Selected file: {{ file2 ? file2.name : '' }}</div>
    <button @click="this.printBase64">Single Save</button>
    <button @click="this.postBulk">Bulk Save</button>

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
      responseData: []
    }
  },
  methods: {
    async postBulk() {
      var requestBody = []
      for (const x of this.files) {
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
