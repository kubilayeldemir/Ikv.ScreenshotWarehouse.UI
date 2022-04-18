<template>
  <div class="container" ref="scrollToMe">
    <ImageComponent :post="this.post"></ImageComponent>
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
      post: {}
    }
  },
  name: "PostId",
  async fetch() {
    this.post = await this.$axios.$get(`/post/${this.$route.params.id}`);
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
