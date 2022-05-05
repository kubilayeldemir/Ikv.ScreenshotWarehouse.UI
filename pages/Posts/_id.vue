<template>
  <div class="container" ref="scrollToMe">
    <ImageComponent v-if="!isRawDataRequired" :post="this.post" :use-raw-data="!post.fileUrl"
                    :category="post.category"></ImageComponent>
    <p>Yükleyenin Kullanıcı adı: {{ post.username }}</p>
    <p>Ekran Görüntüsü Tarihi: {{ post.screenshotDate }}</p>
    <p>Sunucu: {{ post.gameServer }}</p>
    <p>Başlık: {{ post.title }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      post: {},
      isRawDataRequired: true,
      flag: false
    }
  },
  name: "PostId",
  async fetch() {
    this.post = await this.$axios.$get(`/post/${this.$route.params.id}`);
    if (this.post.fileUrl) {
      this.isRawDataRequired = false
    }
    if (this.isRawDataRequired) {
      this.post = await this.$axios.$get(`/post/raw/${this.$route.params.id}`);
      this.isRawDataRequired = false
    }
  },
  mounted() {
    if (process.browser) {
      const el = this.$refs.scrollToMe;
      if (el) {
        // Use el.scrollIntoView() to instantly scroll to the element
        el.scrollIntoView({behavior: 'smooth'});
      }
    }
  }
}
</script>

<style scoped>

</style>
