<template>

	<view class="personalDataDetail">
		<form class="FormPage" @reset="formReset">
			<view class="form-item_outside">
				<uni-section style="height: 50px;" title="昵称" subTitle="给自己一个好听的昵称吧~" padding>
					<template v-slot:decoration>
						<view class="decoration"></view>
					</template>
				</uni-section>
				<view class="form-item_content">
					<textarea :maxlength="20" v-model="mydata.nickname" auto-height placeholder=""></textarea>
				</view>
			</view>
			<view class="form-item_outside">
				<uni-section style="height: 50px;" title="姓名" subTitle="您的名字" padding>
					<template v-slot:decoration>
						<view class="decoration"></view>
					</template>
				</uni-section>
				<view class="form-item_content">
					<textarea :maxlength="20" v-model="mydata.name" auto-height placeholder=""></textarea>
				</view>
			</view>
			<view class="form-item_outside">
				<uni-section style="height: 50px;" title="性别" subTitle="您的自我认同" padding>
					<template v-slot:decoration>
						<view class="decoration"></view>
					</template>
				</uni-section>
				<view class="form-item_content">
					<textarea :maxlength="20" v-model="mydata.gender" auto-height placeholder=""></textarea>
				</view>
			</view>
			<view class="form-item_outside">
				<uni-section style="height: 50px;" title="年龄" subTitle="永远18岁也是可以的~" padding>
					<template v-slot:decoration>
						<view class="decoration"></view>
					</template>
				</uni-section>
				<view class="form-item_content">
					<textarea :maxlength="20" v-model="mydata.age" auto-height placeholder=""></textarea>
				</view>
			</view>
			<view class="form-item_outside">
				<uni-section style="height: 50px;" title="地区" subTitle="您在哪呢？" padding>
					<template v-slot:decoration>
						<view class="decoration"></view>
					</template>
				</uni-section>
				<view class="zone" @click="selectzone">
					<text >{{mydata.zone}}</text>
				</view>
				
			</view>
			<view class="form-item_outside">
				<uni-section style="height: 50px;" title="个性签名" subTitle="对自己说点什么吧~" padding>
					<template v-slot:decoration>
						<view class="decoration"></view>
					</template>
				</uni-section>
				<view class="form-item_content">
					<textarea v-model="mydata.motto" auto-height placeholder=""></textarea>
				</view>
			</view>
			<view class="form-bottom">
				<button class="button" form-type="submit" @click="SubmitEvent">提交</button>
				<button class="button" style="background-color: #797979; " @click="zone_reset" form-type="reset">重设</button>
			</view>
		</form>
		<view class="br"></view>
	</view>
</template>

<script>
	
	export default {
		data() {
			return {
				
				mydata: {
					nickname: '',
					motto:'',
					name: '',
					gender: '',
					age: '',
					zone: '',
				}

			}

		},

//生命周期函数监听页面显示
		onLoad() {
			var that = this;
			uni.getStorage({
				key: 'userInfo',
				success(res) {

					console.log('获取成功', res.data);
					that.mydata = res.data;
				}
			})
		},

		methods: {

			SubmitEvent() {
				var that = this
				uni.showModal({
					title: '提示',
					content: `您确认要提交吗？`,
					success: function(res) {
						if (res.confirm) {
							console.log('用户点击确定')
							
							const eventChannel = that.getOpenerEventChannel();
							
							{
								eventChannel.emit('editPersonalData', that.mydata);
								console.log('editorDetail界面成功返回数据给PersonalCenter!', that.mydata);

								uni.navigateBack();
								uni.showToast({
								         title: "已设置",
								         icon: 'success',
								         success: function (res) {
								          
								         },
								         fail: function (res) {
								           
								         },
								       });
							}

						} else if (res.cancel) {
							console.log('用户点击取消')
						}
					}
				})
			},
			selectzone() {
				var that = this;
				uni.navigateTo({
					url: '/pages/self-manage/personalCenter/selectZone',
					events: {
						editZone(data) {
							that.mydata.zone = data.zone
			
							/* uni.setStorage({ //存入Storage
								key: 'userZone', //自己取个名字
								data: { //存的数据可以是很多条
			
									zone: that.mydata.zone,
			
								},
			
								success() {
									console.log('userZone储存成功');
								}
							}); */
			
							// 上一句不加分号的话下面这个就执行不了
							console.log('查看数组：', that.mydata.zone);
							console.log('PersonalCenter页面成功接收到selectZone的数据');
			
						},
			
					}
				});
			},
			zone_reset(){
				this.mydata.zone='';
			}
		}
	}
</script>

<style>
	.personalDataDetail{
		display: flex;
		flex-direction: column;
		background-color: rgb(245, 245, 245);
		/* justify-content: center; */
		align-items: center;
	}
	.FormPage {
		/* 表单页面颜色:浅灰*/
		width: 100%;
		padding: 20px;
		background-color: rgb(245, 245, 245);
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	.form-item_outside{
		padding: 2% 2%;
		text-align: left;
		background-color: white;
		box-shadow: -1px 1px 5px 1px rgba(0, 0, 0, 0.1), -1px 2px 1px 0 rgba(255, 255, 255) inset;
		border-radius: 10px;
		width: 75%;
		margin: 10px 0 20px 40px;
	}
	.decoration{
		width: 4px;
		height: 20px;
		margin-right: 8px;
		border-radius: 30%;
		background-color: #009688;
	}
	.form-item_content{
		margin: 12px 20px 15px;
	}
	.zone{
		margin: 12px 20px 15px;
		height: 25px;
	}
	.form-bottom {
		width: 75%;
		margin-left: 30px;
		margin-top: 40px;
		padding: 1% 5%;
		/* text-align: left; */
		/* text-size-adjust: auto; */
		display: flex;
		justify-content: space-evenly;
	}
	.button{
		
		color: white;
		background-color: #009688;
		border-radius: 180px;
		border-color: white;
		border-width: 1px;
		width: 100px;
		height: 45px;
		text-align: center;
	}
	.br{/*留空*/
		height: 80px;
	}
</style>