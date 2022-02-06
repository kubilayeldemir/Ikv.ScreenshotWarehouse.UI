<template>
  <div>
    <no-ssr>
      <LightGallery :images="postsNew" :index="index" @close="index = null"></LightGallery>
      <Stack :monitor-images-loaded="true" :column-min-width="320" :gutter-width="4" :gutter-height="4">
        <StackItem v-for="(post,i) in posts" :key="i">
          <post-card :post="post" @click.native="index=i"></post-card>
          <div class="w-100 p-0" style="background-color: red"><small class="float-left">{{post.username}}</small> <small class="float-right">{{post.screenshotDate}}</small> </div>
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
        this.postsNew = res.data.map(x => ({url: x.fileUrl, title: "asdasd", h: "1200"}))
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>

<style scoped>

</style>
<style>
.light-gallery__text{
  display: none !important;
  padding: 0px !important;
  width: 30% !important;
  font-size: 1em !important;
}
</style>
