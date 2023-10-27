<template>
	<view style="margin: 6%;">
		<view style="margin: 6%;">
			<view>
				<view class="system_text">事项：</view>
				<view class="divider"></view>
				<view class="detail_box">
					{{item.title}}
				</view>
			</view>
			<view>
				<view class="system_text">备注：</view>
				<view class="divider"></view>
				<view class="detail_box">
					{{item.note}}
				</view>
			</view>
			<view>
				<view class="system_text">重复日期：</view>
				<view class="divider"></view>
				<view class="detail_box">
					{{item.cycle}}
				</view>
			</view>
			<view v-if="times">
				<view class="system_text">重复次数：</view>
				<view class="divider"></view>
				<view class="detail_box">
					{{times}}
				</view>
			</view>
			<view>
				<view class="system_text">强度：</view>
				<view class="divider"></view>
				<view class="detail_box">
					{{item.intensity}}
				</view>
			</view>
			<view>
				<view class="system_text">已完成总次数：</view>
				<view class="divider"></view>
				<view class="detail_box">
					{{item.all_finish_times}}
				</view>
			</view>
			<view v-if="item.timesForAward">
				<view class="system_text">获得奖励的完成次数：</view>
				<view class="divider"></view>
				<view class="detail_box">
					{{item.timesForAward}}
				</view>
			</view>
			<view v-if="item.timesForAward">
				<view class="system_text">奖励：</view>
				<view class="divider"></view>
				<view class="detail_box">
					{{item.award}}
				</view>
			</view>
			<view class="br"></view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
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
		methods: {
			
		}
	}
</script>

<style>
.images {
	width: 33px;
	height: 30px;
}
.divider{/*分割线*/
	height: 6px;
	width: 35%;
	background: #85cd91;
	border-radius: 8px;/*给边框设置圆角*/
	margin-left: 9%;
	margin-bottom: 25px;
}
.system_text{/*标题区*/
	padding: 10px;
	color: #000000;
	font-size: 18px;
	font-weight: bold;
	display: flex;
}
.detail_box {/*内容框*/
	margin: 10px 20px 30px;
	display: flex;
	align-items: center;
	padding: 15px 15px;
	font-size: 14px;
	color: #444444;
	box-shadow: -1px 1px 5px 1px rgba(207, 239, 209, 1.0), -1px 2px 1px 0 rgba(255, 255, 255) inset;
	word-break: break-all;
	border-style: ridge;/*设置一个ridge形式的边框*/
	border-radius: 5px;/*给边框设置圆角*/
	background: #fafffc;
	word-break: break-all;
}
.datail_text {/*内容文字*/
	font-size: 14px;
	color: #888888;
	padding-left: 10px;
}
.detail_time_box {/*时间框*/
	margin: 10px 20px;
	display: flex;
	align-items: center;
	padding: 15px 15px;
	font-size: 14px;
	color: #444444;
	box-shadow: -1px 1px 5px 1px rgba(207, 239, 209, 1.0), -1px 2px 1px 0 rgba(255, 255, 255) inset;
	word-break: break-all;
	border-style: ridge;/*设置一个ridge形式的边框*/
	border-radius: 5px;/*给边框设置圆角*/
	background: #fafffc;
	word-break: break-all;
} 
.br{/*留空*/
	height: 250px;
}
</style>
