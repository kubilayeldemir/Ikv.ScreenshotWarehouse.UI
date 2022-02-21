<template>
  <div>
    <div v-if="lazy" v-lazy-container="{ selector: 'img' }">
      <img @click="e => e.target.classList.toggle('zoomed')" :data-src="post.fileUrl">
    </div>
    <div v-else>
      <img @click="e => e.target.classList.toggle('zoomed')" :src="post.fileUrl">
    </div>
    <b-container>
      <b-row>
        <b-col class="col-3 m-0 p-0">
          <NuxtLink :to="'/u/'+post.username" class="">{{ post.username }}</NuxtLink>
        </b-col>
        <b-col class="col-3"></b-col>
        <b-col class="col-6 text-right" title="">{{ dateAndTime }}</b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
export default {
  name: "ImageComponent",
  props: {
    post: {},
    lazy: false,
    dateOnly: "",
    dateAndTime: ""
  },
  created() {
    const monthNames = ['zero', 'Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık']
    let dateSplitWithT = this.post.screenshotDate.split('T')
    let yearMonthDate = dateSplitWithT[0].split('-')
    this.dateOnly = yearMonthDate[2] + " " + monthNames[parseInt(yearMonthDate[1], 10)] + " " + yearMonthDate[0]
    this.dateAndTime = this.dateOnly + " " + dateSplitWithT[1]
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
