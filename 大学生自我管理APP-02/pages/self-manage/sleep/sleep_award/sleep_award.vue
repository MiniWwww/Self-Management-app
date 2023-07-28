<template>		<!--总大奖 起/睡/都 每周/月奖？-->
	<view>
		<uni-fab style="height: 40px;font-size: 8px;line-height: 100px; color: #d9f5db;" horizontal="right" @click="addNewAward"></uni-fab>
		
		<view v-for="(item, index) in now_awardList" :key="index" style="z-index: 0;"><!--总点赞数的part（可添加多个奖励-->
			<view class="allAward_box" >	
				
				<view class="awardContent" ><!--奖励内容（可修改-->
					<image src="../../../static/小红花.png" v-if="item.times<=allAchievement" style="position: absolute; left: 35px; width: 35px; height: 35px; background-color: #fff2e5; " mode="aspectFit"></image>
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
						<circle-progress-bar :pro="1" :border_back_color="'#cacaca'" :border_color="'#d9f5db'" style="width: 60px;height: 60px;z-index: 0;">
							{{item.times}}
						</circle-progress-bar>
						<view style="margin-top: 5px;">
							目标数
							<image src="../../../static/编辑.png" style="width: 12px; height: 12px; " mode="aspectFit"></image>
						</view>
					</view>
					<view class="achieve_times_item"> <!--已获得点赞数-->
						<circle-progress-bar :pro="allAchievement/item.times" :border_back_color="'#cacaca'" :border_color="'#d9f5db'" style="width: 60px;height: 60px;">
							{{allAchievement}}
						</circle-progress-bar>
						<view style="margin-top: 5px;">已获得</view>
					</view>
					<view class="achieve_times_item"> <!--据获得奖励还差。。。-->
						<circle-progress-bar :pro="(item.times-allAchievement)/item.times" :border_back_color="'#cacaca'" :border_color="'#d9f5db'" style="width: 60px;height: 60px;">
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
	export default {
		data() {
			return {
				now_awardList:[],
				awardList:[{content:'旅游', times:100, pop:false},{content:'livehouse', times:50, pop:false}],
				
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
		methods: {
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
	.allAward_box{
		z-index: 0;
		width: 90%;
		margin: 15px 15px 15px 15px;
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
</style>
