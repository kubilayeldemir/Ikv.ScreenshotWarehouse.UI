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

import {api} from "@/utils/api";

export default {
  name: "index",
  data() {
    return {
      posts: []
    }
  },
  async created() {
    try {
      const res = await api.get('/post/all');
      this.posts = res.data
    } catch (e) {
      console.log(e)
    }
  }
}
</script>

<style scoped>

</style>
