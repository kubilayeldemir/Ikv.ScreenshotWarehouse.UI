<template>
  <div>
    <no-ssr>
      <LightGallery :images="postsNew" :index="index" @close="index = null"></LightGallery>
      <Stack :monitor-images-loaded="true" :column-min-width="320" :gutter-width="4" :gutter-height="4">
        <StackItem v-for="(post,i) in posts" :key="i" @click.native="index=i">
          <post-card :post="post"></post-card>
        </StackItem>
      </Stack>
    </no-ssr>
  </div>
</template>

<script>

import {api} from "@/utils/api";

export default {
  name: "index",
  methods: {
  },
  data() {
    return {
      posts: [],
      postsNew: [],
      index: null
    }
  },
  async created() {
    if (process.browser) {
      try {
        const res = await api.get('/post/all');
        this.posts = res.data
        this.postsNew = res.data.map(x => ({url: x.fileUrl, title: "asdasd", h: "768"}))
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>

<style scoped>

</style>
