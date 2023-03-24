<template>
  <div class="line1">
    <div id="line1" style="width: 90%; height: 450px;"></div>
  </div>
</template>
<script>
// 引入echarts
  import echarts from 'echarts/lib/echarts';
  // 涌入柱状图
  import 'echarts/lib/chart/bar';
  import 'echarts/lib/chart/line';
  import 'echarts/lib/component/title';
  import 'echarts/lib/component/legend';
  import 'echarts/lib/component/toolbox';
  import 'echarts/lib/component/markPoint';
  import 'echarts/lib/component/tooltip';

  export default {
    mounted(){
      // 图表初始化
      // 指定图表的父容器
      this.myChart = echarts.init(document.getElementById('line1'));
      // 初始化图表内容
      this.initData();
    },
    // 父组件向子组件传值
    // sevenDay：x轴，七天日期；sevenDate：y轴七天日期的数据
    props:['sevenDate','sevenDay'],
    methods:{
      initData(){
        const color = ['#5793f3', '#675bba', '#d14a61']
        // 设置折线图具体内容
        const option = {
          color:color,
          title:{
            text:'走势图',
            subtext:''
          },
          // 鼠标放在某点上动态显示坐标轴和信息
          tooltip:{
            trigger:'axis'
          },
          // 图例
          legend:{
            data:['新注册用户', '新增订单', '新增管理员']
          },
          toolbox:{
            show:true,
            feature:{
              dataZoom:{
                yAxisIndex:'none'
              },
              dataView:{
                readOnly:false
              },
              magicType:{
                type:['bar','line']
              },
              restore:{}
            }
          },
          // X轴设置
          xAxis:{
            // 类型，表示类目轴
            type:'category',
            // x轴两侧是否留白，默认为true留白
            boundaryGap:false,
            // x轴数据
            // 只在类目轴中生效
            data:['3.1','3.2','3.3','3.4','3.5']
            // data:this.sevenDay
          },
          // y轴设置
          yAxis:[
            {
              type:'value',
              name:'用户',
              min:0,
              max:200,
              position:'left',
              // 坐标轴线设置
              axisLine:{
                // 坐标轴线样式设置
                lineStyle:{
                  color:'#999',
                  // width:2
                }
              },
              // 坐标轴刻度标签相关设置
              axisLable:{
                // 自定义刻度标签样式，默认，可以改为%
                formatter:'{value}'
              }
            },
            {
              type: 'value',
              name: '订单',
              min: 0,
              max: 200,
              position: 'right',
              axisLine: {
                lineStyle: {
                  color: '#999'
                }
              },
              axisLabel: {
                formatter: '{value}'
              }
            },
          ],
          series: [
            {
              name:'新注册用户',
              // 图标类型，折线图
              type:'line',
              data:[10,150,30,50,100],
              // data:this.sevenDate[0]
              // 图标配置多个Y轴时的Y轴索引
              yAxisIndex:1,
              // 对点进行标记，比如标记一条折线的最大值和最小值
              markPoint:{
                data:[
                  {type:'max',name:'最大值'},
                  {type:'min',name:'最小值'}
                ]
              }
            },
            {
              name:'新增订单',
              type:'line',
              data:[0,15,10,30,20],
              // data:this.sevenDate[1]
              yAxisIndex:1,
              markPoint:{
                data:[
                  {type:'max',name:'最大值'},
                  {type:'min',name:'最小值'}
                ]
              }
            },
            {
              name:'新增管理员',
              type:'line',
              data:[20,200,30,0,150],
              // data:this.sevenDate[2]
              yAxisIndex:1,
              markPoint:{
                data:[
                  {type:'max',name:'最大值'},
                  {type:'min',name:'最小值'}
                ]
              }
            },
          ]
        };
        this.myChart.setOption(option);
      }
    },
    // 监听数据变化
    watch:{
      sevenDate:function() {
        // 重新初始化图表
        this.initData()
      },
      sevenDay:function() {
        this.initData()
      }
    }
  }
</script>
<style lang="less">
  @import '../style/mixin';
  .line1{
    display: flex;
    justify-content: center;
  }
</style>