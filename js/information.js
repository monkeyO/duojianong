	var myToken = getLocal("token");
			if(myToken) {
				var getparam_ajaxs = {
					Token: myToken
				};
				var getorder_options = {
					url: '/index/IndexTop',
					params: getparam_ajaxs,
					callback: function(res) {
						if(res.code == 200) {
							console.log(res.data.head);
							$("#avatar img").attr("src", headerUrl+res.data.head);
							$("#name").html(res.data.nick);
							$("#phone span").html(res.data.phone);
							$("#jibie span").html(res.data.items.agent_name);
						}
					}
				}
				callajax(getorder_options);
			} else {
				tusi("无法确定用户");
		}