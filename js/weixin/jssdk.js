$(function() {
   //微信图片上传接口
	$('#avatar').bind('click', function() {
		var element = $(this);
		wx.chooseImage({
			count: 1, // 默认9
			sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
			sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
			success: function (res) {
				var localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
				syncUpload(localIds, element);
			}
		});
	})
	
	//串行上传图片
	var syncUpload = function(localIds, obj) {

		var localId = localIds.pop();
		wx.uploadImage({
			localId: localId,
			isShowProgressTips: 1,

			success: function (res) {
				$.post(wx_upload_img_url, {'server_id':res.serverId}, function(data) {
                    if (data) {
                        tusi('上传头像成功');
                        setTimeout(function() {
                            window.location.reload();
                        },2000);
                    } else {
                        tusi('上传头像失败');
                    }
				});
			}
		});
	}; 
});