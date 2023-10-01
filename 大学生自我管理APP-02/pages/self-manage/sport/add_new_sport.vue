<template>
	<view>
		<uni-card title="运动项目">
			<textarea :maxlength="20" v-model="item.title" auto-height placeholder="请输入运动项目"></textarea>
		</uni-card>
		<uni-card title="备注">
			<textarea v-model="item.note" auto-height placeholder="请输入备注"></textarea>
		</uni-card>
		<uni-card title="周期">
			<view class="period_box">
				<view class="period_item" :class="{ 'period_item_select': item.period_free }" @click="select_period_free">自由</view>
				<view class="period_item" :class="{ 'period_item_select': item.period }" @click="select_period">定时</view>
			</view>
			<view class="peroid" v-if="item.period">
				<view class="period_cycle">
					<view style="color: black; font-size: 16px;">重复日期(不选择时默认每天)</view>
					<view class="period_cycle_item" v-for="(i, index) in weekList" :key="i.time" @click="select_period_time(index)">
						<view >{{i.time}}</view>
						<view class="period_checkbox" :class="{'period_checkbox_select': i.check}">
							<view v-if="i.check">√</view>
						</view>
					</view>
				</view>
				<view class="period_times">
					<view style="color: black; font-size: 16px;">次数</view>
					<textarea style="margin-left: 10px;" v-model="item.times" auto-height placeholder="请输入每天完成的次数"></textarea>
				</view>
			</view>
		</uni-card>
		<uni-card title="强度">
			<radio-group class="intensity_group">
				<radio color="#a8bda8">低</radio>
				<radio color="#a8bda8">中</radio>
				<radio color="#a8bda8">高</radio>
			</radio-group>
		</uni-card>
		<uni-card title="达成奖励次数:">
			<textarea v-model="t" auto-height placeholder="您希望在每完成几次该任务时对自己进行奖励呢？" placeholder-style="font-size:13px" inputmode="numeric" @input="jiangli"></textarea>
		</uni-card>
		<uni-card title="奖励内容:"> <!--v-if="item.timesForAward" -->
			<textarea v-model="item.award" auto-height :disabled="!item.timesForAward" :placeholder="text"></textarea>
		</uni-card>
		
		<view class="save_button" @click="save">√</view>
		<view class="br"></view>
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
				item: {title:'', period_free:true, period:'', note:'', intensity: '低', times: '', cycle: '',timesForAward:0, award:''},
				t:Number,
				text:"请先填写上一项",
			};
		},
		methods: {
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
			radioChange:function(e){
				this.item.intensity=e.detail.value;
				console.log(this.item.intensity);
			},
			jiangli(){
				if(this.t!=0){
					
					this.item.timesForAward=this.t;
					this.text="您希望对自己进行什么奖励呢？";
					console.log(this.item.timesForAward);
				}
			},
			save(){
				if(this.item.title==''){
					uni.showModal({
						title:'提示',
						content:'请输入运动项目！',
						showCancel:false
					})
				}
				else{
					var cycle=''
					this.weekList.forEach(v=>{
						if(v.check==true){
							cycle=cycle+' '+v.time;
						}
					});
					//console.log(cycle);
					this.item.cycle=cycle;
					if(this.item.period&&this.item.cycle==''){
						this.item.cycle='每天';
					}
					if(this.item.period_free){
						this.item.cycle='自由'
					}
					const eventChannel = this.getOpenerEventChannel();
					eventChannel.emit('addNewSport',this.item);
					console.log('Success!',this.item);
					this.item = {title:'', period_free:true, period:'', note:'', intensity: '低', times: '', cycle: '',timesForAward:0,award:''};
					uni.navigateBack();
				}
			}
		}
	}
</script>

<style>
	page {
		background-color: #f2fff3
	}
	.period_box{
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
		color: #a8bda8;
	}
	.peroid{
		margin: 5px;
	}
	.period_cycle{
		
	}
	.period_cycle_item{
		display: flex;
		justify-content: space-between;
		height: 30px;
		margin-left: 10px;
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
		background-color: #a8bda8;
		color: #ffffff;
		box-shadow: 0 0 5px 1px rgba(0, 0, 0, 0.1);
		margin-right: 10px;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.intensity_group{
		display: flex;
		align-items: center;
		justify-content: space-around;
	}
	.save_button{
		position: fixed;
		display: flex;
		align-items: center;
		justify-content: center;
		right: 10%;
		bottom: 20%;
		margin: 0 auto;
		width: 50px;
		height: 50px;
		border-radius: 50%;
		background-color: #d9f5db;
		color: #85a181;
		font-size: 20px;
		font-weight: 900;
		box-shadow: -1px 1px 5px 2px rgba(0, 0, 0, 0.1), -1px 1px 1px 0 rgba(255, 255, 255) inset;
	}
	.award{
		background: transparent;
	}
	.br{/*留空*/
		height: 250px;
	}
</style>
