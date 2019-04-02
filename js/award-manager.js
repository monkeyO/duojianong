$().ready(function() {
  subDate(this);
  $("#datetime-picker1").datetimePicker({
    toolbarTemplate: '<header class="bar bar-nav"><button class="button button-link pull-left close-picker">取消</button><button class="button button-link pull-right close-picker time-picker">确定</button><h1 class="title">选择要跳转的日期</h1></header>'
  });
  $("#datetime-picker1").bind("click", function() {
   // $(".picker-items-col-divider").prev().hide()
    $(".picker-items-col-divider").hide().next().hide().next().hide();
    $(".picker-modal").css({
      background: "white"
    });
    $(".picker-items-col").css({
      margin: "0 2rem"
    });
    subDate(this,1);
    $(this).change(function() {
      console.log(1)
      subDate(this,1);
    });
  });
  $("#datetime-picker2").datetimePicker({
    toolbarTemplate: '<header class="bar bar-nav"><button class="button button-link pull-left close-picker">取消</button><button class="button button-link pull-right close-picker time-picker">确定</button><h1 class="title">选择要跳转的日期</h1></header>'
  });
  $("#datetime-picker2").bind("click", function() {
    $(".picker-items-col-divider").prev().hide()
    $(".picker-items-col-divider").hide().next().hide().next().hide();
    $(".picker-modal").css({
      background: "white"
    });
    $(".picker-items-col").css({
      margin: "0 2rem"
    });
    subDate(this,2);
    $(this).change(function() {
      subDate(this,2);
    });
  });
  //初始化时间
  $("#datetime-picker1").val(dateFormat("yyyy-MM-dd", Date.parse(new Date())));
  $("#datetime-picker2").val(dateFormat("yyyy-MM", Date.parse(new Date())));
 
  //监听日期选择
  $(document).on('click', '.time-picker', function() {
    var str = $(".award-menu").find('a.active').eq(0).attr("href");
    $('.award-manager' + str).find(".award-num").empty();
    $('.award-manager' + str).find(".list-wrapper").empty();
    console.log($("#datetime-picker" + str).val())
  })
  
//获取数据
  function getData(){

  	
  }
 

  //获取奖励的数据

  //滚动加载
  $(document).on('infinite', '.infinite-scroll', function() {
    var str = $(".award-menu").find('a.active').eq(0).attr("href");

    if($('.award-manager' + str).find('.infinite-scroll-preloader').data('load') == "true") {
      return;
    }
    $('.award-manager' + str).find('.infinite-scroll-preloader').attr('data-load', 'true');
//    setTimeout(function() {
      getAwardData(str, getNowMonth());
//    }, 1000)
  });

});

//开启模块
if($(".award-menu").find('a.active').length != 0) {
  var str = $(".award-menu").find('a.active').eq(0).attr("href");
  $(".content section").hide();
  var content = '.award-manager' + str;
  $(content).fadeIn();
}

function subDate(aim,num) {
  var str = $(aim).val();
  if(num==1){
  	$(aim).val(str.substring(0, 10));
  }else{
  	 $(aim).val(str.substring(0, 7));
  }
}
//获取当前年月时间
function getNowMonth() {
  var time = new Date();
  return time.getFullYear().toString() + ((time.getMonth() + 1) > 9 ? "" : "0") + (time.getMonth() + 1).toString();
}
//转换日期格式
function dateFormat(format, dates) {
  _this = new Date(dates);
  var o = {
    "M+": _this.getMonth() + 1, //月份
    "d+": _this.getDate(), //日
    "H+": _this.getHours(), //小时
    "m+": _this.getMinutes(), //分
    "s+": _this.getSeconds(), //秒
    "q+": Math.floor((_this.getMonth() + 3) / 3), //季度
    "f+": _this.getMilliseconds() //毫秒
  };
  if(/(y+)/.test(format))
    format = format.replace(RegExp.$1, (_this.getFullYear() + "").substr(4 - RegExp.$1.length));
  for(var k in o)
    if(new RegExp("(" + k + ")").test(format))
      format = format.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k])
        .substr(("" + o[k]).length)));
  return format;
};


