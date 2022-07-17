import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        themes:{
           light:{
               primary:"#FF8A00",
               success:"#1BD97B",
               secondary:"#CCCCCC",
               error:"#FF8A00",
               accent:"#FFFAE6"
           }
        }
    }
});
