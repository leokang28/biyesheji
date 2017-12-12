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
        <li><router-link :to='{name:"game",params:{name:"lol"}}'>LOL</router-link></li>
        <li><router-link :to='{name:"game",params:{name:"csgo"}}'>CS:GO</router-link></li>
      </ul>
      <form class="navbar-form navbar-right" role="search">
        <div class="form-group">
          <input type="text" class="form-control" placeholder="Type Here">
        </div>
        <button type="submit" class="btn btn-default">Search</button>
      </form>
    </div>
  </nav>
</template>
<script>
export default {
  props:['isShow_back','isShow_refresh']
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


