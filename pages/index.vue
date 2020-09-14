<template>
  <v-main>
    <v-container>
      <v-row>
        <v-col cols="12" sm="6" md="4" lg="3" v-for="post in posts" :key="post.id">
          <v-card class="mx-auto" min-height="400px" hover nuxt :to="`/posts/${post.id}`">
            <v-img :src="img(post.type)" height="150px" />
            <v-card-title class="headline">{{post.title}}</v-card-title>
            <v-card-text>{{post.excerpt}}</v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
import setting from "../setting.json";
export default {
  async asyncData(context) {
    const posts = await context.$axios.$get("/api/posts?nohtml=1");
    return { posts };
  },
  methods: {
    img(src) {
      if (!src) {
        return "https://cdn-ssl-devio-img.classmethod.jp/wp-content/uploads/2020/01/vue-eyecatch.jpeg";
      }
      return src;
    },

    updateHeader() {
      // タイトルとして使いたい情報を渡す
      this.$nuxt.$emit("updateHeader", setting.blog_name);
    },
  },
  mounted() {
    this.updateHeader();
  },
};
</script>
<style >
</style>