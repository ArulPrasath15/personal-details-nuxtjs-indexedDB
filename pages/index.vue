<template>
    <div class="mt-5">

        <div v-if="!loader">
        <v-row class="mr-15">
          <v-col cols="3" class="ml-10">
           <v-row class="pt-8"><h1 class="ml-5 ">BOARD</h1><h4 class="pt-3 pl-2" ></h4></v-row>

            <v-expansion-panels accordion class="mt-4" >
            <v-expansion-panel style="background-color: #d0d3f8" >
              <v-expansion-panel-header disable-icon-rotate>
                <v-row>
                  <v-col>
                    Members List
                  </v-col>
                </v-row>
                <template v-slot:actions>
                  <v-icon color="teal">
                    mdi-menu-down
                  </v-icon>
                </template>
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <v-list dense style="background-color: #d0d3f8">
                  <v-list-item
                    v-for="(item, i) in namelists.split(',')"
                    :key="i"
                  >
                    <v-list-item-icon>
                      <v-icon >mdi-creation</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content >
                      <v-list-item-title> {{ item }}</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-expansion-panel-content>
            </v-expansion-panel>
              </v-expansion-panels>

          </v-col><v-spacer></v-spacer>
          <v-col cols="3">
            <v-text-field
              background-color="white"
              v-model="findstring"
              color="black"
              outlined
              label=" Search By Assignee"
              prepend-inner-icon="mdi-layers-search-outline"

            ></v-text-field>
          </v-col>
        </v-row>
      <v-row justify="end">
          <v-col  cols="2"><v-btn dark @click="fetchdata" color="deep-purple accent-4" width="160"><v-icon left>
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
           <h2> <v-icon color="black" size="28">mdi-bookmark</v-icon> TO DO {{  findstring==''? '( '+todos.length+' )':''}}</h2>
           <draggable :list="todos" :animation="200" ghost-class="ghost-card" group="tasks" @change="todosave()" >
             <task-card
               v-for="(task) in todos"
               :key="task.id"
               :task="task"
               class="mt-3 "
               v-if="task.name.toUpperCase().includes(findstring.toUpperCase())"

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

               >
                 <v-card-title ><v-row justify="center">
                   <v-btn icon>
                     <v-icon size="30" dense >mdi-plus</v-icon>
                     <h2 class="ml-2">Add</h2>
                   </v-btn>

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
                         v-if="userdata.admin!=undefined"
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



           <h2 > <v-icon color="black" size="28">mdi-sync</v-icon> IN PROCESS {{  findstring==''? '( '+inprocess.length+' )':''}} </h2>
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
           <h2 > <v-icon color="black" size="28">mdi-check-all</v-icon> DONE {{  findstring==''? '( '+done.length+' )':''}}</h2>
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
           <h2 > <v-icon color="black" size="23">mdi-block-helper</v-icon> BLOCK {{  findstring==''? '( '+block.length+' )':''}}</h2>
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
      <div v-else style="height:100%" >
        <v-overlay :value="true" opacity="0.6">
          <v-img :src="require('@/static/jira.png')" max-width="63" max-height="63"></v-img>
          <br>
          <v-progress-linear indeterminate color="cyan"></v-progress-linear>
        </v-overlay></div>

      <v-snackbar v-model="snackbar1"  color="green" :timeout="2000">
        {{ this.snackbar1_text}}
        <template v-slot:action="{ attrs }"><v-btn color="black" text v-bind="attrs" @click="snackbar1 = false">Close</v-btn></template>
      </v-snackbar>

      </div>


</template>
<script>
import draggable from "vuedraggable";
import TaskCard from "../components/TaskCard.vue";
import axios from '~/plugins/axios'
import Users from "../components/Users";
let config
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
      namelist:'',
      todos1:'',
      inprocess1:'',
      done1:'',
      block1:'',
      loader:false,
      snackbar1:false,
      snackbar1_text:'TODO Created Successfully !'


    }

  },
  methods: {
    add: function()
    {
      this.loader=true
      if(this.assign=='' && this.addtitle!='' && this.adddes!='' && this.date!='')
      {
        var param={userid:this.userdata.userid,title:this.addtitle,des:this.adddes,edate:this.date}
        axios.post('/tasks/insert',param).then((response) => {
          this.dialog=false;
          this.adddes=''
          this.addtitle=''
          this.date=''
          this.loader=false
          this.snackbar1=true,
          this.fetchdata()

        });
      }else
      {
        if(this.addtitle!='' && this.adddes!='' && this.date!='')
        {

              var param={userid:this.assign,title:this.addtitle,des:this.adddes+" Assigned by "+this.userdata.Name,edate:this.date}
              axios.post('/tasks/insert',param).then((response) => {
                this.dialog=false;
                this.adddes=''
                this.addtitle=''
                this.date=''
                this.assign=''
                this.loader=false
                this.fetchdata()
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
          var param={stateid:1,id:this.todos[i].id}
           axios.post('/tasks/change',param).then((response) => {
        });
        this.todos[i].state=1;

      }
    },
    inprocessave:function(){
      for(var i=0;i<this.inprocess.length && this.inprocess[i].userid==this.userdata.userid ;i++)
      {
        console.log(this.inprocess[i].title)
        var param={stateid:2,id:this.inprocess[i].id}
        axios.post('/tasks/change',param).then((response) => {
        });
        this.inprocess[i].state=2;
      }

    },
    donesave:function(){
      for(var i=0;i<this.done.length && this.done[i].userid==this.userdata.userid && this.done[i].state!=4 && this.done[i].state!=1;i++)
      {
        console.log(this.done[i].title)
         var param={stateid:3,id:this.done[i].id}
        axios.post('/tasks/change',param).then((response) => {
        });
        this.done[i].state=3;
      }

    },
    blocksave:function(){
      for(var i=0;i<this.block.length && this.block[i].userid==this.userdata.userid && this.block[i].state!=1 && this.block[i].state!=3;i++)
      {
        var param={stateid:4,id:this.block[i].id}
        axios.post('/tasks/change',param).then((response) => {
        });
        this.block[i].state=4;
      }
    },

  fetchdata:async function()
  {
    this.loader=true
    console.log(config)
    await axios.get('/tasks/state/1',config).then((response) => {

      this.todos1=response.data;
      let promises = [];
      let self=this;
      let i;
      for(i=0;i<this.todos1.length;i++)
      {
        promises.push(axios.get('/usersid/'+this.todos1[i].userid));
      }
      Promise.all(promises).then((responses) =>
      {
        for(let j=0;j<responses.length;j++)
        {
          self.todos1[j].name=responses[j].data[0].name;
        }
        this.todos=self.todos1
        console.log(this.todos);
      });

    });

    await axios.get('/tasks/state/2',config).then((response) => {
      this.inprocess1=response.data;
      let promises = [];
      let self=this;
      let i;
      for(i=0;i<this.inprocess1.length;i++)
      {
        promises.push(axios.get('/usersid/'+this.inprocess1[i].userid));
      }
      Promise.all(promises).then((responses) =>
      {
        for(let j=0;j<responses.length;j++)
        {
          self.inprocess1[j].name=responses[j].data[0].name;
        }
        this.inprocess=this.inprocess1
        console.log(this.inprocess);
      });
    });

    await axios.get('/tasks/state/3',config).then((response) => {

      this.done1=response.data;
      let promises = [];
      let self=this;
      let i;
      for(i=0;i<this.done1.length;i++)
      {
        promises.push(axios.get('/usersid/'+this.done1[i].userid));
      }
      Promise.all(promises).then((responses) =>
      {
        for(let j=0;j<responses.length;j++)
        {
          self.done1[j].name=responses[j].data[0].name;
        }
        this.done=this.done1
        console.log(this.done);
      });
    });

    await axios.get('/tasks/state/4',config).then((response) => {
      this.block1=response.data;
      let promises = [];
      let self=this;
      let i;
      for(i=0;i<this.block1.length;i++)
      {
        promises.push(axios.get('/usersid/'+this.block1[i].userid));
      }
      Promise.all(promises).then((responses) =>
      {
        for(let j=0;j<responses.length;j++)
        {
          self.block1[j].name=responses[j].data[0].name;
        }
        this.block=this.block1
        console.log(this.block);
      });
    });
    this.loader=false
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
          config = {
            headers: {
              'Authorization': 'token ' + this.userdata.token
            }
          }
          this.fetchdata();

      }

    });

    axios.get('/allusers').then((response) => {
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
