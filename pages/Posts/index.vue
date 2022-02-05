<template>
  <div>
    <div class="p-5">
      <Stack :monitor-images-loaded="true" :column-min-width="320" :gutter-width="4" :gutter-height="4">
        <StackItem v-for="(post,i) in posts" :key="i">
          <post-card :post="post"></post-card>
        </StackItem>
      </Stack>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "index",
  data() {
    return {
      posts: []
    }
  },
  async created() {
    try {
      const res = await axios.get('https://localhost:5001/api/v1/post/all');
      this.posts = res.data
    } catch (e) {
      console.log(e)
    }
  }
}
</script>

<style scoped>

</style>
