<template>
	<view>
		<uni-icons class="back" type="back" size="25" @click="goback"></uni-icons>
		<uni-icons class="edit" type="compose" size="25" @click="editordetail"></uni-icons>
		<uni-nav-bar  title="" color="white" left-icon="back" right-icon="compose"></uni-nav-bar>
		<!-- 背景图片 -->
		<view class="background-pic">
			<!-- <image @click="onuploadphoto" src="../../../../static/night.png" mode=""></image> -->
			<image :src="userbk" class="image" mode="aspectFill" @click="onuploadbkphoto" @error="onError"/>
		</view>
		<!-- 头部-->
		<view class="content">
			<view class="head">
				<!-- 头像 -->
				<view class="head-logo-pic">
					<image :src="userpic" class="image" mode="aspectFill" @click="onuploadheaderphoto" @error="onError"/>
					<!-- <image @click="onuploadphoto" src="../../../../static/sun.png" mode="aspectFill"></image> -->
				</view>
				<!-- 昵称和签名-->
				<view class="myNameAndSig">
					<view class="myNickname">
						<text class="my-name">{{mydata.nickname}}</text>
						<!-- <input type="text" placeholder="请输入我的昵称" class="myNickname"> -->
					</view>
					<view class="mySig">
						<text class="my-sig">{{mydata.motto}}</text>
						<!-- <input type="text" placeholder="请输入我的昵称" class="myNickname"> -->
					</view>
				</view>
				<!-- 个人信息如性别年龄 -->
				 <!-- <view class="my-data">
			
					<view class="my-data-box">
						<text class="my-data-box-title">姓名</text>
						<text class="my-data-box-title">{{mydata.name}}</text>
						<input type="text">
					</view>
			
					<view class="my-data-box">
						<text class="my-data-box-title">性别</text>
						<text class="my-data-box-title">{{mydata.gender}}</text>
						<input type="text">
					</view>
			
					<view class="my-data-box">
						<text class="my-data-box-title">年龄</text>
						<text class="my-data-box-title">{{mydata.age}}</text>
						<input type="number">
					</view>
			
				</view> -->
			
			
			</view>
			<view class="body">
				<uni-list :border="false">
					<!-- <uni-list-item title="个人资料" note="" showArrow
						thumb="/static/编辑个人资料.png" thumb-size="lg"
						rightText=""  link to="/pages/self-manage/personalCenter/editorPersonalData" />
					 -->
					<uni-list-item class="list-item" :border="false" title="昵称" note="" :right-text="mydata.nickname"  />
			
					<!-- 如果只是 right-text=“”那么只能显示一个字符串，加上冒号才能动态赋值-->
					<uni-list-item class="list-item" :border="false" title="名字" note="" :right-text="mydata.name"  />
			
					<uni-list-item class="list-item" :border="false" title="性别" note="" :right-text="mydata.gender" />
					<uni-list-item class="list-item" :border="false" title="年龄" note="" :right-text="mydata.age"  />
					<uni-list-item class="list-item" :border="false" title="地区" note="" :right-text="mydata.zone"  />
					<uni-list-item class="list-item" :border="false" title="个性签名" note="" :right-text="mydata.motto" />
				</uni-list>
				
			</view>
			<view class="fg">?</view>
		</view>
	</view>

</template>

<script>
	// import uniListItem from '../../../../uni_modules/uni-list/components/uni-list/uni-list.vue';
	export default {
		data() {
			return {


				userbk: '',
				userpic: '',
				iconType: 'compose',
				mydata: {
					nickname: '我',
					motto:'这里是一个个性签名',
					name: '张三',
					gender: '女',
					age: '17',
					zone: '中国'

				}

			}

		},
		onLoad(){
			console.log('onLoad查看当前头像'+this.userpic);
			console.log('onLoad查看当前背景'+this.userbk);
			
			
			
		},
		// 生命周期函数，监听页面显示
		onShow() {
			//头像更新一定要用this,不能var that=this,否则会有延迟，所以要用同步的getStorageSync
			let avator = uni.getStorageSync('avator');
			if(avator){
			this.userpic = avator;
			console.log('个人中心onShow获取后的头像'+this.userpic);
			}else{
				this.userpic='../../../../static/self-record/user-head.png';
			}
			
			let backGround = uni.getStorageSync('background');
			if(backGround){
			this.userbk = backGround;
			console.log('个人中心onShow获取后的背景'+this.userbk);
			}else{
				this.userbk='../../../../static/night.png';
			}
			
			var that=this;

			// uni.getStorage({
			// 	key: 'background',
			// 	success(res) {
			// 		console.log('onshow查看当前背景'+that.userbk);
			// 		console.log('获取背景成功', res.data);
			// 		that.userbk = res.data;
			// 		console.log('onshow查看获取后的背景'+that.userbk);
			// 		//强制渲染
			// 		that.$forceUpdate()
					
			// 	}
			// });
			
			uni.getStorage({
				key: 'userInfo',
				success(res) {

					console.log('获取基本信息成功', res.data);
					that.mydata = res.data;
				}
			});

			/* uni.getStorage({
				key: 'userZone',
				success(res) {

					console.log('获取地区成功', res.data);
					that.mydata.zone = res.data.zone;
				}
			}); */
			
			
			
			// this.getAvator()
			// this.getBackground()
		},

		// components: {
		// 	uniListItem
		// },


		methods: {
			goback(){
				uni.navigateBack()
			},
			getAvator() {
				let res = uni.getStorageSync('avator')
				this.userpic = res
				console.log(res);
			},
			getBackground() {
				let res = uni.getStorageSync('background')
				this.userbk = res
			},
			onuploadheaderphoto() {
				uni.chooseImage({
					count: 1,
					sizeType: ["compressed"],
					sourceType: ["album", "camera"],
					success: (res) => {
						console.log(res);
						
						this.userpic = res.tempFilePaths[0];
						var TempFilePath=res.tempFilePaths[0];
						
						//永久保存到本地文件
						 uni.saveFile({
						      tempFilePath: TempFilePath,
						      success: function (res) {
								  console.log("图片永久保存本地成功"+res.savedFilePath)
						        var savedFilePath = res.savedFilePath;
								//同步保存头像路径
								uni.setStorageSync('avator',savedFilePath);
						      }
						    });
						
						
						// // 保存头像路径
						// uni.setStorage({
						// 	key: 'avator',
						// 	data: res.tempFilePaths[0],
						// 	success: function() {
						// 		console.log('avator was saved successfully');
						// 	}
						// })

					}
				});
				
			},
			onError(e) {
			      console.error('图片加载失败：', e);
				  
			    },
			onuploadbkphoto() {
				uni.chooseImage({
					count: 1,
					sizeType: ["compressed"],
					sourceType: ["album", "camera"],
					success: (res) => {
						console.log(res);
						
						this.userbk = res.tempFilePaths[0];
						var TempFilePath=res.tempFilePaths[0];
						
						 uni.saveFile({
						      tempFilePath: TempFilePath,
						      success: function (res) {
								  console.log("图片永久保存本地成功"+res.savedFilePath)
						        var savedFilePath = res.savedFilePath;
								//同步保存背景路径
								uni.setStorageSync('background',savedFilePath);
						      }
						    });
						
						// // 保存背景路径
						// uni.setStorage({
						// 	key: 'background',
						// 	data: res.tempFilePaths[0],
						// 	success: function() {
						// 		console.log('background was saved successfully');
						// 	}
						// })
					}
				})
			},
			editordetail() {
				var that = this;
				uni.navigateTo({
					url: '/pages/self-manage/personalCenter/editorDetail',
					events: {
						editPersonalData(data) {
							that.mydata.nickname = data.nickname;
							that.mydata.motto=data.motto;
							that.mydata.name = data.name;
							that.mydata.gender = data.gender;
							that.mydata.age = data.age;
							that.mydata.zone = data.zone;
							uni.setStorage({ //存入Storage
								key: 'userInfo', //自己取个名字
								data: { //存的数据可以是很多条
									nickname: that.mydata.nickname,
									motto:that.mydata.motto,
									name: that.mydata.name,
									gender: that.mydata.gender,
									age: that.mydata.age,
									zone: that.mydata.zone,
								},

								success() {
									console.log('userInfo储存成功');
								}
							});

							// 上一句不加分号的话下面这个就执行不了
							console.log('查看数组：', that.mydata);
							console.log('PersonalCenter页面成功接收到editorDetail的数据');

						},

					}
				});
			},

		}
	}
</script>

<style lang="scss">
	page {
		background: #ffffff;
	}
	.back{
		z-index: 99;
		position: fixed;
		top: 40px;
		left: 15px;
		text-shadow: -1px 0 white, 0 1px white, 1px 0 white, 0 -1px white; /*文本描边*/
		// width: 50px;
		// height: 50px;
		// filter:alpha(opacity=80);
		// -moz-opacity:0.85;
		// -khtml-opacity: 0.85;
		// opacity: 0.85;
	}
	.edit{
		z-index: 99;
		position: fixed;
		top: 40px;
		right: 15px;
		text-shadow: -1px 0 white, 0 1px white, 1px 0 white, 0 -1px white; /*文本描边*/
	}
	.background-pic {
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0; //撑开
		filter: blur; //模糊
		opacity: 0.5; //透明度
		height: 280px;
		image {
			width: 100%;
			height: 100%;
		}
	}
	.content{
		background-color: #ffffff;
		position: relative;
		top: 200px;
		box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.1);
		border-radius: 45px 45px 0 0;
	}
	.head {
		text-align: center;
		align-items: center; //垂直居中
		justify-content: center; //水平居中（这个不要也行）
		display: flex; //这句话一定要写在align-item ：center后面才能居中
		flex-direction: column;
		/* .my-data {
			margin-top: 15px;
			display: flex; //子元素横向排

			.my-data-box {

				flex-direction: column; //让两个text子元素竖着排
				justify-content: center;
				align-items: center;
				display: flex;
				width: 100%;
				font-size: 15px;
				color: #999;

				.my-data-box-title {
					font-size: 14px;
					color: #333;
				}
			}
		} */

	}
	.head-logo-pic {
		margin-top: -30px;
		width: 60px;
		height: 60px;
		border-radius: 50%;
		overflow: hidden; //隐藏溢出
		box-shadow: -1px 1px 5px 1px rgba(0, 0, 0, 0.1), -1px 2px 1px 0 rgba(255, 255, 255) inset;
		image {
	
			width: 100%;
			height: 100%;
		}
	}
	.myNameAndSig{
		text-align: center;
		align-items: center; //垂直居中
		justify-content: center; //水平居中（这个不要也行）
		display: flex; //这句话一定要写在align-item ：center后面才能居中
		flex-direction: column;
	}
	.myNickname {
		width: 120px;
		font-size: 16px;
		margin: 5px;
	
	}
	.my-name {
		margin-top: 15px;
		font-size: 16px;
		font-weight: bold;
		margin-bottom: 15px;
	}
	.mySig{
		font-size: 17px;
		margin-bottom: 10px;
		color: #989898;
	}
	.my-sig {
		margin-top: 15px;
		font-size: 14px;
		font-weight: bold;
		margin-bottom: 15px;
	}
	.body {
		padding: 30px;
		font-size: 20px;
	}
	.list-item{
		height: 50px;
		
	}
	.fg{
		height: 20px;
		width: 100%;
		color: #ffffff;
		background-color: #ffffff;
		position: absolute;
		bottom: -10px;
	}
</style>