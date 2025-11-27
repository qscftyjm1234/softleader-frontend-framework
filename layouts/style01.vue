<template>
  <v-app>
    <v-navigation-drawer app permanent>
      <v-list nav>
        <v-list-item link to="/admin/dashboard">
          <v-list-item-icon
            ><v-icon>mdi-view-dashboard</v-icon></v-list-item-icon
          >
          <v-list-item-content
            ><v-list-item-title
              >全球儀表板</v-list-item-title
            ></v-list-item-content
          >
        </v-list-item>

        <v-list-item link to="/admin/settings">
          <v-list-item-icon><v-icon>mdi-cog</v-icon></v-list-item-icon>
          <v-list-item-content
            ><v-list-item-title
              >全球設定</v-list-item-title
            ></v-list-item-content
          >
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app color="deep-purple accent-4" dark>
      <v-toolbar-title>全球管理後台</v-toolbar-title>
    </v-app-bar>

    <v-main>
      <v-container class="pa-4">
        <NuxtPage />
      </v-container>
    </v-main>

    <v-footer app color="deep-purple accent-4" dark>
      <v-col class="text-center white--text" cols="12">
        © 2025 全球管理後台
      </v-col>
    </v-footer>
  </v-app>
</template>
