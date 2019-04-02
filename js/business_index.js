$().ready(function() {
	var id=GetQueryString("cat_id");
	if(id==4){
		$(".nav-list li:eq(0) a").addClass("active");
	}else if(id==5){
		$(".nav-list li:eq(1) a").addClass("active");
	}
	else if(id==6){
		$(".nav-list li:eq(2) a").addClass("active");
	}

//  $('.nav-list li a').click(function() {
//     $('.nav-list li a').removeClass('active');
//     $(this).addClass('active');
//      var id = $(this).data('id'); 
//      
//      if (id == 0) {
//          $('.nav-list-hidden').slideToggle();
//      }
//      $.get(cat_url, {id:id}, function(data) {
//          if (data) {
//              var html = '';
//              $.each(data,function(index,val){
//                  html+='<a class="detail-wrapper" href="business_detail.html?bus_id='+val["id"]+'">';
//					html+='<div class="title-wrapper"><h3>'+val["title"]+'</h3>';
//					html+='<div class="detail"><span>查看详情</span>';
//					html+='<span class="icon icon-right"></span> </div></div>';
//					html+='<div class="img-wrapper"><img class="img" src="'+val["image"]+'" alt=""></div></a>';
//              });
//              $('#business').html(html);
//          } else {
//              $('#business').html(empty);
//          }
//      });
//  });
    collect();
    function collect() {
        var oCollectBtn = $('.detail-wrapper .title-wrapper button');
        oCollectBtn.click(function () {
            $(this).siblings('h3').toggleClass('toggle');
        }) 
    }

    setUlWidth();
    function setUlWidth() {
        var liWidth = 0;
        $('.nav .nav-list li').each(function (k, v) {
            liWidth += $(v).width() + 20;
        })
        if (liWidth > $(window).width()) {
            $('.nav .nav-list').width(liWidth + 20);
        } else {
            $('.nav .nav-list').width($(document).width() * 0.88);
        }
    }
    
    $(document).on('click', '.description', function () {
        var imgSrcs = [];
        var oImg = $(this).find('img');
        oImg.each(function (key, val) {
            imgSrcs.push($(val).attr('src'));
        });
        $.photoBrowser({
            photos: imgSrcs
        }).open($(this).index());
    });
    
});

function GetQueryString(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if(r != null) return unescape(r[2]);
	return null;
}