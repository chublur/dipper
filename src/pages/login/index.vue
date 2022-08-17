<template >
  <div>
    <particles></particles>
    <el-form
    :model="form"
    status-icon
    :rules="rules"
    ref="form"
    label-width="100px"
    class="background"
  >
    <div class="login">
      <p class="login-value">北斗星后台管理系统</p>
      <el-form-item
      prop="username"
      class="username"
    >
      <el-input
        type="text"
        v-model="form.username"
        autocomplete="off"
        class="login-num"
        placeholder="请输入账号"
      ></el-input>
    </el-form-item>
    <el-form-item   prop="passworc">
      <el-input
        type="password"
        v-model="form.password"
        autocomplete="off"
        placeholder="请输入密码"
        class="login-pwd"
      ></el-input>
    </el-form-item>
    <el-button class="forget">忘记密码？</el-button>
    <el-button class="login-button"
              @click="login">登录</el-button>
    </div>
    <div class="change-register-box">
          <p class="a">还没有账户？</p>
          <p class="b">点击加入我们吧</p>
          <el-button class="change-register-button">注册 &nbsp;></el-button>
        </div>
       <div class="register">
          <p class="signup-value">欢迎注册</p>
          <el-button class="reset">重新获取</el-button>
          <el-form a>
            <el-input type="text" class="signup-num" placeholder="请输入账号" />
            <el-input
              type="password"
              class="signup-pwd"
              placeholder="请输入密码"
            />
            <el-input
              type="password"
              class="signup-repwd"
              placeholder="再次输入确认密码"
            />
            <div class="random">0709</div>
            <el-input type="text" class="write" size="small" placeholder="请输入验证码" />
            <el-button class="signup-button">注册</el-button>
          </el-form>
        </div>
        <div class="change-login-box">
          <p class="c">欢迎加入</p>
          <p class="d">快去登陆看看吧</p>
          <el-button class="change-login-button">&nbsp; 登录</el-button>
        </div>
    
  </el-form>
  </div>
  
</template>
<script>
import  Mock  from 'mockjs';
import {getMenu} from '@/api/index'
import particles from "@/components/particles";
import $ from "jquery";
export default {
  name: "login",
  components: { particles },
  data() {
    return {
      form: {},
      rules: {
        username: [
          { require: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, message: "用户名长度不能少于三位", trigger: "blur" },
        ],
        password: [{ require: true, message: "请输入密码", trigger: "blur" }],
      },
    };
  },
  mounted() {
    document.addEventListener("DOMContentLoaded", function (event) {
      document.addEventListener("selectstart", function (event) {
        event.preventDefault();
      });
      document.addEventListener("contextmenu", function (event) {
        event.preventDefault();
      });
      var random_box = document.querySelector(".random");
      var btn = document.querySelector(".reset");
      var wirte = document.querySelector(".write");
      function random(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
      }
      btn.addEventListener("click", function () {
        btn.style.backgroundColor = "#fff";
        window.setTimeout(function (event) {
          btn.style.backgroundColor = "rgb(255, 224, 146)";
        }, 50);
        var randoms = random(1000, 9999);
        console.log(randoms);
        random_box.innerHTML = randoms;
      });
    });
    $(function () {
      $(".change-register-button").on("click", function () {
        $(".login").animate(
          {
            left: "240px",
          },
          400,
          function () {
            $(".login").css({ display: "none", left: "60px" });
            $(".change-register-box").css("display", "none");
            $(".register").css("display", "block");
            $(".change-login-box").css("display", "block");
          }
        );
      });
      $(".change-login-button").on("click", function () {
        $(".register").animate(
          {
            right: "240px",
          },
          400,
          function () {
            $(".register").css({ display: "none", right: "60px" });
            $(".change-login-box").css("display", "none");
            $(".login").css("display", "block");
            $(".change-register-box").css("display", "block");
          }
        );
      });
    });
  },
  methods: {
      login(){
          getMenu(this.form).then(({data:res})=>{
              console.log(res);
              if(res.code===20000){
                  this.$store.commit('clearMenu')
                  this.$store.commit('setMenu',res.data.menu)
                  this.$store.commit('setToken',res.data.token)
                  this.$store.commit('addMenu',this.$router)
                  this.$router.push({name:'home'})
              }else{
                  this.$message.warning(res.data.message)
              }
          })
        //   const token=Mock.random.guid()
        //   this.$store.commit('setToken',token)
        // //   跳转页面
        //   this.$router.push({name:'home'})
      }
  },
};
</script>
<style lang="less" scoped>
    /* 登录框样式 */
.background {
  position: absolute;
  width: 900px;
  height: 400px;
  position: absolute;
  left: 50%;
  top: 50%;
  z-index: 999;
  transform: translate(-50%, -50%);
  background-color: rgba(10, 10, 10, 0.598);
}
/* 登录框 */
.login {
  position: absolute;
  top: -12%;
  left: 60px;
  width: 600px;
  height: 500px;
  background-color: rgba(10, 10, 10, .8);
  z-index: 10;
  box-shadow: 0 0 12px 0.6px rgb(106, 106, 106);
  /* display: none; */
}
.login-value {
  width: 600px;
  font-size: 40px;
  font-weight: bold;
  color: rgb(121, 162, 185);
  padding-left: 60px;
  margin-top: 60px;
  margin-bottom: 40px;
}
.login-num /deep/ .el-input__inner {
  width: 485px;
  height: 50px;
  outline: none;
  margin-top: 5px;
  box-sizing: border-box;
  border-top: none;
  border-left: none;
  border-right: none;
  border-bottom: 2px solid rgb(182, 182, 182);
  background-color: transparent;
  font-size: 20px;
  color: grey;
}
.el-input{
  right: 40px;
}
.login-pwd /deep/ .el-input__inner{
  width: 485px;
  height: 50px;
  outline: none;
  margin-top: 30px;
  // margin-right: 60px;
  box-sizing: border-box;
  border-top: none;
  border-left: none;
  border-right: none;
  border-bottom: 2px solid rgb(182, 182, 182);
  background-color: transparent;
  font-size: 20px;
  color: grey;
}
.forget {
  position: absolute;
  bottom: 90px;
  left: 60px;
  width: 220px;
  height: 60px;
  border: 1.5px solid rgb(151, 151, 151);
  background-color: transparent;
  font-size: 18px;
  font-weight: bold;
  letter-spacing: 2px;
  color: rgb(113, 113, 113);
}
.forget:hover {
  color: #fff;
  background-color: #79a2b9;
}
 .login-button   {
  position: absolute;
  bottom: 90px;
  right: 60px;
  width: 220px;
  height: 60px;
  border: none;
  background-color: rgb(121, 162, 185);
  font-size: 20px;
  font-weight: bold;
  letter-spacing: 10px;
  color: rgb(255, 255, 255);
  text-shadow: 1px 1px 1px rgb(138, 138, 138);
}
.login-button:hover {
  // background-color: rgb(121, 162, 185);
  color: #fff;
  background-color: #386783;
}
/* 切换注册框的盒子 */
.change-register-box {
  position: absolute;
  right: 0px;
  width: 240px;
  height: 400px;
  background-color: transparent;
  /* display: none; */
}
.a {
  position: absolute;
  top: 90px;
  left: 62px;
  font-size: 18px;
  font-weight: bold;
  color: rgba(255, 255, 255, 0.846);
  letter-spacing: 2px;
}
.b {
  position: absolute;
  top: 140px;
  left: 46px;
  font-size: 18px;
  font-weight: bold;
  color: rgba(255, 255, 255, 0.858);
  letter-spacing: 2px;
}
.change-register-button {
  position: absolute;
  left: 46px;
  bottom: 120px;
  width: 140px;
  height: 50px;
  border: 1.5px solid #fff;
  background-color: transparent;
  letter-spacing: 2px;
  color: #fff;
  font-size: 16px;
  font-weight: bold;
  border-radius: 5px;
}
.change-register-button:hover {
  border: 1.5px solid rgb(217, 217, 217);
  color: rgb(217, 217, 217);
}
/* 注册框 */
.register {
  position: absolute;
  top: -12%;
  right: 60px;
  width: 600px;
  height: 500px;
  background-color: rgba(10, 10, 10, .8);
  display: none;
  z-index: 10;
  box-shadow: 0 0 12px 0.6px rgb(106, 106, 106);
}

.change-login-box {
  position: absolute;
  left: 0;
  width: 240px;
  height: 400px;
  background-color: transparent;
  display: none;
}
.signup-value  {
  width: 600px;
  font-size: 40px;
  font-weight: bold;
  color: rgb(121, 162, 185);
  padding-left: 40px;
  margin-top: 30px;
  margin-bottom: 45px;
}
.signup-num /deep/ .el-input__inner{
  width: 485px;
  height: 50px;
  outline: none;
  margin-top: -18px;
  margin-left: 60px;
  box-sizing: border-box;
  border-top: none;
  border-left: none;
  border-right: none;
  border-bottom: 2px solid rgb(182, 182, 182);
  background-color: transparent;
  font-size: 20px;
  color: grey;
}
.signup-pwd /deep/ .el-input__inner{
  width: 485px;
  height: 50px;
  outline: none;
  margin-top: 15px;
  margin-left: 60px;
  box-sizing: border-box;
  border-top: none;
  border-left: none;
  border-right: none;
  border-bottom: 2px solid rgb(182, 182, 182);
  background-color: transparent;
  font-size: 20px;
  color: grey;
}
.signup-repwd /deep/ .el-input__inner{
  width: 485px;
  height: 50px;
  outline: none;
  margin-top: 15px;
  margin-left: 60px;
  box-sizing: border-box;
  border-top: none;
  border-left: none;
  border-right: none;
  border-bottom: 2px solid rgb(182, 182, 182);
  background-color: transparent;
  font-size: 20px;
  color: grey;
}
.random {
  position: absolute;
  top: 305px;
  left: 40px;
  width: 120px;
  height: 50px;
  border: 1px solid #ccc;
  border-radius: 10%;
  line-height: 47px;
  text-align: center;
  font-size: 27px;
  font-weight: bold;
  letter-spacing: 3px;
  background-color: rgb(221, 246, 255);
  color: grey;
}
.reset {
  position: absolute;
  top: 305px;
  left: 186px;
  width: 150px;
  height: 50px;
  border: 1px solid #ccc;
  line-height: 25px;
  text-align: center;
  font-size: 16px;
  font-weight: 600;
  letter-spacing: 3px;
  background-color: #719bb2;
  color: #fff;
  /* text-shadow: 2px 1px 1px grey; */
}
.reset:hover{
  color: #fff;
  background-color: #0c3f5c;
}
.write /deep/ .el-input__inner{
  position: absolute;
  top: 16px;
  right: 28px;
  width: 180px;
  height: 47px;
  border: 1px solid #ccc;
  outline: none;
  font-size: 22px;
  padding-left: 10px;
}
.signup-button {
  position: absolute;
  bottom: 50px;
  right: 60px;
  width: 482px;
  height: 60px;
  border: none;
  background-color: rgb(121, 162, 185);
  font-size: 20px;
  font-weight: bold;
  letter-spacing: 15px;
  color: rgb(255, 255, 255);
  text-shadow: 1px 1px 1px rgb(138, 138, 138);
}
.signup-button:hover {
  color: #fff;
  background-color: rgb(12, 63, 92);
}
.c {
  position: absolute;
  top: 90px;
  left: 79px;
  font-size: 18px;
  font-weight: bold;
  color: rgba(255, 255, 255, 0.846);
  letter-spacing: 2px;
}
.d {
  position: absolute;
  top: 140px;
  left: 46px;
  font-size: 18px;
  font-weight: bold;
  color: rgba(255, 255, 255, 0.858);
  letter-spacing: 2px;
}
.change-login-button {
  position: absolute;
  left: 46px;
  bottom: 120px;
  width: 140px;
  height: 50px;
  padding-right: 35px;
  border: 1.5px solid #fff;
  background-color: transparent;
  letter-spacing: 3px;
  color: #fff;
  font-size: 18px;
  font-weight: bold;
  border-radius: 5px;
}
.change-login-button:hover {
  border: 1.5px solid rgb(217, 217, 217);
  color: #181818
}
</style>


