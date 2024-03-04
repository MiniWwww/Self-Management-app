<template>
	<view id="moments" :class="{ 'hidden': cover }">

<view class="home-pic" @click="show()" :style="{ backgroundImage: 'url(' + bg + ')' }">
			<!-- <image src='../../static/self-record/index/test/bgi02.jpg'></image> -->
			<!-- <div class="cover" v-if="showCover"></div> --> 
			<view class="mask" v-if="cover">
				<!--  @touchmove.prevent阻止滚动事件 -->
				<view class="content">
					<view class="mask_title">
						<div class="left"> <p>切换背景图</p> </div>
						<div class="right" @click.stop="hide()">X</div> 
						
					</view>
					<ul class="bg_content">
						<li v-for="item in bg_lis" :key="item.id" @click="end(item)"> <image :src="'../../static/bg/' + item.src" mode="aspectFill"></image> </li>
					</ul>
				</view>  
			</view> 
			<view class="home-pic-base">   
				<!-- “我”的用户名和用户头像 --> 
				<view class="top-pic"> 
					<image class="header" mode="aspectFill" :src="userhead"></image> 
				</view>
				<view class="top-name">{{username}}</view>  
				<view class="top-sig">{{userMotto}}</view> 
			 
			</view>    
		</view>  
		
		<view class="icon">
			<view class="">
<uni-datetime-picker 
    type="daterange" 
    ref="calendar"  
    :start="calendarStart" 
    :end="calendarEnd" 
    class="calendar" 
    @change="calendar"  
    v-model="calendar_data" 
	:cleay = "true"
	@cleay = "onCleay"
    @close="clearCalendarData">
</uni-datetime-picker>
			
			</view>
			<view class="">
				      <uni-data-select
				        v-model="valueRange"
				        :localdata="range"
				        @change="changeRange"
						style="background-color: white;"
				      ></uni-data-select>
			</view>
			
		</view> 
 
		<!-- 记录数据posts -->
		<!-- <view class="moments__post" v-for="(post,index) in (filteredPosts.length > 0 ? filteredPosts : posts)" :key="index" :id="'post-'+index"> -->
<!-- <view class="moments__post" v-if="filteredPosts.length > 0" v-for="(post,index) in filteredPosts" :key="index" :id="'post-'+index">		 -->
<view class="moments__post" v-for="(post,index) in currentPosts" :key="index" :id="'post-'+index" v-if="filteredPosts.length>0">	
			<view class="post-top-outside">
				<view class="post-top"> 
					<view class="post-left">
						<!-- 发布该条记录的用户头像 -->
						<image class="post_header" mode="aspectFill" :src="post.header_image" @click="maskClick"></image>
					</view>

					<view class="post_right">
						<!-- 用户名及文本内容 -->
						<text class="post-username">{{post.username}}</text>
						<view class="timestamp">{{post.timestamp}}</view>
					</view> 
				</view>
				<uni-icons type="trash" size="22" color="white" class="trash" @click="bindClick(index)"></uni-icons>
			</view>
			<view class="post_content">
				<!--内容--> 
				<view id="paragraph" class="paragraph">{{post.content.text}}</view>
				<!-- 图片 -->
				<view class="thumbnails">
					<view :class="post.content.images.length === 1?'my-gallery':'thumbnail'"
						v-for="(image, index_images) in post.content.images" :key="index_images">
						<image class="gallery_img" lazy-load mode="aspectFill" :src="image" :data-src="image"
							@tap="previewImage(post.content.images,index_images)"></image>
					</view>
				</view>
				<!-- 操作选项 -->
				<view class="toolbar">
					<view class="like" @tap="like(index)">
						<!--<image :src="post.islike===0?'../../static/self-record/index/islike.png':'../../static/self-record/index/like.png'"></image>-->
						<uni-icons v-if="!post.islike" type="hand-up" color="white" size="22"></uni-icons>
						<uni-icons v-if="post.islike" type="hand-up-filled" color="white" size="22"></uni-icons>
					</view>
					<view class="comment" @tap="comment(index)">
						<!--<image src="../../static/self-record/index/comment.png"></image>-->
						<uni-icons type="chatbubble" color="white" size="22"></uni-icons> 
					</view>
				</view>
				<!-- 点赞与评论 -->
				<view class="post-footer"> 
					<view class="footer_content">
						<image class="liked" src="../../static/self-record/index/liked.png"></image>
						<text class="nickname" v-for="(user,index_like) in post.like"
							:key="index_like">{{user.username}}</text>
					</view>
					<view class="footer_content" v-for="(comment,comment_index) in post.comments.comment"
						:key="comment_index" @tap="reply(index,comment_index)"
						@touchstart="del_comment(index,comment_index)" @touchmove="hand_move()" @touchend="del_end()">
						<text class="comment-nickname">{{comment.username}}: <text
								class="comment-content">{{comment.content}}</text></text>
					</view>
				</view>
			</view>
		</view>
		
		<view v-if="filteredPosts.length<1" class="null"> 动态空空如也~~~ </view>

		<!-- 结束posts -->

		<view class="foot" v-show="showInput">
			<chat-input @send-message="send_comment" @blur="blur" :focus="focus"
				:placeholder="input_placeholder"></chat-input>
		</view> 

		<view class="uni-loadmore" v-if="showLoadMore">{{loadMoreText}}</view>
	</view>

</template>

<script>
	import chatInput from './component/chatinput/chatinput.vue'; //评论区的input框
	import sysMsg from '../../common/self-record/system-courage.js'; //系统发送的鼓励的话
	import mytime from './mytime.js'; //得到所需的时间格式
import { isArray } from 'util';
	export default {

		components: {
			chatInput,
		},
		  
		watch:{
			posts(){
				this.filteredPosts = this.posts
			}
		},  
 
		data() {
			return {
				valueRange:0,
				flag : true,
				     range: [
						 { value: 0, text: "全部" },
				        { value: 1, text: "系统" },
				        { value: 2, text: "我" },
						],
				calendarStart : "",
				calendarEnd : "",
				calendar_data : "",
				showCalendar : false,
				bg_lis : [
					{ id : 0, src: 'bg_0.jpg' },
					{ id : 1, src: 'bg_1.jpg' },
					{ id : 2, src: 'bg_2.jpg' },
					{ id : 3, src: 'bg_3.jpg' },
					{ id : 4, src: 'bg_4.jpg' },
					{ id : 5, src: 'bg_5.jpg' },
					{ id : 6, src: 'bg_6.jpg' }, 
					{ id : 7, src: 'bg_7.png' },
					{ id : 8, src: 'bg_8.jpg' }, 
					{ id : 9, src: 'bg_9.jpg' }, 
					{ id : 10, src: 'bg_10.jpg' },
					{ id : 11, src: 'bg_11.jpg' },
				], 
				sleep_success_Count: Number, 
				getup_success_Count: Number,
				days: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
				showCover : false,
				 bg: uni.getStorageSync('bg'),
				cover : false,

				//每条记录数据，注意每发布一条新的就插入数组头部
				posts: [{
						//"post_id": 1,
						"uid": 1,
						"username": "系统",
						"header_image": "/static/self-record/system-head.png",
						"content": {
							"text": "",
							"images": [
								"/static/self-record/index/test/pig-01.jpg",
								"/static/self-record/index/test/pig-02.jpg",
								"/static/self-record/index/test/pig-03.jpg",
								"/static/self-record/index/test/pig-04.jpg",
								"/static/self-record/index/test/pig-05.jpg",
								"/static/self-record/index/test/pig-06.jpg",
								"/static/self-record/index/test/pig-07.jpg",
								"/static/self-record/index/test/pig-08.jpg",
								"/static/self-record/index/test/pig-09.jpg"
							]
						},
						"islike": 0,
						"like": [{
							"uid": 1,
							"username": "系统",
						}],
						"comments": {
							"total": 0,
							"comment": []
						},
						"timestamp": "2023-01-01 12:40:20"
					},
					{
						//"post_id": 0,
						"uid": 1,
						"username": "系统",
						"header_image": "/static/self-record/system-head.png",
						"content": {
							"text": "欢迎来到一个人的朋友圈！ \n你可以在这里记录你的美好时光和所思所想",
							"images": ["/static/self-record/system-msg/欢迎.bmp"]
						},
						"islike": 0,
						"like": [{
							"uid": 1,
							"username": "系统"
						}],
						"comments": {
							"total": 1,
							"comment": [{
									"uid": 1,
									"username": '系统',
									"content": "提示：想要删除一条记录，可以点击该记录头像处哦~"
								},
								{
									"uid": 2,
									"username": '系统',
									"content": "提示：长按评论可删除"
								}
							]
						},
						"timestamp": "2023-01-01 12:40:10"
					}
				],
				last_sys_date: '', //上一次系统发出鼓励消息的日期
				publish_msg: [],

				user_id: 2, //“我”的用户id
				username: '我',
				userMotto: '',
				userhead: '../../static/self-record/user-head.png', //用户头像，考虑与个人信息页面的关联？

				index: '',
				comment_index: '',

				input_placeholder: '评论', //评论框占位内容
				focus: false, //是否自动聚焦输入框
				is_reply: false, //回复还是评论
				showInput: false, //评论输入框
				loop: 0, //定时器

				screenHeight: '', //屏幕高度(系统)
				platform: '',
				windowHeight: '', //可用窗口高度(不计入软键盘)

				loadMoreText: "加载中...",
				showLoadMore: false,
				filteredPosts : []
			} 
		}, 

		onLoad() { 
			uni.getSystemInfo({ //获取设备信息
				success: (res) => {
					this.screenHeight = res.screenHeight;
					this.platform = res.platform;
				}
			});
			uni.startPullDownRefresh();
			// 获取头像
			// let avator = uni.getStorage('avator')
			// let username = uni.getStorage('userInfo').nickname
			// this.username = username != '' ? username : '我'
			// console.log(avator);
			// this.userhead = avator
			// console.log('onLoad获取头像成功'+this.userhead);
		},

		onShow() {
			uni.onWindowResize((res) => { //监听窗口尺寸变化,窗口尺寸不包括底部导航栏
				if (this.platform === 'ios') {
					this.windowHeight = res.size.windowHeight;
					this.adjust();
				} else {
					if (this.screenHeight - res.size.windowHeight > 60 && this.windowHeight <= res.size
						.windowHeight) {
						this.windowHeight = res.size.windowHeight;
						this.adjust();
					}
				}
			});
			

			//获取本地存储的数据
			let res1 = [];
			res1 = uni.getStorageSync('self-record-posts');
			if (res1.length) {
				this.posts = res1;
			} //以防本地存储为空，把固定的系统消息填进去
			console.log('从本地存储读取记录数据', res1);

			let res2 = uni.getStorageSync('last-system-msg-date');
			this.last_sys_date = res2;
			console.log('从本地读取上一次系统鼓励消息的日期', res2);
			//获取头像
			let avator = uni.getStorageSync('avator');
			if (avator) {
				this.userhead = avator;
				console.log('获取后的头像' + this.userhead);
			} else {
				this.userhead = '../../static/self-record/user-head.png'
			}
			//获取昵称
			console.log('获取前的昵称' + this.username)
			let username = uni.getStorageSync('userInfo').nickname
			let userMotto = uni.getStorageSync('userInfo').motto
			if (username) {
				this.username = username;
				console.log('获取后的昵称' + this.username);
			} else {
				this.username = '我';
			}

			if (userMotto) {
				this.userMotto = userMotto;
				console.log('获取后的昵称' + this.userMotto);
			} else {
				this.userMotto = '这里是一个个性签名';
			}


			this.sleep_success_Count = uni.getStorageSync('self-record-sleep_success_Count');
			console.log('获取后的上一次sleep_success_Count', this.sleep_success_Count);
			//获取当前时间，看系统是否需要发送鼓励消息
			let now = new Date();
			//获取now具体时间
			let now_Y = now.getFullYear();
			let now_M = now.getMonth() + 1;
			let now_D = now.getDate();
			//从本地存储取上一次系统消息的数据（记为old），以便将其日期与当前日期比较
			let e = this.last_sys_date;
			if (e == null || e === '') {
				e = '2023-01-01 00:01:01';
			} //以防该数据为空
			let old = new Date(e);
			let old_Y = old.getFullYear();
			let old_M = old.getMonth() + 1;
			let old_D = old.getDate();
			//判断今天是否晚于上次系统消息日期，是则调用系统发消息函数
			if ((old_Y < now_Y) || ((old_Y == now_Y) && (old_M < now_M)) || ((old_Y == now_Y) && (old_M == now_M) && (
					old_D < now_D))) {
				this.system_send(now.getTime());
			}


			//如果是从发布页面回来，获取用户发布的新记录数据，再重新保存所有数据
			if (this.publish_msg.length) {
				this.posts.unshift(this.publish_msg[0]);
				uni.setStorageSync('self-record-posts', this.posts);
				console.log('发布新记录，保存到本地存储');
				this.publish_msg = [];
			}

			// todoRemind一天只执行一次

			const today = new Date().toISOString().split('T')[0]; // 获取当前日期，格式为"YYYY-MM-DD"
			const lastExecuted = uni.getStorageSync('lastExecutedDate')
			console.log(today + " " + lastExecuted);
			if (lastExecuted !== today) {
				// 如果函数今天尚未执行，则执行它
				this.todoRemind();


				// 更新localStorage中的记录
				uni.setStorageSync('lastExecutedDate', today)
			}
			// 娱乐目标完成
			this.playRemind();
			// 完成一次运动
			this.SportRemind();
			// 睡眠目标完成
			this.Getup_Sleep_Remind();
			// 运动目标即将完成
			this.SportGoingtoAchieveRemind();
			//睡眠目标即将完成
			this.SleepGoingtoAchiveRemind();
			//起床目标即将完成
			this.GetUpGoingtoAchiveRemind();



		},

		onHide() {
			uni.offWindowResize(() => { //取消监听窗口尺寸变化
				console.log("offWindowResize");
			});

			var that = this;
			uni.setStorageSync('self-record-posts', that.posts);
			uni.setStorageSync('last-system-msg-date', that.last_sys_date);
			console.log('离开页面时，保存数据到本地存储');

			uni.$off('publish'); //移除监听事件，避免重复监听
		},

		onUnload() {
			this.max = 0,
				this.data = [],
				this.loadMoreText = "加载更多",
				this.showLoadMore = false;
		},

		onReachBottom() { //监听上拉触底事件
			console.log('onReachBottom');
			this.showLoadMore = true;
			setTimeout(() => {
				this.loadMoreText = "暂无更多";
			}, 1000);
		},

		onPullDownRefresh() { //监听下拉刷新动作
			console.log('onPullDownRefresh');
			// 这里获取数据

			setTimeout(function() {
				//初始化数据
				uni.stopPullDownRefresh(); //停止下拉刷新
			}, 1000);
		},

		onNavigationBarButtonTap(e) { //监听标题栏点击事件
			if (e.index == 0) {
				this.navigateTo('./publish/publish')
			}
		},

		computed: {
		        currentPosts() {
		            return this.filteredPosts.length > 0 ? this.filteredPosts : this.posts;
		        }
		    },
		
		created() {
			this.bg = uni.getStorageSync('bg')
			let record = uni.getStorageSync('self-record-posts');
			this.filteredPosts = record
		},

		methods: { 
			onCleay(){
				console.log(this.calendar_data)
				console.log(2123)
			},
			 clearCalendarData() { 
					console.log(12312)
			    }, 
		changeRange() {
		    const id = this.valueRange; 
			 const time = this.calendar_data; 
			console.log(id)
		    let record = uni.getStorageSync('self-record-posts');
			this.flag = false

			const selectedStarted = new Date(time[0]).setHours(0, 0, 0, 0);
			const selectedEnd = new Date(time[1]).setHours(23, 59, 59, 999);
			
			if(!Array.isArray(record)){
				this.filteredPosts = []
				return 
			}

			const items = [] 
			if(this.calendar_data !== ""){
				if(id === 0){
					record.forEach((item) => {
					    const timeStamp = new Date(item.timestamp).getTime();
					    if (timeStamp >= selectedStarted && timeStamp <= selectedEnd) {
							console.log(item)
							items.push(item);  
					    }
					});  
					this.filteredPosts = items
				}else if(id === 1){

					record.forEach((item) => {
					    const timeStamp = new Date(item.timestamp).getTime();
					    if (timeStamp >= selectedStarted && timeStamp <= selectedEnd) {
							if(item.username === "系统"){
								console.log(item)
								items.push(item);  
							}
							
					    }
					}); 
					this.filteredPosts = items
				}else if(id === 2){

					
					record.forEach((item) => {
					    const timeStamp = new Date(item.timestamp).getTime();
					    if (timeStamp >= selectedStarted && timeStamp <= selectedEnd) {
							if(item.username!== "系统"){
								console.log(item)
								items.push(item);  
							}
							
					    }
					}); 
					this.filteredPosts = items
				}
			}else{ 
				if (!Array.isArray(record)) { // 检查是否为数组
				    console.error("Storage data is not an array");
				    this.filteredPosts = []; // 如果不是数组，则将record赋值为空数组
				}
						
				if (id === 0) {
				    this.filteredPosts = record; // 如果id为0，直接赋值为record
				} else {
				    this.filteredPosts = record.filter(item => item.uid === id); // 否则执行过滤操作
				}
			}
			
		},
		
		calendar() { 
		    const time = this.calendar_data;
		    const record = uni.getStorageSync('self-record-posts');
		    const selectedStarted = new Date(time[0]).setHours(0, 0, 0, 0);
		    const selectedEnd = new Date(time[1]).setHours(23, 59, 59, 999);
		    this.flag = false;
		    console.log(this.filteredPosts);
		 
		    const items = [];
		
		    if(this.valueRange === 0){ 
		        record.forEach((item) => {
		            const timeStamp = new Date(item.timestamp).getTime();
		            if (timeStamp >= selectedStarted && timeStamp <= selectedEnd) {
						console.log(item)
		                items.push(item);  
		            }
		        });
		    } else if(this.valueRange === 1){
		        record.forEach((item) => {
		            const timeStamp = new Date(item.timestamp).getTime();
		            if (timeStamp >= selectedStarted && timeStamp <= selectedEnd && item.username === "系统") {
		                items.push(item);  
		            }
		        });
		    } else if(this.valueRange === 2){
		        record.forEach((item) => {
		            const timeStamp = new Date(item.timestamp).getTime();
		            if (timeStamp >= selectedStarted && timeStamp <= selectedEnd && item.username !== "系统") {
		                items.push(item);  
		            }
		        });
		    }
		
		    this.filteredPosts = items;
		},

// calendar() { 
//     const time = this.calendar_data;
//     const record = uni.getStorageSync('self-record-posts');
//     // const started = new Date(time[0]).getTime(); // 开始时间转换为时间戳
//     // const end = new Date(time[1]).getTime(); // 结束时间转换为时间戳 
// 	const selectedStarted = new Date(time[0]).getTime()
// 	const selectedTimestamp = new Date(time[1]).getTime();
// 	const started = new Date(selectedTimestamp).setHours(0,0,0,0);
// 	const end = new Date(selectedTimestamp).setHours(23, 59, 59, 999);
// 	this.flag = false
// 	console.log(this.filteredPosts)
 
//     // 存放筛选后的记录
//     const items = [];  

 
//  if(this.valueRange === 0){
// 	record.map((item) => {
// 	    const timeStamp = new Date(item.timestamp).getTime();
// 		console.log("开始时间：",started)
// 		console.log("结束时间",end)
// 		console.log("时间",timeStamp)
// 		// 时间大于等于开始时间并且小于等于结束时间
// 	    if (timeStamp >= started && timeStamp <= end) {
// 	        items.push(item);  
// 	    }
// 	}); 
//  }else if(this.valueRange === 1){
	
// 	record.map((item)=>{
		
// 		const timeStamp = new Date(item.timestamp).getTime();
// 		console.log("开始时间：",started)
// 		console.log("结束时间",end)
// 		console.log("时间",timeStamp)
// 		if (timeStamp >= started && timeStamp <= end) {
// 		    if(this.range[this.valueRange].text === item.username){
// 				items.push(item);  
// 			}
// 		}
// 	})
//  }else if(this.valueRange === 2){
// 	 record.map((item)=>{
// 	 	const timeStamp = new Date(item.timestamp).getTime();
// 		console.log("开始时间：",started)
// 		console.log("结束时间",end)
// 		console.log("时间",timeStamp)
// 	 	if (timeStamp >= started && timeStamp <= end) {
// 	 	    if(item.username !="系统"){
// 	 			items.push(item);  
// 	 		}
// 	 	}
// 	 })
//  }
 


// 	this.filteredPosts = items
// },






				show(){
				    uni.chooseImage({
				        count:1,
				        sizeType:["compressed"],
				        sourceType: ["album", "camera"],
				        success: (res) => {
				            console.log(res);
				            this.userpic = res.tempFilePaths[0];
				            var TempFilePath=res.tempFilePaths[0];
				            uni.saveFile({
				                 tempFilePath: TempFilePath,
				                success: (res) => { 
				                    uni.setStorageSync('bg', res.savedFilePath);
				                    this.bg = res.savedFilePath; 
				                },
				                fail: (err) => {
				                    console.error("保存图片失败", err);
				                }
				            }); 
				        }
				    });
				},
				
				// hide() { 
				// 	this.cover = false
					 
				//    },
				 
				end(item){
					uni.showModal({
					        title: '提示',
					        content: '确认选择这个照片为背景嘛？', 
					        showCancel: true, 
					        cancelText: '取消',
					        confirmText: '确定',
					        success: (res) => {
					          if (res.confirm) {
								uni.setStorageSync('bg', item.src)
								this.bg = item.src
								console.log(this.bg)
								this.cover = false
					          } else if (res.cancel) {
					            console.log('用户点击取消');
					          }
					        }
					      });
				},

			//用于跳转页面的函数
			navigateTo(url) {
				uni.navigateTo({
					url: url
				});

				//监听用户是否发布了新记录（uni.$emit一旦发生，此处uni.$on即响应）
				uni.$on('publish', (data) => {
					this.publish_msg = [];
					this.publish_msg.unshift(data);
					console.log("监听触发，将用户新发布的记录暂存到publish_msg", this.publish_msg);
				})
			},

			//进行评论
			comment(index) {
				this.showInput = true; //调起input框
				this.focus = true;
				this.index = index;
			},

			adjust() { //当弹出软键盘发生评论动作时,调整页面位置pageScrollTo
				return;
				uni.createSelectorQuery().selectViewport().scrollOffset(res => {
					var scrollTop = res.scrollTop;
					let view = uni.createSelectorQuery().select("#post-" + this.index);
					view.boundingClientRect(data => {
						console.log("data:" + JSON.stringify(data));
						console.log("手机屏幕高度:" + this.screenHeight);
						console.log("竖直滚动位置" + scrollTop);
						console.log("节点离页面顶部的距离为" + data.top);
						console.log("节点高度为" + data.height);
						console.log("窗口高度为" + this.windowHeight);

						uni.pageScrollTo({
							scrollTop: scrollTop - (this.windowHeight - (data.height + data.top +
								45)), //一顿乱算
							// scrollTop: 50, 
							duration: 300
						});
					}).exec();
				}).exec();
			},

			//回复某一条评论
			reply(index, comment_index) {
				this.is_reply = true; //回复中
				this.showInput = true; //调起input框
				let replyTo = this.posts[index].comments.comment[comment_index].username;
				this.input_placeholder = '回复' + replyTo;
				this.index = index; //post索引
				this.comment_index = comment_index; //评论索引
				this.focus = true;
			},

			blur: function() { //输入框失焦情况
				this.init_input();
			},

			//发出评论
			send_comment: function(message) {

				if (this.is_reply) {
					var reply_username = this.posts[this.index].comments.comment[this.comment_index].username;
					var comment_content = '回复' + reply_username + '：' + message.content;
				} else {
					var comment_content = message.content;
				}
				this.posts[this.index].comments.total += 1;
				this.posts[this.index].comments.comment.push({
					"uid": this.user_id,
					"username": this.username,
					"content": comment_content //直接获取input中的值
				});

				uni.setStorageSync('self-record-posts', this.posts);
				console.log('发出评论，保存到本地存储');
				this.init_input();
			},

			//长按一条评论事件
			del_comment(index, comment_index) { //长按删除评论
				this.loop = setTimeout(() => {
					let posts = this.posts;
					uni.showModal({
						title: '提示',
						content: '是否删除评论',
						success: function(res) {
							if (res.confirm) {
								console.log('删除评论');
								posts[index].comments.total -= 1;
								posts[index].comments.comment.splice(comment_index, 1);
								uni.setStorageSync('self-record-posts', this.posts);
								console.log('删除了评论，保存到本地存储');
							} else if (res.cancel) {
								console.log('取消删除评论');
							}
						}
					});
				}, 500)

				return false;
			},
			hand_move() { //并非长按，只是手指滑动
				clearTimeout(this.loop); //清除定时器
				this.loop = 0;
			},
			del_end() { //删除评论完成
				clearTimeout(this.loop); //清除定时器
				return false;
			},

			init_input() { //关闭或取消评论的收尾操作
				this.showInput = false;
				this.focus = false;
				this.input_placeholder = '评论';
				this.is_reply = false;
			},

			previewImage(imageList, image_index) { //查看图片
				var current = imageList[image_index];
				uni.previewImage({
					current: current,
					urls: imageList
				});
			},

			//点赞与取消
			like(index) {
				if (this.posts[index].islike === 0) {
					this.posts[index].islike = 1;
					this.posts[index].like.push({
						"uid": this.user_id,
						"username": "，" + this.username
					});
				} else {
					this.posts[index].islike = 0;
					this.posts[index].like.splice(this.posts[index].like.indexOf({
						"uid": this.user_id,
						"username": "，" + this.username
					}), 1);
				}
				uni.setStorageSync('self-record-posts', this.posts);
				console.log('更新点赞信息，保存到本地存储');
			},

			//点击头像删除一条记录
			bindClick(index) {
				const that = this
				let posts = this.posts;
				uni.showModal({
					title: '提示',
					content: '是否删除记录',
					success: function(res) {
						if (res.confirm) {
							posts.splice(index, 1);
							console.log('删除记录');
							uni.setStorageSync('self-record-posts', that.posts);
							this.filteredPosts = uni.getStorageSync("self-record-posts")
							console.log(that.filteredPosts)
							console.log('删除了记录，更新本地存储');
							this.filteredPosts = this.posts
						} else if (res.cancel) {
							console.log('取消删除记录');
						}
					}
				});
			},
 
			//新的一天第一次打开时，系统发送鼓励消息
			system_send(e) {
				//生成[0,10)的随机整数，取系统鼓励的话
				var r = Math.floor(Math.random() * 10);
				let sys_msg = sysMsg[r];

				let sys_data = {
					//"post_id": 2,
					"uid": 1,
					"username": "系统",
					"header_image": "/static/self-record/system-head.png",
					"content": {
						"text": sys_msg.text,
						"images": sys_msg.images
					},
					"islike": 0,
					"like": [{
						"uid": 1,
						"username": "系统"
					}],
					"comments": {
						"total": 0,
						"comment": []
					},
					"timestamp": mytime.traversalTime(e)
				};

				var that = this;
				that.posts.unshift(sys_data);
				console.log("系统发送鼓励消息", that.posts[0]);
				that.last_sys_date = sys_data.timestamp;
				console.log('系统鼓励消息时间更新为', that.last_sys_date);

				uni.setStorageSync('self-record-posts', that.posts);
				uni.setStorageSync('last-system-msg-date', that.last_sys_date);
				console.log('系统发送了新消息，更新本地存储');
			},
			/**
			 * 自定义系统提示
			 * @param {Object} e
			 * @param {Object} content
			 */
			system_remind(e, content) {
				let sys_data = {
					//"post_id": 2,
					"uid": 1,
					"username": "系统",
					"header_image": "/static/self-record/system-head.png",
					"content": {
						"text": content,
						"images": ''
					},
					"islike": 0,
					"like": [{
						"uid": 1,
						"username": "系统"
					}],
					"comments": {
						"total": 0,
						"comment": []
					},
					"timestamp": mytime.traversalTime(e)
				};

				var that = this;
				that.posts.unshift(sys_data);
				console.log("系统发送鼓励消息", that.posts[0]);
				that.last_sys_date = sys_data.timestamp;
				console.log('系统鼓励消息时间更新为', that.last_sys_date);

				uni.setStorageSync('self-record-posts', that.posts);
				uni.setStorageSync('last-system-msg-date', that.last_sys_date);
				console.log('系统发送了新消息，更新本地存储');
			},
			// 计算两个日期对象相差的天数，date2要晚于date1
			daysBetween(date1, date2) {
				// 每天的毫秒数
				const oneDayInMilliseconds = 24 * 60 * 60 * 1000;

				// 获取两个日期的时间戳
				const timestamp1 = date1.getTime();
				const timestamp2 = date2.getTime();

				// 计算时间戳的差值并转换为天数
				const differenceInDays = (timestamp2 - timestamp1) / oneDayInMilliseconds

				return Math.round(differenceInDays);
			},
			// todolist事件的提醒
			todoRemind() {
				// 读取todolist
				let list = uni.getStorageSync('todolist')
				console.log(list);
				if (list.length != 0) {
					list.forEach(event => {
						if (event.cycles != null) {
							let now = new Date()
							let nowDay = now.getDay()
							if (event.cycles[0] == '每日' || event.cycles.indexOf(this.days[nowDay]) > 0) {
								let content = '今天也要' + event.title + ' ' + event.mark + '噢~'
								this.system_remind(now.getTime(), content)
							}
						}
						if (event.date != null) {
							let ddl = new Date(event.date)
							let now = new Date()
							let days = this.daysBetween(now, ddl)
							if (days == 7 || days == 5 || days == 3 || days == 0) {
								let content = '待办提醒：' + event.title + ' ' + event.mark + ` 还有${days}天`
								this.system_remind(now.getTime(), content)
							}
						}
					})
				}
			},

			//娱乐成就达成时的系统提醒
			playRemind() {

				let playContent = uni.getStorageSync('playGoalSuccess').playGoalSuccessList

				if (playContent) {
					console.log("成功接收到playGoalSuccess：" + playContent);

				}
				if (playContent) {
					console.log("playContent长度：",playContent.length)
					for (let item of playContent) {
						let now = new Date()
						if (item.timetype0 && (item.timetype1 == false)) {
							let content = '恭喜你！目标： ' + item.title + ` 已完成`
							this.system_remind(now.getTime(), content);
							// 清除，否则一直刷新一直发
							uni.removeStorageSync('playGoalSuccess')
						} else if (item.timetype1 && (item.timetype0 == false)) {
							console.log('playContent.isdone==', item.isdone)

							if (item.isdone == false) {
								let content = '恭喜你！完成一次目标： ' + item.title
								this.system_remind(now.getTime(), content);
								// 清除，否则一直刷新一直发
								uni.removeStorageSync('playGoalSuccess')
							} else if (item.isdone == true) {
								let weekDoneContent = uni.getStorageSync('doneWeekMessage')
								if (weekDoneContent.title) {
									let content = `恭喜你！目标：${weekDoneContent.title} 已完成！ 完成周数:${weekDoneContent.doneWeekCount} 执行日：${
								    weekDoneContent.completedWeeks.map(w => `第${w.week}周: ${w.days.join(", ")}`).join("; ")
								}`;
									this.system_remind(now.getTime(), content);
									uni.removeStorageSync('playGoalSuccess')
									uni.removeStorageSync('doneWeekMessage')
								}

							}
						}
					}
				}
			},

			//运动成就达成时的系统提醒
			SportRemind() {

				let sportContent = uni.getStorageSync('sportGoalSuccess')
				console.log(sportContent);
				if (sportContent.content != null) {
					let now = new Date()
					let content = '恭喜你！完成一次' + sportContent.content

					this.system_remind(now.getTime(), content);
					// 清除，否则一直刷新一直发
					uni.removeStorageSync('sportGoalSuccess')
				}
			},

			// 起床睡眠成就达成时
			Getup_Sleep_Remind() {

				let successData = uni.getStorageSync('Today_getup_sleep_GoalSuccess')
				console.log(successData);
				if (successData.sleep_time != null) {
					let now = new Date()
					let getup_goal = successData.getup_goal
					let getup_time = successData.getup_time
					let sleep_goal = successData.sleep_goal
					let sleep_time = successData.sleep_time

					let content = '恭喜你！完成今天的睡眠目标\n\n起床目标  ' + getup_goal + '  起床时间  ' + getup_time + '\n睡眠目标：  ' +
						sleep_goal + '  今日睡眠时间： ' + sleep_time

					this.system_remind(now.getTime(), content);
					// 清除，否则一直刷新一直发
					uni.removeStorageSync('Today_getup_sleep_GoalSuccess')
				}
			},
			//运动即将成就达成时的系统提醒
			SportGoingtoAchieveRemind() {

				let Sportdata = uni.getStorageSync('GoingToAchieveGoal')

				console.log(Sportdata);
				if (Sportdata.content != null) {

					let now = new Date()
					let content = '还差' + Sportdata.differnumber + '个就达成' + Sportdata.timesForAward + '个' + Sportdata
						.content + '的运动目标了，加油噢！'

					this.system_remind(now.getTime(), content);
					// 清除，否则一直刷新一直发
					uni.removeStorageSync('GoingToAchieveGoal')
				}
			},
			SleepGoingtoAchiveRemind() {
				var that = this;
				var sleep_award_list = uni.getStorageSync('SleepAward').sleep_awardList;
				console.log('获取点赞总数后sleep_award_list：', sleep_award_list);
				//要用同步的，不然uni.getStorage怎么都会相比于其他操作最后执行，且遇到var操作会先执行？
				let New_sleep_success_Count = uni.getStorageSync('sleep_like_Count').sleep_like_Count;
				console.log('原本sleep_success_Count：', that.sleep_success_Count);
				console.log('获取点赞总数后New_sleep_success_Count：', New_sleep_success_Count);
				if (sleep_award_list != null && (New_sleep_success_Count != that.sleep_success_Count)) {
					for (let i = 0; i < sleep_award_list.length; i++) {
						that.sleep_success_Count = New_sleep_success_Count;
						uni.setStorageSync("self-record-sleep_success_Count", that.sleep_success_Count);

						let Divisor_result = (New_sleep_success_Count) / (sleep_award_list[i].times);
						console.log('Divisor_result:', Divisor_result);
						let differnumber = (sleep_award_list[i].times - New_sleep_success_Count);
						console.log('differnumber:', differnumber);
						if (differnumber > 0 && Divisor_result >= 0.8) {
							console.log("还差1/5就可以实现目标！");

							if (sleep_award_list[i].content != null) {

								let now = new Date()
								let content = '睡眠目标提醒：还差' + differnumber + '个就达成' + sleep_award_list[i].times + '个' +
									sleep_award_list[i].content + '的睡眠目标了，加油噢！'

								this.system_remind(now.getTime(), content);
							}

						}
					}

				} else {
					console.log('点赞数没变或者sleep_award_list为空！')
				}

			},
			GetUpGoingtoAchiveRemind() {
				var that = this;
				var getup_award_list = uni.getStorageSync('GetUpAward').getup_awardList;
				console.log('获取点赞总数后getup_award_list：', getup_award_list);
				//要用同步的，不然uni.getStorage怎么都会相比于其他操作最后执行，且遇到var操作会先执行？
				let New_getup_success_Count = uni.getStorageSync('getup_like_Count').getup_like_Count;
				console.log('原本getup_success_Count：', that.getup_success_Count);
				console.log('获取点赞总数后New_getup_success_Count：', New_getup_success_Count);
				if (getup_award_list != null && (New_getup_success_Count != that.getup_success_Count)) {
					for (let i = 0; i < getup_award_list.length; i++) {
						that.getup_success_Count = New_getup_success_Count;
						uni.setStorageSync("self-record-getup_success_Count", that.getup_success_Count);

						let Divisor_result = (New_getup_success_Count) / (getup_award_list[i].times);
						console.log('Divisor_result:', Divisor_result);
						let differnumber = (getup_award_list[i].times - New_getup_success_Count);
						console.log('differnumber:', differnumber);
						if (differnumber > 0 && Divisor_result >= 0.8) {
							console.log("还差1/5就可以实现目标！");

							if (getup_award_list[i].content != null) {

								let now = new Date()
								let content = '起床目标提醒：还差' + differnumber + '个就达成' + getup_award_list[i].times + '个' +
									getup_award_list[i].content + '的起床目标了，加油噢！'

								this.system_remind(now.getTime(), content);
							}

						}
					}

				} else {
					console.log('点赞数没变或者getup_award_list为空！')
				}

			}
		}
	}
</script>

<style scoped>
	@import url("../../common/self-record/self-record.css");
	@import url("../../common/uni.css");
</style>