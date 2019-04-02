$(function() {
  var moneyChart = echarts.init($('#moneyChart').get(0));
  var enable = $('.enable').find('p').text();
  var disable = $('.disable').find('p').text();
	var balance = $(".balance").find('p').text();
  var total = enable + disable;
//enable = enable - 0.1 * enable;
//disable = disable - 0.5 * disable;

  $(window).resize(function() {
    moneyChart.resize();
  })

  var option = {
    tooltip: {
      show: false
    },
    legend: {
      show: false
    },
    label: {
      normal: {
        show: false
      }
    },
    labelLine: {
      normal: {
        show: false
      }
    },
    series: [{
      name: '货款',
      type: 'pie',
      radius: ['67%', '70%'],
      labelLine: {
        normal: {
          show: false
        }
      },
      data: [{
        value: enable,
        name: '',
        itemStyle: {
          normal: {
            color: '#f7f7f7'
          },
          emphasis: {
            color: '#f7f7f7'
          }
        },
        hoverAnimation: false
      }, {
        value: enable,
        name: '货款',
        itemStyle: {
          normal: {
            color: '#71ebd1',
            borderColor: new echarts.graphic.LinearGradient(0, .2, 1, 1, [{
              offset: 0,
              color: '#71ebd1'
            },{
              offset: 1,
              color: '#0da9ef'
            }]),
            borderWidth: 5
          }
        },
        label: {
          normal: {
            show: false
          }
        },
        clockWise: false,
        hoverAnimation: false
      }]
    }, {
      name: '运费',
      type: 'pie',
      center: ['50%', '50%'],
      radius: ['47%', '50%'],
      labelLine: {
        normal: {
          show: false
        }
      },
      data: [{
        value: disable,
        name: '',
        itemStyle: {
          normal: {
            color: '#f7f7f7'
          },
          emphasis: {
            color: '#f7f7f7'
          }
        },
        hoverAnimation: false
      }, {
        value: disable,
        name: '运费',
        itemStyle: {
          normal: {
            color: '#ff806a',
            borderColor: new echarts.graphic.LinearGradient(0, .2, 1, 1, [{
              offset: 0,
              color: '#ff806a'
            }, {
              offset: 1,
              color: '#ff4371'
            }]),
            borderWidth: 5
          }
        },
        label: {
          normal: {
            show: false
          }
        },
        hoverAnimation: false
      }]
    },{
      name: '返利余额',
      type: 'pie',
      center: ['50%', '50%'],
      radius: ['27%', '30%'],
      labelLine: {
        normal: {
          show: false
        }
      },
      data: [{
        value: balance,
        name: '',
        itemStyle: {
          normal: {
            color: '#f7f7f7'
          },
          emphasis: {
            color: '#f7f7f7'
          }
        },
        hoverAnimation: false
      }, {
        value: balance,
        name: '返利余额',
        itemStyle: {
          normal: {
            color: '#FCF56F',
            borderColor: new echarts.graphic.LinearGradient(0, .2, 1, 1, [{
              offset: 0,
              color: '#FCF56F'
            }, {
              offset: 1,
              color: '#FCEF04'
            }]),
            borderWidth: 5
          }
        },
        label: {
          normal: {
            show: false
          }
        },
        hoverAnimation: false
      }]
    }]
  };
  moneyChart.setOption(option);
})
