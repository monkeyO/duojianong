$().ready(function() {

    var errorno = 1;
    var loading = false;
    var loadings = false;
    var allpage = 1;
    var page1 = 1;
    var page2 = 1;
    var page3 = 1;
    var page4 = 1;
    var page6= 1;
    var stat = ''; //1：代审核	2：已发货		3：已收货
    var target = $("#tab1").children(".content-block");

    var part = window.location.search.split('=')[1];
    $('.buttons-tab a').removeClass('active');
    $('.tabs .tab').removeClass('active');

    $('.buttons-tab a[href="#tab'+part+'"]').addClass('active');
    $('#tab'+part).addClass('active');
    target = $('#tab'+part).children('.content-block');
    stat = $('.buttons-tab a[href="#tab'+part+'"]').attr('data-stat');
    // console.log(stat);
//  switch (part) {
//      case '1':
//          $('.buttons-tab a').eq(0).addClass('active');
//          target = $("#tab1").children(".content-block");
//          $('#tab1').addClass('active');
//          stat = '';
//          break;
//      case '2':
//          $('.buttons-tab a').eq(1).addClass('active');
//          target = $("#tab2").children(".content-block");
//          $('#tab2').addClass('active');
//          stat = 1;
//          break;
//      case '3':
//          $('.buttons-tab a').eq(2).addClass('active');
//          target = $("#tab3").children(".content-block");
//          $('#tab3').addClass('active');
//          stat = 2;
//          break;
//      case '3':
//          $('.buttons-tab a').eq(2).addClass('active');
//          target = $("#tab3").children(".content-block");
//          $('#tab3').addClass('active');
//          stat = 2;
//          break;
//  }


    //获取信息的方法
    addItems(target)

    function addItems(aim) {
        var html = [];
        var types = "take"
        var count = 0;
        var page = '';

        if(stat == '') {
            page = allpage;
            allpage = allpage + 1;
        } else if(stat == 1) {
            page = page1;
            page1 = page1 + 1;
        } else if(stat == 2) {
            page = page2;
            page2 = page2 + 1;
        } else if(stat == 3) {
            page = page3;
            page3 = page3 + 1;
        }
        else if(stat == 6) {
            page = page6;
            page6 = page3 + 1;
        }

        $.post(allurl, {
                status: stat,
                type: types,
                page_num: page
            },
            function(data) {
                // console.log(data);
                if(data.code == 1) {
                    var str = '';
                    if(data.info.list == null || data.info.list == undefined || data.info.list == "") {
                        if(page==1){
                            str = '<div style="position: relative;margin-top: 30%;left: 50%;width:50%;transform: translate3d(-50%,0,0);text-align: center;">'+
                                '<img src="'+emptyimg+'" alt="" width="100%" style="margin-bottom: 20px;"/>'+
                                '<a href="index" class="external" style="color:#fc4735;border:1px solid #fc4735;padding: .5rem;border-radius: 5px;">去逛逛</a></div>'
                            aim.parent().append(str)
                        } else {
                            // str = '<dl class="no-data"><p style="text-align:center">暂无更多数据！</p></dl>';
                            // aim.append(str);
                            if (aim.find('.no-data').length == 0) {
                                str = '<dl class="no-data"><p style="text-align:center">暂无更多数据！</p></dl>';
                                aim.append(str);
                                console.log($('#tab1 .no-data').length)
                            }
                            // if ($(aim).find('dl').length > 2) {
                            //     tusi('暂无更多数据！');
                            // }
                        }
                        $.detachInfiniteScroll($('.infinite-scroll'));
                        aim.find(".infinite-scroll-preloader").remove();
                        if(aim.children("dl").hasClass("no-data")) {
                            return;
                        }
                        loadings = false;
                        loading = false;
                        aim.attr("data-flag", "true");
                        return;
                    }
                    //  				console.log(data)

                    // 整体html
                    var html = '';
                    var all = [];

                    //获取对应的按钮
                    var btnHtml = '';
                    // 只需获取一次
                    var userImg = '';
                    var userName = '';
                    var orderStatus = '';
                    var total_num = '';
                    var total_price = '';
                    var orderNum = '';
                    var shipping_fee = '';

                    $.each(data.info.list, function(key, value) {
                        orderNum = key;
                        var temp = [];
                        count++;
                        if(value[0].status=="4"||value[0].status=="5"||value[0].status=="7") return;
                        for(var i = 0; i < value.length; i++) {
                            //  						console.log(value[i].templet.image)// 商品图片
                            //  						console.log(value[i].s_name)	// 名字
                            //  						console.log(value[i].status_name)	//	状态名
                            //  						console.log(value[i].price)	//	价格
                            //  						console.log(value[i].num)	//	数量
                            //  						console.log(value[i].templet.name)	//	商品名称
                            //  						console.log(value[i].total_price)	//	总价格
                            //  						console.log(value[i].total_num)	//	总数量
                            userName = value[i].u_name;
                            userImg = value[i].headimgurl;
                            goodsImg = value[i].p_image;
                            userName = value[i].u_name;
                            orderStatus = value[i].status_name;
                            total_num = value[i].total_num;
                            btnHtml = '';
                            shipping_fee = value[i].shipping_fee;
                            //发现强转后0.01变为0.00,有bug,所有直接使用sum_price(货物总价+邮费) edit by qjq
                            // 	total_price = (parseInt(value[i].total_price) + parseInt(shipping_fee)).toFixed(2);
                            total_price = value[i].sum_price;
                            if(value[i].status == 1 || value[i].status == 8) {
                                btnHtml = '<div class="order-btn">' +
                                    '<input type="button" value="取消订单" data-id="' + key + '" class="button button-dark cancel-order"></div></dl>';
                            } else if(value[i].status == 2) {
                                btnHtml = '<div class="order-btn">' +
                                    '<input type="button" data-id="' + key + '" value="确认收货" class="button button-danger color-all-btn shou"></div></dl>';
                            } else if(value[i].status == 3) {
                                btnHtml = '<div class="order-btn"><input type="button" value="查看订单" class="button button-dark order-details" data-id="' + key + '"></div></dl>';
                            }else if(value[i].status == 6) {
                                btnHtml = '<div class="order-btn"><input type="button" value="查看订单" class="button button-dark order-details" data-id="' + key + '"></div></dl>';
                            }

                            html = '<dl class="all-detail"><dt>订单号：<span>' + key + '</span><p class="color-all-status">' + orderStatus + '</p></dt><dd>';

                            var str = '<div class="all-list" data-id="' + key + '"><img src="' + goodsImg + '" alt=""><div class="goods-detail"><div class="details-top"><p>' + value[i].p_name + '</p>' +
                                '<p>￥' + value[i].price + '</p></div><div class="details-bottom">';
                            if (value[i].style) {
                                str += '<p>规格：'+value[i].style+'</p>';
                            } else {
                                str +='<p></p>';
                            }
                            str += '<p>x' + value[i].num + '</p></div></div></div>';
                            temp.push(str);
                        }
                        //  					var str1='<div class="all-list" data-id="'+orderNum+'">'
                        var str2 = '<p class="goods-sum"><span>共' + total_num + '件商品</span><span>合计:￥' + total_price + '(含运费:￥' + shipping_fee + ')</span></p></dd>';

                        html += temp.join("") + str2 + btnHtml;
                        all.push(html)
                        //  					console.log(all)
                    });
                    aim.find(".infinite-scroll-preloader").before(all);
                    loadings = false;
                    loading = false;
                    if(count < 3) {
                        str = '<dl class="no-data"><p style="text-align:center">暂无更多数据！</p></dl>';
                        $.detachInfiniteScroll($('.infinite-scroll'));
                        aim.find(".infinite-scroll-preloader").remove();
                        if(aim.children("dl").hasClass("no-data")) {
                            return;
                        }
                        aim.append(str);
                        // tusi('暂无更多数据！');
                        aim.attr("data-flag", "true");
                        loadings = false;
                        loading = false;
                        return;
                    }

                } else {
                    $.alert(data.msg)
                }
            });
    }

    $.attachInfiniteScroll($('.infinite-scroll'));

    //监听滚动事件
    $(document).on('infinite', '.infinite-scroll', function() {
        var str = $('.buttons-tab a[data-stat="'+stat+'"]').attr('href');
        target = $(str).children(".content-block");

//		if(stat == '') {
//			target = $("#tab1").children(".content-block");
//		} else if(stat == 1) {
//			target = $("#tab2").children(".content-block");
//		} else if(stat == 2) {
//			target = $("#tab3").children(".content-block");
//		} else if(stat == 3) {
//			target = $("#tab4").children(".content-block");
//		}
        // 如果正在加载，则退出
        if(loading) return;
        // 设置flag
        loading = true;

//      setTimeout(function() {
            

            //              $.detachInfiniteScroll($('.infinite-scroll'));
            //              $('.infinite-scroll-preloader').remove();
            //              return;
            if(target.attr("data-flag") == "true") {
				loading = false;
                return;
            } else {
                addItems(target)
            }
//      }, 1);
    });

    $(".buttons-tab .tab-link").bind("click", function() {
        stat = $(this).attr("data-stat");
        $.attachInfiniteScroll($('.infinite-scroll'));
        var str = $('.buttons-tab a[data-stat="'+stat+'"]').attr('href');
        target = $(str).children(".content-block");
//		if(stat == '') {
//			target = $("#tab1").children(".content-block");
//		} else if(stat == 1) {
//			target = $("#tab2").children(".content-block");
//		} else if(stat == 2) {
//			target = $("#tab3").children(".content-block");
//		} else if(stat == 3) {
//			target = $("#tab4").children(".content-block");
//		}
        if(loadings) return;

        if(target.attr("data-flag") == "true") {
            return;
        } else {
            addItems(target)
            loadings = true;
        }

    });

});

 //取参
 function getUrlParam(name) {
     var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
     var r = window.location.search.substr(1).match(reg); //匹配目标参数
     if(r != null) return unescape(r[2]);
     return null; //返回参数值
 }