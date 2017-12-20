<template>
  <div>
    <top-bar @update_chart='update'></top-bar>
    <slide class='k-shadow' :img_url='img_url' v-show='!!img_url.src.length' v-if='this.$root.$route.params.name==="dota2"'></slide>
    <two-col v-if="this.$root.$route.params.name==='csgo'"></two-col>
    <div class='row' v-show='this.$root.$route.params.name==="lol"'>
      <div class='chart col-md-6' style='min-height:500px'>

      </div>
      <div class='pie col-md-6' style='min-height:500px'>

      </div>
    </div>
    <div class='row' v-show='this.$root.$route.params.name==="lol"'>
      <div class='map col-md-12' style='min-height:800px'>

      </div>
    </div>
    <foot></foot>
  </div>
</template>
<script>
import topbar from '../components/topBar.vue';
import foot from '../components/foot.vue';
import slide from '../components/slide.vue';
import twoCol from '../components/twoCol.vue';
import bus from './event.js';
import '../../node_modules/echarts/map/js/china.js';
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
    update(data) {
      this.chart.setOption({
        series:[{
          name:'价格',
          type:'bar',
          data:data.price
        },
        {
          name:'销量',
          type:'line',
          yAxisIndex:1,
          data:data.sale
        }]
      })
      this.pie.setOption({
            legend:{
              data:data.nick
            },
            series:[
              {
                data:data.sort_stores
              }
            ]
          })
      this.map.setOption({
        series:[{
          name:data.value,
          data:data.cities
        }]
      })
    },
    get_img(name) {
      this.img_url.src=require('../data/img.json')[name]||[];
      //ajax请求文件列表
    },
    draw() {
      var self=this;
      let mychart=this.$echarts.init(document.getElementsByClassName('chart')[0])
      let mypie=this.$echarts.init(document.getElementsByClassName('pie')[0])
      let mymap=this.$echarts.init(document.getElementsByClassName('map')[0])
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

      mypie.setOption({
        title : {
          text: '店铺销量前15',
          subtext: '综合',
          x:'center'
        },
        tooltip : {
          trigger: 'item',
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          top:65,
          data: []
        },
        series : [
          {
            name: '店铺销售量',
            type: 'pie',
            radius : '55%',
            center: ['50%', '50%'],
            data:[],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      })

      var option = {
        title: {
          text: '销量地域分布',
          left: 'center'
        },
        tooltip: {
          trigger: 'item'
        },
        visualMap: {
          min: 0,
          left: 500,
          bottom: 80,
          text: ['高','低'],   // 文本，默认为数值文本
          calculable: true
        },
        toolbox: {
          show: false,
          orient: 'vertical',
          left: 'right',
          top: 'center',
          feature: {
          dataView: {readOnly: false},
          restore: {},
          saveAsImage: {}
          }
        },
        series: [
          {
            itemStyle: {
              normal: {
                color: function (params) {
                var colorList = [
                  '#C1232B', '#B5C334', '#FCCE10', '#E87C25', '#27727B',
                  '#FE8463', '#9BCA63', '#FAD860', '#F3A43B', '#60C0DD',
                  '#D7504B', '#C6E579', '#F4E001', '#F0805A', '#26C0C0'
                ];
                return colorList[params.dataIndex]
                },
              }
            },
            name: '牛仔裤',
            type: 'map',
            mapType: 'china',
            roam: false,
            label: {
              normal: {
              show: true
              },
              emphasis: {
              show: true
              }
            },
            data:[]
          }
        ]
      };    
      mymap.setOption(option);
      this.chart=mychart;
      this.pie=mypie;
      this.map=mymap;
    },
    doAjax() {
      var self=this;
      var xhr=new XMLHttpRequest();
      xhr.open('GET','/api/read?type=牛仔裤',true);
      xhr.onreadystatechange=function() {
        if(xhr.readyState == 4 && xhr.status==200 ||xhr.status ==304){
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
          self.pie.setOption({
            legend:{
              data:nick
            },
            series:[
              {
                data:sort_stores
              }
            ]
          })
          self.map.setOption({
            series:[{
              data:cities
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
