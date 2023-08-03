<template>
	<view class="box">
		<view class="todo_box">
			<view  v-for="(item,index) in today_list" :key="item.title" > 	<!--可计时,计时结束时完成一次该运动-->
				<view class="todo_item" :class="{'todo_finish':item.finish}" @click="finish_sport(index)">
					<view class="todo_item_left">
						<view class="todo_checkbox">
							<view v-if="item.times" style="color: #8c8c8c;">{{item.times}}</view>
						</view>
						<view class="todo_title"> {{item.title}}</view>
					</view>
					<view class="todo_item_right">{{item.cycle}}</view>
				</view>
				
			</view>
			
		</view>
		<view class="select_pop">
			<view class="select_box" v-if="activePopUp">
				<view class="select_item_1" @click="to_add">添加</view>
				<view class="select_item_2" @click="to_analyse">统计</view>
			</view>
			<view class="button" @click="popUp"></view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"sport",
		data() {
			return {
				activePopUp: false,
				list:[{title: '跳绳', period_free: false, period:true, note:'',intensity:'', times:'2', finish: false, cycle:'周一 周三 周五',}, 
					{title: '跑步',period_free: false, period:true, note:'', intensity:'', times:'', finish: false, cycle:''}],
				today_list:[{title: '跳绳', period_free: false, period:true, note:'',intensity:'', times:'2', finish: false, cycle:'周一 周三 周五',},
					{title: '跑步',period_free: false, period:true, note:'', intensity:'', times:'', finish: false, cycle:''}],
			};
		},
		methods:{
			popUp(){
				if(this.activePopUp){
					this.activePopUp=false;
				}
				else{
					this.activePopUp=true;
				}
			},
			to_add(){
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
							}
							that.list.push(obj);
							that.today_list=that.list;
						}
					}
				})
				this.activePopUp=false;
				
			},
			to_analyse(){
				uni.navigateTo({
					url:'/pages/self-manage/sport/sport_analyse'
				})
				this.activePopUp=false;
			},
			finish_sport(index){
				var that=this;
				if(this.today_list[index].times>1){
					uni.showModal({
						title:'提示',
						content: '是否完成一次'+that.today_list[index].title+'？',
						success: function(res){
							if(res.confirm){
								that.today_list[index].times=that.list[index].times-1;
								uni.showToast({
									title:'完成一次'+that.today_list[index].title+'！',
									icon:'none',
								})
							}
						}
					})
				}
				else{
					if(!this.today_list[index].finish){
						uni.showModal({
							title:'提示',
							content:'是否完成'+that.today_list[index].title+'？',
							success:function(res){
								if(res.confirm){
									that.today_list[index].finish=true;
									uni.showToast({
										title:'今天的'+that.today_list[index].title+'已完成！',
										icon:'none',
									})
								}
							}
						})
					}
				}
			},
			
		}
	}
</script>

<style>
	.box{
		
	}
	.todo_box{
		
	}
	.todo_item{
		position: relative;
		display: flex;
		align-items: center;
		padding: 15px;
		margin: 15px;
		border-radius: 10px;
		height: 30px;
		background: #e3fde4;
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
	.todo_item_right{
		color: #8c8c8c;
		font-size: 14px;
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
		background: #d1fde1;
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
		background: #c3d8cf;
	}
	.todo_finish.todo_item:after {
		background: #ccc;
	}
	.select_pop{
		display: flex;
		align-items: center;
		width: 45%;
		height: 40%;
		position: fixed;
		bottom: 0;
		right: 30px;
	}
	.select_box{
		width: 70%;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
	}
	.select_item_1{
		display: flex;
		align-items: center;
		justify-content: center;
		margin: 0 auto;
		width: 50px;
		height: 50px;
		border-radius: 50%;
		background-color: #d9f5db;
		box-shadow: -1px 1px 5px 2px rgba(0, 0, 0, 0.1), -1px 1px 1px 0 rgba(255, 255, 255) inset;
		
		
	}
	.select_item_2{
		display: flex;
		align-items: center;
		justify-content: center;
		margin: 0 auto;
		width: 50px;
		height: 50px;
		border-radius: 50%;
		background-color: #d9f5db;
		box-shadow: -1px 1px 5px 2px rgba(0, 0, 0, 0.1), -1px 1px 1px 0 rgba(255, 255, 255) inset;
		
	}
	.button{
		position: absolute;
		right: 10%;
		margin: 0 auto;
		width: 50px;
		height: 50px;
		border-radius: 50%;
		background-color: #d9f5db;
		box-shadow: -1px 1px 5px 2px rgba(0, 0, 0, 0.1), -1px 1px 1px 0 rgba(255, 255, 255) inset;
	}
</style>