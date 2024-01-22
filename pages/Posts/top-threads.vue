<template>
  <div>
    <div class="container mt-4">
      <table class="table table-bordered ">
        <thead>
        <tr class="text">
          <th>Resim Sayısı</th>
          <th>Konu Başlığı</th>
          <th>Başlangıç Tarihi</th>
          <th>Bitiş Tarihi</th>
        </tr>
        </thead>
        <tbody>

        <tr v-for="(post,i) in posts" :key="i" class="text">
          <td>{{ post.c }}</td>
          <td style="color: #94cdcd;">
            <NuxtLink :to="'/posts/'+post.m" class="text-decoration-none text-white font-weight-bold clickable-text">
              {{ post.t }}
            </NuxtLink>
          </td>
          <td>{{ post.n }}</td>
          <td>{{ post.x }}</td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>

</template>

<script>
export default {
  name: "top-threads",
  data() {
    return {
      posts: {},
    }
  },

  async fetch() {
    let query = "/post/top-threads"
    var res = await this.$axios.$get(query);
    this.posts = res
  },
}
</script>

<style scoped>

.text {
  color: white;
  text-decoration: none;
  font-family: 'Courier New';
}

.clickable-text {
  cursor: pointer;
  color: #94cdcd;
  font-weight: bold;
}

.clickable-text:hover {
  color: #acacce;
}

a:hover {
  color: #6161ea; /* Change color on hover */
}

</style>
