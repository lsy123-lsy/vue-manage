<template>
  <div>
    <head-top></head-top>
    <div class="table_container">
      <el-table
        :data="tableData"
        style="width: 100%">
        <el-table-column
          type="index"
          width="100">
        </el-table-column>
        <el-table-column
          prop="date"
          label="注册日期"
          width="180">
        </el-table-column>
        <el-table-column
          prop="name"
          label="用户姓名"
          width="180">
        </el-table-column>
        <el-table-column
          prop="address"
          label="注册地址">
        </el-table-column>
      </el-table>
      <div class="Pagination">
        <el-pagination
          background
          layout="total, prev, pager, next"
          :page-size="20"
          :total="userCount"
          :current-page="currentPage"
          @current-change="changePage">
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
  import headTop from '../../components/headTop.vue'
  import { getUserList, getUserCount } from '../../api/getData';


  export default {
    data() {
      return {
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        },{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        },{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        },{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }],
        // 当前页数
        currentPage:1,
        // 每页数据量
        pageSize:20,
        // 当前显示第一条数据索引
        offSet:0,
        // 总用户数
        userCount:1000
      }
    },
    components:{
      headTop
    },
    methods:{
      // 初始化页面
      async initData(){
        try {
          const userCount =  await getUserCount()
          if(userCount.status === 1) {
            this.userCount = userCount
          }else{
            throw new Error('获取数据失败')
          }
          this.getUsers()
          console.log("初始化成功");
          
        } catch (error) {
          console.log("获取数据失败",error);
        }
        
      },
      // 点击切换页面
      changePage(val){
        this.currentPage = val,
        console.log("当前页：",val);
        this.offSet = (val - 1) * this.pageSize,
        // 获得当前页面内容
        this.getUsers()
        
        
      },
      async getUsers() {
        // 获取当前页面数据
        const Users = await getUserList({offset:this.offSet,limit:this.pageSize})
        this.tableData = []
        // 将数据放入data中显示
        Users.forEach(item => {
          const tableData = {}
          tableData.name = item.username
          tableData.date = item.registe_time
          tableData.address = item.city
          this.tableData.push(tableData)
        });
      }
    }
  }
</script>
<style lang="less">
  @import '../../style/mixin';
  .table_container{
    padding: 20px;
  }
  .Pagination{
    margin-top: 10px;
    text-align: left;
  }
</style>