<template>
<div>
  <top-bar :isShow_back='true' :isShow_refresh='false'></top-bar>
  <item :article='this.article'></item>
  <nav aria-label="...">
    <ul class="pager">
      <li><a @click='previous()'>Previous</a></li>
      <li><a @click='next()'>Next</a></li>
    </ul>
  </nav>
  <foot></foot>
</div>
</template>
<script>
import topBar from '../components/topBar.vue';
import foot from '../components/foot.vue';
import article from '../components/article.vue';
import bus from './event.js';
export default {
  data(){
    return {
      article:{
        title:'String',
        date:'String',
        text:'String'
      },
      list:null,
      type:''
    }
  },
  created(){
    // bus.$on('postInfo',function(data){
    //   this.article.title=data.title;
    //   this.article.date=new Date(data.date).toLocaleString();
    //   this.article.text=data.text;
    // }.bind(this));
    var self=this;
    bus.$on('getType',function(data){
      this.type=data;
    })
    console.log(this.type);
    this.list=require('../data/home.json').home;
    this.getArticle(this.$root.$route.params.id);
  },
  components:{
    'top-bar':topBar,
    'foot':foot,
    'item':article
  },
  methods:{
    previous() {
      let id=this.$root.$route.params.id-1;
      if(id<this.list[0].id) {
        this.getArticle(this.list.length-1);
        this.$root.$router.push({name:'article',params:{id:this.list.length-1}})
      }else{
        this.getArticle(id);
        this.$root.$router.push({name:'article',params:{id:id}})
      }
    },
    next() {
      let id=Number(this.$root.$route.params.id)+1;
      if(id>=this.list.length) {
        this.getArticle(0)
        this.$root.$router.push({name:'article',params:{id:0}})
      }else{
        this.getArticle(id);
        this.$root.$router.push({name:'article',params:{id:id}})
      }
    },
    getArticle(id){
      if(!this.list[id]) return;
      this.article.title=this.list[id].title;
      this.article.date=new Date(this.list[id].date).toLocaleString();
      this.article.text=this.list[id].text;
    }
  }
}
</script>
<style>
.pager > *:hover{
  cursor: pointer;
}
</style>

