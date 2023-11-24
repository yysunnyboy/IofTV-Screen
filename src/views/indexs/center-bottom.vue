<template>
 

 
    <div class="center_bottom">
      <!-- <Echart
        :options="options"
        id="bottomLeftChart"
        class="echarts_bottom"
      ></Echart> -->
        <div class="item one">
          <div class="left">
            <p class="point_title text_bg mgb5">西安站</p>
            <p class="point_title_third text_bg mgb5">机房</p>
            <p class="point_title_third text_bg mgb5">控制室</p>
            <p class="point_title_third text_bg mgb5">室外天线</p>
          </div>
          <div class="right">
            <img  class="img_item" object-fit="cover" src="../../assets/img/001.png" alt="">
          </div>
        </div>
        <div class="item two">
          <div class="right">
            <img  class="img_item" src="../../assets/img/002.png" alt="">
          </div>
          <div class="left">
            <p class="point_title text_bg mgb5">库尔勒站</p>
            <p class="point_title_third text_bg mgb5">机房</p>
            <p class="point_title_third text_bg mgb5">控制室</p>
            <p class="point_title_third text_bg mgb5">室外天线</p>
          </div>
        
        </div>
        <div class="item three">
          <div class="left">
            <p class="point_title text_bg mgb5">敦煌站</p>
            <p class="point_title_third text_bg mgb5">机房</p>
            <p class="point_title_third text_bg mgb5">控制室</p>
            <p class="point_title_third text_bg mgb5">室外天线</p>
          </div>
          <div class="right">
            <img  class="img_item"  src="../../assets/img/003.png" alt="">
          </div>
        </div>
        <div class="item four">
          <div class="right">
            <img  class="img_item" src="../../assets/img/004.png" alt="">
          </div>
          <div class="left">
            <p class="point_title text_bg mgb5">拉萨站</p>
            <p class="point_title_third text_bg mgb5">机房</p>
            <p class="point_title_third text_bg mgb5">控制室</p>
            <p class="point_title_third text_bg mgb5">室外天线</p>
          </div>
        
        </div>
    </div>
 
</template>

<script>
import { currentGET } from "api";
import { graphic } from "echarts";
export default {
  data() {
    return {
      options: {},
    };
  },
  props: {},
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      this.pageflag = true;
      currentGET("big6", { companyName: this.companyName }).then((res) => {
        console.log("安装计划", res);
        if (res.success) {
          this.init(res.data);
        } else {
          this.pageflag = false;
          this.$Message({
            text: res.msg,
            type: "warning",
          });
        }
      });
    },
    init(newData) {
      this.options = {
        tooltip: {
          trigger: "axis",
          backgroundColor: "rgba(0,0,0,.6)",
          borderColor: "rgba(147, 235, 248, .8)",
          textStyle: {
            color: "#FFF",
          },
          formatter: function (params) {
            // 添加单位
            var result = params[0].name + "<br>";
            params.forEach(function (item) {
              if (item.value) {
                if (item.seriesName == "安装率") {
                  result +=
                    item.marker +
                    " " +
                    item.seriesName +
                    " : " +
                    item.value +
                    "%</br>";
                } else {
                  result +=
                    item.marker +
                    " " +
                    item.seriesName +
                    " : " +
                    item.value +
                    "个</br>";
                }
              } else {
                result += item.marker + " " + item.seriesName + " :  - </br>";
              }
            });
            return result;
          },
        },
        legend: {
          data: ["已安装", "计划安装", "安装率"],
          textStyle: {
            color: "#B4B4B4",
          },
          top: "0",
        },
        grid: {
          left: "50px",
          right: "40px",
          bottom: "30px",
          top: "20px",
        },
        xAxis: {
          data: newData.category,
          axisLine: {
            lineStyle: {
              color: "#B4B4B4",
            },
          },
          axisTick: {
            show: false,
          },
        },
        yAxis: [
          {
            splitLine: { show: false },
            axisLine: {
              lineStyle: {
                color: "#B4B4B4",
              },
            },

            axisLabel: {
              formatter: "{value}",
            },
          },
          {
            splitLine: { show: false },
            axisLine: {
              lineStyle: {
                color: "#B4B4B4",
              },
            },
            axisLabel: {
              formatter: "{value}% ",
            },
          },
        ],
        series: [
          {
            name: "已安装",
            type: "bar",
            barWidth: 10,
            itemStyle: {
              borderRadius: 5,
              color: new graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: "#956FD4" },
                { offset: 1, color: "#3EACE5" },
              ]),
            },
            data: newData.barData,
          },
          {
            name: "计划安装",
            type: "bar",
            barGap: "-100%",
            barWidth: 10,
            itemStyle: {
              borderRadius: 5,
              color: new graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: "rgba(156,107,211,0.8)" },
                { offset: 0.2, color: "rgba(156,107,211,0.5)" },
                { offset: 1, color: "rgba(156,107,211,0.2)" },
              ]),
            },
            z: -12,
            data: newData.lineData,
          },
          {
            name: "安装率",
            type: "line",
            smooth: true,
            showAllSymbol: true,
            symbol: "emptyCircle",
            symbolSize: 8,
            yAxisIndex: 1,
            itemStyle: {
              color: "#F02FC2",
            },
            data: newData.rateData,
          },
        ],
      };
    },
  },
};
</script>
<style lang="scss" scoped>
.center_bottom {
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-wrap: wrap;
  .item{
    width: 48%;
    height: 46%;
    float: left;
    box-sizing: border-box;
    display: flex;
    &.one,&.three{
      margin-right: 5px;
    }
    .left{
      width: 30%;
      height: 100%;
      .mgb5{
        margin-bottom: 5px;
      }
      .text_bg{
        background: linear-gradient(
          92deg, #1c406c 0%, #368d95 48.8525390625%, #01aaff 100%
      );
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      }
      .point_title{
        font-size: 16px;
        height: 22px;
        line-height: 22px;
      }
      .point_title_sub{
        font-size: 18px;
        height: 20px;
        line-height: 20px;
      }
      .point_title_third{
        font-size: 14px;
        height: 20px;
        line-height: 20px;
      }
    }
    .right{
      // width: 80%;
      flex: 1;
      height: 100%;
      .img_item{
        width: 100%;
        height: 100%;
        object-fit:cover;
      }
    }
  
    &.two,&.four{
      .right{
        margin-right: 5px;
      }
    }
  }
}
</style>
