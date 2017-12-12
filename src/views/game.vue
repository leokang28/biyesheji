<template>
<div>
  <top-bar></top-bar>
  <slide class='k-shadow' :img_url='img_url' v-show='!!img_url.src.length' v-if='this.$root.$route.params.name==="dota2"'></slide>
  <two-col v-if="this.$root.$route.params.name==='csgo'"></two-col>
  <foot></foot>
</div>
</template>
<script>
import topbar from '../components/topBar.vue';
import foot from '../components/foot.vue';
import slide from '../components/slide.vue';
import twoCol from '../components/twoCol.vue';
import bus from './event.js';
export default {
  data(){
    return{
      img_url:{
        current:0,
        src:[]
      },
      name:''
    }
  },
  created() {
    this.name=this.$root.$route.params.name;
    this.get_img(this.name);
  },
  beforeDestroy() {
    bus.$emit('getType',this.name);
    // console.log(this.name);
  },
  methods:{
    get_img(name) {
      this.img_url.src=require('../data/img.json')[name]||[];
      //ajax请求文件列表
    }
  },
  components:{
    'top-bar':topbar,
    'foot':foot,
    'slide':slide,
    'two-col':twoCol
  },
  watch:{
    $route:function() {
      this.get_img(this.$root.$route.params.name);
    }
  }
}
</script>
<style>
/* .k-shadow {
  box-shadow: 4px 4px 4px rgba(2,2,2,0.3)
} */
</style>
