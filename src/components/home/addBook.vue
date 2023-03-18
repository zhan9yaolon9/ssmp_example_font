<template>
    <div id="addBook">
        <el-button type="primary" @click="addBookMethod" >添加书本</el-button>
            id <el-input v-model="book.id" style="width: 180px"></el-input>
            类型<el-input v-model="book.type" style="width: 180px"></el-input>
            名称<el-input v-model="book.name" style="width: 180px"></el-input>
            简介<el-input v-model="book.description" style="width: 180px"></el-input>
       
    </div>

</template>

<script>
    export default{
        data(){
            return{
                book:{
                    id:'',
                    type:'',
                    name:'',
                    description:''
                }
            }
        },
        methods:{
            addBookMethod(){
                addBook(this);
            }
        }
    };
    function addBook(t){
        t.$axios.post('books/save',{
            id:t.book.id,
            type:t.book.type,
            name:t.book.name,
            description:t.book.description
        })
            .then((successResponse =>{
                console.log(successResponse.data.code)
                if(successResponse.data.code == 200){
                    alert("增加成功")
                }
            }
            ))
            .catch(failResponse => {
                alert("增加失败")
            })
    } 
</script>