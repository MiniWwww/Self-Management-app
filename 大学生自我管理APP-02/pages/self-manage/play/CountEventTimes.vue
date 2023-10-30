<template>
  
  <view class="">
	  <uni-card v-for="(item, index) in EventList" :index="item.Today" :key="index">
		  <view class="TodayTextBox">
		  	 <text class="TodayText">{{item.Today}}</text>
		  </view>
		  <view class="EventNameBox">
		  	<text class="EventName">{{item.title}}</text>
			<uni-rate :readonly="true" :value="item.rank"  :max="10"/>
			</view>
			<view class="EventTimeBox">
			<text class="EventTime">开始：{{item.TodaystartTime}}</text>
			<text class="EventTime">结束：{{item.TodayendTime}}</text>
		  </view>
		  <view class="EventDescriptionBox">
		  	<text class="EventDescription">{{item.event_description}}</text>
		  </view>
		  
	  </uni-card>
  	
	
	
  </view>
	
</template>

<script>
	
	export default {
		data() {
			return {
				
				EventList:[
					
					
				],
				}

		},

//生命周期函数监听页面显示
		onShow() {
		
			var that = this;
			let Data=uni.getStorageSync('playEventDATA');
			that.EventList=Data.PlayEventList;
			console.log(that.EventList)
			
		// 	uni.getStorage({
		// 		key: 'playEventDATA',
		// 		success(res) {
		
		// 			console.log('获取playEventDATA成功', res.data);
		// 			that.EventList=res.data.PlayEventList
		// 			console.log('EventList:',that.EventList);
		// 		}
		// 	});
		
		},

		methods: {
			
			

			
		}
	}
</script>

<style>
	.TodayTextBox{
		/* border: 10px solid salmon; */
		/* background-color: darkseagreen; */
		background-color: lavender;
		border-radius: 20px;
		display: flex;
		flex-direction: row;
		flex-wrap: wrapl;
		text-align: center;
		
	}
	.TodayText{
		
		font-size: 3ch;
		
	}
	.EventNameBox{
		display: flex;
		flex-direction: column;
	}
	.EventTimeBox{
		display: flex;
		flex-direction: column;
	}
	.EventName{
		font-size: 2ch;
		text-align: center;
	}
	.EventTime{
		font-size: 1ch;
		text-align: center;
	}
	.EventDescriptionBox{
		border: 5px solid antiquewhite;
		
		border-radius: 10px;
		display: flex;
		flex-direction: column;
		flex-wrap: wrapl;
		text-align: center;
	}
</style>