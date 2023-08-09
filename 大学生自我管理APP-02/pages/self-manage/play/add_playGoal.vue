<template>


	<view class="addGoalForm">
		<form class="FormPage"  @reset="formReset">
		<uni-card title="目标名称">
			<textarea :maxlength="20" v-model="item.title" auto-height placeholder="请输入娱乐目标"></textarea>
		</uni-card>
		
		<uni-card title="目标描述">
			<textarea :maxlength="20" v-model="item.content" auto-height placeholder="请输入内容"></textarea>
		</uni-card>
		
		
		<view class="uni-form-item-date">
			<button class="calendar-button" type="button" @click="opencalendar">时间段选择</button>
			<uni-calendar ref="calendar" class="uni-calendar-hook" :clear-date="true" :date="info.date"
				:insert="info.insert" :lunar="info.lunar" :startDate="item.startDate" :endDate="item.endDate"
				:range="info.range" @confirm="confirm" @close="close" />
		</view>
		
		<view class="form-bottom">
			<button form-type="submit" @click="SubmitEvent" >提交</button>
			<button type="default" form-type="reset">重设</button>
		</view>
		</form>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				item: {title:'',startDate:'',endDate:''},
				info: {
					lunar: true,
					range: true,
					insert: false,
					selected: []
				}
			}
		},
		methods:{
			opencalendar() {
				this.$refs.calendar.open();
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
						},
			SubmitEvent(){
				var that=this
				uni.showModal({
					title: '提示',
					content: `您确认要提交吗？`,
					success: function(res) {
						if (res.confirm) {
							console.log('用户点击确定')
							const eventChannel = that.getOpenerEventChannel();
							eventChannel.emit('addplayGoal',that.item);
							console.log('add_playGoal界面成功返回数据给play!',that.item);
							that.item={title:'',startDate:'',endDate:''};
							
							uni.navigateBack();
							that.item={title:'',startDate:'',endDate:''};
						} else if (res.cancel) {
							console.log('用户点击取消')
						}
					}
				})
			},
			formReset: function(e) {
				console.log('清空数据')
			},
			
		}
	}
</script>

<style>
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
	.uni-form-item-content{

	}
	.form-bottom{
		padding: 1% 5%;
		text-align: left;
		text-size-adjust: auto;
	}
</style>