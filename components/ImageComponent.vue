<template>
  <div>
    <div v-if="lazy" v-lazy-container="{ selector: 'img' }">
      <img @click="e => e.target.classList.toggle('zoomed')" :data-src="post.fileUrl">
    </div>
    <div v-else>
      <img @click="e => e.target.classList.toggle('zoomed')" :src="post.fileUrl">
    </div>
  </div>
</template>

<script>
export default {
  name: "ImageComponent",
  props: {
    post: {},
    lazy: false
  }
}
</script>

<style scoped>
img {
  max-width: 60vw;
  max-height: 75vh;

}

.zoomed {
  max-width: 90vw !important;
  max-height: 95vh !important;
}
</style>
