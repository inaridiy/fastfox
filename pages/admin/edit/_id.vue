<template>
  <v-app>
    <v-app-bar app color="indigo" dark>
      <v-toolbar-title>編集画面</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn @click="up_post" text>投稿</v-btn>
    </v-app-bar>
    <v-main>
      <v-container>
        <v-text-field label="Title" v-model="post.title" type="text"></v-text-field>
        <br />
        <v-tabs>
          <v-tab @click="mode=1">Edit</v-tab>
          <v-tab @click="mode=2">Preview</v-tab>
          <v-tab @click="mode=3">HTML</v-tab>
        </v-tabs>
        <v-card outlined class="mx-auto">
          <template v-if="mode===1">
            <no-ssr placeholder="Loading Your Editor...">
              <vue-editor
                :editorOptions="editorSettings"
                id="editor"
                v-model="post.content"
                useCustomImageHandler
                @image-added="handleImageAdded"
                :editor-toolbar="customToolbar"
              ></vue-editor>
            </no-ssr>
          </template>
          <div v-else-if="mode===2" v-html="post.content"></div>
          <template v-else-if="mode===3">
            <v-textarea v-model="post.content" auto-grow clearable counter />
          </template>
        </v-card>
        <br />
        <v-card max-width="90%" outlined class="mx-auto">
          <v-textarea v-model="post.excerpt" hint="要約" rows="3" :rules="rules" counter />
        </v-card>
        <v-file-input accept="image/*" label="ヘッダー画像" @change="getFileContent" />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  layout: "none",
  data: () => ({
    rules: [(v) => v.length <= 120 || "最大120文字です"],
    drawer: null,
    mode: 1,
    img: null,

    editorSettings: {
      modules: {
        imageDrop: true,
        blotFormatter: {},
        imageCompress: {},
        magicUrl: true,
      },
    },
    customToolbar: [],
  }),
  methods: {
    async getFileContent(file) {
      console.log(file);
      this.img = file;
    },
    async up_post() {
      let postdata = this.post;
      if (this.img) {
        const config = {
          headers: {
            "content-type": "multipart/form-data",
          },
        };

        const formData = new FormData();
        formData.append("file", this.img);
        const result = await this.$axios.$post(
          "/api/uploads",
          formData,
          config
        );
        const url = result.url;
        postdata["type"] = url;
      }
      await this.$axios.$post("/api/posts", postdata);
    },
    handleImageAdded(file, Editor, cursorLocation, resetUploader) {
      console.log("add image");
      const formData = new FormData();
      formData.append("file", file);
      const config = {
        headers: {
          "content-type": "multipart/form-data",
        },
      };
      this.$axios
        .$post("/api/uploads", formData, config)
        .then((result) => {
          const url = result.url;
          Editor.insertEmbed(cursorLocation, "image", url);
          resetUploader();
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  async asyncData(context) {
    const post = await context.$axios.$get("/api/posts/", {
      params: {
        id: context.params.id,
      },
    });
    console.log(post);
    return {
      post: post[0],
    };
  },
};
</script>

<style scoped>
</style>
