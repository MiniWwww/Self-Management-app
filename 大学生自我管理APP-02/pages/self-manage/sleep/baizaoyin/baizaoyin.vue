<template>
	
	<view style="width: 100%;">
		<view class="play_box">
			<image :src="music_list[num].img" style="height: 100px;" mode="heightFix"></image>
			<view class="play">
				<musicPlay ref="musicPlay" @func="getMsg" :list="music" :BsNav="BsNav" :switAud="true" :autoNext="true" :slideYes="true"></musicPlay>
			</view>
		</view>
		<view class="blank"></view>
		<view class="music_box"><!--自主上传音频？-->
			<view v-for="(item,index) in music_list" :key="item.title">
				<view class="music_item" :class="{'avtive_music_item': num==index}" @click="playit(index)">
					<image class="img" :src="item.img" mode="heightFix"></image>
					<view  style="display: flex; justify-content: center; align-items: center; text-align: center;">{{item.title}} </view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import musicPlay from '../../component/musicPlay/musicPlay.vue'
	export default {
		components: {
			musicPlay
		},
		data() {
			return {
				item:{
						img:'../../../../static/海.png',
						title:'海浪与风',
						path:'https://link.jscdn.cn/1drv/aHR0cHM6Ly8xZHJ2Lm1zL3UvcyFBa0pxUm1sZGhObmJmaU5vS3VrRDNiU2JLemc_ZT1qd2ViRlI.mp3'
				},
				num:0,
				list: [ //音频文件
					// {
					// 	recorPath: 'http://music.tmyou.com.cn/music/359900.mp3'
					// },
					// {
					// 	recorPath: 'http://music.tmyou.com.cn/music/82702.mp3'
					// },
					// {
					// 	recorPath: 'http://music.tmyou.com.cn/music/214470816.mp3'
					// },
				],
				BsNav: [ //倍数-自定义
					{
						id: 1.0,
						bs: '1.0'
					}, {
						id: 1.5,
						bs: '1.5'
					}, {
						id: 2.0,
						bs: '2.0'
					}
				],
				music_list:[
					{
						img:'../../../../static/海.png',
						title:'海浪与风',
						path:'https://link.jscdn.cn/1drv/aHR0cHM6Ly8xZHJ2Lm1zL3UvcyFBa0pxUm1sZGhObmJmaU5vS3VrRDNiU2JLemc_ZT1qd2ViRlI.mp3',
					},
					{
						img:'../../../../static/雨.png',
						title:'细雨沙沙',
						path:'https://link.jscdn.cn/1drv/aHR0cHM6Ly8xZHJ2Lm1zL3UvcyFBa0pxUm1sZGhObmJmRXNneEdROWo4ak5DSFE_ZT1xeElyeXk.mp3',
					},
					{
						img:'../../../../static/森林.png',
						title:'鸟儿与林',
						path:'https://link.jscdn.cn/1drv/aHR0cHM6Ly8xZHJ2Lm1zL3UvcyFBa0pxUm1sZGhObmJnUUJvajNlY1hfLW96OG9nP2U9d1NlWWdi.mp3',
					},
					{
						img:'../../../../static/图书馆.png',
						title:'图书馆',
						path:'https://link.jscdn.cn/1drv/aHR0cHM6Ly8xZHJ2Lm1zL3UvcyFBa0pxUm1sZGhObmJmN3owSWFaM0s3aGlkX0E_ZT1kZFViNzg.mp3'
					},
					{
						img:'../../../../static/草丛.png',
						title:'蛙虫和鸣',
						path:'https://link.jscdn.cn/1drv/aHR0cHM6Ly8xZHJ2Lm1zL3UvcyFBa0pxUm1sZGhObmJnUUU1QjFFOVpHQi15X3plP2U9QnJuMHpS.mp3',
					},
				]
			}
		},
		computed:{
			music(){
				var that=this;
				let newlist=[];
				for(let i=0;i<that.music_list.length;i++){
					let obj={
						recorPath: that.music_list[i].path
					};
					newlist.push(obj);
				}
				console.log(newlist);
				that.list=newlist;
				
				return newlist
			}
		},
		methods: {
			getMsg(data){
				this.num=data;
			},
			playit(index){
				this.num=index;
				console.log(this.num);
				this.$refs.musicPlay.clickit(index)
			}
		}
	}
</script>

<style>
	.play_box{
		padding-top: 10px;
		width: 100%;
		height: 250px;
		background-color: white;
		box-shadow: 0px 1px 5px 1px rgba(0, 0, 0, 0.1), -1px 2px 1px 0 rgba(255, 255, 255) inset;
		border-radius: 0px 0px 10px 10px;
		position: fixed;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		z-index: 1;
	}
	.play{
		
	}
	.blank{
		height: 270px;
	}
	.music_box{
		width: 90%;
		display: flex;
		justify-content: flex-start;
		align-items: center;/* 
		margin-top: 10px; */
		flex-wrap: wrap;
		margin: 6%;
	}
	.music_item{
		height: 100px;
		width: 90px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		margin: 8px;
	}
	.avtive_music_item{
		height: 100px;
		width: 90px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		margin: 8px;
		box-shadow: 0px 1px 5px 1px rgba(0, 0, 0, 0.1), -1px 2px 1px 0 rgba(255, 255, 255) inset;
		border-radius: 10px;
	}
	.img{
		width: 60px;
	}
</style>
