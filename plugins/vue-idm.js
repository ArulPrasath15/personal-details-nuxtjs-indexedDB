import Vue from "vue";
import VueIdb from "vue-idb";
Vue.use(VueIdb);
const idb = new VueIdb({
  version: 1,
  database: "login",
  schemas: [{ Details: "id, Name, accounttype,userid" }],
});
Vue.use(idb);
