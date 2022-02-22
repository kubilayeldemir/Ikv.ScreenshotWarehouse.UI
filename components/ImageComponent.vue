<template>
  <div>
    <div v-if="lazy" v-lazy-container="{ selector: 'img' }">
      <img :data-src="post.fileUrl">
    </div>
    <div v-else>
      <img :src="post.fileUrl">
    </div>
    <div class="m-0 p-0 row">
      <div class="col-3 m-0 p-0">
        <NuxtLink :to="'/u/'+post.username" class="">{{ post.username }}</NuxtLink>
      </div>
      <b-col class="col-9 text-right m-0 p-0" style="white-space:pre-wrap; word-break:break-word;"
             title="">{{ viewPortWidth < 300 ? dateOnly : dateAndTime }}
      </b-col>
    </div>
  </div>
</template>

<script>
export default {
  name: "ImageComponent",
  data() {
    return {
      viewPortWidth: 0,
      dateOnly: "",
      dateAndTime: ""
    }
  },
  props: {
    post: {},
    lazy: false
  },
  created() {
    const monthNames = ['zero', 'Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık']
    let dateSplitWithT = this.post.screenshotDate.split('T')
    let yearMonthDate = dateSplitWithT[0].split('-')
    this.dateOnly = yearMonthDate[2] + " " + monthNames[parseInt(yearMonthDate[1], 10)] + " " + yearMonthDate[0]
    this.dateAndTime = this.dateOnly + " " + dateSplitWithT[1].split('.')[0]
    if (process.browser) {
      this.viewPortWidth = window.innerWidth;
    }
  }
}
</script>

<style scoped>
img {
  max-width: 90vw !important;
  max-height: 95vh !important;
}

.zoomed {
  max-width: 90vw !important;
  max-height: 95vh !important;
}
</style>
