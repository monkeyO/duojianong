  //获取邀请人信息
  $(document).ready(function() {
	var ishome = "1";
	if(ishome) {
		var levelArr = [];
		
		if(alllevel != '' && alllevel != undefined && alllevel != null) {
			if(agent_control) {
				$('#mask-input').show(1)
				$('.icon-down').toggle(1)
			}
//			$.ajax({
//				url: alllevel,
//				async: false,
//				success: function(data) {
//					if(data.code == 1) {
//						console.log(data)
//						$.each(data.info, function(key, value) {
//							if(key == level_id) {
//								$('#picker').attr('value', value);
//							}
//							levelArr.push(value);
//						});
//						console.log(levelArr)
//					} else {
//						$.alert(data.msg)
//					}
//				}
//			})
		}
	}

  	$("#city-picker").cityPicker({
  		toolbarTemplate: '<header class="bar bar-nav">\
        <button class="button button-link pull-right close-picker">OK</button>\
        <h1 class="title">选择地区</h1>\
        </header>'
  	});

//	$("#picker").picker({
//		toolbarTemplate: '<header class="bar bar-nav">\
//      <button class="button button-link pull-right close-picker">确定</button>\
//      <h1 class="title">经销商等级</h1>\
//      </header>',
//		cols: [{
//			textAlign: 'center',
//			values: levelArr
//		}]
//	});
  	//  获取用户信息
  	/* 映射需求 */
  	$('.uploading-img').on('click', '.image-container', function() {
  		$('#file-upload').click();
  	});

  	/* 映射需求 */
  	$('.uploading-img').on('click', '.picture', function() {
  		$('#file-upload').click();

  	});

  	/* 图片遮罩层下拉 */
  	$(document).on('click', '.check-template', function() {
  		// $('.mask-img img').attr()
  		$('.mask-img').slideDown();
  	});

  	/* 图片遮罩层下拉 */
  	$(document).on('click', '.warrant', function() {
  		//		$('.mask-img img').attr('src', $('.warrant img').attr('src'));
  		$('.mask-img').slideDown();
  	});

  	/* 图片遮罩层上拉 */
  	$(document).on('click', '.mask-img', function() {
  		if(!qrshow) {
  			$(this).slideUp();
  		}
  	});

  	/* 是否同意条例切换背景Icon */
  	$(document).on('click', '.agreement span', function() {
  		$(this).toggleClass('active');
  		submitJudge();
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
  			submitJudge();
  		}
  	});

  })

  /* 判断是否提交信息 */
  function submitJudge() {
  	var status = $('.agreement span').hasClass('active');

  	if(status) {
  		$('.btn-wrapper button').css('backgroundColor', '#879FB7').attr('disabled', 'true');
  	} else {
  		$('.btn-wrapper button').css('backgroundColor', '#0E3E6E').removeAttr('disabled');
  	}
  }