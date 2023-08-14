<template>

	<view class="personalDataDetail">
		<form class="FormPage" @reset="formReset">
			<uni-card title="昵称">
				<textarea :maxlength="20" v-model="mydata.nickname" auto-height
					placeholder=""></textarea>
			</uni-card>

			<uni-card title="姓名">
				<textarea :maxlength="20" v-model="mydata.name" auto-height placeholder=""></textarea>
			</uni-card>


			<uni-card title="性别">
				<textarea :maxlength="20" v-model="mydata.gender" auto-height placeholder=""></textarea>
			</uni-card>

			<uni-card title="年龄">
				<textarea :maxlength="20" v-model="mydata.age" auto-height placeholder=""></textarea>
			</uni-card>


			<view class="form-bottom">
				<button form-type="submit" @click="SubmitEvent">提交</button>
				<button type="default" form-type="reset">重设</button>
			</view>
		</form>
	</view>
</template>

<script>
	
	export default {
		data() {
			return {
				
				mydata: {
					nickname: '',
					name: '',
					gender: '',
					age: '',

				}

			}

		},

//生命周期函数监听页面显示
		onShow() {
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
							}

						} else if (res.cancel) {
							console.log('用户点击取消')
						}
					}
				})
			},

		}
	}
</script>

<style>
</style>