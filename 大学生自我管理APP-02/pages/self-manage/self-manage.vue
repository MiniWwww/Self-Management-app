<template>
	<view>
		<view class="navbar_box">
			<view class="part">
				
				<view  @click="goToSport" class="box_item" :style="[{background:((this.sport)?'#f5f5f5':'white')},{fontSize:((this.sport)?'20px':'')}]">运动</view>
				<view  @click="goToSleep" class="box_item" :style="[{background:((this.sleep)?'#f5f5f5':'white')},{fontSize:((this.sleep)?'20px':'')}]">睡眠</view>
				<view  @click="goToPlay" class="box_item" :style="[{background:((this.play)?'#f5f5f5':'white')},{fontSize:((this.play)?'20px':'')}]">娱乐</view>
				
				
			</view>
			<view class="person-icon" >
				<uni-icons @click="gotoCenter"   type="contact" size=30 ></uni-icons>
			</view>
		</view>
		
		<view style="height: 80px;"></view>
		<view class="item">
			<sport v-if="sport"></sport>
			<sleep v-if="sleep"></sleep>
			<play  v-if="play"></play>
		</view>
	</view>
</template>

<script>
	import sport from './component/sport/sport.vue'
	import sleep from './component/sleep/sleep.vue'
	import play from './component/play/play.vue'
	export default {
		components:{sleep, sport, play},
		//在play.vue那里onshow不起作用，因为play.vue是被引入到self-management.vue界面了
		//实际上根本不能到达play.vue界面
		// onShow不起作用，就读不到数据
		// 所以要到self-management.vue这里里写
		onShow() {
			var that=this;
			uni.getStorage({
				key: 'playGoalDATA',
				success(res) {
					
					console.log('获取playGoalDATA成功', res.data);
					// 如果调用play页面的数据？
					// 把play打印出来自己探索json结构就懂了
					// 但是怎么赋值给play界面的变量呢？直接用等号\let\var没用
					
					
					 play.data().swipeList=res.data.PlayGoalList;
					 
					 // console.log('play:',play);
					 // console.log('play.data:',play.data().swipeList);
					 that.reciveSwipeList=res.data.PlayGoalList;
					console.log('res.data.PlayGoalList：',res.data.PlayGoalList)
					console.log('reciveSwipeList:', that.reciveSwipeList);
					
					uni.$emit('updateSwipeList', res.data.PlayGoalList);
				}
				
			});
		},
		data() {
			return {
				sport:true,
				sleep:false,
				play:false,
				reciveSwipeList:[],
			}
		},
		methods: {
			goToSport(){
				this.sport=true;
				this.sleep=false;
				this.play=false;
			},
			goToSleep(){
				this.sport=false;
				this.sleep=true;
				this.play=false;
			},
			goToPlay(){
				this.sport=false;
				this.sleep=false;
				this.play=true;
				
			},
			gotoCenter(){
				uni.navigateTo({
					url:'/pages/self-manage/component/PersonCenter/PersonCenter'
				})
			}
		}
	}
</script>

<style>
	.navbar_box{
		display: flex;
		align-items: center;
		justify-content: center;
		height: 50px;
		padding-top: 30px;
		box-shadow: -2px 3px 5px 0 rgba(0, 0, 0, 0.1);
		position: fixed;
		z-index: 1;
		width: 100%;
		background-color: #ffffff;
	}
	.box_item{
		display: flex;
		align-items: center;
		justify-content: center;
		position: relative;
		width:20%;
		height: 40px;
		font-size: 15px;
		border-radius: 10px;
	}
	.part{
		display: flex;
		align-items: center;
		justify-content: center;
		width:100%;
	}
	.person-icon{
		position: fixed;
		z-index: 2;
		right: 20px;
	}
</style>
