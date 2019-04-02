$(document).ready(function() {

	/* 映射需求 */
	$('.uploading-img').on('click', '.image-container', function() {
		$('.uploading-img .select-img input').click();
	});

	/* 映射需求 */
	$('.uploading-img').on('click', '.picture', function() {
		$('.uploading-img .select-img input').click();
	});

	//选择展示图片
	$("#file-upload").change(function() {
		var $file = $(this);
		var fileObj = $file[0];
		var windowURL = window.URL || window.webkitURL;
		var dataURL;
		var $img = $("#preview");

		if(fileObj && fileObj.files && fileObj.files[0]) {
			dataURL = windowURL.createObjectURL(fileObj.files[0]);
			$img.attr('src', dataURL);
		} else {
			dataURL = $file.val();
			var imgObj = document.getElementById("preview");
			// 两个坑:
			// 1、在设置filter属性时，元素必须已经存在在DOM树中，动态创建的Node，也需要在设置属性前加入到DOM中，先设置属性在加入，无效；
			// 2、src属性需要像下面的方式添加，上面的两种方式添加，无效；
			imgObj.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale)";
			imgObj.filters.item("DXImageTransform.Microsoft.AlphaImageLoader").src = dataURL;
		}

		if($('.image-container img').attr('src')) {
			$('.picture').hide();
			$('.uploading-img .text').hide();
		}
	});

	//        推荐代理
	var introduct = 'pid';
	var uid = $('input[name=uid]').val();
	i_aim = $('#tab1 .myteam-items');
	getMenu(introduct, i_aim, uid)
	//        直属代理
	var under = 'recommendID';
	u_aim = $('#tab2 .myteam-items');
	getMenu(under, u_aim, uid);

	//        点击获取相应列表
	$(document).on('click', '.agent-level', function() {
		var _level = $(this).data("level");
		var _type = $(this).data("type");
		var _aim = $(this).siblings('.items-hook');
		i_page = 1;
		first = true;
		u_page = 1;
		$(this).parent().siblings('.agent-wrapper').find('.items-hook').slideUp().empty().siblings('.agent-level').removeClass('active')
		$(this).toggleClass('active').siblings('.items-hook').stop(true, true).slideToggle().empty()
		if(!$(this).hasClass('active')) {
			return
		} else {
			getAgentDeatil(_type, _aim, _level, uid)
		}
	})

	//        点击加载更多
	$(document).on('click', '.loadmore', function() {
		var l_aim = $(this).parent();
		var l_level = l_aim.siblings('.agent-level').data("level");
		var l_type = l_aim.siblings('.agent-level').data("type");
		console.log(l_aim + ':' + l_level + ":" + l_type)
		getAgentDeatil(l_type, l_aim, l_level, uid);
	})

	//        点击进入查看代理详情
	$(document).on('click', '.agent-content', function() {
		$('#keyword').val("");
		window.location.href = 'agency_detail?myteam_id=' + $(this).data("id")
	})

});

//      获取代理详情信息
function getAgentDeatil(type, aim, level, uid) {
	var page;
	if(type == 'pid') {
		page = i_page;
		i_page++;
	} else if(type == 'recommendID') {
		page = u_page;
		u_page++;
	}
	$.post(getDetail, {
		page_num: page,
		type: type,
		level: level,
		uid: uid,
	}, function(data) {
		if(data.code == 1) {
			if(data.info.list == null || data.info.list.length < 9) {
				i_page = 1;
				u_page = 1;
				aim.find('.loadmore').remove()
			}
			var temp = [];
			$.each(data.info.list, function(key, value) {
				var html = '<dd class="agent-content" data-id="' + value.id + '"><div class="agent-all"><div class="content-left"><img src="' + value.headimgurl + '" alt="" />' +
					'<span>' + value.name + '</span></div><div class="content-right"><div class="agent-count"><p>直属代理：<span>' + value.dis_pid_count + '</span></p>' +
					'<p>推荐代理：<span>' + value.dis_recommendID_count + '</span></p></div><i class="icon icon-right"></i></div></div></dd>';
				temp.push(html);
			});
			if(first && temp.length >= 9) {
				temp.push('<p class="loadmore">点击加载更多</p>');
				first = !first
			}
			aim.append(temp)
		} else {
			alert(data.msg)
		}
	})
}

//      获取代理目录
function getMenu(type, aim, uid) {
	$.post(getMenurl, {
		type: type,
		uid: uid,
	}, function(data) {
		if(data.code == 1) {
			console.log(data)
			if(data.info.list != null) {
				var temp = []
				$.each(data.info.list, function(key, value) {
					$.each(value, function(k, val) {
						var html = '<dl class="agent-wrapper"><dt class="agent-level" data-level="' + k + '" data-type="' + type + '"><i class="icon-triangledowm"></i>' + key +
							'<span class="count">' + val + '</span></dt><section class="items-hook"></section></dl>';
						temp.push(html)
					});
				});
				aim.append(temp)
			}
		} else {
			alert(data.msg)
		}
	})
}