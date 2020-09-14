<template><v-main>
  <v-container>
    <v-card>
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
      meta: [
        {
          hid: "og:description",
          property: "og:description",
          content: this.post.excerpt,
        },
        { hid: "og:url", property: "og:url", content: this.$route.path },
        { hid: "og:image", property: "og:image", content: this.post.type },
      ],
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
