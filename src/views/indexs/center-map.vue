<!--
 * @Author: daidai
 * @Date: 2022-03-01 11:17:39
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-09-29 15:50:18
 * @FilePath: \web-pc\src\pages\big-screen\view\indexs\center-map.vue
-->
<template>
  <div class="centermap">
    <!-- <div class="maptitle">
      <div class="zuo"></div>
      <span class="titletext">{{ maptitle }}</span>
      <div class="you"></div>
    </div> -->
    <div class="mapwrap">
      <dv-border-box-13>
        <div class="quanguo" @click="getData('china')" v-if="code !== 'china'">
          中国
        </div>

        <Echart id="CenterMap" :options="options" ref="CenterMap" />
      </dv-border-box-13>
    </div>
  </div>
</template>

<script>
import xzqCode from "../../utils/map/xzqCode";
import { currentGET } from "api/modules";
import * as echarts from "echarts";
import { GETNOBASE } from "api";
export default {
  data() {
    return {
      maptitle: "设备分布图",
      options: {},
      code: "china", //china 代表中国 其他地市是行政编码
      echartBindClick: false,
      isSouthChinaSea: false, //是否要展示南海群岛  修改此值请刷新页面
    };
  },
  created() {},

  mounted() {
    // console.log(xzqCode);
    this.getData("china");
  },
  methods: {
    getData(code) {
      currentGET("big8", { regionCode: code }).then((res) => {
        console.log("设备分布", res);
        if (res.success) {
          this.getGeojson(res.data.regionCode, res.data.dataList);
          this.mapclick();
        } else {
          this.$Message.warning(res.msg);
        }
      });
    },
    /**
     * @description: 获取geojson
     * @param {*} name china 表示中国 其他省份行政区编码
     * @param {*} mydata 接口返回列表数据
     * @return {*}
     */
    async getGeojson(name, mydata) {
      this.code = name;
      //如果要展示南海群岛并且展示的是中国的话
      let geoname=name
      if (this.isSouthChinaSea && name == "china") {
        geoname = "chinaNanhai";
      }
      //如果有注册地图的话就不用再注册 了
      let mapjson = echarts.getMap(name);
      if (mapjson) {
        mapjson = mapjson.geoJSON;
      } else {
        mapjson = await GETNOBASE(`./map-geojson/${geoname}.json`).then((res) => {
          return res;
        });
        echarts.registerMap(name, mapjson);
      }
      let cityCenter = {};
      let arr = mapjson.features;
      //根据geojson获取省份中心点
      arr.map((item) => {
        cityCenter[item.properties.name] =
          item.properties.centroid || item.properties.center;
      });
      let newData = [];
      mydata.map((item) => {
        if (cityCenter[item.name]) {
          newData.push({
            name: item.name,
            value: cityCenter[item.name].concat(item.value),
          });
        }
      });
      this.init(name, mydata, newData);
    },
    init(name, data, data2) {
      
      var data = 
      [
        {
          name: "库尔勒",
          value:[86.15528 , 41.76602],
          type:'green'
        },
        {
          name: '拉萨',
          value: [91.132212, 29.660361],
          type: 'green'
        },
        {
          name: '敦煌',
          value: [94.66159, 40.14211],
          type: 'green'
        },
        {
          name: '西安',
          value: [108.948024,34.263161],
          type: 'green'
        }
      ];
    
      let option = {
        backgroundColor: "black",
        geo: {
          map: "china",
          aspectScale: 0.8,
          layoutCenter: ["50%", "50%"],
          layoutSize: "120%",
          // roam: true, //是否开启平游或缩放
          itemStyle: {
            normal: {
                areaColor: {
                  type: "linear-gradient",
                  x: 0,
                  y: 1200,
                  x2: 1000,
                  y2: 0,
                  colorStops: [
                    {
                      offset: 0,
                      color: "#152E6E", // 0% 处的颜色
                    },
                    {
                      offset: 1,
                      color: "#0673AD", // 50% 处的颜色
                    },
                  ],
                  global: true, // 缺省为 false
                },
                shadowColor: "#0f5d9d",
                shadowOffsetX: 0,
                shadowOffsetY: 15,
                opacity: 0.5,
            },
            emphasis: {
                areaColor: "#0f5d9d",
            },
          },
          regions: [
            {
              name: "南海诸岛",
              itemStyle: {
                areaColor: "rgba(0, 10, 52, 1)",
                borderColor: "rgba(0, 10, 52, 1)",
                normal: {
                opacity: 0,
                label: {
                    show: false,
                    color: "#009cc9",
                },
                },
              },
              label: {
                show: false,
                // color: "#FFFFFF",
                // fontSize: 12,
              },
            },
          ],
        },
        series: [
          {
            type: "map",
            selectedMode: "multiple",
            mapType: "china",
            aspectScale: 0.8,
            layoutCenter: ["50%", "50%"], //地图位置
            layoutSize: "120%",
            zoom: 1, //当前视角的缩放比例
            // roam: true, //是否开启平游或缩放
            scaleLimit: {
              //滚轮缩放的极限控制
              min: 1,
              max: 2,
            },
            label: {
              show: false,
              color: "#FFFFFF",
              fontSize: 16,
            },
            itemStyle: {
              areaColor: "#0c3653",
              borderColor: "#1cccff",
              borderWidth: 1.8
            },
            emphasis: {
              itemStyle: {
                areaColor: "#0c3653",
                show: true,
              },
              label: {
                color: "#fff"
              },
            },
            select: {
              label: {
                show: false,
                color: '#FFF',
              },
              itemStyle: {
                areaColor: "#0c3653"
              }
            },
            data: data,
          },
          {
              name: '监测点',
              type: 'effectScatter',
              coordinateSystem: 'geo',//该系列使用的坐标系
              label: {
                normal: {
                  show: true,
                  formatter: val =>{
                    return val.name
                  },
                  fontSize: 20,
                }
              },
              rippleEffect: {
                number: 15, // 波纹数量
                period: 1, // 动画周期 数值越大，波动越慢
                scale: 5, // 动画中波纹的最大缩放比例
                brushType: 'stroke' // 波纹的绘制方式 stroke fill
              },
              symbol: 'circle',
              symbolSize: 30,
              itemStyle: {
                color: params => {
                  return params.data.type;
                }//标志颜色
              },
              data:data,
              rippleEffect: {
                brushType: 'stroke'
              },
              hoverAnimation: true,
              zlevel: 1
          },
          
        ],
        legend: {
          left: 'right',
          data: ['第一产业', '第二产业', '第三产业'],
        },
      };
      this.options = option;
    },
    message(text) {
      this.$Message({
        text: text,
        type: "warning",
      });
    },
    mapclick() {
      if (this.echartBindClick) return;
      //单击切换到级地图，当mapCode有值,说明可以切换到下级地图
      this.$refs.CenterMap.chart.on("click", (params) => {
        // console.log(params);
        let xzqData = xzqCode[params.name];
        if (xzqData) {
          this.getData(xzqData.adcode);
        } else {
          this.message("暂无下级地市!");
        }
      });
      this.echartBindClick = true;
    },
  },
};
</script>
<style lang="scss" scoped>
.centermap {
  margin-bottom: 30px;

  .maptitle {
    height: 60px;
    display: flex;
    justify-content: center;
    padding-top: 10px;
    box-sizing: border-box;

    .titletext {
      font-size: 28px;
      font-weight: 900;
      letter-spacing: 6px;
      background: linear-gradient(
        92deg,
        #0072ff 0%,
        #00eaff 48.8525390625%,
        #01aaff 100%
      );
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      margin: 0 10px;
    }

    .zuo,
    .you {
      background-size: 100% 100%;
      width: 29px;
      height: 20px;
      margin-top: 8px;
    }

    .zuo {
      background: url("../../assets/img/xiezuo.png") no-repeat;
    }

    .you {
      background: url("../../assets/img/xieyou.png") no-repeat;
    }
  }

  .mapwrap {
    height: 450px;
    width: 100%;
    // padding: 0 0 10px 0;
    box-sizing: border-box;
    position: relative;

    .quanguo {
      position: absolute;
      right: 20px;
      top: -46px;
      width: 80px;
      height: 28px;
      border: 1px solid #00eded;
      border-radius: 10px;
      color: #00f7f6;
      text-align: center;
      line-height: 26px;
      letter-spacing: 6px;
      cursor: pointer;
      box-shadow: 0 2px 4px rgba(0, 237, 237, 0.5),
        0 0 6px rgba(0, 237, 237, 0.4);
    }
  }
}
</style>
