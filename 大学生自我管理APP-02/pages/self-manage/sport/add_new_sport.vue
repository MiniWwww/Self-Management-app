<template>
	<view class="form-box">
		<view class="form-item_outside">
			<uni-section style="height: 50px;" title="运动项目" padding>
				<template v-slot:decoration>
					<view class="decoration"></view>
				</template>
			</uni-section>
			<view class="form-item_content">
				<textarea v-model="item.title" :maxlength="20"  auto-height placeholder="请输入运动项目" style="width: 260px;"></textarea>
			</view>
		</view>
		<view class="form-item_outside">
			<uni-section style="height: 50px;" title="备注" padding>
				<template v-slot:decoration>
					<view class="decoration"></view>
				</template>
			</uni-section>
			<view class="form-item_content">
				<textarea v-model="item.note" auto-height placeholder="请输入备注" style="width: 260px;"></textarea>
			</view>
		</view>
		<view class="form-item_outside">
			<uni-section style="height: 50px;" title="周期" padding>
				<template v-slot:decoration>
					<view class="decoration"></view>
				</template>
			</uni-section>
			<view class="period_box">
				<view class="period_item" :class="{ 'period_item_select': item.period_free }" @click="select_period_free">自由</view>
				<view class="period_item" :class="{ 'period_item_select': item.period }" @click="select_period">定时</view>
			</view>
			<view class="peroid" v-if="item.period">
				<view class="period_cycle">
					<view style="color: black; font-size: 16px; margin: 12px 0 10px 5px;">重复日期(不选择时默认每天)</view>
					<view class="period_cycle_item" v-for="(i, index) in weekList" :key="i.time" @click="select_period_time(index)">
						<view >{{i.time}}</view>
						<view class="period_checkbox" :class="{'period_checkbox_select': i.check}">
							<view v-if="i.check">√</view>
						</view>
					</view>
				</view>
				<view class="period_times">
					<view style="color: black; font-size: 16px; margin: 0 0 10px 5px;">次数</view>
					<textarea style="margin: 5px 0 5px 25px;" v-model="item.times" auto-height placeholder="请输入每天完成的次数"></textarea>
				</view>
			</view>
		</view>
		<view class="form-item_outside">
			<uni-section style="height: 50px;" title="强度" padding>
				<template v-slot:decoration>
					<view class="decoration"></view>
				</template>
			</uni-section>
			<radio-group class="intensity_group" @change="radioChange">
				<radio value="低" color="#009688">低</radio>
				<radio value="中" color="#009688">中</radio>
				<radio value="高" color="#009688">高</radio>
			</radio-group>
		</view>
		<view class="form-item_outside">
			<uni-section style="height: 50px;" title="达成奖励次数" padding>
				<template v-slot:decoration>
					<view class="decoration"></view>
				</template>
			</uni-section>
			<view class="form-item_content">
				<textarea v-model="t" auto-height placeholder="您希望在每完成几次该任务时对自己进行奖励呢？"
				 inputmode="numeric" placeholder-style="font-size:13px" style="width: 260px;" @input="jiangli"></textarea>
			</view>
		</view>
		<view class="form-item_outside">
			<uni-section style="height: 50px;" title="奖励内容" padding>
				<template v-slot:decoration>
					<view class="decoration"></view>
				</template>
			</uni-section>
			<view class="form-item_content">
				<textarea v-model="item.award" auto-height  :disabled="!item.timesForAward" :placeholder="text" style="width: 260px;"></textarea>
			</view>
		</view>
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
				//console.log(this.item.intensity);
			},
			jiangli(){
				if(this.t!=0){
					
					this.item.timesForAward=this.t;
					this.text="您希望对自己进行什么奖励呢？";
					//console.log(this.item.timesForAward);
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
		background-color: rgb(245, 245, 245);
	}
	.form-box{
		background-color: rgb(245, 245, 245);
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	.form-item_outside{
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
	.card_box{
		margin: 25px 10px;
		border-radius: 50px;
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
		color: #009688;
	}
	.peroid{
		margin: 5px;
	}
	.period_cycle{
		margin-top: 15px;
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
	.period_times{
		margin: 7px 0 20px 0;
	}
	.intensity_group{
		height: 40px;
		display: flex;
		align-items: center;
		justify-content: space-around;
	}
	.save_button{
		position: fixed;
		display: flex;
		align-items: center;
		justify-content: center;
		bottom: 100rpx;
		right: 40rpx;
		margin: 0 auto;
		width: 90rpx;
		height: 90rpx;
		line-height: 90rpx;
		border-radius: 50%;
		background-color: #009688;
		color: #fff;
		font-size: 20px;
		font-weight: 900;
		box-shadow: 0px 5px 10px rgba(0, 150, 136, 0.4);
	}
	.award{
		background: transparent;
	}
	.br{/*留空*/
		height: 250px;
	}
</style>
