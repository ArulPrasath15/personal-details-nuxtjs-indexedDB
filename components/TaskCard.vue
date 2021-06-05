<template>
  <v-card outlined  elevation="5" max-width="330" min-width="330" class="hovercursor" >
    <v-card-title> <h4>{{task.title + "("+ task.name +")"}} </h4></v-card-title>
    <v-divider></v-divider>
    <v-card-text >
      <v-row justify="start" class="ml-1">
         <h3 >{{task.des}}</h3>
      </v-row>

        <v-row justify="start" class="ml-1"><h4> Estimate Date : <u>{{task.edate.substring(0,10)}}</u></h4></v-row>
<!--         <v-row justify="end"><h4> <u>Token ID : {{task.id}}</u></h4></v-row>-->

    </v-card-text>
  </v-card>
</template>
<script>
import axios from '~/plugins/axios'
export default {
  components: {
  },
  props: {
    task: {},
    taskassign:''
  },
};
</script>
<style scoped>

.hovercursor
{
  cursor: grab;
}
.hovercursor:active
{
  cursor: grabbing;
}




</style>
