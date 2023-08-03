<template>
	<view>
		<!-- 2023-7-8-新增-->
		<view class="FormPage">

			<form class="FormPage" @submit="formSubmit" @reset="formReset">

				<view class="uni-form-item-input">
					<uni-section title="事件名称" subTitle="给我取一个更好听的名字吧~" type="line" padding>
						<uni-easyinput  errorMessage v-model="item.title" focus placeholder="例如:看电影"
							@input="input"></uni-easyinput>
					</uni-section>
				</view>

				<view class="uni-form-item-date">
					<button class="calendar-button" type="button" @click="opencalendar">日期选择</button>
					<uni-calendar ref="calendar" class="uni-calendar-hook" :clear-date="true" :date="info.date"
						:insert="info.insert" :lunar="info.lunar" :startDate="item.startDate" :endDate="item.endDate"
						:range="info.range" @confirm="confirm" @close="close" />
				</view>
				
				<view class="uni-form-item-content">
					<uni-section title="事件内容" subTitle="描述一下发生的趣事吧~" type="line" padding>
						<uni-easyinput type="textarea" v-model="Content_value" placeholder="请输入内容"></uni-easyinput>
					</uni-section>
				</view>


				<uni-section title="今天的心情指数" subTitle="给今天的心情评个分吧!" type="line" padding>
					<uni-rate :max="10" :value="5" />
				</uni-section>

				<!-- <view class="uni-form-item uni-column">
					<view class="title">是否保存？</view>
					<radio-group name="radio">
						<label class="label-item">
							<radio value="yes" /><text>是</text>
						</label>
						<label>
							<radio value="no" /><text>否</text>
						</label>
					</radio-group>
				</view> -->

				<view class="form-bottom">
					<button form-type="submit" @click="SubmitEvent" >提交</button>
					<button type="default" form-type="reset">重设</button>
				</view>


<!-- 2023-7-8-新增结束 -->
			</form>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				item: {title:'', Content_value:'',url:''},
				showicons:false,
				Content_value: '', //事件输入框的内容
				selectedDate: '', // 保存选择的日期
				showCalendar: false, // 控制日历的显示与隐藏
				info: {
					lunar: true,
					range: true,
					insert: false,
					selected: []
				}
			}
		},
		methods: {
			
			// 2023-7-30添加
			SubmitEvent(){
				var that=this;
				uni.showModal({
					title: '提示',
					content: `您确认要提交吗？`,
					success: function(res) {
						if (res.confirm) {
							console.log('用户点击确定')
							
							const eventChannel = that.getOpenerEventChannel();
							eventChannel.emit('aditorEvent',that.item);
							console.log('EventFormRecord界面成功返回数据给play!',that.item);
							that.item = {title:'',  Content_value:'',url:''};
							
							uni.navigateBack();
							// 参数发射一定要写在跳转后面
							// uni.$emit('update',{title:res.item.title})
						} else if (res.cancel) {
							console.log('用户点击取消')
						}
					}
				})
			},
			iconselect(){
				this.showicons=true;
			},
			// 2023-7-30添加结束
			opencalendar() {
				this.$refs.calendar.open();
			},
			toggleCalendar() {
				this.showCalendar = !this.showCalendar; // 切换日历的显示与隐藏
			},
			handleDateSelect(date) {
				this.selectedDate = date; // 处理选中日期的回调
				this.showCalendar = false; // 选择日期后隐藏日历
			},

			formSubmit: function(e) {
				console.log('form发生了submit事件，携带数据为：' + JSON.stringify(e.detail.value))
				var formdata = e.detail.value
			},
			formReset: function(e) {
				console.log('清空数据')
			},
			input(e) {
							console.log('输入内容：', e);
						},
			close(){
							console.log('关闭日历');
						},	
			confirm(e) {
							uni.showToast({
								title: `选择时间成功`,
								icon: 'none'
							});
							this.item.startDate=e.range.before;
							this.item.endDate=e.range.after;
							console.log('开始时间'+e.range.before);
							console.log('结束时间'+e.range.after);
							console.log('确认日期 返回:', e)
						}
			
		}
	}
</script>

<style>
	.FormPage {
		/* 表单页面颜色:浅灰*/
		background-color: rgb(254, 254, 254);
	}


	/* .uni-form-item .checkbox-item {
		padding: 5% 20%;
	} */

	.uni-form-item-input 
	{
		padding: 1% 1%;
		text-align: left;

	}
	.uni-form-item-date{
		padding: 1% 5%;
		text-align: left;
	}

	.uni-form-item-date .calendar-button {
		/* width:60%; /* 设定按钮的宽度和高度 */
		/* height: 40px; */
		/* border-radius: 50%; /* 设置按钮的边框半径 */
		/* overflow: hidden; /* 隐藏超出按钮边界的内容 */
		text-size-adjust: auto;

	}
	.form-bottom{
		padding: 1% 5%;
		text-align: left;
		text-size-adjust: auto;
	}
	/* 2023-7-30添加 */
	.image {
		width: 25px;
		height: 25px;
	}
	
	.text {
		font-size: 14px;
		margin-top: 5px;
	}
	.grid-item-box{
		
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 15px 0;
	}
	
</style>