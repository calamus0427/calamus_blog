<template>
  <div>
    <el-tabs tab-position="left" >
        <el-tab-pane label="综合应用图">
          <cl-charts-mix1 id="chart4" height="400px" width="700px"></cl-charts-mix1>
        </el-tab-pane>
        <el-tab-pane label="键盘图">
          <el-row :gutter="10">
            <el-col :span="12">
              <cl-charts-histogram id="chart1"></cl-charts-histogram>
            </el-col>
            <el-col :span="12">
              <cl-charts-histogram2 id="chart2"></cl-charts-histogram2>              <!-- <cl-charts-histogram2</cl-charts-histogram2> -->
            </el-col>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="折线图">
          <cl-charts-line1 id="chart3" height="400px" width="700px"></cl-charts-line1>
        </el-tab-pane>
        <el-tab-pane label="柱状图">
          <cl-charts-barchart1 id="chart20"></cl-charts-barchart1>
        </el-tab-pane>
        <el-tab-pane label="饼状图">
          <cl-charts-barchart2 id="chart21" height="500px" width="700px"></cl-charts-barchart2>
        </el-tab-pane>
        <el-tab-pane label="雷达图">
          <el-tabs tab-position="left">
            <el-tab-pane label="demo1">
              <cl-charts-radar1 id="chart13" height="400px" width="700px"></cl-charts-radar1>
            </el-tab-pane>
            <el-tab-pane label="demo2">
              <cl-charts-radar2 id="chart14" height="550px" width="700px"></cl-charts-radar2>
            </el-tab-pane>
          </el-tabs>
        </el-tab-pane>
        <el-tab-pane label="地图">敬请期待</el-tab-pane>
        <el-tab-pane label="漏斗图">
              <cl-charts-funnel1 id="chart15" height="400px" width="700px"></cl-charts-funnel1>
        </el-tab-pane>
        <el-tab-pane label="散点图">
          <cl-charts-point1   id="chart18" height="550px" width="550px"></cl-charts-point1>
        </el-tab-pane>
        <el-tab-pane label="树状图">
              <cl-charts-tree1 id="chart19" height="550px" width="700px"></cl-charts-tree1>
        </el-tab-pane>
        <el-tab-pane label="日历图">
          <el-tabs tab-position="left">
            <el-tab-pane label="demo1">
              <cl-charts-date1 id="chart11" height="590px" width="700px"></cl-charts-date1>
            </el-tab-pane>
            <el-tab-pane label="demo2">
              <cl-charts-date2 id="chart12" height="550px" width="700px"></cl-charts-date2>
            </el-tab-pane>
          </el-tabs>

        </el-tab-pane>
        <el-tab-pane label="高级应用图">敬请期待</el-tab-pane>

      </el-tabs>

  </div>
</template>
<script>
 import "../../../components/echarts/histogram/demo1.js";
 import "../../../components/echarts/histogram/demo2.js";
 import "../../../components/echarts/line/demo1.js";
 import "../../../components/echarts/mix/demo1.js";
 import "../../../components/echarts/bar/demo1.js";
 import "../../../components/echarts/bar/demo2.js";
 import "../../../components/echarts/calendar/demo1.js";
 import "../../../components/echarts/calendar/demo2.js";
 import "../../../components/echarts/radar/demo1.js";
 import "../../../components/echarts/radar/demo2.js";
 import "../../../components/echarts/funnel/demo1.js";
 import "../../../components/echarts/point/demo1.js";
 import "../../../components/echarts/tree/demo1.js";









export default{

}


</script>

<style  scoped>
  .chart{
    margin:0 auto ;
  }
</style>

