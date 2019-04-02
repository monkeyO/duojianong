$(document).ready(function() {
    var sendflag = false
    var p_num;
    var i_num;
    var first = true

    $(document).on('focus', '.shownum', function() {
        p_num = Number($(this).val().trim())
        first = true
    });

    $(document).on('input', '.shownum', function() {
        console.log(i_num = Number($(this).val().trim()))
        var reg = new RegExp(/^[1-9]\d*$/);
        if($(this).val().charAt(0) == '0' || isNaN($(this).val().charAt(0)) || $(this).val().charAt(0) == '') {
            $(this).val(1);
        } else if(!reg.test($(this).val())) {
            var checkArr = $(this).val().split('');
            var index = 0;
            for(var i = 0; i < checkArr.length; i++) {
                if(isNaN(Number(checkArr[i]))) {
                    index = i;
                    break;
                }
            }
            $(this).val($(this).val().substring(0, index));
        }
        if($(this).parentsUntil('li:last-child').siblings('.btn-select').hasClass('active')) {
            var aim = $(this).parent();
            if(p_num > i_num) {
                var s_total = Number($("#countprice").text()) - Number((p_num - i_num) * Number($(this).siblings('.priceval').text()))
                first = false
                p_num = i_num
                $("#countprice").text(changeTwoDecimal_f(s_total))
            } else if(p_num < i_num) {
                console.log(Number((i_num - p_num) * Number($(this).siblings('.priceval').text())))
                var s_total = Number((i_num - p_num) * Number($(this).siblings('.priceval').text())) + Number($("#countprice").text())
                p_num = i_num
                first = false
                $("#countprice").text(changeTwoDecimal_f(s_total))
            } else {
                return
            }

        }

    });

    $(".numadd").click(function() {
        var count = $(this).siblings(".shownum").val(Number($(this).siblings(".shownum").val()) + 1);
        //  console.log($(this).parentsUntil('li:last-child').siblings('.btn-select'))

        $(this).parentsUntil('li:last-child').siblings('.btn-select').attr('data-num', Number($(this).siblings(".shownum").val()));
        if($(this).parentsUntil('li:last-child').siblings('.btn-select').hasClass('active')) {
            var aim = $(this).parent();
            changeAllString(aim, this);
        }
    });
    //减按钮点击
    $(".reducenum").click(function() {
        var num = $(this).siblings(".shownum").val();
        if(num > 1) {
            var count = $(this).siblings(".shownum").val(Number(num) - 1);

            $(this).parentsUntil('li:last-child').siblings('.btn-select').attr('data-num', Number(num) - 1);
            if($(this).parentsUntil('li:last-child').siblings('.btn-select').hasClass('active')) {
                var aim = $(this).parent();
                changeAllString(aim, this);
            }
        }
    });
    //选择按钮点击

    $(".btn-select").bind("click", function() {
        var selflag = true;
        if($(this).attr("id") != "btn-selall") {
            var c_price = $(this).siblings('.goods-infs').find('.priceval').text();
            var c_num = $(this).siblings('.goods-infs').find('.shownum').val();
            var c_sum = Number(c_price) * Number(c_num);
            //    var a_total = 0;
            //    if($('#btn-selall').hasClass('actived')){
            var a_total = Number($('#countprice').text());
            //    }

            if($(this).hasClass('active')) {
                $(this).removeClass('active');
                $('#countprice').text(changeTwoDecimal_f(a_total - c_sum));
            } else {
                $(this).addClass('active');
                $('#countprice').text(changeTwoDecimal_f(a_total + c_sum));
            }
            $(".btn-select").each(function(key, value) {
                if(!$(value).hasClass("active")) {
                    selflag = false;
                }
            });
            if(!selflag && $("#btn-selall").hasClass("actived")) {
                $("#btn-selall").removeClass("actived");
            }
            if(selflag) {
                $("#btn-selall").addClass("actived");
            }
        }
    });

    $(".btn-sel").bind("click", function() {
        if($(this).hasClass("actived")) {
            $(".btn-select").removeClass("active");
            $('#countprice').text(changeTwoDecimal_f(0))
            $(this).toggleClass("actived").removeClass("active");
        } else {
            $(".btn-select").addClass("active");
            var total = 0;
            $('.goods-price').each(function(key, value) {
                total += Number($(value).children('.priceval').text()) * Number($(value).children('.shownum').val())
            });
            $('#countprice').text(changeTwoDecimal_f(total))
            $(this).toggleClass("actived").removeClass("active");
        }
    });
    //下单
    $('#submit-order').click(function() {

        var p_ids = new Array();
        var p_nums = new Array();

        //属性
        var sku_ids = new Array();
        var sku_id = $('input[name=sku_ids]').val();
        sku_ids = sku_id.split("|");

        var order_num = new Date().getTime();
        var address_id = $('#address_id').val();
        var product_id = $('input[name=product_id]').val();
        var num = $('input[name=shownum]').val();
        var note = $('textarea[name=note]').val();
        p_ids = product_id.split("|");
        p_nums = num.split("|");
        var pay_photo = '';
        if($(document).find('#flimg').length>0){
          pay_photo = $('#flimg').val().trim();
          if(pay_photo == ""){
            tusi('请上传截图');
            return false;
          }
        }
        //        console.log(p_nums);
        var cart_ids = $('input[name=cart_ids]').val();
        //运费相关
        var shipping_way_ids = new Array();
        var shipping_ways = new Array();
        var shipping_way_id = $('input[name=shipping-id]').val();
        var shipping_way = $('#shipping-way').val();
        var shipping_open = $('input[name=shipping_open]').val();
        if(shipping_open) {
            shipping_way_ids = shipping_way_id.split("|");
            shipping_ways = shipping_way.split("|");
        }

        if(address_id == '') {
            tusi('请必须填写收货信息！');
            return false;
        }
        if(!p_ids) {
            tusi('未找到该产品！');
            return false;
        }
        if(p_nums <= 0) {
            tusi('购买数量必须大于0！');
            return false;
        }
        if(sendflag) {
            return
        }
        sendflag = true;
        $(this).val('提交中...').css({
            backgroundColor: '#a0a0a0'
        });
        $.post("orderhand", {
            "p_ids": p_ids,
            "p_nums": p_nums,
            order_num: order_num,
            cart_ids: cart_ids,
            note: note,
            sku_ids: sku_ids,
            shipping_way_id: shipping_way_ids,
            shipping_way: shipping_ways,
            pay_photo: pay_photo
        }, function(data) {
            if(data.code == 1) {
                //				tusi('下单成功');
                var return_url = 'success?order_num=' + data.order_num;

                //				if(data.return_url != '' && data.return_url != undefined) {
                //					return_url = data.return_url;
                //				}
                window.location.href = return_url
            } else {
                var msg = '下单失败！';
                if(data.msg != null) {
                    msg = data.msg;
                    $('#submit-order').val('提交订单').css({
                        backgroundColor: '#dd0000'
                    });
                    sendflag = false
                    tusi(msg);
                }

            }
        });
    });
    //结算
    $(document).on("click", "#settlement", function() {
        var str = "";
        var nums = "";
        $(".active").each(function(key, val) {
            if($(".active").length - 1 != key) {
                str += $(this).data("id") + "|";
                nums += $(this).attr('data-num') + "|";
            } else {
                str += $(this).data("id");
                nums += $(this).attr('data-num');
            }
        });
        console.log(str);
        if(str == "") {
            tusi('请至少选择一个商品');
            return false;
        }
        //改变购物车产品数量
        $.post(save_cart_num_url, {
                cart_ids: str,
                cart_nums: nums
            },
            function(res) {
                //如果商品规格发生变化则需要清除购物车该产品
                $.get(is_null_sku_id, {
                    cart_ids: str,
                }, function(data) {
                    if(data.code != 1) {
                        tusi(data.msg);
                        return false;
                    } else {
                        window.location.href = buy_cart_url + '?cart_ids=' + str;
                    }
                });
            });
    });

    //删除购物车
    $(document).on("click", "#del-cart", function() {
        var str = "";
        $(".active").each(function(key, val) {
            str += $(this).data("id") + "|";
        });
        if(str == "") {
            tusi('请至少选择一个商品删除');
            return false;
        }
        $.confirm('确定删除所选商品吗？', function() {
            $.post(del_cart_url, {
                    cart_ids: str
                },
                function(res) {
                    tusi('删除购物车成功');
                    setTimeout(function() {
                        window.location.href = changeURLArg(window.location.href, "reloadtime", new Date().valueOf());
                    }, 2000);
                });
        });
    });
});
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
//强转两位小数
function changeTwoDecimal_f(x) {
    var f_x = parseFloat(x);
    if(isNaN(f_x)) {
        console.log('数量错误！');
        return '0.00';
    }
    var f_x = Math.round(x * 100) / 100;
    var s_x = f_x.toString();
    var pos_decimal = s_x.indexOf('.');
    if(pos_decimal < 0) {
        pos_decimal = s_x.length;
        s_x += '.';
    }
    while(s_x.length <= pos_decimal + 2) {
        s_x += '0';
    }
    return s_x;
}

/* 当客户点击相应商品数量按钮时，总金额和总积分也随之改变*/
function changeAllString(aim, _this) {
    var goodsPrice = parseFloat($(aim).children(".priceval").text());
    var goodsIntegral = parseFloat($(aim).children('#goods-integral').text());
    var amount = parseFloat($(aim).children(".shownum").val());
    var r_total = Number($("#countprice").text())
    if($(_this).attr('class').indexOf('numadd') != -1) {
        $("#countprice").text(changeTwoDecimal_f(goodsPrice + r_total));
    } else if($(_this).attr('class').indexOf('reducenum') != -1) {
        $("#countprice").text(changeTwoDecimal_f(r_total - goodsPrice));
    } else {
        $("#countprice").text(changeTwoDecimal_f(r_total - goodsPrice * amount));
    }
    console.log($(_this).className)
    $("#all-integral").text('+' + goodsIntegral * amount + '积分');
}

/* 当客户输入商品数量时，总金额和总积分也随之改变*/
//function inputNum(aim,_this){
//	var i_price = parseFloat($(aim).children(.priceval).val());
//	var 
//}

$(document).on('blur', '.shownum', function() {
    p_num = Number($(this).val().trim());
    $(this).parentsUntil('li:last-child').siblings('.btn-select').attr('data-num', p_num);
});