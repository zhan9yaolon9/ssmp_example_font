<template>
    <div id="getAllBooks">
        <!-- ":data"是json数据源 -->
    <el-button @click.native="searchAll">查all</el-button>
    <el-table
      :data="info" 
      border
      style="width:100%"  
    >
      <!-- "prop"是json数据源的属性字段 -->
      <el-table-column
       
        prop="id"
        label="编号"
        width="80">
      </el-table-column>
      <el-table-column
        
        prop="type"
        label="类型"
        width="140">
      </el-table-column>
      <el-table-column
      
        prop="name"
        label="书名"
        width="180">
      </el-table-column>
      <el-table-column
        
        prop="description"
        label="描述"
        width="220">
      </el-table-column>
    </el-table>
  </div>
    
  <!--
    <div id="addBooks">
    <el-input v-model="search.n_id"></el-input>
    <el-button @click="searchId">id查询</el-button>
  </div> 
  -->
</template>

<script>
     export default{
    name:'AppIndex',
    data(){
      return{
        info:{}
      }
    },
    methods:{
      searchAll(){
        searchAllBooks(this);
      }
    }
    
      
  };
  function searchAllBooks(t){
      t.$axios.get('books')  //虚拟目录
        .then((response) =>{
          t.info = response.data.data 
          console.log(info)
        })
        .catch((err) => {
          console.log(err)
        })
      }
</script>
