<template>
	<view class="box">
		<view class="manage_box">	<!--睡眠目标&打卡-->
			<view class="goalTime_box" >	<!--目标设置-->
				<view class="goalTime_item">
					<picker mode="time" :value="getup_goal" start="00:00" end="23:59" @change="bindTimeChange_g">
						<view >{{getup_goal}}</view>
					</picker>
					<view>起床目标</view>
				</view>
				<view class="goalTime_item">
					<picker mode="time" :value="sleep_goal" start="00:00" end="23:59" @change="bindTimeChange_s">
						<view >{{sleep_goal}}</view>
					</picker>
					<view>就寝目标</view>
				</view>
			</view>
			<view class="clock_box">	<!--打卡-->
				<view >
					<image v-if="DayTimeJudge" class="img" src="../../static/sun.png" mode="heightFix"></image>
					<image v-if="!DayTimeJudge" class="img" src="../../static/moon.png" mode="heightFix"></image>
				</view>
				<view class="clockTime_box">
					<view class="clock_today">{{today}}</view>
					<view class="clockTime">
						<view class="clockTime_item">
							<view @click="getup_clock">起床打卡</view>
							<view v-if="getup">
								<image v-if="getup_success&&!getup_like" class="like_img" src="../../../../static/点赞.png" @click="like_getup"></image>
								<image v-if="getup_like" class="like_img" src="../../../../static/点赞2.jpg"></image>
								{{getup_time}}
							</view>
						</view>
						<view class="clockTime_item" >
							<view @click="sleep_clock">就寝打卡</view>
							<view v-if="sleep">
								<image v-if="sleep_success&&!sleep_like" class="like_img" src="../../../../static/点赞.png" @click="like_sleep"></image>
								<image v-if="sleep_like" class="like_img" src="../../../../static/点赞2.jpg"></image>
								{{sleep_time}}
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<uni-list class="assistant_box" :border="false">	<!--睡眠助手-->
			<uni-collapse class="assistant_item" style="width: 95%;">
				<uni-collapse-item  title="助眠音乐">
					<uni-list style="margin-left: 20px;">
						<uni-list-item class="list_item" title="白噪音" showArrow clickable @click="goto_baizaoyin"></uni-list-item>
						<uni-list-item class="list_item" title="钢琴曲" showArrow clickable @click="goto_piano"></uni-list-item>
						<uni-list-item class="list_item" title="睡前故事" showArrow clickable @click="goto_shuiqianstory"></uni-list-item>
						<uni-list-item class="list_item" title="其他" showArrow clickable @click="goto_other_music"></uni-list-item>
					</uni-list>
				</uni-collapse-item>
			</uni-collapse>
			<uni-list-item class="list_item" title="睡眠小tips" showArrow clickable @click="goto_tips"></uni-list-item>
			<uni-list-item class="list_item" title="睡眠报告" showArrow clickable @click="goto_analyse"></uni-list-item>
		</uni-list>
	</view>
</template>

<script>
	export default {
		name:"sleep",
		data() {
			return {
				week:["星期日","星期一","星期二","星期三","星期四","星期五","星期六"],
				getup_goal:'07:00',
				sleep_goal:'23:00',
				today: '',
				nowtime: [{hour:''},{minute:''}],
				getup_time:'9:00',
				sleep_time:'11:00',
				sleep: false,
				getup: false,
				getup_success: false,
				sleep_success: false,
				getup_like: false,
				sleep_like:false,
			};
		},
		computed:{
			DayTimeJudge(){//判断白天晚上
				this.getNowTime();
				if(this.nowtime.hour<18 && this.nowtime.hour>=6){
					return true;
				};
				return false;
			}
		},
		methods:{
			addTimes(m){return m<10?'0'+m:m },
			getNowTime(){ //获取当前时间
				var time=new Date(new Date().getTime());
				let y=time.getFullYear();
				let m=time.getMonth()+1;
				let d=time.getDate();
				let h=time.getHours();
				let mi=time.getMinutes();
				let day=time.getDay();
				
				this.today=y+'年'+this.addTimes(m)+'月'+this.addTimes(d)+'日'+' '+this.week[day];
				this.nowtime.hour = this.addTimes(h);
				this.nowtime.minute = this.addTimes(mi);
				
				console.log(this.today);
			},
			bindTimeChange_g: function(e) {
				this.getup_goal = e.detail.value
			},
			bindTimeChange_s: function(e) {
				this.sleep_goal = e.detail.value
			},
			getup_clock(){
				var that=this;
				uni.showModal({
					title:'提示',
					content:'进行起床打卡？',
					success:function(res){
						if(res.confirm){
							that.getNowTime();
							that.getup_time=that.nowtime.hour+':'+that.nowtime.minute;
							that.getup=true;
							var time_goal=Date.parse('2023/01/01 '+that.getup_goal+':59');
							var time_now=Date.parse('2023/01/01 '+that.getup_time+':00');
							if(time_now<=time_goal){
								that.getup_success=true;
								uni.showToast({
									title:'起床时间：'+that.getup_time+'\n起床目标达成，给自己点个赞吧！',
									icon:'none',
								})
							}
							else{
								uni.showToast({
									title:'起床时间：'+that.getup_time,
									icon:'none',
								})
							}
						}
					}
				})
			},
			sleep_clock(){
				var that=this;
				uni.showModal({
					title:'提示',
					content:'进行就寝打卡？',
					success:function(res){
						if(res.confirm){
							that.getNowTime();
							that.sleep_time=that.nowtime.hour+':'+that.nowtime.minute;
							that.sleep=true;
							var time_goal=Date.parse('2023/01/01 '+that.sleep_goal+':59');
							var time_now=Date.parse('2023/01/01 '+that.sleep_time+':00');
							if(time_now<=time_goal){
								that.sleep_success=true;
								uni.showToast({
									title:'就寝时间：'+that.sleep_time+'\n就寝目标达成，给自己点个赞吧！',
									icon:'none',
									duration:2500,
								})
							}
							else{
								uni.showToast({
									title:'就寝时间：'+that.sleep_time,
									icon:'none',
									duration:2500,
								})
							}
						}
					}
				})
			},
			like_getup(){
				this.getup_like=true;
			},
			like_sleep(){
				this.sleep_like=true;
			},
			goto_baizaoyin(){
				uni.navigateTo({
					url:'/pages/self-manage/sleep/baizaoyin/baizaoyin'
				})
			},
			goto_piano(){
				uni.navigateTo({
					url:'/pages/self-manage/sleep/piano/piano'
				})
			},
			goto_shuiqianstory(){
				uni.navigateTo({
					url:'/pages/self-manage/sleep/shuiqianstory/shuiqianstory'
				})
			},
			goto_other_music(){
				uni.navigateTo({
					url:'/pages/self-manage/sleep/other_music/other_music'
				})
			},
			goto_tips(){
				uni.navigateTo({
					url:'/pages/self-manage/sleep/sleep_tips/sleep_tips'
				})
			},
			goto_analyse(){
				uni.navigateTo({
					url:'/pages/self-manage/sleep/sleep_analyse/sleep_analyse'
				})
			}
		}
	}
</script>

<style>
	.box{
		justify-content: center;
	}
	.manage_box{
		width: 90%;
		margin: 15px;
		border-radius: 10px;
		background: white;
		box-shadow: -1px 1px 5px 1px rgba(0, 0, 0, 0.1), -1px 2px 1px 0 rgba(255, 255, 255) inset;
		
	}
	.goalTime_box{
		box-shadow: -1px 1px 5px 1px rgba(0, 0, 0, 0.1), -1px 2px 1px 0 rgba(255, 255, 255) inset;
		border-radius: 10px;
		height: 100px;
		display: flex;
		justify-content: space-evenly;
		align-items: center;
		background: #f1fdf2;
	}
	.goalTime_item{
		font-size: 25px;
		text-align: center;
	}
	.picker-view {
		width: 750rpx;
		height: 600rpx;
		margin-top: 20rpx;
		z-index: 99;
		position: relative;
	}
	.item {
		line-height: 100rpx;
		text-align: center;
	}
	.picker-box {
		height: 30rpx;
	}
	.clock_box{
		/* height: 280px; */
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		margin-bottom: 5px;
		margin-top: 10px;
		width: 100%;
	}
	.img{
		height:200px;
		align-items: center;
		justify-content: center;
	}
	.clockTime_box{
		width: 100%;
		box-shadow: -1px 1px 5px 1px rgba(0, 0, 0, 0.1), -1px 2px 1px 0 rgba(255, 255, 255) inset;
		border-radius: 10px;
		background: #f1fdf2;
	}
	.clock_today{
		font-size: 20px;
		width: 100%;
		box-shadow: -1px 1px 5px 1px rgba(0, 0, 0, 0.1), -1px 2px 1px 0 rgba(255, 255, 255) inset;
		border-radius: 10px;
	}
	.clockTime{
		height: 100px;
		display: flex;
		justify-content: space-evenly;
		align-items: center;
		width: 100%;
	}
	.clockTime_item{
		font-size: 25px;
		text-align: center;
	}
	.like_img{
		height: 20px;
		width: 20px;
	}
	.assistant_box{
		width: 90%;
		margin: 15px;
		border-radius: 10px;
		background:  #f1fdf2;
		box-shadow: -1px 1px 5px 1px rgba(0, 0, 0, 0.1), -1px 2px 1px 0 rgba(255, 255, 255) inset;
		
	}
	.assistant_item{
		background: white;
 		box-shadow: -1px 1px 5px 1px rgba(0, 0, 0, 0.1), -1px 2px 1px 0 rgba(255, 255, 255) inset;
		margin: 8px; 
		text-align: left;
		
	} 
	.list_item{
		background: white;
		box-shadow: -1px 1px 5px 1px rgba(0, 0, 0, 0.1), -1px 2px 1px 0 rgba(255, 255, 255) inset;
		margin: 8px; 
		text-align: left;
		height: 50px;
	}
</style>