<template>
	<view>
		<!-- 头部-->
		<view class="head">
			<!-- 背景图片 -->
			<view class="head-background-pic">
				<!-- <image @click="onuploadphoto" src="../../../../static/night.png" mode=""></image> -->
				<image :src="userbk" class="image" mode="aspectFill" @click="onuploadbkphoto" />
			</view>
			<!-- 头像和昵称-->
			<view class="head-logo">

				<view class="head-logo-pic">
					<image :src="userpic" class="image" mode="aspectFill" @click="onuploadheaderphoto" />
					<!-- <image @click="onuploadphoto" src="../../../../static/sun.png" mode="aspectFill"></image> -->
				</view>
				<view class="my-nikename">
					<text class="my-name" @click="changeNickName">{{mydata.nickname}}</text>
					<!-- <input type="text" placeholder="请输入我的昵称" class="myNickname"> -->
				</view>
			</view>
			<!-- 个人信息如性别年龄 -->
			<view class="my-data">

				<view class="my-data-box">
					<text class="my-data-box-title">姓名</text>
					<text class="my-data-box-title">{{mydata.name}}</text>
					<!-- <input type="text"> -->
				</view>

				<view class="my-data-box">
					<text class="my-data-box-title">性别</text>
					<text class="my-data-box-title">{{mydata.gender}}</text>
					<!-- <input type="text"> -->
				</view>

				<view class="my-data-box">
					<text class="my-data-box-title">年龄</text>
					<text class="my-data-box-title">{{mydata.age}}</text>
					<!-- <input type="number"> -->
				</view>

			</view>


		</view>


		<view class="body">
			<uni-list class="list-item">
				<!-- <uni-list-item title="个人资料" note="" showArrow
					thumb="/static/编辑个人资料.png" thumb-size="lg"
					rightText=""  link to="/pages/self-manage/personalCenter/editorPersonalData" />
				 -->
				<uni-list-item title="昵称" note="" :right-text="mydata.nickname" clickable @click="editordetail"
					showArrow />

				<!-- 如果只是 right-text=“”那么只能显示一个字符串，加上冒号才能动态赋值-->
				<uni-list-item title="名字" note="" :right-text="mydata.name" clickable @click="editordetail" showArrow />

				<uni-list-item title="性别" note="" :right-text="mydata.gender" clickable @click="editordetail"
					showArrow />
				<uni-list-item title="年龄" note="" :right-text="mydata.age" clickable @click="editordetail" showArrow />
				<uni-list-item title="地区" note="" :right-text="mydata.zone" clickable @click="selectzone" showArrow />
			</uni-list>
		</view>
	</view>

</template>

<script>
	// import uniListItem from '../../../../uni_modules/uni-list/components/uni-list/uni-list.vue';
	export default {
		data() {
			return {


				userbk: '../../../../static/night.png',
				userpic: '../../../../static/night.png',
				iconType: 'compose',
				mydata: {
					nickname: '我的昵称',
					name: '张三',
					gender: '女',
					age: '17',
					zone: '中国'

				}

			}

		},
		// 生命周期函数，监听页面显示
		onShow() {

			var that = this;
			uni.getStorage({
				key: 'userInfo',
				success(res) {

					console.log('获取基本信息成功', res.data);
					that.mydata = res.data;
				}
			});

			uni.getStorage({
				key: 'userZone',
				success(res) {

					console.log('获取地区成功', res.data);
					that.mydata.zone = res.data.zone;
				}
			});
			
			this.getAvator()
			this.getBackground()
		},

		// components: {
		// 	uniListItem
		// },


		methods: {
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
						// 保存头像路径
						uni.setStorage({
							key: 'avator',
							data: res.tempFilePaths[0],
							success: function() {
								console.log('avator was saved successfully');
							}
						})

					}
				})
			},
			onuploadbkphoto() {
				uni.chooseImage({
					count: 1,
					sizeType: ["compressed"],
					sourceType: ["album", "camera"],
					success: (res) => {
						console.log(res);
						this.userbk = res.tempFilePaths[0]
						// 保存背景路径
						uni.setStorage({
							key: 'background',
							data: res.tempFilePaths[0],
							success: function() {
								console.log('background was saved successfully');
							}
						})
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
							that.mydata.name = data.name;
							that.mydata.gender = data.gender;
							that.mydata.age = data.age;

							uni.setStorage({ //存入Storage
								key: 'userInfo', //自己取个名字
								data: { //存的数据可以是很多条
									nickname: that.mydata.nickname,
									name: that.mydata.name,
									gender: that.mydata.gender,
									age: that.mydata.age,

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
			selectzone() {
				var that = this;
				uni.navigateTo({
					url: '/pages/self-manage/personalCenter/selectZone',
					events: {
						editZone(data) {
							that.mydata.zone = data.zone

							uni.setStorage({ //存入Storage
								key: 'userZone', //自己取个名字
								data: { //存的数据可以是很多条

									zone: that.mydata.zone,

								},

								success() {
									console.log('userZone储存成功');
								}
							});

							// 上一句不加分号的话下面这个就执行不了
							console.log('查看数组：', that.mydata.zone);
							console.log('PersonalCenter页面成功接收到selectZone的数据');

						},

					}
				});
			}



		}
	}
</script>

<style lang="scss">
	page {
		background: #f5f5f5;
	}

	.head {
		position: relative;
		padding-bottom: 15px;

		.head-background-pic {
			position: absolute;
			top: 0;
			right: 0;
			bottom: 0;
			left: 0; //撑开
			filter: blur; //模糊
			opacity: 0.5; //透明度

			image {
				width: 100%;
				height: 100%;
			}
		}

		.head-logo {


			flex-direction: column; //垂直排列
			with: 750rpx;

			text-align: center;
			align-items: center; //垂直居中
			justify-content: center; //水平居中（这个不要也行）
			display: flex; //这句话一定要写在align-item ：center后面才能居中
			padding-top: 30px;

			.myNickname {
				width: 120px;
				font-size: 16px;

			}

			.head-logo-pic {


				width: 60px;
				height: 60px;
				border-radius: 50%;
				overflow: hidden; //隐藏溢出

				image {

					width: 100%;
					height: 100%;
				}
			}

			.my-name {
				margin-top: 15px;
				font-size: 16px;
				font-weight: bold;
				margin-bottom: 15px;
			}
		}

		.my-data {
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
		}

	}

	.body {

		.list-item {
			margin-top: 50px;
		}
	}
</style>