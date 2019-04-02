/**
 *	轻养谷后台js文件
 */
function validateIdCard(idCard) {
    //15位和18位身份证号码的正则表达式
    var regIdCard = /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/;
    //如果通过该验证，说明身份证格式正确，但准确性还需计算
    if (regIdCard.test(idCard)) {
        if (idCard.length == 18) {
            var idCardWi = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2); //将前17位加权因子保存在数组里
            var idCardY = new Array(1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2); //这是除以11后，可能产生的11位余数、验证码，也保存成数组
            var idCardWiSum = 0; //用来保存前17位各自乖以加权因子后的总和
            for (var i = 0; i < 17; i++) {
                idCardWiSum += idCard.substring(i, i + 1) * idCardWi[i];
            }
            var idCardMod = idCardWiSum % 11;//计算出校验码所在数组的位置
            var idCardLast = idCard.substring(17);//得到最后一位身份证号码
            //如果等于2，则说明校验码是10，身份证号码最后一位应该是X
            if (idCardMod == 2) {
                if (idCardLast == "X" || idCardLast == "x") {
                    return true;
                } else {
                    return false;
                }
            } else {
                //用计算出的验证码与最后一位身份证号码匹配，如果一致，说明通过，否则是无效的身份证号码
                if (idCardLast == idCardY[idCardMod]) {
                    return true;
                } else {
                    return false;
                }
            }
        }
    } else {
        alert("身份证格式不正确!");
    }
}

// //验证只能是字母和数字
// function checkWechatnum(wechatnum){
//     var zmnumReg=/^[0-9a-zA-Z]*$/;
//     if(wechatnum!=""&&!zmnumReg.test(wechatnum)){
//         alert("只能输入是字母或者数字,请重新输入");
//         return false;
//     }
// }


//经销商申请提交
function apply()
{
    var opt = $('#choice-mode-select').val(); 
    var level = $("input[name=level]").val();
    var name = $("input[name=name]").val();
    var wechatnum = $("input[name=wechatnum]").val();
    var phone = $("input[name=phone]").val();
    var email = $("input[name=email]").val();
    var idennum = $("input[name=idennum]").val();
    var probably_address =$("input[name=probably_address]").val();
    var addre = $("input[name=addre]").val();
    var idennumimg = $("#idennum").val();
    var liveimg = $("#live").val();
    var headimgurl = $("#head").val();
    var check = $('.agreement span').hasClass('active');
    var pid = $("input[name=pid]").val();
    //var oid = $("input[name=oid]").val();



    if (IS_SUBMIT_ID_CARD_IMG == 1) {
        if (idennumimg == ''|| liveimg == '') {
            tusi('对不起，请上传图片');
            return;
        }
    }
    else if (IS_SUBMIT_ID_CARD_IMG == 2){
        if (idennumimg == '') {
            tusi('对不起，请上传图片');
            return;
        }
    }
    else if (IS_SUBMIT_ID_CARD_IMG == 3){
        if (liveimg == '') {
            tusi('对不起，请上传图片');
            return;
        }
    }
    

    if (name == '' || wechatnum == '' || phone == '' || idennum == '' || probably_address == ''|| addre == '' || opt == '') {
        tusi('对不起，信息填写不完整');
        return;
    }else if(idennum.length!=18){//if(!validateIdCard(idennum)){
        tusi('对不起，请输入18位身份证');
     return;
     }
    // else if(idennum.length<15){
    //     tusi('对不起，身份证不能小于15位');
    //     return;
    // }
    else if (check) {
        tusi('请阅读条例');
        return;
    } else {
        $.post(applyUrl, {level: level, name: name, wechatnum: wechatnum, phone: phone, email: email, idennum: idennum, probably_address:probably_address,addre: addre, idennumimg: idennumimg, liveimg:liveimg, headimgurl: headimgurl , pid:pid},
                function (res) {
                    if( res.code == 1 ){
                        tusi('申请提交成功，请耐心等候审核！');
                        setTimeout(function () {
                            window.location.href = homeUrl
                        }, 2000);
                    }
                    else if( res.code == null || res.msg =='' ){
                        tusi('系统繁忙，请重试！');
                    }
                    else{
                        tusi(res.msg);
                    }
                    
//                    if (res.status == 1) {
//                        tusi('申请提交成功，请耐心等候审核！');
//                        setTimeout(function () {
//                            window.location.href = homeUrl
//                        }, 2000);
//                    }else if (res.status == 2) {
//                        tusi('对不起，申请提交失败，请重新提交！');
//                    } else if (res.status == 3) {
//                        tusi('您已是经销商，申请提交失败！');
//                    } else if (res.status == 4) {
//                        tusi('您已提交过申请，请耐心等候审核！');
//                    } else if (res.status == 0) {
//                        tusi('分享的链接有误,请通知分享之人清理手机缓存后重新分享给您！');
//                    } else if (res.status == 6) {
//                        tusi('手机号码格式不对！');
//                    }
                }, 'json');
    }
}

// //经销商申请提交
// function apply()
// {
//     //var level = $("select[name=level]").val();
//     var level = $("input[name=level]").val();
//     var name = $("input[name=name]").val();
//     var wechatnum = $("input[name=wechatnum]").val();
//     var phone = $("input[name=phone]").val();
//     var email = $("input[name=email]").val();
//     var idennum = $("input[name=idennum]").val();
//     var address = $("input[name=address]").val();
//     var idennumimg = $("#idennum").val();
//     var liveimg = $("#live").val();
//     var headimgurl = $("#head").val();
//     var check = $('#tl').is(':checked');
//     //var pid = $("input[name=pid]").val();
//     //var oid = $("input[name=oid]").val();
//
//
//     if (IS_SUBMIT_ID_CARD_IMG == 1) {
//         if (idennumimg == '') {
//             tusi('对不起，请上传图片');
//             return;
//         }
//     }
//
//
//     if (name == '' || wechatnum == '' || phone == '' || idennum == '' || address == '') {
//         tusi('对不起，信息填写不完整');
//         return;
//     }else if(idennum.length!=18){//if(!validateIdCard(idennum)){
//         tusi('对不起，请输入18位身份证');
//         return;
//     }
//     // else if(idennum.length<15){
//     //     tusi('对不起，身份证不能小于15位');
//     //     return;
//     // }
//     else if (!check) {
//         tusi('请阅读条例');
//         return;
//     } else {
//         $.post(applyUrl, {level: level, name: name, wechatnum: wechatnum, phone: phone, email: email, idennum: idennum, address: address, idennumimg: idennumimg, liveimg: liveimg, headimgurl: headimgurl},
//             function (res) {
//                 if( res.code == 1 ){
//                     tusi('申请提交成功，请耐心等候审核！');
//                     setTimeout(function () {
//                         window.location.href = homeUrl
//                     }, 2000);
//                 }
//                 else if( res.msg == null || res.msg =='' ){
//                     tusi('系统繁忙，请重试！');
//                 }
//                 else{
//                     tusi(res.msg);
//                 }
//
// //                    if (res.status == 1) {
// //                        tusi('申请提交成功，请耐心等候审核！');
// //                        setTimeout(function () {
// //                            window.location.href = homeUrl
// //                        }, 2000);
// //                    }else if (res.status == 2) {
// //                        tusi('对不起，申请提交失败，请重新提交！');
// //                    } else if (res.status == 3) {
// //                        tusi('您已是经销商，申请提交失败！');
// //                    } else if (res.status == 4) {
// //                        tusi('您已提交过申请，请耐心等候审核！');
// //                    } else if (res.status == 0) {
// //                        tusi('分享的链接有误,请通知分享之人清理手机缓存后重新分享给您！');
// //                    } else if (res.status == 6) {
// //                        tusi('手机号码格式不对！');
// //                    }
//             }, 'json');
//     }
// }

//申请最高级别代理
function applySA()
{
    var levname = $("#picker").val();
    var name = $("input[name=name]").val();
    var wechatnum = $("input[name=wechatnum]").val();
    var phone = $("input[name=phone]").val();
    var email = $("input[name=email]").val();
    var idennum = $("input[name=idennum]").val();
    var probably_address = $("input[name=probably_address]").val();
    var addre = $("input[name=addre]").val();
    var idennumimg = $("#idennum").val();
    var liveimg = $("#live").val();
    var headimgurl = $("#head").val();
    var check = $('.agreement span').hasClass('active');

    //alert(idennumimg+'和'+liveimg+'和'+headimgurl);


    if (IS_SUBMIT_ID_CARD_IMG == 1) {
        if (idennumimg == ''|| liveimg == '') {
            tusi('对不起，请上传图片');
            return;
        }
    }

    if (name == '' || wechatnum == '' || phone == '' || idennum == '' || probably_address == ''|| addre == '') {
        tusi('对不起，信息填写不完整');
        return;
    }else if(idennum.length!=18){//if(!validateIdCard(idennum)){
        tusi('对不起，请输入18位身份证');
        return;
    }
    else if (check) {
        tusi('请阅读条例');
        return;
    } else {
        $.post(applySAUrl, {levname: levname, name: name, wechatnum: wechatnum, phone: phone, email: email, idennum: idennum, probably_address:probably_address,addre: addre, idennumimg: idennumimg,liveimg:liveimg,  headimgurl: headimgurl},
                function (res) {
                    if (res.status == 1) {
                        tusi('申请提交成功，请耐心等候审核！');
                        window.location.href = homeUrl;
                    } else if (res.status == 2) {
                        tusi('对不起，申请提交失败，请重新提交！');
                    } else if (res.status == 3) {
                        tusi('您已提交过申请，请耐心等候审核！');
                    } else if (res.status == 4) {
                        tusi('您已经成为'+high_level_name+',申请提交失败! ');
                    } else if (res.status == 6) {
                        tusi('手机号码格式不对！');
                    } 
                    else if( res.code != 1 ){
                        tusi(res.msg);
                    }
                    else if( res.code == 1 ){
                        tusi('申请提交成功，请耐心等候审核！');
                        setTimeout(function () {
                            window.location.href = homeUrl
                        }, 2000);
                    }
                    else {
                        tusi('您不能申请成为该级别的代理! ');
                    }
                }, 'json');
    }

}





//------------*****旧版applySA()****--------------
//申请最高级别代理
// function applySA()
// {
//     var name = $("input[name=name]").val();
//     var wechatnum = $("input[name=wechatnum]").val();
//     var phone = $("input[name=phone]").val();
//     var email = $("input[name=email]").val();
//     var idennum = $("input[name=idennum]").val();
//     var address = $("input[name=address]").val();
//     var address = $("input[name=address]").val();
//     var idennumimg = $("#idennum").val();
//     var liveimg = $("#live").val();
//     var headimgurl = $("#head").val();
//     var check = $('#tl').is(':checked');
//     var level = $("input[name=level]").val();
//     //alert(idennumimg+'和'+liveimg+'和'+headimgurl);
//
//
//     if (IS_SUBMIT_ID_CARD_IMG == 1) {
//         if (idennumimg == '' || liveimg == '') {
//             tusi('对不起，请上传图片');
//             return;
//         }
//     }
//
//
//     if (name == '' || wechatnum == '' || phone == '' || idennum == '' || address == '') {
//         tusi('对不起，信息填写不完整');
//         return;
//     }/*else if(!validateIdCard(idennum)){
//      alert('对不起，身份证有误');
//      return;
//      }*/
//     else if(idennum.length!=18){//if(!validateIdCard(idennum)){
//         tusi('对不起，请输入18位身份证');
//         return;
//     }
//     else if (!check) {
//         tusi('请阅读条例');
//         return;
//     } else {
//         $.post(applySAUrl, {name: name, wechatnum: wechatnum, phone: phone, email: email, idennum: idennum, address: address, idennumimg: idennumimg, liveimg: liveimg, headimgurl: headimgurl,level:level},
//             function (res) {
//                 if (res.status == 1) {
//                     tusi('申请提交成功，请耐心等候审核！');
//                     window.location.href = homeUrl;
//                 } else if (res.status == 2) {
//                     tusi('对不起，申请提交失败，请重新提交！');
//                 } else if (res.status == 3) {
//                     tusi('您已提交过申请，请耐心等候审核！');
//                 } else if (res.status == 4) {
//                     tusi('您已经成为'+high_level_name+',申请提交失败! ');
//                 } else if (res.status == 6) {
//                     tusi('手机号码格式不对！');
//                 } else {
//                     tusi('您不能申请成为该级别的代理! ');
//                 }
//             }, 'json');
//     }
// }
//-----------*********end 旧版applySA()****----------


//通过待审核经销商
function audit()
{
    var pend = document.getElementsByName("pend");
    var managers = '';

    for (var i = 0; i < pend.length; i++)
    {
        if (pend[i].checked) {
            managers = managers + '|' + pend[i].value;
        }
    }

    if (managers == '') {
        tusi('请至少选择一个待审核经销商！');
        return;
    } else {
        $.post(auditUrl, {pend: managers}, function (res) {
            if (res.status == 1) {
                tusi('审核成功！');
                setTimeout(function(){
                    location.href=url
                },2000);
            }
        }, 'json');
    }
}


//删除待审核经销商
function del()
{
    var pend = document.getElementsByName("pend");
    var managers = '';

    for (var i = 0; i < pend.length; i++)
    {
        if (pend[i].checked) {
            managers = managers + '|' + pend[i].value;
        }
    }

    if (managers == '') {
        tusi('请至少选择一个待审核经销商！');
        return;
    } else {
        $.post(delUrl, {pend: managers}, function (res) {
            if (res.status == 1) {
                tusi('删除成功！');
                setTimeout(function(){
                    location.href=url
                },2000);
            }
        }, 'json');
    }
}