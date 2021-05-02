<template>
<div>
  <v-row class="mt-8">
    <v-col >
      <v-card class="mx-auto mt-10" max-width="500" outlined  elevation="5">
        <v-card-title>Board Login </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <v-form @submit.prevent>
            <v-row>
              <v-text-field class="mx-7 mt-7" v-model="username" label="Username" outlined clearable  ></v-text-field>
            </v-row>
            <v-row>
              <v-text-field type="password" class="mx-7" v-model="pass" label="Password" outlined clearable  ></v-text-field>
            </v-row>
            <v-divider></v-divider>
            <v-row class="mt-3">
              <v-col cols="6"  align="center">
                <v-btn type="submit" width="130"  color="green" dark @click="submit">Login</v-btn>
              </v-col>
              <v-col cols="6" align="center">
                <v-btn type="reset" width="130" color="red"  dark >Clear</v-btn>
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</div>
</template>

<script>
import axios from '~/plugins/axios'
export default {
  name: "login",
  data(){
    return{
      username:'',
      pass:'',
      userdata:''
    }
  },
  methods:{
    submit:async function () {
      if (this.username != '' && this.pass==123) {
        await axios.get('/users/' + this.username).then((response) => {
          this.userdata = response.data[0]
          console.log(this.userdata)
          if(this.userdata!=undefined)
          {
            this.init()
          }else
          {
            alert(" Invalid Credientials")
          }
        });
      }
      else
      {
        alert(" Enter Valid Credientials")
      }
    },
    init:function ()
    {
      this.$db.Details.add({
        id: 1,
        Name: this.userdata.name,
        accounttype: this.userdata.type,
        userid:this.userdata.userid
      }).then(() => this.$router.push('/'));
    }

  },
  created() {
    this.$db.Details.toArray().then((tests) => {
      if(tests.length!=0)
      {
        this.$router.push('/')
      }

    });
  }
}
</script>

<style scoped>

</style>
