<template >
  <div >
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on, attrs }">
        <v-row justify="center" class="mt-2">
          <v-col align="center" sm="6" md="8">
            <v-card
              v-for="i in Details"
              class="mt-2 mb-2 rounded-lg"
              :key="i['id']"
              elevation="3"
            >
              <v-card-text>
                <v-row>
                  <v-col align="left" cols="2">
                    <v-icon color="green" large>mdi-account</v-icon>
                  </v-col>
                  <v-col cols="8" align="left">
                    <h2>{{ i["Name"] }}</h2>
                    <h3>{{ i["Mobile"] }}</h3>
                  </v-col>
                  <v-col align="end" cols="2">
                    <v-icon
                      color="grey"
                      large
                      v-bind="attrs"
                      v-on="on"
                      @click="setdata(i)"
                    >
                      mdi-pencil</v-icon
                    >
                    <v-icon
                      color="red"
                      large
                      @click="remove(i)"
                    >
                      mdi-delete</v-icon
                    >
                  </v-col>

                </v-row>
              </v-card-text>
            </v-card>

            <v-card
              class="mt-2 mb-2 "
              v-bind="attrs"
              v-on="on"
              @click="cleardata"
            >
              <v-card-text
                ><v-icon dense medium>mdi-plus</v-icon> Add Contact</v-card-text
              >
            </v-card>
          </v-col>
        </v-row>
      </template>

      <v-card>
        <v-card-title>
          <span class="headline">User Profile</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  label="Name"
                  v-model="addname"
                  :value="'The'"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-select
                  :items="['Male', 'Female']"
                  v-model="addgender"
                  label="Gender"
                ></v-select>
              </v-col>

              <v-col cols="12" sm="6" md="12">
                <v-dialog
                  ref="dialog"
                  max-width="300"
                  v-model="modal"
                  :return-value.sync="date"
                  persistent
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="date"
                      label="DOB"
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
                  label="Mobile"
                  v-model="addmobile"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="Email"
                  v-model="addemail"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false">
            Close
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
            @click="flag == 'insert' ? addSubmit() : updatedata()"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { uuid } from "vue-idb";

export default {
  name: "index",
  data: () => ({
    date: "",
    modal: false,
    dialog: false,
    Details: "",
    addname: "15",
    addgender: "",
    addmobile: "",
    addemail: "",
    flag: "",
    uniqueid: "",
  }),

  methods: {
    addSubmit: function () {
      this.dialog = false;
      var list = [];
      list.push(
        this.addname,
        this.addgender,
        this.date,
        this.addmobile,
        this.addemail
      );
      this.add(list);
    },

    setdata(value) {
      (this.addname = value["Name"]),
        (this.addgender = value["Gender"]),
        (this.date = value["Dob"]),
        (this.addmobile = value["Mobile"]),
        (this.addemail = value["Email"]);
      this.flag = "update";
      this.uniqueid = value["id"];
    },
    cleardata() {
      (this.addname = ""),
        (this.addgender = ""),
        (this.date = ""),
        (this.addmobile = ""),
        (this.addemail = "");
      this.uniqueid = "";
      this.flag = "insert";
    },
    update() {
      this.$db.Details.toArray().then((tests) => {
        this.Details = tests;
        // console.log(tests);
      });
    },
    add(value) {
      this.$db.Details.add({
        id: uuid(),
        Name: value[0],
        Gender: value[1],
        Dob: value[2],
        Mobile: value[3],
        Email: value[4],
      }).then(() => this.update());
    },
    updatedata() {
      this.dialog = false;
      this.$db.Details.update(
        this.uniqueid, // the id
        {
          Name: this.addname,
          Gender: this.addgender,
          Dob: this.date,
          Mobile: this.addmobile,
          Email: this.addemail,
        }
      ).then(() => this.update());
    },
    remove(test) {
      this.$db.Details.delete(test.id).then(() => this.update());
    },
  },
  mounted() {
    this.update();
  },
};
</script>
