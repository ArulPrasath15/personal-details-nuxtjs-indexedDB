<template>
    <div class="mt-5">
        <v-row class="mr-15">
          <v-col cols="3" class="ml-10">
            <h2><i>Welcome {{username}} !</i></h2>
           <v-row class="pt-8"><h1 class="ml-5 ">BOARD</h1><h4 class="pt-3 pl-2" ><i>( Members : {{namelists}} )</i></h4></v-row>
          </v-col><v-spacer></v-spacer>
          <v-col cols="3">
            <v-text-field
              v-model="findstring"
              outlined
              label=" Search By Assigne"
              prepend-inner-icon="mdi-layers-search-outline"
            ></v-text-field>
          </v-col>
        </v-row>
      <v-row justify="end">
          <v-col  cols="2"><v-btn outlined @click="fetchdata" color="green"><v-icon left>
            mdi-cloud-upload
          </v-icon>
            Save
          </v-btn></v-col>
      </v-row>
       <v-row justify="center"class="mt-10" >
         <div
           cols="3"
           class="px-2"
         ><v-container class="blue lighten-3" id="container" >
           <h2>TO DO {{  findstring==''? '( '+todos.length+' )':''}}</h2>
           <draggable :list="todos" :animation="200" ghost-class="ghost-card" group="tasks" @change="todosave()" >
             <task-card
               v-for="(task) in todos"
               :key="task.id"
               :task="task"
               v-if="task.name.toUpperCase().includes(findstring.toUpperCase())"
               class="mt-3 "
             > </task-card>
           </draggable>

           <v-dialog
             v-model="dialog"
             persistent
             max-width="600px"
           >
             <template v-slot:activator="{ on, attrs }">
               <v-card outlined class="mt-3 cursor-move"
                       v-bind="attrs"
                       v-on="on" min-height="50"
                      v-if="findstring==''"
               >
                 <v-card-title ><v-row justify="center">
                   + Add
                 </v-row></v-card-title>
               </v-card>
             </template>
             <v-card>
               <v-card-title>
                 <span class="headline">Add TODO</span>
               </v-card-title>
               <v-card-text>
                 <v-container>
                   <v-row>
                     <v-col cols="12">
                       <v-text-field
                         label="Titile"
                         v-model="addtitle"
                         required
                       ></v-text-field>
                     </v-col>
                     <v-col cols="12">
                       <v-text-field
                         v-model="adddes"
                         label="Description"
                         required
                       ></v-text-field>
                     </v-col>

                     <v-col cols="12" sm="6" md="12">
                       <v-dialog
                         ref="dialog"
                         max-width="300"
                         :return-value.sync="date"
                         persistent
                       >
                         <template v-slot:activator="{ on, attrs }">
                           <v-text-field
                             v-model="date"
                             label="Esstimate Date"
                             readonly
                             v-bind="attrs"
                             v-on="on"
                           ></v-text-field>
                         </template>
                         <v-date-picker v-model="date" scrollable>
                           <v-spacer></v-spacer>
                           <v-btn text color="primary" @click="modal = false">
                             Cancel
                           </v-btn>
                           <v-btn
                             text
                             color="primary"
                             @click="$refs.dialog.save(date)"
                           >
                             OK
                           </v-btn>
                         </v-date-picker>
                       </v-dialog>
                     </v-col>
                     <v-col cols="12">
                       <v-text-field
                         v-model="assign"
                         label="Assigne ID"
                         v-if="userdata.accounttype!='user'"
                         required
                       ></v-text-field>
                     </v-col>
                   </v-row>
                 </v-container>
               </v-card-text>
               <v-card-actions>
                 <v-spacer></v-spacer>
                 <v-btn
                   color="blue darken-1"
                   text
                   @click="dialog = false"
                 >
                   Close
                 </v-btn>
                 <v-btn
                   color="blue darken-1"
                   text
                   @click="add()"
                 >
                   Save
                 </v-btn>
               </v-card-actions>
             </v-card>
           </v-dialog>

         </v-container>
         </div>
         <div
           cols="3"
           class="px-2"
         ><v-container class="yellow lighten-3" id="container" >
           <h2 >IN PROCESS {{  findstring==''? '( '+inprocess.length+' )':''}}</h2>
           <draggable :list="inprocess" :animation="200" ghost-class="ghost-card" group="tasks" @change="inprocessave()">
             <task-card
               v-for="(task) in inprocess"
               :key="task.id"
               :task="task"
               v-if="task.name.toUpperCase().includes(findstring.toUpperCase())"
               class="mt-3 cursor-move"
             ></task-card>
           </draggable>
           </v-container>
         </div>
         <div
           cols="3"
           class="px-2"
         ><v-container class="green lighten-3" id="container">
           <h2 >DONE {{  findstring==''? '( '+done.length+' )':''}}</h2>
           <draggable :list="done" :animation="200" ghost-class="ghost-card" group="tasks" @change="donesave()" >
             <task-card
               v-for="(task) in done"
               :key="task.id"
               :task="task"
               v-if="task.name.toUpperCase().includes(findstring.toUpperCase())"
               class="mt-3 cursor-move"
             ></task-card>
           </draggable>
         </v-container>
         </div>
         <div
           cols="3"
           class="px-2"
         >
           <v-container class="red lighten-3" id="container" >
           <h2 >BLOCK {{  findstring==''? '( '+block.length+' )':''}}</h2>
           <draggable :list="block" :animation="200" ghost-class="ghost-card" group="tasks" @change="blocksave()">
             <task-card
               v-for="(task) in block"
               :key="task.id"
               :task="task"
               v-if="task.name.toUpperCase().includes(findstring.toUpperCase())"
               class="mt-3 cursor-move"
             ></task-card>
           </draggable>
           </v-container>
         </div>
       </v-row>
      </div>
</template>
<script>
import draggable from "vuedraggable";
import TaskCard from "../components/TaskCard.vue";
import axios from '~/plugins/axios'
import Users from "../components/Users";

import { uuid } from "vue-idb";
export default {
  name: "App",
  components: {
    Users,
    TaskCard,
    draggable
  },
  data() {
    return {
      todos:'',
      inprocess:'',
      done:'',
      block:'',
      dialog: false,
      date:'',
      addtitle:'',
      adddes:'',
      findstring:'',
      username:'',
      userdata:'',
      assign:'',
      namelist:''

    }

  },
  methods: {
    add: function()
    {
      if(this.assign=='' && this.addtitle!='' && this.adddes!='' && this.date!='')
      {
        var param={userid:this.userdata.userid,title:this.addtitle,des:this.adddes,edate:this.date,username:this.userdata.Name}
        axios.post('/task/insert',param).then((response) => {
          this.dialog=false;
          this.adddes=''
          this.addtitle=''
          this.date=''
          this.fetchdata()
        });
      }else
      {
        if(this.addtitle!='' && this.adddes!='' && this.date!='')
        {
          axios.get('/findusername/'+this.assign,).then((response) => {

            if(response.data[0].name!='')
            {
              var param={userid:this.assign,title:this.addtitle,des:this.adddes+" Assigned by "+this.userdata.Name,edate:this.date,username:response.data[0].name}
              axios.post('/assign',param).then((response) => {
                this.dialog=false;
                this.adddes=''
                this.addtitle=''
                this.date=''
                this.assign=''
                this.fetchdata()
              });
            }

          });
        }else
        {
          alert("Filled the Details")
        }
      }
    },
    close:function ()
    {
      this.dialog=false;
    },

    todosave:function(){
      for(var i=0;i<this.todos.length && this.todos[i].userid==this.userdata.userid && this.todos[i].state!=2 && this.todos[i].state!=3 && this.todos[i].state!=4;i++)
      {
          var param={state:1,id:this.todos[i].id}
           axios.post('/task/change',param).then((response) => {
        });
        this.todos[i].state=1;

      }
    },
    inprocessave:function(){
      for(var i=0;i<this.inprocess.length && this.inprocess[i].userid==this.userdata.userid;i++)
      {
        var param={state:2,id:this.inprocess[i].id}
        axios.post('/task/change',param).then((response) => {
        });
        this.inprocess[i].state=2;
      }

    },
    donesave:function(){
      for(var i=0;i<this.done.length && this.done[i].userid==this.userdata.userid && this.done[i].state!=4 && this.done[i].state!=1;i++)
      {
         var param={state:3,id:this.done[i].id}
        axios.post('/task/change',param).then((response) => {
        });
        this.done[i].state=3;
      }

    },
    blocksave:function(){
      for(var i=0;i<this.block.length && this.block[i].userid==this.userdata.userid && this.block[i].state!=1 && this.block[i].state!=3;i++)
      {
        var param={state:4,id:this.block[i].id}
        axios.post('/task/change',param).then((response) => {
        });
        this.block[i].state=4;
      }
    },

  fetchdata:function()
  {
    axios.get('/task/status/1').then((response) => {
      this.todos=response.data;
    });
    axios.get('/task/status/2').then((response) => {
      this.inprocess=response.data;
    });
    axios.get('/task/status/3').then((response) => {
      this.done=response.data;
    });
    axios.get('/task/status/4').then((response) => {
      this.block=response.data;
    });
  }

  },
  computed:{
    namelists:function()
    {
      var s=''
      for(var i=0;i<this.namelist.length;i++)
      {
        s+=this.namelist[i].name+", ";
      }
      return s.substring(0,s.length-2);
    }

  },
  created() {
    this.$db.Details.toArray().then((tests) => {
      if(tests.length==0)
      {
          this.$router.push('/login')
      }
      else
      {
          this.userdata=tests[0]
          this.username=tests[0].Name;
      }

    });
   this.fetchdata();
    axios.get('/users').then((response) => {
      this.namelist=response.data;
    });

  }
};
</script>

<style scoped>
#container
{
  min-width: 310px;
 border-radius: 10px
}

</style>




<!--var timeStart = new Date("Mon Jan 01 2007 11:00:00 GMT+0530").getTime();-->
<!--var timeEnd = new Date("Mon Jan 01 2007 11:30:00 GMT+0530").getTime();-->
<!--var hourDiff = timeEnd - timeStart; //in ms-->
<!--var secDiff = hourDiff / 1000; //in s-->
<!--var minDiff = hourDiff / 60 / 1000; //in minutes-->
<!--var hDiff = hourDiff / 3600 / 1000; //in hours-->
<!--var humanReadable = {};-->
<!--humanReadable.hours = Math.floor(hDiff);-->
<!--humanReadable.minutes = minDiff - 60 * humanReadable.hours;-->
<!--console.log(humanReadable); //{hours: 0, minutes: 30}-->
