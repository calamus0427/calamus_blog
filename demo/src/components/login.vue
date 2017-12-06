<template>
<div>
  <cl-canvasBg></cl-canvasBg>
  <div class="loginForm">
    <el-form  ref="loginForm" :rules="rules" :model="loginForm" label-width="80px">
      <el-form-item label="用户名" prop="name">
        <el-input v-model="loginForm.name"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="loginForm.password"
                  type="password"
                  suffix-icon="el-icon-view"></el-input>
      </el-form-item>
      <el-form-item>
        <el-switch
          v-model="loginForm.Identity"
          active-text="管理后台"
          inactive-text="博客主页">
        </el-switch>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="login">登录</el-button>
        <el-button @click="reset">重置</el-button>
      </el-form-item>

    </el-form>
  </div>
</div>

</template>

<script>
  export default{
    name:'login',
    data(){
      return{
        centerDialogVisible:true,
          loginForm: {
            name: '',
            password: '',
            Identity:true,
        },
        rules:{
          name:[
            {required: true, message: '请输入用户名', trigger: 'change'}],
          password:[
            {required: true, message: '请输入密码', trigger: 'change'}]
        }
      }
    },
    methods: {
      login() {
        var _this = this ;
        this.$refs.loginForm.validate(function (result) {
          console.log(result);
          if(result){
            if(_this.loginForm.Identity){
              _this.$router.push('/article');
            }else{
              _this.$router.push('/blog');
            }

          }

        })
      },
      reset(){
        this.$refs['loginForm'].resetFields();
      }
    }
  }
</script>
<style scoped>
  .loginForm{
    width:25%;
    margin:250px auto;
    background-color: rgba(255,255,255,0.5)
  }
</style>

