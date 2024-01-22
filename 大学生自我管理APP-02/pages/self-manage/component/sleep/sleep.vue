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
				<view>
					<view v-if="getup">
						<image v-if="!DayTimeJudge" class="img" src="../../static/moon.png" mode="heightFix"></image>
						<image v-if="DayTimeJudge" class="img" src="../../static/sun.png" mode="heightFix"></image>
						<button @click="sleep_clock">睡觉</button>
						
					</view>
					<view v-if="sleep">
						<image class="img" src="../../static/sleeping_zzz.jpg" mode="heightFix"></image>
						<button @click="getup_clock">起床</button>
						<view style="font-size: 12px; color: #00a9fd; text-decoration: underline;" @click="cancel_sleep">取消</view>
					</view>
				</view>
				<view class="clockTime_box">
					<view class="clock_today">
						<view class="clock_today_item">{{today_year}}</view>
						<view class="clock_today_item">{{today_date}}</view>
						<view class="clock_today_item">{{today_week}}</view>
					</view>
					<view class="clockTime">
						<view class="clockTime_item">
							<view class="clockTime_item_text">起床时间：{{getup_time}} </view>
							<image v-if="getup_success&&!getup_like" class="like_img" src="../../../../static/点赞.png" @click="like_getup"></image>
							<image v-if="getup_like" class="like_img" src="../../../../static/点赞2.jpg"></image>
						</view>
						<view class="clockTime_item" >
							<view class="clockTime_item_text">就寝时间：{{sleep_time}}</view>
							<image v-if="sleep_success&&!sleep_like" class="like_img" src="../../../../static/点赞.png" @click="like_sleep"></image>
							<image v-if="sleep_like" class="like_img" src="../../../../static/点赞2.jpg"></image>
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
      
			<uni-list-item class="list_item0" title="睡眠小tips" showArrow clickable @click="goto_tips"></uni-list-item>
			<!--<uni-list-item class="list_item0" title="睡眠报告" showArrow clickable @click="goto_analyse"></uni-list-item>-->
			<uni-list-item class="list_item0" title="奖励" showArrow clickable @click="goto_award"></uni-list-item>
			
		</uni-list>
		<view class="br"></view>
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
				today_year:'',
				today_date:'',
				today_week:'',
				nowtime: [{hour:''},{minute:''}],
				sleepGoalTime: [{hour:''},{minute:''}],
				getup_time:'--:--',
				sleep_time:'--:--',
				sleep: false,
				getup: true,
				getup_success: false,
				sleep_success: false,
				getup_like: false,
				sleep_like:false,
				getup_success_list:[{getup_goal:'7:00', getup_time:'6:30',date:'2023年07月24日 星期一'}, {getup_goal:'7:00', getup_time:'6:59',date:'2023年07月25日 星期二'}],
				sleep_success_list:[{sleep_goal:'23:00', sleep_time:'22:55',date:'2023年07月23日 星期日'}, {sleep_goal:'23:00', sleep_time:'22:50',date:'2023年07月25日 星期二'}],
				success_list:[{getup_goal:'7:00', getup_time:'6:30',sleep_goal:'23:00', sleep_time:'22:55', date:'2023年07月25日 星期二'}],
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
		mounted() {
			this.getNowTime();
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
				this.today_year=y+'年';
				var date=this.addTimes(m)+'月'+this.addTimes(d)+'日';
				if(this.today_date!=date){
					this.getup_time="--:--";
					this.sleep_time="--:--";
					this.today_date=date;
				}
				this.today_week=this.week[day]
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
				if(that.nowtime.hour<4||that.nowtime>=12){
					uni.showModal({
						title:'提示',
						content:'您只能在早上4点之后至中午12点之前进行起床打卡喔',
						showCancel:false,
					})
				}
				else{
					uni.showModal({
						title:'提示',
						content:'进行起床打卡？',
						success:function(res){
							if(res.confirm){
								that.getNowTime();
								that.getup_time=that.nowtime.hour+':'+that.nowtime.minute;
								that.getup=true;
								that.sleep=false;
								var time_goal=Date.parse('2023/01/01 '+that.getup_goal+':59');
								var time_now=Date.parse('2023/01/01 '+that.getup_time+':00');
								
								if(time_now<=time_goal){
									that.getup_success=true;
									let obj={
										getup_goal:that.getup_goal,
										getup_time:that.getup_time,
										date:that.today,
									}
									that.getup_success_list.push(obj);
									
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
				}
			},
			achieve_sleep(){	//就寝目标达成
				var that=this;
				that.sleep_success=true;
				let obj={
					sleep_goal:that.sleep_goal,
					sleep_time:that.sleep_time,
					date:that.today,
				}
				that.sleep_success_list.push(obj);
				var i=that.getup_success_list.find(item=>(item.date==obj.date));
				if(i){
					let obj={
						getup_goal:that.getup_goal,
						getup_time:that.getup_time,
						sleep_goal:that.sleep_goal,
						sleep_time:that.sleep_time,
						date:that.today,
					}
					that.success_list.push(obj);
				}
				uni.showToast({
					title:'就寝时间：'+that.sleep_time+'\n就寝目标达成，给自己点个赞吧！',
					icon:'none',
					duration:2500,
				})
				console.log(that.sleep_success_list);
				
				uni.setStorage({ //存入Storage
					key: 'sleepGoalSuccess', //自己取个名字
					data: { //存的数据可以是很多条
							
							sleep_time:that.sleep_time,
							sleep_goal:that.sleep_goal,
					},
					success() {
						console.log('sleepGoalSuccess储存成功');
					}
				});
			},
			fail_sleep(){	//就寝目标失败
				var that=this;
				uni.showToast({
					title:'就寝时间：'+that.sleep_time,
					icon:'none',
					duration:2500,
				})
			},
			sleep_clock(){
				var that=this;
				if(that.nowtime.hour<20&&that.nowtime.hour>=4){
					uni.showModal({
						title:'提示',
						content:'您只能在晚上20点之后至凌晨4点之前进行就寝打卡喔',
						showCancel:false,
					})
				}
				else{
					uni.showModal({
						title:'提示',
						content:'进行就寝打卡？',
						success:function(res){
							if(res.confirm){
								that.getNowTime();
								that.sleep_time=that.nowtime.hour+':'+that.nowtime.minute;
								that.sleep=true;		//睡了
								that.getup=false;
								//var time_goal=Date.parse('2023/01/01 '+that.sleep_goal+':59');
								//var time_now=Date.parse('2023/01/01 '+that.sleep_time+':00');
								that.sleepGoalTime.hour=that.sleep_goal.split(':')[0];
								that.sleepGoalTime.minute=that.sleep_goal.split(':')[1];
								if(that.sleep){		//睡了	零点前：12~24，零点后：00~12（11：59）
									if(that.sleepGoalTime.hour<12&&that.nowtime.hour>12){	//目标零点后，打卡零点前
										that.achieve_sleep();
									}
									else if((that.sleepGoalTime.hour<12&&that.nowtime.hour<12)||
									(that.sleepGoalTime.hour>=12&&that.nowtime.hour>=12)){	//目标零点前、打卡零点前或目标零点后、打卡零点后
										if(that.nowtime.hour<that.sleepGoalTime.hour||
										(that.nowtime.hour=that.sleepGoalTime.hour&&that.nowtime.minute<that.sleepGoalTime.minute)){
											that.achieve_sleep();
										}
										else{
											that.fail_sleep();
										}
									}
									else{
										that.fail_sleep();
									}
								}
							}
						}
					})
				}
			},
			cancel_sleep(){	//取消就寝状态
				var that=this;
				uni.showModal({
					title:'提示',
					content:'取消就寝状态？',
					success:function(res){
						if(res.confirm){
							that.sleep=false;
							that.getup=true;
							that.sleep_time="--:--";
							that.sleep_success=false;
							that.sleep_like=false;
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
			},
			goto_award(){
				var that=this;
				uni.navigateTo({
					url:'/pages/self-manage/sleep/sleep_award/sleep_award',
					success:function(res){
						res.eventChannel.emit('sleepToAward',{
							getup_success_list: that.getup_success_list,
							sleep_success_list:that.sleep_success_list,
							success_list:that.success_list,
						});
					}
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
		display: flex;
		width: 100%;
		box-shadow: -1px 1px 5px 1px rgba(0, 0, 0, 0.1), -1px 2px 1px 0 rgba(255, 255, 255) inset;
		border-radius: 10px;
		background: #f1fdf2;
	}
	.clock_today{
		height: 90px;
		text-align: center;
		display: flex;
		flex-direction: column;
		justify-content: center;
		font-size: 15px;
		width: 40%;
		box-shadow: -1px 1px 5px 1px rgba(0, 0, 0, 0.1), -1px 2px 1px 0 rgba(255, 255, 255) inset;
		border-radius: 10px;
	}
	.clock_today_item{
		display: flex;
		flex-direction: column;
		justify-content: center;
		height: 25px;
		text-align: center;
	}
	.clockTime{
		height: 90px;
		text-align: center;
		display: flex;
		flex-direction: column;
		justify-content: center;
		font-size: 15px;
		width: 60%;
		box-shadow: -1px 1px 5px 1px rgba(0, 0, 0, 0.1), -1px 2px 1px 0 rgba(255, 255, 255) inset;
		border-radius: 10px;
	}
	.clockTime_item{
		height: 35px;
		align-items: center;
		display: flex;
		justify-content: center;
	}
	.clockTime_item_text{
		text-align: center;
		display: flex;
		flex-direction: column;
		justify-content: center;
	}
	.like_img{
		height: 20px;
		width: 20px;
		margin-left: 5px;
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
	.list_item0{
		background: white;
		box-shadow: -1px 1px 5px 1px rgba(0, 0, 0, 0.1), -1px 2px 1px 0 rgba(255, 255, 255) inset;
		margin: 8px; 
		text-align: left;
		height: 50px;
		font-weight: bold;
	}
	.br{/*留空*/
		height: 150px;
	}
</style>