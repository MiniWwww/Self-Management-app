<template>
	<view>
		<view class="navbar_box">
			<view class="back" @click="goback">&lt;</view>
			<view class="navbar_item_box">
				<view  @click="gotoWeek" class="box_item" :style="[{background:((this.week)?'#f5f5f5':'white')},{fontSize:((this.week)?'20px':'')}]">周</view>
				<view  @click="gotoMonth" class="box_item" :style="[{background:((this.month)?'#f5f5f5':'white')},{fontSize:((this.month)?'20px':'')}]">月</view>
			</view>
		</view>
		<view style="height: 80px;"></view>
		<view class="baogao_box">		<!--周、月一样但获取的数据不一样-->
			<view class="total_box">	<!--睡眠记录-->
				<view >	<!--时间-->
					<view style="margin-left: 10px;padding-top:10px;fontSize:25px">{{year}}年</view>
					<view style="display: flex; justify-content: center; fontSize:30px;">{{time}}</view>
				</view>
				<view class="picture_box">
					<view class="picture">睡眠时长（柱形图）</view>
				</view>
			</view>
			<view class="average_box">	<!--平均值（圆形进度条）-->
				<view class="average_item">平均起床时间</view>
				<view class="average_item">平均睡觉时间</view>
				<view class="average_item">平均睡眠时长</view>
			</view>
			<view class="outside_box" style="background-color: #ffd0b5;">	<!--起床-->
				<view class="inside_box">
					<view class="day_number_box">
						起床目标达成天数：
						<view class="data">{{getup_early_number}}d</view>
					</view>
					<view class="most_box">
						<view class="most_day">
							最早的一天：
							<view class="data">{{getup_most_ed}}</view>
						</view>
						<view class="most_time">
							这天你
							<view class="data">{{getup_most_ed_time}}</view>
							就起床了！
						</view>
					</view>
					<view class="day_number_box">
						未达成起床目标天数：
						<view class="data">{{getup_late_number}}d</view>
					</view>
					<view class="most_box">
						<view class="most_day">
							最晚的一天：
							<view class="data">{{getup_most_ld}}</view>
						</view>
						<view class="most_time">
							这天你
							<view class="data">{{getup_most_ld_time}}</view>
							才起床
						</view>
					</view>
				</view>
			</view>
			<view class="outside_box" style="background-color: #6cbbfc;">	<!--睡觉-->
				<view class="inside_box">
					<view class="day_number_box">
						就寝目标达成天数（23：00前）：
						<view class="data">{{sleep_early_number}}d</view>
					</view>
					<view class="most_box">
						<view class="most_day">
							最早的一天：
							<view class="data">{{sleep_most_ed}}</view>
						</view>
						<view class="most_time">
							这天你
							<view class="data">{{sleep_most_ed_time}}</view>
							就睡觉了！
						</view>
					</view>
					<view class="day_number_box">
						未达成就寝目标天数：
						<view class="data">{{sleep_late_number}}d</view>
					</view>
					<view class="most_box">
						<view class="most_day">
							最晚的一天：
							<view class="data">{{sleep_most_ld}}</view>
						</view>
						<view class="most_time">
							这天你
							<view class="data">{{sleep_most_ld_time}}</view>
							才睡觉
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				week:true,
				month:false,
				year:'2023',
				time:'2月5日-2月11日',	
				//睡觉
				sleep_early_number:'3',		//早睡天数
				sleep_late_number:'4',		//晚睡天数
				sleep_most_ed:'2月7日周二',		//最早睡觉那天
				sleep_most_ed_time:'22:00',		//最早睡觉时间
				sleep_most_ld:'2月6日周三',		//最晚睡觉那天
				sleep_most_ld_time:'00:00',		//最晚睡觉时间
				//起床
				getup_early_number:'4',		//早起天数
				getup_late_number:'3',		//晚起天数
				getup_most_ed:'2月10日周五',		//最早起床那天
				getup_most_ed_time:'6:00',		//最早起床时间
				getup_most_ld:'2月11日周六',		//最晚起床那天
				getup_most_ld_time:'9:00',		//最晚起床时间
				//总
				total_average_h:'7',
				total_average_m:'30',
			}
		},
		methods: {
			goback(){
				uni.navigateBack();
			},
			gotoWeek(){
				this.week=true;
				this.month=false;
			},
			gotoMonth(){
				this.week=false;
				this.month=true;
			},
		}
	}
</script>

<style>
	.navbar_box{
		display: flex;
		align-items: center;
		height: 50px;
		padding-top: 30px;
		box-shadow: -2px 3px 5px 0 rgba(0, 0, 0, 0.1);
		position: fixed;
		z-index: 1;
		width: 100%;
		background-color: #ffffff;
	}
	.back{
		font-size: 50px;
		font-weight: 10;
		padding-left: 10px;
		z-index: 2;
	}
	.navbar_item_box{
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		position: fixed;
	}
	.box_item{
		width:20%;
		display: flex;
		align-items: center;
		justify-content: center;
		height: 40px;
		font-size: 15px;
		border-radius: 10px;
	}
	.baogao_box{
		margin: 10px;
	}
	.total_box{
		box-shadow: -1px 1px 5px 1px rgba(0, 0, 0, 0.1), -1px 2px 1px 0 rgba(255, 255, 255) inset;
		border-radius: 10px;
		margin-bottom: 8px;
	}
	.picture_box{
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		
	}
	.picture{
		height: 300px;
		width: 90%;
		background-color: #f4f4f4;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		margin: 10px;
	}
	.average_box{
		display: flex;
		justify-content: center;
		box-shadow: -1px 1px 5px 1px rgba(0, 0, 0, 0.1), -1px 2px 1px 0 rgba(255, 255, 255) inset;
		border-radius: 10px;
		margin-bottom: 10px;
	}
	.average_item{
		padding: 10px;
		font-size: 13px;
		width: 30%;
	}
	.outside_box{
		justify-content: center;
		box-shadow: -1px 1px 5px 1px rgba(0, 0, 0, 0.1), -1px 2px 1px 0 rgba(255, 255, 255) inset;
		border-radius: 10px;
		margin-bottom: 10px;
	}
	.inside_box{
		justify-content: center;
		padding: 6px;
	}
	.day_number_box{
		font-size: 18px;
		display: flex;
		margin: 8px;
		align-items: center;
		background-color: #f4f4f4;
		border-radius: 10px;
		padding-left: 2px;
	}
	.most_box{
		margin: 8px;
		font-size: 18px;
		background-color: #f4f4f4;
		border-radius: 10px;
	}
	.most_day{
		display: flex;
		align-items: center;
		padding-left: 2px;
	}
	.most_time{
		padding-left: 30px;
		display: flex;
		align-items: center;
	}
	.data{
		font-size: 25px;
		font-weight: bold;
	}
</style>
