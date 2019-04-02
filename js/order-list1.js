		var app = new Vue({
			el: '#main',
			data() {
				return {
					shoppingCart: [],
					selectId: "",
					jiage:"",
					gId:"",
					selectAll:false,
					isShow:true
				}
			},
			mounted() {
				var that = this;
				that.init();
			},
			methods: {
				//删除
				makeDelet() {
					var that = this,allID=[];
					var Datas = that.shoppingCart;
					Datas.forEach(function(v, i, a) {
						if(v["select"]) {
							allID.push(v.id);
						}
					})
					if(allID.length<=0) {
						tusi("请选择列表");
					} else {
						var getparam_ajax = {
							Id: allID.join(',')
						};
						var getorder_option = {
							url: '/Order/GwSc',
							params: getparam_ajax,
							callback: function(res) {
								if(res.code = 200) {
									tusi(res.message);
								} else {
									tusi(res.message);
								}
								that.init();
							}
						}
						callajax(getorder_option);
					}
				},
				//结算
				makePay() {
					var allID=[];
					var Datas = this.shoppingCart;
					for(var i =0;i<Datas.length;i++){
						if(Datas[i]["select"]){
						  allID.push(Datas[i].id)
						}
					}
					if(allID.length>0){
					    window.location.href = "../order/buy_cart_detail.html?id=" + allID.join(',')	
					}else{
						tusi("请选择列表");
					}
				},
				//全选按钮
				makeSelectAll(){
					var Datas = this.shoppingCart;
					var myArry = [];
					this.selectAll=this.selectAll?false:true;
					if(this.selectAll){
						for(var i = 0; i < Datas.length; i++) {
							Datas[i]["select"] = true
							myArry.push(Datas[i])
						}
						if(Datas.length>1){
							this.isShow = false
						}else{
							this.isShow = true
						}
					}else{
						for(var i = 0; i < Datas.length; i++) {
							Datas[i]["select"] = false
							myArry.push(Datas[i])
						}
						this.isShow = true
					}
					 this.shoppingCart= myArry;
				},
				//单选
				makeSelectItem(e) {
					var Datas = this.shoppingCart;
					var selectNum=0;
					var myArry = [];
					for(var i = 0; i < Datas.length; i++) {
						if(i == e) {
						    Datas[i]["select"] = Datas[i]["select"]?false:true
					    } 
						if(Datas[i]["select"]){
							selectNum++
						}
						myArry.push(Datas[i]);
					}
					this.selectAll = selectNum==Datas.length?true:false
					this.shoppingCart = myArry;
					if(selectNum>1){
						this.isShow=false
					}else{
						this.isShow=true
					}
				},
				//初始加载
				init() {
					var that = this;
					var myToken = getLocal("token");
					var getparam_ajax = {
						Token: myToken
					};
					var getorder_option = {
						url: '/Single/SingleLb',
						params: getparam_ajax,
						callback: function(res) {
							if(res.code = 200) {
								that.shoppingCart = res.data;
							} else {
								tusi("暂无数据");
							}
						}
					}
					callajax(getorder_option);
				}
			}
		})