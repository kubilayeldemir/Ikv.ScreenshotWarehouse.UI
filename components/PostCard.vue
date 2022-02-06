<template>
  <div class="border border-secondary">
    <img class="img" :src="post.fileUrl"/>
  </div>
</template>

<script>
export default {
  name: "PostCard",
  props: {
    post: {}
  }
}
</script>

<style scoped>
.img {
  height: 100%;
  width: 100%;
  max-height: 50vh;
  min-width: 320px;
  object-fit: cover;
}
</style>
