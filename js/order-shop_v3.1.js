$(document).ready(function () {
    var startX = 0,
        startY = 0;
    var page = 1;
    var id = 0;
    var loading = false;
    var isNull = false;
    var scrollflag = 1;
    var type = '';
    var sort = '';
    
    if($('#kind-head').length!=0){
        $('.container').css({paddingTop:$('.manager-order').height()+70+"px"});
    }else{
        $('.container').css({paddingTop:$('.manager-order').height()+"px"});
    }
    

    //获取第一级分类数据
    getFirstList();

    //获取商品列表
    getGoods(id);

    //开启滚动加载
    $.attachInfiniteScroll($('.infinite-scroll'));
    $(document).on('infinite', '.infinite-scroll', function () {
        // 如果正在加载，则退出
        if (loading) return;
        // 设置flag
        loading = true;
        setTimeout(function () {
            
            if (isNull) {
                $.detachInfiniteScroll($('.infinite-scroll'));
                $('.infinite-scroll-preloader').remove();
                loading = false;
                return;
            }
            id = $('#mask').data('id');
            page++;
            var oValue = $('#search').val()
            if (oValue) {
                $.post(orderSearchURL, {
                    name: oValue,
                    page_num: page
                }, function (data) {
                    renderString(data);
                })
            } else {
                getGoods(id, type, sort);
            }
            
        }, 1000);
    });

    $(window).resize(function(){
        $('#products li .img-wrapper').css('height',$('#products li').width()+'px');
    });

    $('#search').bind('input propertychange', function () {
        var oValue = $(this).val();
        initializeString();
        $.post(orderSearchURL, {
            name: oValue,
            page_num: page
        }, function (data) {
            renderString(data);
        })
    })

    $("a.order").children("img").attr('src', TP_PUBLIC + '/Admin_v3/images/footer3.jpg').siblings(".text").css({
        color: "#1d4a78"
    });

    $(".container").bind("scroll", slidenav);

    $("#search").bind("input", function () {
        $(this).css({
            textAlign: "left"
        });
        $(".icon-search").hide();
    });

    $("#search").bind("input", function () {
        if ($(this).val() == "") {
            $(".icon-search").show();
            $(this).css({
                textAlign: "center"
            });
        }
    });

    $('#first-li').click(function () {
        var oId = $('.goods-title li').eq(1).data('id');
        $('.goods-title li').removeClass('active').eq(1).addClass('active');
        $('.sidebar').addClass('active');
        $('.goods-list').empty();
        $.post(orderNavSonURL, {
            pid: oId
        }, function (data) {
//          console.log(data);
            if (data.code == 1) {
                var html = '';
                $.each(data.info.two, function (key1, val1) {
                    html += '<div class="goods-wrapper clearfix"><h3 data-id="' + val1.id + '">' + val1.name + '</h3>';
                    var content = '';
                    $.each(data.info.three, function (key2, val2) {
                        if (key2 == val1.id) {
                            $.each(val2, function (key3, val3) {
                                content += '<div class="product">' +
                                    '<div class="img-wrapper"><img src="' + val3.image + '" alt=""></div>'+
                                    '<p data-id=' + val3.id + '>' + val3.name + '</p>' +
                                    '</div>';
                            })
                        }
                    })
                    html += content + '</div>';
                })
                $('.goods-list').append(html);
            }
        })
    })

    $('.sidebar h2 img').click(function () {
        type = '';
        sort = '';
        var oId = $(this).data('id');
        $('#mask').attr('data-id', oId);
        $('.sidebar').removeClass('active');
        $('.price').attr('data-sort', '').find('p').removeClass();
        initializeString();
        getGoods(id);
    })

    //价格升降序Icon的切换
    $('.shop-nav-list li').eq(2).find('p').click(function () {
        if (!$(this).hasClass('up') && !$(this).hasClass('down')) {
            $(this).addClass('up');
        } else if ($(this).hasClass('up')) {
            $(this).removeClass('up').addClass('down');
        } else if ($(this).hasClass('down')) {
            $(this).removeClass('down').addClass('up');
        }
    })


    $('.shop-nav-list').on('click', '.sales', function () {
        id = $('#mask').data('id');
        type = 'sales';
        initializeString();
        getGoods(id, type);
    })

    $('.shop-nav-list').on('click', '.price', function () {
        if ($(this).data('sort') == 'asc') {
            $(this).attr('data-sort', 'desc');
        } else {
            $(this).attr('data-sort', 'asc');
        }
        id = $('#mask').data('id');
        type = 'price';
        sort = $(this).data('sort');
        initializeString();
        getGoods(id, type, sort);
    })


    //获取第二第三级分类数据，以及渲染商品数据
    $('.goods-title ul').on('click', 'li', function () {
        type = '';
        sort = '';
        var oId = $(this).data('id');
        var hasChild = $(this).data('child');
        $(this).addClass('active').siblings().removeClass('active');
        $('.price').attr('data-sort', '').find('p').removeClass();
        $('.goods-list').html('');
        $('#mask').attr('data-id', oId);
        initializeString();
        if (oId == 0) {
            $('.sidebar').removeClass('active');
            getGoods();
        } else if (hasChild == 0) {
            $('.sidebar').removeClass('active');
            getGoods(oId);
        } else {
            getThirdList(oId);
        }
    })

    //点击第三级分类退出分类页面，渲染该分类数据
    $(document).on('click', '.product', function () {
        var oId = $(this).find('p').data('id');
        $('#mask').attr('data-id', oId);
        $('.sidebar').removeClass('active');
        initializeString();
        getGoods(oId);
    })

    function getFirstList() {
        $.post(orderNavURL, function (data) {
            if (data.code == 1) {
                var html = '';
                $.each(data.info.one, function (key, val) {
                    html += '<li data-id=' + val.id + ' data-child=' + val.has_child + '>' + val.name + '</li>'
                })
                $('.goods-title ul').append(html);
            }
        })
    }

    
    function getGoods(id, type, sort) {
        $.post(orderDedetailURL, {
            page_num: page,
            category: id,
            type: type,
            sort: sort
        }, function (data) {
            renderString(data);
        })
    }
    
    
    function slidenav() {
//      console.log($(".container").scrollTop());
        if ($(".container").scrollTop() > 20) {
            $("#kind-head").stop(true, false).hide(1);
            $("#kind-head").removeClass('slidedown');
            $("#kind-head").removeClass('slidedown').addClass('slideup');
            if($('#kind-head').length!=0){
                $('.container').css({paddingTop:$('.manager-order').height()+70+"px"});
            }else{
                $('.container').css({paddingTop:$('.manager-order').height()+"px"});
            }
        }else if($(".container").scrollTop() == 0){
            $("#kind-head").removeClass('slideup').addClass('slidedown');
            $("#kind-head").slideDown();
            if($('#kind-head').length!=0){
                $('.container').css({paddingTop:$('.manager-order').height()+74+"px"});
            }else{
                $('.container').css({paddingTop:$('.manager-order').height()+"px"});
            }
        }
//      if ($(".content").scrollTop() > 85) {
//          $(".container").css({
//              paddingTop: "7rem"
//          });
//          $("#kind-head").stop(true, false).hide(1);
//          $("#kind-head").removeClass('slidedown');
////          $("#kind-head").removeClass('slidedown').addClass('slideup');
//          $(".manager-kind").css({
//              position: "fixed"
//          });
//          $(".hidden-scorll").css({
//              position: "fixed",
//              top: "4rem"
//          });
//      } else if ($(".content").scrollTop() == 0) {
//          $(".container").css({
//              paddingTop: "0rem"
//          });
//          $("#kind-head").addClass('slidedown');
////          $("#kind-head").slideDown();
//          $(".manager-kind").css({
//              position: "static"
//          }).children(":eq(0)").css({
//              display: "flex"
//          });
//          $(".hidden-scorll").css({
//              position: "relative",
//              top: "0"
//          });
//      }
    }
    
    

    //数据重置
    function initializeString() {
        page = 1;
        isNull = false;
        loading = true;
        var shtml = '<div class="infinite-scroll-preloader"><div class="preloader"></div></div>';
        if (!$('.infinite-scroll-preloader').find('div').hasClass('preloader')) {
            $('.shop-items').after(shtml);
        }
        $.attachInfiniteScroll($('.infinite-scroll'));
        setTimeout(function () {
            loading = false;
        }, 1000)
        $('#products').html('');
        $('#apply-list').html('');
    }


    //渲染数据
    function renderString(data) {
        var html = '';
        if (data) {
            if (data.info.list == null || data.info.list == undefined || data.info.list == "") {
                str = '<li style="font-size:1rem;border:none;text-align:center; line-height: 70px;"><span style="margin: 0 auto;">暂无更多数据！</span></li>';
                $('#apply-list').html(str);
                $.detachInfiniteScroll($('.infinite-scroll'));
                $('.infinite-scroll-preloader').remove();
                isNull = true;
            } else {
                if ((data.info.list.length) < 4) {
                    $.detachInfiniteScroll($('.infinite-scroll'));
                    $('.infinite-scroll-preloader').remove();
                }
                if(is_stock!="1"){
                    $.each(data.info.list, function (index, val) {
                        // html += '<li">';
                        // html += '<a href="goods_detail?id=' + val.id +
                        //     '" class="external">';
                        // html += '<img src="' + val.image + '" />';
                        // html += '<p>' + val.name + '</p>';
                        // html += '<p>￥' + val.price + '</p>';
                        // html += '<p>96%好评</p>';
                        // html += '<img src="__PUBLIC__/Admin_v3/images/manager-order/icon-car.png">';
                        // html += '</a></li>';
    
                        html += '<li>' +
                                    '<a href="goods_detail?id=' + val.id + '" class="external">' +
                                        '<div class="img-wrapper">'+
                                            '<img src="'+ root + val.image + '" />' +
                                        '</div>'+
                                        '<p>' + val.name + '</p>' +
                                        '<p>￥' + val.price + '</p>' +
                                        '<p>销量:'+val.sales+'件</p>' +
                                        '<i class="icon icon-car cart" data-property="' + val.has_property + '" data-id="' + val.id + '"></i>' +
                                    '</a>' +
                                '</li>';
                    });
                }else{
                    $.each(data.info.list, function (index, val) {
                        // html += '<li">';
                        // html += '<a href="goods_detail?id=' + val.id +
                        //     '" class="external">';
                        // html += '<img src="' + val.image + '" />';
                        // html += '<p>' + val.name + '</p>';
                        // html += '<p>￥' + val.price + '</p>';
                        // html += '<p>96%好评</p>';
                        // html += '<img src="__PUBLIC__/Admin_v3/images/manager-order/icon-car.png">';
                        // html += '</a></li>';
    
                        html += '<li>' +
                                    '<a href="goods_detail?id=' + val.id + '" class="external">' +
                                        '<div class="img-wrapper">'+
                                            '<img src="'+ root + val.image + '" />' +
                                        '</div>'+
                                        '<p>' + val.name + '</p>' +
                                        '<p>￥' + val.price + '</p>' +
                                        '<p>销量:'+val.sales+'件</p>' +
                                        '<i class="icon icon-car cart" data-property="' + val.has_property + '" data-id="' + val.id + '"></i>' +
                                    '</a>' +
                                '</li>';
                    });
                }
                
            }
            $('#products').append(html);
            loading = false;
            $('#products li .img-wrapper').css('height',$('#products li').width()+'px');
        }
    }

    function getThirdList(oId) {
        $.post(orderNavSonURL, {
            pid: oId
        }, function (data) {
//          console.log(data);
            if (data.code == 1) {
                var html = '';
                $.each(data.info.two, function (key1, val1) {
                    html += '<div class="goods-wrapper clearfix"><h3 data-id="' + val1.id + '">' + val1.name + '</h3>';
                    var content = '';
                    $.each(data.info.three, function (key2, val2) {
                        if (key2 == val1.id) {
                            $.each(val2, function (key3, val3) {
                                content += '<div class="product">' +
                                        '<div class="img-wrapper">'+    
                                            '<img src="' + val3.image + '" alt="">' +
                                        '</div>' +
                                        '<p data-id=' + val3.id + '>' + val3.name + '</p>' +
                                    '</div>';
                            })
                        }
                    })
                    html += content + '</div>';
                })
                $('.goods-list').append(html);
            }
        })
    }

    $.ajax({
        url: getCountUrl,
        type: 'get',
        dataType: 'json',
        success: function(data){
            if(data.code == 1) {
                // 显示购物车数量
                if(data.result.cart_count == 0) {
                    $('.cart_count').hide();
                } else {
                    $('.cart_count').show().text(data.result.cart_count);
                }
                
                // 显示待发货数量
                if(data.result.no_delivery_count == 0) {
                    $('.no_delivery_count').hide();
                } else {
                    $('.no_delivery_count').show().text(data.result.no_delivery_count);
                }

                // 显示已发货数量
                if(data.result.yes_delivery_count == 0) {
                    $('.yes_delivery_count').hide();
                } else {
                    $('.yes_delivery_count').show().text(data.result.yes_delivery_count);
                }
                
            }
        }
    })
    // $('#first-li').click();
    // setTimeout(function () {
    //     $('.goods-title li').eq(1).click();
    // },200)
    //点击购物车提示
//  $(document).on('click', ".cart", function (event) {
//      var num = 1;
//      var id = $(this).data("id");
//      
//      //属性
//      var property = $(this).data("property");
//      if (property == 1) {
//          //属性
//          _id = id;
//          getProperties($('#skus-menu').find('.select-middle'));
//          $('.mask').show();
//      } else {
//          $.post('add_shopping_cart', {
//              id: id,
//              num: num
//          }, function (data) {
//              tusi(data.msg)
//          });
////      }
//      return false;
//  });
    
    
});