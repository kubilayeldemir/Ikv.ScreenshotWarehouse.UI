<template>
  <div>
    <div class="mt-1 middle">
      <div class="row col-12">
        Ekran görüntülerini yükleme tarihine ve sunucusuna göre arayabilirsiniz.
      </div>
      <div class="row">
        <div class="col-12 col-md-6">
          <label>Başlangıç tarihi</label>
          <input type="date" :min="startDate" :max="today" v-model="startDate">
        </div>
        <div class="col-12 col-md-6">
          <label>Bitiş tarihi</label>
          <input type="date" :min="startDate" :max="today" v-model="endDate">
          <b-button @click="search" :disabled="!isSearchChanged" class="p-1 pb-0">Ara</b-button>
        </div>
        <div v-if="this.serverSearchbarToggle" class="col-12 col-md-3" style="max-width: 50%">
          <b-form-select v-model="selectedGameServer" :options="options"></b-form-select>
        </div>
      </div>
    </div>
    <ImageComponent class="mt-2 mb-2" :lazy="true" v-for="(post,i) in posts" :key="post.id"
                    :post="post" :use-raw-data="rawDataToggle" :category="post.category"></ImageComponent>
    <b-button v-if="paging.currentPage < paging.pageCount" @click="loadNextPage" variant="success" class="m-2 p-2">
      Resimleri yükle
    </b-button>
    <client-only>
      <div class="overflow-auto">
        <b-pagination-nav v-model="paging.currentPage" @change="changePage" :link-gen="linkGen" dark
                          :number-of-pages="paging.pageCount" use-router last-number></b-pagination-nav>
        <div class="input-group input-group-sm mb-3">

          <b-form-input type="number" v-model="paging.goToPageNumber" min="1" :max="paging.pageCount"
                        @keydown.enter="changePage(paging.goToPageNumber)"
                        :class="['form-control', { 'is-invalid': isInputInvalid }]" placeholder="Sayfa No"
                        aria-label="Sayfa No" aria-describedby="basic-addon2"></b-form-input>
          <div class="input-group-append">
            <button class="btn btn-outline-secondary" @click="changePage(paging.goToPageNumber)" type="button"
                    :disabled="!paging.goToPageNumber">Git
            </button>
          </div>
        </div>
      </div>
    </client-only>
  </div>
</template>

<script>
export default {
  name: "PagedPostsPage",
  data() {
    return {
      posts: {},
      paging: {
        pageCount: 1,
        currentPage: 1,
        pageSize: 0,
        rowCount: 0,
        goToPageNumber: null
      },
      startDate: "2005-01-01",
      endDate: "2030-01-01",
      today: "",
      selectedGameServer: null,
      options: [
        {value: null, text: 'Sunucu'},
        {value: 'Eminönü', text: 'Eminönü'},
        {value: 'Beyazköşk', text: 'Beyazköşk'},
        {value: 'Kuklacı', text: 'Kuklacı'},
        {value: 'Tılsım', text: 'Tılsım'},
        {value: 'Teşkilat', text: 'Teşkilat'},
        {value: 'Sancak', text: 'Sancak'},
        {value: 'Meran', text: 'Meran'},
        {value: 'Anka', text: 'Anka'},
        {value: 'Diğer', text: 'Diğer'}
      ]
    }
  },
  props: {
    ignoreValidation: {
      type: Boolean,
      default: false
    },
    onlyNonValidatedPosts: {
      type: Boolean,
      default: false
    },
    category: {
      type: String,
      default: "user"
    },
    rawDataToggle: {
      type: Boolean,
      default: false
    },
    smartDataRetrieve: {
      type: Boolean,
      default: false
    },
    sortField: {
      type: String,
      default: null
    },
    serverSearchbarToggle: {
      type: Boolean,
      default: false
    },
  },
  async fetch() {
    let query = "/post/paged?"
    if (this.$route.query.page) {
      query = query + "CurrentPage=" + this.$route.query.page
    }
    query = this.addFilterParamsToQuery(query)

    var res = await this.$axios.$get(query);
    this.setResPagingDataToData(res)
    this.posts = res.data
  },
  methods: {
    async loadNextPage() {
      let query = "/post/paged?"
      query = query + `CurrentPage=${this.paging.currentPage + 1}`

      query = this.addFilterParamsToQuery(query)
      var res = await this.$axios.$get(query);
      this.setResPagingDataToData(res)
      this.posts = this.posts.concat(res.data)
      this.addHashToLocation(this.paging.currentPage)
    },
    linkGen(pageNum) {
      return pageNum === 1 ? '?' : `?page=${pageNum}`
    },
    async changePage(pageNum) {
      if (pageNum < 1 || pageNum > this.paging.pageCount) {
        return
      }
      this.paging.goToPageNumber = null
      let query = "/post/paged?"
      query = query + `CurrentPage=${pageNum}`
      window.scrollTo(0, 0);
      query = this.addFilterParamsToQuery(query)
      var res = await this.$axios.$get(query);
      this.setResPagingDataToData(res)
      this.posts = res.data
      this.addHashToLocation(pageNum)
    },
    async search() {
      let query = "/post/paged?"
      if (this.$route.query.page) {
        query = query + "CurrentPage=" + this.$route.query.page
      }

      query = this.addFilterParamsToQuery(query)

      var res = await this.$axios.$get(query);
      this.setResPagingDataToData(res)
      this.posts = res.data
    },
    setResPagingDataToData(res) {
      this.paging.pageCount = res.pageCount
      this.paging.currentPage = res.currentPage
      this.paging.pageSize = res.pageSize
      this.paging.rowCount = res.rowCount
    },
    addHashToLocation(pageNumber) {
      history.pushState(
        {},
        null,
        this.$route.path + '?page=' + pageNumber
      )
    },
    addFilterParamsToQuery(query) {
      if (this.sortField) {
        query = query + "&sortField=" + this.sortField
      }

      if (this.category != null) {
        query = query + "&category=" + this.category
      }
      if (this.rawDataToggle && !this.smartDataRetrieve) {
        query = query + "&includeRawData=" + this.rawDataToggle
      }
      if (this.smartDataRetrieve && !this.rawDataToggle) {
        query = query + "&IncludeRawDataIfNeeded=" + this.smartDataRetrieve
      }
      if (this.$route.params.username) {
        query = query + "&Username=" + this.$route.params.username
      }
      if (this.ignoreValidation) {
        query = query + "&IgnoreValidation=" + true
      }
      if (this.onlyNonValidatedPosts) {
        query = query + "&OnlyNonValidatedPosts=" + true
      }
      if (this.startDate != "2005-01-01") {
        query = query + "&StarDate=" + this.startDate
      }
      if (this.endDate != this.today) {
        query = query + "&EndDate=" + this.endDate
      }
      if (this.selectedGameServer) {
        query = query + "&gameServer=" + this.selectedGameServer
      }
      return query
    }
  },
  created() {
    this.today = new Date().toISOString().slice(0, 10)
    this.endDate = this.today
  },
  computed: {
    isSearchChanged: function () {
      return true
      // return this.startDate !== "2005-01-01" || this.endDate !== this.today || this.selectedGameServer;
    },
    isInputInvalid() {
      if (!this.paging.goToPageNumber) return false
      return this.paging.goToPageNumber > this.paging.pageCount || this.paging.goToPageNumber < 1;
    }
  }
}
</script>

<style scoped>
.middle {
  height: auto;
  width: 100%;
  max-width: 900px;
}

</style>
