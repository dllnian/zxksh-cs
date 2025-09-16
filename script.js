// 初始化所有图表和功能
document.addEventListener('DOMContentLoaded', function() {
    initDateTime();
    initCharts();
    initAnimations();
    initTabInteractions();
});

// 更新日期时间
function initDateTime() {
    function updateDateTime() {
        const now = new Date();
        const dateTimeStr = now.toLocaleString('zh-CN', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
        });
        document.getElementById('dateTime').textContent = dateTimeStr;
    }
    
    updateDateTime();
    setInterval(updateDateTime, 1000);
}

// 初始化所有图表
function initCharts() {
    // 1. 案件流转图表
    const caseFlowChart = echarts.init(document.getElementById('caseFlowChart'));
    const caseFlowOption = {
        tooltip: {
            trigger: 'axis',
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            borderColor: '#00BFFF',
            borderWidth: 1,
            textStyle: {
                color: '#fff'
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月'],
            axisLine: {
                lineStyle: {
                    color: 'rgba(255, 255, 255, 0.3)'
                }
            },
            axisLabel: {
                color: 'rgba(255, 255, 255, 0.8)'
            }
        },
        yAxis: {
            type: 'value',
            axisLine: {
                lineStyle: {
                    color: 'rgba(255, 255, 255, 0.3)'
                }
            },
            splitLine: {
                lineStyle: {
                    color: 'rgba(255, 255, 255, 0.1)'
                }
            },
            axisLabel: {
                color: 'rgba(255, 255, 255, 0.8)'
            }
        },
        series: [
            {
                name: '新收',
                type: 'line',
                smooth: true,
                symbol: 'circle',
                symbolSize: 8,
                itemStyle: {
                    color: '#00BFFF'
                },
                lineStyle: {
                    width: 3,
                    shadowColor: 'rgba(0, 191, 255, 0.5)',
                    shadowBlur: 10
                },
                areaStyle: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        {offset: 0, color: 'rgba(0, 191, 255, 0.3)'},
                        {offset: 1, color: 'rgba(0, 191, 255, 0.05)'}
                    ])
                },
                data: [1200, 1350, 1400, 1250, 1580, 1420, 1650, 1480, 1458]
            },
            {
                name: '已结',
                type: 'line',
                smooth: true,
                symbol: 'circle',
                symbolSize: 8,
                itemStyle: {
                    color: '#1E90FF'
                },
                lineStyle: {
                    width: 3,
                    shadowColor: 'rgba(30, 144, 255, 0.5)',
                    shadowBlur: 10
                },
                areaStyle: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        {offset: 0, color: 'rgba(30, 144, 255, 0.3)'},
                        {offset: 1, color: 'rgba(30, 144, 255, 0.05)'}
                    ])
                },
                data: [1000, 1150, 1300, 1450, 1380, 1520, 1450, 1600, 1632]
            }
        ]
    };
    caseFlowChart.setOption(caseFlowOption);

    // 2. 月度执行标的到位率图表
    const monthlyAchievementChart = echarts.init(document.getElementById('monthlyAchievementChart'));
    const monthlyAchievementOption = {
        tooltip: {
            trigger: 'axis',
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            borderColor: '#00BFFF',
            borderWidth: 1,
            formatter: '{b}: {c}%'
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月'],
            axisLine: {
                lineStyle: {
                    color: 'rgba(255, 255, 255, 0.3)'
                }
            },
            axisLabel: {
                color: 'rgba(255, 255, 255, 0.8)'
            }
        },
        yAxis: {
            type: 'value',
            min: 0,
            max: 100,
            axisLine: {
                lineStyle: {
                    color: 'rgba(255, 255, 255, 0.3)'
                }
            },
            splitLine: {
                lineStyle: {
                    color: 'rgba(255, 255, 255, 0.1)'
                }
            },
            axisLabel: {
                color: 'rgba(255, 255, 255, 0.8)',
                formatter: '{value}%'
            }
        },
        series: [{
            type: 'bar',
            data: [65, 68, 70, 72, 69, 75, 73, 76, 73.8],
            itemStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    {offset: 0, color: '#00BFFF'},
                    {offset: 1, color: '#0047AB'}
                ]),
                borderRadius: [8, 8, 0, 0]
            },
            label: {
                show: true,
                position: 'top',
                color: '#ffffff',
                formatter: '{c}%'
            }
        }]
    };
    monthlyAchievementChart.setOption(monthlyAchievementOption);

    // 3. 执行工作态势图表
    const executionTrendChart = echarts.init(document.getElementById('executionTrendChart'));
    const executionTrendOption = {
        tooltip: {
            trigger: 'axis',
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            borderColor: '#00BFFF',
            borderWidth: 1
        },
        legend: {
            data: ['立案数', '结案数', '执行标的额'],
            textStyle: {
                color: 'rgba(255, 255, 255, 0.8)'
            },
            top: 0
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
            axisLine: {
                lineStyle: {
                    color: 'rgba(255, 255, 255, 0.3)'
                }
            },
            axisLabel: {
                color: 'rgba(255, 255, 255, 0.8)'
            }
        },
        yAxis: [
            {
                type: 'value',
                name: '案件数',
                nameTextStyle: {
                    color: 'rgba(255, 255, 255, 0.8)'
                },
                axisLine: {
                    lineStyle: {
                        color: 'rgba(255, 255, 255, 0.3)'
                    }
                },
                splitLine: {
                    lineStyle: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    }
                },
                axisLabel: {
                    color: 'rgba(255, 255, 255, 0.8)'
                }
            },
            {
                type: 'value',
                name: '金额(万元)',
                nameTextStyle: {
                    color: 'rgba(255, 255, 255, 0.8)'
                },
                axisLine: {
                    lineStyle: {
                        color: 'rgba(255, 255, 255, 0.3)'
                    }
                },
                splitLine: {
                    show: false
                },
                axisLabel: {
                    color: 'rgba(255, 255, 255, 0.8)'
                }
            }
        ],
        series: [
            {
                name: '立案数',
                type: 'bar',
                data: [150, 180, 224, 218, 235, 147, 120],
                itemStyle: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        {offset: 0, color: '#00BFFF'},
                        {offset: 1, color: '#0047AB'}
                    ]),
                    borderRadius: [4, 4, 0, 0]
                }
            },
            {
                name: '结案数',
                type: 'bar',
                data: [120, 152, 201, 194, 210, 120, 95],
                itemStyle: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        {offset: 0, color: '#1E90FF'},
                        {offset: 1, color: '#000080'}
                    ]),
                    borderRadius: [4, 4, 0, 0]
                }
            },
            {
                name: '执行标的额',
                type: 'line',
                yAxisIndex: 1,
                data: [3200, 3800, 4500, 4200, 4800, 2800, 2400],
                smooth: true,
                symbol: 'circle',
                symbolSize: 8,
                itemStyle: {
                    color: '#87CEEB'
                },
                lineStyle: {
                    width: 3,
                    shadowColor: 'rgba(135, 206, 235, 0.5)',
                    shadowBlur: 10
                }
            }
        ]
    };
    executionTrendChart.setOption(executionTrendOption);

    // 4. 案款分布图表
    const fundDistributionChart = echarts.init(document.getElementById('fundDistributionChart'));
    const fundDistributionOption = {
        tooltip: {
            trigger: 'item',
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            borderColor: '#00BFFF',
            borderWidth: 1,
            formatter: '{b}: {c}亿 ({d}%)'
        },
        series: [{
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            itemStyle: {
                borderRadius: 10,
                borderColor: 'rgba(0, 0, 0, 0.3)',
                borderWidth: 2
            },
            label: {
                show: false,
                position: 'center'
            },
            emphasis: {
                label: {
                    show: true,
                    fontSize: '16',
                    fontWeight: 'bold',
                    color: '#ffffff'
                }
            },
            labelLine: {
                show: false
            },
            data: [
                {
                    value: 8.5,
                    name: '提存案款',
                    itemStyle: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                            {offset: 0, color: '#00BFFF'},
                            {offset: 1, color: '#0047AB'}
                        ])
                    }
                },
                {
                    value: 3.2,
                    name: '未发还案款',
                    itemStyle: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                            {offset: 0, color: '#1E90FF'},
                            {offset: 1, color: '#000080'}
                        ])
                    }
                },
                {
                    value: 92.7,
                    name: '已发还案款',
                    itemStyle: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                            {offset: 0, color: '#87CEEB'},
                            {offset: 1, color: '#4682B4'}
                        ])
                    }
                }
            ]
        }]
    };
    fundDistributionChart.setOption(fundDistributionOption);

    // 5. 执行质效雷达图
    const qualityRadarChart = echarts.init(document.getElementById('qualityRadarChart'));
    const qualityRadarOption = {
        radar: {
            indicator: [
                { name: '法定期限\n结案率', max: 100 },
                { name: '平均\n用时', max: 100 },
                { name: '实际\n执行率', max: 100 },
                { name: '执行\n异议率', max: 100 },
                { name: '信访\n投诉率', max: 100 }
            ],
            shape: 'polygon',
            splitNumber: 5,
            name: {
                textStyle: {
                    color: 'rgba(255, 255, 255, 0.8)',
                    fontSize: 12
                }
            },
            splitLine: {
                lineStyle: {
                    color: 'rgba(255, 255, 255, 0.1)'
                }
            },
            splitArea: {
                areaStyle: {
                    color: ['rgba(0, 191, 255, 0.05)', 'rgba(0, 191, 255, 0.1)']
                }
            },
            axisLine: {
                lineStyle: {
                    color: 'rgba(255, 255, 255, 0.2)'
                }
            }
        },
        series: [{
            type: 'radar',
            data: [{
                value: [92.3, 85, 78.5, 68, 85],
                name: '执行质效',
                symbol: 'circle',
                symbolSize: 8,
                lineStyle: {
                    width: 3,
                    color: '#00BFFF',
                    shadowColor: 'rgba(0, 191, 255, 0.5)',
                    shadowBlur: 10
                },
                areaStyle: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        {offset: 0, color: 'rgba(0, 191, 255, 0.4)'},
                        {offset: 1, color: 'rgba(0, 191, 255, 0.1)'}
                    ])
                },
                itemStyle: {
                    color: '#00BFFF'
                }
            }]
        }]
    };
    qualityRadarChart.setOption(qualityRadarOption);

    // 响应式调整
    window.addEventListener('resize', function() {
        caseFlowChart.resize();
        monthlyAchievementChart.resize();
        executionTrendChart.resize();
        fundDistributionChart.resize();
        qualityRadarChart.resize();
    });

    // 初始化地图
    initMap();
}

// 初始化地图
function initMap() {
    const mapContainer = document.getElementById('mapContainer');
    
    // 获取现有的SVG背景
    const existingSVG = mapContainer.querySelector('.map-background');
    
    // 创建地图覆盖层
    const mapOverlay = document.createElement('div');
    mapOverlay.style.cssText = 'position: absolute; width: 100%; height: 100%; top: 0; left: 0; z-index: 2;';
    mapOverlay.innerHTML = `
        <!-- 背景网格 -->
        <svg style="position: absolute; width: 100%; height: 100%; opacity: 0.1; z-index: 0;">
            <defs>
                <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                    <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#00BFFF" stroke-width="0.5"/>
                </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
        
        <!-- 主地图容器 -->
        <div id="chinaMapChart" style="width: 100%; height: 100%; position: relative; z-index: 1;"></div>
        
        <!-- 数据面板 -->
        <div style="position: absolute; top: 10px; left: 10px; background: rgba(0, 0, 0, 0.7); padding: 10px; border-radius: 8px; border: 1px solid rgba(0, 191, 255, 0.5); z-index: 3;">
            <div style="font-size: 12px; color: #00BFFF; margin-bottom: 5px;">失信被执行人总数</div>
            <div style="font-size: 20px; font-weight: bold; color: #ffffff;">23,456</div>
        </div>
        
        <!-- 热点城市标记 -->
        <div class="map-hotspots" style="z-index: 4;">
            <div class="hotspot" style="position: absolute; top: 30%; left: 70%; animation: pulse 2s infinite;">
                <div class="hotspot-inner" style="background: rgba(255, 0, 0, 0.8);"></div>
                <div class="hotspot-label">北京<br><span style="font-size: 10px;">850人</span></div>
            </div>
            <div class="hotspot" style="position: absolute; top: 45%; left: 73%; animation: pulse 2.5s infinite;">
                <div class="hotspot-inner" style="background: rgba(255, 0, 0, 0.8);"></div>
                <div class="hotspot-label">上海<br><span style="font-size: 10px;">780人</span></div>
            </div>
            <div class="hotspot" style="position: absolute; top: 65%; left: 68%; animation: pulse 3s infinite;">
                <div class="hotspot-inner" style="background: rgba(255, 0, 0, 0.9);"></div>
                <div class="hotspot-label">广东<br><span style="font-size: 10px;">1850人</span></div>
            </div>
            <div class="hotspot" style="position: absolute; top: 35%; left: 65%; animation: pulse 2.2s infinite;">
                <div class="hotspot-inner" style="background: rgba(255, 170, 0, 0.8);"></div>
                <div class="hotspot-label">山东<br><span style="font-size: 10px;">1680人</span></div>
            </div>
            <div class="hotspot" style="position: absolute; top: 50%; left: 55%; animation: pulse 2.8s infinite;">
                <div class="hotspot-inner" style="background: rgba(255, 170, 0, 0.7);"></div>
                <div class="hotspot-label">四川<br><span style="font-size: 10px;">1120人</span></div>
            </div>
            <div class="hotspot" style="position: absolute; top: 38%; left: 58%; animation: pulse 2.4s infinite;">
                <div class="hotspot-inner" style="background: rgba(255, 170, 0, 0.8);"></div>
                <div class="hotspot-label">河南<br><span style="font-size: 10px;">1450人</span></div>
            </div>
            <div class="hotspot" style="position: absolute; top: 52%; left: 65%; animation: pulse 2.6s infinite;">
                <div class="hotspot-inner" style="background: rgba(30, 144, 255, 0.8);"></div>
                <div class="hotspot-label">江苏<br><span style="font-size: 10px;">1420人</span></div>
            </div>
            <div class="hotspot" style="position: absolute; top: 55%; left: 67%; animation: pulse 2.7s infinite;">
                <div class="hotspot-inner" style="background: rgba(30, 144, 255, 0.8);"></div>
                <div class="hotspot-label">浙江<br><span style="font-size: 10px;">1380人</span></div>
            </div>
        </div>
    `;
    
    mapContainer.appendChild(mapOverlay);
    
    // 添加热点样式
    const style = document.createElement('style');
    style.textContent = `
        .map-hotspots {
            position: absolute;
            width: 100%;
            height: 100%;
            pointer-events: none;
        }
        
        .hotspot {
            position: relative;
            width: 80px;
            height: 80px;
            transform: translate(-50%, -50%);
        }
        
        .hotspot-inner {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 20px;
            height: 20px;
            border-radius: 50%;
            box-shadow: 0 0 20px rgba(255, 0, 0, 0.8);
        }
        
        .hotspot-label {
            position: absolute;
            top: -25px;
            left: 50%;
            transform: translateX(-50%);
            text-align: center;
            color: #ffffff;
            font-size: 12px;
            font-weight: bold;
            text-shadow: 0 0 10px rgba(0, 0, 0, 0.8);
            white-space: nowrap;
        }
        
        @keyframes pulse {
            0%, 100% {
                opacity: 0.8;
            }
            50% {
                opacity: 0.3;
            }
        }
        
        .hotspot::before {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 40px;
            height: 40px;
            border-radius: 50%;
            border: 2px solid rgba(255, 255, 255, 0.3);
            animation: ripple 2s infinite;
        }
        
        @keyframes ripple {
            0% {
                width: 20px;
                height: 20px;
                opacity: 1;
            }
            100% {
                width: 60px;
                height: 60px;
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
    
    // 使用ECharts创建更详细的地图
    const chinaMapChart = echarts.init(document.getElementById('chinaMapChart'));
    
    // 模拟各省份数据
    const provinces = [
        {name: '北京', value: 850, cp: [116.4, 39.9]},
        {name: '天津', value: 620, cp: [117.2, 39.1]},
        {name: '河北', value: 1200, cp: [114.5, 38.0]},
        {name: '山西', value: 720, cp: [112.5, 37.9]},
        {name: '内蒙古', value: 380, cp: [111.7, 40.8]},
        {name: '辽宁', value: 680, cp: [123.4, 41.8]},
        {name: '吉林', value: 480, cp: [125.3, 43.9]},
        {name: '黑龙江', value: 420, cp: [126.6, 45.8]},
        {name: '上海', value: 780, cp: [121.5, 31.2]},
        {name: '江苏', value: 1420, cp: [118.8, 32.0]},
        {name: '浙江', value: 1380, cp: [120.2, 30.3]},
        {name: '安徽', value: 860, cp: [117.3, 31.9]},
        {name: '福建', value: 750, cp: [119.3, 26.1]},
        {name: '江西', value: 650, cp: [115.9, 28.7]},
        {name: '山东', value: 1680, cp: [117.0, 36.7]},
        {name: '河南', value: 1450, cp: [113.7, 34.8]},
        {name: '湖北', value: 820, cp: [114.3, 30.6]},
        {name: '湖南', value: 980, cp: [113.0, 28.2]},
        {name: '广东', value: 1850, cp: [113.3, 23.1]},
        {name: '广西', value: 560, cp: [108.3, 22.8]},
        {name: '海南', value: 320, cp: [110.3, 20.0]},
        {name: '重庆', value: 560, cp: [106.6, 29.6]},
        {name: '四川', value: 1120, cp: [104.1, 30.7]},
        {name: '贵州', value: 420, cp: [106.7, 26.6]},
        {name: '云南', value: 380, cp: [102.7, 25.0]},
        {name: '西藏', value: 120, cp: [91.1, 29.7]},
        {name: '陕西', value: 680, cp: [108.9, 34.3]},
        {name: '甘肃', value: 320, cp: [103.8, 36.1]},
        {name: '青海', value: 180, cp: [101.8, 36.6]},
        {name: '宁夏', value: 280, cp: [106.3, 38.5]},
        {name: '新疆', value: 280, cp: [87.6, 43.8]}
    ];
    
    // 创建模拟的地图轮廓数据
    const mapOption = {
        backgroundColor: 'transparent',
        tooltip: {
            trigger: 'item',
            formatter: function(params) {
                return params.name + '<br/>失信被执行人: ' + (params.value || 0) + '人';
            },
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            borderColor: '#00BFFF',
            borderWidth: 1,
            textStyle: {
                color: '#ffffff'
            }
        },
        visualMap: {
            show: false,
            min: 0,
            max: 2000,
            inRange: {
                color: ['rgba(135, 206, 235, 0.3)', 'rgba(0, 191, 255, 0.5)', 'rgba(30, 144, 255, 0.7)', 'rgba(0, 71, 171, 0.9)']
            }
        },
        series: [
            {
                name: '失信被执行人分布',
                type: 'scatter',
                coordinateSystem: 'geo',
                data: provinces.map(item => {
                    return {
                        name: item.name,
                        value: item.cp.concat(item.value),
                        symbolSize: Math.sqrt(item.value) * 2,
                        itemStyle: {
                            color: item.value > 1000 ? 'rgba(255, 0, 0, 0.8)' : 
                                   item.value > 500 ? 'rgba(255, 170, 0, 0.8)' : 
                                   'rgba(0, 191, 255, 0.8)'
                        }
                    };
                }),
                label: {
                    show: false
                },
                emphasis: {
                    label: {
                        show: true,
                        formatter: '{b}',
                        position: 'top',
                        color: '#ffffff'
                    }
                }
            }
        ],
        geo: {
            map: 'china',
            roam: false,
            zoom: 1.2,
            center: [105, 36],
            itemStyle: {
                areaColor: 'rgba(0, 47, 92, 0.6)',
                borderColor: 'rgba(135, 206, 235, 0.8)',
                borderWidth: 1,
                shadowColor: 'rgba(0, 191, 255, 0.5)',
                shadowBlur: 10
            },
            emphasis: {
                itemStyle: {
                    areaColor: 'rgba(0, 191, 255, 0.3)',
                    borderColor: '#00BFFF',
                    borderWidth: 2
                }
            },
            regions: provinces.map(item => ({
                name: item.name,
                itemStyle: {
                    areaColor: item.value > 1000 ? 'rgba(0, 71, 171, 0.8)' : 
                               item.value > 500 ? 'rgba(30, 144, 255, 0.6)' : 
                               'rgba(135, 206, 235, 0.4)'
                }
            }))
        }
    };
    
    // 由于ECharts需要加载地图数据，这里我们使用模拟的散点图
    const scatterOption = {
        backgroundColor: 'transparent',
        grid: {
            left: '5%',
            right: '5%',
            bottom: '5%',
            top: '5%'
        },
        xAxis: {
            type: 'value',
            min: 70,
            max: 140,
            show: false
        },
        yAxis: {
            type: 'value',
            min: 15,
            max: 55,
            show: false
        },
        series: [{
            type: 'scatter',
            data: provinces.map(item => ({
                value: item.cp,
                name: item.name,
                symbolSize: Math.sqrt(item.value) * 2,
                itemStyle: {
                    color: item.value > 1000 ? 'rgba(255, 0, 0, 0.8)' : 
                           item.value > 500 ? 'rgba(255, 170, 0, 0.8)' : 
                           'rgba(0, 191, 255, 0.8)',
                    shadowBlur: 10,
                    shadowColor: 'rgba(0, 191, 255, 0.5)'
                },
                label: {
                    show: item.value > 1000,
                    formatter: '{b}',
                    position: 'top',
                    color: '#ffffff',
                    fontSize: 10
                }
            })),
            emphasis: {
                scale: 1.5,
                itemStyle: {
                    shadowBlur: 20,
                    shadowColor: 'rgba(0, 191, 255, 0.8)'
                }
            }
        }]
    };
    
    chinaMapChart.setOption(scatterOption);
    
    // 添加连线效果
    setTimeout(() => {
        const connectionData = [
            [[116.4, 39.9], [121.5, 31.2]], // 北京到上海
            [[116.4, 39.9], [113.3, 23.1]], // 北京到广东
            [[121.5, 31.2], [113.3, 23.1]], // 上海到广东
            [[104.1, 30.7], [113.3, 23.1]], // 四川到广东
            [[117.0, 36.7], [116.4, 39.9]]  // 山东到北京
        ];
        
        const linesSeries = {
            type: 'lines',
            data: connectionData.map(item => ({
                coords: item,
                lineStyle: {
                    color: 'rgba(0, 191, 255, 0.3)',
                    width: 1,
                    curveness: 0.2
                }
            })),
            effect: {
                show: true,
                period: 4,
                trailLength: 0.2,
                symbol: 'circle',
                symbolSize: 4,
                color: '#00BFFF'
            }
        };
        
        chinaMapChart.setOption({
            series: [...chinaMapChart.getOption().series, linesSeries]
        });
    }, 1000);
    
    // 响应式调整
    window.addEventListener('resize', () => {
        chinaMapChart.resize();
    });
}

// 初始化动画效果
function initAnimations() {
    // 数字递增动画
    const statValues = document.querySelectorAll('.stat-value');
    statValues.forEach(element => {
        const endValue = parseInt(element.getAttribute('data-count'));
        animateValue(element, 0, endValue, 2000);
    });
    
    // 进度环动画
    setTimeout(() => {
        const progressRing = document.querySelector('.progress-ring-progress');
        if (progressRing) {
            progressRing.style.strokeDashoffset = '148'; // 73.8%对应的值
        }
    }, 500);
}

// 数字动画函数
function animateValue(element, start, end, duration) {
    const startTime = performance.now();
    const endTime = startTime + duration;
    
    function update() {
        const now = performance.now();
        const progress = Math.min((now - startTime) / duration, 1);
        const value = Math.floor(start + (end - start) * progress);
        element.textContent = value.toLocaleString();
        
        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }
    
    requestAnimationFrame(update);
}

// 标签交互
function initTabInteractions() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const executionTrendChart = echarts.getInstanceByDom(document.getElementById('executionTrendChart'));
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // 更新活动状态
            tabBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // 根据选择的时间段更新图表数据
            const period = this.getAttribute('data-period');
            updateTrendChart(executionTrendChart, period);
        });
    });
}

// 更新趋势图表数据
function updateTrendChart(chart, period) {
    let xAxisData, seriesData1, seriesData2, seriesData3;
    
    switch(period) {
        case 'day':
            xAxisData = ['0时', '4时', '8时', '12时', '16时', '20时', '24时'];
            seriesData1 = [20, 35, 80, 150, 120, 60, 30];
            seriesData2 = [15, 28, 65, 130, 100, 45, 25];
            seriesData3 = [500, 800, 2000, 3500, 2800, 1500, 800];
            break;
        case 'week':
            xAxisData = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];
            seriesData1 = [150, 180, 224, 218, 235, 147, 120];
            seriesData2 = [120, 152, 201, 194, 210, 120, 95];
            seriesData3 = [3200, 3800, 4500, 4200, 4800, 2800, 2400];
            break;
        case 'month':
            xAxisData = ['第1周', '第2周', '第3周', '第4周'];
            seriesData1 = [800, 950, 1100, 1050];
            seriesData2 = [650, 820, 980, 920];
            seriesData3 = [18000, 22000, 26000, 24000];
            break;
    }
    
    chart.setOption({
        xAxis: {
            data: xAxisData
        },
        series: [
            {
                data: seriesData1
            },
            {
                data: seriesData2
            },
            {
                data: seriesData3
            }
        ]
    });
}

// 定时刷新数据
setInterval(() => {
    // 更新数据更新时间
    const now = new Date();
    const updateTimeStr = now.toLocaleString('zh-CN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
    });
    document.getElementById('updateTime').textContent = updateTimeStr;
    
    // 模拟数据变化
    const statValues = document.querySelectorAll('.stat-value');
    statValues.forEach(element => {
        const currentValue = parseInt(element.textContent.replace(',', ''));
        const variation = Math.floor(Math.random() * 100) - 50; // -50 到 50的随机变化
        const newValue = Math.max(0, currentValue + variation);
        element.textContent = newValue.toLocaleString();
    });
}, 30000); // 每30秒更新一次