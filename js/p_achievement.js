$(document).ready(function() {
	var myChart = echarts.init(document.getElementById('mychart'));
	window.onresize = myChart.resize;
	option = {
		lineStyle: {
			normal: {
				color: '#32A8FF'
			}
		},
		areaStyle: {
			normal: {
				//颜色渐变函数 前四个参数分别表示四个位置依次为左、下、右、上
				color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{

					offset: 0,
					color: 'rgba(170,226,251,1)'
				}, {
					offset: .34,
					color: 'rgba(170,226,251,0.7)'
				}, {
					offset: .68,
					color: 'rgba(170,226,251,0.22)'
				}, {
					offset: 1,
					color: 'rgba(170,226,251,0.00)'
				}])

			}
		},
		"color": [
			"#3fb1e3"
		],
		title: {
			text: month + '业绩分析',
			padding: [10, 0, 0, 40],
			textStyle: {
				fontWeight: 'normal',
				fontSize: '20px',
				lineHeight: 25
			}
		},
		tooltip: {
			trigger: 'axis',
			axisPointer: {
				type: 'cross',
				label: {
					backgroundColor: 'Lin'
				}
			}
		},
		toolbox: {
			show: false
		},
		grid: {
			left: '3%',
			right: '4%',
			bottom: '3%',
			containLabel: true
		},
		xAxis: [{
			splitLine: {
				show: false
			},
			type: 'category',
			boundaryGap: false
		}],
		yAxis: [{
			splitLine: {
				show: false
			},
			type: 'value',
			splitNumber: '2',
			minInterval: '5'
		}],
		series: [
			{
				type: 'line',
				stack: '总量',
				label: {
					normal: {
						show: false,
						position: 'top'
					}
				},
				areaStyle: {
					normal: {}
				}
			}
		]
	};
	myChart.setOption(option);

	$("#datetime-picker").datetimePicker({
		toolbarTemplate: '<header class="bar bar-nav"><button class="button button-link pull-left close-picker">取消</button><button class="button button-link pull-right close-picker" id="choose">确定</button><h1 class="title">选择日期和时间</h1></header>'
	});
	subDate($("#datetime-picker"))
	$("#datetime-picker").bind("click", function() {
		$(".picker-items-col-divider").hide().next().hide().next().hide();
		$(".picker-modal").css({
			background: "white"
		});
		$(".picker-items-col").css({
			margin: "0 2rem"
		});
		subDate(this);
		$(this).change(function() {
			subDate(this);
		});
	});
	//默认为当前时间
	var months = $("#datetime-picker").val().replace(/-/g, '').trim().substring(0, 6);
	var nowDay = $("#datetime-picker").val().replace(/-/g, '').trim();

	// console.log(months + ',' + nowDay)
	//获取总业绩
	getTotal(months);
	//获取本月业绩
	getNowmonth(months);
	//获取当日的个人业绩
	getPerson(months, nowDay);
	//获取当月业绩表数据
	getChart(months, myChart);

	$(document).on("click", "#choose", function() {
		months = $("#datetime-picker").val().replace(/-/g, '').trim().substring(0, 6);
		nowDay = $("#datetime-picker").val().replace(/-/g, '').trim();
		//获取总业绩
		getTotal(months);
		//获取本月业绩
		getNowmonth(months);
		//获取当日的个人业绩
		getPerson(months, nowDay);
		//获取当月业绩表数据
		getChart(months, myChart);
	});
});

function subDate(aim) {
	var str = $(aim).val();
	$(aim).val(str.substring(0, 11));
}
//获取总业绩方法
function getTotal(months) {
	$.post(allurls, {
			month: months,
            type: 'last'
		},
		function(data) {
						console.log(data.info.list[0])
			// var str = "0.00";
			// if(data.info.list[0] != "" && data.info.list[0] != null && data.info.list[0] != undefined) {
			// 	str = data.info.list[0].buy_money;
			// }
			// $("#total").text(str);

            var str = "0.00";
            var num = 0;
            if(data.money_count_way == 1){
                if(data.info.list[0] != "" && data.info.list[0] != null && data.info.list[0] != undefined) {
                    str = data.info.list[0].buy_money;
                    num = data.info.list[0].buy_num;
                }
                $("#total").text(str);
            } if(data.money_count_way == 2){
                //订单金额
                if(data.info.list[0] != "" && data.info.list[0] != null && data.info.list[0] != undefined) {
                    str = data.info.list[0].buy_money;
                    num = data.info.list[0].buy_num;
                }
                $("#total").text(num);
            } else if(data.money_count_way == 0 || data.money_count_way == null || data.money_count_way == ''){
                str = data.info;
                $("#total").text(str)
            }
		})
}
//本月业绩
//本月业绩
function getNowmonth(months) {
    $.post(allurls, {
            month: months,
            type: 'month'
        },
        function(data) {
            var str = "0.00";
            var num = 0;
            if(data.money_count_way == 1){
                if(data.info.list[0] != "" && data.info.list[0] != null && data.info.list[0] != undefined) {
                    str = data.info.list[0].buy_money;
                    num = data.info.list[0].buy_num;
                }
                $("#month-money").text(str);
            } if(data.money_count_way == 2){
                //订单金额
                if(data.info.list[0] != "" && data.info.list[0] != null && data.info.list[0] != undefined) {
                    str = data.info.list[0].buy_money;
                    num = data.info.list[0].buy_num;
                }
                $("#month-money").text(num);
            } else if(data.money_count_way == 0 || data.money_count_way == null || data.money_count_way == ''){
                str = data.info;
                $("#month-money").text(str);
            }
            //			console.log(data);
        });
}

//获取当天个人业绩
function getPerson(months, days) {
	$.post(allurls, {
			month: months,
			day: days,
            type: 'day'
		},
		function(data) {
//						console.log(data)
			// var str = "0.00";
			// if(data.info.list[0] != "" && data.info.list[0] != null && data.info.list[0] != undefined) {
			// 	str = data.info.list[0].buy_money;
			// }
			// $(".income-num").text(str);

            var str = "0.00";
            var num = 0;
            if(data.money_count_way == 1){
                if(data.info.list[0] != "" && data.info.list[0] != null && data.info.list[0] != undefined) {
                    str = data.info.list[0].buy_money;
                    num = data.info.list[0].buy_num;
                }
                $(".income-num").text(str);
            } if(data.money_count_way == 2){
                //订单金额
                if(data.info.list[0] != "" && data.info.list[0] != null && data.info.list[0] != undefined) {
                    str = data.info.list[0].buy_money;
                    num = data.info.list[0].buy_num;
                }
                $(".income-num").text(num);
            } else if(data.money_count_way == 0 || data.money_count_way == null || data.money_count_way == ''){
                str = data.info;
                $(".income-num").text(str);
            }
		});
}

//获取业绩分析表
function getChart(months, myChart,days) {
    $.post(allurls, {
            month: months,
            type: 'month_chart'
        },
        function(data) {
            if(data.info != "" || data.info.list != null) {
                var days = [];
                var val = [];
                var chartData = [];
                if(data.money_count_way == 1){
                    $.each(data.info.list, function(key, value) {
                        days.push(value.day.substring(6, 8));
                        val.push(value.buy_money);
                    })
                } if(data.money_count_way == 2){
                    $.each(data.info.list, function(key, value) {
                        days.push(value.day.substring(6, 8));
                        val.push(value.buy_num);
                    })
                } else if(data.money_count_way == 0 || data.money_count_way == null || data.money_count_way == ''){
                    $.each(data.info, function(key, value) {
                        days.push(value.day.substring(6, 8));
                        val.push(value.money);
                    })
                }
//				//				b-a大到小，a-b小倒大
//				days.sort(function(a, b) {
//					return b - a
//				})
//				val.sort(function(a,b){
//					return b-a
//				})
                for(var i = 0; i < getDateDay(months).length; i++) {
                    for(var j = 0; j < days.length; j++) {
                        if(i == (days[j])) {
                            chartData[i] = {
                                name: i,
                                value: val[j]
                            }
                            break;
                        }
                        chartData[i] = {
                            name: i,
                            value: 0
                        }
                    }
                }
//								console.log(chartData)
                //				chartData=eval(chartData)
                myChart.setOption({
                    title: {
                        text: months + '业绩分析',
                        padding: [10, 0, 0, 40],
                        textStyle: {
                            fontWeight: 'normal',
                            fontSize: '20px',
                            lineHeight: 25
                        }
                    },
                    xAxis: [{
                        data: getDateDay(months)
                    }],
                    series: [{
                        data: chartData
                    }]
                });

            }

            //			console.log(data)
        });
}

//获取当月的天数
function getDateDay(months) {
    var year = months.substring(0, 4);
	var month = months.substring(5, 6);
    var time = new Date(year, month, 0);
    var day = time.getDate();
	var fullday = [];
	for(var i = 0; i <= day; i++) {
		fullday[i] = i;
	}
	return fullday;
}