<template>
	<view>
		<!-- 2023-7-8-新增-->
		<view class="FormPage">

			<form class="FormPage" @submit="formSubmit" @reset="formReset">


				<view class="uni-form-item uni-column">
					<uni-section title="请输入事件名称" subTitle="给我取一个更好听的名字吧~" type="line" padding>
						<!-- <view class="title">请输入事件名称</view> -->
						<!-- <input class="uni-input" name="input" placeholder="例如:看电影" /> -->
						<uni-easyinput errorMessage v-model="input_value" focus placeholder="例如:看电影"
							@input="input"></uni-easyinput>
					</uni-section>
				</view>


				<!-- <view class="uni-form-item uni-column">
					<view class="title">switch</view>
					<view>
						<switch name="switch" />
					</view>
				</view> -->



				<view class="uni-form-item uni-column">
					<button class="calendar-button" type="button" @click="open">日期选择</button>
					<uni-calendar ref="calendar" class="uni-calendar--hook" :clear-date="true" :date="info.date"
						:insert="info.insert" :lunar="info.lunar" :startDate="info.startDate" :endDate="info.endDate"
						:range="info.range" @confirm="confirm" @close="close" />
				</view>

				<view class="uni-form-item uni-column">
					<uni-section title="事件内容" subTitle="描述一下发生的趣事吧~" type="line" padding>
						<uni-easyinput type="textarea" v-model="Content_value" placeholder="请输入内容"></uni-easyinput>
					</uni-section>
				</view>

				<uni-section title="今天的心情指数" subTitle="给今天的心情评个分吧!" type="line" padding>
					<uni-rate :max="10" :value="5" />
				</uni-section>


				<view class="uni-form-item uni-column">

					<view class="title">是否保存？</view>
					<radio-group name="radio">
						<label class="label-item">
							<radio value="radio1" /><text>是</text>
						</label>
						<label>
							<radio value="radio2" /><text>否</text>
						</label>
					</radio-group>

				</view>


				<!-- <view class="uni-form-item uni-column">
					<view class="title">checkbox</view>
					<checkbox-group name="checkbox">
						<label class="checkbox-item">
							<checkbox value="checkbox1" /><text>选项一</text>
						</label>
						<label>
							<checkbox value="checkbox2" /><text>选项二</text>
						</label>
					</checkbox-group>
				</view> -->


				<!-- <view class="uni-form-item uni-column">
					<view class="title">slider</view>
					<slider value="50" name="slider" show-value></slider>
				</view> -->



				<view class="uni-btn-v">
					<button form-type="submit" >Submit</button>
					<button type="default" form-type="reset">Reset</button>
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
				input_value:'',
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
			open() {
				this.$refs.calendar.open()
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
				uni.showModal({
					content: '表单数据内容：' + JSON.stringify(formdata),
					showCancel: false
				});
			},
			formReset: function(e) {
				console.log('清空数据')
			},
			input(e) {
							console.log('输入内容：', e);
						},
			
		}
	}
</script>

<style>
	.FormPage {
		/* 表单页面颜色:浅灰*/
		background-color: rgb(254, 254, 254);
	}

	.uni-form-item .title {
		padding: 5% 5%;
		text-align: center;
	}

	.uni-form-item .label-item {
		
		padding: 5% 25%;
		
		
	}

	/* .uni-form-item .checkbox-item {
		padding: 5% 20%;
	} */

	.uni-form-item .uni-input {
		padding: 1% 5%;
		text-align: left;

	}

	.uni-form-item .calendar-button {
		/* width:60%; /* 设定按钮的宽度和高度 */
		/* height: 40px; */
		/* border-radius: 50%; /* 设置按钮的边框半径 */
		/* overflow: hidden; /* 隐藏超出按钮边界的内容 */
		text-size-adjust: auto;

	}
	
</style>