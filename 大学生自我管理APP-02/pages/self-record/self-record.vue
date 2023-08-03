<template>
	<!--预计有什么功能：记录（图文）的发送和删除√，消息的发送时间√，数据的本地存取√，数据的云端存取（？），
	用户给自己消息点赞√，系统发送每日总结，系统发出待办和自我管理计划的提醒，生日提醒（？）-->
	<!--如何从云端读取用于总结的相关数据、比对时间……？？？？？？？？？-->
	<view class="content">
		
		<!--消息内容区-->
		<!--记得去搜索uniapp如何使用scroll-into-view！！！！！！！！！！！！！！！！！！！！-->
		<scroll-view class="chat" scroll-y="true" scroll-with-animation="true" :scroll-into-view="scrollToView">
			<view class="chat-main" :style="{paddingBottom:inputh+'px'}">
				<view class="chat-ls" v-for="(item,index) in unshiftmsg" :key="index" :id="'msg'+ index">
					<!--将一条消息的发送时间数据传到函数chatTime进行处理，然后显示-->
					<view class="chat-time" v-if=" item.createTime != ''"> {{chatTime(item.createTime)}} </view>
					
					<!--系统消息-->
					<view class="msg-m msg-left" v-if="item.sendName == '系统'" >
						<image class="user-img" src="../../static/system-head.png"  @click="bindClick(index)"></image>
						<!-- 文字 -->
						<view class="message" v-if="item.TextType == 0">
							<view class="msg-text">{{item.sendText}}</view>
						</view>
						<!-- 图像 -->
						<view class="message" v-if="item.TextType == 1" @tap="previewImg(item.sendText)">
							<image :src="item.sendText" class="msg-img" mode="widthFix"></image>
						</view>
					</view>
					
					<!--用户消息-->
					<view class="msg-m msg-right" v-if="item.sendName != '系统'">
						<image class="user-img" src="../../static/user-head.png" @click="bindClick(index)"></image>
						<!-- 文字 -->
						<view class="message" v-if="item.TextType == 0">
							<view class="msg-text">{{item.sendText}}</view>
						</view>
						<!-- 图像 -->
						<view class="message" v-if="item.TextType == 1" @tap="previewImg(item.sendText)">
							<image :src="item.sendText" class="msg-img" mode="widthFix"></image>
						</view>
						<!--点赞小心心图标-->
						<view class="like-heart" @tap="like(item)">
							<image v-if="item.isLike == 0" src="../../static/like-heart-white.png" style="max-width: 100rpx;" mode="widthFix"></image>
							<image v-if="item.isLike == 1" src="../../static/like-heart-red.png" style="max-width: 100rpx;" mode="widthFix"></image>
						</view>
						
					</view>
				</view>
			</view>
		</scroll-view>
		
		<!-- 输入栏 -->
		<submit @inputs="inputs"></submit>
		
	</view>
</template>

<script>
	
	import dateTime from './dateTime.js'  //引用js文件
	import submit from './component/submit/submit.vue'    //引用组件submit
	
	export default {
		data() {
			return {
				scrollToView:'',//定位消息界面所滚动到的元素是哪个
				sendName:'',
				receviceName:'',
				sendText:'',
				createTime:'',
				TextType:'',
				isLike:'',
				
				/*
				msg:[
					{
						"sendName": "我",
						"receviceName": "系统",
						"sendText": "测试5",
						"createTime": "2023-01-06 12:40:05",
						"TextType": 0,
						"isLike":0,
					},
					{
						"sendName": "我",
						"receviceName": "系统",
						"sendText": "测试4",
						"createTime": "2023-01-06 12:40:00",
						"TextType": 0,
						"isLike":0,
					},
					{
						"sendName": "我",
						"receviceName": "系统",
						"sendText": "测试3",
						"createTime": "2023-01-05 15:20:00",
						"TextType": 0,
						"isLike":0,
					},
					{
						"sendName": "我",
						"receviceName": "系统",
						"sendText": "测试2",
						"createTime": "2023-01-05 12:40:00",
						"TextType": 0,
						"isLike":0,
					},
					{
						"sendName": "我",
						"receviceName": "系统",
						"sendText": "测试1",
						"createTime": "2023-01-02 12:40:00",
						"TextType": 0,
						"isLike":0,
					},
					{
						"sendName": "系统",
						"receviceName": "我",
						"sendText": "发消息试试吧",
						"createTime": "2023-01-01 12:50:00",
						"TextType": 0,
						"isLike":0,
					},
					{
						"sendName": "我",
						"receviceName": "系统",
						"sendText": "啦啦啦",
						"createTime": "2023-01-01 12:45:20",
						"TextType": 0,
						"isLike":0,
					},
					{
						"sendName": "系统",
						"receviceName": "我",
						"sendText": "../../static/logo.png",
						"createTime": "2023-01-01 12:40:13",
						"TextType": 1,
						"isLike":0,
					},
					{
						"sendName": "系统",
						"receviceName": "我",
						"sendText": "如果想删除一条消息，可以点击该消息对应的头像",
						"createTime": "2023-01-01 12:40:12",
						"TextType": 0,
						"isLike":0,
					},
					{
						"sendName": "系统",
						"receviceName": "我",
						"sendText": "系统将会为你提供每日总结和事项提醒服务~",
						"createTime": "2023-01-01 12:40:11",
						"TextType": 0,
						"isLike":0,
					},
					{
						"sendName": "系统",
						"receviceName": "我",
						"sendText": "欢迎使用本APP！",
						"createTime": "2023-01-01 12:40:10",
						"TextType": 0,  //0表示文字消息，1表示图片消息
						"isLike":0,
					}
				],
				*/
				
				unshiftmsg:[
					{
						"sendName": "系统",
						"receviceName": "我",
						"sendText": "欢迎使用本APP！",
						"createTime": "2023-01-01 12:40:10",
						"TextType": 0,  //0表示文字消息，1表示图片消息
						"isLike":0,
					},
					{
						"sendName": "系统",
						"receviceName": "我",
						"sendText": "系统将会为你提供每日总结和事项提醒服务~",
						"createTime": "2023-01-01 12:40:11",
						"TextType": 0,
						"isLike":0,
					},
					{
						"sendName": "系统",
						"receviceName": "我",
						"sendText": "如果想删除一条消息，可以点击该消息对应的头像",
						"createTime": "2023-01-01 12:40:12",
						"TextType": 0,
						"isLike":0,
					}
				],
				imgMsg:[],  //图片消息
				
				oldTime: new Date(),
				inputh: '60',
				
				//need_system_send: 0,
				birthday:'',
				//用户的生日信息，记得要改为从其它地方获取得到！-----------如果韦航的用户信息页面有这项，再添加生日提醒功能……
			}
		},
		
		onHide() {
			var that = this;
			uni.setStorage({
				key:'self-record-unshiftmsg',
				data:that.unshiftmsg,
				success() {
					console.log('离开页面时，保存所有消息到本地存储',that.unshiftmsg);
				}
			})
		},
		/*
		onShow() {
			var that = this;
			if(that.need_system_send == 1)
			{
				that.system_send(new Date().getTime());
				that.need_system_send = 0;
			}
		},
		*/
		onLoad() {
			var that = this;
			uni.getStorage({
				key:'self-record-unshiftmsg',
				success:function(res){
					that.unshiftmsg = res.data;
					console.log('从本地存储读取消息',res.data);
					
					// 获取图片，为下面的预览做准备
					for (var i = 0; i < that.unshiftmsg.length; i++) {
						if (that.unshiftmsg[i].TextType == 1) {
							that.imgMsg.push(that.unshiftmsg[i].sendText);
						}
					}
					
					//获取当前时间，看系统是否需要发送鼓励消息
					let now = new Date();
					//获取now具体时间
					let now_Y = now.getFullYear();
					let now_M = now.getMonth()+1;
					let now_D = now.getDate();
					
					//实现本地存储后，先从本地取所有消息，再取最后一条消息的creatTime（记为old），将其日期与当前日期比较
					var i = that.unshiftmsg.length - 1;
					let e = that.unshiftmsg[i].createTime;
					if(i<1) {e='2023-01-01 00:01:01';}  //以防消息列表为空的情况……
					let old = new Date(e);
					let old_Y = old.getFullYear();
					let old_M = old.getMonth()+1;
					let old_D = old.getDate();
					console.log(old_Y + "/" + old_M + "/" + old_D);
					
					//判断现在打开此页面时是否是新的一天第一次打开，是的话，就调用系统发消息函数
					if( (old_Y<now_Y) || ((old_Y==now_Y)&&(old_M<now_M)) || ((old_Y==now_Y)&&(old_M==now_M)&&(old_D<now_D)) )
					{
						that.system_send(now.getTime());
						//that.need_system_send = 1;
					}
					
					// 跳转到最后一条数据 与前面的:id进行对照
					that.$nextTick(function(){
						that.scrollToView = 'msg' + (that.unshiftmsg.length - 1);
					})
				}
			})
			
			/*
			// 跳转到最后一条数据 与前面的:id进行对照
			this.$nextTick(function() {
				this.scrollToView = 'msg' + (this.unshiftmsg.length - 1)
			})
			*/
			
		},
		
		components:{
			submit
		},
		
		methods: {
			chatTime(date){
				return dateTime.dateTime1(date);
			},
			
			// 进行图片的预览
			previewImg(e) {
				let index = 0;
				for (let i = 0; i < this.imgMsg.length; i++) {
					if (this.imgMsg[i] == e) {
						index = i;
					}
				}
				console.log("index", index)
				// 预览图片
				uni.previewImage({
					current: index,
					urls: this.imgMsg,
				});
			},
			
			//接受输入内容
			inputs(e) {
				let data = {
					"sendName": "我",
					"receviceName": "系统",
					"sendText": e.message,
					"createTime": new Date(),
					"TextType": e.type,
					"isLike": 0,
				};
				
				this.unshiftmsg.push(data);
				// 跳转到最后一条数据 与前面的:id进行对照
				this.$nextTick(function() {
					this.scrollToView = 'msg' + (this.unshiftmsg.length - 1)
				})
				if (e.type == 1) {
					this.imgMsg.push(e.message);
				}
				console.log(e);
				console.log(data.createTime);
			},
			
			/*
			//输入框高度
			heights(e) {
				console.log("高度:", e)
				this.inputh = e;
				this.goBottom();
			},
			
			// 滚动到底部
			goBottom() {
				this.scrollToView = '';
				this.$nextTick(function() {
					this.scrollToView = 'msg' + (this.unshiftmsg.length - 1)
				})
			},
			*/
			
			//删除某一条消息
			bindClick(index) {
				let unshiftmsg=this.unshiftmsg;
				uni.showModal({
					title:'提示',
					content:'是否删除',
					success:function(res){
						if(res.confirm){
							console.log('确认删除');
							unshiftmsg.splice(index,1);
						}else if(res.cancel){
							console.log('取消');
						}
					}
				});
			},
			
			//点赞与取消
			like(e){
				if(e.isLike == 0){
					e.isLike=1;
					console.log("进行点赞")
				}
				else{
					e.isLike=0;
					console.log("取消点赞")
				}
			},
			
			//每天用户第一次打开页面时，系统发送一条鼓励消息
			system_send(e){
				let sys_data = {
					"sendName": "系统",
					"receviceName": "我",
					"sendText": "新的一天，要继续加油哦！",
					"createTime": e,
					"TextType": 0,
					"isLike": 0,
				};
				
				this.unshiftmsg.push(sys_data);
				// 跳转到最后一条数据 与前面的:id进行对照
				this.$nextTick(function() {
					this.scrollToView = 'msg' + (this.unshiftmsg.length - 1)
				})
				console.log("系统发送鼓励消息");
			},
			
			//以本页面使用的格式来表示一个时间，如"2023-01-01 12:40:10"
			addTimes(m){return m<10?'0'+m:m},//对于一位数字的，前面加个'0'
			traversalTime(timestamp) {
				//timestamp(时间戳)是整数，否则要parseInt转换
				let time = new Date(timestamp);
				let y = time.getFullYear();
				let m = time.getMonth() + 1;//注，对于getMonth，实际上第i月返回值是i-1,所以getmonth之后还要+1
				let d = time.getDate();
				let h = time.getHours();
				let min = time.getMinutes();
				let s = time.getSeconds();
				return y+'-'+this.addTimes(m)+'-'+this.addTimes(d)+' '+this.addTimes(h)+':'+this.addTimes(min)+":"+this.addTimes(s);
			}
			
		}
	}
</script>

<style lang="scss" scoped>//使一个样式内部还可以嵌套

.content {
	height: 100%;
	background-color: #f4f4f4;
}


.chat{
	height: 100%;
	
	.chat-main{
		padding-left: 32rpx;//padding相关的设置元素内边距
		padding-right: 32rpx;
		padding-top: 20rpx;
		display: flex;
		flex-direction: column;//规定弹性项目的方向，column表示作为列垂直地显示弹性项目
	}
	
	.chat-ls{
		.chat-time{
			font-size: 24rpx;//设置字体大小
			color: rgba(39, 40, 50, 0.3);
			line-height: 34rpx;//设置行高（行间距）
			padding: 10rpx 0rpx;
			text-align: center;//文本对齐方式
		}
		
		.msg-m{
			display: flex;
			padding: 20rpx 0;
			.user-img{
				flex: none;
				width: 80rpx;
				height: 80rpx;
				border-radius: 20rpx;
			}
			.message{
				flex: none;
				max-width: 480rpx;
			}
			.msg-text{
				font-size: 32rpx;
				color: rgba(39, 40, 50, 1);
				line-height: 44rpx;
				padding: 18rpx 24rpx;
			}
			.msg-img{
				max-width: 400rpx;
				border-radius: 20rpx;
			}
			.like-heart{//点赞小心心图标
				margin-right: 5%;
			}
		}
		
		.msg-left{
			flex-direction: row;
			.msg-text{
				margin-right: 16rpx;
				background-color: #fff;
				border-radius: 0rpx 20rpx 20rpx 20rpx;
			}
			.ms-img{
				margin-right: 16rpx;
			}
		}
		
		.msg-right{
			flex-direction: row-reverse;
			.msg-text{
				margin-left: 16rpx;
				background-color: #95ec69;
				border-radius: 20rpx 0rpx 20rpx 20rpx;
			}
			.ms-img{
				margin-left: 16rpx;
			}
		}
	}
}

</style>