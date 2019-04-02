$(function(){
	
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
    
    $(document).on('click', '#choose', function() {
        var date = $('#datetime-picker').val();
        $.get(team_money_url, {date:date}, function(data) {
//            console.log(data);
            $('.income-num').html(data.day_money);
            $('#month-money').html(data.month_money);
            var html = '';
            
            $.each(data.detail,function(index,array){
              if(!(array==null||array==undefined||array=="")){
                  var money = 0.00;
                  if (count_way == 1) {
                    money = array["buy_money"];
                  } else if (count_way == 2) {
                    money = array["buy_num"];
                  } else {
                    money = array["money"];  
                  }
                html += '<li><img src="'+array["user_info"]["headimgurl"]+'" alt="" />';
                html += '<span>'+array["user_info"]["name"]+'</span><p>+'+money+'<i class="icon icon-right"></i></p></li>';
              }
            });
            $('#detail').html(html);
        });
    });
});

function subDate(aim) {
	var str = $(aim).val();
	$(aim).val(str.substring(0, 11));
}
