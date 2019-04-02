$(document).ready(function () {

   


    /*点击默认地址时切换字体色和背景图*/
    toggleColor();    
    function toggleColor() {
        var oAddress = $('#main .wrapper .default-address');
        oAddress.click(function () {
            oAddress.removeClass('active');
            oAddress.css('backgroundImage', 'url('+imgurl+'/images/information/9.png)');
            $(this).addClass('active');
            $(this).css('backgroundImage', 'url('+imgurl+'/images/information/10.png)');
        })
    }

    /*弹窗询问是否删除地址*/
		var vid;
        $(document).on("click",'.delete',function(){
        	$('.mask').fadeIn();
        	vid=$(this).children("a").data("vid");
        	return false;
        });
        $('.btn-yes').click(function(){
            $('.mask').fadeOut();
            del_addre(vid);
        });
        $('.btn-no').click(function(){
        	$('.mask').fadeOut();
        });
})