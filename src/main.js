import { createApp } from 'vue'
import App from './App.vue'
import BalmUI from 'balm-ui';
import store from './store';
// import {Vuelidate} from 'vuelidate'
const app = createApp(App);

app
    .use(store)
    .use(BalmUI)
    // .use(Vuelidate)
    .mount('#app')
