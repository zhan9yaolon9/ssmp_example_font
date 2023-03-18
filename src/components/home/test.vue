<template>
    <div>
        <el-table :data="tabledatas" border>
            <el-table-column type="selection"></el-table-column>
            <!--字段展示-->
            <el-table-column label="id">
                <!-- slot-scope插槽域中定义一个对象（“scope”），来存储插槽上绑定的数据 -->
                <!-- scope-row 表格模板渲染数据时使用-->
                <template slot-scope="scope">   
                    {{scope.row.id}}
                </template>
            </el-table-column>
            <el-table-column label="name">
                <template slot-scope="scope">
                    <!-- 输入框使用v-show绑定scope.row.show,值为true就显示-->
                    <el-input placeholder="请输入内容" v-show="scope.row.show" v-model="scope.row.name"></el-input>
                    <span v-show="!scope.row.show">{{scope.row.name}}</span>
                </template>
            </el-table-column>
            <el-table-column label="type">
                <template slot-scope="scope">
                    <!-- 输入框使用v-show绑定scope.row.show,值为true就显示-->
                    <el-input placeholder="请输入内容" v-show="scope.row.show" v-model="scope.row.type"></el-input>
                    <span v-show="!scope.row.show">{{scope.row.type}}</span>
                </template>
            </el-table-column>
            <el-table-column label="description">
                <template slot-scope="scope">
                    <!-- 输入框使用v-show绑定scope.row.show,值为true就显示-->
                    <el-input placeholder="请输入内容" v-show="scope.row.show" v-model="scope.row.description"></el-input>
                    <span v-show="!scope.row.show">{{scope.row.description}}</span>
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button @click="scope.row.show =true">编辑</el-button>
                    <el-button @click="scope.row.show =false;save(scope.row.id,scope.row.name)">保存</el-button>
                    <el-button @click="delete1(scope.row.id)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
    export default {
        inject: ['reload'], 
        data() {
            return {
                tabledatas: [],
                book:{
                    id:'',
                    name:''
                }
            }
        },
        created() {
            this.$axios.get('books')  //虚拟目录
                .then((response) =>{
                    let list = response.data.data
                    list.forEach(element => {
                        element["show"] = false
                    });
                    this.tabledatas = list
                })
                .catch((err) => {
                    console.log(err)
                })
        },
        methods:{
            save(id,name){
                this.$axios.put('books/update',{
                    id:id,
                    name:name,
                })
                .then((successResponse =>{
                    console.log(successResponse.data.code)
                if(successResponse.data.code == 200){
                    alert("修改成功")
                }}))
                .catch(failResponse => {
                    alert("修改失败")
                })
            },
            delete1(id){
                const param = {id:id};
                this.$axios.delete('books/delete',{
                    params : param  
                })
                .then((successResponse =>{
                    console.log(successResponse.data.code)
                if(successResponse.data.code == 200){
                    alert("删除成功")
                    this.reload()
                }}))
                .catch(failResponse => {
                    alert("删除失败")
                })
            }
        }
    };
    
</script>
