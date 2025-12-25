<template>
  <v-app>
    <v-app-bar
      app
      color="teal"
      dark
    >
      <v-toolbar-title>我的部落格</v-toolbar-title>
    </v-app-bar>

    <v-main>
      <v-container
        class="pa-4"
        max-width="md"
      >
        <NuxtPage />
      </v-container>
    </v-main>

    <v-footer
      app
      color="teal"
      dark
    >
      <v-col
        class="text-center white--text"
        cols="12"
      >
        © 2025 部落格版權
      </v-col>
    </v-footer>
  </v-app>
</template>
