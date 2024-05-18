<template>
  <div>
    <div v-if="category==='forum'" class="m-0 p-0 row">
      <client-only>
        <NuxtLink v-if="post.title" :to="'/t/'+ toMd5(post.title)" class="text-decoration-none" style="width: min-content">
          📁
        </NuxtLink>
      </client-only>
      {{ post.title }}
    </div>
    <div v-if="lazy" v-lazy-container="{ selector: 'img' }">
      <img v-if="!useRawData" :data-src="getFileUrl">
      <img v-else :data-src="post.rawData.fileBase64">
    </div>
    <div v-else>
      <img v-if="!useRawData" :src="getFileUrl">
      <img v-else :src="post.rawData.fileBase64">
    </div>
    <NuxtLink :to="'/posts/'+post.id" class="text-decoration-none" style="  width: min-content"></NuxtLink>
    <div class="m-0 p-0 row" style="border-style: groove hidden hidden; border-color: grey;">
      <div class="col-3 m-0 p-0">
        <NuxtLink :to="'/u/'+post.username" class="text-decoration-none text-white">
          {{ post.username }}
          <BIconLink></BIconLink>
        </NuxtLink>
        -
        <NuxtLink :to="'/posts/'+post.id" class="text-decoration-none text-success">
          <BIconImage class="text-right"></BIconImage>
        </NuxtLink>
        <span v-if="category==='user'">
          -
          {{ post.gameServer }}
        </span>
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
      baseUrlCloudinary: "https://res.cloudinary.com/dmo4hvhcj/image/upload/v1645641514/",
      baseUrlForumPosts: "https://backend.net.tr/ikv/"
    }
  },
  props: {
    post: {},
    lazy: false,
    useRawData: false,
    category: {
      type: String,
      default: "user"
    }
  },
  computed: {
    getFileUrl: function () {
      if (this.post.category == "user") {
        return this.baseUrlCloudinary + this.post.fileUrl;
      } else if (this.post.category == "forum") {
        return this.baseUrlForumPosts + this.post.fileUrl;
      } else {
        return "https://res.cloudinary.com/dmo4hvhcj/image/upload/v1685806656/lazy_dy4ssu_ou8e0u.jpg";
      }
    }
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
  methods: {
    toMd5(text) {
      if (process.client && this.$md5) {
        return this.$md5(text);
      }
      return '';
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
