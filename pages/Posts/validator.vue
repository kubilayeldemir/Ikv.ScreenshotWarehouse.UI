<template>
  <div>
    <div v-if="!isAuthorized"> Bu sayfayı görmeye yetkiniz yok.</div>
    <PagedPostsPage v-else :only-non-validated-posts="true"></PagedPostsPage>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: "validator",
  computed: {
    ...mapState([
      "user"]),
    isAuthorized: function () {
      if (this.user?.role){
        return !this.user?.role !== "user";
      }
      return false
    }
  },
}

</script>

<style scoped>

</style>
