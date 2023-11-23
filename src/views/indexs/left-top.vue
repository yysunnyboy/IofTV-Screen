<!--
 * @Author: daidai
 * @Date: 2022-02-28 16:16:42
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-07-20 17:57:11
 * @FilePath: \web-pc\src\pages\big-screen\view\indexs\left-center.vue
-->
<template>
    <div v-if="pageflag">
        <ul class="user_Overview flex" >
            <li class="user_Overview-item active"> 西安站</li>
            <li class="user_Overview-item"> 敦煌站</li>
            <li class="user_Overview-item"> 库尔勒站</li>
            <li class="user_Overview-item"> 拉萨站</li>
        </ul>
        <div class="content">
            <dv-border-box-12 class="middle_item ">
                <Echart id="leftPieMap" :options="options" ref="leftPieMap" />
            </dv-border-box-12>

            <!-- <dv-border-box-12 class="middle_item width">
                <p class="right_text">
                    增强型罗兰授时监测接收机01-西安
                </p>
                <p class="right_text_sec">
                   授时偏差统计值(RPS)
                   <span class="inner_text">0.002804</span>
                </p>
            </dv-border-box-12> -->
        </div>
    </div>
    
    <Reacquire v-else @onclick="getData" line-height="200px">
        重新获取
    </Reacquire>
</template>

<script>
import { currentGET } from 'api/modules'
let style = {
    fontSize: 24
}
export default {
    data() {
        return {
            // options: {
            //     title: {
            //         left: 'center'
            //     },
            //     tooltip: {
            //         trigger: 'item'
            //     },
            //     color: ['#73c0de', '#ee6666'],
            //     legend: {
            //         right: 'top',
            //         data: ['正常', '异常']
            //     },
            //     label: {
            //         color: "#FFFFFF",
            //         fontSize: 12,
            //     },
            //     series: [
            //         {
            //         type: 'pie',
            //         radius: '65%',
            //         center: ['50%', '50%'],
            //         selectedMode: 'single',
            //         data: [
            //             { value: 1000, name: '正常' },
            //             { value: 0, name: '异常' }
            //         ],
            //         emphasis: {
            //             itemStyle: {
            //             shadowBlur: 10,
            //             shadowOffsetX: 0,
            //             shadowColor: 'rgba(0, 0, 0, 0.5)'
            //             }
            //         }
            //         }
            //     ]
            // },
            options: {
                title: {
                    left: 'center',
                    text: '授时偏差',
                    textStyle: {
                        color: "#fff",
                        fontSize: '16px',
                    }
                },
                xAxis: {
                    type: 'category',
                    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                },
                yAxis: {
                    type: 'value'
                },
                series: [
                    {
                    data: [70, 30, 80, 120, 90, 140, 190],
                    type: 'line',
                    smooth: true
                    }
                ]
            },
            userOverview: {
                alarmNum: 0,
                offlineNum: 0,
                onlineNum: 0,
                totalNum: 0,
            },
            pageflag: true,
            timer: null,
            config: {
                number: [100],
                content: '{nt}',
                style: {
                    ...style,
                    // stroke: "#00fdfa",
                    fill: "#00fdfa",
                },
            },
            onlineconfig: {
                number: [0],
                content: '{nt}',
                style: {
                    ...style,
                    // stroke: "#07f7a8",
                    fill: "#07f7a8",
                },
            },
            offlineconfig: {
                number: [0],
                content: '{nt}',
                style: {
                    ...style,
                    // stroke: "#e3b337",
                    fill: "#e3b337",
                },
            },
            laramnumconfig: {
                number: [0],
                content: '{nt}',
                style: {
                    ...style,
                    // stroke: "#f5023d",
                    fill: "#f5023d",
                },
            }

        };
    },
    filters: {
        numsFilter(msg) {
            return msg || 0;
        },
    },
    created() {
        this.getData()
    },
    mounted() {
    },
    beforeDestroy() {
        this.clearData()

    },
    methods: {
        clearData() {
            if (this.timer) {
                clearInterval(this.timer)
                this.timer = null
            }
        },
        getData() {
            this.pageflag = true;
            currentGET("big2").then((res) => {
                if (!this.timer) {
                    console.log("设备总览", res);
                }
                if (res.success) {
                    this.userOverview = res.data;
                    this.onlineconfig = {
                        ...this.onlineconfig,
                        number: [res.data.onlineNum]
                    }
                    this.config = {
                        ...this.config,
                        number: [res.data.totalNum]
                    }
                    this.offlineconfig = {
                        ...this.offlineconfig,
                        number: [res.data.offlineNum]
                    }
                    this.laramnumconfig = {
                        ...this.laramnumconfig,
                        number: [res.data.alarmNum]
                    }
                    this.switper()
                } else {
                    this.pageflag = false;
                    this.$Message.warning(res.msg);
                }
            });
        },
        //轮询
        switper() {
            if (this.timer) {
                return
            }
            let looper = (a) => {
                this.getData()
            };
            this.timer = setInterval(looper, this.$store.state.setting.echartsAutoTime);
        },
    },
};
</script>
<style lang='scss' scoped>
.user_Overview {
    li {
        flex: 1;
        font-size: 20px;
        p {
            text-align: center;
            height: 16px;
            font-size: 16px;
        }

        .user_Overview_nums {
            width: 100px;
            height: 100px;
            text-align: center;
            line-height: 100px;
            font-size: 22px;
            margin: 50px auto 30px;
            background-size: cover;
            background-position: center center;
            position: relative;

            &::before {
                content: '';
                position: absolute;
                width: 100%;
                height: 100%;
                top: 0;
                left: 0;
            }

            &.bgdonghua::before {
                animation: rotating 14s linear infinite;
            }
        }

        .allnum {

            // background-image: url("../../assets/img/left_top_lan.png");
            &::before {
                background-image: url("../../assets/img/left_top_lan.png");

            }
        }

        .online {
            &::before {
                background-image: url("../../assets/img/left_top_lv.png");

            }
        }

        .offline {
            &::before {
                background-image: url("../../assets/img/left_top_huang.png");

            }
        }

        .laramnum {
            &::before {
                background-image: url("../../assets/img/left_top_hong.png");

            }
        }
       
    }
    .user_Overview-item {
        color: #FFFFFF;
        &.active{
            color:#0072ff 
        }
    }
    
}
.content{
    display: flex;
}
.middle_item{
    width: 90%;
    height: 260px;
    // background-color: #afa;
    &.width{
        width: 60%;
    }
    .right_text{
        font-size: 20px;
        height: 30px;
        line-height: 30px;
    }
    .right_text_sec{

    }
}
</style>