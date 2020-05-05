<template>
  <div class="dashboard-editor-container">


    <el-row style="background:#fff;padding:16px 16px 0;margin-left: auto;margin-right: auto;margin-bottom:32px; width: 1280px;">
      <span style="font-size: 18px;margin: auto;">当前最热书籍</span>
      <el-divider></el-divider>
      <word-cloud-chart :word-chart-data="wordCloudChartData"></word-cloud-chart>
    </el-row>

    <el-row style="background:#fff;padding:16px 16px 0;margin-left: auto;margin-right: auto;margin-bottom:32px; width: 1280px;">
      <panel-group @handleSetLineChartData="handleSetLineChartData" :number="number"/>
      <el-row :gutter="32">
        <el-col :xs="34" :sm="34" :lg="8">
          <div class="chart-wrapper">
            <bar-chart :chart-data="BarChartData"/>
          </div>
        </el-col>
      </el-row>
    </el-row>

  </div>
</template>

<script>
import PanelGroup from './dashboard/PanelGroup'
import LineChart from './dashboard/LineChart'
import RaddarChart from './dashboard/RaddarChart'
import PieChart from './dashboard/PieChart'
import BarChart from './dashboard/BarChart'
import WordCloudChart from './dashboard/WordCloudChart.vue'
import {getBookHistoryPrice, getMostWatchedBook, getBookNumbersByAttributes} from '@/api/tool/ChartData.js'

const BarChartData = {
    xData: [],
    xName: []
}

const number = {
  rate:0,
  publisher: 0
}

export default {
  name: 'Index',
  components: {
    PanelGroup,
    LineChart,
    RaddarChart,
    PieChart,
    BarChart,
    WordCloudChart
  },
  created() {
    this.getBarChartData("rate")
    this.getTop250CloudChart()
  },
  data() {
    return {
      BarChartData: BarChartData,
      wordCloudChartData: [],
      number: number
    }
  },
  methods: {
    handleSetLineChartData(type) {
      this.getBarChartData(type)
    },
    // 柱状图
    getBarChartData(type){
      // console.log(type)
      getBookNumbersByAttributes(type).then(response => {
        let data = response.data;
        this.BarChartData.xName = data.xData;
        this.BarChartData.xData = data.data;
        // if (type == "rate")
        //   this.number.rate = data.number;
        this.number[type] = data.number

        // console.log(this.BarChartData)
        // console.log(this.number)
      });
    },
    // Top250图书词云
    getTop250CloudChart(){
      getMostWatchedBook().then(response => {
        let data = response.data;
        // console.log(data)
        this.wordCloudChartData = data;
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard-editor-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  position: relative;

  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }

}

@media (max-width:1024px) {
  .chart-wrapper {
    padding: 8px;
  }
}

</style>
