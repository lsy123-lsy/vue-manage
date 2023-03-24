<template>
  <div class="header_container">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/manage' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item v-for="(item,index) in $route.meta" :key="index">{{item}}</el-breadcrumb-item>
    </el-breadcrumb>
    <el-dropdown trigger="click" @command="handleCommand" menu-align='start'>
      <span class="el-dropdown-link">
        <img src="../assets/user-center.png" alt="">
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item icon="el-icon-plus" command="home">首页</el-dropdown-item>
        <el-dropdown-item icon="el-icon-circle-plus" command="signout">退出</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>
<script>
  import { signout } from '../api/getData'
  // 辅助函数，可以
  import {mapActions,mapState} from 'vuex'

  export default {
    data(){
      return {

      }
    },
    created(){
      // 如果没有用户信息，则获得用户信息
      if(!this.adminInfo.id){
        this.getAdminData()
      }
    },
    computed:{
      // 引入用户信息变量
      ...mapState(['adminInfo'])
    },
    methods:{
      // 引入vuex中的方法
      // 获得用户数据
      ...mapActions(['getAdminData']),
      async handleCommand(command) {
        if(command == 'home') {
          this.$router.push('/manage')
        }else if(command == 'signout'){
          const res = await signout()
          if(res.status === 1) {
            this.$message({
              type:'success',
              message:'退出成功'
            });
            this.$router.push('/')
          }else {
            this.$message({
              type:'error',
              message:res.message
            });
          }
        }
      }
    }
  }
</script>
<style lang="less">
  @import '../style/mixin';
  .header_container{
    height: 60px;
    display: flex;
    background-color: #eff2f7;
    padding-left: 20px;
    justify-content: space-between;
    align-items: center;
  }
  .header_container img {
    height: 25px;
    width: 25px;
    border-radius: 20%;
    margin-right: 37px;
  }
  .el-dropdown-menu__item{
    text-align: center;
  }
</style>