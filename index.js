import 'bootstrap/dist/css/bootstrap.css';
import './src/css/common.css';

import Vue from 'vue';
import App from './app.vue'
import echarts from 'echarts'
import 'bootstrap/dist/js/bootstrap.min.js';
import router from './src/routes/routes.js';
Vue.prototype.$echarts=echarts
// import vueProgress from 'vue-progress';

// const options= {
//   color: '#fff',
//   failedColor: 'red',
//   thickness: '3px',
//   transition: {
//     speed: '0.2s',
//     opacity: '0.6s'
//   },
//   autoRevert: true,
//   location: 'top',
//   inverse: false
// };

// Vue.use(vueProgress,options);
// import Vue from 'vue';
let vm=new Vue({
  router,
  render:h => h(App)
})
vm.$mount('#app');