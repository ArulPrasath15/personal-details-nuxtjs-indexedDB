import Vue from "vue";
import VueIdb from "vue-idb";
Vue.use(VueIdb);
const idb = new VueIdb({
  version: 1,
  database: "Personal Details",
  schemas: [{ Details: "id, Name, Gender, Dob,Mobile,Email" }],
});
Vue.use(idb);
