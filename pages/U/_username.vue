<template>
  <div>
    <h1>{{ this.$route.params.username }} kullanıcısının resimlerine bakıyorsunuz.</h1>
    <PagedPostsPage :server-searchbar-toggle="true" :category="null"
                    class="d-flex flex-column align-items-center"></PagedPostsPage>
  </div>
</template>

<script>
export default {
  name: "UserPage",
  data() {
    return {}
  },

  methods: {}
}
</script>

<style scoped>

</style>
