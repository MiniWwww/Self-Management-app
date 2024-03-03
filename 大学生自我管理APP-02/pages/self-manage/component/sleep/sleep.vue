<template>
	<view class="box">
		<view class="manage_box">	<!--睡眠目标&打卡-->
			<view class="goalTime_box" >	<!--目标设置-->
				<picker class="goalTime_picker" mode="time" :value="getup_goal" start="00:00" end="23:59" @change="bindTimeChange_g">
					<view class="goalTime_picker_text">起床目标</view>
					<view class="goalTime_picker_time">{{getup_goal}}</view>
				</picker>
				<uni-icons class="goaltime_picker_icon_1" type="fire-filled" size="25" color="#009688"></uni-icons>
				<picker class="goalTime_picker" mode="time" :value="sleep_goal" start="00:00" end="23:59" @change="bindTimeChange_s">
					<view class="goalTime_picker_text">就寝目标</view>
					<view class="goalTime_picker_time">{{sleep_goal}}</view>
				</picker>
				<uni-icons class="goaltime_picker_icon_2" type="star-filled" size="25" color="#009688"></uni-icons>
			</view>
			<view class="clock_box">	<!--打卡-->
				<view>
					<view v-if="getup">
						<image v-if="!DayTimeJudge" class="img_1" src="../../static/moon.png" mode="heightFix"></image>
						<image v-if="DayTimeJudge" class="img_1" src="../../static/sun.png" mode="heightFix"></image>
						<button class="clock_button" @click="sleep_clock">睡觉</button>
						
					</view>
					<view v-if="sleep" style="position: relative;">
						<view class="wave_1"></view>
						<view class="wave_2"></view>
						<image class="img" src="../../static/moon.png" mode="heightFix"></image>
						<button class="clock_button" @click="clickSprink()" @touchend="touchend" @touchstart="touchstart">起床</button>
						<view style="font-size: 12px; color: #9e9e9e; margin-top: -8px;" >轻触取消就寝状态，长按起床</view>
					</view>
				</view>
				<view class="clockTime_box">
					<view class="clock_today">
						<uni-icons class="clock_today_icon" type="calendar-filled" size="25" color="#009688"></uni-icons>
						<view class="clock_today_item">{{today_year}}{{today_date}}</view>
						<view class="clock_today_item">{{today_week}}</view>
					</view>
					<view class="clockTime">
						<view class="clockTime_item">
							<view class="clockTime_item_text">
								起床时间
								<uni-icons class="like_icon" type="hand-up" size="25" color="#009688" v-if="getup_success&&!getup_like" @click="like_getup"></uni-icons>
								<uni-icons class="like_icon" type="hand-up-filled" size="25" color="#009688" v-if="getup_like"></uni-icons>
							</view>
							<view class="clockTime_item_time">{{getup_time}}</view>
							
						</view>
						<view class="clockTime_item" >
							<view class="clockTime_item_text">
								就寝时间
								<uni-icons class="like_icon" type="hand-up" size="25" color="#009688" v-if="sleep_success&&!sleep_like" @click="like_sleep"></uni-icons>
								<uni-icons class="like_icon" type="hand-up-filled" size="25" color="#009688" v-if="sleep_like"></uni-icons>
							</view>
							<view class="clockTime_item_time">{{sleep_time}}</view>
							
						</view>
					</view>
				</view>
			</view>
		</view>
		<view v-if="gif_show" class="loveyou_outside">
			<view class="loveyou">
				<image src="/static/loveyou.gif" mode="heightFix"></image>
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
				//是否长按事件
				gif_show: false,
				islongPress:false,
				timer:null,//长按计时器
				start_time: 0,
				end_time: 0,
				week:["星期日","星期一","星期二","星期三","星期四","星期五","星期六"],
				getup_goal:'07:00',
				sleep_goal:'02:00',
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
		created() {
			console.log('这是sleep页面的created监听函数');
			var that=this;
			uni.getStorage({
				key:'getUp_sleep_Goal',
				success(res) {
					console.log("获取到起床睡眠目标",res.data);
					that.getup_goal=res.data.getup_goal;
					that.sleep_goal=res.data.sleep_goal;
					
				}
			})
			uni.getStorage({
				key:'getup_sleep_state',
				success(res) {
					console.log("获取到睡眠/起床状态",res.data);
					that.getup=res.data.getup;
					that.sleep=res.data.sleep;
					
				}
			})
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
				var that=this;
				uni.setStorage({
					key:'getUp_sleep_Goal',
					data:{
						getup_goal:that.getup_goal,
						sleep_goal:that.sleep_goal
					},
					success() {
						console.log('起床目标存储成功！')
					}
				})
			},
			bindTimeChange_s: function(e) {
				this.sleep_goal = e.detail.value
				var that=this;
				uni.setStorage({
					key:'getUp_sleep_Goal',
					data:{
						getup_goal:that.getup_goal,
						sleep_goal:that.sleep_goal
					},
					success() {
						console.log('睡眠目标存储成功！')
					}
				})
				
			},
			getup_clock(){
				var that=this;
				if(that.nowtime.hour<4||that.nowtime.hour>=12){
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
									i=that.getup_success_list.find(item=>(item.date==that.today));
									if(i){
										i.getup_goal=that.getup_goal;
										i.getup_time=that.getup_time;
									}
									else{
										let obj={
											getup_goal:that.getup_goal,
											getup_time:that.getup_time,
											date:that.today,
										}
										that.getup_success_list.push(obj);
									}
									uni.setStorage({
										key:'getup_success_list',
										data:that.getup_success_list,
										success() {
											console.log('getup_success_list储存成功');
										}
									})
									var GetUp_Success_count=that.getup_success_list.length;
									uni.setStorage({ //存入Storage
										key: 'getup_like_Count', //自己取个名字
										data: { //存的数据可以是很多条
											
										getup_like_Count:getup_like_Count,
										},
										success() {
											console.log('getup_like_Count起床达成赞数加一并且储存成功');
										}
									});
									that.gif_show=true;
									setTimeout(()=>{
										that.gif_show=false;
										uni.showToast({
											title:'起床时间：'+that.getup_time+'\n起床目标达成，给自己点个赞吧！',
											icon:'none',
										})
									},3200)
								}
								else{
									that.gif_show=true;
									setTimeout(()=>{
										that.gif_show=false;
										uni.showToast({
											title:'起床时间：'+that.getup_time,
											icon:'none',
										})
									},3200);
								}
								uni.setStorage({
									key:'getup_sleep_state',
									data:{
										getup:that.getup,
										sleep:that.sleep
									},
									success() {
										console.log('睡眠/起床状态存储成功！')
									}
								})
							}
						}
					})
				}
			},
			achieve_sleep(){	//就寝目标达成
				var that=this;
				that.sleep_success=true;
				var i;
				i=that.sleep_success_list.find(item=>(item.date==that.today));
				if(i){
					i.sleep_goal=that.sleep_goal;
					i.sleep_time=that.sleep_time;
				}
				else{
					let obj={
						sleep_goal:that.sleep_goal,
						sleep_time:that.sleep_time,
						date:that.today,
					}
					that.sleep_success_list.push(obj);
				}
				i=that.success_list.find(item=>(item.date==that.today));
				if(i){
					i.sleep_goal=that.sleep_goal;
					i.sleep_time=that.sleep_time;
				}
				else{
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
				uni.setStorage({
					key:'sleep_success_list',
					data:that.sleep_success_list,
					success() {
						console.log('sleep_success_list储存成功');
					}
				});
				var Sleep_Success_count=that.sleep_success_list.length;
				uni.setStorage({ //存入Storage
					key: 'sleep_like_Count', //自己取个名字
					data: { //存的数据可以是很多条
						
					sleep_like_Count:Sleep_Success_count,
					},
					success() {
						console.log('sleep_like_Count睡眠达成赞数加一并且储存成功');
					}
				});
				uni.setStorage({ //存入Storage
					key: 'Today_getup_sleep_GoalSuccess', //自己取个名字
					data: { //存的数据可以是很多条
							
						getup_goal:that.getup_goal,
						getup_time:that.getup_time,
						sleep_goal:that.sleep_goal,
						sleep_time:that.sleep_time,
					},
					success() {
						console.log('Today_getup_sleep_GoalSuccess储存成功');
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
								uni.setStorage({
									key:'getup_sleep_state',
									data:{
										getup:that.getup,
										sleep:that.sleep
									},
									success() {
										console.log('睡眠/起床状态存储成功！')
									}
								})
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
							uni.setStorage({
								key:'getup_sleep_state',
								data:{
									getup:that.getup,
									sleep:that.sleep
								},
								success() {
									console.log('睡眠/起床状态存储成功！')
								}
							})
						}
					}
				})
			},
			//长按事件
			longpress(){
				this.islongPress = true;
				console.log("长按事件");
				uni.showToast({
					title: 3,
					icon:'none',
					duration:1000,
				})
				this.timer = setTimeout(()=>{
					uni.showToast({
						title: 2,
						icon:'none',
						duration:1000,
					})
					this.timer = setTimeout(()=>{
						uni.showToast({
							title: 1,
							icon:'none',
							duration:1000,
						})
						this.timer = setTimeout(()=>{
							uni.showToast({
								title: 0,
								icon:'none',
								duration:1000,
							})
							this.getup_clock();
						},1000)//倒计时
					},1000)//倒计时
				},1000)//倒计时
				
			},
			//点击事件
			clickSprink(){
				// 非长按
				if(this.islongPress == false){
					console.log("点击事件");
					this.cancel_sleep()
				}else if(this.islongPress == true){
					console.log("长按事件");
				}
			},
			//手指触摸动作开始
			touchstart(){
				this.start_time = new Date().getTime();
				/* console.log(this.start_time); */
				this.timer = setTimeout(()=>{
					this.longpress();
				},200)//触发倒计时
			},
			//手指触摸动作结束
			touchend(){
				clearTimeout(this.timer);
				this.end_time = new Date().getTime();
				/* console.log(this.end_time); */
				//延时执行为了防止 click() 还未判断 islongPress 的值就被置为 fasle
				setTimeout(() => {
					this.islongPress = false
				}, 200)
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
		padding-bottom: 5px;
	}
	.goalTime_box{
		/* box-shadow: -1px 1px 5px 1px rgba(0, 0, 0, 0.1), -1px 2px 1px 0 rgba(255, 255, 255) inset;
		border-radius: 10px; */
		height: 125px;
		display: flex;
		justify-content: space-evenly;
		margin: 10px;
	}
	.goalTime_picker {
		width: 44%;
		border-radius: 10px;
		box-shadow: -1px 1px 5px 1px rgba(0, 0, 0, 0.1), -1px 2px 1px 0 rgba(255, 255, 255) inset;
		margin: 20px 5px 15px 5px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		background-color: white;
		/* align-items: center; */
	}
	.goalTime_picker_text{
		margin: 18px 0 0 13px;
		text-align: left;
		font-size: 16px;
		font-weight: 700;
	}
	.goalTime_picker_time{
		margin: -10px 0 5px 13px;
		text-align: left;
		font-size: 23px;
		font-weight: 800;
		padding-bottom: 13px;
		
	}
	.goaltime_picker_icon_1{
		position: absolute;
		right: 205px;
		top: 125px;
	}
	.goaltime_picker_icon_2{
		position: absolute;
		right: 55px;
		top: 125px;
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
	.clock_button{
		color: white;
		background-color: #009688;
		border-radius: 180px;
		width: 200px;
		height: 45px;
		text-align: center;
	}
	@keyframes img_1 {
		from {
			transform: translate(0, -15rpx)
		}

		to {
			transform: translate(0, 15rpx)
		}
	}
	.img_1{
		height:200px;
		align-items: center;
		justify-content: center;
		animation: img_1 1.5s ease-in-out 0s infinite alternate;
	}
	.wave_1{
		position: absolute;
		top: -25px;
		left: -50px;
		width: 300px;
		height: 300px;
		/* outline: 2px dashed gray; */
		--c: #0000;
		--w1: radial-gradient(100% 57% at top ,#0000 100%,#b8b8b8 4px,var(--c) 101.5%) no-repeat;
		--w2: radial-gradient(100% 57% at bottom, var(--c) 100%,#b8b8b8 4px,#0000 101.5%) no-repeat;
		background: var(--w1),var(--w2),var(--w1),var(--w2);
		background-position-x: -200%, -100%, 0%, 100%;
		background-position-y: 100%;
		background-size: 50.5% 100%;
		animation: m 2s infinite -0.5s linear;
	}
	.wave_2{
		position: absolute;
		top: -15px;
		left: -50px;
		width: 300px;
		height: 300px;
		/* outline: 2px dashed gray; */
		--c: #0000;
		--w1: radial-gradient(100% 57% at top ,#0000 100%,#b8b8b8 4px,var(--c) 101.5%) no-repeat;
		--w2: radial-gradient(100% 57% at bottom, var(--c) 100%,#b8b8b8 4px,#0000 101.5%) no-repeat;
		background: var(--w1),var(--w2),var(--w1),var(--w2);
		background-position-x: -200%, -100%, 0%, 100%;
		background-position-y: 100%;
		background-size: 50.5% 100%;
		animation: m 3s infinite -0s linear;
	}
	@keyframes m {
		0%  {background-position-x:-200%, -100%, 0%, 100%}
		100%{background-position-x:  0%, 100%, 200%, 300%}
	}
	.img{
		height:200px;
		align-items: center;
		justify-content: center;
		animation: img 3s ease-in-out 0s infinite alternate;
	}
	@keyframes img {
		from {
			transform: translate(0, 15rpx) rotate(-10deg) scale(0.95)
		}
	
		to {
			transform: translate(0, -15rpx) rotate(10deg) scale(1.05)
		}
	}
	.clockTime_box{
		/* display: flex; */
		width: 88%;
		box-shadow: -1px 1px 5px 1px rgba(0, 0, 0, 0.1), -1px 2px 1px 0 rgba(255, 255, 255) inset;
		border-radius: 10px;
		margin: 25px 15px 15px 15px;
		background-color: white;
	}
	.clock_today{
		height: 30px;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 16px;
		font-weight: 700;
		/* width: 100%; */
		color: #323232;
		padding: 10px;
		border-width: 0 0 2px 0;
		border-style: dashed;
		border-color: #989898;
		border-radius: 10px;
	}
	.clock_today_icon{
		position: relative;
		margin: 5px;
		/* left: 15px;
		top: 20px; */
	}
	.clock_today_item{
		display: flex;
		flex-direction: column;
		justify-content: center;
		/* height: 25px; */
		text-align: center;
		margin: 5px;
	}
	.clockTime{
		height: 90px;
		text-align: center;
		display: flex;
		/* flex-direction: column; */
		justify-content: space-evenly;
		font-size: 15px;
		width: 100%;
	}
	.clockTime_item{
		/* background-color: blueviolet; */
		/* height: 35px; */
		display: flex;
		align-items: center;
		flex-direction: column;
		justify-content: center;
		padding: 10px;
	}
	.clockTime_item_text{
		text-align: center;
		display: flex;
		/* flex-direction: column; */
		justify-content: center;
		font-size: 16px;
		font-weight: 700;
		margin-top: -5px;
	}
	.clockTime_item_time{
		text-align: center;
		display: flex;
		flex-direction: column;
		justify-content: center;
		font-size: 23px;
		font-weight: 800;
		margin-top: -15px;
	}
	.like_icon{
		/* position: relative; */
		/* right: px; */
		/* top: 10px; */
		margin-left: 5px;
	}
	.loveyou_outside{
		position: fixed;
		top: 0;
		height: 800px;
		width: 100%;
		background-color: rgba(0, 0, 0, 0.5);
		z-index: 999;
	}
	.loveyou{
		position: fixed;
		top: 250px;
		left: 50px;
		height: 300px;
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