<template id="home">
  <v-app>
    <div id="apps">
      <v-app-bar color="deep-purple accent-4" dense dark>
        <v-toolbar-title>J I R A Boards</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon>
          <v-icon @click="logout">mdi-logout</v-icon>
        </v-btn>
      </v-app-bar>
      <nuxt/>
    </div>
  </v-app>
</template>

<script>
export default {
  data()
  {
  },
  methods:{
    logout:function ()
    {
      this.$db.Details.delete(1).then(() =>this.$router.push('/login'));
    }
  },
  created() {

    this.$db.Details.toArray().then((tests) => {
      if(tests.length==0)
      {
        this.$router.push('/login')
      }

    });
  }
};
</script>
<style>
.v-application {
  font-family: "Roboto", sans-serif;
  line-height: 1.5;
}
.theme--light.v-application {
  background: #d6d9ef;
}
</style>
