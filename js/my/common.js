//弹框提示方法
function tusi(txt, fun) {
	$('.tusi').remove();
	//var div = $('<div class="tusi" style="background: url(/template/index/default/images/tusi.png);max-width: 85%;min-height: 77px;min-width: 270px;position: absolute;left: -1000px;top: -1000px;text-align: center;border-radius:10px;"><span style="color: #ffffff;line-height: 77px;font-size:20px;">' + txt + '</span></div>');
	var div = $('<div class="tusi" style="background:rgba(90, 91, 92, 0.8);padding:0px 20px;width: 80%;position: absolute;left: -1000px;top: -1000px;text-align: center;border-radius:10px; rgba(255, 255, 255, 80)"><span style="color: #ffffff;line-height: 50px;font-size:20px;">' + txt + '</span></div>');
	$('body').append(div);
	div.css('zIndex', 9999999);
	div.css('left', '10%');
	var top = parseInt($(window).scrollTop() + ($(window).height() - div.height()) / 2);
	div.css('top', top);
	setTimeout(function () {
		div.remove();
		if (fun) {
			eval("(" + fun + "())");
		}
	}, 2000);
}

function checkPhone(phone){
	var reg = /^0?1[3|4|5|7|8][0-9]\d{8}$/;
    if (reg.test(phone)) {
        return true;
    }else{
    	return false;
    }

}