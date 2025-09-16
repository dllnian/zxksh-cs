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
    // 使用中国地图的模拟数据
    const mapContainer = document.getElementById('mapContainer');
    
    // 创建模拟的中国地图热力图
    const mapChart = echarts.init(mapContainer);
    
    // 模拟各省份失信被执行人数据
    const mapData = [
        {name: '北京', value: 850},
        {name: '天津', value: 620},
        {name: '上海', value: 780},
        {name: '重庆', value: 560},
        {name: '河北', value: 1200},
        {name: '河南', value: 1450},
        {name: '云南', value: 380},
        {name: '辽宁', value: 680},
        {name: '黑龙江', value: 420},
        {name: '湖南', value: 980},
        {name: '安徽', value: 860},
        {name: '山东', value: 1680},
        {name: '新疆', value: 280},
        {name: '江苏', value: 1420},
        {name: '浙江', value: 1380},
        {name: '江西', value: 650},
        {name: '湖北', value: 820},
        {name: '广西', value: 560},
        {name: '甘肃', value: 320},
        {name: '山西', value: 720},
        {name: '内蒙古', value: 380},
        {name: '陕西', value: 680},
        {name: '吉林', value: 480},
        {name: '福建', value: 750},
        {name: '贵州', value: 420},
        {name: '广东', value: 1850},
        {name: '青海', value: 180},
        {name: '西藏', value: 120},
        {name: '四川', value: 1120},
        {name: '宁夏', value: 280},
        {name: '海南', value: 320},
        {name: '台湾', value: 0},
        {name: '香港', value: 0},
        {name: '澳门', value: 0}
    ];

    // 创建虚拟地图配置
    const mapOption = {
        tooltip: {
            trigger: 'item',
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            borderColor: '#00BFFF',
            borderWidth: 1,
            formatter: '{b}<br/>失信人数: {c}人'
        },
        visualMap: {
            min: 0,
            max: 2000,
            left: 'left',
            top: 'bottom',
            text: ['高', '低'],
            textStyle: {
                color: 'rgba(255, 255, 255, 0.8)'
            },
            calculable: true,
            inRange: {
                color: ['#87CEEB', '#00BFFF', '#1E90FF', '#0047AB']
            }
        },
        series: [{
            type: 'scatter',
            coordinateSystem: 'geo',
            symbolSize: function (val) {
                return val[2] / 50;
            },
            itemStyle: {
                color: '#00BFFF'
            },
            data: []
        }],
        geo: {
            map: 'china',
            roam: false,
            itemStyle: {
                areaColor: 'rgba(0, 47, 92, 0.8)',
                borderColor: 'rgba(135, 206, 235, 0.5)'
            },
            emphasis: {
                itemStyle: {
                    areaColor: 'rgba(0, 191, 255, 0.3)'
                }
            }
        }
    };
    
    // 由于没有实际的地图数据，我们创建一个模拟的热力图效果
    const heatmapHTML = `
        <div style="width: 100%; height: 100%; position: relative; display: flex; align-items: center; justify-content: center;">
            <div style="text-align: center; color: rgba(255, 255, 255, 0.8);">
                <svg width="300" height="200" viewBox="0 0 300 200" style="filter: drop-shadow(0 0 20px rgba(0, 191, 255, 0.5));">
                    <!-- 简化的中国地图轮廓 -->
                    <path d="M 50 50 Q 100 30 150 35 Q 200 40 250 60 L 240 80 Q 220 100 200 120 L 180 130 Q 150 135 120 130 L 100 120 Q 80 100 60 80 Z" 
                          fill="none" 
                          stroke="#00BFFF" 
                          stroke-width="2"
                          opacity="0.8"/>
                    
                    <!-- 热点区域 -->
                    <circle cx="180" cy="80" r="15" fill="rgba(255, 0, 0, 0.6)" opacity="0.8">
                        <animate attributeName="r" values="15;20;15" dur="2s" repeatCount="indefinite"/>
                        <animate attributeName="opacity" values="0.8;0.4;0.8" dur="2s" repeatCount="indefinite"/>
                    </circle>
                    <circle cx="120" cy="90" r="12" fill="rgba(255, 170, 0, 0.6)" opacity="0.7">
                        <animate attributeName="r" values="12;16;12" dur="2.5s" repeatCount="indefinite"/>
                        <animate attributeName="opacity" values="0.7;0.3;0.7" dur="2.5s" repeatCount="indefinite"/>
                    </circle>
                    <circle cx="150" cy="70" r="10" fill="rgba(0, 191, 255, 0.6)" opacity="0.6">
                        <animate attributeName="r" values="10;14;10" dur="3s" repeatCount="indefinite"/>
                        <animate attributeName="opacity" values="0.6;0.2;0.6" dur="3s" repeatCount="indefinite"/>
                    </circle>
                </svg>
                <div style="margin-top: 20px; font-size: 16px;">失信被执行人地理分布图</div>
                <div style="margin-top: 10px; font-size: 12px; color: rgba(255, 255, 255, 0.6);">
                    基于全国法院执行案件数据分析
                </div>
            </div>
        </div>
    `;
    
    mapContainer.innerHTML = heatmapHTML;
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