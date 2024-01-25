<template>		<!--总大奖 起/睡/都 每周/月奖？-->
	<view>
		<view class="header">
			<!-- 状态栏左侧 -->
			<view class="header_left">
				<text class="active-text">{{ text }}</text>
				<text class="number">{{ ListData }}</text>
				条
			</view>
			<!-- 状态栏右侧 -->
			<view class="header_right" v-for="(item, index) in tabList" :key="index">
				<view class="header_right-item" :class="{ 'active-tab': tabIndex == index }" @click="tabClick(item, index)">{{ item }}</view>
			</view>
		</view>
		<view style="height: 50px;"></view>
		<view v-for="(item, index) in awardList" :key="index" style="z-index: 0;" v-if="all||tabIndex==1"><!--睡&起-->
			<view class="allAward_box" >	
				
				<view class="awardContent" style="background: #fff2e5;"><!--奖励内容（可修改-->
					<image src="../../../static/小红花.png" v-if="item.times<=success_list.length" style="position: absolute; left: 35px; width: 35px; height: 35px; background-color: #fff2e5; " mode="aspectFit"></image>
					<view style="margin-left: 7px;" @click="changeAward_content(1,index)">
						{{item.content}}
						<image src="../../../static/编辑.png" style="width: 15px; height: 15px; background-color: #fff2e5;" mode="aspectFit"></image>
					</view>
					<view class="pop_select">	<!--弹出删除-->
						<uni-icons  type="more" size="20" @click="popup(1,index)" style="position: absolute; right: 9%;"></uni-icons>
						
					</view>
				</view>
				
				<view class="achieve_times_box">
					<view class="achieve_times_item" @click="changeAward_times(1,index)"> <!--目标点赞数（可修改-->
						<circle-progress-bar :pro="1" :border_back_color="'#cacaca'" :border_color="'#d9f5db'" style="width: 60px;height: 60px;z-index: 0;">
							{{item.times}}
						</circle-progress-bar>
						<view style="margin-top: 5px;">
							目标数
							<image src="../../../static/编辑.png" style="width: 12px; height: 12px; " mode="aspectFit"></image>
						</view>
					</view>
					<view class="achieve_times_item"> <!--已获得点赞数-->
						<circle-progress-bar :pro="success_list.length/item.times" :border_back_color="'#cacaca'" :border_color="'#d9f5db'" style="width: 60px;height: 60px;">
							{{success_list.length}}
						</circle-progress-bar>
						<view style="margin-top: 5px;">已获得</view>
					</view>
					<view class="achieve_times_item"> <!--据获得奖励还差。。。-->
						<circle-progress-bar :pro="(item.times-success_list.length)/item.times" :border_back_color="'#cacaca'" :border_color="'#d9f5db'" style="width: 60px;height: 60px;">
							{{item.times-success_list.length}}
						</circle-progress-bar>
						<view style="margin-top: 5px;">差距</view>
					</view>
				</view>
				
				<uni-list  class="more_list" v-if="clickidnex==index&&listIndex==1&&pop">
					<uni-list-item title="删除" :border="false" clickable class="more_list_item" @click="deleteAward(item, index)"></uni-list-item>
				</uni-list>
			</view>
		</view>
		
		<view v-for="(item, index) in getup_awardList" :key="index" style="z-index: 0;" v-if="all||tabIndex==2"><!--起-->
			<view class="allAward_box" >	
				
				<view class="awardContent" style="background: #f1ffef;"><!--奖励内容（可修改-->
					<image src="../../../static/小红花.png" v-if="item.times<=getup_success_list.length" style="position: absolute; left: 35px; width: 35px; height: 35px; background-color: #f1ffef; " mode="aspectFit"></image>
					<view style="margin-left: 7px;" @click="changeAward_content(2,index)">
						{{item.content}}
						<image src="../../../static/编辑.png" style="width: 15px; height: 15px; background-color: #f1ffef;" mode="aspectFit"></image>
					</view>
					<view class="pop_select">	<!--弹出删除-->
						<uni-icons  type="more" size="20" @click="popup(2,index)" style="position: absolute; right: 9%;"></uni-icons>
						
					</view>
				</view>
				
				<view class="achieve_times_box">
					<view class="achieve_times_item" @click="changeAward_times(2,index)"> <!--目标点赞数（可修改-->
						<circle-progress-bar :pro="1" :border_back_color="'#cacaca'" :border_color="'#e4f5f5'" style="width: 60px;height: 60px;z-index: 0;">
							{{item.times}}
						</circle-progress-bar>
						<view style="margin-top: 5px;">
							目标数
							<image src="../../../static/编辑.png" style="width: 12px; height: 12px; " mode="aspectFit"></image>
						</view>
					</view>
					<view class="achieve_times_item"> <!--已获得点赞数-->
						<circle-progress-bar :pro="getup_success_list.length/item.times" :border_back_color="'#cacaca'" :border_color="'#e4f5f5'" style="width: 60px;height: 60px;">
							{{getup_success_list.length}}
						</circle-progress-bar>
						<view style="margin-top: 5px;">已获得</view>
					</view>
					<view class="achieve_times_item"> <!--据获得奖励还差。。。-->
						<circle-progress-bar :pro="(item.times-getup_success_list.length)/item.times" :border_back_color="'#cacaca'" :border_color="'#e4f5f5'" style="width: 60px;height: 60px;">
							{{item.times-getup_success_list.length}}
						</circle-progress-bar>
						<view style="margin-top: 5px;">差距</view>
					</view>
				</view>
				
				<uni-list  class="more_list" v-if="clickidnex==index&&listIndex==2&&pop">
					<uni-list-item title="删除" :border="false" clickable class="more_list_item" @click="deleteAward(item, index)"></uni-list-item>
				</uni-list>
			</view>
		</view>
		
		<view v-for="(item, index) in sleep_awardList" :key="index" style="z-index: 0;" v-if="all||tabIndex==3"><!--睡-->
			<view class="allAward_box" >	
				
				<view class="awardContent" style="background: #fff2f4;"><!--奖励内容（可修改-->
					<image src="../../../static/小红花.png" v-if="item.times<=sleep_success_list.length" style="position: absolute; left: 35px; width: 35px; height: 35px; background-color: #fff2f4; " mode="aspectFit"></image>
					<view style="margin-left: 7px;" @click="changeAward_content(3,index)">
						{{item.content}}
						<image src="../../../static/编辑.png" style="width: 15px; height: 15px; background-color: #fff2f4;" mode="aspectFit"></image>
					</view>
					<view class="pop_select">	<!--弹出删除-->
						<uni-icons  type="more" size="20" @click="popup(3,index)" style="position: absolute; right: 9%;"></uni-icons>
						
					</view>
				</view>
				
				<view class="achieve_times_box">
					<view class="achieve_times_item" @click="changeAward_times(3,index)"> <!--目标点赞数（可修改-->
						<circle-progress-bar :pro="1" :border_back_color="'#cacaca'" :border_color="'#ecebf5'" style="width: 60px;height: 60px;z-index: 0;">
							{{item.times}}
						</circle-progress-bar>
						<view style="margin-top: 5px;">
							目标数
							<image src="../../../static/编辑.png" style="width: 12px; height: 12px; " mode="aspectFit"></image>
						</view>
					</view>
					<view class="achieve_times_item"> <!--已获得点赞数-->
						<circle-progress-bar :pro="sleep_success_list.length/item.times" :border_back_color="'#cacaca'" :border_color="'#ecebf5'" style="width: 60px;height: 60px;">
							{{sleep_success_list.length}}
						</circle-progress-bar>
						<view style="margin-top: 5px;">已获得</view>
					</view>
					<view class="achieve_times_item"> <!--据获得奖励还差。。。-->
						<circle-progress-bar :pro="(item.times-sleep_success_list.length)/item.times" :border_back_color="'#cacaca'" :border_color="'#ecebf5'" style="width: 60px;height: 60px;">
							{{item.times-sleep_success_list.length}}
						</circle-progress-bar>
						<view style="margin-top: 5px;">差距</view>
					</view>
				</view>
				
				<uni-list  class="more_list" v-if="clickidnex==index&&listIndex==3&&pop">
					<uni-list-item title="删除" :border="false" clickable class="more_list_item" @click="deleteAward(item, index)"></uni-list-item>
				</uni-list>
			</view>
		</view>
		<!--创建新项-->
		<view class="create" @click="creat"><text class="iconhao" :class="{ 'create-active': tetxShow }"></text></view>
		<!-- 输入框 -->
		<view class="create-content" style="z-index: 1" v-if="activeInput" :class="{ 'create-show': tetxShow }">
			<view class="create-content-box">
				<view class="content-input"><input type="text" v-model="content" placeholder="请输入奖励内容" /></view>
			    <view class="numbers-input"><input type="number" v-model="numbers" placeholder="请输入目标赞数" /></view>
			
				<view>
					<view style="margin-bottom: 7px;">请选择奖励所属目标：</view>
					
					<view class="tab-box" v-for="(item, index) in optionList" :key="index">
						<view :class="{ active: option == item }" @click="switchOption(item,index)">{{item}}</view>
					</view>
				</view>
			
				<view class="creat-button" @click="submitInput">创建</view>
			</view>
		</view>
		
		<uni-popup ref="popup_change_content" type="dialog">
			<uni-popup-dialog mode="input" title="达成总点赞数奖励内容" :value="content_change" placeholder="您希望给自己什么奖励呢？"
		  confirmText="确定" cancelText="取消" @confirm="changeContentConfirm"></uni-popup-dialog>
		</uni-popup>
		<uni-popup ref="popup_change_times" type="dialog">
			<uni-popup-dialog mode="input" title="目标点赞数" :value="numbers_change"
		  confirmText="确定" cancelText="取消" @confirm="changeTimesConfirm"></uni-popup-dialog>
		</uni-popup>
		
		<view class="br"></view>
	</view>
</template>

<script>
	import CircleProgressBar from '../../component/circle-progress-bar/circle-progress-bar.vue'
	export default {
		components: {
					CircleProgressBar,
		},
		data() {
			return {
				all:true,
				text:'全部',
				tabList: ['全部','睡&起','起','睡'],
				tabIndex: 0,
				pop:false,
				activeInput: false,
				tetxShow: false,
				content:'',
				numbers:Number,
				content_change:'',
				numbers_change:Number,
				listIndex:-1,
				clickidnex:-1,
				now_awardList:[],
				option:'睡&起',
				optionIndex:0,
				optionList:['睡&起','起','睡'],
				awardList:[{content:'旅游', times:30},{content:'livehouse', times:50}],
				getup_awardList:[{content:'火锅', times:10},{content:'烤肉', times:15}],
				sleep_awardList:[{content:'看电影', times:2},{content:'逛街', times:15}],
				
				getup_success_list:[{getup_goal:'7:00', getup_time:'6:30',date:'2023年07月24日 星期一'}, {getup_goal:'7:00', getup_time:'6:59',date:'2023年07月25日 星期二'}],
				sleep_success_list:[{sleep_goal:'23:00', sleep_time:'22:55',date:'2023年07月23日 星期日'}, {sleep_goal:'23:00', sleep_time:'22:50',date:'2023年07月25日 星期二'}],
				success_list:[{getup_goal:'7:00', getup_time:'6:30',sleep_goal:'23:00', sleep_time:'22:55', date:'2023年07月25日 星期二'}],
				
			}
		},
		onLoad:function(option){
			var that=this;
			const eventChannel = that.getOpenerEventChannel();
			eventChannel.on('sleepToAward',function(data){
				//console.log(data);
				that.getup_success_list=data.getup_success_list;
				that.sleep_success_list=data.sleep_success_list;
				that.success_list=data.success_list;
				// console.log('getup_success_list',that.getup_success_list);
				// console.log('sleep_success_list',that.sleep_success_list);
				// console.log('success_list',that.success_list);
			});
			
		},
		computed:{
			ListData(){
				var that=this;
				if(that.tabIndex==0){
					that.all=true;
					return that.awardList.length+that.getup_awardList.length+that.sleep_awardList.length;
				}
				that.all=false;
				if(that.tabIndex==1){
					return that.awardList.length;
				}
				if(that.tabIndex){
					return that.getup_awardList.length;
				}
				if(that.tabIndex){
					return that.sleep_awardList.length;
				}
			}
		},
		methods: {
			tabClick(item, index) {
				this.text = item;
				this.tabIndex = index;
			},
			changeAward_content(i,index){
				this.pop=false;
				this.clickidnex=index;
				this.listIndex=i;
				var that=this;
				switch(i){
					case 1:
						that.content_change=that.awardList[index].content;
						break;
					case 2:
						that.content_change=that.getup_awardList[index].content;
						break;
					case 3:
						that.content_change=that.sleep_awardList[index].content;
						break;
				}
				this.$refs.popup_change_content.open( );
			},
			changeContentConfirm(e){
				var that=this;
				//console.log(this.content);
				switch(that.listIndex){
					case 1:
						that.awardList[that.clickidnex].content=e;
						break;
					case 2:
						that.getup_awardList[that.clickidnex].content=e;
						break;
					case 3:
						that.sleep_awardList[that.clickidnex].content=e;
						that.saveSleepAwardList();
						break;
				}
			},
			changeAward_times(i,index){
				this.pop=false;
				this.clickidnex=index;
				this.listIndex=i;
				var that=this;
				switch(i){
					case 1:
						that.numbers_change=that.awardList[index].times;
						break;
					case 2:
						that.numbers_change=that.getup_awardList[index].times;
						break;
					case 3:
						that.numbers_change=that.sleep_awardList[index].times;
						break;
				}
				this.$refs.popup_change_times.open( );
			},
			changeTimesConfirm(e){
				var that=this;
				switch(that.listIndex){
					case 1:
						that.awardList[that.clickidnex].times=e;
						break;
					case 2:
						that.getup_awardList[that.clickidnex].times=e;
						break;
					case 3:
						that.sleep_awardList[that.clickidnex].times=e;
						that.saveSleepAwardList();
						break;
				}
			},
			deleteL(list,item){
				let list2=[];
				list.forEach((v=>{
					if(v.content!=item.content){
						list2.push(v)
					}
				}))
				return list2;
			},
			deleteAward(item,index){
				var that=this;
				let list1=[];
				if(that.listIndex==1){
					list1=that.awardList;
					that.awardList=that.deleteL(list1,item);
				}
				if(that.listIndex==2){
					list1=that.getup_awardList;
					that.getup_awardList=that.deleteL(list1,item);
				}
				if(that.listIndex==3){
					list1=that.sleep_awardList;
					that.sleep_awardList=that.deleteL(list1,item);
					that.saveSleepAwardList();
				}
				that.listIndex=-1;
				that.clickidnex=-1;
			},
			popup(i,index){
				if(this.listIndex==i&&this.clickidnex==index){
					this.pop=!this.pop;
				}
				else{
					this.listIndex=i;
					this.clickidnex=index;
					this.pop=true;
				}
				
				
			},
			creat() {
			  this.activeInput = true;
			  this.tetxShow = !this.tetxShow;
			},
			switchOption(item,index) {
			  if (this.option !== item) {
					this.option = item;
					this.optionIndex=index;
				}
			},
			submitInput(){
				if (this.content === "") {
					uni.showToast({
						title: "请输入奖励内容",
						icon: "none",
						duration: 2000,
					});
					return;
				}
				var that=this;
				let obj={
					content:that.content, 
					times:that.numbers,
				}
				if(that.optionIndex==0){
					that.awardList.push(obj)
				}
				if(that.optionIndex==1){
					that.getup_awardList.push(obj)
				}
				if(that.optionIndex==2){
					that.sleep_awardList.push(obj)
					that.saveSleepAwardList();
				}
				this.activeInput = false;
				this.content='';
				this.numbers=Number;
			},
			saveSleepAwardList(){
				var that=this;
				// uni.removeStorage({
				// 	key:'SleepAward',
				// });
				
				uni.setStorage({ //存入Storage
					key: 'SleepAward', //自己取个名字
					data: { //存的数据可以是很多条
						
					sleep_awardList:that.sleep_awardList,
					},
				
					success() {
						console.log('SleepAward睡眠奖励储存成功');
					}
				});
				
				uni.setStorage({ //存入Storage
					key: 'sleep_like_Count', //自己取个名字
					data: { //存的数据可以是很多条
						
					sleep_like_Count:that.getup_success_list.length,
					},
				
					success() {
						console.log('sleep_like_Count睡眠达成赞数储存成功');
					}
				});
			}
		}
	}
</script>

<style>
	.header {
		display: flex;
		align-items: center;
		/* padding: 0 40px; */
		font-size: 12px;
		color: #333333;
		height: 50px;
		box-shadow: -2px 3px 5px 0 rgba(0, 0, 0, 0.1);
		background-color: #ffffff;
		position: fixed;
		top: 0;
		z-index: 99;
		width: 100%;
	}
	.header_left {
		/*width: 100%;*/
		padding-left: 20px;
		width: 55%;
	}
	.active-text {
		font-size: 14px;
		color: #3ebf69;
		padding-right: 10px;
		font-weight: bold;
	}
	.header_right {
		display: flex;
		flex-shrink: 0;
	}
	.header_right-item {
		padding: 0 5px;
	}
	.active-tab {
		color: #3ebf69;
		font-weight: bold;
		font-size: 18px;
	}
	.number{
		margin-right:3px;
		font-size: 20px;
	}
	.allAward_box{
		z-index: 0;
		width: 90%;
		margin: 10px 15px 15px 15px;
		border-radius: 10px;
		height: 200px;
		/* background: #fff2e5; */
		box-shadow: -1px 1px 5px 1px rgba(0, 0, 0, 0.1), -1px 2px 1px 0 rgba(255, 255, 255) inset;
	}
	.awardContent{
		box-shadow: -1px 1px 5px 1px rgba(0, 0, 0, 0.1), -1px 2px 1px 0 rgba(255, 255, 255) inset;
		border-radius: 10px;
		height: 60px;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 25px;
		
		/* background: #f1fdf2; */
	}
	.achieve_times_box{
		/* position: absolute; */
		z-index: inherit;
		display: flex;
		align-items: center;
		justify-content: space-evenly;
	}
	.achieve_times_item{
		margin-top: 20px;
		margin-bottom: 15px;
		font-size: 15px;
		color: #686868;
		text-align: center;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		height: 100px;
		align-items: center;
		width: 80px;
	}
	.pop_select{
		display: flex;
		flex-direction: column;
		justify-content: center;
		/* position: absolute;
		right: 9%; */
		/* height: 200px; */
	}
	.more_list{
		z-index: 99;
		position: absolute;
		left: 70%;
		bottom: 70%;
		height: 20px;
		background: white;
		border-radius: 10px;
		width: 100px;
	}
	.more_list_item{
		position: absolute;
		
		z-index: 3;
		/* padding: 0 5px; */
		background: white;
		border-radius: 6px;
		box-shadow: -1px 1px 5px 1px rgba(0, 0, 0, 0.1), -1px 2px 1px 0 rgba(255, 255, 255) inset;
		text-align: center;
		height: 40px;
	}
	.create {
	  display: flex;
	  align-items: center;
	  justify-content: center;
	  position: fixed;
	  bottom: 50px;
	  right: 20px;
	  margin: 0 auto;
	  width: 50px;
	  height: 50px;
	  line-height: 90rpx;
	  text-align: center;
	  border-radius: 50%;
	  background-color: #b1b2f5;
	  color: #fff;
	  font-size: 70rpx;
	  z-index: 999997;
	  box-shadow: 0px 5px 10px rgba(177, 178, 245, 0.4);
	}
	.create-active {
		padding-top: 100px;
	}
	.iconhao{
		transform: rotate(135deg);
	}
	.create-content {
		display: flex;
		justify-content: center;
		align-items: center;
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		transition: all 0.3s;
		background-color: rgba(138, 138, 138, 0.8);
		opacity: 0;
		transform: scale(0) translateY(200%);
	}
	.create-show {
		opacity: 1;
		transform: scale(1) translateY(0);
	}
	.create-content-box {
	   width: 80%;
	  padding: 40rpx;
	  
	  border-radius: 20rpx;
	  background: #ffffff;
	  box-shadow: -1px 1px 5px 2px rgba(0, 0, 0, 0.1), -1px 1px 1px 0 rgba(255, 255, 255) inset;
	  z-index: 2;
	}
	.content-input {
	  margin-bottom: 40rpx;
	}
	.numbers-input {
	  margin-bottom: 40rpx;
	}
	.tab-box {
	  display: flex;
	  margin-bottom: 20rpx;
	}
	.tab-box > view {
	  flex: 1;
	  text-align: center;
	  color: #666;
	  font-size: 28rpx;
	  padding: 20rpx;
	  border: 1rpx solid #ccc;
	  border-radius: 10rpx;
	  margin-right: 20rpx;
	
	  /* 默认情况下，设置为非选中状态 */
	  background-color: #f3f3f3;
	}
	
	/* 选中状态 */
	.tab-box > view.active {
	  color: #fff;
	  background-color: #b1b2f5;
	  border-color: #b1b2f5;
	}
	.creat-button {
	  display: flex;
	  justify-content: center;
	  align-items: center;
	  height: 80rpx;
	  line-height: 80rpx;
	  font-size: 32rpx;
	  background-color: #b1b2f5;
	  color: #fff;
	  border-radius: 50px;
	  box-shadow: 0px 5px 10px rgba(177, 178, 245, 0.4);
	  margin-left: auto;
	  margin-right: auto;
	  margin-top: 40rpx;
	  width: 80%;
	}
</style>
