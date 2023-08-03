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
			<view class="total_box">	<!--运动记录-->
				<view >	<!--时间-->
					<view style="margin-left: 10px;padding-top:10px;fontSize:25px">{{year}}年</view>
					<view style="display: flex; justify-content: center; fontSize:30px;">{{time}}</view>
				</view>
				<view class="picture_box">
					<view class="picture">运动时长&次数柱形&折线图</view>
				</view>
			</view>
			<view class="average_box">	<!--平均值（圆形进度条）-->
				<view class="average_item">平均运动时长</view>
				<view class="average_item">平均运动次数</view>
				<view class="average_item">平均运动强度</view>
			</view>
			<view class="outside_box">
				<view class="inside_box">
					<view class="item_box" style="background-color: #e3fde4;">
						<view class="item_inside">
							<view class="count_box">
								总时长
								<view class="data_box">
									<view class="data">{{total_duration_h}}</view>
									h
									<view class="data">{{total_duration_m}}</view>
									min
								</view>
							</view>
							<view class="count_box">
								总次数
								<view class="data_box">
									<view class="data">{{total_times}}</view>
									次
								</view>
							</view>
						</view>
					</view>
					<view class="item_box" style="background-color: #ffa5ab;">
						<view class="strength">高强度</view>
						<view class="item_inside">
							<view class="count_box">
								时长
								<view class="data_box">
									<view class="data">{{high_duration_h}}</view>
									h
									<view class="data">{{high_duration_m}}</view>
									min
								</view>
							</view>
							<view class="count_box">
								次数
								<view class="data_box">
									<view class="data">{{high_times}}</view>
									次
								</view>
							</view>
						</view>
					</view>
					<view class="item_box" style="background-color: #ffd0b5;">
						<view class="strength">中强度</view>
						<view class="item_inside">
							<view class="count_box">
								时长
								<view class="data_box">
									<view class="data">{{medium_duration_h}}</view>
									h
									<view class="data">{{medium_duration_m}}</view>
									min
								</view>
							</view>
							<view class="count_box">
								次数
								<view class="data_box">
									<view class="data">{{medium_times}}</view>
									次
								</view>
							</view>
						</view>
					</view>
					<view class="item_box" style="background-color: #e8fdfd;">
						<view class="strength">低强度</view>
						<view class="item_inside">
							<view class="count_box">
								时长
								<view class="data_box">
									<view class="data">{{low_duration_h}}</view>
									h
									<view class="data">{{low_duration_m}}</view>
									min
								</view>
							</view>
							<view class="count_box">
								次数
								<view class="data_box">
									<view class="data">{{low_times}}</view>
									次
								</view>
							</view>
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
				
				total_duration_h:'8',		//总时长
				total_duration_m:'20',
				total_times:'10',		//总次数
				
				high_duration_h:'3',	//高强度运动时长
				high_duration_m:'30',
				high_times:'3',	//高强度运动次数
				
				medium_duration_h:'3',	//中强度运动时长
				medium_duration_m:'30',
				medium_times:'3',	//中强度运动次数
				
				low_duration_h:'3',	//低强度运动时长
				low_duration_m:'30',
				low_times:'3',	//低强度运动次数
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
	.item_box{
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		align-items: center;
		box-shadow: -1px 1px 5px 1px rgba(0, 0, 0, 0.1), -1px 2px 1px 0 rgba(255, 255, 255) inset;
		border-radius: 10px;
		margin-bottom: 10px;
	}
	.item_inside{
		width: 100%;
		display: flex;
		justify-content: space-around;
	}
	.strength{
		margin: 6px;
		font-size: 18px;
	}
	.count_box{
		margin: 6px;
	}
	.data_box{
		display: flex;
		justify-content: center;
		align-items: flex-end;
	}
	.data{
		font-size: 25px;
		font-weight: bold;
	}
</style>
