<template>
  <div v-lazy-container="{ selector: 'img' }">
    <div v-for="(post,i) in posts" :key="post.id">
      <img @click="e => e.target.classList.toggle('zoomed')" :data-src="post.fileUrl">
    </div>
    <b-button v-if="currentPage < pageCount" @click="loadNextPage" variant="success"> ></b-button>
  </div>
</template>

<script>
export default {
  name: "index",
  data() {
    return {
      posts: {},
      pageCount: 0,
      currentPage: 0,
      pageSize: 0,
      rowCount: 0
    }
  },
  async fetch() {
    var res = await this.$axios.$get("/post/paged");
    this.setResPagingDataToData(res)
    this.posts = res.data
  },
  methods: {
    async loadNextPage() {
      var res = await this.$axios.$get(`/post/paged/?CurrentPage=${this.currentPage + 1}`);
      this.setResPagingDataToData(res)
      this.posts = this.posts.concat(res.data)
    },
    setResPagingDataToData(res) {
      this.pageCount = res.pageCount
      this.currentPage = res.currentPage
      this.pageSize = res.pageSize
      this.rowCount = res.rowCount
    }
  }
}
</script>

<style scoped>
img {
  max-width: 60vw;
}
.zoomed{
  max-width: 90vw !important;
  max-height: 95vw !important;
}
</style>
