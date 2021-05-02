<template id="home">
  <v-app>
    <div id="apps">
      <v-app-bar color="deep-purple accent-4" dense dark>
        <v-btn icon class="pl-5">
          <v-icon >mdi-bulletin-board</v-icon>
        </v-btn>
        <v-toolbar-title>J I R A  Boards</v-toolbar-title>
        <v-spacer></v-spacer>

         <v-btn icon v-if="userdata">
           <v-icon >mdi-account</v-icon>
         </v-btn>
         <div class="mr-8" v-if="userdata">
           {{this.userdata.Name}}
         </div>
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
  data(){
    return{
      userdata:'',
    }
  },
  methods:{
    logout:function ()
    {
      this.$db.Details.delete(1).then(() =>this.$router.push('/login'));
      this.userdata=''
    },
    detail:function ()
    {
      this.$db.Details.toArray().then((tests) => {
        if(tests.length==0)
        {
          this.$router.push('/login')
        }else
        {
          this.userdata=tests[0];
          console.log(this.userdata.Name)
        }

      });
    }

  },
  created() {

    this.detail()

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

   /* Refers the whole setup */
 ::-webkit-scrollbar
 {
   width: 10px;
   background-color: #F5F5F5;
 }
/* Refers tracking path */
::-webkit-scrollbar-track
{
  -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
  background-color: #F5F5F5;
}
/* Refers Draggable Bar */
::-webkit-scrollbar-thumb
{
  background-color: #555555;
  border: 2px solid #555555;
}
/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #434A54;
}
</style>
