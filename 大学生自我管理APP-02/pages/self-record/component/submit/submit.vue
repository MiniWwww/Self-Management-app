<template>
	<view>
		<view class="submit">
			<view class="submit-chat">
				<!-- 文本框 -->
				<view class="chat-send btn">
					<textarea style="word-break: break-all; width: 98%;margin:7px;" @input="inputs" @focus="focus" v-model="msg" adjust-position="true" auto-height="true"></textarea>
				</view>
				
				<view class="bt-img" @tap="more">
					<image src="../../static/img-chose.png"></image>
				</view>
			</view>
			
			
			<!-- 更多 -->
			<view class="more" :class="{displaynone:!ismore}">
				<view class="more-list" @tap="sendImg('album')">
					<image src="../../static/logo.png"></image>
					<view class="more-list-title">图片</view>
				</view>
				<view class="more-list" @tap="sendImg('camera')">
					<image src="../../static/logo.png"></image>
					<view class="more-list-title">拍照</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				ismore: false,
				msg: "",
				
			};
		},
		
		
		methods: {
			//获取高度方法
			getElementHeight() {
				const query = uni.createSelectorQuery().in(this);
				query.select('.submit').boundingClientRect(data => {
					this.$emit('heights', data.height);
				}).exec();
			},
			
			
			
			//文字发送
			inputs(e) {
				var chatm = e.detail.value;
				var pos = chatm.indexOf('\n');  //indexOf()方法可返回某个指定的字符串值在字符串中首次出现的位置
				// 检索字符串没有数据，返回-1
				// if (pos != -1 && chatm.length > 1) {
				// this.$emit('inputs', this.msg);
				// setTimeout(() => {
				// 	this.msg = '';
				// }, 0)
				// }

				if (pos != -1 && chatm.length > 1) {
					// 0为文字
					this.send(this.msg, 0)
				}

			},
			// 输入框聚焦
			focus() {
				//关闭其他项
				this.ismore = false;
				setTimeout(() => {
					this.getElementHeight()
				}, 10)
			},
			
			
			//更多功能
			more() {
				this.ismore = !this.ismore;
				//切换的时候关闭其他界面
				setTimeout(() => {
					this.getElementHeight();
				}, 10)
				//setTimeout函数用来指定某个函数或某段代码，在多少毫秒之后执行
			},
			//图片发送
			sendImg(e) {
				let count = 9;
				if (e == 'album') {
					count = 9;
				} else {
					count = 1;
				}
				
				uni.chooseImage({
					count:count,
					sizeType:['original','compressed'],  //可以指定是原图还是压缩图，默认二者都有
					sourceType:[e],  //从相册选择
					success: (res) => {
						console.log(JSON.stringify(res.tempFilePaths));  //返回图片的本地文件路径列表
						const filePaths = res.tempFilePaths;
						for (let i=0; i<filePaths.length; i++) {
							this.send(filePaths[i],1)
						}
					}
				})
				
				/*
				uni.chooseMedia({  //APP不支持这个“uni.chooseMedia”……无语了
					count: count, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: [e], //从相册选择
					success: (res) => {
						console.log(JSON.stringify(res.tempFiles));
						const filePaths = res.tempFiles;
						for (let i = 0; i < filePaths.length; i++) {
							this.send(filePaths[i].tempFilePath, 1)
						}
					}
				});
				*/
			},
			
			//发送
			send(msg, type) {
				let date = {
					message: msg,
					type: type
				}
				this.$emit('inputs', date);
				setTimeout(() => {
					this.msg = '';
				}, 0)
			}
		}
	};
</script>

<style lang="scss" scoped>
	.submit {
		background: rgba(244, 244, 244, 0.96);
		border-top: 1px solid rgba(39, 40, 50, 0.1);
		width: 100%;
		position: fixed;
		bottom: 0;
		z-index: 100;
		// padding-bottom: var(--status-bar-height);
		padding-bottom: env(safe-area-inset-bottom);
	}

	.displaynone {
		display: none;
	}

	.submit-chat {
		width: 100%;
		display: flex;
		align-items: flex-end;
		box-sizing: border-box;
		padding: 14rpx 14rpx;

		image {
			width: 56rpx;
			height: 56rpx;
			margin: 0 10rpx;
			flex: auto;
		}

		.btn {
			flex: auto;
			background-color: #fff;
			border-radius: 10rpx;
			padding: 20rpx;
			max-height: 160rpx;
			margin: 0 10rpx;
		}

		.chat-send {
			line-height: 44rpx;
		}

		.record {
			line-height: 44rpx;
			text-align: center;
			font-size: 20rpx;
			color: rgba(39, 40, 50, 0.6);
		}
	}
	
	.more {
		width: 100%;
		height: 436rpx;
		background: rgba(236, 237, 238, 1);
		box-shadow: 0px 11rpx 0px 0px rgba(0, 0, 0, 0.1);
		padding: 8rpx 20rpx;
		box-sizing: border-box;
		
		.more-list {
			width: 25%;
			text-align: center;
			float: left;
			padding-top: 32rpx;

			image {
				width: 72rpx;
				height: 72rpx;
				padding: 24rpx;
				background: rgba(255, 255, 255, 1);
				border-radius: 24rpx;
			}

			.more-list-title {
				font-size: 24rpx;
				color: rgba(39, 40, 50, 0.5);
				line-height: 34rpx;
			}
		}
	}
	.voice-bg {
		height: 100%;
		width: 100%;
		background-color: rgba(0, 0, 0, 0.3);
		position: fixed;
		top: 0;
		bottom: 0;
		z-index: 1001;

		.voice-bg-len {
			height: 84rpx;
			width: 600rpx;
			position: absolute;
			left: 0;
			right: 0;
			top: 0;
			bottom: 0;
			margin: auto;
			background-color: rgba(255, 255, 255, 0.2);
			border-radius: 42rpx;
			text-align: center;
		}

		.voice-bg-time {
			display: inline-block;
			min-width: 120rpx;
			line-height: 84rpx;
			background-color: rgba(255, 228, 49, 1);
			border-radius: 42rpx;
		}

		.voice-del {
			position: absolute;
			bottom: -480rpx;
			width: 100%;
			text-align: center;
			color: #fff;
			font-size: 28rpx;
		}
	}
</style>