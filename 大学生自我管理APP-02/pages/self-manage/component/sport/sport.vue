<template><!-- 顶层状态栏：全部、今天 √--><!--成就系统：单个任务的奖励；总点赞数奖励-->
	<view class="box">
		<view class="todo-header">
			<!-- 状态栏左侧 -->
			<view class="todo-header_left">
				<text class="active-text">{{ text }}</text>
				<text class="todo-number">{{ ListData.length }}</text>
				条
			</view>
			<!-- 状态栏右侧 -->
			<view class="todo-header_right" v-for="(item, index) in tabList" :key="index">
				<view class="todo-header_right-item" :class="{ 'active-tab': tabIndex == index }" @click="tabClick(item, index)">{{ item }}</view>
			</view>
		</view>
		<view class="todo_box">
			<uni-swipe-action  v-for="(item,index) in ListData" :key="item.title" > <!--左滑完成、删除√，点击查看详情√，详情可修改-->	<!--可计时,计时结束时完成一次该运动-->
				<uni-swipe-action-item :right-options="options" :show="right" :auto-close="false"  @click="bindClick($event,index)">
					<view :style="[{background:((item.intensity=='高')?'#ffa5ab':((item.intensity=='中')?'#ffd0b5':'#e8fdfd'))}]" class="todo_item" :class="{'todo_finish':item.finish}" @click="to_detail(index)">  
						<view class="todo_item_left">
							<view class="todo_checkbox">
								<view v-if="!item.finish&&item.times" style="color: #8c8c8c;">{{item.times-item.finish_times}}</view>
							</view>
							<view class="todo_title"> {{item.title}}</view>
						</view>
						<view class="todo_item_right">
							<view class="todo_tiem_cycle">{{item.cycle}}</view>
							<view class="todo_item_achieve" v-if="item.all_finish_times">
								<image class="img" src="../../../../static/点赞(透明).png" mode="widthFix"></image>
								
								<view class="todo_item_achieve_number">{{item.all_finish_times}}</view>
							</view>
						</view>
						
					</view>
				</uni-swipe-action-item>
			</uni-swipe-action>
		</view>
		<view class="select_pop">
			<view class="select_box" v-if="activePopUp">
				<view class="select_item_1" @click="to_add">添加</view> <!--添加计划/记录-->
				<view class="select_item_2" @click="to_achieve">奖励</view>
				<!--<view class="select_item_3" @click="to_analyse">统计</view>-->
			</view>
			<view class="button" @click="popUp"></view>
		</view>
		<view class="br"></view>
	</view>
</template>

<script>
	// import sendbus from '../eventbus.js';
	// import { ref } from "vue";
	export default {
		name:"sport",
		// components:{sendbus},
		data() {
			return {
				options:[
					{
						text:'完成',
						style:{
							backgroundColor:'#3ebf69'
						}
					},
					{
						text:'删除',
						style:{
							backgroundColor:'#ff9ea0'
						}
					}
				],
				week:["周日","周一","周二","周三","周四","周五","周六"],
				change: false,		//是否到新的一天
				activePopUp: false,
				today:'',
				today_weekday: '',
				text: '全部',
				tabList: ['全部','今天'],
				tabIndex: 1,
				list:[{title: '跳绳', period_free: false, period:true, note:'',intensity:'低', times:3, finish: false, finish_times:0, all_finish_times:10, finish_day:'', cycle:'周一 周二 周五',timesForAward:50, award:'吃火锅！'}, 
					{title: '跑步',period_free: true, period:false, note:'', intensity:'中', times: '', finish: false, finish_times:0, all_finish_times:0, finish_day:'', cycle:'自由', timesForAward:20, award:'吃烤肉'},
					{title: '打球', period_free: false, period:true, note:'',intensity:'高', times:1, finish: false, finish_times:0, all_finish_times:5, finish_day:'', cycle:'周日 周二 周四 周六',timesForAward:10, award:'吃烧烤！'},
					{title: '仰卧起坐', period_free: false, period:true, note:'一次50个',intensity:'中', times:2, finish: false, finish_times:0, all_finish_times:10, finish_day:'', cycle:'每天',timesForAward:30, award:'喝奶茶！'}],
				now_list:[//{title: '跳绳', period_free: false, period:true, note:'',intensity:'', times:2, finish: false, finish_times:0, cycle:'周一 周三 周五',},
				// 	{title: '跑步',period_free: false, period:true, note:'', intensity:'', times:1, finish: false, finish_times:0, cycle:''}
				],
				finish_list:[{title: '跳绳', period_free: false, period:true, note:'',intensity:'低', times:3, finish: false, finish_times:0, all_finish_times:10, finish_day:'', cycle:'周一 周二 周五',timesForAward:50, award:'吃火锅！'}, 
					{title: '打球', period_free: false, period:true, note:'',intensity:'高', times:1, finish: false, finish_times:0, all_finish_times:13, finish_day:'', cycle:'周日 周二 周四 周六',timesForAward:10, award:'吃烧烤！'},
					{title: '仰卧起坐', period_free: false, period:true, note:'一次50个',intensity:'中', times:2, finish: false, finish_times:0, all_finish_times:10, finish_day:'', cycle:'每天',timesForAward:30, award:'喝奶茶！'}],
			};
		},
		computed:{
			ListData(){
				var that=this;
				let list=[];
				that.getNowTime();
				
				that.list.forEach(v=>{
					let flag=0;
					
					if(that.change){
						v.finish_times=0;
					}
					if(v.cycle=='每天'||v.period_free){
						flag=1;
					}
					else{
						let s=v.cycle.split(' ');
						//console.log(s);
						s.forEach((u=>{
							if(u==that.today_weekday){
								flag=1;
							}
						}))
					}
					if(flag==1){
						list.push(v);
					}
				})
				if(that.tabIndex==1){
					that.now_list=list;
					console.log(that.now_list);
					return list;
				}
				else{
					that.now_list=that.list;
					console.log(that.now_list);
					return that.list;
				}
				
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
				
				let cc=y+'/'+this.addTimes(m)+'/'+this.addTimes(d);
				if(this.today!=cc){
					this.change=true;
					this.today_weekday=this.week[day];
					this.today=y+'/'+this.addTimes(m)+'/'+this.addTimes(d);
				}
				else{
					this.change=false;
				}
				
				console.log(this.today,this.today_weekday);
			},
			tabClick(item, index) {
				this.text = item;
				this.tabIndex = index;
			},
			bindClick(e,index){
				var that=this;
				console.log(e);
				if(e.content.text=="完成"){
					that.finish_sport(index);
					uni.setStorage({ //存入Storage
						key: 'sportGoalSuccess', //自己取个名字
						data: { //存的数据可以是很多条
								
								content:that.ListData[index].title,
								
					
						},
					
						success() {
							console.log('sportGoalSuccess储存成功');
						}
					});
				}
				if(e.content.text=="删除"){
					that.delete_sport(index);
				}
			},
			popUp(){//弹出
				if(this.activePopUp){
					this.activePopUp=false;
				}
				else{
					this.activePopUp=true;
				}
			},
			to_add(){//添加新项目
				var that=this;
				uni.navigateTo({
					url:'/pages/self-manage/sport/add_new_sport',
					events:{
						addNewSport(data){
							let obj={
								title: data.title,
								period_free: data.period_free,
								period: data.period,
								note: data.note,
								intensity: data.intensity,
								times: data.times,
								cycle: data.cycle,
								finish: false,
								finish_times: 0,
								all_finish_times: 0,
								finish_day: '',
								timesForAward:data.timesForAward,
								award:data.award,
							}
							that.list.push(obj);
							//that.now_list=that.list;
						}
					}
				})
				this.activePopUp=false;
			},
			to_achieve(){
				var that=this;
				uni.navigateTo({
					url:'/pages/self-manage/sport/award',
					success:function(res){
						res.eventChannel.emit('toaward',that.finish_list);
					}
				})
			},
			to_analyse(){//统计
				var that=this;
				uni.navigateTo({
					url:'/pages/self-manage/sport/sport_analyse',
					success:function(res){
						res.eventChannel.emit('toanalyse',that.finish_list);
					}
				})
			},
			finish_sport(index){  //完成项目
				var that=this;
				//console.log(index);
				if(this.now_list[index].times>1&&this.now_list[index].finish_times<this.now_list[index].times-1){
					uni.showModal({
						title:'提示',
						content: '是否完成一次'+that.now_list[index].title+'？',
						success: function(res){
							if(res.confirm){
								
								that.now_list[index].finish_day=that.today;
								
								
								var i=that.finish_list.find(item=>(item.title==that.now_list[index].title)&&(item.finish_day==that.now_list[index].finish_day));
								if(i){
									i.finish_times=i.finish_times+1;
									i.all_finish_times=i.all_finish_times+1;
									console.log('完成项',i);
									uni.setStorage({
										key:'plus_finishTime',
										data:{
											all_finish_times:i.all_finish_times
										}
									})
								}
								else{
									that.now_list[index].finish_times=that.now_list[index].finish_times+1;
									that.now_list[index].all_finish_times=that.now_list[index].all_finish_times+1;
									that.finish_list.push(that.now_list[index]);
									
								}
								
								console.log('完成表',that.finish_list);
								
								uni.showToast({
									title:'完成一次'+that.now_list[index].title+'！',
									icon:'none',
								})
							}
						}
					})
				}
				else{
					if(!this.now_list[index].finish){
						uni.showModal({
							title:'提示',
							content:'是否完成'+that.now_list[index].title+'？',
							success:function(res){
								if(res.confirm){
									that.now_list[index].finish=true;
									that.now_list[index].finish_day=that.today;
									var i=that.finish_list.find(item=>(item.title==that.now_list[index].title)&&(item.finish_day==that.now_list[index].finish_day));
									if(i){
										i.finish_times=i.finish_times+1;
										i.all_finish_times=i.all_finish_times+1;
										console.log('完成项',i);
									}
									else{
										that.now_list[index].finish_times=that.now_list[index].finish_times+1;
										that.now_list[index].all_finish_times=that.now_list[index].all_finish_times+1;
										that.finish_list.push(that.now_list[index]);
									}
									console.log('完成表',that.finish_list);
									console.log(that.now_list[index].all_finish_times);
									console.log(that.now_list[index].timesForAward);
									if(that.now_list[index].timesForAward!=null){
										var Divisor_result=(that.now_list[index].all_finish_times)/(that.now_list[index].timesForAward);
										var differNUM=that.now_list[index].timesForAward-that.now_list[index].all_finish_times;
										console.log("累计完成次数与目标次数占比："+Divisor_result);
										if(Divisor_result>=0.8){
											console.log("还差1/5就可以实现目标！");
											
											uni.setStorage({ //存入Storage
												key: 'GoingToAchieveGoal', //自己取个名字
												data: { //存的数据可以是很多条
														
														
														differnumber:differNUM,
														timesForAward:that.now_list[index].timesForAward,
														content:that.now_list[index].title,
											
												},
											
												success() {
													console.log('GoingToAchieveGoal储存成功');
												}
											});
										}
										
										
									}
									uni.showToast({
										title:'今天的'+that.now_list[index].title+'已完成！',
										icon:'none',
									})
								}
							}
						})
					}
				}
			},
			delete_sport(index){
				var that=this;
				let l1=[];
				let l2=[];
				var j=that.list.findIndex(item=>(item.title==that.now_list[index].title));
				for(var i=0;i<that.now_list.length;i++){
					if(i!=index){
						l1.push(that.now_list[i]);
					}
				}
				that.now_list=l1;
				//console.log('now_list',that.now_list);
				for(var i=0;i<that.list.length;i++){
					if(i!=j){
						l2.push(that.list[i]);
					}
				}
				that.list=l2;
				//console.log('list',that.list);
			},
			to_detail(index){
				var that=this;
				uni.navigateTo({
					url:'/pages/self-manage/sport/to_detail',
					success:function(res){
						let item=that.now_list[index];
						//console.log(item);
						res.eventChannel.emit('todetail',that.now_list[index]);
						
						that.now_list[index]=item;
					}
				})
			},
			
		}
	}
</script>

<style>
	.box{
		/* height: 100%; */
	}
	.todo_box{
		padding-top: 45px;
	}
	.todo-header {
		display: flex;
		align-items: center;
		padding: 0 0px;
		font-size: 12px;
		color: #333333;
		height: 45px;
		box-shadow: -2px 3px 5px 0 rgba(0, 0, 0, 0.1);
		background-color: #ffffff;
		position: fixed;
		z-index: 1;
		width: 100%;
	}
	.todo-header_left {
		/*width: 100%;*/
		padding-left: 20px;
		padding-right: 52%;
	}
	.active-text {
		font-size: 14px;
		color: #3ebf69;
		padding-right: 10px;
		font-weight: bold;
	}
	.todo-header_right {
		display: flex;
		flex-shrink: 0;
	}
	.todo-header_right-item {
		padding: 0 5px;
	}
	.active-tab {
		color: #3ebf69;
		font-weight: bold;
		font-size: 18px;
	}
	.todo-number{
		margin-right:3px;
		font-size: 20px;
	}
	.todo_item{
		position: relative;
		display: flex;
		align-items: center;
		padding: 15px;
		margin: 15px;
		border-radius: 10px;
		height: 30px;
		/* background: #e3fde4; */
		box-shadow: -1px 1px 5px 1px rgba(0, 0, 0, 0.1), -1px 2px 1px 0 rgba(255, 255, 255) inset;
		justify-content: space-between;
	}
	.todo_item_left{
		display: flex;
		align-items: center;
		font-size: 14px;
		color: #085432;
	}
	.todo_checkbox{
		width: 20px;
		height: 20px;
		border-radius: 50%;
		background: #ffffff;
		box-shadow: 0 0 5px 1px rgba(0, 0, 0, 0.1);
		margin-right: 10px;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.todo_item_right{/*  */
		display: flex;
		align-items: center;
		/* height: 100%; */
	}
	.todo_tiem_cycle{
		color: #8c8c8c;
		font-size: 14px;
		align-items: center;
		justify-content: center;
		
	}
	.todo_item_achieve{
		margin-left: 10px;
		/* background-color: #085432; */
		/* vertical-align: middle; */
		width: 25px;
		height: 30px;
		/* padding-top: 20%; */
		/* margin-top: 30%;
		margin-bottom: 30%; */
		display: flex;
		
		flex-direction: column;
		align-items: center;
		justify-content: flex-start;
	}
	.todo_item_achieve_number{
		position: absolute;
		top: 21px;
		margin: 0;
		color: #8c8c8c;
		font-size: 13px;
		height: 10px;
		/* background-color: #ffff7f; */
		text-align: start;
		align-items: flex-start;
		flex-shrink: 5;
	}
	.img{
		/* height: 10px; */
		width: 20px;
		/* background-color: #ffffff; */
	}
	.todo_finish .todo_checkbox {
		position: relative;
		background: #eee;
	}
	.todo_finish .todo_checkbox::after {
		content: '';
		position: absolute;
		width: 10px;
		height: 10px;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		border-radius: 50%;
		margin: auto;
		background: #8c8c8c;
		box-shadow: 0 0 2px 0px rgba(0, 0, 0, 0.2) inset;
	}
	.todo_finish .todo_title {
		color: #999;
	}
	.todo_finish.todo_item:before {
		content: '';
		position: absolute;
		top: 0;
		bottom: 0;
		left: 40px;
		right: 10px;
		height: 2px;
		margin: auto 0;
		background: #8c8c8c;
	}
	.todo_finish.todo_item:after {
		background: #ccc;
	}
	.select_pop{
		display: flex;
		align-items: center;
		/* width: 40%;
		height: 30%; */
		/* position: fixed;
		bottom: 40px;
		right: 30px; */
		/* z-index: -1; */
	}
	.select_box{
		width: 70%;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		/* z-index: -1; */
	}
	.select_item_1{
		display: flex;
		align-items: center;
		justify-content: center;
		margin: 0 auto;
		width: 50px;
		height: 50px;
		position: fixed;
		right: 22%;
		bottom: 17%;
		border-radius: 50%;
		background-color: #d9f5db;
		box-shadow: -1px 1px 5px 2px rgba(0, 0, 0, 0.1), -1px 1px 1px 0 rgba(255, 255, 255) inset;
		/* z-index: 99; */
		
	}
	.select_item_2{
		display: flex;
		align-items: center;
		justify-content: center;
		margin: 0 auto;
		width: 50px;
		height: 50px;
		position: fixed;
		/*right: 30%;
		bottom: 10%;*/
		right: 22%;
		bottom: 3%;
		border-radius: 50%;
		background-color: #d9f5db;
		box-shadow: -1px 1px 5px 2px rgba(0, 0, 0, 0.1), -1px 1px 1px 0 rgba(255, 255, 255) inset;
		/* z-index: 99; */
	}
	.select_item_3{
		display: flex;
		align-items: center;
		justify-content: center;
		margin: 0 auto;
		width: 50px;
		height: 50px;
		position: fixed;
		right: 22%;
		bottom: 3%;
		border-radius: 50%;
		background-color: #d9f5db;
		box-shadow: -1px 1px 5px 2px rgba(0, 0, 0, 0.1), -1px 1px 1px 0 rgba(255, 255, 255) inset;
		/* z-index: 99; */
	}
	.button{
		position: fixed;
		right: 10%;
		bottom: 10%;
		margin: 0 auto;
		width: 50px;
		height: 50px;
		border-radius: 50%;
		background-color: #d9f5db;
		box-shadow: -1px 1px 5px 2px rgba(0, 0, 0, 0.1), -1px 1px 1px 0 rgba(255, 255, 255) inset;
		/* z-index: 99; */
	}
	.br{/*留空*/
		height: 250px;
	}
</style>