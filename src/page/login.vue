<template>
  <div class="login_page fillcontain">
    <!-- 内置动画标签 name属性 -->
    <transition name="form-fade" mode="in-out">
      <section v-show="showLogin" class="form_contianer">
        <div class="manage_tip">
          <p>吃了吗后台管理系统</p>
        </div>
        <!-- model表示表单数据对象，rules表示数据校验规则 -->
        <el-form :model="loginForm" :rules="rules" ref="loginForm">
          <!-- prop对应校验规则和表单数据 -->
          <el-form-item prop="username">
            <el-input v-model="loginForm.username" placeholder="用户名"><span>dsfsf</span></el-input>
          </el-form-item>

          <el-form-item prop="password">
            <el-input type="password" v-model="loginForm.password" placeholder="密码"></el-input>
          </el-form-item>
          
          <el-form-item>
            <el-button type="primary" @click="submitForm('loginForm')" class="submit_btn">登录</el-button>
          </el-form-item>

        </el-form>
        <p class="tip">温馨提示：</p>
        <p class="tip">未登录过得新用户，自动登录</p>
        <p class="tip">注册过的用户柯坪账号密码登录</p>
      </section>
    </transition>
  </div>
</template>
<script>
  import {mapActions,mapState} from 'vuex'
  import {login,getAdminInfo} from '../api/getData'

  export default{
    data(){
      return{
        loginForm:{
          username:'',
          password:''
        },
        rules:{
          username:[
            {required:true,
              message:'请输入用户名',
              // 表单验证触发方式有change（数据发生改变）和blur（失去焦点）
              trigger:'blur'
            }
          ],
          password:[
            {
              required:true,
              message:'请输入密码',
              trigger:'blur'
            }
          ]
        },
        showLogin:false
      }
    },
    mounted(){
      this.showLogin = true
      if(!this.adminInfo.id) {
         this.getAdminData()
      }
    },
    computed:{
      ...mapState(['adminInfo'])
    },
    methods:{
      async submitForm(formName){
        this.$refs[formName].validate(async (valid) => {
          // 判断校验结果
          if(valid) {
            // 发起login网络请求，
            const res = await login({user_name:this.loginForm.username,password:this.loginForm.password})
            if(res.status == 1) {
              this.$message({
                type:'success',
                message:'登录成功'
              });
              this.$router.push('manage')
            }else{
              this.$message({
                type:'error',
                message:res.message
              })
              console.log(res.message);
              
            }
          }else{
            this.$notify.error({
              title:'错误',
              message:'请输入正确的用户名密码',
              offset:100
            });
            return false;
          }
        });
      }
    },
    watch:{
      adminInfo:function(newValue){
        if(newValue.id){
          this.$message({
            type:'success',
            message:'检测到您之前登陆过，将自动登录'
          })
          this.$router.push('manange')
        }
      }
    }
  }
</script>
<style lang="less" scoped>
  @import '../style/mixin';
  .login_page{
    background-color: #4a6da5;
  }
  .manage_tip{
    position: absolute;
    width: 100%;
    top: -100px;
    left:0;
    p{
      font-size: 34px;
      color: #fff;
    }
  }
  .form_contianer{
    .wh(320px,210px);
    // 定位上下左右居中
    .ctp(320px,210px);
    border-radius: 5px;
    padding: 25px;
    text-align: center;
    background-color: #fff;
    .submit_btn{
      width: 100%;
      font-size: 16px;
    }
  }
  .tip{
    color: red;
    font-size: 12px;
  }
  .form-fade-enter-active,.form-fade-leave-active{
    transition: all 1s;
  }

  .form-fade-enter,.form-fade-leave-active {
    transform: translate3d(0,-50px,0);
    opacity: 0;
  }
</style>