<template><v-main>
  <v-container>
    <v-card>
        <nuxt-link to="/">ホームに戻る</nuxt-link>
      <no-ssr>
        <vue-editor :editorOptions="editorSettings" id="editor" v-model="post.content" disabled></vue-editor>
      </no-ssr>
    </v-card>
  </v-container>
  </v-main>
</template>

<script>
export default {
  head() {
    return {
      title: this.post.title,
    };
  },
  data: () => ({
    rules: [(v) => v.length <= 120 || "最大120文字です"],
    drawer: null,
    mode: 1,
    img: null,
    editorSettings: {
      modules: {
        toolbar: false,
      },
    },
    theme: "bubble",
  }),

  async asyncData(context) {
    const post = await context.$axios.$get("/api/posts/", {
      params: {
        id: context.params.id,
      },
    });

    return {
      post: post[0],
    };
  },
  mounted() {
    this.updateHeader();
  },
  methods: {
    updateHeader() {
      // タイトルとして使いたい情報を渡す
      this.$nuxt.$emit("updateHeader", this.post.title);
    },
  },
};
</script>

<style scoped>
</style>
