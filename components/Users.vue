<template>
<v-container>
  <div>
    <v-row>
      <h2>BOARD</h2>
    </v-row>
    <v-row>
      <h3>Members : </h3>
    </v-row>

  </div>
</v-container>
</template>

<script>
import axios from '~/plugins/axios'

export default {
  name: "Users",
  data(){
    return{
      names:'',

    }
  },
  created() {
    axios.get('/users').then((response) => {
      this.names=response.data;
      console.log("a")
      console.log(this.names)
    });
  },
  computed:
  {
     namelists:function()
    {
        // var n=''
        // for(var i=0;i<this.names[0].length;i++)
        // {
        //   console.log(this.names[0][1])
        // }
        // return n;

    }
  }

}
</script>

<style scoped>

</style>
