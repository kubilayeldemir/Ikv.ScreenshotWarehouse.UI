<template>
  <div class="container" id="disqus_thread">
    İKV Forum kapandı. Bu chat alanı ile paylaşım yapabilirsiniz.
  </div>
</template>

<script>
export default {
  props: {
    url: {
      type: String,
      required: true,
    },
    identifier: {
      type: String,
      required: true,
    },
  },
  mounted() {
    // Define the Disqus configuration function
    window.disqus_config = function () {
      this.page.url = this.$props.url; // Set the URL dynamically
      this.page.identifier = this.$props.identifier; // Set the identifier dynamically
    };

    // Load the Disqus script
    const d = document;
    const s = d.createElement('script');
    s.src = 'https://ikvssdeposu.disqus.com/embed.js'; // Replace with your Disqus subdomain
    s.setAttribute('data-timestamp', +new Date());
    (d.head || d.body).appendChild(s);
  },
};
</script>
