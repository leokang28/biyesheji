<template>
  <div class='container'>
    <div class="row">
      <div class="col-xs-3 k-left">
          <div class="list-group">
            <button v-for='(item,key) in items' class="list-group-item">
              {{item}}
              <span v-if='key<3' :class="['label pull-right k-label ', {'label-danger':key===0,'label-success':key===1,'label-info':key===2}]">{{key+1}}</span>
              </button>
          </div>
      </div>
      <div class="col-xs-9 k-right">
        <list-item :articles='articles' :imgs='imgs'></list-item>
      </div>
    </div>
  </div>
</template>
<script>
import listItem from '../components/list_item.vue';
export default {
  data() {
    return {
      items:[
        'Fnatic',
        'G2',
        'Faze',
        'Navi',
        'Envyus',
        'Cloud9'
      ],
      articles:require('../data/csgo.json').csgo,
      imgs:require('../data/img.json').csgo
    }

  },
  components:{
    'list-item':listItem
  }
}
</script>
<style>
  .k-label {
    line-height:inherit;
  }
  .k-right{
    /* background-color: gray; */
  }
  .list-group{
    margin:0;
  }
  .list-group-item {
    color:#222222;
  }
  .k-item {
    width:100%;
    /* border:1px solid red; */
    margin-bottom:5px;
    position: relative;
    box-shadow: 4px 4px 4px rgba(2,2,2,0.2);
    border-radius: 5px;
  }
  .k-img {
    float: left;
    width:30%;
    /* border:1px solid red; */
    padding:5px 0;
  }
  .k-body{
    float: left;
    width:70%;
    /* border:1px solid red; */
    padding:5px;
    padding-left:10px;
  }
  .k-img img {
    width:100%;
    /* height:100%; */
  }
  .k-item * {
    color:#222222;
  }
   .k-item *:hover{
     cursor: pointer;
   }
  .k-bottom {
    clear:both;
    position: absolute;
    right: 1.5em;
    bottom:0;
  }
  .k-info {
    font-size:17px;
    word-wrap:break-word;
    word-break:break-all;
    line-height: 1.414em;
    text-overflow: clip;
  }
  .k-body span{
    display: block;
  }
  h2{
    margin-top:2px;
  }
  /* .left .content{
    margin-left:-10px;
  }
  .right .content {
    margin-right:-10px;
  } */
</style>

