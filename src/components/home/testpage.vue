<template>
    <!--分页组件-->
    <div style="display:inline-block;">
          <el-pagination
            style="padding-top: 15px"
            @size-change="findSizeChange"
            @current-change="findPage"
            :current-page.sync="pageNow"
            :page-sizes="[2,4,6,8,10]"
            :page-size="size"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
          </el-pagination>
        </div>
</template>
<script>
   export default {
    name: "Books",
    data() {
      return {
       bookList:{
            id:'',
            type:'',
            name:'',
            description:''
       },
       //每页显示的条数
        size: 4,
        //总条数
        total: 0,
        //当前页码
        pageNow: 1,
        }
    },
    created(){
        this.findAll(this.pageNow, this.size);
    },
    methods: {
      //用来处理每页显示记录发生变化的方法
      findSizeChange(size) {
        console.log("当每页条数改变的时候" + size);
        //将val赋值给size
        this.size = size;
        //重新去后台查询数据
        this.findAll()
      },
      //当前页码改变的时候
      findPage() {
        console.log(this.pageNow)
        this.findAll(this.pageNow, this.size)
      },
        //查询所有用户信息
      findAll(page, size) {
        var that = this
        //首次进入该页面时会是created调用这个方法，是不会进行传参的
        page = page ? page : this.pageNow;
        size = size ? size : this.size;
        // this.$http.get("http://localhost:80/books/findByPage?pageNow="+page+"&pageSize="+size).then(response => {
        this.$axios.get("books/findByPage",{
          params:{
            pageNow:page,
            pageSize:size
          }}
        ).then(response => {
          that.bookList = response.data.books;
          that.total = response.data.totals;
        }).catch(err => {
          console.log(err )
        })
        // console.log("显示用户所有信息" + response.data.users);
      }
    }
}
    
    
</script>
