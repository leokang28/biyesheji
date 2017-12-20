<template>
  <nav class='navbar navbar-inverse'>
    <div class='container'>
      <div class='navbar-header'>
        <router-link class="navbar-brand" to='/'>
            Esport
          </router-link>
      </div>
      <ul class='nav navbar-nav'>
        <!-- <li>
          <router-link class="navbar-brand" to='/'>
            Esport
          </router-link>
        </li>  -->
        <li v-show='isShow_back'>
          <router-link to='/'>< Back</router-link>  
        </li>
        <li><router-link :to='{name:"game",params:{name:"dota2"}}'>Dota2</router-link></li>
        <li><router-link :to='{name:"game",params:{name:"lol"}}'>数据展示</router-link></li>
        <li><router-link :to='{name:"game",params:{name:"csgo"}}'>CS:GO</router-link></li>
      </ul>
      <div class="input-group" style='margin-top:8px;'>
        <input type="text" class="form-control pull-right" placeholder="Search for...">
        <span class="input-group-btn">
          <button class="btn btn-default" type="button">Go!</button>
        </span>
      </div>
    </div>
  </nav>
</template>
<script>
export default {
  props:['isShow_back','isShow_refresh'],
  mounted(){
    var self=this;
    var button=document.getElementsByClassName('btn-default')[0];
    button.addEventListener('click',function() {
      var input=document.getElementsByClassName('form-control')[0];
      var value=input.value;
      if(input.value==='') return
      var url='/api/read?type='+input.value;
      var xhr=new XMLHttpRequest()
      xhr.open('GET',url,true);
      xhr.onreadystatechange=function(){
        if(xhr.readyState==4&&xhr.status==200 || xhr.status==304){
          var data=JSON.parse(xhr.responseText).data.sort(compare("price",1));
          var sale=[]
          var price=[]
          var city={}
          var cities=[]
          var store={}
          var stores=[]
          for(let i = 0 ;i<30;i++) {
            price.push(data[i].price);
            sale.push(data[i].sale);
            if(city[data[i].loc.split(' ')[0]]){
              city[data[i].loc.split(' ')[0]]++;
            }else{
              city[data[i].loc.split(' ')[0]]=1
            }
            if(store[data[i].nick]){
              store[data[i].nick]+=data[i].sale
            }else{
              store[data[i].nick]=data[i].sale
            }
          }
          for(let i = 30;i<data.length;i++) {
            if(city[data[i].loc.split(' ')[0]]){
              city[data[i].loc.split(' ')[0]]++;
            }
            else{
              city[data[i].loc.split(' ')[0]]=1
            }
            if(store[data[i].nick]){
              store[data[i].nick]+=data[i].sale
            }else{
              store[data[i].nick]=data[i].sale
            }
          }
          for(let i in city){
            cities.push({"name":i,"value":city[i]})
          }
          for(let i in store){
            stores.push({"name":i,"value":store[i]})
          }

          //排序策略
          function compare(property,flag){
            return function(obj1,obj2){
              var value1 = obj1[property];
              var value2 = obj2[property];
              if(flag===1)
                return value2 - value1;    // 升序
              else
                return value1 - value2;   //降序
            }
          }
          var sort_stores=stores.sort(compare('value',1)).slice(0,15);
          var nick=[]
          for(let i =0;i<15;i++){
            nick.push(sort_stores[i])
          }
          self.$emit('update_chart',{price,sale,cities,value,nick,sort_stores});
        }
      }
      xhr.send();
    },true)
  }
}
</script>
<style>
  .form-control{
    width:200px!important;
    transition-property:width;
    transition-duration:400ms;
    transition-timing-function:ease-in-out;
  }
  .form-control:focus{
    width:280px!important;
  }
</style>


