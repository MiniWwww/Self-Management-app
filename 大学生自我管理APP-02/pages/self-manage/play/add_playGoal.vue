<template>
	<view class="addGoalForm">
		<form class="FormPage" @reset="formReset">
			<view class="form-item_outside">
				<uni-section style="height: 50px;" title="目标名称" subTitle="有什么想去做的事情呢~" padding>
					<template v-slot:decoration>
						<view class="decoration"></view>
					</template>
				</uni-section>
				<view class="form-item_content">
					<textarea v-model="item.title" auto-height placeholder="请输入" style="width: 260px;"></textarea>
				</view>
			</view>
			<view class="form-item_outside">
				<uni-section style="height: 50px;" title="目标描述" subTitle="畅想一下想如何做这件快乐的事情吧~" padding>
					<template v-slot:decoration>
						<view class="decoration"></view>
					</template>
				</uni-section>
				<view class="form-item_content">
					<textarea v-model="item.content" auto-height placeholder="请输入" style="width: 260px;"></textarea>
				</view>
			</view>
			<view class="form-item_outside">
				<uni-section style="height: 50px;" title="时间" subTitle="想什么时候做这件事呢？" padding>
					<template v-slot:decoration>
						<view class="decoration"></view>
					</template>
				</uni-section>
				<view class="form-item_content">
					<uni-data-checkbox v-model="baseFormData.time" :localdata="time_type" @change="choosetimetype" selectedColor="#009688" />
					<view v-if="item.timetype0" class="time-picker">
						<uni-datetime-picker v-model="datetimeRange" type="datetimerange" start-placeholder="开始时间" rangeSeparator="至" end-placeholder="结束时间" hide-second="true" style="width: 240px;" />
					</view>
					<!-- 2023-10-24添加结束 -->
					<!-- 周期时间选择器 -->				
					<!-- 多选，循环遍历填充数据 -->
					<view class="list-box" v-if="item.timetype1">
						<view v-for="(item,index) in weeks" :key="index" @click="choice(index)"
							:class="[item.selected?'selde':'noselde']">
							{{item.selected?item.text:item.text}}
						</view>
					</view>
				</view>
			</view>
			
			<!-- <uni-section :title="'日期时间范围用法：' + '[' + datetimeRange + ']' " type="line"></uni-section> -->
			
			<view class="form-bottom">
				<button class="button" form-type="submit" @click="SubmitEvent">提交</button>
				<button class="button" style="background-color: #797979; " form-type="reset">重设</button>
			</view>
		</form>
		<view class="br"></view>
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
						selected: false,
						text: '一',
						value: '每周一'
					}, {
						selected: false,
						text: '二',
						value: '每周二'
					}, {
						selected: false,
						text: '三',
						value: '每周三'
					}, {
						selected: false,
						text: '四',
						value: '每周四'
					}, {
						selected: false,
						text: '五',
						value: '每周五'
					}, {
						selected: false,
						text: '六',
						value: '每周六'
					}, {
						selected: false,
						text: '日',
						value: '每周日'
					}
				],
				selectIndex:[],
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
					checkbox2: [],
					content: '',
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
				console.log('选择的开始时间',that.datetimeRange[0]);
				console.log('选择的结束时间',that.datetimeRange[1]);
				if(that.datetimeRange[0]===that.datetimeRange[1]){
					console.log("时间相等")
					// 分离日期和时间
					var datePart = that.datetimeRange[0].split(' ')[0]; // 2024-02-26
					var timePart = that.datetimeRange[0].split(' ')[1]; // 23:09
					
					// 修改时间部分
					timePart = '00:00'; // 将时间修改为00:00
					
					// 更新datetimeRange[0]
					that.datetimeRange[0] = datePart + ' ' + timePart;
					
					// 同样的操作修改结束时间的时间部分
					var endDatePart = that.datetimeRange[1].split(' ')[0];
					var endTimePart = that.datetimeRange[1].split(' ')[1];
					endTimePart = '23:59';
					that.datetimeRange[1] = endDatePart + ' ' + endTimePart;
					console.log('修改后的开始时间',that.datetimeRange[0]);
					console.log('修改后的结束时间',that.datetimeRange[1]);
				}
				uni.showModal({
					title: '提示',
					content: `您确认要提交吗？`,
					success: function(res) {
						if (res.confirm) {
							console.log('用户点击确定')
							// if(that.selectIndex.length==7){
							// 	that.item.checkbox2.push('每天');
							// }
							// else{
							// 	that.selectIndex.forEach(v=>{
							// 		that.item.checkbox2.push(that.weeks[v].value)
							// 	})
							// }
						
							that.selectIndex.forEach(v=>{
								that.item.checkbox2.push(that.weeks[v].value)
							})
							
							
							const eventChannel = that.getOpenerEventChannel();
							
							let EventObj={
								timetype0: that.item.timetype0,
								timetype1: that.item.timetype1,
								title: that.item.title,
								startDate: that.datetimeRange[0],
								endDate: that.datetimeRange[1],
								daterange:that.item.daterange,
								checkbox2: that.item.checkbox2,
								content: that.item.content,
								
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
									checkbox2: [],
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
			choice(index) {
				//当再次被选中时，取消当前选中项
				var that=this;
				if (this.weeks[index].selected == true) {
					this.weeks[index].selected = false;
					//取消选中时删除数组中的值
					for (var i = 0; i < this.selectIndex.length; i++) {
						if (this.selectIndex[i] === index) {
							this.selectIndex.splice(i, 1);
						}
					}
					console.log("选中的值", this.selectIndex)
				} else {
					this.weeks[index].selected = true;
					this.selectIndex.push(index)
					console.log("选中的值", this.selectIndex)
				}
				this.selectIndex.sort((a,b)=>{
					return a-b
				})
				console.log("排序后", this.selectIndex)
			},
		}
	}
</script>

<style>
	page {
		background-color: rgb(245, 245, 245);
	}
	.addGoalForm{
		display: flex;
		flex-direction: column;
		background-color: rgb(245, 245, 245);
		/* justify-content: center; */
		align-items: center;
	}
	.FormPage {
		/* 表单页面颜色:浅灰*/
		width: 100%;
		padding: 20px 10px;
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
		width: 95%;
		margin: 10px 0 20px;
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
	.time-picker{
		margin: 10px 0px 10px 10px;
		width: 90%;
	}
	.list-box {
		display: flex;
		justify-content: space-between;
		margin: 10px 0;
	}
	
	.list-box>view {
		width: 18px;
		margin: 2px;
		padding: 5px;
		border-radius: 50px;
		/* box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.1); */
		text-align: center;
		font-size: 12px;
	}
	
	.list-box>view.selde {
		background-color: #009688;
		color: #fff;
	}
	
	.list-box>view.noselde {
		background-color: rgba(0, 0, 0, 0.1);
		color: #3f3f3f;
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

	.uni-form-item-content {}

	/* .form-bottom {
		padding: 1% 5%;
		text-align: left;
		text-size-adjust: auto;
	} */
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