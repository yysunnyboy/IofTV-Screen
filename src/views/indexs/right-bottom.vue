<!--
 * @Author: daidai
 * @Date: 2022-03-01 15:27:58
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-05-07 11:24:14
 * @FilePath: \web-pc\src\pages\big-screen\view\indexs\right-center.vue
-->
<template>
  <div v-if="pageflag" class="right_center_wrap beautify-scroll-def" :class="{ 'overflow-y-auto': !sbtxSwiperFlag }">
    <component :is="components" :data="list" :class-option="defaultOption">
      <ul class="right_center ">
        <li class="right_center_item" v-for="(item, i) in list" :key="i">
          <span class="orderNum">{{ i + 1 }}</span>
          <div class="inner_right">
            <div class="dibu"></div>
            <div class="flex">
              <div class="info">
                <span class="labels ">设备ID：</span>
                <span class="contents zhuyao"> {{ item.gatewayno }}</span>
              </div>
              <!-- <div class="info">
                <span class="labels">型号：</span>
                <span class="contents "> {{ item.terminalno }}</span>
              </div>
              <div class="info">
                <span class="labels">告警值：</span>
                <span class="contents warning"> {{ item.alertvalue | montionFilter }}</span>
              </div> -->
              <div class="info time">
                <span class="labels">时间：</span>
                <span class="contents" style="font-size:12px"> {{ item.createtime }}</span>
              </div>
            </div>
            <div class="flex">
              <!-- <div class="info">
                <span class="labels"> 地址：</span>
                <span class="contents ciyao" style="font-size:12px"> {{ item.provinceName }}/{{ item.cityName }}/{{ item.countyName }}</span>
              </div> -->
            </div>
            <div class="flex">
              <div class="info">
                <span class="labels">报警内容：</span>
                <span class="contents ciyao" :class="{ warning: item.alertdetail }"> {{ item.warnText || '无'
                }}</span>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </component>
  </div>
  <Reacquire v-else @onclick="getData" style="line-height:200px" />

</template>

<script>
import { currentGET } from 'api/modules'
import vueSeamlessScroll from 'vue-seamless-scroll'  // vue2引入方式
import Kong from '../../components/kong.vue'
export default {
  components: { vueSeamlessScroll, Kong },

  data() {
    return {
      list: [],
      pageflag: true,
      defaultOption: {
        ...this.$store.state.setting.defaultOption,
        limitMoveNum: 2, 
        singleHeight: 250, 
        step:0,
      }

    };
  },
  computed: {
    sbtxSwiperFlag() {
      let ssyjSwiper = this.$store.state.setting.ssyjSwiper
      if (ssyjSwiper) {
        this.components = vueSeamlessScroll
      } else {
        this.components = Kong
      }
      return ssyjSwiper
    }
  },
  created() {
    this.getData()
  },

  mounted() { },
  methods: {
    getData() {
      this.pageflag = true
      // this.pageflag =false
      currentGET('big5', { limitNum: 50 }).then(res => {
        console.log('实时预警', res);
        if (res.success) {
          // this.list = res.data.list
          this.list =  [
            {
              "provinceName":"吉林省",
              "cityName":"天津市",
              "countyName":"仁爱乡",
              "deviceId":"6c512d754bbcd6d7cd86abce0e0cac58",
              "onlineState":0,
              "createTime":"2023-11-20 20:06:15",
              "gatewayno":10000,
              "deviceName": "增强型罗兰授时监测接收机",
              "warnText":"增强型罗兰授时监测接收机报警",
            },
            {
              "provinceName":"吉林省",
              "cityName":"天津市",
              "countyName":"仁爱乡",
              "deviceId":"6c512d754bbcd6d7cd86abce0e0cac58",
              "onlineState":0,
              "createTime":"2023-10-29 21:10:23",
              "gatewayno":10001,
              "deviceName": "频率比对测量系统",
              "warnText":"频率比对测量系统报警",
            },
            {
              "provinceName":"吉林省",
              "cityName":"天津市",
              "countyName":"仁爱乡",
              "deviceId":"6c512d754bbcd6d7cd86abce0e0cac58",
              "onlineState":0,
              "createTime":"2023-10-26 08:15:13",
              "gatewayno":10003,
              "deviceName": "频率分配设备",
              "warnText":"频率分配设备报警",
            },
            {
              "provinceName":"吉林省",
              "cityName":"天津市",
              "countyName":"仁爱乡",
              "deviceId":"6c512d754bbcd6d7cd86abce0e0cac58",
              "onlineState":0,
              "createTime":"2023-10-27 06:14:35",
              "gatewayno":10004,
              "deviceName": "脉冲分配设备",
              "warnText":"脉冲分配设备报警",
            },
            {
              "provinceName":"吉林省",
              "cityName":"天津市",
              "countyName":"仁爱乡",
              "deviceId":"6c512d754bbcd6d7cd86abce0e0cac58",
              "onlineState":0,
              "createTime":"2023-10-19 12:45:07",
              "gatewayno":10006,
              "deviceName": "eLORAN发播信号",
              "warnText":"eLORAN发播信号报警",
            },
            {
              "provinceName":"吉林省",
              "cityName":"天津市",
              "countyName":"仁爱乡",
              "deviceId":"6c512d754bbcd6d7cd86abce0e0cac58",
              "onlineState":0,
              "createTime":"2023-11-19 13:46:14",
              "gatewayno":10007,
              "deviceName": "监测接收机",
              "warnText":"监测接收机报警",
            },
            {
              "provinceName":"吉林省",
              "cityName":"天津市",
              "countyName":"仁爱乡",
              "deviceId":"6c512d754bbcd6d7cd86abce0e0cac58",
              "onlineState":0,
              "createTime":"2023-10-17 11:24:10",
              "gatewayno":10005,
              "deviceName": "ASF测量系统",
              "warnText":"ASF测量系统报警",
            },
            {
              "provinceName":"吉林省",
              "cityName":"天津市",
              "countyName":"仁爱乡",
              "deviceId":"6c512d754bbcd6d7cd86abce0e0cac58",
              "onlineState":0,
              "createTime":"2023-11-14 20:35:47",
              "gatewayno":10008,
              "deviceName": "网络时间服务器",
              "warnText":"网络时间服务器报警",
            },
            {
              "provinceName":"吉林省",
              "cityName":"天津市",
              "countyName":"仁爱乡",
              "deviceId":"6c512d754bbcd6d7cd86abce0e0cac58",
              "onlineState":0,
              "createTime":"2023-11-14 20:35:47",
              "gatewayno":10009,
              "deviceName": "电源upS",
              "warnText":"电源UPS报警",
            },
          ]
          let timer = setTimeout(() => {
              clearTimeout(timer)
              this.defaultOption.step= this.$store.state.setting.defaultOption.step
          }, this.$store.state.setting.defaultOption.waitTime);
        } else {
          this.pageflag = false
          this.$Message.warning(res.msg)
        }
      })
    },

  },
};
</script>
<style lang='scss' scoped>
.right_center {
  width: 100%;
  height: 100%;

  .right_center_item {
    display: flex;
    align-items: center;
    justify-content: center;
    height: auto;
    padding: 10px;
    font-size: 14px;
    color: #fff;

    .orderNum {
      margin: 0 20px 0 -20px;
    }


    .inner_right {
      position: relative;
      height: 100%;
      width: 400px;
      flex-shrink: 0;
      line-height: 1.5;

      .dibu {
        position: absolute;
        height: 2px;
        width: 104%;
        background-image: url("../../assets/img/zuo_xuxian.png");
        bottom: -12px;
        left: -2%;
        background-size: cover;
      }
    }

    .info {
      margin-right: 10px;
      display: flex;
      align-items: center;

      .labels {
        flex-shrink: 0;
        font-size: 12px;
        color: rgba(255, 255, 255, 0.6);
      }

      .zhuyao {
        color: $primary-color;
        font-size: 15px;
      }

      .ciyao {
        color: rgba(255, 255, 255, 0.8);
      }

      .warning {
        color: #E6A23C;
        font-size: 15px;
      }
    }

  }
}

.right_center_wrap {
  overflow: hidden;
  width: 100%;
  height: 250px;
}

.overflow-y-auto {
  overflow-y: auto;
}
</style>