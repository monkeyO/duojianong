$(document).ready(function() {
    var readList = [];
    
    $('.buttons-tab').find('a').eq(0).addClass('active');
    var tab_active = $('.buttons-tab').find('a').eq(0).attr('href');
    $(tab_active).addClass('active');

    $('.click-area').on('click', function() {
        var aim = $('.buttons-tab').find('.active').attr('href');
        if($('.top-bar').hasClass('active')) {
            var aActive = 0;
            $(aim + '.message-list li .content-top h3').each(function(index, value) {
                if($(value).hasClass('active')) {
                    aActive++;
                }
            })
            if(aActive > 0) {
                $('.top-bar').removeClass('active');
                $('.top-bar button').removeClass('active');
            }

        } else {
            var aActive = 0;
            $(aim + '.message-list li .content-top h3').each(function(index, value) {
                if($(value).hasClass('active')) {
                    aActive++;
                }
            })
            if(aActive > 0) {
                $('.top-bar button').addClass('active');
                $('.top-bar').addClass('active');
            }
        }
    });
    $('.top-bar').on('click', 'button', function() {
        var aim = $('.buttons-tab').find('.active').attr('href');
        $(aim + '.message-list li').each(function(index, value) {
            $(value).find('.content-top h3').removeClass('active');
            readList.push($(value).data('id'));
        })
        $.post(read_url, {
            id: readList
        }, function(data) {});
        $('.top-bar button').removeClass('active');
        $('.top-bar').removeClass('active');
    })
    $('.message').on('click', 'li', function() {
        if($(this).find('.read').length > 0) {
            $(this).find('.read').removeClass('read');
            $(this).find('.content-top .active').removeClass('active');
            readList.push($(this).data('id'));
            $.post(read_url, {
                id: readList
            }, function(data) {
                readList = [];
            });
        }
    });

    $('.buttons-tab a').bind('click', function() {
        if($(this).attr('data-next') == "true") {
            addScroll(this);
            if($(this).attr('data-page') == 1) {
                get_msg(this);
            }
        } else {
            removeScroll(this);
        }
    });
    $.attachInfiniteScroll($('.infinite-scroll'));
    //婊氬姩鍔犺浇
    $(document).on('infinite', '.infinite-scroll', function() {
        // 濡傛灉姝ｅ湪鍔犺浇锛屽垯閫€鍑�
        if(loading) return false;
        get_msg($('.buttons-tab').find('.active'));
    });

    get_msg($('.buttons-tab').find('.active'));
});

function get_msg(_this) {
    if(loading) return false;
    loading = !loading;
    var page_num = $(_this).attr('data-page');
    var type = $(_this).attr('data-type');
    $.post(get_msg_url, {
        page_num: page_num,
        type: type
    }, function(data) {
        if(data.code == 1) {
            if(data.list != null && data.list != "" && data.list != undefined) {
                var temp = [];
                if(data.list.length < 10) {
                    removeScroll(_this);
                } else {
                    addScroll(_this);
                }
                $.each(data.list, function(k, v) {
                    var title = v.title;
                    var isactive = (v.status == 0 ? 'active' : '');
                    var isread = (v.status == 0 ? 'read' : '');
                    if(type != "user") {
                        title = "绯荤粺娑堟伅";
                        isactive = '';
                        isread = '';
                    }
                    var html = '<li data-id="' + v.id + '"><div class="content-top"><h3 class="' + isactive + '">' + title + '</h3></div>' +
                        '<div class="content-bottom"><p class="' + isread + '">' + v.content + '</p><div class="text-wrapper">' +
                        '<p>' + dateFormat("yyyy-MM-dd HH:mm", parseInt(v.time + "000")) + '</p></div></div></li>';
                    temp.push(html);
                });

                var aim = $(_this).attr('href');
                $(aim + ' .message').append(temp);
            } else {
                removeScroll(_this)
            }
            $(_this).attr('data-page', (parseInt(page_num) + 1));
        } else {
            console.log(data.msg);
        }
        loading = false;
    });
}

function removeScroll(aim) {
    $.detachInfiniteScroll($('.infinite-scroll'));
    $('.infinite-scroll-preloader').remove();
    $(aim).attr('data-next', 'false');
}

function addScroll(aim) {
    $.attachInfiniteScroll($('.infinite-scroll'));
    if($('.infinite-scroll-preloader').length <= 0) {
        $('.tabs').after('<div class="infinite-scroll-preloader"><div class="preloader"></div></div>');
    }
    $(aim).attr('data-next', 'true');
}

function dateFormat(format, dates) {
    _this = new Date(dates);
    var o = {
        "M+": _this.getMonth() + 1, //鏈堜唤
        "d+": _this.getDate(), //鏃�
        "H+": _this.getHours(), //灏忔椂
        "m+": _this.getMinutes(), //鍒�
        "s+": _this.getSeconds(), //绉�
        "q+": Math.floor((_this.getMonth() + 3) / 3), //瀛ｅ害
        "f+": _this.getMilliseconds() //姣
    };
    if(/(y+)/.test(format))
        format = format.replace(RegExp.$1, (_this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for(var k in o)
        if(new RegExp("(" + k + ")").test(format))
            format = format.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k])
                .substr(("" + o[k]).length)));
    return format;
};