<template>
  <div>
    <top-bar :isShow_refresh='true' :isShow_back='false'></top-bar>
    <section class='container list'>
      <section class='col-xs-8 col-xs-offset-2'>
        <list-item :articles='data'></list-item>
      </section>
    </section>
    <foot></foot>
  </div>
</template>
<script>
import topBar from '../components/topBar.vue';
import foot from '../components/foot.vue';
import listItem from '../components/list_item.vue'
import event from './event.js';
export default {
  data:function() {
    return{
      data:require('../data/home.json').home,
      name:'home'
    }
  },
  mounted() {
    var XHR=new XMLHttpRequest();
    XHR.open('get','api/read?type=jd',true)
    XHR.onreadystatechange=function(){
      if (XHR.readyState==4 && XHR.status===200||XHR.status===304){
        console.log(XHR.responseText);
      }
    }
    XHR.send();
  },
  beforeDestroy() {
    event.$emit('getType','home');
  },
  components:{
    'top-bar':topBar,
    'foot':foot,
    'list-item':listItem
  }
}
</script>
