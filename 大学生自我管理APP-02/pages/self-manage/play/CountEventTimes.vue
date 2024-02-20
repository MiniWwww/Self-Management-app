<template>
	<view class="">
		<view class="header">
			<text class="header-text">这里是你的娱乐轨迹\n看看过去娱乐瞬间吧~</text>
		</view>
		<view class="EventBox">
			<uni-collapse v-for="(item, index) in EventList" :index="item.Today" :key="index" class="itemBox">
				<uni-collapse-item :show-animation="true" :border="false" titleBorder="none">
					<template v-slot:title>
						<uni-list :border="false">
							<!-- <uni-list-item :title="item.title" :note="item.Today" :thumb="item.ListImage"> -->
							<uni-list-item :title="item.title" :note="item.Today" :thumb="item.iconUrl">
							</uni-list-item>
						</uni-list>
					</template>
					<view style="margin-bottom: 20px; margin-top: -10px">
						<view class="TodayTextBox">
							<text class="TodayText"></text>
						</view>
						<view class="EventItem">
							<uni-section style="height: 50px;" title="我的心情" padding>
								<template v-slot:decoration>
									<view class="decoration"></view>
								</template>
							</uni-section>
							<view class="EventItem_content">
								<uni-rate :readonly="true" :value="item.rank"  :max="10"/>
							</view>
						</view>
						<view class="EventItem">
							<uni-section style="height: 50px;" title="发生时间" padding>
								<template v-slot:decoration>
									<view class="decoration"></view>
								</template>
							</uni-section>
							<view class="EventItem_content">
								<text class="EventTime">开始：{{item.TodaystartTime}}</text>
								<text class="EventTime">结束：{{item.TodayendTime}}</text>
							</view>
						</view>
						<view class="EventItem" style="position: relative;">
							<uni-section style="height: 50px;" title="记录" padding>
								<template v-slot:decoration>
									<view class="decoration"></view>
								</template>
							</uni-section>
							<view class="EventItem_content">
								<text class="EventDescription">{{item.event_description}}</text>
							</view>
							<view class="editor-click" @click="changeEventDescription(index)">
								<image :src="'/static/编辑事件内容.png'" class="Event-eidtor-image" mode="aspectFill" />
							</view>
						</view>
					</view>
					
				</uni-collapse-item>
			</uni-collapse>
		</view>
		
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
	.header{
		display: flex;
		text-align: left;
		font-size: 23px;
		font-weight: 800;
		margin: 25px 0 0 30px;
	}
	.header-text{
		background:-webkit-linear-gradient(top, #000000, #aeaeae);/*设置线性渐变*/
		/*为了支持更多的浏览器*/
		-webkit-background-clip: text;/*背景被裁剪到文字*/
		-webkit-text-fill-color: transparent;/*设置文字的填充颜色*/
	}
	.EventBox{
		width: 88%;
		margin: 15px;
	}
	.itemBox{
		background: white;
		box-shadow: -1px 1px 5px 1px rgba(0, 0, 0, 0.1), -1px 2px 1px 0 rgba(255, 255, 255) inset;
		margin: 8px; 
		text-align: left;
		/* padding-bottom: 10px; */
		/* border-radius: 10px; */
	}
	.TodayTextBox{
		border-radius: 20px;
		margin: 10px;
		
	}
	.TodayText{
		font-size: 13px;
		
	}
	.EventItem{
		/* padding: 2% 2%; */
		font-size: 17px;
		text-align: left;
		margin: 10px 15px;
	}
	.decoration{
		width: 4px;
		height: 15px;
		margin-right: 8px;
		border-radius: 30%;
		background-color: #009688;
	}
	.EventItem_content{
		margin: -8px 20px 0;
		display: flex;
		flex-direction: column;
	}
	.EventTime{
		font-size: 15px;
		margin: 3px;
		/* text-align: center; */
	}
	.EventDescription{
		font-size: 15px;
	}
	.editor-click{
		height: 20px;
		width: 20px;
		
	}
	.Event-eidtor-image{
		width: 20px;
		height: 20px;
		border-radius: 10px;
		position: absolute;
		right: 10px;
		top: 10px;
	}
</style>