<template>
  <div>
    <el-table :data="tabledatas">
      <el-table-column type="selection"></el-table-column>
      <!--字段展示-->
      <el-table-column label="id">
        <!-- slot-scope插槽域中定义一个对象（“scope”），来存储插槽上绑定的数据 -->
        <!-- scope-row 表格模板渲染数据时使用-->
        <template slot-scope="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>
      <el-table-column label="name">
        <template slot-scope="scope">
          <!-- 输入框使用v-show绑定scope.row.show,值为true就显示-->
          <el-input
            placeholder="请输入内容"
            v-show="scope.row.show"
            v-model="scope.row.name"
          ></el-input>
          <span v-show="!scope.row.show">{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="type">
        <template slot-scope="scope">
          <!-- 输入框使用v-show绑定scope.row.show,值为true就显示-->
          <el-input
            placeholder="请输入内容"
            v-show="scope.row.show"
            v-model="scope.row.type"
          ></el-input>
          <span v-show="!scope.row.show">{{ scope.row.type }}</span>
        </template>
      </el-table-column>
      <el-table-column label="description">
        <template slot-scope="scope">
          <!-- 输入框使用v-show绑定scope.row.show,值为true就显示-->
          <el-input
            placeholder="请输入内容"
            v-show="scope.row.show"
            v-model="scope.row.description"
          ></el-input>
          <span v-show="!scope.row.show">{{ scope.row.description }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button @click="scope.row.show = true">编辑</el-button>
          <el-button
            @click="
              scope.row.show = false
              save(scope.row.id, scope.row.name)
            "
            >保存</el-button
          >
          <el-button @click="delete1(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--分页栏-->
    <div style="display: inline-block">
      <el-pagination
        style="padding-top: 15px"
        @size-change="findSizeChange"
        @current-change="findPage"
        :current-page.sync="pageNow"
        :page-sizes="[2, 4, 6, 8, 10]"
        :page-size="size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </div>
  </div>
</template>
<script>
export default {
  inject: ["reload"],
  data() {
    return {
      tabledatas: [],
      //每页显示的条数
      size: 8,
      //总条数
      total: 0,
      //当前页码
      pageNow: 1,
    }
  },
  created() {
    //调用分页的查询所有书
    this.findAll(this.pageNow, this.size)
    //被替代：查询所有书本信息方法
    // this.$axios
    //   .get("books/paging?pn=1") //虚拟目录
    //   .then((response) => {
    //     let list = response.data
    //     list.forEach((element) => {
    //       element["show"] = false
    //     })
    //     this.tabledatas = list
    //   })
    //   .catch((err) => {
    //     console.log(err)
    //   }),
  },
  methods: {
    save(id, name) {
      this.$axios
        .put("books/update", {
          id: id,
          name: name,
        })
        .then((successResponse) => {
          console.log(successResponse.data.code)
          if (successResponse.data.code == 200) {
            alert("修改成功")
          }
        })
        .catch((failResponse) => {
          alert("修改失败")
        })
    },
    delete1(id) {
      const param = { id: id }
      this.$axios
        .delete("books/delete", {
          params: param,
        })
        .then((successResponse) => {
          console.log(successResponse.data.code)
          if (successResponse.data.code == 200) {
            alert("删除成功")
            this.reload()
          }
        })
        .catch((failResponse) => {
          alert("删除失败")
        })
    },
    //用来处理每页显示记录发生变化的方法
    findSizeChange(size) {
      console.log("当每页条数改变的时候" + size)
      //将val赋值给size
      this.size = size
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
      page = page ? page : this.pageNow
      size = size ? size : this.size
      // this.$http.get("http://localhost:80/books/findByPage?pageNow="+page+"&pageSize="+size).then(response => {
      this.$axios
        .get("books/findByPage", {
          params: {
            pageNow: page,
            pageSize: size,
          },
        })
        .then((response) => {
          that.tabledatas = response.data.books
          that.total = response.data.total
        })
        .catch((err) => {
          console.log(err)
        })
    },
  },
}
</script>
<style src="@/components/style/testStyle.css" scoped></style>
