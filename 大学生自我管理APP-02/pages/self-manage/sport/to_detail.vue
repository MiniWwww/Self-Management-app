<template>
	<view>
		<view class="form-box">
			<view class="form-item_outside">
				<uni-icons class="edit" type="compose" size="20" @click="edit_title"></uni-icons>
				<uni-section style="height: 50px;" title="事项" padding>
					<template v-slot:decoration>
						<view class="decoration"></view>
					</template>
				</uni-section>
				<view class="form-item_content">
					<text auto-height style="width: 260px;">
						{{item.title}}
					</text>
				</view>
			</view>
			<view class="form-item_outside">
				<uni-icons class="edit" type="compose" size="20" @click="edit_note"></uni-icons>
				<uni-section style="height: 50px;" title="备注" padding>
					<template v-slot:decoration>
						<view class="decoration"></view>
					</template>
				</uni-section>
				<view class="form-item_content">
					<text  auto-height style="width: 260px;">
						{{item.note}}
					</text>
				</view>
			</view>
			<view class="form-item_outside">
				<uni-icons class="edit" type="compose" size="20" @click="edit_cycles"></uni-icons>
				<uni-section style="height: 50px;" title="重复日期" padding>
					<template v-slot:decoration>
						<view class="decoration"></view>
					</template>
				</uni-section>
				<view class="form-item_content">
					<text auto-height style="width: 260px;">
						{{item.cycle}}
					</text>
				</view>
			</view>
			<view class="form-item_outside" v-if="item.period">
				<uni-icons class="edit" type="compose" size="20" @click="edit_times"></uni-icons>
				<uni-section style="height: 50px;" title="重复次数" padding>
					<template v-slot:decoration>
						<view class="decoration"></view>
					</template>
				</uni-section>
				<view class="form-item_content">
					<text auto-height style="width: 260px;">
						{{times}}
					</text>
				</view>
			</view>
			<view class="form-item_outside">
				<uni-icons class="edit" type="compose" size="20" @click="edit_intensity"></uni-icons>
				<uni-section style="height: 50px;" title="强度" padding>
					<template v-slot:decoration>
						<view class="decoration"></view>
					</template>
				</uni-section>
				<view class="form-item_content">
					<text auto-height style="width: 260px;">
						{{item.intensity}}
					</text>
				</view>
			</view>
			<view class="form-item_outside">
				<uni-section style="height: 50px;" title="已完成总次数" padding>
					<template v-slot:decoration>
						<view class="decoration"></view>
					</template>
				</uni-section>
				<view class="form-item_content">
					<text auto-height style="width: 260px;">
						{{item.all_finish_times}}
					</text>
				</view>
			</view>
			<view class="form-item_outside">
				<uni-icons class="edit" type="compose" size="20" @click="edit_timesForAward"></uni-icons>
				<uni-section style="height: 50px;" title="获得奖励的完成次数" padding>
					<template v-slot:decoration>
						<view class="decoration"></view>
					</template>
				</uni-section>
				<view class="form-item_content">
					<text auto-height style="width: 260px;" v-if="!item.timesForAward">
						任意
					</text>
					<text auto-height style="width: 260px;" v-if="item.timesForAward">
						{{item.timesForAward}}
					</text>
				</view>
			</view>
			<view class="form-item_outside" >
				<uni-icons class="edit" type="compose" size="20" @click="edit_award"></uni-icons>
				<uni-section style="height: 50px;" title="奖励内容" padding>
					<template v-slot:decoration>
						<view class="decoration"></view>
					</template>
				</uni-section>
				<view class="form-item_content" >
					<text auto-height style="width: 260px;" v-if="!item.timesForAward">
						任意
					</text>
					<text auto-height style="width: 260px;" v-if="item.timesForAward">
						{{item.award}}
					</text>
				</view>
			</view>
			<uni-popup ref="popup_change_title" type="dialog">
				<uni-popup-dialog mode="input" title="事项" :value="item.title" placeholder="请输入运动项目"
			  confirmText="确定" cancelText="取消" @confirm="changeTitleConfirm"></uni-popup-dialog>
			</uni-popup>
			<uni-popup ref="popup_change_note" type="dialog">
				<uni-popup-dialog mode="input" title="备注" :value="item.note" placeholder="请输入备注"
			  confirmText="确定" cancelText="取消" @confirm="changeNoteConfirm"></uni-popup-dialog>
			</uni-popup>
			<uni-popup ref="popup_change_cycles" type="center">
				<view class="uni-popup-dialog">
					<view class="uni-dialog-title">
						<text class="uni-dialog-title-text">重复日期</text>
					</view>
					<view class="period_box">
						<view class="period_item" :class="{ 'period_item_select': item.period_free }" @click="select_period_free">自由</view>
						<view class="period_item" :class="{ 'period_item_select': item.period }" @click="select_period">定时</view>
					</view>
					<view class="period" v-if="item.period">
						<view class="period_cycle_item" v-for="(i, index) in weekList" :key="i.time" @click="select_period_time(index)">
							<view >{{i.time}}</view>
							<view class="period_checkbox" :class="{'period_checkbox_select': i.check}">
								<view v-if="i.check">√</view>
							</view>
						</view>
						
					</view>
					<view class="uni-dialog-button-group">
						<view class="uni-dialog-button" @click="changeCyclesClose">
							<text class="uni-dialog-button-text">取消</text>
						</view>
						<view class="uni-dialog-button uni-border-left" @click="changeCyclesConfirm">
							<text class="uni-dialog-button-text uni-button-color">确定</text>
						</view>
					</view>
				</view>
			</uni-popup>
			<uni-popup ref="popup_change_times" type="dialog">
				<uni-popup-dialog mode="input" title="重复次数" :value="times" placeholder="请输入每天完成的次数"
			  confirmText="确定" cancelText="取消" @confirm="changeTimesConfirm" @close="changeTimesClose" before-close="true"></uni-popup-dialog>
			</uni-popup>
			<uni-popup ref="popup_change_intensity" type="center">
				<view class="uni-popup-dialog">
					<view class="uni-dialog-title">
						<text class="uni-dialog-title-text">强度</text>
					</view>
					<radio-group class="intensity_group" @change="radioChange">
						<radio value="低" color="#009688">低</radio>
						<radio value="中" color="#009688">中</radio>
						<radio value="高" color="#009688">高</radio>
					</radio-group>
					<view class="uni-dialog-button-group">
						<view class="uni-dialog-button" @click="changeIntensityClose">
							<text class="uni-dialog-button-text">取消</text>
						</view>
						<view class="uni-dialog-button uni-border-left" @click="changeIntensityConfirm">
							<text class="uni-dialog-button-text uni-button-color">确定</text>
						</view>
					</view>
				</view>
			</uni-popup>
			<uni-popup ref="popup_change_timesForAward" type="dialog">
				<uni-popup-dialog mode="input" title="获得奖励的完成次数" :value="item.timesForAward" placeholder="请输入获得奖励的完成次数"
			  confirmText="确定" cancelText="取消" @confirm="changeTimesForAwardConfirm" @close="changeTimesForAwardClose" before-close="true"></uni-popup-dialog>
			</uni-popup>
			<uni-popup ref="popup_change_award" type="dialog">
				<uni-popup-dialog mode="input" title="奖励内容" :value="item.award" placeholder="您希望对自己进行什么奖励呢？"
			  confirmText="确定" cancelText="取消" @confirm="changeAwardConfirm"></uni-popup-dialog>
			</uni-popup>
			<view class="br"></view>
		</view>
	</view>
	
</template>

<script>
	export default {
		data() {
			return {
				weekList: [
					{time: '周日', check: false}, 
					{time: '周一', check: false}, 
					{time: '周二', check: false}, 
					{time: '周三', check: false}, 
					{time: '周四', check: false},
					{time: '周五', check: false},
					{time: '周六', check: false},
					],
				intensity: '',
				item:{title:'' , period_free:false , period:false , note:'',intensity:'', times:'' , finish:false , finish_times:0, all_finish_times:0, finish_day:'' , cycle:'', timesForAward:Number, award:''},
				times:'',
			}
		},
		onLoad:function(option){
			var that=this;
			const eventChannel = that.getOpenerEventChannel();
			eventChannel.on('todetail',function(data){
				that.item=data;
				if(data.note==''){
					that.item.note='无';
				}
				if(data.period_free){
					that.item.cycle='自由';
				}
				if(data.period){
					if(data.cycle==''){
						that.item.cycle='每天';
					}
					if(data.times==''){
						that.times='任意';
					}
					else{
						that.times=data.times;
					}
				}
				console.log(that.item);
			});
		},
		onUnload() {
			this.item.times=this.times;
			const eventChannel = this.getOpenerEventChannel();
			eventChannel.emit('changeSportItem',this.item);
			console.log('save!',this.item);
			this.item = {title:'', period_free:true, period:'', note:'', intensity: '低', times: '', cycle: '',timesForAward:0,award:''};
		},
		methods: {
			//事项
			edit_title(){
				this.$refs.popup_change_title.open( );
			},
			changeTitleConfirm(e){
				this.item.title=e;
			},
			//备注
			edit_note(){
				this.$refs.popup_change_note.open( );
			},
			changeNoteConfirm(e){
				this.item.note=e;
			},
			//重复日期
			edit_cycles(){
				this.$refs.popup_change_cycles.open( );
			},
			select_period_free(){
				this.item.period_free=true;
				this.item.period=false;
			},
			select_period(){
				this.item.period_free=false;
				this.item.period=true;
			},
			select_period_time(index){
				if(this.weekList[index].check==false){
					this.weekList[index].check=true;
				}
				else{
					this.weekList[index].check=false;
				}
				
			},
			changeCyclesClose(){
				this.$refs.popup_change_cycles.close( );
			},
			changeCyclesConfirm(){
				var cycle=''
				this.weekList.forEach(v=>{
					if(v.check==true){
						cycle=cycle+' '+v.time;
					}
				});
				//console.log(cycle);
				this.item.cycle=cycle;
				if(this.item.period){
					if(this.item.cycle==''){
						this.item.cycle='每天';
					}
					this.times=1;
				}
				if(this.item.period_free){
					this.item.cycle='自由'
				}
				this.$refs.popup_change_cycles.close( );
			},
			//重复次数
			edit_times(){
				this.$refs.popup_change_times.open( );
			},
			changeTimesConfirm(e){
				if((parseInt(e)) == e){
					this.times=e;
					this.$refs.popup_change_times.close( );
				}
				else{
					uni.showModal({
						title:"提示",
						content: "请输入正整数",
						showCancel: false,
					})
				}
			},
			changeTimesClose(){
				this.$refs.popup_change_times.close( );
			},
			//强度
			edit_intensity(){
				this.$refs.popup_change_intensity.open( );
			},
			radioChange:function(e){
				this.intensity=e.detail.value;
				//console.log(this.item.intensity);
			},
			changeIntensityClose(){
				this.$refs.popup_change_intensity.close( );
			},
			changeIntensityConfirm(){
				if(this.intensity){
					this.item.intensity=this.intensity;
				}
				this.$refs.popup_change_intensity.close( );
			},
			//获得奖励的完成次数
			edit_timesForAward(){
				this.$refs.popup_change_timesForAward.open( );
			},
			changeTimesForAwardConfirm(e){
				//console.log(parseInt(e),typeof parseInt(e));
				if((parseInt(e)) == e){
					this.item.timesForAward=e;
					this.$refs.popup_change_timesForAward.close( );
				}
				else{
					uni.showModal({
						title:"提示",
						content: "请输入正整数",
						showCancel: false,
					})
				}
			},
			changeTimesForAwardClose(){
				this.$refs.popup_change_timesForAward.close( );
			},
			//奖励内容
			edit_award(){
				this.$refs.popup_change_award.open( );
			},
			changeAwardConfirm(e){
				this.item.award=e;
			},
		}
	}
</script>

<style>
	page {
		background-color: rgb(245, 245, 245);
	}
	.edit{
		z-index: 99;
		position: absolute;
		top: 20px;
		right: 15px;
		/* text-shadow: -1px 0 white, 0 1px white, 1px 0 white, 0 -1px white; */
	}
	.form-box{
		background-color: rgb(245, 245, 245);
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	.form-item_outside{
		position: relative;
		padding: 2% 2%;
		text-align: left;
		background-color: white;
		box-shadow: -1px 1px 5px 1px rgba(0, 0, 0, 0.1), -1px 2px 1px 0 rgba(255, 255, 255) inset;
		border-radius: 10px;
		width: 80%;
		margin: 10px 0 20px;
	}
	.decoration{
		width: 4px;
		height: 20px;
		margin-right: 8px;
		border-radius: 30%;
		background-color: #009688;
	}
	.form-item_content{
		margin: 12px 20px 15px;
	}
	.uni-popup-dialog {
		width: 300px;
		border-radius: 11px;
		background-color: #fff;
	}
	.uni-dialog-title {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		justify-content: center;
		padding-top: 25px;
	}
	
	.uni-dialog-title-text {
		font-size: 16px;
		font-weight: 500;
		color: #909399;
	}
	.period_box{
		height: 60px;
		display: flex;
		align-items: center;
		justify-content: space-around;
	}
	.period_item{
		font-size: 14px;
	}
	.period_item_select{
		font-size: 20px;
		font-weight: 700;
		color: #009688;
	}
	.period{
		margin: 5px;
	}
	.period_cycle_item{
		display: flex;
		justify-content: space-between;
		height: 30px;
		margin: 5px 0px 5px 25px;
	}
	.period_checkbox{
		width: 20px;
		height: 20px;
		border-radius: 50%;
		background: #ffffff;
		box-shadow: 0 0 5px 1px rgba(0, 0, 0, 0.1);
		margin-right: 10px;
	}
	.period_checkbox_select{
		width: 20px;
		height: 20px;
		border-radius: 50%;
		background-color: #009688;
		color: #ffffff;
		box-shadow: 0 0 5px 1px rgba(0, 0, 0, 0.1);
		margin-right: 10px;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.uni-dialog-button-group {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		border-top-color: #f5f5f5;
		border-top-style: solid;
		border-top-width: 1px;
	}
	
	.uni-dialog-button {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
	
		flex: 1;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		height: 45px;
	}
	.uni-border-left {
		border-left-color: #f0f0f0;
		border-left-style: solid;
		border-left-width: 1px;
	}
	
	.uni-dialog-button-text {
		font-size: 16px;
		color: #333;
	}
	
	.uni-button-color {
		color: #007aff;
	}
	.intensity_group{
		height: 70px;
		display: flex;
		align-items: center;
		justify-content: space-around;
	}
	.br{/*留空*/
		height: 250px;
	}
</style>
