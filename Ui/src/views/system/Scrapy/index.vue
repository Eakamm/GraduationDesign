<template>
  <el-card>
    <span>书籍类型:</span>
    <el-select v-model="type" placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.id"
          :label="item.type"
          :value="item.type">
        </el-option>
     </el-select>

      <span>爬取页数(一页20条数据):</span>
      <el-input v-model="page_count" style="width: 100px;" placeholder="请输入页数"></el-input>

      <el-button type="success" round @click="runScrapy">启动</el-button>
  </el-card>
</template>

<script>
  import {listBook_type2} from '@/api/system/book_type'
  import {runScrapy} from '@/api/system/scrapy'


  export default{
    data() {
      return {
        options: [],
        type: '',
        page_count: '',
        loading: false
      }
    },
    created() {
      this.getBookType()
    },
    methods:{
      getBookType(){
        listBook_type2().then(response =>{
          let data = response.data
          this.options = data
        })
      },
      runScrapy(){
        this.loading = true
        runScrapy(this.type, this.page_count).then(response=>{
          console.log(response.data)
          let data = response.data
          console.log(data[0].result)
          if(data[0].result == "爬取成功"){
            this.loading = false;
            this.$message(data[0].result);
          }else{
            this.loading = false;
            this.$message.error('爬取失败');
          }
        })
      }
    }
  }
</script>

<style>
</style>
