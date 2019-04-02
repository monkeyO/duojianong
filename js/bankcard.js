//$(document).ready(function () {
//  $(document).on('click', '.card', function () {
//      $('.card .default').addClass('hide').removeClass('show');
//      $(this).find('.default').addClass('show').removeClass('hide');
//      console.log($(this).data("id"));
//      var cid=$(this).data("id");
//      $.post(changeCard,
//      	{pay_way_id:cid},
//      	function(data){
//      		console.log(data.msg);
//      });
//  })
//
//})

//监听长按操作
var timeOutEvent = 0;
$(document).on({
    touchstart: function(e) {
        timeOutEvent = setTimeout(function() {
            longPress(e)
        }, 1000);
        e.preventDefault();
    },
    touchmove: function(e) {
        clearTimeout(timeOutEvent);
        timeOutEvent = 0;
        $('.control_wrapper').css("opacity", "0");
        $('.control_wrapper .hide_c').hide();
    },
    touchend: function(e) {
        clearTimeout(timeOutEvent);
        if(timeOutEvent != 0) {
            chooseCard($(e.target).parent('.card'), e);
            return false;
        }
    }
}, '.control_wrapper');

//监听点击删除按钮操作
$(document).on('click touchend', '.del', function(event) {
    var id = $(this).data('id');
    del_bankcard(id);
    return false;
})
//监听点击取消按钮操作
$(document).on('click touchend', '.cancel', function(event) {
    cancelControl($(this));
});

$(document).on('click touchend', '.edit', function(event) {
    window.location.href = $(this).attr('href');
});

// 长按弹出操作层
function longPress(e) {
    timeOutEvent = 0;
    $(e.target).css("opacity", '1').find('.hide_c').show();
}
//选择银行卡
function chooseCard(aim, event) {
    var flag = ($(event.target).attr('class') == 'control_wrapper');
    if(!flag) {
        return;
    } else {
        $('.card .default').addClass('hide').removeClass('show');
        $(aim).find('.default').addClass('show').removeClass('hide');
        var cid = $(aim).data("id");
        $.post(changeCard, {
                pay_way_id: cid
            },
            function(data) {});
    }
}
//删除银行卡
function del_bankcard(id) {

    $.modal({
        title: '删除银行卡',
        text: '是否删除该银行卡？',
        buttons: [{
                text: '删除',
                onClick: function() {
                    $.post(delCard, {
                        id: id
                    }, function(data) {
                        if(data.code == 1) {
                            $.toast(data.msg);
                            setTimeout(function() {
                                window.location.href = changeURLArg(window.location.href, "reloadtime", new Date().valueOf());
                            }, 2000);
                        }
                    });
                }
            },
            {
                text: '取消',
                close: true,
            }
        ]
    });

    event.stopPropagation();
}
//取消操作层
function cancelControl(aim) {
    aim.parent().parent('.hide_c').hide().parent('.control_wrapper').css("opacity", "0");
}
//设置url参
function changeURLArg(url, arg, arg_val) {
    var pattern = arg + '=([^&]*)';
    var replaceText = arg + '=' + arg_val;
    if(url.match(pattern)) {
        var tmp = '/(' + arg + '=)([^&]*)/gi';
        tmp = url.replace(eval(tmp), replaceText);
        return tmp;
    } else {
        if(url.match('[\?]')) {
            return url + '&' + replaceText;
        } else {
            return url + '?' + replaceText;
        }
    }
    return url + '\n' + arg + '\n' + arg_val;
}