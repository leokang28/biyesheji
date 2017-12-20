<template>
  <div>
    <top-bar></top-bar>
    <slide class='k-shadow' :img_url='img_url' v-show='!!img_url.src.length' v-if='this.$root.$route.params.name==="dota2"'></slide>
    <two-col v-if="this.$root.$route.params.name==='csgo'"></two-col>
    <foot></foot>
    <div class='charts' style='width:500px;height:300px;'>

    </div>
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
      name:'',
      price:[],
      sale:[]
    }
  },
  created() {
    this.name=this.$root.$route.params.name;
    this.get_img(this.name);
  },
  mounted(){
    this.draw();
    this.doAjax();
  },
  beforeDestroy() {
    bus.$emit('getType',this.name);
    // console.log(this.name);
  },
  methods:{
    get_img(name) {
      this.img_url.src=require('../data/img.json')[name]||[];
      //ajax请求文件列表
    },
    draw() {
      var self=this;
      let mychart=this.$echarts.init(document.getElementsByClassName('charts')[0])
      mychart.setOption({
        title:'',
        tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'cross',
            crossStyle: {
                color: '#999'
            }
          }
        },
        xAxis:[
          {
            type: 'category',
            data: [],
            axisPointer: {
              type: 'shadow'
            }
          }
        ],
        legend:{
          data:['销量','价格']
        },
        yAxis:[
          {
            type:'value',
            name:'销量',
            axisLabel: {
              formatter: '{value} 件'
            }
          },
          {
            type:'value',
            name:'价格',
            axisLabel: {
              formatter: '{value} 元'
            }
          }
        ],
        series:[{
          name:'价格',
          type:'bar',
          data:self.price
        },
        {
          name:'销量',
          type:'line',
          yAxisIndex:1,
          data:self.sale
        }]
      });
      this.chart=mychart;
    },
    doAjax() {
      var self=this;
      var xhr=new XMLHttpRequest();
      xhr.open('GET','/api/read?type=牛仔裤',true);
      xhr.onreadystatechange=function() {
        if(xhr.readyState == 4 && xhr.status==200 ||xhr.status ==304){
          var data=JSON.parse(xhr.responseText).data;
          var sale=[]
          var price=[]
          for(let i = 0 ;i<data.length;i++) {
            price.push(data[i].price);
            sale.push(data[i].sale);
          }
          self.chart.setOption({
            series:[{
              name:'价格',
              type:'bar',
              data:price
            },
            {
              name:'销量',
              type:'line',
              yAxisIndex:1,
              data:sale
            }]
          })
        }
      }
      xhr.send();
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
