<template>
	<view style="width: 100%;">
		<view class="play_box">
			<image :src="music_list[num].img" style="height: 100px;" mode="heightFix"></image>
			<view class="play">
				<musicPlay ref="musicPlay" @func="getMsg" :list="music" :BsNav="BsNav" :switAud="true" :autoNext="true" :slideYes="true"></musicPlay>
			</view>
		</view>
		<view class="blank"></view>
		<view class="music_box">
			<view v-for="(item,index) in music_list" :key="item.title">
				<view class="music_item" :class="{'avtive_music_item': num==index}" @click="playit(index)">
					<image class="img" :src="item.img" mode="widthFix"></image>
					<view style="display: flex; justify-content: center; align-items: center; text-align: center;">{{item.title}} </view>
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
						img:'../../../../static/小王子/小王子0.png',
						title:'小王子·序',
						path:'/static/music/shuiqiangushi/xiaowangzi/小王子序章.mp3',
					},
					{
						img:'../../../../static/小王子/小王子1.png',
						title:'小王子1',
						path:'/static/music/shuiqiangushi/xiaowangzi/小王子01.mp3',
					},
					{
						img:'../../../../static/小王子/小王子2.png',
						title:'小王子2',
						path:'/static/music/shuiqiangushi/xiaowangzi/小王子02.mp3',
					},
					{
						img:'../../../../static/小王子/小王子3.png',
						title:'小王子3',
						path:'/static/music/shuiqiangushi/xiaowangzi/小王子03.mp3'
					},
					{
						img:'../../../../static/小王子/小王子4.png',
						title:'小王子4',
						path:'/static/music/shuiqiangushi/xiaowangzi/小王子04.mp3',
					},
					{
						img:'../../../../static/小王子/小王子5.png',
						title:'小王子5',
						path:'/static/music/shuiqiangushi/xiaowangzi/小王子05.mp3',
					},{
						img:'../../../../static/小王子/小王子6.jpg',
						title:'小王子6',
						path:'/static/music/shuiqiangushi/xiaowangzi/小王子06.mp3',
					},{
						img:'../../../../static/小王子/小王子7.jpg',
						title:'小王子7',
						path:'/static/music/shuiqiangushi/xiaowangzi/小王子07.mp3',
					},{
						img:'../../../../static/小王子/小王子8.jpg',
						title:'小王子8',
						path:'/static/music/shuiqiangushi/xiaowangzi/小王子08.mp3',
					},{
						img:'../../../../static/小王子/小王子9.jpg',
						title:'小王子9',
						path:'/static/music/shuiqiangushi/xiaowangzi/小王子09.mp3',
					},{
						img:'../../../../static/小王子/小王子10.jpg',
						title:'小王子10',
						path:'/static/music/shuiqiangushi/xiaowangzi/小王子10.mp3',
					},{
						img:'../../../../static/小王子/小王子11.jpg',
						title:'小王子11',
						path:'/static/music/shuiqiangushi/xiaowangzi/小王子11.mp3',
					},{
						img:'../../../../static/小王子/小王子12.jpg',
						title:'小王子12',
						path:'/static/music/shuiqiangushi/xiaowangzi/小王子12.mp3',
					},{
						img:'../../../../static/小王子/小王子13.jpg',
						title:'小王子13',
						path:'/static/music/shuiqiangushi/xiaowangzi/小王子13.mp3',
					},{
						img:'../../../../static/小王子/小王子14.jpg',
						title:'小王子14',
						path:'/static/music/shuiqiangushi/xiaowangzi/小王子14.mp3',
					},{
						img:'../../../../static/小王子/小王子15.jpg',
						title:'小王子15',
						path:'/static/music/shuiqiangushi/xiaowangzi/小王子15.mp3',
					},{
						img:'../../../../static/小王子/小王子16.jpg',
						title:'小王子16',
						path:'/static/music/shuiqiangushi/xiaowangzi/小王子16.mp3',
					},{
						img:'../../../../static/小王子/小王子17.png',
						title:'小王子17',
						path:'/static/music/shuiqiangushi/xiaowangzi/小王子17.mp3',
					},{
						img:'../../../../static/小王子/小王子18.jpg',
						title:'小王子18',
						path:'/static/music/shuiqiangushi/xiaowangzi/小王子18.mp3',
					},{
						img:'../../../../static/小王子/小王子19.jpg',
						title:'小王子19',
						path:'/static/music/shuiqiangushi/xiaowangzi/小王子19.mp3',
					},{
						img:'../../../../static/小王子/小王子20.jpg',
						title:'小王子20',
						path:'/static/music/shuiqiangushi/xiaowangzi/小王子20.mp3',
					},{
						img:'../../../../static/小王子/小王子21.jpg',
						title:'小王子21',
						path:'/static/music/shuiqiangushi/xiaowangzi/小王子21.mp3',
					},{
						img:'../../../../static/小王子/小王子22.jpg',
						title:'小王子22',
						path:'/static/music/shuiqiangushi/xiaowangzi/小王子22.mp3',
					},{
						img:'../../../../static/小王子/小王子23.jpg',
						title:'小王子23',
						path:'/static/music/shuiqiangushi/xiaowangzi/小王子23.mp3',
					},{
						img:'../../../../static/小王子/小王子24.jpg',
						title:'小王子24',
						path:'/static/music/shuiqiangushi/xiaowangzi/小王子24.mp3',
					},{
						img:'../../../../static/小王子/小王子25.jpg',
						title:'小王子25',
						path:'/static/music/shuiqiangushi/xiaowangzi/小王子25.mp3',
					},{
						img:'../../../../static/小王子/小王子26.jpg',
						title:'小王子26',
						path:'/static/music/shuiqiangushi/xiaowangzi/小王子26.mp3',
					},{
						img:'../../../../static/小王子/小王子27.jpg',
						title:'小王子27',
						path:'/static/music/shuiqiangushi/xiaowangzi/小王子27.mp3',
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
