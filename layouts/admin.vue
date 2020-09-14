<template>
  <v-app>
    <v-navigation-drawer app v-model="drawer" clipped>
      <v-container>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="title grey--text text--darken-2">Navigation lists</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>
        <v-list nav dense>
          <v-list-group
            v-for="nav_list in nav_lists"
            :key="nav_list.name"
            :prepend-icon="nav_list.icon"
            no-action
            :append-icon="nav_list.lists ? undefined : ''"
          >
            <template v-slot:activator>
              <nuxt-link :to="nav_list.link">
                <v-list-item-content>
                  <v-list-item-title>{{ nav_list.name }}</v-list-item-title>
                </v-list-item-content>
              </nuxt-link>
            </template>
            <v-list-item v-for="list in nav_list.lists" :key="list">
              <v-list-item-content>
                <v-list-item-title>{{ list }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-group>
        </v-list>
      </v-container>
    </v-navigation-drawer>
    <v-app-bar color="green" dark app clipped-left>
      <v-app-bar-nav-icon @click="drawer=!drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>FastFox</v-toolbar-title>
    </v-app-bar>
    <nuxt />
    <v-footer color="primary" dark app>FastFox</v-footer>
  </v-app>
</template>
<script>
export default {
  data: () => ({
    drawer: null,

    nav_lists: [
      {
        name: "Hello World",
        icon: "mdi-speedometer",
        link: "/admin",
      },
      {
        name: "投稿",
        icon: "mdi-view-dashboard",
        link: "/admin/post",
      },
    ],
  }),
};
</script>
