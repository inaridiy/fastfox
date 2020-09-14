<template>
  <v-main>
    <v-container>
      <v-btn @click="newpost()">新規作成</v-btn>
      <v-spacer></v-spacer>
      <v-row>
        <v-col cols="12" sm="6" md="4" lg="3" v-for="post in posts" :key="post.id">
          <v-card class="mx-auto" min-height="400px" hover>
            <v-card-title>{{post.title}}</v-card-title>
            <v-card-text>{{"概要 : "+post.excerpt}}</v-card-text>
            <v-img :src="img(post.type)" height="150px" />
            <v-card-actions>
              <v-btn @click="$router.push(`/admin/edit/${post.id}`);">編集</v-btn>
              <v-btn @click="deletepost(post.id);">削除</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
export default {
  layout: "admin",
  async asyncData(context) {
    const posts = await context.$axios.$get("/api/posts?nohtml=1");
    return { posts };
  },
  methods: {
    newpost() {
      console.log("new");
      this.$axios.post("/api/posts?new=1").then((id) => {
        this.$router.push(`/admin/edit/${id.data.id}`);
      });
    },
    img(src) {
      if (!src) {
        return "https://cdn-ssl-devio-img.classmethod.jp/wp-content/uploads/2020/01/vue-eyecatch.jpeg";
      }
      return src;
    },
    async deletepost(id){
      await this.$axios.$post("/api/posts", {id,status:"del"});
       location.reload();
    }
  },
};
</script>
<style >
</style>