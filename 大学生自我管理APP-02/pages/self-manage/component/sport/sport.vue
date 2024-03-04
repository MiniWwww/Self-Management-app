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
			<uni-swipe-action v-for="(item,index) in ListData" :key="item.title" > <!--左滑完成、删除√，点击查看详情√，详情可修改-->	<!--可计时,计时结束时完成一次该运动-->
				<view class="run" v-if="item.timesForAward">
					<image v-if="!item.getAward" class="run_img" :style="{left: item.position_left}"
							:src="item.run_img" mode="aspectFill" :animation="item.run_animationData"></image>
					<image v-if="!item.getAward" class="dst_img" src="../../../../static/flag.png" mode="aspectFill"></image>
					<image v-if="item.getAward" class="dst_img" src="../../../../static/getAward.png" mode="aspectFill"></image>
				</view>
				<uni-swipe-action-item :right-options="options" :show="right" :auto-close="false"  @click="bindClick($event,item,index)">
					<view class="todo_item" :class="{'todo_finish':item.finish}" @click="to_detail(item,index)">
						<view class="item-head" :style="[{background:((item.intensity=='高')?'#e9564c':((item.intensity=='中')?'#f6eda4':'#66c0a4'))}]"></view>
						<view class="item-icon">
							<uni-icons type="vip-filled" size="24"></uni-icons>
						</view>
						<view class="todo-item_content">
							<view class="todo_item_left">
								<view class="todo_title"> {{item.title}}</view>
								<view class="todo_item_cycle">{{item.cycle}}</view>
							</view>
							<view class="todo_item_right">
								<view class="todo_item_right_content" v-if="item.finish_times||today_list.includes(item)">
									<view class="todo_item_right_text">今日完成：</view>
									<view class="todo_item_right_number">
										{{item.finish_times}}
										<view v-if="today_list.includes(item)&&item.times">/{{item.times}}</view>
									</view>
								</view>
								<view class="todo_item_right_content">
									<view class="todo_item_right_text">总共完成：</view>
									<view class="todo_item_right_number">{{item.all_finish_times}}/{{item.timesForAward}}</view>
								</view>
							</view>
						</view>
						
					</view>
				</uni-swipe-action-item>
			</uni-swipe-action>
		</view>
		<view class="select_pop">
			<uni-fab ref="fab" :pattern="fabpattern" :content="fabcontent" :horizontal="'right'" :vertical="'bottom'"
				:direction="'horizontal'" @trigger="fabtrigger" @fabClick="fabClick" />
				
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
				successOnceList:[],
				run_animationData: {},
				item_width: 0,
				week:["周日","周一","周二","周三","周四","周五","周六"],
				change: false,		//是否到新的一天
				activePopUp: false,
				tetxShow: false,//控制打开按钮的动画
				today:'',
				today_weekday: '',
				text: '全部',
				tabList: ['全部','今天'],
				tabIndex: 1,
				fabpattern: {
					color: '#7A7E83',
					backgroundColor: '#fff',
					selectedColor: '#009688',
					buttonColor: '#009688',
					iconColor: '#fff'
				},
				fabcontent: [{
						iconPath: '/static/addevent.png',
						selectedIconPath: '/static/addeventSelected.png',
						text: '添加',
						active: false
					},
					{
						iconPath: '/static/addgoal.png',
						selectedIconPath: '/static/addgoalSelected.png',
						text: '奖励',
						active: false
					},
					{
						iconPath: '/static/统计.png',
						selectedIconPath: '/static/addgoalSelected.png',
						text: '统计',
						active: false
					}
				],
				list:[{
						title: '跳绳', 
						period_free: false, 
						period:true, 
						note:'',
						intensity:'低', 
						times:3, 
						finish: false, 
						finish_times:0, 
						all_finish_times:49, 
						finish_day:'', 
						cycle:'周一 周二 周五',
						timesForAward:50, 
						award:'吃火锅！',
						run_animationData: {},
						position_left: 20,
						run_img: "../../../../static/run.png",
						getAward: false,
						}, 
						{title: '跑步',
						period_free: true, 
						period:false, 
						note:'', 
						intensity:'中', 
						times: '', 
						finish: false, 
						finish_times:0, 
						all_finish_times:0, 
						finish_day:'', 
						cycle:'自由', 
						timesForAward:20, 
						award:'吃烤肉',
						run_animationData: {},
						position_left: 20,
						run_img: "../../../../static/run.png",
						getAward: false,
						},
						{title: '打球', period_free: false, period:true, note:'',intensity:'高', times:1, finish: false, finish_times:0, all_finish_times:5, finish_day:'', cycle:'周日 周二 周四 周六',timesForAward:10, award:'吃烧烤！', run_animationData: {}, position_left: 20, run_img: "../../../../static/run.png",getAward: false,},
						{title: '仰卧起坐', period_free: false, period:true, note:'一次50个',intensity:'中', times:2, finish: false, finish_times:0, all_finish_times:10, finish_day:'', cycle:'每天',timesForAward:30, award:'喝奶茶！', run_animationData: {}, position_left: 20, run_img: "../../../../static/run.png",getAward: false,}],
				now_list:[//{title: '跳绳', period_free: false, period:true, note:'',intensity:'', times:2, finish: false, finish_times:0, cycle:'周一 周三 周五',},
				// 	{title: '跑步',period_free: false, period:true, note:'', intensity:'', times:1, finish: false, finish_times:0, cycle:''}
				],
				today_list: [],
				//finish_list把一天所有完成的放进去，包括同一项在不同一天完成
				finish_list:[/* {title: '跳绳', period_free: false, period:true, note:'',intensity:'低', times:3, finish: false, finish_times:0, all_finish_times:10, finish_day:'', cycle:'周一 周二 周五',timesForAward:50, award:'吃火锅！'}, 
					{title: '打球', period_free: false, period:true, note:'',intensity:'高', times:1, finish: false, finish_times:0, all_finish_times:13, finish_day:'', cycle:'周日 周二 周四 周六',timesForAward:10, award:'吃烧烤！'},
					{title: '仰卧起坐', period_free: false, period:true, note:'一次50个',intensity:'中', times:2, finish: false, finish_times:0, all_finish_times:10, finish_day:'', cycle:'每天',timesForAward:30, award:'喝奶茶！'} */],
			};
		},
		computed:{
			ListData(){
				var that=this;
				let list=[];
				that.getNowTime();
				//console.log("change:",this.change);
				that.activePopUp=false;
				that.list.forEach(v=>{
					let flag=0;
					
					if(that.change){
						v.finish_times=0;
						v.finish=false;
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
					that.today_list=list;
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
		onBackPress() {
			if (this.$refs.fab.isShow) {
				this.$refs.fab.close()
				return true
			}
			return false
		},
		created() {
			console.log("这是sport页面的created函数");
			var that=this;
			uni.getStorage({
				key:'sportList',
				success(res) {
					console.log('收到前的List：',that.list);
					console.log('收到sportList',res.data);
					that.list=res.data;
					console.log('收到后的List：',that.list);
					that.list.forEach(v=>{
						that.run_recover(v);
						const animation = uni.createAnimation();
						animation.translateX(v.position_left).step({duration: 0,});
						v.run_animationData=animation.export()
					});
				}
			})
			uni.getStorage({
				key:'plus_finishTime',
				success(res) {
					console.log('finishList',res.data.finishList);
					that.finish_list=res.data.finishList;
				}
			})
			
			// let finishList=uni.getStorageSync('plus_finishTime').finishList
			// let list=uni.getStorageSync('plus_finishTime').list
			// if(List){
			// 	console.log('更新ListData')
			// 	that.list=list;
			// 	that.finish_list=finishList;
			// }
			
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
				//console.log(cc);
				let livetime='';
				let that=this;
				uni.getStorage({
					key:'liveTime',
					success(res) {
						livetime=res.data;
						console.log('liveTime',livetime);
						if(cc!=livetime){
							that.change=true;
							that.today_weekday=that.week[day];
							that.today=y+'/'+that.addTimes(m)+'/'+that.addTimes(d);
						}
						else{
							that.change=false;
							that.today_weekday=that.week[day];
							that.today=y+'/'+that.addTimes(m)+'/'+that.addTimes(d);
						}
						console.log("change:",that.change);
						console.log(that.today,that.today_weekday);
					}
				})
				
				
			},
			tabClick(item, index) {
				this.text = item;
				this.tabIndex = index;
			},
			bindClick(e,item,index){
				var that=this;
				console.log(e);
				if(e.content.text=="完成"){
					that.finish_sport(item,index);
					
					
				}
				if(e.content.text=="删除"){
					that.delete_sport(index);
				}
			},
			fabtrigger(e) {
				var that = this;
				this.fabcontent[e.index].active = !e.item.active
				if (e.index == 0){
					this.to_add()
				}
				else if(e.index == 1){
					this.to_achieve();
				}
				else if(e.index == 2){
					this.to_analyse();
				}
				this.fabcontent[e.index].active = !e.item.active;
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
								run_animationData: {},
								position_left: 20,
								run_img: "../../../../static/run.png",
								getAward: false,
							}
							that.list.push(obj);
							uni.setStorage({
								key:'sportList',
								data:that.list,
								success() {
									console.log('运动数组存储成功！');
								}
							});
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
				that.activePopUp=false;
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
			finish_sport_action(item,index){//完成项目时执行的动作
				var that=this;
				that.now_list[index].finish_day=that.today;
				that.now_list[index].finish_times=that.now_list[index].finish_times+1;
				that.now_list[index].all_finish_times=that.now_list[index].all_finish_times+1;
				const eventIndex = that.finish_list.findIndex(event => (event.title === that.now_list[index].title)
															&&(event.finish_day===that.now_list[index].finish_day)
															&&(event.award===that.now_list[index].award));
				if (eventIndex !== -1) {
					that.finish_list[eventIndex].finish_times = that.now_list[index].finish_times;
					that.finish_list[eventIndex].all_finish_times = that.now_list[index].all_finish_times;
				}
				else{
					that.finish_list.push(that.now_list[index]);
				}
				if(item.all_finish_times<=item.timesForAward){
					item.run_img = "../../../../static/run.gif";
					that.$set(that,'now_list', that.now_list);
					setTimeout(()=>{
						that.run(item,index);
					},200)
					console.log('完成表',that.finish_list);
				}
				else{
					uni.setStorage({
						key:'sportList',
						data:that.list,
						success() {
							console.log('运动数组存储成功！');
						}
					});
					that.saveFinishList();
				}
				//差1/5时
				//console.log('完成表',that.finish_list);
				//console.log(that.now_list[index].all_finish_times);
				//console.log(that.now_list[index].timesForAward);
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
			},
			finish_sport(item,index){  //完成项目
				var that=this;
				//console.log(index);
				//finish标记的是今天是否完成
				if(that.now_list[index].period&&that.now_list[index].finish){
					uni.showModal({
						title:'提示',
						content: '您今天的'+that.now_list[index].title+'已经完成啦！是否又完成了一次'+that.now_list[index].title+'呢？请注意休息哦',
						success: function(res){
							if(res.confirm){
								that.finish_sport_action(item,index);
								that.saveGoalSuccesOnce(item,index);
								uni.showToast({
									title:'完成一次'+that.now_list[index].title+'！',
									icon:'none',
								})
							}
						}
					})
				}
				else if(that.now_list[index].period_free||(that.now_list[index].times>1&&that.now_list[index].finish_times<that.now_list[index].times-1)){
					uni.showModal({
						title:'提示',
						content: '是否完成一次'+that.now_list[index].title+'？',
						success: function(res){
							if(res.confirm){
								that.finish_sport_action(item,index);
								that.saveGoalSuccesOnce(item,index);
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
									that.finish_sport_action(item,index);
									that.saveGoalSuccesOnce(item,index);
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
			saveGoalSuccesOnce(item,index){
				var that=this;
				
				const actionDone = uni.getStorageSync('sportActionDone');
				console.log('接受到sportActionDone了吗',actionDone)
				        if (actionDone) {
				            // 执行需要的动作
				            	that.successOnceList=[];
				            	console.log('that.successOnceList是否置空：',that.successOnceList);
								// 执行完动作后，清除'sportActionDone'标记
								uni.removeStorageSync('sportActionDone');
				
				        }
						
				
				console.log('that.successOnceList前：',that.successOnceList);
				that.successOnceList.push(that.ListData[index].title);
				console.log('that.successOnceList后：',that.successOnceList);
				uni.setStorage({ //存入Storage
				key: 'sportGoalSuccess', //自己取个名字
				data: { //存的数据可以是很多条
						contentList:that.successOnceList,
				},
								
				success() {
					console.log('sportGoalSuccess储存成功');
				}
				});
			},
			saveFinishList(){
				var that=this
				uni.setStorage({
					key:'plus_finishTime',
					data:{
						finishList:that.finish_list
					},
					success() {
						console.log('次数更新后的数组存储成功！')
					}
				})
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
				uni.setStorage({
					key:'sportList',
					data:that.list,
					success() {
						console.log('运动数组存储成功！');
					}
				});
			},
			to_detail(item,index){
				var that=this;
				uni.navigateTo({
					url:'/pages/self-manage/sport/to_detail',
					events:{
						changeSportItem(data){
							//console.log(data);
							that.now_list[index]=data;
							if(that.now_list[index].all_finish_times<that.now_list[index].timesForAward){
								that.now_list[index].getAward=false;
								//获取节点宽度
								let percent = that.now_list[index].all_finish_times/that.now_list[index].timesForAward;
								if(percent>=1){
									percent=1
								}
								let query = uni.createSelectorQuery();
								query.select('.todo_item').boundingClientRect(rect => {
									let item_width = rect.width;
									let l = item_width*percent*0.84;
									const animation = uni.createAnimation();
									animation.translateX(l).step({duration: 0,});
									that.now_list[index].run_animationData=animation.export();
									that.now_list[index].position_left = that.now_list[index].run_animationData.actions[that.now_list[index].run_animationData.actions.length-1].animates[0].args[0]
								})
								.exec();
							}
							else{
								that.now_list[index].getAward=true;
							}
							uni.setStorage({
								key:'sportList',
								data:that.list,
								success() {
									console.log('运动数组存储成功！');
								}
							});
						}
					},
					success:function(res){
						let item=that.now_list[index];
						//console.log(item);
						res.eventChannel.emit('todetail',that.now_list[index]);
						
						that.now_list[index]=item;
					}
				})
			},
			//小人奔跑动画
			run(item,index){
				var that=this;
				let percent_before = (item.all_finish_times-1)/item.timesForAward;
				let percent = item.all_finish_times/item.timesForAward;
				if(percent>=1){
					percent=1
				}
				//获取节点宽度
				let query = uni.createSelectorQuery();
				query.select('.todo_item').boundingClientRect(rect => {
					let item_width = rect.width;
					let before = item_width*percent_before*0.84;//移动之前的位置
					let l = item_width*percent*0.84-before;//要移动的距离
					const animation = uni.createAnimation();
					animation
						.translateX(before) // 0%
						.translateX(l*0.2+before) // 20%
						.step({duration: 0,});
					animation.translateX(l*0.3+before).step({duration: 200,}); // 30%
					animation.translateX(l*0.4+before).step({duration: 200,}); // 40%
					animation.translateX(l*0.5+before).step({duration: 200,}); // 50%
					animation.translateX(l*0.6+before).step({duration: 200,}); // 60%
					animation.translateX(l*0.7+before).step({duration: 200,}); // 70%
					animation.translateX(l*0.8+before).step({duration: 200,}); // 80%
					animation.translateX(l*0.9+before).step({duration: 200,}); // 90%
					animation.translateX(l+before).step(); // 100%
					item.run_animationData = animation.export();
					item.position_left = item.run_animationData.actions[item.run_animationData.actions.length-1].animates[0].args[0]
					//console.log("完成的：",item.title,item.position_left);
					//console.log("1");
					uni.setStorage({
						key:'sportList',
						data:that.list,
						success() {
							console.log('运动数组存储成功！');
							//console.log("2");
						}
					});
					that.saveFinishList();
					setTimeout(()=>{
						that.run_recover(item);
					},2000);
					//console.log(item.run_animationData)
					//console.log(item.run_animationData.actions[item.run_animationData.actions.length-1].animates[0].args[0]);
				})
				.exec();
			},
			run_recover(item){
				item.run_img = "../../../../static/run.png";
				if(item.all_finish_times>=item.timesForAward){
					item.getAward=true
				}
				this.$set(this, 'now_list', this.now_list)
			}
		}
	}
</script>

<style>
	page {
		background-color: #fcfcfc
	}
	/* .box{
		z-index: 0;
	} */
	
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
		z-index: 100;
		width: 100%;
		margin-bottom: 13px;
		
	}
	.todo-header_left {
		/*width: 100%;*/
		padding-left: 20px;
		padding-right: 52%;
	}
	.active-text {
		font-size: 14px;
		color: #009688;
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
		color: #009688;
		/* color: #3ebf69; */
		font-weight: bold;
		font-size: 18px;
	}
	.todo-number{
		margin-right:3px;
		font-size: 20px;
	}
	.todo_box{
		padding: 55px 7px 20px 7px;
	}
	.todo_item{
		z-index: 1;
		background-color: white;
		position: relative;
		display: flex;
		align-items: center;
		padding: 6px 15px;
		margin: 10px 15px;
		border-radius: 10px;
		height: 45px;
		/* background: #e3fde4; */
		box-shadow: -1px 1px 5px 1px rgba(0, 0, 0, 0.1), -1px 2px 1px 0 rgba(255, 255, 255) inset;
	}
	.item-head{
		position: absolute;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		height:60%;
		width: 6px;
		border-radius: 30px;
		background-color: #aae0c3;
		color: #aae0c3;
		top: 20%;
		left: -5px;
	}
	.item-icon{
		position: absolute;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		left: 10px;
		/* top: 20%; */
	}
	.todo-item_content{
		z-index: 1;
		width: 100%;
		height: 45px;
		display: flex;
		justify-content: space-between;
	}
	.run{
		position: relative;
		height: 18px;
		
	}
	.run_img{
		height: 20px;
		width: 20px;
		top: 8px;
		position: absolute;
		left: 20px;
		z-index: 3;
	}
	.dst_img{
		position: absolute;
		top: 8px;
		right: 20px;
		height: 20px;
		width: 20px;
		z-index: 3;
	}
	.todo_item_left{
		position: relative;
		left: 25px;
		height: 45px;
		width: 65%;
	}
	.todo_title {
		text-align: left;
		font-size: 14px;
		height: 50%;
		display: flex;
		flex-direction: column;
		justify-content: center;
	}
	.todo_item_cycle{
		text-align: left;
		font-size: 11px;
		color: #7e7e7e;
		height: 50%;
		display: flex;
		flex-direction: column;
		justify-content: center;
	}
	.todo_item_right{
		border-width: 0 0 0 7upx;
		border-style: dotted;
		border-color: #ccc;
		padding: 8px;
		height: 30px;
		width: 35%;
		margin-right: -8px;
		/* align-items: center; */
		display: flex;
		flex-direction: column;
		justify-content: center;
	}
	.todo_item_right_content{
		/* position: relative; */
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 50%;
		margin: -2px 0 0px 4px;
		padding: 4px 0;
		text-align: center;
	}
	.todo_item_right_text{
		font-size: 11px;
		color: #979797;
	}
	.todo_item_right_number{
		display: flex;
		font-size: 13px;
		font-weight: 600;
		color: #333333;
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
	.todo_finish .todo_title {
		color: #999;
	}
	.todo_finish .todo_item_cycle{
		color: #999;
	}
	.todo_finish .todo_item_right_text{
		color: #999;
	}
	.todo_finish .todo_item_right_number{
		color: #999;
	}
	.todo_finish::before {
		content: '';
		position: absolute;
		top: 0;
		bottom: 0;
		left: 40px;
		right: 25px;
		height: 2px;
		margin: auto 0;
		background: #bdcdd8;
	}
	
	.todo_finish::after {
		background: #ccc;
		color: #999;
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
		bottom: 10%;
		border-radius: 50%;
		background-color: #009688;
		box-shadow: 0px 5px 10px rgba(0, 150, 136, 0.4);
		color: white;
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
		bottom: 2%;
		border-radius: 50%;
		background-color: #009688;
		box-shadow: 0px 5px 10px rgba(0, 150, 136, 0.4);
		color: white;
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
		background-color: #009688;
		box-shadow: 0px 5px 10px rgba(0, 150, 136, 0.4);
		color: white;
		/* z-index: 99; */
	}
	.button{
		position: fixed;
		bottom: 100rpx;
		right: 40rpx;
		width: 90rpx;
		height: 90rpx;
		line-height: 90rpx;
		text-align: center;
		border-radius: 50%;
		background-color: #009688;
		color: #fff;
		font-size: 70rpx;
		z-index: 97;
		box-shadow: 0px 5px 10px rgba(0, 150, 136, 0.4);
		/* z-index: 99; */
	}
	.select_show {
		opacity: 1;
		transform: scale(1) translateY(0);
	}
	.br{/*留空*/
		height: 250px;
	}
</style>