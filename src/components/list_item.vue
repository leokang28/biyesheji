<template>
<div>
  <router-link :to="{name:'article',params:{id:article.id}}" v-for='(article,key) in articles'>
    <dl class='k-item'>
      <dt class='k-img'><img :src="imgs?imgs[key] : 'https://raw.githubusercontent.com/leokang28/source/master/default.png'" alt=""></dt>
      <dd class='k-body'>
        <h2>{{article.title}}</h2>
        <span class='date'>{{new Date(article.date).toLocaleString()}}</span>
        <span class='k-info'>{{article.text}}</span>
      </dd>
      <div style='clear:both'></div>
    </dl>
  </router-link>
</div>
</template>
<script>
export default {
  props:['imgs','articles'],
  data() {
    return{

    }
  }
}
</script>
<style>
.k-label {
    line-height:inherit;
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
    height:160px;
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
    height: 100%;
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
    height:100px;
    width:100%;
    word-wrap:break-word;
    word-break:break-all;
    line-height: 1.414em;
    overflow: hidden;
    text-overflow: ellipsis!important;
  }
  .k-body span{
    display: inline-block;
  }
  h2{
    margin-top:2px;
  }
  .date {
    position: absolute;
    right: 5px;
    top:20px;
    color:#acb6bd;
  }
</style>
