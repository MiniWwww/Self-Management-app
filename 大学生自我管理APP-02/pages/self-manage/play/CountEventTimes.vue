<template>
  
  <view class="">
	  <view class="informBox">
		  
	  	<textarea name="" id="" cols="120" rows="1" style="
               text-align: center;
               font: 15px 宋体;
			   width: 100%;
               border: 0" >这里是你的娱乐轨迹，看看过去娱乐瞬间吧~</textarea>
	  </view>
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
			  <view class="editor-box">
			  	
				  <view class="editor-empty">
				  </view>
				  <view class="editor-click" @click="changeEventDescription(index)">
				  <image :src="'/static/编辑事件内容.png'" class="Event-eidtor-image" mode="aspectFill" />
				  </view>
			  </view>
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
			
			
			changeEventDescription(index) {
				var that = this;
				uni.setStorage({ //存入Storage
					key: 'currentEventDescription', //自己取个名字
					data: { //存的数据可以是很多条
						currentIndex:index,
						currentDescription:that.EventList[index].event_description,
					},
									
					success() {
						
					}
				});
				
				uni.navigateTo({
					url: '/pages/self-manage/play/editEventDescription',
					events: {
						newEvendescription(data) {
			that.EventList[index].event_description=data
					uni.setStorage({ //存入Storage
						key: 'playEventDATA', //自己取个名字
						data: { //存的数据可以是很多条
							
							PlayEventList:that.EventList
							
					
						},
					
						success() {
							console.log('playEventData储存成功');
						}
					});
			
						},
			
					}
				});
			},
			
		}
	}
</script>

<style>
	.informBox{
		border:4px dotted skyblue;
		border-radius: 5px;
		display: flex;
		height: 30px;
		text-align: center;
		margin-top: 20px;
		margin-left: 10px;
		margin-right: 10px;
	}
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
	.editor-box{
		display: flex;
		flex-direction: row;
	}
	.editor-empty{
		width: 100%;
		
	}
	.editor-click{
		height: 30px;
		width: 30px;
		
	}
	.Event-eidtor-image{
		width: 30px;
		height: 30px;
		border-radius: 10px;
		
		
		
	}
</style>