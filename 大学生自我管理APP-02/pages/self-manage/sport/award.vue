<template> <!-- ▲ 奖励的删除，已完成奖励怎么处理？（切换栏：全部/已完成/未完成）；总项与单项样式区分-->
	<view>
		<view class="header">
			<!-- 状态栏左侧 -->
			<view class="header_left">
				<text class="active-text">{{ text }}</text>
				<text class="award_number">{{ ListData }}</text>
				条
			</view>
			<!-- 状态栏右侧 -->
			<view class="header_right">
				<view @click="openList">
					{{text}}
					<uni-icons type="bottom" size="12"></uni-icons>
				</view>
				
				<uni-list  class="header_right_list" v-if="open">
					<view  v-for="(item, index) in tabList" :key="index">
						<uni-list-item :title="item" :border="false" clickable class="header_right-item" :class="{ 'active-tab': tabIndex == index }" @click="tabClick(item, index)">{{ item }}</uni-list-item>
					</view>
				</uni-list>
				
			</view>
			
		</view>
		<uni-fab style="height: 40px;font-size: 8px;line-height: 100px; " :pattern="pattern" horizontal="right" @click="addNewAward"></uni-fab>
		<view style="padding-top: 20px;">
			<view v-for="(item, index) in now_awardList" :key="index" class="award_outside" ><!--总点赞数的part（可添加多个奖励-->
				<view class="allAward_box" >	
					
					<view class="awardContent" ><!--奖励内容（可修改-->
						<image src="../../../static/小红花.png" v-if="item.times<=allAchievement" class="doneimage" mode="aspectFit"></image>
						<view style="margin-left: 7px;" @click="changeAward_content(index)">
							{{item.content}}
							<image src="../../../static/编辑.png" style="width: 15px; height: 15px; background-color: #fff2e5;" mode="aspectFit"></image>
						</view>
						<view class="pop_select">	<!--弹出删除-->
							<uni-icons  type="more" size="20" @click="popup(index)" style="position: absolute; right: 9%;"></uni-icons>
							
						</view>
					</view>
					
					<view class="achieve_times_box">
						<view class="achieve_times_item" @click="changeAward_times(index)"> <!--目标点赞数（可修改-->
							<circle-progress-bar :pro="1" :border_back_color="'#ebebeb'" :border_color="'#fff2e5'" style="width: 60px;height: 60px;z-index: 0;">
								{{item.times}}
							</circle-progress-bar>
							<view style="margin-top: 5px;">
								目标数
								<image src="../../../static/编辑.png" style="width: 12px; height: 12px; " mode="aspectFit"></image>
							</view>
						</view>
						<view class="achieve_times_item"> <!--已获得点赞数-->
							<circle-progress-bar :pro="allAchievement/item.times" :border_back_color="'#ebebeb'" :border_color="'#fff2e5'" style="width: 60px;height: 60px;">
								{{allAchievement}}
							</circle-progress-bar>
							<view style="margin-top: 5px;">已获得</view>
						</view>
						<view class="achieve_times_item"> <!--据获得奖励还差。。。-->
							<circle-progress-bar :pro="(item.times-allAchievement)/item.times" :border_back_color="'#ebebeb'" :border_color="'#fff2e5'" style="width: 60px;height: 60px;">
								{{item.times-allAchievement}}
							</circle-progress-bar>
							<view style="margin-top: 5px;">差距</view>
						</view>
					</view>
					
					<uni-list  class="more_list" v-if="item.pop">
						<uni-list-item title="删除" :border="false" clickable class="more_list_item" @click="deleteAward(item, index)"></uni-list-item>
					</uni-list>
				</view>
			</view>
			<!--单项-->
			<view v-for="(item, index) in now_list" :key="index" style="width: 100%;" class="award_outside">
				<view class="itemAward_box" >	
					<view class="item_awardContent" >
						<image src="../../../static/小红花.png" v-if="item.all_finish_times>=item.timesForAward" class="doneimage" mode="aspectFit"></image>
						<view style="margin-left: 7px; display: flex; justify-content: space-evenly; width:80%">
							{{item.title}}
							<image src="../../../static/冲.png" style="width: 25px; height: 25px; background-color: #f1ffef;" mode="aspectFit"></image>
							{{item.award}}
						</view>
						<!-- <view class="pop_select">
							<uni-icons  type="more" size="20"></uni-icons>
						</view> -->
					</view>
					<view class="achieve_times_box">
						<view class="achieve_times_item">
							<circle-progress-bar :pro="1" :border_back_color="'#ebebeb'" :border_color="'#f1ffef'" style="width: 50px;height: 50px;">
								{{item.timesForAward}}
							</circle-progress-bar>
							<view style="margin-top: 5px;">
								目标数
							</view>
						</view>
						<view class="achieve_times_item">
							<circle-progress-bar :pro="item.all_finish_times/item.timesForAward" :border_back_color="'#ebebeb'" :border_color="'#f1ffef'" style="width: 50px;height: 50px;">
								{{item.all_finish_times}}
							</circle-progress-bar>
							<view style="margin-top: 5px;">已获得</view>
						</view>
						<view class="achieve_times_item" > 
							<circle-progress-bar :pro="(item.timesForAward-item.all_finish_times%item.timesForAward)/item.timesForAward" :border_back_color="'#ebebeb'" :border_color="'#f1ffef'" style="width: 50px;height: 50px;">
								{{item.timesForAward-item.all_finish_times%item.timesForAward}}
							</circle-progress-bar>
							<view style="margin-top: 5px;">与下次达成目标差距</view>
						</view>
					</view>
					
				</view>
				
			</view>
		</view>
		
		<!--弹窗-->
		<uni-popup ref="popup_add" type="dialog">
			<uni-popup-dialog mode="input" title="达成总点赞数奖励内容" placeholder="您希望给自己什么奖励呢？"
          confirmText="确定" cancelText="取消" @confirm="addConfirm"></uni-popup-dialog>
		</uni-popup>
		<uni-popup ref="popup_change_content" type="dialog">
			<uni-popup-dialog mode="input" title="达成总点赞数奖励内容" :value="content" placeholder="您希望给自己什么奖励呢？"
		  confirmText="确定" cancelText="取消" @confirm="changeContentConfirm"></uni-popup-dialog>
		</uni-popup>
		<uni-popup ref="popup_change_times" type="dialog">
			<uni-popup-dialog mode="input" title="目标点赞数" :value="times"
		  confirmText="确定" cancelText="取消" @confirm="changeTimesConfirm"></uni-popup-dialog>
		</uni-popup>
		
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
				pattern: {buttonColor: '#009688'},
				open:false,
				tabList:['全部','已达成','未达成','总奖励','单项奖励'],
				text: '全部',
				tabIndex: 0,
				content:'',
				times:Number,
				index:Number,
				allAchievement:0,
				now_awardList:[],
				now_list:[],
				awardList:[{content:'旅游', times:100, pop:false},{content:'livehouse', times:50, pop:false}],
				award:{content:'', times:Number},
				list:[{title: '跳绳', period_free: false, period:true, note:'',intensity:'低', times:3, finish: false, finish_times:0, all_finish_times:70, finish_day:'', cycle:'周一 周二 周五',timesForAward:50, award:'吃火锅！'},],
			}
		},
		computed:{
			ListData(){
				var that=this;
				if(that.tabIndex==0){
					that.now_awardList=that.awardList;
					that.now_list=that.list;
					return that.now_awardList.length+that.now_list.length
				}
				if(that.tabIndex==1){
					let list1=[];
					let list2=[];
					that.awardList.forEach(v=>{
						if(v.times<=that.allAchievement){
							list1.push(v);
						}
					})
					that.now_awardList=list1;
					that.list.forEach(v=>{
						if(v.all_finish_times>=v.timesForAward){
							list2.push(v);
						}
					})
					that.now_list=list2;
					return that.now_awardList.length+that.now_list.length
				}
				if(that.tabIndex==2){
					let list1=[];
					let list2=[];
					that.awardList.forEach(v=>{
						if(v.times>that.allAchievement){
							list1.push(v);
						}
					})
					that.now_awardList=list1;
					that.list.forEach(v=>{
						if(v.all_finish_times<v.timesForAward){
							list2.push(v);
						}
					})
					that.now_list=list2
					return that.now_awardList.length+that.now_list.length
				}
				if(that.tabIndex==3){
					that.now_awardList=that.awardList;
					that.now_list=[];
					return that.now_awardList.length;
				}
				if(that.tabIndex==4){
					that.now_list=that.list;
					that.now_awardList=[];
					return that.now_list.length;
				}
			}
		},
		onLoad:function(option){
			var that=this;
			const eventChannel = that.getOpenerEventChannel();
			eventChannel.on('toaward',function(data){
				that.list=data
				console.log(that.list);
				let all=0;
				for(var i=0;i<that.list.length;i++){
					all=all+that.list[i].all_finish_times
				}
				console.log(all);
				that.allAchievement=all;
			});
			
		},
		methods: {
			tabClick(item, index) {
				this.text = item;
				this.tabIndex = index;
				this.open=false;
			},
			openList(){
				this.open=!this.open;
			},
			addNewAward(){
				this.$refs.popup_add.open( )
			},
			addConfirm(e){
				this.award.content=e;
				this.award.times=100;
				this.awardList.push(this.award);
			},
			changeAward_content(index){
				this.index=index;
				this.content=this.awardList[index].content;
				this.$refs.popup_change_content.open( );
				
			},
			changeContentConfirm(e){
				var that=this;
				//console.log(this.content);
				this.awardList[that.index].content=e;
			},
			changeAward_times(index){
				this.index=index;
				this.times=this.awardList[index].times;
				this.$refs.popup_change_times.open( );
			},
			changeTimesConfirm(e){
				var that=this;
				//console.log(this.content);
				this.awardList[that.index].times=e;
			},
			deleteAward(item,index){
				var that=this;
				for(var i=index;i<that.now_awardList.length-1;i++){
					that.now_awardList[i]=that.now_awardList[i+1];
				}
				let list=[];
				that.awardList.forEach((v=>{
					if(v.content!=item.content){
						list.push(v)
					}
				}))
				that.awardList=list;
			},
			popup(index){
				
				if(this.now_awardList[index].pop){
					this.now_awardList[index].pop=false;
				}
				else{
					this.now_awardList[index].pop=true;
					
				}
			}
		}
	}
</script>

<style>
	.award_outside{
		z-index: 0;
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	.allAward_box{
		position: relative;
		z-index: 0;
		width: 80%;
		margin: 15px 0;
		border-radius: 10px;
		height: 200px;
		/* background: #fff2e5; */
		box-shadow: -1px 1px 5px 1px rgba(0, 0, 0, 0.1), -1px 2px 1px 0 rgba(255, 255, 255) inset;
	}
	.header {
		display: flex;
		align-items: center;
		padding: 0 0px;
		font-size: 12px;
		color: #333333;
		height: 50px;
		box-shadow: -2px 3px 5px 0 rgba(0, 0, 0, 0.1);
		background-color: #ffffff;
		position: fixed;
		z-index: 99;
		width: 100%;
	}
	.header_left {
		/*width: 100%;*/
		width: 60%;
		padding-left: 20px;/* 
		margin-right: 5%; */
	}
	.active-text {
		font-size: 14px;
		color: #009688;
		padding-right: 10px;
		font-weight: bold;
	}
	.header_right {
		z-index: 3;
		border-radius: 10px;
		height: 45px;
/* 		box-shadow: -1px 1px 5px 1px rgba(0, 0, 0, 0.1), -1px 2px 1px 0 rgba(255, 255, 255) inset; */
		margin: 8px; 
		width: 100px; 
		position: fixed;
		right: 0;
		top: 8px;
		align-items: center;
		text-align: center;
		font-size: 15px;
		font-weight: bold;
	}
	.header_right_list{
		z-index: 99;
		position: fixed;
		top: 14px;
		height: 200px;
		background: white;
		border-radius: 10px;
		width: 100px;
	}
	.header_right-item {
		position: fixed;
		z-index: 3;
		/* padding: 0 5px; */
		background: white;
		border-radius: 6px;
		box-shadow: -1px 1px 5px 1px rgba(0, 0, 0, 0.1), -1px 2px 1px 0 rgba(255, 255, 255) inset;
		text-align: center;
		height: 40px;
	}
	.active-tab {
		color: #009688;
		font-weight: bold;
		font-size: 18px;
	}
	.award_number{
		margin-right:3px;
		font-size: 20px;
	}
	.awardContent{
		box-shadow: -1px 1px 5px 1px rgba(0, 0, 0, 0.1), -1px 2px 1px 0 rgba(255, 255, 255) inset;
		border-radius: 10px;
		height: 60px;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 20px;
		background: #fff2e5;
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
	.itemAward_box{
		position: relative;
		width: 80%;
		margin: 15px 0;
		border-radius: 10px;
		/* background: #f1ffef; */
		box-shadow: -1px 1px 5px 1px rgba(0, 0, 0, 0.1), -1px 2px 1px 0 rgba(255, 255, 255) inset;
		
	}
	.item_awardContent{
		box-shadow: -1px 1px 5px 1px rgba(0, 0, 0, 0.1), -1px 2px 1px 0 rgba(255, 255, 255) inset;
		border-radius: 10px;
		height: 50px;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 18px;
		background: #f1ffef;
	}
	.doneimage {
		position: absolute;
		left: -20px;
		top: -25px;
		width: 75px;
		height: 75px;
		filter: alpha(opacity=80);
		-moz-opacity: 0.85;
		-khtml-opacity: 0.85;
		opacity: 0.85;	
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
	.br{/*留空*/
		height: 150px;
	}
</style>
