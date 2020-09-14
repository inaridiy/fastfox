<template>
  <v-app>
    <v-app-bar color="#fcb69f" dark shrink-on-scroll src="https://picsum.photos/1920/1080?random" app>
      <template v-slot:img="{ props }">
        <v-img v-bind="props" gradient="to top right, rgba(19,84,122,.5), rgba(128,208,199,.8)"></v-img>
      </template>
      <v-spacer></v-spacer>
      <v-toolbar-title class="title">{{title}}</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-app-bar>
    <transition name="page">
      <nuxt />
    </transition>

    <v-footer dark padless>
      <v-card class="flex" flat tile>
        <v-card-title class="teal">
          <strong class="subheading">{{sub_title}}</strong>

          <v-spacer></v-spacer>
        </v-card-title>

        <v-card-text class="py-2 white--text text-center">
          {{ new Date().getFullYear() }} —
          <strong>FastFox</strong>
        </v-card-text>
      </v-card>
    </v-footer>
  </v-app>
</template>

<script>
import setting from "../setting.json";
export default {
  data() {
    return {
      title: setting.blog_name,
      sub_title: setting.sub_title,
    };
  },
  created() {
    this.setListener();
  },
  methods: {
    setListener() {
      // emitで発火させたイベント名にする
      this.$nuxt.$on("updateHeader", this.setHeader);
    },
    setHeader(title) {
      // 第1引数にはemitで渡した値が入ってくる。
      // 第2引数以降を渡す場合も同様に、それ以降の引数で受け取れる
      this.title = title || "";
    },
  },
};
</script>
<style scoped>
.page-enter {
  opacity: 0;
}
.page-enter-active {
  transition: opacity 2s;
}
</style>
