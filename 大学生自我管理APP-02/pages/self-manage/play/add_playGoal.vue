<template>


	<view class="addGoalForm">
		<form class="FormPage" @reset="formReset">
			<uni-card title="目标名称">
				<textarea :maxlength="20" v-model="item.title" auto-height placeholder="请输入娱乐目标"></textarea>
			</uni-card>

			<uni-card title="目标描述">
				<textarea :maxlength="20" v-model="item.content" auto-height placeholder="请输入内容"></textarea>
			</uni-card>

			<uni-card title="时间类型">
				<uni-data-checkbox v-model="baseFormData.time" :localdata="time_type" @change="choosetimetype" />
			</uni-card>

			<!-- <view v-if="item.timetype0" class="uni-form-item-date">
				<button class="calendar-button" type="button" @click="opencalendar">时间段选择(同一天请点击两次)</button>
				<uni-calendar ref="calendar" class="uni-calendar-hook" :clear-date="true" :date="info.date"
					:insert="info.insert" :lunar="info.lunar" :startDate="item.startDate" :endDate="item.endDate"
					:range="info.range" @confirm="confirm" @close="close" />
			</view> -->
			<!-- 2023-10-24添加 -->
			
			
			<uni-card v-if="item.timetype0" title="选择时间范围">
			<!-- <uni-section :title="'日期时间范围用法：' + '[' + datetimeRange + ']' " type="line"></uni-section> -->
			
				<view class="example-body">
					<uni-datetime-picker v-model="datetimeRange" type="datetimerange" rangeSeparator="至" return-type="date" :end="TodayDate" />
				</view>
			</uni-card>
			
			<!-- <uni-card v-if="item.timetype0" title="选择时间范围">
				<view class="example-body">
					<uni-datetime-picker   v-model="datetimeRange"  type="datetimerange" rangeSeparator="至" />
				</view>
			</uni-card> -->
			
			
			<!-- 2023-10-24添加结束 -->
			
			<view v-if="item.timetype1" class="uni-form-item-date">
				<view class="uni-px-5 uni-pb-5">
					<!-- <view class="text">多选选中：{{JSON.stringify(item.checkbox2)}}</view> -->
					<uni-data-checkbox multiple v-model="item.checkbox2" :localdata="weeks"></uni-data-checkbox>
				</view>
			</view>

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
				// 2023-10-24添加
				// datetimeRange: [this.getDateTime(Date.now() - 5 * 24 * 3600000), this.getDateTime(Date.now() + 5 * 24 * 3600000)],
				datetimeRange: [],
				// 2023-10-24添加结束
				TodayDate:this.getDate(new Date()),
				weeks: [{
						text: '周一',
						value: '每周一'
					}, {
						text: '周二',
						value: '每周二'
					}, {
						text: '周三',
						value: '每周三'
					}, {
						text: '周四',
						value: '每周四'
					},
					{
						text: '周五',
						value: '每周五'
					},
					{
						text: '周六',
						value: '每周六'
					},
					{
						text: '周日',
						value: '每周日'
					},
					{
						text: '每天',
						value: '每天'
					}

				],
				// 基础表单数据
				baseFormData: {
					time: 2
				},
				time_type: [{
					text: '时间段',
					value: 0
				}, {
					text: '周期',
					value: 1

				}],
				// 时间类型1

				// 时间类型2

				item: {
					timetype0: false,
					timetype1: false,
					title: '',
					startDate: '',
					endDate: '',
					daterange:'',
					checkbox2: '',
				},
				info: {
					lunar: true,
					range: true,
					insert: false,
					selected: []
				}
			}
		},
		// 2023-10-24添加
		watch: {
			
			datetimeRange() {
				console.log('日期时间范围选:', this.datetimeRange);
			}
		},
		// 2023-10-24添加结束
		methods: {
			
			// 2023-10-24添加
			addZero(num) {
				if (num < 10) {
					num = `0${num}`
				}
				return num
			},
			getDate(date){
			  date = new Date(date)
			  const year = date.getFullYear()
			  const month = date.getMonth()+1
			  const day = date.getDate()
			  return `${year}-${this.addZero(month)}-${this.addZero(day)}`
			},
			getTime(date){
			  date = new Date(date)
			  const hour = date.getHours()
			  const minute = date.getMinutes()
			  const second = date.getSeconds()
			  return this.hideSecond ? `${this.addZero(hour)}:${this.addZero(minute)}` : `${this.addZero(hour)}:${this.addZero(minute)}:${this.addZero(second)}`
			},
			getDateTime(date){
			  return `${this.getDate(date)} ${this.getTime(date)}`
			},
			// 2023-10-24添加结束
			
			choosetimetype() {

				if (this.baseFormData.time == 0) {
					this.item.timetype1 = false;
					this.item.timetype0 = true;
				} else if (this.baseFormData.time == 1) {
					this.item.timetype0 = false;
					this.item.timetype1 = true;

				}
			},
			opencalendar() {
				this.$refs.calendar.open();
			},
			close() {
				console.log('关闭日历');
			},
			confirm(e) {


				uni.showToast({
					title: '开始时间' + e.range.before + ' 结束时间' + e.range.after,
					icon: 'none'
				});

				this.item.startDate = e.range.before;
				this.item.endDate = e.range.after;
				console.log('开始时间' + e.range.before);
				console.log('结束时间' + e.range.after);
				console.log('确认日期 返回:', e)
			},
			SubmitEvent() {
				var that = this
				uni.showModal({
					title: '提示',
					content: `您确认要提交吗？`,
					success: function(res) {
						if (res.confirm) {
							console.log('用户点击确定')
							const eventChannel = that.getOpenerEventChannel();
							let EventObj={
								timetype0: that.item.timetype0,
								timetype1: that.item.timetype1,
								title: that.item.title,
								startDate: that.datetimeRange[0],
								endDate: that.datetimeRange[1],
								daterange:that.item.daterange,
								checkbox2: that.item.checkbox2,
								
								
							}
							{
								eventChannel.emit('addplayGoal', EventObj);
								console.log('add_playGoal界面成功返回数据给play!', EventObj);
								that.item = {
									timetype0: false,
									timetype1: false,
									title: '',
									startDate: '',
									endDate: '',
									checkbox2: '',
								};

								uni.navigateBack();
							}

						} else if (res.cancel) {
							console.log('用户点击取消')
						}
					}
				})
			},
			formReset: function(e) {
				console.log('清空数据')
				console.log(e)
			},

		}
	}
</script>

<style>
	.uni-form-item-date {
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

	.uni-form-item-content {}

	.form-bottom {
		padding: 1% 5%;
		text-align: left;
		text-size-adjust: auto;
	}
</style>