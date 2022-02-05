<template>
<div class="">Latest Posts
  <b-container class="" style="max-width: 100%">
    <b-row class="" v-for="i in 1">
      <b-col v-for="i in 1" class="col-12 col-md-6 col-lg-4 col-xl-3">
        <post-card class="my-3"></post-card>
      </b-col>
    </b-row>
  </b-container>
</div>
</template>

<script>
export default {
  name: "index"
}
</script>

<style scoped>

</style>
