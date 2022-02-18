<template>
  <div>
    <ImageComponent :lazy="true" v-for="(post,i) in posts" :key="post.id" :post="post"></ImageComponent>
    <b-button v-if="paging.currentPage < paging.pageCount" @click="loadNextPage" variant="success"> ></b-button>
  </div>
</template>

<script>
export default {
  name: "PagedPostsPage",
  data() {
    return {
      posts: {},
      paging: {
        pageCount: 0,
        currentPage: 0,
        pageSize: 0,
        rowCount: 0
      }
    }
  },
  props: {},
  async fetch() {
    let query = "/post/paged?"
    if (this.$route.query.page) {
      query = query + "CurrentPage=" + this.$route.query.page
    }

    query = this.addFilterParamsToQuery(query)

    var res = await this.$axios.$get(query);
    this.setResPagingDataToData(res)
    this.query = query
    this.posts = res.data
  },
  methods: {
    async loadNextPage() {
      let query = "/post/paged?"
      query = query + `CurrentPage=${this.paging.currentPage + 1}`

      query = this.addFilterParamsToQuery(query)
      var res = await this.$axios.$get(query);
      this.setResPagingDataToData(res)
      this.posts = this.posts.concat(res.data)
      this.addHashToLocation(this.paging.currentPage)
    },
    setResPagingDataToData(res) {
      this.paging.pageCount = res.pageCount
      this.paging.currentPage = res.currentPage
      this.paging.pageSize = res.pageSize
      this.paging.rowCount = res.rowCount
    },
    addHashToLocation(pageNumber) {
      history.pushState(
        {},
        null,
        this.$route.path + '?page=' + pageNumber
      )
    },
    addFilterParamsToQuery(query) {
      if (this.$route.params.username) {
        query = query + "&Username=" + this.$route.params.username
      }
      return query
    }
  }
}
</script>

<style scoped>
</style>
