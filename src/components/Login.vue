<template>
    <div>
        用户名：<input type="text" v-model="loginForm.username" placeholder="请输入用户名"/>
        密码：<input type="password" v-model="loginForm.password" placeholder="请输入密码"/>
        <button v-on:click="login">登录</button>
    </div>
  </template>
  
  <script>
    export default{
        name: 'Login',
        data(){
            return {
                loginForm:{
                    username:'',
                    password:''
                },
                ResponseResult:[]
            }
        },
        //定义登录方法，向后端登录接口/login发送数据
        methods:{
            login(){
                var _this = this
                console.log(this.$store.state)
                this.$axios
                    .post('/login',{   
                        username:this.loginForm.username,
                        password:this.loginForm.password
                    })
                    .then(successResponse =>{
                        if(successResponse.data.code == 200){
                            _this.$store.commit('login',_this.loginForm)
                            var path = this.$route.query.redirect
                            this.$router.replace({
                                path: path === '/' || path === undefined ? '/test' : path
                            })
                        }
                    })
                    .catch(failResponse => {
                        
                    })
            }
        }
      }
  </script>
  

