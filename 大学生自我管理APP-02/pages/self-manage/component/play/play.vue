<template>
	<view class="wrap">
		<uni-card is-full :is-shadow="false">
			<text class="uni-h6">今天玩了什么呢</text>
		</uni-card>
<<<<<<< HEAD
		<uni-section title="(基本项目)" type="line" padding>
			<!--滑动换页-->
			<swiper class="swiper" :indicator-dots="true">
=======

		<!-- 基本项目 -->
		<uni-section title="基础项目" type="line" padding>
			<!--滑动换页-->
			<swiper class="swiper" :indicator-dots="true">

>>>>>>> master
				<swiper-item>
					<uni-grid :column="3" :show-border="false" :square="false" @change="change">
						<uni-grid-item v-for="(item ,index) in list" :index="index" :key="index">
							<view class="grid-item-box">
<<<<<<< HEAD
								<image class="image" :src="item.url" mode="aspectFill" />
								<text class="text">{{item.text}}</text>
								<view v-if="item.badge" class="grid-dot">
									<uni-badge :text="item.badge" :type="item.type" />
								</view>
							</view>
						</uni-grid-item>
					</uni-grid>

=======
								<!-- grid里的图片、标题、角标显示 -->
								<image class="image" :src="item.url" mode="aspectFill" />
								<text class="text">{{item.text}}</text>
								<view v-if="item.badge" class="grid-dot">
									<!-- 角标 -->
									<uni-badge :text="item.badge" :type="item.type" />
								</view>

							</view>
						</uni-grid-item>
					</uni-grid>
>>>>>>> master
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
<<<<<<< HEAD

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



=======
				</swiper-item>

				<swiper-item>
					<uni-grid :column="3" :show-border="false" :square="false" @change="change3">
						<uni-grid-item v-for="(item ,index) in list3" :index="index" :key="index">
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

		<!-- 动态更新 -->
		<!-- <uni-section title="动态更新"  type="line" padding> -->
<uni-card title="自定义事件" >
		<view class="grid-dynamic-box">
			<uni-grid :column="3" :highlight="true" :show-border="false" :square="false" @change="changeDynamic">
				<uni-grid-item v-for="(item, index) in dynamicList" :index="index" :key="index">
					<view class="grid-item-box">
						<image :src="item.url" class="image" mode="aspectFill" />
						<text class="text">{{ item.text }}</text>
						<view class="grid-dot">
							<uni-badge :text="item.badge" :type="item.type" />
						</view>
						<button type="primary" @click="del(index)" size="mini">
							删除
						</button>
					</view>
				</uni-grid-item>
			</uni-grid>
		</view>
</uni-card>

<uni-card title="目标列表" sub-title="如有需要,可以给自己设定一个娱乐目标哦">
		<!-- <uni-collapse> -->
			<!-- <uni-collapse-item title="目标列表" :open="true"> -->
			<view class="swipeBox">
				<uni-swipe-action ref="swipeAction">
					<uni-swipe-action-item class="test" v-for="(item, index) in swipeList" :left-options="item.options"
						:key="item.id" @change="swipeChange($event, index)" @click="swipeClick($event, index)">
						<view class="content-box">

							<text class="content-text">{{ item.content }}</text>
							<view class="content-time">
								<text>开始:{{ item.starttime }}</text>
								<text>结束:{{ item.endttime }}</text>
							</view>
							<view class="showDown" v-if="item.isdone">
								<image :src="'/static/done1.png'" class="doneimage" mode="aspectFill" />
							</view>
						</view>
					</uni-swipe-action-item>
				</uni-swipe-action>
			</view>
			<!-- </uni-collapse-item> -->
		<!-- </uni-collapse> -->
</uni-card>



		<!-- 点击后通过调用inputModalToggle方法来打开下面的uni-pop弹出窗口 -->
		<!-- <button type="primary" @click="inputModalToggle"><text class="button-text">添加新项目</text>
			</button> -->




		<uni-popup ref="inputModal" type="dialog">
			<uni-popup-dialog ref="inputClose" mode="input" title="输入事件名称" value="烧烤" placeholder="请输入内容"
				@confirm="dialogInputConfirm">
			</uni-popup-dialog>
		</uni-popup>

<!-- 设定目标的弹出框 ：目前弃用 -->
		<uni-popup ref="inputPlayGoal" type="dialog">
			<uni-popup-dialog ref="inputClose" mode="input" title="输入目标名称" value="游泳" placeholder="请输入内容"
				@confirm="confirmAddNewPlayGoal">

			</uni-popup-dialog>
			<uni-easyinput errorMessage v-model="start" focus placeholder="开始时间(格式2023-7-23-3am)"
				@input="inputStartTime"></uni-easyinput>
			<uni-easyinput errorMessage v-model="end" focus placeholder="结束时间(格式2023-7-23-3pm)"
				@input="inputEndTime"></uni-easyinput>
		</uni-popup>

		<!-- 悬浮按钮 -->
		<view class="warp">
			<uni-fab ref="fab" :pattern="fabpattern" :content="fabcontent" :horizontal="'right'" :vertical="'bottom'"
				:direction="'horizontal'" @trigger="fabtrigger" @fabClick="fabClick" />

		</view>
		<!-- </uni-section> -->

>>>>>>> master
	</view>
</template>

<script>
	export default {
		components: {},
		data() {
			return {
<<<<<<< HEAD
				// 新增2023-7-10
				
				// 新增2023-7-10结束

				// 新增
				value: '',
				dynamicList: [],
				ShowIcon:false,
=======
				// 2023-7-31新增
				testList: [],
				swipeList: [{
						id: 0,
						options: [{
								text: '置顶'
							},

							{
								text: '完成',
								style: {
									backgroundColor: 'rgb(254,156,1)'
								}
							},
							{
								text: '删除',
								style: {
									backgroundColor: 'rgb(255,58,49)'
								}
							},
						],
						content: '例:去一次livehouse',
						starttime: '2023-7-21',
						endttime: '2023-7-22',
						isdone: false
					},
					{
						id: 1,
						options: [{
								text: '置顶'
							},
							{
								text: '完成',
								style: {
									backgroundColor: 'rgb(254,156,1)'
								}
							},
							{
								text: '删除',
								style: {
									backgroundColor: 'rgb(255,58,49)'
								}
							}
						],
						content: '例:散散步',
						starttime: '2023-7-23',
						endttime: '2023-7-25',
						isdone: false
					}
				],

				// 2023-7-31新增结束

				// 2023-7-30新增
				showPopup: false,
				fabpattern: {
					color: '#7A7E83',
					backgroundColor: '#fff',
					selectedColor: '#007AFF',
					buttonColor: '#007AFF',
					iconColor: '#fff'
				},
				fabcontent: [{
						iconPath: '/static/addevent.png',
						selectedIconPath: '/static/addeventSelected.png',
						text: '添加事件',
						active: false
					},
					{
						iconPath: '/static/addgoal.png',
						selectedIconPath: '/static/addgoalSelected.png',
						text: '设定目标',
						active: false
					}
				],

				value: '',
				startTime: '',
				endTime: '',
				dynamicList: [],
				ShowIcon: false,
>>>>>>> master
				list: [{
						url: '/static/Game.png',
						text: '打游戏',
						badge: '0',

						type: "primary"
					},
					{
						url: '/static/烧烤.png',
						text: '露营烧烤',
<<<<<<< HEAD
						badge: '1',
=======
						badge: '0',
>>>>>>> master
						type: "success"
					},
					{
						url: '/static/k歌.png',
						text: 'k歌',
<<<<<<< HEAD
						badge: '99',
=======
						badge: '0',
>>>>>>> master
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
<<<<<<< HEAD
						badge: '1',
=======
						badge: '0',
>>>>>>> master
						type: "success"
					},
					{
						url: '/static/读小说.png',
						text: '看小说',
<<<<<<< HEAD
						badge: '99',
=======
						badge: '0',
>>>>>>> master
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
<<<<<<< HEAD
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
=======

				list3: [{
						url: '/static/爬山.png',
						text: '爬山',
						badge: '0',
						type: "primary"
					},
					{
						url: '/static/骑行.png',
						text: '骑行',
						badge: '0',
						type: "success"
					}, {
						url: '/static/射击射箭.png',
						text: '射击射箭',
						badge: '0',
						type: "warning"
					},
					{
						url: '/static/弹钢琴.png',
						text: '弹钢琴',
						badge: '0',
						type: "primary"
					},
					{
						url: '/static/吉他.png',
						text: '吉他',
						badge: '0',
						type: "success"
					}, {
						url: '/static/看话剧.png',
						text: '看话剧',
						badge: '0',
						type: "warning"
					},
					{
						url: '/static/DIY手工.png',
						text: 'DIY手工',
						badge: '0',

					},
					{
						url: '/static/玩手机.png',
						text: '玩手机',
						badge: '0',

					}, {
						url: '/static/演出.png',
						text: '演出',
						badge: '0',

					},
				],

			}

		},
		// 2023-7-30添加
		onBackPress() {
			if (this.$refs.fab.isShow) {
				this.$refs.fab.close()
				return true
			}
			return false
		},

		onLoad() {
			// 监听事件  

			uni.$on('addnewGoal', (data) => {
				console.log('收到数据' + data)
				this.uitem = data;
			})

		},
		onUnload() {
			// 移除监听事件  
			uni.$off('addnewGoal');
		},
		// 2023-7-30添加结束
		methods: {
			// 2023-7-31添加
			inputStartTime(t) {
				this.startTime = t;

			},
			inputEndTime(t) {
				this.endTime = t;
			},


			swipeChange(e, index) {
				console.log('返回：', e);
				console.log('当前索引：', index);

			},
			swipeClick(e, index) {
				let {
					content
				} = e;

				if (content.text === '删除') {
					uni.showModal({
						title: '提示',
						content: '是否删除',
						success: res => {
							if (res.confirm) {
								this.swipeList.splice(index, 1);
							} else if (res.cancel) {
								console.log('用户点击取消');
							}
						}
					});
				} else if (content.text === '完成') {

					this.swipeList[index].isdone = true;

				} else if (content.text === '置顶') {
					uni.showModal({
						title: '提示',
						content: '是否置顶',
						success: res => {
							if (res.confirm) {
								console.log(this.swipeList)
								console.log(index);
								this.swipeList.unshift(this.swipeList[index]); //把查找到的数据复制添加到数组的首位
								console.log('置顶后删除前',this.swipeList)
								console.log(index);
								this.swipeList.splice(index+1,1);
								console.log('置顶后删除后',this.swipeList)
							} else if (res.cancel) {
								console.log('用户点击取消');
							}
						}
					});





				}
			},
			toaddNewGoal() {
				this.swipeList.push({
					id: new Date().getTime(),
					options: [{
							text: '置顶'
						}, {
							text: '完成',
							style: {
								backgroundColor: 'rgb(254,156,1)'
							}
						},
						{
							text: '删除',
							style: {
								backgroundColor: 'rgb(255,58,49)'
							}
						}
					],
					content: this.value,
					starttime: this.startTime,
					endttime: this.endTime
				});
				uni.showToast({
					title: `添加了一条新目标`,
					icon: 'none'
				});

			},
			confirmAddNewPlayGoal(val) {
				this.value = val
				//调用add方法
				this.toaddNewGoal(),
					// 关闭窗口后，恢复默认内容
					this.$refs.inputPlayGoal.close()
			},
			// 2023-7-31添加结束

			// 2023-7-30添加
			fabtrigger(e) {
				console.log(e)
				console.log(e.index)
				var that = this;
				// 高亮显示
				this.fabcontent[e.index].active = !e.item.active
				if (e.index == 0) {
					if (this.fabcontent[e.index].active) {
						this.$refs.inputModal.open()
					}
				} else if (e.index == 1) {
					uni.showModal({
						title: '提示',
						// content: `您确认要${this.fabcontent[e.index].active ? '选中' : '取消'}${e.item.text}吗？`,
						content: `您确认要${e.item.text}吗？`,
						success: function(res) {
							if (res.confirm) {
								console.log('用户点击确定设立目标')
								// uni.navigateTo({
								// 	url: '/pages/self-manage/play/add_playGoal',
								// });
								
								// 弹出输入框
								// that.$refs.inputPlayGoal.open()
								
								
								uni.navigateTo({
									url: '/pages/self-manage/play/add_playGoal',
									events: {
										addplayGoal(data) {
											let obj = {
												id: new Date().getTime(),
												options: [{
														text: '置顶'
													}, {
														text: '完成',
														style: {
															backgroundColor: 'rgb(254,156,1)'
														}
													},
													{
														text: '删除',
														style: {
															backgroundColor: 'rgb(255,58,49)'
														}
													}
												],
												content: data.title,
												starttime: data.startDate,
												endttime: data.endDate
												
												
											}
											that.swipeList.push(obj);
											console.log(obj);
											// 上一句不加分号的话下面这个就执行不了
											console.log('查看数组：', that.swipeList);
											console.log('play页面成功接收到add_playgoal的数据');
								
										},
								
									}
								});
								
							} else if (res.cancel) {
								console.log('用户点击取消')
							}
						},

					})

				}
				// 关闭高亮显示
				this.fabcontent[e.index].active = !e.item.active


			},
			fabClick() {
				console.log('用户点击了悬浮按钮')

			},
			// 2023-7-30添加结束

>>>>>>> master
			// inputModalToggle调用父组件的$refs对象，得到inputModal引用
			inputModalToggle() {
				this.$refs.inputModal.open()
				//this.showModal = true;
			},
<<<<<<< HEAD
			inputDialogToggle() {
				this.$refs.inputDialog.open()
			},
=======

>>>>>>> master
			dialogClose() {
				console.log('点击关闭')
			},
			dialogInputConfirm(val) {
<<<<<<< HEAD
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
=======
				this.value = val
				//调用add方法
				this.add(),
					// 关闭窗口后，恢复默认内容
					this.$refs.inputModal.close()

			},
			change(e) {

				console.log(e);
				console.log('点击了第', e.detail, '个宫格')
				let {
					index
				} = e.detail

				var that = this;
				uni.showModal({
					title: '提示',
					content: `您确认要+1吗？`,
					success: function(res) {
						if (res.confirm) {
							console.log('用户点击确定事件+1');
							that.list[index].badge && that.list[index].badge++;
							uni.navigateTo({
								url: '/pages/self-manage/play/EventFormRecord',
								events: {
									aditorEvent(data) {
										let obj = {
											title: data.title,
											Content_value: data.Content_value,
											url: data.url
										}
										that.testList.push(obj);
										// 改变后的名称覆盖过去
										that.list[index].text=data.title;
										console.log(obj);
										// 上一句不加分号的话下面这个就执行不了
										console.log('查看数组：', that.testList);
										console.log('play页面成功接收到EventFormRecord的数据');

									},

								}
							});

						} else if (res.cancel) {
							console.log('用户点击取消')
						}
					},

				})




>>>>>>> master
			},
			change2(e) {
				let {
					index
				} = e.detail
<<<<<<< HEAD
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
=======

				var that = this;
				uni.showModal({
					title: '提示',
					content: `您确认要+1吗？`,
					success: function(res) {
						if (res.confirm) {
							console.log('用户点击确定事件+1');
							that.list2[index].badge && that.list2[index].badge++;
							uni.navigateTo({
								url: '/pages/self-manage/play/EventFormRecord',
								events: {
									aditorEvent(data) {
										let obj = {
											title: data.title,
											Content_value: data.Content_value
										}
										that.testList.push(obj);
										// 改变后的名称覆盖过去
										that.list2[index].text=data.title;
										console.log(obj);
										// 上一句不加分号的话下面这个就执行不了
										console.log('查看数组：', that.testList);
										console.log('play页面成功接收到EventFormRecord的数据');

									},

								}
							});

						} else if (res.cancel) {
							console.log('用户点击取消')
						}
					},

				})

			},
			change3(e) {
				let {
					index
				} = e.detail

				var that = this;
				uni.showModal({
					title: '提示',
					content: `您确认要+1吗？`,
					success: function(res) {
						if (res.confirm) {
							console.log('用户点击确定事件+1');
							that.list3[index].badge && that.list3[index].badge++;
							uni.navigateTo({
								url: '/pages/self-manage/play/EventFormRecord',
								events: {
									aditorEvent(data) {
										let obj = {
											title: data.title,
											Content_value: data.Content_value
										}
										that.testList.push(obj);
										// 改变后的名称覆盖过去
										that.list3[index].text=data.title;
										console.log(obj);
										// 上一句不加分号的话下面这个就执行不了
										console.log('查看数组：', that.testList);
										console.log('play页面成功接收到EventFormRecord的数据');

									},

								}
							});

						} else if (res.cancel) {
							console.log('用户点击取消')
						}
					},

				})

			},
			
			changeDynamic(e) {
				let {
					index
				} = e.detail
			
				var that = this;
				uni.showModal({
					title: '提示',
					content: `您确认要+1吗？`,
					success: function(res) {
						if (res.confirm) {
							console.log('用户点击确定事件+1');
							that.dynamicList[index].badge && that.dynamicList[index].badge++;
							uni.navigateTo({
								url: '/pages/self-manage/play/EventFormRecord',
								events: {
									aditorEvent(data) {
										let obj = {
											title: data.title,
											Content_value: data.Content_value
										}
										that.testList.push(obj);
										// 改变后的名称覆盖过去
										that.dynamicList[index].text=data.title;
										console.log(obj);
										// 上一句不加分号的话下面这个就执行不了
										console.log('查看数组：', that.testList);
										console.log('play页面成功接收到EventFormRecord的数据');
			
									},
			
								}
							});
			
						} else if (res.cancel) {
							console.log('用户点击取消')
						}
					},
			
				})
			
			},

			add() {
				this.dynamicList.push({

					// url: `/static/c${this.dynamicList.length+1}.png`,
					// url: `/static/c${(this.dynamicList.length)%12+1}.png`,
					// 随机函数产生1-12之间的随机数Math.floor(Math.random() * (max - min + 1)) + min
					url: `/static/c${Math.floor(Math.random() * (12 - 1 + 1)) + 1}.png`,
					
					// url: `/static/c6.png`,
					text: this.value,
					badge: '0',
					type: "primary",
					// color: this.dynamicList.length % 2 === 0 ? '#f5f5f5' : "#fff"

				})

			},
			del(index) {
				
				var that=this;
				uni.showModal({
					title: '提示',
					content: `您确认要删除吗？`,
					success: function(res) {
						if (res.confirm) {
							
							console.log("(下标从0开始)删除第" + index + "个")
							that.dynamicList.splice(index, 1)
							
				
						} else if (res.cancel) {
							console.log('用户点击取消')
						}
					},
				
				})
			},

>>>>>>> master
		}
	}
</script>


<style lang="scss">
	.image {
		width: 25px;
		height: 25px;
	}

<<<<<<< HEAD
=======
	.doneimage {
		width: 25px;
		height: 25px;

		margin: 20px auto;
		/* 设置左右外边距为auto，实现水平居中 */
		text-align: center;
		/* 设置文本居中，以修复可能的对齐问题 */


	}

>>>>>>> master
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
<<<<<<< HEAD
		display: flex;
		/* #endif */
=======

		// 使用flex布局
		display: flex;
		/* #endif */
		// 主轴以纵方向排布
>>>>>>> master
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 15px 0;
<<<<<<< HEAD
=======

>>>>>>> master
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
<<<<<<< HEAD
=======
	.swipeBox{
		box-shadow: -1px 1px 5px 1px rgba(0, 0, 0, 0.1), -1px 2px 1px 0 rgba(255, 255, 255) inset;
	}
>>>>>>> master
	// 2023-7-2新增
	.icon-content {
		display: flex;
		flex-wrap: wrap;
		flex-direction: row;
		justify-content: center;
<<<<<<< HEAD
	
=======

>>>>>>> master
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
<<<<<<< HEAD
=======

>>>>>>> master
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
<<<<<<< HEAD
=======

	.content-box {

		display: flex;
		flex-direction: row;
		flex-wrap: wrapl;
		// 行高
		line-height: 30px;
	}

	.content-text {

		display: flex;
		// background-color: #18a0c2;
		width: 150px;
		text-align: center;
		justify-content: center;
		flex-direction: column;
	}

	.content-time {
		// 取消缩放的
		// flex-shrink: 0;
		display: flex;
		flex-direction: column;
		font-size: 10px;
	}

	.test {
		// background-color: #18a0c2;
	}

	.showDown {
		justify-content: flex-end;
		margin-left: auto;

		width: 50px;
		// background-color:crimson;
	}
>>>>>>> master
</style>