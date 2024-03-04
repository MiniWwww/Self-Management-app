<template>
	<view>
		<view class="navbar_box">
			<view class="part">
				
				<view  @click="goToSport" class="box_item" :style="[{fontSize:((this.sport)?'19px':'')}]">
					运动
					<view class="item_bottom" v-if="this.sport"></view>
				</view>
				<view  @click="goToSleep" class="box_item" :style="[{fontSize:((this.sleep)?'19px':'')}]">
					睡眠
					<view class="item_bottom" v-if="this.sleep"></view>
				</view>
				<view  @click="goToPlay" class="box_item" :style="[{fontSize:((this.play)?'19px':'')}]">
					娱乐
					<view class="item_bottom" v-if="this.play"></view>
				</view>
				
				
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
		provide () {    //父组件中通过provide来提供变量，在子组件中通过inject来注入变量。                                             
			return {
				reload: this.reload
			}
		},
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
		onHide() {
			//存储退出时的时间
			var time=new Date(new Date().getTime());
			let y=time.getFullYear();
			let m=time.getMonth()+1;
			let d=time.getDate();
			let h=time.getHours();
			let mi=time.getMinutes();
			let day=time.getDay();
			let livetime=y+'/'+this.addTimes(m)+'/'+this.addTimes(d);
			console.log(livetime);
			uni.setStorage({
				key:'liveTime',
				data:livetime,
				success() {
					console.log("存储时间成功！")
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
			addTimes(m){return m<10?'0'+m:m },
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
			},
			reload () {
			    this.play = false;            //先关闭，
			    this.$nextTick(function () {
			        this.play = true;         //再打开
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
		height: 55px;
		padding-top: 30px;
		box-shadow: -2px 3px 5px 0 rgba(0, 0, 0, 0.1);
		position: fixed;
		z-index: 99;
		width: 100%;
		background-color: #ffffff;
	}
	.box_item{
		display: flex;
		align-items: center;
		justify-content: center;
		position: relative;
		width:16%;
		height: 40px;
		font-size: 15px;
		border-radius: 10px;
	}
	.item_bottom{
		position: absolute;
		top: 35px;
		width: 40%;
		height: 5px;
		border-radius: 30px;
		background-color: #009688;
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
