<template>
  <div>
    <div v-if="lazy" v-lazy-container="{ selector: 'img' }">
      <img :data-src="baseUrl + post.fileUrl">
    </div>
    <div v-else>
      <img :src="baseUrl + post.fileUrl">
    </div>
    <NuxtLink :to="'/posts/'+post.id" class="text-decoration-none" style="  width: min-content"></NuxtLink>
    <div class="m-0 p-0 row" style="border-style: groove hidden hidden; border-color: grey;">
      <div class="col-3 m-0 p-0">
        <NuxtLink :to="'/u/'+post.username" class="text-decoration-none text-dark">
          {{ post.username }}
          <BIconLink></BIconLink>
        </NuxtLink>
        -
        <NuxtLink :to="'/posts/'+post.id" class="text-decoration-none text-success">
          <BIconImage class="text-right"></BIconImage>
        </NuxtLink>
      </div>
      <b-col class="col-9 text-right m-0 p-0" style="white-space:pre-wrap; word-break:break-word;"
             title="">{{ viewPortWidth < 300 ? dateOnly : dateAndTime }}
      </b-col>
    </div>
  </div>
</template>

<script>
import {BIconLink, BIconImage} from "bootstrap-vue";

export default {
  name: "ImageComponent",
  data() {
    return {
      viewPortWidth: 0,
      dateOnly: "",
      dateAndTime: "",
      baseUrl:"https://res.cloudinary.com/dmo4hvhcj/image/upload/v1645641514/"
    }
  },
  props: {
    post: {},
    lazy: false
  },
  mounted() {
    if (process.browser && this.post.screenshotDate) {
      const monthNames = ['zero', 'Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık']
      let dateSplitWithT = this.post.screenshotDate.split('T')
      let yearMonthDate = dateSplitWithT[0].split('-')
      this.dateOnly = yearMonthDate[2] + " " + monthNames[parseInt(yearMonthDate[1], 10)] + " " + yearMonthDate[0]
      this.dateAndTime = this.dateOnly + " " + dateSplitWithT[1].split('.')[0]
      this.viewPortWidth = window.innerWidth;
    }
  },
  components: {
    BIconLink,
    BIconImage
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
