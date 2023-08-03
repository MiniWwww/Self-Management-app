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
		data() {
			return {
				sport:true,
				sleep:false,
				play:false,
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
