<template>
  <el-container>
    <el-container>
      <el-card class="box-card">
        <el-container>
          <el-aside>
            <el-image :src="BookPriceData.pic">
              <div slot="error" class="image-slot">
                <i class="el-icon-picture-outline"></i>
              </div>
            </el-image>
          </el-aside>
          <el-main>
            <div>
              <span>书名：</span>{{BookData.title}}<br />
              <span>作者：</span>{{BookData.author}}<br />
              <span>出版时间：</span>{{BookData.publishTime}}<br />
              <span>出版社：</span>{{BookData.publisher}}<br />
              <span>原价：</span>{{BookData.originalPrice}}<br />
            </div>
          </el-main>
        </el-container>
      </el-card>

    </el-container>
    <el-footer>
      <span>最低价格：</span>{{BookPriceData.lowerPrice}}<br />
      <span>最低价格日期：</span>{{BookPriceData.lowerDate}}
    </el-footer>
    <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
      <word-cloud-chart :word-chart-data="wordCloudChartData"/>
    </el-row>
    <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
      <line-chart :chart-data="lineChartData"/>
    </el-row>
  </el-container>
</template>

<script>
  import LineChart from '@/views/dashboard/LineChart.vue'
  import WordCloudChart from '@/views/dashboard/WordCloudChart.vue'
  import {getBookHistoryPrice, getCommitsWordCloud} from '@/api/tool/ChartData.js'


  let lineChartData = {
    xData: [],
    xName: []
  }

  export default{
    name: 'history',
    components:{
      LineChart,
      WordCloudChart
    },
    data(){
      return{
        lineChartData: lineChartData,
        BookData: this.$route.query.book_data,
        BookPriceData: {},
        wordCloudChartData:[]
      }
    },
    created(){
      // console.log(lineChartData.xData);
      this.getHistoryPrice();
      this.getCommitsWorCloud();
    },
    beforeDestroy() {
      lineChartData = {
        xData: [],
        xName: []
      };
      this.wordCloudChartData = [];
    },
    methods:{
      getHistoryPrice(){
        console.log(this.BookData.jdUrl)
        getBookHistoryPrice(this.BookData.jdUrl).then(response => {
          let data = response.data;
					// console.log(data)
          this.BookPriceData = data;
          this.lineChartData.xData = data.price;
          this.lineChartData.xName = data.date;
        })
      },
      getCommitsWorCloud(){
        getCommitsWordCloud(this.BookData.douBanUrl).then(response => {
          let data = response.data;
          console.log(data)
          this.wordCloudChartData = data;
        })
      }
    }
  }
</script>

<style>
  .box-card {
      width: 1280px;
      height:270px;
      margin-left: auto;
      margin-right: auto;
      margin-top: 50px;
      margin-bottom: 30px;
   }

   .el-footer{
     width: 1280px;
     margin-left: auto;
     margin-right: auto;
   }

</style>
