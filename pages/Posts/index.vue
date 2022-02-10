<template>
  <div>
    <no-client>
      <LightGallery :images="postsNew" :index="index" @close="index = null"></LightGallery>
      <Stack :monitor-images-loaded="true" :column-min-width="320" :gutter-width="4" :gutter-height="4">
        <StackItem v-for="(post,i) in posts" :key="i">
          <post-card :post="post" @click.native="index=i"></post-card>
          <div class="w-100 p-0" style="background-color: red"><small class="float-left">{{post.username}}</small> <small class="float-right">{{post.screenshotDate}}</small> </div>
        </StackItem>
      </Stack>
    </no-client>
  </div>
</template>

<script>

import {getCookie} from "@/utils/api";

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
  async mounted() {
    if (process.browser) {
      try {
        const res = await this.$axios.$get('/post/all',
          {
            headers: {
              Authorization: 'Bearer ' + getCookie("jwt")
            }
          });
        this.posts = res
        this.postsNew = res.map(x => ({url: x.fileUrl, title: "no-title", h: "1200"}))
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
