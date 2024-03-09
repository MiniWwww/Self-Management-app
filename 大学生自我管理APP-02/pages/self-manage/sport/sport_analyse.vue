<template>
	<view @touchstart="closeBubble">
		<!-- 日：可以选择查看某一天的记录。记录项目：强度（圆形进度条/百分比柱状图/扇形图）、做了什么运动做了几次一条条列出来、
		周：近7天的情况（或每7天分一组数据，可以查看不同周的数据）。运动次数柱状图、强度（圆形进度条/百分比柱状图/扇形图）、做了什么运动做了几次一条条列出来、 -->
		<view class="navbar_box_outside">
			<view class="navbar_box">
				<!-- <uni-icons type="back" size="20" class="back" @click="goback"></uni-icons> -->
				<view  @click="gotoDay" class="box_item" :class="{'active-item': day}">日</view>
				<view  @click="gotoWeek" class="box_item" :class="{'active-item': week}">周</view>
			</view>
		</view>
		<view v-if="day" class="content-box-outside">
			<picker mode="date" :value="date" end="date" @change="bindDateChange">
				<view class="date-box">
					<uni-icons type="calendar-filled" size="22" color="#009688" style="margin-right: 3px;"></uni-icons>
					{{date}}
				</view>
			</picker>
			<view v-if="!list_day.length" class="kong">无当天数据</view>
			<view v-if="list_day.length" class="content-box">
				<!-- 一个图 -->
				<view class="day_progress_outside">
					<view class="day_progress">
						<circle-progress-bar :pro="1" :border_back_color="'#f5f5f5'" :border_color="'#009688'" style="width: 170px;height: 170px;z-index: 0;" class="circle_1">
						</circle-progress-bar>
						<circle-progress-bar :pro="day_times_high/day_times" :border_back_color="'#f5f5f5'" :border_color="'#e9564c'" style="width: 145px;height: 145px;z-index: 0;" class="circle_2">
						</circle-progress-bar>
						<circle-progress-bar :pro="day_times_middle/day_times" :border_back_color="'#f5f5f5'" :border_color="'#f6eda4'" style="width: 120px;height: 120px;z-index: 0;" class="circle_3">
						</circle-progress-bar>
						<circle-progress-bar :pro="day_times_low/day_times" :border_back_color="'#f5f5f5'" :border_color="'#66c0a4'" style="width: 95px;height: 95px;z-index: 0;" class="circle_4">
						</circle-progress-bar>
					</view>
					<view class="description">
						<view class="description_item">
							<view class="description_item_left">
								<view class="description_item_left_color" style="background-color: #009688;"></view>
								<text>总次数</text>
							</view>
							<view>{{day_times}}次</view>
							<view class="description_item_right">100%</view>
						</view>
						<view class="description_item">
							<view class="description_item_left">
								<view class="description_item_left_color" style="background-color: #e9564c;"></view>
								<text>高强度</text>
							</view>
							<view>{{day_times_high}}次</view>
							<view class="description_item_right">{{parseFloat(day_times_high/day_times*100).toFixed(2)}}%</view>
						</view>
						<view class="description_item">
							<view class="description_item_left">
								<view class="description_item_left_color" style="background-color: #f6eda4;"></view>
								<text>中强度</text>
							</view>
							<view>{{day_times_middle}}次</view>
							<view class="description_item_right">{{parseFloat(day_times_middle/day_times*100).toFixed(2)}}%</view>
						</view>
						<view class="description_item">
							<view class="description_item_left">
								<view class="description_item_left_color" style="background-color: #66c0a4;"></view>
								<text>低强度</text>
							</view>
							<view>{{day_times_low}}次</view>
							<view class="description_item_right">{{parseFloat(day_times_low/day_times*100).toFixed(2)}}%</view>
						</view>
					</view>
				</view>
				<!-- 运动轨迹 -->
				<view class="item-box-outside">
					<view class="item-header">
						<text class="item-header-text">这里是你这一天的运动项目\n看看这一天都做了哪些运动吧~</text>
					</view>
					<view class="item-box">
						<uni-collapse v-for="(item, index) in list_day" :key="index" class="item-box-inside">
							<uni-collapse-item :show-animation="true" :border="false" titleBorder="none">
								<template v-slot:title>
									<uni-list :border="false">
										<!-- <uni-list-item :title="item.title" :note="item.Today" :thumb="item.ListImage"> -->
										<uni-list-item :title="item.title" :note="'×'+item.finish_times+'次'" thumb="/static/getAward.png">
										</uni-list-item>
									</uni-list>
								</template>
								<view style="margin-bottom: 40px; margin-top: -10px">
									<view class="item-content">
										<uni-section style="height: 50px;" title="运动强度" padding>
											<template v-slot:decoration>
												<view class="decoration"></view>
											</template>
										</uni-section>
										<view class="item-content-TextBox">
											<text class="item-content-Text">{{item.intensity}}</text>
										</view>
									</view>
									<view class="item-content">
										<uni-section style="height: 50px;" title="完成总次数" padding>
											<template v-slot:decoration>
												<view class="decoration"></view>
											</template>
										</uni-section>
										<view class="item-content-TextBox">
											<text class="item-content-Text">{{item.all_finish_times}}/{{item.timesForAward}}</text>
										</view>
									</view>
									<view class="item-content" style="position: relative;">
										<uni-section style="height: 50px;" title="奖励内容" padding>
											<template v-slot:decoration>
												<view class="decoration"></view>
											</template>
										</uni-section>
										<view class="item-content-TextBox" style="padding-bottom: 20px;">
											<text class="item-content-Text">{{item.award}}</text>
										</view>
									</view>
								</view>
								
							</uni-collapse-item>
						</uni-collapse>
					</view>
				</view>
			</view>
		</view>
		<view v-if="week" class="content-box-outside" >
			
			<view class="content-box">
				<!--柱状图-->
				<view class="week_img_outside" style="margin-top: 15px;">
					<view class="week_description">
						<text class="week_description_top">近七天运动次数</text>
						<view class="week_description_right">
							<view style="display: flex; align-items: flex-end;">
								<text style="font-size: 35px; font-weight: 900; color: #2f2f2f;">{{allTimeWeek}}</text>
								<text style="font-size: 20px; font-weight: 800; color: #2f2f2f;">次</text>
							</view>
							<text decode="true" style="font-size: 12px; font-weight: 600; color: #2f2f2f;">运动&emsp;{{day_count}}/7&emsp;天</text>
						</view>
					</view>
					<view style="width: 100%; height: 250px; display: flex; flex-direction: column; align-items: center; position: relative; margin-top: 15px;">
						<view class="line" style=" top: 0;">
							<view class="line-text">{{top}}次</view>
							<view class="line-line"></view>
						</view>
						<view class="line" style=" top: 100px;">
							<view class="line-text">{{top/2}}次</view>
							<view class="line-line"></view>
						</view>
						<view class="line" style=" top: 200px;">
							<view class="line-text">0次</view>
							<view class="line-line"></view>
						</view>
						<view style="z-index: 99; margin-left: 20px; width: 85%; height: 210px; display: flex;  justify-content: space-around; align-items: flex-end;">
							<view v-for="(item, index) in all_times_week" :key="index" 
								style="width: 10%; background-color: #009688;  display: flex; flex-direction: column; justify-content: flex-end; align-items: center; 
										z-index: 100; height: 100px; border-radius: 20px; position: relative;" 
								:style="{height:height_weeks[index]}" @touchstart.stop @click="showBubble(index)">
								<view class="bubble-box" :style="{ top: bubble_top[index] }" v-if="show_bubble[index]">
									<view class="bubble-content">
										<!-- 气泡框内容 -->
										<text>{{item}}次</text>
									</view>
								</view>
								<view style="margin-bottom: -35px; font-size: 10px; font-weight: 500; color: #bbbbbb; transform: rotate(-45deg);">
									{{week_date[index]}}
								</view>
								
							</view>
						</view>
					</view>
				</view>
				<!-- 运动轨迹 -->
				<view class="item-box-outside" style="margin-top: 25px;">
					<view class="item-header">
						<text class="item-header-text">这里是你这七天的运动项目\n看看这七天都做了哪些运动吧~</text>
					</view>
					<view class="item-box_week">
						<view v-for="(item, index) in list_week" :key="index" class="item-box-inside_week" :class="{'item-box-inside_week_flag':list_week_time_flag[index]}">
							<view class="item-content_week_time" v-if="list_week_time_flag[index]">
								<uni-icons type="smallcircle" size="20" color="#009688" class="item-content_week_time_icon"></uni-icons>
								<view class="item-content_week_time_time">{{item.finish_day}}</view>
							</view>
							<uni-collapse >
								<uni-collapse-item :show-animation="true" :border="false" titleBorder="none">
									<template v-slot:title>
										<uni-list :border="false">
											<!-- <uni-list-item :title="item.title" :note="item.Today" :thumb="item.ListImage"> -->
											<uni-list-item :title="item.title" :note="'×'+item.finish_times+'次'" thumb="/static/getAward.png">
											</uni-list-item>
										</uni-list>
									</template>
									
									<view style="margin-bottom: 40px; margin-top: -10px">
										<view class="item-content">
											<uni-section style="height: 50px;" title="运动强度" padding>
												<template v-slot:decoration>
													<view class="decoration"></view>
												</template>
											</uni-section>
											<view class="item-content-TextBox">
												<text class="item-content-Text">{{item.intensity}}</text>
											</view>
										</view>
										<view class="item-content">
											<uni-section style="height: 50px;" title="完成总次数" padding>
												<template v-slot:decoration>
													<view class="decoration"></view>
												</template>
											</uni-section>
											<view class="item-content-TextBox">
												<text class="item-content-Text">{{item.all_finish_times}}/{{item.timesForAward}}</text>
											</view>
										</view>
										<view class="item-content" style="position: relative;">
											<uni-section style="height: 50px;" title="奖励内容" padding>
												<template v-slot:decoration>
													<view class="decoration"></view>
												</template>
											</uni-section>
											<view class="item-content-TextBox" style="padding-bottom: 20px;">
												<text class="item-content-Text">{{item.award}}</text>
											</view>
										</view>
									</view>
									
								</uni-collapse-item>
							</uni-collapse>
						</view>
						
					</view>
				</view>
			</view>
		</view>
		<view class="br"></view>
	</view>
</template>

<script>
	import CircleProgressBar from '../component/circle-progress-bar/circle-progress-bar.vue'
	export default {
		components: {
					CircleProgressBar,
		},
		data() {
			return {
				//先伪造一个近7日的数据
				list:[{//2.27
						title: '跑步',
						period_free: true, 
						period:false, 
						note:'', 
						intensity:'中', 
						times: '', 
						finish: false, 
						finish_times:1, 
						all_finish_times:3, 
						finish_day:'2024/02/27', 
						cycle:'自由', 
						timesForAward:20, 
						award:'吃烤肉',
						run_animationData: {},
						position_left: 20,
						run_img: "../../../../static/run.png",
						getAward: false,
						},{
						title: '打球', 
						period_free: false, 
						period:true, 
						note:'',
						intensity:'高', 
						times:1, 
						finish: true, 
						finish_times:1, 
						all_finish_times:5, 
						finish_day:'2024/02/27', 
						cycle:'周日 周二 周四 周六',
						timesForAward:10, 
						award:'吃烧烤！', 
						run_animationData: {}, 
						position_left: 20, 
						run_img: "../../../../static/run.png",
						getAward: false,
						},{//2.28
						title: '仰卧起坐', 
						period_free: false, 
						period:true, 
						note:'一次50个',
						intensity:'中', 
						times:2, 
						finish: true, 
						finish_times:2, 
						all_finish_times:10, 
						finish_day:'2024/02/28', 
						cycle:'每天',
						timesForAward:30, 
						award:'喝奶茶！', 
						run_animationData: {},
						position_left: 20, 
						run_img: "../../../../static/run.png",
						getAward: false,
						},{
						title: '跳绳', 
						period_free: false, 
						period:true, 
						note:'',
						intensity:'低', 
						times:3, 
						finish: true, 
						finish_times:3, 
						all_finish_times:49, 
						finish_day:'2024/02/28', 
						cycle:'周一 周二 周五',
						timesForAward:50, 
						award:'吃火锅！',
						run_animationData: {},
						position_left: 20,
						run_img: "../../../../static/run.png",
						getAward: false,
						},{//2.29
						title: '跑步',
						period_free: true, 
						period:false, 
						note:'', 
						intensity:'中', 
						times: '', 
						finish: false, 
						finish_times:1, 
						all_finish_times:3, 
						finish_day:'2024/02/29', 
						cycle:'自由', 
						timesForAward:20, 
						award:'吃烤肉',
						run_animationData: {},
						position_left: 20,
						run_img: "../../../../static/run.png",
						getAward: false,
						},{
						title: '打球', 
						period_free: false, 
						period:true, 
						note:'',
						intensity:'高', 
						times:1, 
						finish: true, 
						finish_times:1, 
						all_finish_times:5, 
						finish_day:'2024/02/29', 
						cycle:'周日 周二 周四 周六',
						timesForAward:10, 
						award:'吃烧烤！', 
						run_animationData: {}, 
						position_left: 20, 
						run_img: "../../../../static/run.png",
						getAward: false,
						},{//3.1
						title: '仰卧起坐', 
						period_free: false, 
						period:true, 
						note:'一次50个',
						intensity:'中', 
						times:2, 
						finish: true, 
						finish_times:2, 
						all_finish_times:10, 
						finish_day:'2024/03/01', 
						cycle:'每天',
						timesForAward:30, 
						award:'喝奶茶！', 
						run_animationData: {},
						position_left: 20, 
						run_img: "../../../../static/run.png",
						getAward: false,
						},{
						title: '跳绳', 
						period_free: false, 
						period:true, 
						note:'',
						intensity:'低', 
						times:3, 
						finish: true, 
						finish_times:3, 
						all_finish_times:49, 
						finish_day:'2024/03/01', 
						cycle:'周一 周二 周五',
						timesForAward:50, 
						award:'吃火锅！',
						run_animationData: {},
						position_left: 20,
						run_img: "../../../../static/run.png",
						getAward: false,
						},{//3.2
						title: '跑步',
						period_free: true, 
						period:false, 
						note:'', 
						intensity:'中', 
						times: '', 
						finish: false, 
						finish_times:1, 
						all_finish_times:3, 
						finish_day:'2024/03/02', 
						cycle:'自由', 
						timesForAward:20, 
						award:'吃烤肉',
						run_animationData: {},
						position_left: 20,
						run_img: "../../../../static/run.png",
						getAward: false,
						},{
						title: '打球', 
						period_free: false, 
						period:true, 
						note:'',
						intensity:'高', 
						times:1, 
						finish: true, 
						finish_times:1, 
						all_finish_times:5, 
						finish_day:'2024/03/02', 
						cycle:'周日 周二 周四 周六',
						timesForAward:10, 
						award:'吃烧烤！', 
						run_animationData: {}, 
						position_left: 20, 
						run_img: "../../../../static/run.png",
						getAward: false,
						},{//3.2
						title: '仰卧起坐', 
						period_free: false, 
						period:true, 
						note:'一次50个',
						intensity:'中', 
						times:2, 
						finish: true, 
						finish_times:2, 
						all_finish_times:10, 
						finish_day:'2024/03/01', 
						cycle:'每天',
						timesForAward:30, 
						award:'喝奶茶！', 
						run_animationData: {},
						position_left: 20, 
						run_img: "../../../../static/run.png",
						getAward: false,
						},{
						title: '跳绳', 
						period_free: false, 
						period:true, 
						note:'',
						intensity:'低', 
						times:3, 
						finish: true, 
						finish_times:3, 
						all_finish_times:49, 
						finish_day:'2024/03/01', 
						cycle:'周一 周二 周五',
						timesForAward:50, 
						award:'吃火锅！',
						run_animationData: {},
						position_left: 20,
						run_img: "../../../../static/run.png",
						getAward: false,
						},{//3.3
						title: '帕梅拉练腹', 
						period_free: false, 
						period:true, 
						note:'',
						intensity:'高', 
						times:1, 
						finish: true, 
						finish_times:1, 
						all_finish_times:5, 
						finish_day:'2024/03/03', 
						cycle:'周日 周二 周四 周六',
						timesForAward:10, 
						award:'吃烧烤！', 
						run_animationData: {}, 
						position_left: 20, 
						run_img: "../../../../static/run.png",
						getAward: false,
						},{
						title: '哑铃', 
						period_free: false, 
						period:true, 
						note:'',
						intensity:'中', 
						times:3, 
						finish: true, 
						finish_times:3, 
						all_finish_times:5, 
						finish_day:'2024/03/03', 
						cycle:'周日 周二 周四 周六',
						timesForAward:10, 
						award:'吃烧烤！', 
						run_animationData: {}, 
						position_left: 20, 
						run_img: "../../../../static/run.png",
						getAward: false,
						},{//3.4
						title: '跑步',
						period_free: true, 
						period:false, 
						note:'', 
						intensity:'中', 
						times: '', 
						finish: false, 
						finish_times:1, 
						all_finish_times:3, 
						finish_day:'2024/03/04', 
						cycle:'自由', 
						timesForAward:20, 
						award:'吃烤肉',
						run_animationData: {},
						position_left: 20,
						run_img: "../../../../static/run.png",
						getAward: false,
						},{
						title: '打球', 
						period_free: false, 
						period:true, 
						note:'',
						intensity:'高', 
						times:1, 
						finish: true, 
						finish_times:1, 
						all_finish_times:5, 
						finish_day:'2024/03/04', 
						cycle:'周日 周二 周四 周六',
						timesForAward:10, 
						award:'吃烧烤！', 
						run_animationData: {}, 
						position_left: 20, 
						run_img: "../../../../static/run.png",
						getAward: false,
						},
					],
				// 选择的那天的数据
				list_day: [{//3.4
						title: '跑步',
						period_free: true, 
						period:false, 
						note:'', 
						intensity:'中', 
						times: '', 
						finish: false, 
						finish_times:1, 
						all_finish_times:3, 
						finish_day:'2024/03/04', 
						cycle:'自由', 
						timesForAward:20, 
						award:'吃烤肉',
						run_animationData: {},
						position_left: 20,
						run_img: "../../../../static/run.png",
						getAward: false,
						},{
						title: '打球', 
						period_free: false, 
						period:true, 
						note:'',
						intensity:'高', 
						times:1, 
						finish: true, 
						finish_times:1, 
						all_finish_times:5, 
						finish_day:'2024/03/04', 
						cycle:'周日 周二 周四 周六',
						timesForAward:10, 
						award:'吃烧烤！', 
						run_animationData: {}, 
						position_left: 20, 
						run_img: "../../../../static/run.png",
						getAward: false,
						},
					],
				list_week: [],//当前的七天列表
				list_week_time_flag: [],//当前的七天列表是否显示时间的标志
				allTimeWeek: 6,	//当前的七天的运动总次数
				all_times_week: [4,3,5,6,2,1,4],	//当前的七天各天运动次数
				height_weeks: [],	//当天七天各天在柱状图中的高度
				bubble_top: [],		//气泡框的位置高度
				show_bubble: [false,false,false,false,false,false,false],	//是否展示气泡
				top: 6,//柱状图的最大值
				day_count: 0,//有运动的天数
				week_date: [],	//近七天的日期
				day:true,
				week:false,
				date: '',
				day_times: 5,
				day_times_high: 1,
				day_times_middle: 2,
				day_times_low: 2,
			}
		},
		onLoad:function(option){
			var that=this;
			const eventChannel = that.getOpenerEventChannel();
			eventChannel.on('toanalyse',function(data){
				that.list=data;
				console.log(data);
				that.getNowTime();
				that.changeDateList(that.date);
				that.getWeek();
			});
			
		},
		methods: {
			addTimes(m){return m<10?'0'+m:m },
			getNowTime(){ //获取当前时间
				var time=new Date(new Date().getTime());
				let y=time.getFullYear();
				let m=time.getMonth()+1;
				let d=time.getDate();
				let h=time.getHours();
				let mi=time.getMinutes();
				let day=time.getDay();
				
				this.date=y+'-'+this.addTimes(m)+'-'+this.addTimes(d);
				
			},
			goback(){
				uni.navigateBack();
			},
			gotoDay(){
				this.week=false;
				this.day=true;
			},
			gotoWeek(){
				this.week=true;
				this.day=false;
			},
			bindDateChange: function(e) {
				this.date = e.detail.value;
				this.changeDateList(this.date);
			},
			changeDateList(date){	//“日”模块，改变查看的天
				let list_day=[];
				this.day_times=0;
				this.day_times_high=0;
				this.day_times_middle=0;
				this.day_times_low=0;
				//console.log("date:",date,new Date(date).setHours(0,0,0,0));
				this.list.forEach(v=>{
					//console.log("v.finish_day:",v.finish_day,new Date(v.finish_day).setHours(0,0,0,0));
					if(new Date(v.finish_day).setHours(0,0,0,0) == new Date(date).setHours(0,0,0,0)){
						list_day.push(v);
						this.day_times+=v.finish_times;
						if(v.intensity=='高'){
							this.day_times_high+=v.finish_times;
						}
						else if(v.intensity=='中'){
							this.day_times_middle+=v.finish_times;
						}
						else if(v.intensity=='低'){
							this.day_times_low+=v.finish_times;
						}
					}
				})
				this.list_day=list_day;
				console.log("日表",this.list_day);
				//console.log(this.day_times);
				//console.log(this.day_times_high);
				//console.log(this.day_times_middle);
				//console.log(this.day_times_low);
			},
			judge_time(list){
				//判断每一项的年份、日期是否和前一项一样
				let flag_list=[];
				var i;
				flag_list.push(true);
				for(i=1; i<list.length; i++){
					if(list[i].finish_day!=list[i-1].finish_day){
						flag_list.push(true);
					}
					else{
						flag_list.push(false);
					}
				}
				this.list_week_time_flag=flag_list;
				//console.log(flag_list)
			},
			getWeek(){
				var list=this.list;
				list.sort((a, b) => {
				    return (new Date(a.finish_day)).getTime() - (new Date(b.finish_day)).getTime();
				});
				var list_week=[];
				var all_times_week=[];
				let today=new Date().setHours(0,0,0,0);
				var j;
				var k;
				var all_times=0;
				this.day_count=0;
				this.week_date=[];
				for(j=0; j<7; j++){//取出近七天的数据
					let currentDay = new Date(today - j * 86400000);
					var times=0;
					var flag=0;
					for(k=list.length-1; k>=0; k--){
						if(new Date(list[k].finish_day).setHours(0,0,0,0)==currentDay.getTime()){
							list_week.unshift(list[k]);
							times+=list[k].finish_times;
							all_times+=list[k].finish_times;
							flag=1;
						}
						else if(new Date(list[k].finish_day).setHours(0,0,0,0)<currentDay.getTime()){
							break;
						}
					}
					if(flag==1){
						this.day_count++;
					}
					all_times_week.unshift(times);
					var year = currentDay.getFullYear();
					var month = currentDay.getMonth() + 1;
					var day = currentDay.getDate();
					var date = year + '/' + (month < 10 ? '0' + month : month) + '/' + (day < 10 ? '0' + day : day);
					this.week_date.unshift(date);
				}
				this.allTimeWeek=all_times;
				this.all_times_week=all_times_week;
				this.list_week=list_week;
				console.log("周表",this.list_week);
				console.log(this.week_date);
				var max=Math.max.apply(null, this.all_times_week);
				if( max%2==0){
					this.top=max;
				}
				else{
					this.top=max+1;
				}
				this.judge_time(this.list_week);
				let height=[];
				this.all_times_week.forEach(v=>{
					var i=v/this.top*200;
					this.bubble_top.push(`-${i+35}px`);
					height.push(`${i}px`)
				})
				this.height_weeks=height;
				//console.log(this.height_weeks);
			},
			showBubble(index){
				this.show_bubble=[false,false,false,false,false,false,false];
				this.show_bubble[index]=true;
			},
			closeBubble(){
				this.show_bubble=[false,false,false,false,false,false,false];
			}
		}
	}
</script>
	
<style>
	.navbar_box_outside{
		display: flex;
		align-items: center;
		justify-content: center;
		height: 50px;
		margin-top: 10px;
		/* padding-top: 30px; */
		/* top: 0px;
		position: fixed; */
		width: 100%;
	}
	.navbar_box{
		display: flex;
		align-items: center;
		justify-items: center;
		height: 40px;
		box-shadow: -2px 3px 5px 0 rgba(0, 0, 0, 0.1);
		z-index: 1;
		width: 90%;
		background-color: #f6f6f6;
		border-radius: 50px;
	}
	.box_item{
		width:50%;
		display: flex;
		align-items: center;
		justify-content: center;
		height: 30px;
		font-size: 15px;
		color: #8b8b8b;
		margin: 0 5px;
	}
	.active-item{
		width:50%;
		display: flex;
		align-items: center;
		justify-content: center;
		height: 30px;
		font-size: 15px;
		color: #009688;
		border-radius: 40px;
		background-color: #ffffff;
		margin: 0 5px;
		font-weight: 500;
	}
	.content-box-outside{
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	.kong{
		font-size: 26px;
		margin: 20px;
		font-weight: 800;
		background:-webkit-linear-gradient(top, #000000, #aeaeae);/*设置线性渐变*/
		/*为了支持更多的浏览器*/
		-webkit-background-clip: text;/*背景被裁剪到文字*/
		-webkit-text-fill-color: transparent;/*设置文字的填充颜色*/
	}
	.content-box{
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	.date-box{
		font-size: 20px;
		font-weight: 800;
		color: #292929;
		margin-top: 10px;
		display: flex;
	}
	.day_progress_outside{
		height: 370px;
		width: 80%;
		border-radius: 25px;
		border-style: solid;
		border-width: 1px;
		border-color: #cccccc;
		margin-top: 20px;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.day_progress{
		width: 170px;
		margin-top: 15px;
		position: relative;
	}
	.circle_1{
		position: absolute;
		top: 0;
	}
	.circle_2{
		position: absolute;
		top: -157px;
		left: 12px;
	}
	.circle_3{
		position: absolute;
		top: -289px;
		left: 24px;
	}
	.circle_4{
		position: absolute;
		top: -396px;
		left: 36px;
	}
	.description{
		height: 120px;
		width: 85%;
		border-radius: 30px;
		border-style: solid;
		border-width: 1px;
		border-color: #cccccc;
		margin-top: -340px;
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 10px;
	}
	.description_item{
		width: 85%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 15px;
		font-weight: 600;
		color: #191919;
		margin: 5px 0;
	}
	.description_item_left{
		width: 35%;
		display: flex;
		justify-content: flex-start;
		align-items: center;
	}
	.description_item_left_color{
		height: 10px;
		width: 10px;
		border-radius: 2px;
		margin: 5px;
	}
	.description_item_right{
		width: 20%;
	}
	.item-box-outside{
		
	}
	.item-header{
		display: flex;
		text-align: left;
		font-size: 23px;
		font-weight: 800;
		margin: 25px 0 0 10px;
	}
	.item-header-text{
		background:-webkit-linear-gradient(top, #000000, #aeaeae);/*设置线性渐变*/
		/*为了支持更多的浏览器*/
		-webkit-background-clip: text;/*背景被裁剪到文字*/
		-webkit-text-fill-color: transparent;/*设置文字的填充颜色*/
	}
	.item-box{
		width: 88%;
		margin: 15px;
	}
	.item-box-inside{
		background: white;
		box-shadow: -1px 1px 5px 1px rgba(0, 0, 0, 0.1), -1px 2px 1px 0 rgba(255, 255, 255) inset;
		margin: 8px; 
		text-align: left;
	}
	.item-content{
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
	.item-content-TextBox{
		margin: -8px 20px 0;
		display: flex;
		flex-direction: column;
	}
	.item-content-Text{
		font-size: 13px;
	}
	.week_img_outside{
		height: 400px;
		width: 80%;
		border-radius: 25px;
		border-style: solid;
		border-width: 1px;
		border-color: #cccccc;
		margin-top: 20px;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.week_description{
		width: 90%;
		margin-top: 10px;
	}
	.week_description_top{
		font-size: 30px;
		font-weight: 800;
		background:-webkit-linear-gradient(top, #000000, #aeaeae);/*设置线性渐变*/
		/*为了支持更多的浏览器*/
		-webkit-background-clip: text;/*背景被裁剪到文字*/
		-webkit-text-fill-color: transparent;/*设置文字的填充颜色*/
	}
	.week_description_right{
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: flex-end;
	}
	.line{
		position: absolute;
		display: flex;
		justify-content: space-evenly;
		width: 95%;
		align-items: center;
		height: 20px;
	}
	.line-text{
		color: #bbbbbb;
		font-size: 12px;
	}
	.line-line{
		width: 90%;
		height: 1px;
		background-color: #bbbbbb;
	}
	.bubble-box {
		position: relative;
		width: 110%;
		padding: 5px;
		background-color: #009688;
		border-radius: 10px;
		top: 0px;
	}
	
	.bubble-content {
		color: #f1f1f1;
		font-size: 12px;
		display: flex;
		justify-content: center;
	}
	
	.bubble-box::before {
		content: '';
		position: absolute;
		bottom: -5px; /* 尾巴位置 */
		left: 50%; /* 尾巴水平居中 */
		margin-left: -10px; /* 尾巴水平偏移 */
		width: 0;
		height: 0;
		border-style: solid;
		border-width: 10px 10px 0;
		border-color: #009688 transparent;
	}
	.item-box_week{
		width: 88%;
		margin: 50px 15px;
		border-width: 0 0 0 2px;
		border-style: dashed;
		border-color: #CCCCCC;
	}
	.item-box-inside_week{
		background: white;
		box-shadow: -1px 1px 5px 1px rgba(0, 0, 0, 0.1), -1px 2px 1px 0 rgba(255, 255, 255) inset;
		margin: 8px; 
		text-align: left;
		position: relative;
	}
	.item-box-inside_week_flag{
		background: white;
		box-shadow: -1px 1px 5px 1px rgba(0, 0, 0, 0.1), -1px 2px 1px 0 rgba(255, 255, 255) inset;
		margin: 40px 8px 8px 8px; 
		text-align: left;
		position: relative;
	}
	.item-content_week_time{
		display: flex;
		position: absolute;
		z-index: 99;
		top: -28px;
		left: -19px;
		color: #292929;
		font-weight: 500;
	}
	.item-content_week_time_icon{
		background-color: white;
	}
	.item-content_week_time_time{
		
	}
	.br{/*留空*/
		height: 150px;
	}
</style>
