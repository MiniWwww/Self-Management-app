<template>
	<view class="wrap">
		<uni-card is-full :is-shadow="false">
			<text class="uni-h6">今天玩了什么呢</text>
		</uni-card>
		<uni-section title="(基本项目)" type="line" padding>
			<!--滑动换页-->
			<swiper class="swiper" :indicator-dots="true">
				<swiper-item>
					<uni-grid :column="3" :show-border="false" :square="false" @change="change">
						<uni-grid-item v-for="(item ,index) in list" :index="index" :key="index">
							<view class="grid-item-box">
								<image class="image" :src="item.url" mode="aspectFill" />
								<text class="text">{{item.text}}</text>
								<view v-if="item.badge" class="grid-dot">
									<uni-badge :text="item.badge" :type="item.type" />
								</view>
							</view>
						</uni-grid-item>
					</uni-grid>

				</swiper-item>

				<swiper-item>
					<uni-grid :column="3" :show-border="false" :square="false" @change="change2">
						<uni-grid-item v-for="(item ,index) in list2" :index="index" :key="index">
							<view class="grid-item-box">
								<image class="image" :src="item.url" mode="aspectFill" />
								<text class="text">{{item.text}}</text>
								<view v-if="item.badge" class="grid-dot">
									<uni-badge :text="item.badge" :type="item.type" />
								</view>
							</view>
						</uni-grid-item>
					</uni-grid>

				</swiper-item>
			</swiper>
		</uni-section>

		<uni-section title="动态更新" type="line" padding>
			<view class="grid-dynamic-box">
				<uni-grid :column="3" :highlight="true" @change="change">
					<uni-grid-item v-for="(item, index) in dynamicList" :index="index" :key="index">
						<view class="grid-item-box" :style="{'backgroundColor':item.color}">
							<image :src="item.url" class="image" mode="aspectFill" />
							<text class="text">{{ item.text }}</text>
						</view>
					</uni-grid-item>
				</uni-grid>
			</view>
			<!-- 点击后通过调用inputModalToggle方法来打开下面的uni-pop弹出窗口 -->
			<button type="primary" @click="inputModalToggle"><text class="button-text">添加新项目</text>
			<!-- <button type="primary" @click="Showicons"><text class="button-text">添加新项目</text> -->
			
			</button>
			<!-- 2023-7-2新增 -->
			
			<!-- 2023-7-2新增结束 -->
			<button v-if="dynamicList.length !== 0" type="primary" style="margin-top: 15px;"
				@click="del">点击删除新项目</button>


			<uni-popup ref="inputModal" type="dialog">
				<uni-popup-dialog ref="inputClose" mode="input" title="输入事件名称" value="烧烤" placeholder="请输入内容"
					@confirm="dialogInputConfirm">


				</uni-popup-dialog>
			</uni-popup>
			<!-- 2023-7-2新增 -->
			<!-- <uni-section v-if="ShowIcon" title="图标" type="line">
				<template v-slot:right>
					<view>
						<switch :checked="checked" @changeIcons="changeIcons" />
					</view>
				</template>
				<view class="icon-content">
					<view v-for="(item,index) in iconClassList" :key="index" class="icon-item" @click="switchActive(index,item)">
						<uni-icons :type="item.name" :color="activeIndex === index?'#007aff':'#5e6d82'" size="30" />
						<text :style="{color:activeIndex === index?'#007aff':'#5e6d82'}"
							class="uni-mt-5 uni-subtitle">{{ checked? item.unicode: item.name }}</text>
					</view>
				</view>
			</uni-section> -->

			
			 <!-- #ifndef APP-PLUS -->
			 <!-- <uni-section title="自定义图标" subTitle="引入参考App.vue" type="line">
			 	<view class="icon-content">
			 		<view class="icon-item" >
			 			<uni-icons customPrefix="customicons" type="youxi" color="#5e6d82" size="22" />
			 			<text style="color:#5e6d82;">youxi</text>
			 		</view>
			 		<view class="icon-item" >
			 			<uni-icons customPrefix="customicons" type="wenjian" color="#5e6d82" size="22" />
			 			<text style="color:#5e6d82;">wenjian</text>
			 		</view>
			 		<view class="icon-item" >
			 			<uni-icons customPrefix="customicons" type="zhuanfa" color="#5e6d82" size="22" />
			 			<text style="color:#5e6d82;">zhuanfa</text>
			 		</view>
			 	</view>
			 </uni-section> -->
			 <!-- #endif -->
			<!-- 2023-7-2新增结束 -->



		</uni-section>



	</view>
</template>

<script>
	export default {
		components: {},
		data() {
			return {
				// 新增2023-7-10
				
				// 新增2023-7-10结束

				// 新增
				value: '',
				dynamicList: [],
				ShowIcon:false,
				list: [{
						url: '/static/Game.png',
						text: '打游戏',
						badge: '0',

						type: "primary"
					},
					{
						url: '/static/烧烤.png',
						text: '露营烧烤',
						badge: '1',
						type: "success"
					},
					{
						url: '/static/k歌.png',
						text: 'k歌',
						badge: '99',
						type: "warning"
					},
					{
						url: '/static/游乐园.png',
						text: '游园',
						badge: '0',
						type: "error" //type是角标的类型，比如errors红色的
					},
					{
						url: '/static/摄影.png',
						text: '摄影',
						badge: '0'
					},
					{
						url: '/static/艺术品.png',
						text: '看展',
						badge: '0'
					},
					{
						url: '/static/14-企业团建.png',
						text: '团建',
						badge: '0'
					},
					{
						url: '/static/密室预订.png',
						text: '密室逃脱',
						badge: '0'
					},
					{
						url: '/static/旅游.png',
						text: '旅游',
						badge: '0'
					}
				],

				list2: [{
						url: '/static/综合素质评价.png',
						text: '素拓',
						badge: '0',

						type: "primary"
					},
					{
						url: '/static/听歌.png',
						text: '听歌',
						badge: '1',
						type: "success"
					},
					{
						url: '/static/读小说.png',
						text: '看小说',
						badge: '99',
						type: "warning"
					},
					{
						url: '/static/电影.png',
						text: '看电影',
						badge: '0',
						type: "error" //type是角标的类型，比如errors红色的
					},
					{
						url: '/static/购物车空.png',
						text: '购物',
						badge: '0'
					},
					{
						url: '/static/画画.png',
						text: '画画',
						badge: '0'
					},
					{
						url: '/static/美食.png',
						text: '品尝美食',
						badge: '0'
					},
					{
						url: '/static/跳舞.png',
						text: '跳舞',
						badge: '0'
					},
					{
						url: '/static/桌球.png',
						text: '桌球',
						badge: '0'
					}
				],
				iconClassList: [{
						"name": "color",
						"unicode": "e6cf"
					}, {
						"name": "color-filled",
						"unicode": "e6c9"
					}, {
						"name": "wallet",
						"unicode": "e6b1"
					}, {
						"name": "wallet-filled",
						"unicode": "e6c2"
					}, {
						"name": "tune",
						"unicode": "e6aa"
					}, {
						"name": "tune-filled",
						"unicode": "e6ca"
					}, {
						"name": "settings",
						"unicode": "e560"
					}, {
						"name": "settings-filled",
						"unicode": "e6ce"
					}, {
						"name": "folder-add",
						"unicode": "e6a9"
					}, {
						'name': 'folder-add-filled',
						'unicode': 'e6c8'
					}, {
						"name": "calendar",
						"unicode": "e6a8"
					}, {
						'name': 'calendar-filled',
						'unicode': 'e6c0'
					}, {
						'name': 'vip',
						'unicode': 'e6a8'
					}, {
						'name': 'vip-filled',
						'unicode': 'e6c6'
					}, {
						"name": "notification",
						"unicode": "e6a6"
					}, {
						'name': 'notification-filled',
						'unicode': 'e6c1'
					}, {
						"name": "gift",
						"unicode": "e6a4"
					}, {
						'name': 'gift-filled',
						'unicode': 'e6c4'
					}, {
						"name": "medal",
						"unicode": "e6a2"
					}, {
						'name': 'medal-filled',
						'unicode': 'e6c3'
					}, {
						"name": "fire",
						"unicode": "e6a1"
					}, {
						'name': 'fire-filled',
						'unicode': 'e6c5'
					}, {
						"name": "camera",
						"unicode": "e301"
					}, {
						"name": "camera-filled",
						"unicode": "e7ef"
					}, {
						"name": "cart",
						"unicode": "e7f5"
					}, {
						"name": "cart-filled",
						"unicode": "e7f4"
					}, {
						"name": "chat",
						"unicode": "e263"
					}, {
						"name": "chat-filled",
						"unicode": "e847"
					}, {
						"name": "chatboxes",
						"unicode": "e203"
					}, {
						"name": "chatboxes-filled",
						"unicode": "e233"
					}, {
						"name": "chatbubble",
						"unicode": "e202"
					}, {
						"name": "chatbubble-filled",
						"unicode": "e232"
					}, {
						"name": "email",
						"unicode": "e201"
					}, {
						"name": "email-filled",
						"unicode": "e231"
					}, {
						"name": "mail-open",
						"unicode": "e84e"
					}, {
						"name": "mail-open-filled",
						"unicode": "e84d"
					}, {
						"name": "flag",
						"unicode": "e508"
					}, {
						"name": "flag-filled",
						"unicode": "e825"
					}, {
						"name": "heart",
						"unicode": "e840"
					}, {
						"name": "heart-filled",
						"unicode": "e83e"
					}, {
						"name": "home",
						"unicode": "e500"
					}, {
						"name": "home-filled",
						"unicode": "e530"
					}, {
						"name": "image",
						"unicode": "e363"
					}, {
						"name": "image-filled",
						"unicode": "e877"
					}, {
						"name": "images",
						"unicode": "e87b"
					}, {
						"name": "images-filled",
						"unicode": "e87a"
					}, {
						"name": "map",
						"unicode": "e364"
					}, {
						"name": "map-filled",
						"unicode": "e85c"
					}, {
						"name": "map-pin",
						"unicode": "e85e"
					}, {
						"name": "map-pin-ellipse",
						"unicode": "e864"
					},  {
						"name": "navigate",
						"unicode": "e501"
					}, {
						"name": "navigate-filled",
						"unicode": "e884"
					}, {
						"name": "paperplane",
						"unicode": "e503"
					}, {
						"name": "paperplane-filled",
						"unicode": "e86e"
					}, {
						"name": "phone",
						"unicode": "e200"
					}, {
						"name": "phone-filled",
						"unicode": "e230"
					}, {
						"name": "qq",
						"unicode": "e264"
					}, {
						"name": "weibo",
						"unicode": "e260"
					}, {
						"name": "weixin",
						"unicode": "e261"
					}, {
						"name": "pyq",
						"unicode": "e262"
					}, {
						"name": "videocam",
						"unicode": "e300"
					}, {
						"name": "videocam-filled",
						"unicode": "e8af"
					},  {
						"name": "star",
						"unicode": "e408"
					}, {
						"name": "star-filled",
						"unicode": "e438"
					}, {
						"name": "starhalf",
						"unicode": "e463"
					}, {
						"name": "spinner-cycle",
						"unicode": "e465"
					}, {
						"name": "link",
						"unicode": "e6a5"
					}, {
						"name": "font",
						"unicode": "e6a3"
					}, {
						"name": "scan",
						"unicode": "e612"
					}, {
						"name": "search",
						"unicode": "e466"
					}, {
						"name": "compose",
						"unicode": "e400"
					},  {
						"name": "list",
						"unicode": "e562"
					}, {
						"name": "loop",
						"unicode": "e565"
					},  {
						"name": "headphones",
						"unicode": "e8bf"
					}, {
						"name": "shop",
						"shop": "e609"
					}, {
						'name': 'shop-filled',
						'unicode': 'e6cd'
					}],
			}
			
		},
		
		methods: {
			// inputModalToggle调用父组件的$refs对象，得到inputModal引用
			inputModalToggle() {
				this.$refs.inputModal.open()
				//this.showModal = true;
			},
			inputDialogToggle() {
				this.$refs.inputDialog.open()
			},
			dialogClose() {
				console.log('点击关闭')
			},
			dialogInputConfirm(val) {
				uni.showLoading({
					title: '3秒后会关闭'
				})


				setTimeout(() => {
					uni.hideLoading()
					console.log(val)
					//将输入内容val存到value				
					this.value = val
					//调用add方法
					this.add(),
						// 关闭窗口后，恢复默认内容
						this.$refs.inputDialog.close()

				}, 3000)
			},
			change(e) {
				let {
					index
				} = e.detail
				this.list[index].badge && this.list[index].badge++

				// uni.showToast({
				// 	title: `点击第${index+1}个项目`, //$：当前
				// 	icon: 'none'
				// })
				uni.navigateTo({
				    url: `/pages/self-manage/component/play/EventForm?index=${index}`,
				  });
			},
			change2(e) {
				let {
					index
				} = e.detail
				this.list2[index].badge && this.list2[index].badge++

				// uni.showToast({
				// 	title: `点击第${index+1}个项目`, //$：当前
				// 	icon: 'none'
				// })
				
				uni.navigateTo({
				   url: `/pages/self-manage/component/play/EventForm?index=${index}`,
				   
				  },console.log("跳转"));
			},

			add() {
				if (this.dynamicList.length < 9) {
					this.dynamicList.push({
						// url: `/static/${this.dynamicList.length+1}.png`,
						url: `/static/${this.dynamicList.length+1}.png`,
						text: this.value,
						badge: '0',
						type: "primary",
						color: this.dynamicList.length % 2 === 0 ? '#f5f5f5' : "#fff"
					})
				} else {
					uni.showToast({
						title: '最多添加9个',
						icon: 'none'
					});
				}
			},
			del() {
				this.dynamicList.splice(this.dynamicList.length - 1, 1)
			},
			// 2023-7-2新增
			// GoToAddNew() {
			//       uni.navigateTo({
			//          url: '/pages/self-manage/component/play/AddProject',
			//        });
			//   },
			// Showicons(){
			// 	this.ShowIcon=true;
			// },
			// changeIcons(e) {
			// 	// e.detail.value在安卓手机上可能是String类型，后续修复后要修改
			// 	this.checked = e.detail.value === 'false' || !e.detail.value ? false : true
			// },
			// switchActive(index,item) {
			// 	this.activeIndex = index
			// 	uni.setClipboardData({
			// 	    data: !this.checked ? item.name:item.unicode,
			// 	    success:  ()=> {
			// 	        uni.showToast({
			// 	        	icon:'none',
			// 						title:`${!this.checked ?'图标名称':'unicode'}复制成功`
			// 	        })
			// 	    }
			// 	});
			// }
				
			// 2023-7-2新增结束
		}
	}
</script>


<style lang="scss">
	.image {
		width: 25px;
		height: 25px;
	}

	.text {
		font-size: 14px;
		margin-top: 5px;
	}

	.example-body {
		/* #ifndef APP-NVUE */
		// display: block;
		/* #endif */
	}

	.grid-dynamic-box {
		margin-bottom: 15px;
	}

	.grid-item-box {
		flex: 1;
		// position: relative;
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 15px 0;
	}

	.grid-item-box-row {
		flex: 1;
		// position: relative;
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		align-items: center;
		justify-content: center;
		padding: 15px 0;
	}

	.grid-dot {
		position: absolute;
		top: 5px;
		right: 15px;
	}

	.swiper {
		height: 420px;
	}
	// 2023-7-2新增
	.icon-content {
		display: flex;
		flex-wrap: wrap;
		flex-direction: row;
		justify-content: center;
	
		.icon-item {
			/* #ifndef APP-NVUE */
			display: flex;
			box-sizing: border-box;
			width: calc(100% / 4);
			/* #endif */
			/* #ifdef APP-NVUE */
			width: 187rpx;
			/* #endif */
			align-items: center;
			padding: 10px;
			text-align: center;
			flex-direction: column;
		}
	}
	// 2023-7-2新增结束

	/* #ifdef H5 */
	@media screen and (min-width: 768px) and (max-width: 1425px) {
		.swiper {
			height: 630px;
		}
	}

	@media screen and (min-width: 1425px) {
		.swiper {
			height: 830px;
		}
	}

	/* #endif */
</style>