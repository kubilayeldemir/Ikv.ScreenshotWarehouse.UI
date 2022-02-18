<template>
  <div>
    <ImageComponent :lazy="true" v-for="(post,i) in posts" :key="post.id" :post="post"></ImageComponent>
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
    var pageNumber = this.$route.query.page
    let query
    if (pageNumber) {
      query = `/post/paged?CurrentPage=${pageNumber}`
    } else {
      query = `/post/paged`
    }
    var res = await this.$axios.$get(query);
    this.setResPagingDataToData(res)
    this.posts = res.data
    console.log(query)
  },
  methods: {
    async loadNextPage() {
      var res = await this.$axios.$get(`/post/paged/?CurrentPage=${this.currentPage + 1}`);
      this.setResPagingDataToData(res)
      this.posts = this.posts.concat(res.data)
      this.addHashToLocation(this.currentPage)
    },
    setResPagingDataToData(res) {
      this.pageCount = res.pageCount
      this.currentPage = res.currentPage
      this.pageSize = res.pageSize
      this.rowCount = res.rowCount
    },
    addHashToLocation(pageNumber) {
      history.pushState(
        {},
        null,
        this.$route.path + '?page=' + pageNumber
      )
    }
  }
}
</script>

<style scoped>
</style>
