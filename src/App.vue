<template>
  <v-app>
     <v-main :style="'background-color:'+$vuetify.theme.themes.light.accent+'; height:'+$vuetify.breakpoint.lg">
       <v-container class="ml-10 mr-10">
        <Page1 />
       </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Page1 from "@/pages/page1";

export default {
  name: 'App',

  components: {
    Page1,
  },

  data: () => ({
    //
  }),
};
</script>
