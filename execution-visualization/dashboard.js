// 更新时间函数
function updateDateTime() {
    const now = new Date();
    const dateStr = now.toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric' });
    const timeStr = now.toLocaleTimeString('zh-CN', { hour12: false });
    
    document.getElementById('currentDate').textContent = dateStr;
    document.getElementById('currentTime').textContent = timeStr;
    document.getElementById('updateTime').textContent = now.toLocaleString('zh-CN');
}

// 初始化图表
function initCharts() {
    // 配置ECharts主题色
    const themeColors = ['#4793ff', '#00c9ff', '#00ff88', '#ff9500', '#ff4444'];
    
    // 1. 案件收结存流向图
    const caseFlowChart = echarts.init(document.getElementById('caseFlowChart'));
    const caseFlowOption = {
        tooltip: {
            trigger: 'axis',
            backgroundColor: 'rgba(0,0,0,0.8)',
            borderColor: '#4793ff',
            textStyle: { color: '#fff' }
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
            axisLine: { lineStyle: { color: '#4793ff' } },
            axisLabel: { color: '#8899bb' }
        },
        yAxis: {
            type: 'value',
            axisLine: { lineStyle: { color: '#4793ff' } },
            axisLabel: { color: '#8899bb' },
            splitLine: { lineStyle: { color: 'rgba(71,147,255,0.1)' } }
        },
        series: [
            {
                name: '新收',
                type: 'line',
                smooth: true,
                symbol: 'circle',
                symbolSize: 8,
                data: [2120, 2350, 2100, 2450, 2200, 2380, 2550, 2400, 2358],
                itemStyle: { color: '#4793ff' },
                areaStyle: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        { offset: 0, color: 'rgba(71,147,255,0.4)' },
                        { offset: 1, color: 'rgba(71,147,255,0.1)' }
                    ])
                }
            },
            {
                name: '已结',
                type: 'line',
                smooth: true,
                symbol: 'circle',
                symbolSize: 8,
                data: [1980, 2200, 1950, 2300, 2050, 2180, 2350, 2200, 2156],
                itemStyle: { color: '#00ff88' },
                areaStyle: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        { offset: 0, color: 'rgba(0,255,136,0.4)' },
                        { offset: 1, color: 'rgba(0,255,136,0.1)' }
                    ])
                }
            }
        ]
    };
    caseFlowChart.setOption(caseFlowOption);

    // 2. 失信被执行人地图分布
    const dishonestMapChart = echarts.init(document.getElementById('dishonestMapChart'));
    const dishonestMapOption = {
        tooltip: {
            trigger: 'item',
            backgroundColor: 'rgba(0,0,0,0.8)',
            borderColor: '#4793ff'
        },
        visualMap: {
            min: 0,
            max: 1000,
            left: 'left',
            top: 'bottom',
            text: ['高', '低'],
            textStyle: { color: '#8899bb' },
            calculable: true,
            inRange: {
                color: ['#2a5cff', '#4793ff', '#ff9500', '#ff4444']
            }
        },
        series: [{
            name: '失信被执行人数量',
            type: 'scatter',
            coordinateSystem: 'geo',
            data: convertData([
                {name: '北京市', value: 856},
                {name: '上海市', value: 723},
                {name: '广州市', value: 689},
                {name: '深圳市', value: 612},
                {name: '杭州市', value: 534},
                {name: '南京市', value: 467},
                {name: '武汉市', value: 423},
                {name: '成都市', value: 389},
                {name: '重庆市', value: 356},
                {name: '西安市', value: 298}
            ]),
            symbolSize: function (val) {
                return val[2] / 20;
            },
            encode: { value: 2 },
            label: {
                formatter: '{b}',
                position: 'right',
                show: true,
                color: '#fff'
            },
            itemStyle: {
                color: '#ff4444',
                shadowBlur: 10,
                shadowColor: 'rgba(255,68,68,0.5)'
            }
        }]
    };
    
    // 模拟地图数据转换函数
    function convertData(data) {
        var res = [];
        for (var i = 0; i < data.length; i++) {
            var geoCoord = getGeoCoord(data[i].name);
            if (geoCoord) {
                res.push({
                    name: data[i].name,
                    value: geoCoord.concat(data[i].value)
                });
            }
        }
        return res;
    }
    
    function getGeoCoord(city) {
        const coords = {
            '北京市': [116.405285, 39.904989],
            '上海市': [121.472644, 31.231706],
            '广州市': [113.280637, 23.125178],
            '深圳市': [114.085947, 22.547],
            '杭州市': [120.153576, 30.287459],
            '南京市': [118.767413, 32.041544],
            '武汉市': [114.298572, 30.584355],
            '成都市': [104.065735, 30.659462],
            '重庆市': [106.504962, 29.533155],
            '西安市': [108.948024, 34.263161]
        };
        return coords[city];
    }
    
    dishonestMapChart.setOption(dishonestMapOption);

    // 3. 执行工作态势图
    const workTrendChart = echarts.init(document.getElementById('workTrendChart'));
    const workTrendOption = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                crossStyle: {
                    color: '#999'
                }
            },
            backgroundColor: 'rgba(0,0,0,0.8)',
            borderColor: '#4793ff'
        },
        legend: {
            data: ['执行案件数', '到位金额', '到位率'],
            textStyle: { color: '#8899bb' }
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
            axisLine: { lineStyle: { color: '#4793ff' } },
            axisLabel: { color: '#8899bb' }
        },
        yAxis: [
            {
                type: 'value',
                name: '案件数',
                axisLine: { lineStyle: { color: '#4793ff' } },
                axisLabel: { color: '#8899bb' },
                splitLine: { lineStyle: { color: 'rgba(71,147,255,0.1)' } }
            },
            {
                type: 'value',
                name: '到位率',
                min: 0,
                max: 100,
                axisLine: { lineStyle: { color: '#00ff88' } },
                axisLabel: { 
                    color: '#8899bb',
                    formatter: '{value}%'
                }
            }
        ],
        series: [
            {
                name: '执行案件数',
                type: 'bar',
                data: [2120, 2350, 2100, 2450, 2200, 2380, 2550, 2400, 2358],
                itemStyle: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        { offset: 0, color: '#4793ff' },
                        { offset: 1, color: '#1e5aff' }
                    ])
                }
            },
            {
                name: '到位金额',
                type: 'bar',
                data: [15.6, 18.9, 16.3, 19.8, 17.2, 18.5, 20.1, 18.8, 19.2],
                itemStyle: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        { offset: 0, color: '#00c9ff' },
                        { offset: 1, color: '#0080ff' }
                    ])
                }
            },
            {
                name: '到位率',
                type: 'line',
                yAxisIndex: 1,
                data: [85.2, 86.7, 87.3, 88.1, 88.5, 88.9, 89.2, 89.4, 89.5],
                smooth: true,
                symbol: 'circle',
                symbolSize: 8,
                itemStyle: { color: '#00ff88' }
            }
        ]
    };
    workTrendChart.setOption(workTrendOption);

    // 4. 执行质效指标雷达图
    const qualityRadarChart = echarts.init(document.getElementById('qualityRadarChart'));
    const qualityRadarOption = {
        tooltip: {
            backgroundColor: 'rgba(0,0,0,0.8)',
            borderColor: '#4793ff'
        },
        radar: {
            indicator: [
                { name: '有财产可供执行案件法定期限内结案率', max: 100 },
                { name: '终本案件合格率', max: 100 },
                { name: '执行信访办结率', max: 100 },
                { name: '执行案款发放及时率', max: 100 },
                { name: '执行到位率', max: 100 },
                { name: '首次执行案件结案率', max: 100 }
            ],
            center: ['50%', '50%'],
            radius: '70%',
            name: {
                textStyle: {
                    color: '#8899bb',
                    fontSize: 13
                }
            },
            splitArea: {
                areaStyle: {
                    color: ['rgba(71,147,255,0.05)', 'rgba(71,147,255,0.1)']
                }
            },
            axisLine: {
                lineStyle: {
                    color: 'rgba(71,147,255,0.3)'
                }
            },
            splitLine: {
                lineStyle: {
                    color: 'rgba(71,147,255,0.3)'
                }
            }
        },
        series: [{
            name: '执行质效指标',
            type: 'radar',
            data: [
                {
                    value: [92, 88, 95, 90, 89, 87],
                    name: '当前值',
                    areaStyle: {
                        color: new echarts.graphic.RadialGradient(0.5, 0.5, 1, [
                            { offset: 0, color: 'rgba(71,147,255,0.4)' },
                            { offset: 1, color: 'rgba(71,147,255,0.1)' }
                        ])
                    },
                    lineStyle: {
                        color: '#4793ff',
                        width: 2
                    },
                    itemStyle: {
                        color: '#4793ff'
                    }
                },
                {
                    value: [90, 90, 90, 90, 90, 90],
                    name: '目标值',
                    lineStyle: {
                        color: '#ff9500',
                        width: 2,
                        type: 'dashed'
                    },
                    itemStyle: {
                        color: '#ff9500'
                    }
                }
            ]
        }]
    };
    qualityRadarChart.setOption(qualityRadarOption);

    // 5. 案款流转分析图
    const fundFlowChart = echarts.init(document.getElementById('fundFlowChart'));
    const fundFlowOption = {
        tooltip: {
            trigger: 'item',
            backgroundColor: 'rgba(0,0,0,0.8)',
            borderColor: '#4793ff',
            formatter: '{b}: {c}亿 ({d}%)'
        },
        series: [{
            type: 'pie',
            radius: ['40%', '70%'],
            center: ['50%', '50%'],
            avoidLabelOverlap: false,
            label: {
                show: false,
                position: 'center'
            },
            emphasis: {
                label: {
                    show: true,
                    fontSize: '20',
                    fontWeight: 'bold',
                    color: '#fff'
                }
            },
            labelLine: {
                show: false
            },
            data: [
                {
                    value: 23.5,
                    name: '提存案款',
                    itemStyle: {
                        color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                            { offset: 0, color: '#00c9ff' },
                            { offset: 1, color: '#0080ff' }
                        ])
                    }
                },
                {
                    value: 8.7,
                    name: '未发还案款',
                    itemStyle: {
                        color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                            { offset: 0, color: '#ff9500' },
                            { offset: 1, color: '#ff6200' }
                        ])
                    }
                },
                {
                    value: 45.3,
                    name: '已发还案款',
                    itemStyle: {
                        color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                            { offset: 0, color: '#00ff88' },
                            { offset: 1, color: '#00cc66' }
                        ])
                    }
                }
            ]
        }]
    };
    fundFlowChart.setOption(fundFlowOption);

    // 6. 执行标的到位率趋势
    const targetTrendChart = echarts.init(document.getElementById('targetTrendChart'));
    const targetTrendOption = {
        tooltip: {
            trigger: 'axis',
            backgroundColor: 'rgba(0,0,0,0.8)',
            borderColor: '#4793ff'
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月'],
            axisLine: { lineStyle: { color: '#4793ff' } },
            axisLabel: { color: '#8899bb' }
        },
        yAxis: {
            type: 'value',
            axisLine: { lineStyle: { color: '#4793ff' } },
            axisLabel: { 
                color: '#8899bb',
                formatter: '{value}%'
            },
            splitLine: { lineStyle: { color: 'rgba(71,147,255,0.1)' } }
        },
        series: [{
            name: '到位率',
            type: 'line',
            smooth: true,
            symbol: 'circle',
            symbolSize: 8,
            sampling: 'average',
            itemStyle: {
                color: '#4793ff'
            },
            areaStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    { offset: 0, color: 'rgba(71,147,255,0.6)' },
                    { offset: 0.8, color: 'rgba(71,147,255,0.2)' },
                    { offset: 1, color: 'rgba(71,147,255,0.1)' }
                ])
            },
            data: [85.2, 86.7, 87.3, 88.1, 88.5, 88.9, 89.2, 89.4, 89.5]
        }]
    };
    targetTrendChart.setOption(targetTrendOption);

    // 响应式图表大小调整
    window.addEventListener('resize', function() {
        caseFlowChart.resize();
        dishonestMapChart.resize();
        workTrendChart.resize();
        qualityRadarChart.resize();
        fundFlowChart.resize();
        targetTrendChart.resize();
    });
}

// 初始化页面
document.addEventListener('DOMContentLoaded', function() {
    updateDateTime();
    setInterval(updateDateTime, 1000);
    
    // 延迟加载图表，确保DOM完全渲染
    setTimeout(initCharts, 100);
});

// 添加数据自动更新效果（模拟实时数据）
setInterval(function() {
    // 更新核心指标数值
    const metrics = document.querySelectorAll('.metric-value');
    metrics.forEach((metric, index) => {
        const currentValue = parseFloat(metric.textContent);
        const change = (Math.random() - 0.5) * 0.5;
        const newValue = (currentValue + change).toFixed(1);
        metric.childNodes[0].textContent = newValue;
    });
    
    // 更新统计数值
    const statValues = document.querySelectorAll('.stat-value');
    statValues.forEach((stat) => {
        const currentValue = parseInt(stat.textContent.replace(/,/g, ''));
        const change = Math.floor((Math.random() - 0.5) * 50);
        const newValue = (currentValue + change).toLocaleString();
        stat.textContent = newValue;
    });
}, 5000);