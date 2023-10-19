<template>
	<view id="moments">

		<view class="home-pic">
			<view class="home-pic-base">
				<!-- “我”的用户名和用户头像 -->
				<view class="top-pic">
					<image class="header" mode="aspectFill" :src="userhead"></image>
				</view>
				<view class="top-name">{{username}}</view>
			</view>
		</view>
		
		<!-- 记录数据posts -->
		<view class="moments__post" v-for="(post,index) in posts" :key="index" :id="'post-'+index">
			<view class="post-left">
				<!-- 发布该条记录的用户头像 -->
				<image class="post_header" mode="aspectFill" :src="post.header_image" @click="bindClick(index)"></image>
			</view>

			<view class="post_right">
				<!-- 用户名及文本内容 -->
				<text class="post-username">{{post.username}}</text>
				<view id="paragraph" class="paragraph">{{post.content.text}}</view>
				<!-- 图片 -->
				<view class="thumbnails">
					<view :class="post.content.images.length === 1?'my-gallery':'thumbnail'" v-for="(image, index_images) in post.content.images" :key="index_images">
						<image class="gallery_img" lazy-load mode="aspectFill" :src="image" :data-src="image" @tap="previewImage(post.content.images,index_images)"></image>
					</view>
				</view>
				<!-- 操作选项 -->
				<view class="toolbar">
					<view class="timestamp">{{post.timestamp}}</view>
					<view class="like" @tap="like(index)">
						<image :src="post.islike===0?'../../static/self-record/index/islike.png':'../../static/self-record/index/like.png'"></image>
					</view>
					<view class="comment" @tap="comment(index)">
						<image src="../../static/self-record/index/comment.png"></image>
					</view>
				</view>
				<!-- 点赞与评论 -->
				<view class="post-footer">
					<view class="footer_content">
						<image class="liked" src="../../static/self-record/index/liked.png"></image>
						<text class="nickname" v-for="(user,index_like) in post.like" :key="index_like">{{user.username}}</text>
					</view>
					<view class="footer_content" v-for="(comment,comment_index) in post.comments.comment" :key="comment_index" @tap="reply(index,comment_index)" @touchstart="del_comment(index,comment_index)" @touchmove="hand_move()" @touchend="del_end()">
						<text class="comment-nickname">{{comment.username}}: <text class="comment-content">{{comment.content}}</text></text>
					</view>
				</view>
			</view>
		</view>
		<!-- 结束posts -->

		<view class="foot" v-show="showInput">
			<chat-input @send-message="send_comment" @blur="blur" :focus="focus" :placeholder="input_placeholder"></chat-input>
		</view>
		
		<view class="uni-loadmore" v-if="showLoadMore">{{loadMoreText}}</view>
	</view>

</template>

<script>
	import chatInput from './component/chatinput/chatinput.vue'; //评论区的input框
	import sysMsg from '../../common/self-record/system-courage.js'; //系统发送的鼓励的话
	import mytime from './mytime.js'; //得到所需的时间格式
	
	export default {
		
		components: {
			chatInput
		},
		
		data() {
			return {
				days: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
				
				//每条记录数据，注意每发布一条新的就插入数组头部
				posts:[
					{
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
								"username": "系统"
							}
						],
						"comments": {
							"total": 0,
							"comment": [
							]
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
							}
						],
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
				
				user_id: 2,//“我”的用户id
				username: '我',
				userhead:'../../static/self-record/user-head.png',//用户头像，考虑与个人信息页面的关联？

				index: '',
				comment_index: '',

				input_placeholder: '评论', //评论框占位内容
				focus: false, //是否自动聚焦输入框
				is_reply: false, //回复还是评论
				showInput: false, //评论输入框
				loop: 0, //定时器

				screenHeight: '', //屏幕高度(系统)
				platform: '',
				windowHeight: '' ,//可用窗口高度(不计入软键盘)
				
				loadMoreText: "加载中...",
				showLoadMore: false
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
			let avator = uni.getStorageSync('avator')
			let username = uni.getStorageSync('userInfo').nickname
			this.username = username != '' ? username : '我'
			console.log(avator);
			this.userhead = avator
		},
		
		onShow() {
			uni.onWindowResize((res) => { //监听窗口尺寸变化,窗口尺寸不包括底部导航栏
				if(this.platform === 'ios'){
					this.windowHeight = res.size.windowHeight;
					this.adjust();
				}else{
					if (this.screenHeight - res.size.windowHeight > 60 && this.windowHeight <= res.size.windowHeight) {
						this.windowHeight = res.size.windowHeight;
						this.adjust();
					}
				}
			});
			
			//获取本地存储的数据
			let res1 = [];
			res1 = uni.getStorageSync('self-record-posts');
			if(res1.length) {this.posts = res1;} //以防本地存储为空，把固定的系统消息填进去
			console.log('从本地存储读取记录数据',res1);
			
			let res2 = uni.getStorageSync('last-system-msg-date');
			this.last_sys_date = res2;
			console.log('从本地读取上一次系统鼓励消息的日期',res2);
			
			
			//获取当前时间，看系统是否需要发送鼓励消息
			let now = new Date();
			//获取now具体时间
			let now_Y = now.getFullYear();
			let now_M = now.getMonth()+1;
			let now_D = now.getDate();
			//从本地存储取上一次系统消息的数据（记为old），以便将其日期与当前日期比较
			let e = this.last_sys_date;
			if(e == null || e === '') {e = '2023-01-01 00:01:01';} //以防该数据为空
			let old = new Date(e);
			let old_Y = old.getFullYear();
			let old_M = old.getMonth() + 1;
			let old_D = old.getDate();
			//判断今天是否晚于上次系统消息日期，是则调用系统发消息函数
			if( (old_Y<now_Y) || ((old_Y==now_Y)&&(old_M<now_M)) || ((old_Y==now_Y)&&(old_M==now_M)&&(old_D<now_D)) )
			{
				this.system_send(now.getTime());
			}
			
			
			//如果是从发布页面回来，获取用户发布的新记录数据，再重新保存所有数据
			if(this.publish_msg.length){
				this.posts.unshift(this.publish_msg[0]);
				uni.setStorageSync('self-record-posts',this.posts);
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
		},
		
		onHide() {
			uni.offWindowResize(() => { //取消监听窗口尺寸变化
				console.log("offWindowResize");
			});
			
			var that = this;
			uni.setStorageSync('self-record-posts',that.posts);
			uni.setStorageSync('last-system-msg-date',that.last_sys_date);
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
		
		onNavigationBarButtonTap(e) {//监听标题栏点击事件
			if (e.index == 0) {
				this.navigateTo('./publish/publish')
			}
		},
		
		computed:{
			
		},
		
		methods: {
			
			//用于跳转页面的函数
			navigateTo(url) {
				uni.navigateTo({
					url: url
				});
				
				//监听用户是否发布了新记录（uni.$emit一旦发生，此处uni.$on即响应）
				uni.$on('publish',(data)=>{
					this.publish_msg = [];
					this.publish_msg.unshift(data);
					console.log("监听触发，将用户新发布的记录暂存到publish_msg",this.publish_msg);
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
							scrollTop: scrollTop - (this.windowHeight - (data.height + data.top + 45)), //一顿乱算
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
					var comment_content = '回复' + reply_username + ':' + message.content;
				} else {
					var comment_content = message.content;
				}
				this.posts[this.index].comments.total += 1;
				this.posts[this.index].comments.comment.push({
					"uid": this.user_id,
					"username": this.username,
					"content": comment_content //直接获取input中的值
				});
				
				uni.setStorageSync('self-record-posts',this.posts);
				console.log('发出评论，保存到本地存储');
				this.init_input();
			},
			
			//长按一条评论事件
			del_comment(index,comment_index) { //长按删除评论
				this.loop = setTimeout(()=>{
					let posts=this.posts;
					uni.showModal({
						title:'提示',
						content:'是否删除评论',
						success:function(res){
							if(res.confirm){
								console.log('删除评论');
								posts[index].comments.total -= 1;
								posts[index].comments.comment.splice(comment_index,1);
								uni.setStorageSync('self-record-posts',this.posts);
								console.log('删除了评论，保存到本地存储');
							}else if(res.cancel){
								console.log('取消删除评论');
							}
						}
					});
				},500)
				
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
			
			init_input() {  //关闭或取消评论的收尾操作
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
						"username": "," + this.username
					});
				} else {
					this.posts[index].islike = 0;
					this.posts[index].like.splice(this.posts[index].like.indexOf({
						"uid": this.user_id,
						"username": "," + this.username
					}), 1);
				}
				uni.setStorageSync('self-record-posts',this.posts);
				console.log('更新点赞信息，保存到本地存储');
			},
			
			//点击头像删除一条记录
			bindClick(index) {
				let posts=this.posts;
				uni.showModal({
					title:'提示',
					content:'是否删除记录',
					success:function(res){
						if(res.confirm){
							posts.splice(index,1);
							console.log('删除记录');
							uni.setStorageSync('self-record-posts',this.posts);
							console.log('删除了记录，更新本地存储');
						}else if(res.cancel){
							console.log('取消删除记录');
						}
					}
				});
			},
			
			//新的一天第一次打开时，系统发送鼓励消息
			system_send(e) {
				//生成[0,10)的随机整数，取系统鼓励的话
				var r = Math.floor(Math.random()*10);
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
						}
					],
					"comments": {
						"total": 0,
						"comment": []
					},
					"timestamp": mytime.traversalTime(e)
				};
				
				var that = this;
				that.posts.unshift(sys_data);
				console.log("系统发送鼓励消息",that.posts[0]);
				that.last_sys_date = sys_data.timestamp;
				console.log('系统鼓励消息时间更新为',that.last_sys_date);
				
				uni.setStorageSync('self-record-posts',that.posts);
				uni.setStorageSync('last-system-msg-date',that.last_sys_date);
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
						}
					],
					"comments": {
						"total": 0,
						"comment": []
					},
					"timestamp": mytime.traversalTime(e)
				};
				
				var that = this;
				that.posts.unshift(sys_data);
				console.log("系统发送鼓励消息",that.posts[0]);
				that.last_sys_date = sys_data.timestamp;
				console.log('系统鼓励消息时间更新为',that.last_sys_date);
				
				uni.setStorageSync('self-record-posts',that.posts);
				uni.setStorageSync('last-system-msg-date',that.last_sys_date);
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
			}
		}
	}
</script>

<style scoped>
	@import url("../../common/self-record/self-record.css");
	@import url("../../common/uni.css");
</style>