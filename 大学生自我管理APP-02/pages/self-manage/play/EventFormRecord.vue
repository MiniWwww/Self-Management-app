<template>
	<view>
		<!-- 2023-7-8-新增-->
		<view class="box">
			<view class="uni-form-item-input">
				<uni-section style="height: 50px;" title="事件名称" subTitle="给我取一个更好听的名字吧~" padding>
					<template v-slot:decoration>
						<view class="decoration"></view>
					</template>
				</uni-section>
				<view class="EventTitlebox">
					<view class="EventTitle">
						<textarea :maxlength="20" v-model="item.title" auto-height placeholder=""></textarea>
					</view>
				</view>
			</view>

			<view class="uni-form-item-input">
			<view>
			      <uni-section style="height: 50px;" title="选择图标" subTitle="选择一个新图标" padding>
					  <template v-slot:decoration>
					  	<view class="decoration"></view>
					  </template>
					  </uni-section>
			      <icon-selector @select="handleIconSelect"></icon-selector>
			    </view>
			</view>
			
			<form class="FormPage" @submit="formSubmit" @reset="formReset">


				<!-- 待完成从时间格式化 -->
				<view class="form-item_outside">
					<uni-section style="height: 50px;" title="事件时间" subTitle="什么时候做了这件事呢？" padding>
						<template v-slot:decoration>
							<view class="decoration"></view>
						</template>
					</uni-section>
					<!-- <view class="time-picker">
						<uni-datetime-picker v-model="datetimeRange" type="datetimerange" rangeSeparator="至"
						:end="item.Today"  hide-second="true"/>
					</view> -->
					
					<!-- <view class="time-picker">
						<uni-datetime-picker v-model="datetimeRange" type="datetimerange" rangeSeparator="至"
							 :end="item.Today" :picker-options="pickerOptions" hide-second="true" style="width: 255px;"/>
					</view> -->
					
							<view class="time-picker">
								<uni-datetime-picker type="datetime" v-model="startTime" 
								placeholder ="开始时间" hide-second="true" :end="item.Today" style="width: 255px;"/>
							</view>
							<view class="time-picker">
								<uni-datetime-picker type="datetime" v-model="endTime" 
								placeholder ="结束时间" hide-second="true" :end="item.Today" style="width: 255px;"/>
							</view>
					
					
					
				</view>
				
				<view class="form-item_outside">
					<uni-section style="height: 50px;" title="事件内容" subTitle="描述一下发生的趣事吧~" padding>
						<template v-slot:decoration>
							<view class="decoration"></view>
						</template>
					</uni-section>
					<view class="form-item_content">
						<uni-easyinput type="textarea" v-model="item.event_description"
							placeholder="请输入内容"></uni-easyinput>
					</view>
				</view>
				<view class="form-item_outside">
					<uni-section style="height: 50px;" title="今天的心情指数" subTitle="给今天的心情评个分吧!" padding>
						<template v-slot:decoration>
							<view class="decoration"></view>
						</template>
					</uni-section>
					<view class="form-item_content">
						<uni-rate :max="10" :value="5" v-model="item.rank" />
					</view>
				</view>

				<view class="form-bottom">
					<button class="button" form-type="submit" @click="SubmitEvent">提交</button>
					<button class="button" style="background-color: #797979; " form-type="reset">重设</button>
				</view>


				<!-- 2023-7-8-新增结束 -->
			</form>
		</view>
		<view class="br"></view>
	</view>
</template>

<script>
	import IconSelector from '@/components/icon-selector/icon-selector.vue';
	export default {
		components: {
		    IconSelector
		  },
		  
		// onLoad() {
		// 	var that=this
		// 	const eventChannel = that.getOpenerEventChannel();
		// 	eventChannel.on('GridIndexEmit', data => {
		// 		that.PlayPageIndex.ListID = data.ListID;
		// 		that.PlayPageIndex.ListIndex = data.ListIndex;

		// 		console.log('play界面成功发射数据给EventFormRecord', data)


		// 	});
		// },
		data() {
			return {
				selectedIcon: '',
				// 2023-10-24添加
				// datetimeRange: [this.getDateTime(Date.now() - 5 * 24 * 3600000), this.getDateTime(Date.now() + 5 * 24 *
				// 	3600000)],
				datetimeRange: [],
				startTime:[],
				endTime:[],
				// 2023-10-24添加结束
				pickerOptions: {
					disableDate(time) {
						// const startDate=this.getDateTime(Date.now() - 5 * 24 * 3600000);
						// this.datetimeRange[0]=startDate;

						// const endDate=this.getDateTime(Date.now() - 5 * 24 * 3600000);
						// this.datetimeRange[1]=endDate;

						return (
							time < this.getDisableStartDate(startDate) ||
							time > this.getDisableEndDate(endDate)
						);
					},
				},
				PlayPageIndex: {
					ListID: Number,
					ListIndex: Number,
					ListImage: '',
				},
				item: {
					title: '',
					Today: this.getDateTime(new Date()),
					iconUrl:'',
					TodaystartTime: '',
					TodayendTime: '',
					event_description: '',
					rank: 5

				},
				EventList: [],



			}
		},
		onUnload() {
			console.log('这是EventFormRecord的onUnload函数');
		},
		onShow() {

			var that = this;
			uni.getStorage({
				key: 'CurrentTitle',
				success(res) {

					console.log('获取CurrentTitle成功', res.data);
					that.item.title = res.data.TitleName
					that.item.iconUrl=res.data.iconUrl

				}
			});

			uni.getStorage({
				key: 'playEventDATA',
				success(res) {

					console.log('获取playEventDATA成功', res.data);
					that.EventList = res.data.PlayEventList
					console.log('EventList:', that.EventList);
				}
			});


		},
		// onShow() {
		// 	let lastTime_Event = uni.getStorageSync('playEventData');
		// 	this.item.Today= lastTime_item[];
		// },

		// 2023-10-24添加
		watch: {

			datetimeRange() {
				console.log('日期时间范围选:', this.datetimeRange);
			}
		},
		// 2023-10-24添加结束
		methods: {
			handleIconSelect(icon) {
				
			     // this.selectedIcon = icon;
				 this.item.iconUrl=icon;
				 console.log("当前icon:",this.item.iconUrl);
				 
			   },
			// 2023-10-24添加
			addZero(num) {
				if (num < 10) {
					num = `0${num}`
				}
				return num
			},
			getDate(date) {
				date = new Date(date)
				const year = date.getFullYear()
				const month = date.getMonth() + 1
				const day = date.getDate()
				return `${year}-${this.addZero(month)}-${this.addZero(day)}`
			},
			getTime(date) {
				date = new Date(date)
				const hour = date.getHours()
				const minute = date.getMinutes()
				const second = date.getSeconds()
				return this.hideSecond ? `${this.addZero(hour)}:${this.addZero(minute)}` :
					`${this.addZero(hour)}:${this.addZero(minute)}:${this.addZero(second)}`
			},
			
			getDateTime(date) {
				return `${this.getDate(date)} ${this.getTime(date)}`
			},
			
			
			// 2023-10-24添加结束
			// swapTimeFormat(time){
			// 	let dayjs=this.dayjs;
			// 	newTime = dayjs(time).format("YYYY-MM-DD HH:mm:ss");
			// 	     console.log(newTime); 
			// 		 return newTime;
			// },
			// 2023-7-30添加
			compareTimes(time1, time2) {
			    const date1 = new Date(time1);
			    const date2 = new Date(time2);
			
			    return date1.getTime() < date2.getTime();
			},
			SubmitEvent() {
				var that = this;
				// if(that.datetimeRange.length === 0)
				if(that.startTime.length === 0){
					console.log('未选择开始时间')
					uni.showModal({
						// title:'注意',
						content:'未选择开始时间'
					});
				}else if(that.endTime.length === 0){
					console.log('未选择结束时间')
					uni.showModal({
						// title:'注意',
						content:'未选择结束时间'
					});
					
				}else if(!that.compareTimes(that.startTime, that.endTime)){
					console.log('开始时间大于结束时间')
					uni.showModal({
						// title:'注意',
						content:'开始时间大于结束时间'
					});
					
				}else if(that.compareTimes(that.startTime, that.endTime)){
				uni.showModal({
					title: '提示',
					content: `您确认要提交吗？`,
					success: function(res) {
						if (res.confirm) {
							console.log('用户点击确定')

							const eventChannel = that.getOpenerEventChannel();
							eventChannel.on('GridIndexEmit', data => {
								that.PlayPageIndex.ListID = data.data.ListID;
								that.PlayPageIndex.ListIndex = data.data.ListIndex;
								that.PlayPageIndex.ListImage = data.data.ListImage;
								console.log('play界面成功发射数据给EventFormRecord', data)
							});
							eventChannel.emit('aditorEvent', that.item);
							console.log('EventFormRecord界面成功返回数据给play!', that.item);

							console.log(that.PlayPageIndex.ListID)
							console.log(that.PlayPageIndex.ListIndex)

							// startTime=swapTimeFormat(that.datetimeRange[0]);
							// endTime=swapTimeFormat(that.datetimeRange[1]);

							let EventObj={
								ListID:that.PlayPageIndex.ListID,
								ListIndex:that.PlayPageIndex.ListIndex,
								ListImage:that.PlayPageIndex.ListImage,
								title: that.item.title,
								iconUrl:that.item.iconUrl,
								Today: that.item.Today,
								// TodaystartTime: that.datetimeRange[0],
								TodaystartTime: that.startTime,
								// TodayendTime: that.datetimeRange[1],
								TodayendTime: that.endTime,
								event_description: that.item.event_description,
								rank: that.item.rank,


							}
							that.EventList.push(EventObj)
							console.log(that.EventList)


							uni.setStorage({ //存入Storage
								key: 'playEventDATA', //自己取个名字
								data: { //存的数据可以是很多条

									PlayEventList: that.EventList


								},

								success() {
									console.log('playEventData储存成功');
								}
							});

							// 重新初始化
							that.item = {
								title: '',
								Today: that.getDate(new Date()),
								TodaystartTime: '',
								TodayendTime: '',
								event_description: '',
								rank: Number

							};

							uni.navigateBack();
							// 参数发射一定要写在跳转后面
							// uni.$emit('update',{title:res.item.title})
						} else if (res.cancel) {
							console.log('用户点击取消')
						}
					}
				})
				}
			},
			iconselect() {
				this.showicons = true;
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
			}

		}
	}
</script>

<style>
	page {
		background-color: rgb(245, 245, 245);
	}

	.box {
		width: 100%;
		background-color: rgb(245, 245, 245);
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	/* .uni-form-item .checkbox-item {
		padding: 5% 20%;
	} */
	.decoration {
		width: 4px;
		height: 20px;
		margin-right: 8px;
		border-radius: 30%;
		background-color: #009688;
	}

	.uni-form-item-input {
		padding: 2% 2%;
		text-align: left;
		background-color: white;
		box-shadow: -1px 1px 5px 1px rgba(0, 0, 0, 0.1), -1px 2px 1px 0 rgba(255, 255, 255) inset;
		border-radius: 10px;
		width: 80%;
		margin: 20px 0 10px;
	}

	.FormPage {
		/* 表单页面颜色:浅灰*/
		width: 88%;
		background-color: rgb(245, 245, 245);
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.form-item_outside {
		padding: 2% 2%;
		text-align: left;
		background-color: white;
		box-shadow: -1px 1px 5px 1px rgba(0, 0, 0, 0.1), -1px 2px 1px 0 rgba(255, 255, 255) inset;
		border-radius: 10px;
		width: 113%;
		margin: 10px 0 20px -20px;
	}
	
	.time-picker{
		margin: 12px 0 15px 20px;
	}
	
	.form-item_content {
		margin: 12px 20px 15px;
	}

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

	.form-bottom {
		width: 100%;
		margin-left: -20px;
		margin-top: 40px;
		padding: 1% 5%;
		/* text-align: left; */
		/* text-size-adjust: auto; */
		display: flex;
		justify-content: space-evenly;
	}

	.button {

		color: white;
		background-color: #009688;
		border-radius: 180px;
		border-color: white;
		border-width: 1px;
		width: 100px;
		height: 45px;
		text-align: center;
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

	.grid-item-box {

		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 15px 0;
	}

	.EventTitlebox {
		margin: 10px 15px 5px;
		/* border: 10rpx solid antiquewhite; */
		/* border-radius: 10px; */
		/* height: 90rpx; */
	}

	.EventTitle {
		/* 跟外边的间距上、左右、下 */
		margin: 12px 20px 15px;
		/* text-align: center; */
	}

	.br {
		/*留空*/
		height: 80px;
	}
</style>