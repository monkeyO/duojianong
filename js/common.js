function tusi(txt, fun) {
	$('.tusi').remove();
	$.toast(txt);
	setTimeout(function() {
		if (fun) {
			eval("(" + fun + "())");
		}
	}, 2000);
}
//手机号验证
function checkPhone(phone) {
	var reg = /^0?1[3|4|5|7|8][0-9]\d{8}$/;
	if (reg.test(phone)) {
		return true;
	} else {
		return false;
	}
}
//处理图片
function photoCompress(file, w, objDiv) {
	var ready = new FileReader();
	ready.readAsDataURL(file);
	ready.onload = function() {
		var re = this.result;
		canvasDataURL(re, w, objDiv)
	}
}
//canvas处理
function canvasDataURL(path, obj, callback) {
	var img = new Image();
	img.src = path;
	img.onload = function() {
		var that = this;
		// 默认按比例压缩
		var w = that.width,
			h = that.height,
			scale = w / h;
		w = obj.width || w;
		h = obj.height || (w / scale);
		var quality = 0.7; // 默认图片质量为0.7
		//生成canvas
		var canvas = document.createElement('canvas');
		var ctx = canvas.getContext('2d');
		// 创建属性节点
		var anw = document.createAttribute("width");
		anw.nodeValue = w;
		var anh = document.createAttribute("height");
		anh.nodeValue = h;
		canvas.setAttributeNode(anw);
		canvas.setAttributeNode(anh);
		ctx.drawImage(that, 0, 0, w, h);
		// 图像质量
		if (obj.quality && obj.quality <= 1 && obj.quality > 0) {
			quality = obj.quality;
		}
		// quality值越小，所绘制出的图像越模糊
		var base64 = canvas.toDataURL('image/jpeg', quality);
		// 回调函数返回base64的值
		callback(base64);
	}
}
/**
 * 将以base64的图片url数据转换为Blob
 * @param urlData
 */
function convertBase64UrlToBlob(urlData) {
	var arr = urlData.split(','),
		mime = arr[0].match(/:(.*?);/)[1],
		bstr = atob(arr[1]),
		n = bstr.length,
		u8arr = new Uint8Array(n);
	while (n--) {
		u8arr[n] = bstr.charCodeAt(n);
	}
	return new Blob([u8arr], {
		type: mime
	});
}
$(document).ready(function() {
	//返回上一层
	if ($(".icon-left").length > 0) {
		$(".icon-left").click(function() {
			window.history.back(-1);
		})
	}
	(function() {
		var oSearch = $('#search');
		var oIcon = $('.search-input .icon-search');
		oSearch.bind('input propertychange', function() {
			if (oSearch.val()) {
				oIcon.hide();
			} else {
				oIcon.show();
			}
		});
	})();
})
//原始
// http://daili.yhanson.top/index.php/api/v1
// http://daili.yhanson.top/upload/shangpin/
// http://daili.yhanson.top/chongzhipingzheng/
// http://chumei.yhanson.top
//admin.origenus.com/index.php/api/v1/Identify/Index

//公用接口
var apiUrl = "http://admin.duojianong.com/index.php/api/v1";
//图片头链接
var imgUrl = "http://admin.duojianong.com/upload/shangpin/";
//凭证链接
var reUrl = "http://admin.duojianong.com/chongzhipingzheng/";
//跳转链接
var openUrl = "http://api.duojianong.com";
//头部图片
var headerUrl = "http://admin.duojianong.com/head/";
//调后台接口
function callajax(options) {
	options.type = options.type || "post";
	options.url = options.url;
	options.async = options.async || false;
	options.params = options.params || {};
	options.state = options.state || 0;
	$.ajax({
		type: options.type,
		url: apiUrl + options.url,
		dataType: options.dataType || "json",
		async: options.async,
		data: options.params,
		contentType: 'application/x-www-form-urlencoded; charset=gbk',
		success: function(data) {
			if (data.code == 203 && options.state != 1) {
				tusi(data.message);
				setTimeout(function() {
					window.location.href = 'login.html';
				}, 1)
			} else {
				if (options.callback) {
					options.callback(data);
				}
			}
		},
		error: function(res) {
			console.error(res)
		}
	});
}
//获取地址参数
function GetQueryString(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if (r != null) return unescape(r[2]);
	return null;
}
//本地存储
function setLocal(key, value) {
	if (window.localStorage) {
		var wStorages = window.localStorage;
		wStorages.setItem(key, value);
	}
}
//获取本地存储数据
function getLocal(key) {
	var wStorages = window.localStorage;
	var value = wStorages.getItem(key);
	return value;
}
//清除本地存储
function clearLocal() {
	var wStorages = window.localStorage;
	wStorages.clear();
}

//日期转时间戳
function getTime(time) {
	var date = new Date(time);
	var time = Date.parse(date) / 1000;
	return time;
}

//时间戳转日期(精确时分秒)
function timestampToTime(timestamp) {
	var date = new Date(timestamp * 1000);
	var Y = date.getFullYear() + '-';
	var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
	var D = date.getDate() + ' ';
	var h = date.getHours() + ':';
	var m = date.getMinutes() + ':';
	var s = date.getSeconds();
	return Y + M + D + h + m + s;
}

//时间转日期（精确日）
function timestampTotal(timestamp) {
	var date = new Date(timestamp); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
	var Y = date.getFullYear() + '-';
	var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
	var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
	var h = date.getHours() + ':';
	var m = date.getMinutes() + ':';
	var s = date.getSeconds();
	return Y + M + D;
}
