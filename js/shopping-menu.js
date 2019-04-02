var _id = getUrlParam('id');
var quantity = 0;
var skus_price = "￥0.00";
var skus_id = '';
var type = '';//1立即购买2加入购物车
var image = ''; //规格图片
var base_image = '';//产品图片
$(function() {
  //显示规格
  $(document).on('click', '.choose-property', function() {
    $('.mask').show();
    type = $(this).data('type');
  });
  
  //点击购物车提示
    $(document).on('click', ".cart", function (event) {
        var num = 1;
        var id = $(this).data("id");
        
        //属性
        var property = $(this).data("property");
        if (property == 1) {
            //属性
            _id = id;
            getProperties($('#skus-menu').find('.select-middle'));
            $('.mask').show();
        } else {
            $.post('add_shopping_cart', {
                id: id,
                num: num
            }, function (data) {
                tusi(data.msg)
            });
        }
        return false;
    });
    
  //监听确认事件
  $(document).on('click', '#property-sure', function() {
    //判断是否选择规格
    var flag = false;
    $('#skus-menu .select-middle').children('dl').each(function(key, value) {
      if($(value).find('.active').length==0){
       flag = true;
      }
    })
    if(flag){
      tusi('请选择规格');
      return false;
    }
    
    //判断sku_id是否设置
    if (!skus_id) {
        tusi('未获取到库存');
        return false;
    }
    var num = Number($("#btn_num").val());
    if( num <= 0 || num =='' || num==null ){
        tusi('产品数量不能少于1');
        return false;
    }
    //判断库存
    if (quantity <= 0 || isNaN(quantity) || num > quantity) {
        tusi('库存不足');
        return false;
    }
    
    if( !_id || isNaN(_id)){
        tusi('找不到该产品！');
        return false;
    }
    if (type == 1) {
        window.location.href = 'buy_detail?id=' + _id + '&num=' + num + '&sku_id=' + skus_id;
    } else {
        $.post('add_shopping_cart', {
            id: _id,
            num: num,
            sku_id:skus_id
        }, function(data) {
            $('.mask').hide();
            tusi(data.msg);
          });
    }
  });
  
  //监听数量按钮
  $(document).on('click', '#btn_add', function() {
    $("#btn_num").val(Number($("#btn_num").val()) + 1);
  })
  $(document).on('click', '#btn_reduce', function() {
    var num = $("#btn_num").val();
    if(num > 1) {
      $("#btn_num").val(Number($("#btn_num").val()) - 1);
    }
  })

  //监听选择事件
  $(document).on('click', '.select-middle dd', function() {
    if($(this).hasClass('active')) {
      $(this).removeClass('active');
    } else {
      $(this).addClass('active').siblings('dd').removeClass('active');
    }
    var str = "";
    var desc = "";
    $('#skus-menu .select-middle').children('dl').each(function(key, value) {
      str += $(value).find('dt').data('pid') + ':' + $(value).find('.active').data('vid') + ';';
      if($(value).find('.active').length!=0){
        desc += $(value).find('.active').text() + '/';
      }
    })
    desc = desc.substring(0,desc.length-1);
    if(str.indexOf('undefined') != -1) {
      return;
    } else {
      checkSkus(str);
      $('.select-img').attr('src', image);
      $('#skus_id').val(skus_id);
      $('.select-price').text('￥'+skus_price);
      $('.skus').text('库存：'+quantity+'件');
      $('.select-desc').text(desc);
    }
  })

  //监听关闭按钮
  $(document).on('click', '#close-hock', function() {
    $('.mask').fadeOut();
    $('#skus-menu').css({animationName:'slideDownOut'});
    setTimeout(function(){$('#skus-menu').removeAttr('style')},500);
  })
  if (_id) {
    getProperties($('#skus-menu').find('.select-middle'));
  }
})

//初始化数据
function getProperties(aim) {
  $.post(get_properties, {
    id: _id
  }, function(data) {
//    console.log(data);
    if(data.code != 1) {
      console.log(data.msg)
      return;
    } else {
      var html = [];
      $.each(data.properties, function(key, value) {
        var str = '<dl><dt data-pid="' + value.pid + '">' + value.name + '</dt>';
        $.each(value.values, function(i, v) {
          str += '<dd data-vid="' + v.vid + '">' + v.value + '</dd>';
        });
        str += '</dl>';
        html.push(str);
      });
      aim.empty().append(html)
    }
    base_image = data.product.image;
    $('.select-img').attr('src', data.product.image);
    $('.select-price').text('￥'+data.product.price);
    $('.skus').text('库存：'+data.product.quantity+'件');
  })
}

//获取商品的id
function getUrlParam(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
  var r = window.location.search.substr(1).match(reg); //匹配目标参数
  if(r != null) return unescape(r[2]);
  return null; //返回参数值
}

//设置库存的id
function checkSkus( str) {

  $.ajax({
    url: get_properties,
    data: {
      id: _id
    },
    async: false,
    success: function(data) {
//      console.log(data);
      if(data.code != 1) {
        console.log(data.msg)
        return;
      } else {
        $.each(data.skus, function(key, value) {
          if(str.indexOf(value.properties)!=-1) {
            skus_id = value.id;
            quantity = value.quantity;
            skus_price = value['price'+level];
            if (value.image) {
                image = value.image;
            } else {
                image = base_image;
            }
          }
        })
      }
    }
  })

}