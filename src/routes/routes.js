import Vue from 'vue';
import Router from 'vue-router'

import home from '../views/home.vue';
import article from '../views/article.vue';
import game from '../views/game.vue';

Vue.use(Router);
const routes=[
  {path:'/',component:home},
  {path:'/article/:id',name:'article',component:article},
  {path:'/game/:name',name:'game',component:game}
];
const router=new Router({routes});
export default router;