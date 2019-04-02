$(function () {
    var loading = false;
    var isNull = false;
    var page = 1;
    var status = 0;
    var typeTitle;

    //导航条高亮切换
    $('.nav-wrapper').on('click', 'li', function () {
        $('.nav-wrapper li').removeClass('active');
        $(this).addClass('active');
        switch ($('.nav-wrapper .active').text()) {
            case '待审核':
                status = 0;
                break;
            case '已通过':
                status = 1;
                break;
            case '已拒绝':
                status = 2;
                break;
        }
        switch ($('#picker').text()) {
            case '推荐奖励申请':
                type = 'rebate';
                break;
            case '充值申请':
                type = 'apply';
                break;
            case '提现申请':
                type = 'refund';
                break;
            case '升级申请':
                type = 'upgrade_apply';
                break;
            case '业绩奖励申请':
                type = 'team';
                break;
            
        }
        $.attachInfiniteScroll($('.infinite-scroll'));
        var shtml = '<div class="infinite-scroll-preloader"><div class="preloader"></div></div>';
        if (!$('.infinite-scroll-preloader').length > 0) {
            $('#apply-list').html("").after(shtml);
        }
        page = 1;
        isNull = false;
        $('.not-string').remove();
        addItems();
        // showHide();
    })

    /*选择列表获取内容*/
    selectList();

    function selectList() {
        var oSelect = $('.select');
        var oSelectList = $('.popover .select-list');
        oSelectList.find('li').click(function () {
            var oText = $(this).html();
            //重置参数
            type = $(this).data("type");
            $.attachInfiniteScroll($('.infinite-scroll'));
            var shtml = '<div class="infinite-scroll-preloader"><div class="preloader"></div></div>';
            if (!$('.infinite-scroll-preloader').length > 0) {
                $('#apply-list').html("").after(shtml);
            }
            page = 1;
            isNull = false;
            oSelect.find('em').text(oText);
            $('.not-string').remove();
            $('#apply-list').html('');
            addItems();
            // showHide();
        })
    }
    //滚动加载信息

    function addItems() {
        var html = '';
        if (type == 'upgrade_apply' && status > 0) {
            status++;
        }
        $.post(applyurl, {
            type: type,
            status: status,
            page_num: page,
            page_list_num: 10
            },
            function (data) {
                if (data.info != null) {
                    var title = '';
                    if (type == 'refund') {
                        title = '提现申请';
                    } else if (type == 'apply') {
                        title = '充值申请';
                    } else if (type == 'rebate') {
                        title = '推荐奖励申请';
                    } else if (type == 'team') {
                        title = '业绩奖励申请';
                    }
//                    var _title = title.substring(0, 2);
                    var _title = '奖励';
                    if (data.info.list.length < 5) {
                        $.detachInfiniteScroll($('.infinite-scroll'));
                        $('.infinite-scroll-preloader').remove();
                    }
                    $('.emptyImg').remove();
                    $.each(data.info.list, function (key, value) {
                        var oclass = '';
                        if (type == 'upgrade_apply') {
                            if (status == 0) {
                                oclass = "unchecked";
                            } else if (status == 2) {
                                oclass = "refuse";
                            } else if (status == 3) {
                                oclass = "pass";
                            }
                        } else {
                            if (status == 0) {
                                oclass = "unchecked";
                            } else if (status == 1) {
                                oclass = "refuse";
                            } else if (status == 2) {
                                oclass = "pass";
                            }
                        }
                        
                        var isclass = '';
                        if (status == 0) {
                            if (type == 'refund') {
                                isclass = "check_money_refund_apply";
                            } else if (type == 'apply') {
                                isclass = "check_money_apply";
                            } else if (type == 'rebate') {
                                isclass = "check_money_rebate_apply";
                            } else if (type == 'upgrade_apply') {
                                isclass = "upgrade_apply";
                            } else if (type == 'team') {
                                isclass = "team_apply";
                            }
                        }
                        
                        if (type == 'rebate') {
                            html += '<li class="'+ oclass +'"><div class="apply"><dl class="apply-left"><dt>' + value.rebate_name + '</dt><dd>申请人：' + value.uid_info.name +
                                '</dd><dd>手机号：' + value.uid_info.phone + '</dd><dd>申请人等级：' + value.uid_info.levname + '</dd>' +'<dd>' + _title + '金额：<span>￥' + value.money +
                                '</span></dd><dd>月份：' + value.month + '</dd></dl><div class="apply-right"><button class="' + isclass + '" data-id="' + value.id + '"data-type="rebate">' + value.status_name +
                                '</button></div></div></li>';
                        } else if (type == 'team') {
                            html += '<li class="'+ oclass +'"><div class="apply"><dl class="apply-left"><dt>' + value.type_name + '</dt><dd>申请人：' + value.uid_info.name +
                                '</dd><dd>手机号：' + value.uid_info.phone + '</dd><dd>申请人等级：' + value.uid_info.levname + '</dd>' +'<dd>' + _title + '金额：<span>￥' + value.rebate_money +
                                '</span></dd><dd>月份：' + value.month + '</dd></dl><div class="apply-right"><button class="' + isclass + '" data-id="' + value.id + '"data-type="team">' + value.status_name +
                                '</button></div></div></li>';
                        } else if (type == 'upgrade_apply') {
                            html += '<li class="'+ oclass +'"><div class="apply"><dl class="apply-left"><dt>升级申请</dt><dd>申请人：' + value.uid_info.name + '</dd><dd>申请人等级：' + value.uid_info.levname + '</dd>' +
                                '<dd>申请等级：'+ value.apply_levname +'<span></span></dd><dd>申请时间：'+ value.created_fromat +'时<span></span></dd></dl><div class="apply-right"><button class="' + isclass + '" data-id="' + value.id + '">' + value.status_name +
                                '</button></div></div></li>';
                        } else {
                            html += '<li class="'+ oclass +'"><div class="apply"><dl class="apply-left"><dt>' + title + '</dt><dd>申请人：' + value.dis_info.name + '</dd><dd>申请人等级：' + value.dis_info.levname + '</dd>' +
                                '<dd>' + _title + '金额：<span>￥' + value.apply_money + '</span></dd></dl><div class="apply-right"><button class="' + isclass + '" data-id="' + value.id + '">' + value.status_name +
                                '</button></div></div></li>';
                        }
                    });
                } else if (data.info.list == null || data.info.list == undefined || data.info.list == "") {
                    if ($('#apply-list li').length > 5) {
                        // str = '<div class="not-string" style="font-size:1rem;border:none;text-align:center"><span style="margin: 0 auto; padding-bottom: 20px;">暂无更多数据！</span></div>';
                        // $('.infinite-scroll').append(str);
                        tusi('暂无更多数据！');
                    }
                    $.detachInfiniteScroll($('.infinite-scroll'));
                    $('.infinite-scroll-preloader').remove();
                }
                $('#apply-list').append(html);
                page = page + 1;
                // showHide();

                var count = 0;
                $('#apply-list li').each(function (index, value) {
                    if ($(value).css('display') == 'list-item') {
                        count++;
                    }
                })
                if (count == 0) {
                    if (!$('.emptyImg').length > 0) { 
                        var oImg = '<div class="emptyImg" style="margin-top: 150px;overflow:hidden; text-align: center; background:#F5F4F9;"><img src=' + imgSrc + ' style="width: 200px;"><div>'
                        $('.not-string').remove();
                        $('.infinite-scroll').append(oImg);
                    }  
                }
            });
    }
    addItems();
    $.attachInfiniteScroll($('.infinite-scroll'));
    $(document).on('infinite', '.infinite-scroll', function () {

        // 如果正在加载，则退出
        if (loading) return;
        // 设置flag
        loading = true;
        setTimeout(function () {
            loading = false;
            addItems();
        }, 1000);
    });


})