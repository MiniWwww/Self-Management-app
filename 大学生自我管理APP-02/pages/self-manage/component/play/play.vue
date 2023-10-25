<template>
	<view class="wrap">
		<uni-card is-full :is-shadow="false">
			<text class="uni-h6">今天玩了什么呢</text>
		</uni-card>

		<!-- 基本项目 -->
		<uni-section title="娱乐活动" type="line" padding>
			<!--滑动换页-->

			<swiper class="swiper" :indicator-dots="true">
				<!-- 尝试把这三个放一起，行得通 -->
				<swiper-item v-for="(item ,index) in Two_dimensional_array" :index="item.id" :key="item.list" > 
					<uni-grid :column="3" :show-border="false" :square="false" >
						<uni-grid-item v-for="(griditem ,gridindex) in item.list" :index="index" :key="index" @longpress="del(item.id,gridindex)"
							@click="changeTwo_dimen(item.id,gridindex)" >
							<view class="grid-item-box">
								<!-- grid里的图片、标题、角标显示 -->
								<image class="image" :src="griditem.url" mode="aspectFill" />
								<text class="text">{{griditem.text}}</text>
								<view v-if="griditem.badge" class="grid-dot">
									<!-- 角标 -->
									<uni-badge :text="griditem.badge" :type="griditem.type" />
								</view>
							</view>
						</uni-grid-item>
					</uni-grid>
				</swiper-item>

				
			</swiper>

		</uni-section>

		

		<uni-card title="目标列表" sub-title="如有需要,可以给自己设定一个娱乐目标哦">
			<!-- <uni-collapse> -->
			<!-- <uni-collapse-item title="目标列表" :open="true"> -->
			<view class="swipeBox">
				<uni-swipe-action ref="swipeAction">
					<uni-swipe-action-item class="test" v-for="(item, index) in swipeList" :left-options="item.options"
						:key="item.id" @change="swipeChange($event, index)" @click="swipeClick($event, index)">
						<view class="content-box">

							<text class="content-text">{{ item.content }}</text>
							<view v-if="item.timetype0" class="content-time">
								<text>开始:{{ item.starttime }}</text>
								<text>结束:{{ item.endttime }}</text>
							</view>
							<view v-if="item.timetype1" class="content-time-cycle">
								<text v-for="(day, dayindex) in item.checkbox2" :index="dayindex"
									:key="dayindex">{{ day }}</text>

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

		<!-- 2023-9-10添加 -->
		<view>
			<!-- 提示信息弹窗 -->
			<uni-popup ref="message" type="message">
				<uni-popup-message :type="msgType" :message="messageText" :duration="2000"></uni-popup-message>
			</uni-popup>
		</view>
	</view>
</template>

<script>
	export default {
		components: {},
		data() {
			return {
				// 2023-10-21新增
				playGoalSuccessList: [],
				playGoalSuccessListID: 0,
				Current_Two_dimen_array_index: 0,
				
				Two_dimensional_array: [{
						id: 0,
						isfull:true,
						list: [{
								listindex: 0,
								
								url: '/static/Game.png',
								text: '打游戏',
								badge: '0',

								type: "primary"
							},
							{
								listindex: 1,
								url: '/static/烧烤.png',
								text: '露营烧烤',
								badge: '0',
								type: "success"
							},
							{
								listindex: 2,
								url: '/static/k歌.png',
								text: 'k歌',
								badge: '0',
								type: "warning"
							},
							{
								listindex: 3,
								url: '/static/游乐园.png',
								text: '游园',
								badge: '0',
								type: "error" //type是角标的类型，比如errors红色的
							},
							{
								listindex: 4,
								url: '/static/摄影.png',
								text: '摄影',
								badge: '0'
							},
							{
								listindex: 5,
								url: '/static/艺术品.png',
								text: '看展',
								badge: '0'
							},
							{
								listindex: 6,
								url: '/static/14-企业团建.png',
								text: '团建',
								badge: '0'
							},
							{
								listindex: 7,
								url: '/static/密室预订.png',
								text: '密室逃脱',
								badge: '0'
							},
							{
								listindex: 8,
								url: '/static/旅游.png',
								text: '旅游',
								badge: '0'
							}
						]
					},

					{
						id: 1,
						isfull:true,
						list: [{
								listindex: 0,
								url: '/static/综合素质评价.png',
								text: '素拓',
								badge: '0',

								type: "primary"
							},
							{
								listindex: 1,
								url: '/static/听歌.png',
								text: '听歌',
								badge: '0',
								type: "success"
							},
							{
								listindex: 2,
								url: '/static/读小说.png',
								text: '看小说',
								badge: '0',
								type: "warning"
							},
							{
								listindex: 3,
								url: '/static/电影.png',
								text: '看电影',
								badge: '0',
								type: "error" //type是角标的类型，比如errors红色的
							},
							{
								listindex: 4,
								url: '/static/购物车空.png',
								text: '购物',
								badge: '0'
							},
							{
								listindex: 5,
								url: '/static/画画.png',
								text: '画画',
								badge: '0'
							},
							{
								listindex: 6,
								url: '/static/美食.png',
								text: '品尝美食',
								badge: '0'
							},
							{
								listindex: 7,
								url: '/static/跳舞.png',
								text: '跳舞',
								badge: '0'
							},
							{
								listindex: 8,
								url: '/static/桌球.png',
								text: '桌球',
								badge: '0'
							}
						],
					},

					{
						id: 2,
						isfull:true,
						list: [{
								listindex: 0,
								url: '/static/爬山.png',
								text: '爬山',
								badge: '0',
								type: "primary"
							},
							{
								listindex: 1,
								url: '/static/骑行.png',
								text: '骑行',
								badge: '0',
								type: "success"
							}, {
								listindex: 2,
								url: '/static/射击射箭.png',
								text: '射击射箭',
								badge: '0',
								type: "warning"
							},
							{
								listindex: 3,
								url: '/static/弹钢琴.png',
								text: '弹钢琴',
								badge: '0',
								type: "primary"
							},
							{
								listindex: 4,
								url: '/static/吉他.png',
								text: '吉他',
								badge: '0',
								type: "success"
							}, {
								listindex: 5,
								url: '/static/看话剧.png',
								text: '看话剧',
								badge: '0',
								type: "warning"
							},
							{
								listindex: 6,
								url: '/static/DIY手工.png',
								text: 'DIY手工',
								badge: '0',

							},
							{
								listindex: 7,
								url: '/static/玩手机.png',
								text: '玩手机',
								badge: '0',

							}, {
								listindex: 8,
								url: '/static/演出.png',
								text: '演出',
								badge: '0',

							},
						],
					}

				],
				// 2023-10-21新增结束


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
						timetype0: true,
						timetype1: false,
						isdone: false,
						checkbox2: []
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
						timetype0: false,
						timetype1: true,
						isdone: false,
						checkbox2: ["每周一", "每周二"]
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
			//2023-9-10添加
			messageToggle(type) {
				this.msgType = type
				this.messageText = `成功完成一个目标`
				this.$refs.message.open();


			},
			// 2023-9-10添加结束
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
					// 成功弹窗
					this.messageToggle("success");

					var that = this;
					//2023-10-21添加
					let obj = {
						id: that.playGoalSuccessListID + 1,
						content: that.swipeList[index].content,

					}
					console.log(obj);

					that.playGoalSuccessList.push(obj);
					uni.setStorage({ //存入Storage
						key: 'playGoalSuccess', //自己取个名字
						data: { //存的数据可以是很多条

							content: that.swipeList[index].content,

						},

						success() {
							console.log('playGoalSuccess储存成功');
						}
					});
					//2023-10-21添加结束


				} else if (content.text === '置顶') {
					uni.showModal({
						title: '提示',
						content: '是否置顶',
						success: res => {
							if (res.confirm) {
								console.log(this.swipeList)
								console.log(index);
								this.swipeList.unshift(this.swipeList[index]); //把查找到的数据复制添加到数组的首位
								console.log('置顶后删除前', this.swipeList)
								console.log(index);
								this.swipeList.splice(index + 1, 1);
								console.log('置顶后删除后', this.swipeList)
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
						title: '目标说明',
						// content: `您确认要${this.fabcontent[e.index].active ? '选中' : '取消'}${e.item.text}吗？`,
						content: `忙碌的生活中是否给你带来了很大的压力呢？如果需要，不妨设定一个娱乐目标让自己放松一下吧~`,
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
												timetype0: data.timetype0,
												timetype1: data.timetype1,
												starttime: data.startDate,
												endttime: data.endDate,
												checkbox2: data.checkbox2,
												isdone: false

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

			// inputModalToggle调用父组件的$refs对象，得到inputModal引用
			inputModalToggle() {
				this.$refs.inputModal.open()
				//this.showModal = true;
			},

			dialogClose() {
				console.log('点击关闭')
			},
			dialogInputConfirm(val) {
				this.value = val
				//调用add方法
				this.add(),
					// 关闭窗口后，恢复默认内容
					this.$refs.inputModal.close()

			},
			changeTwo_dimen(listID, listIndex) {
				console.log(listID);
				console.log('点击了第', listIndex, '个宫格');
				var that = this;
				uni.showModal({
					title: '提示',
					content: `您确认要+1吗？`,
					// 提示框圆角设计
					// customClass:'custom-modal',
					success: function(res) {
						if (res.confirm) {
							console.log('用户点击确定事件+1');
							that.Two_dimensional_array[listID].list[listIndex].badge && that
								.Two_dimensional_array[listID].list[listIndex].badge++;


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
										that.Two_dimensional_array[listID].list[listIndex].text = data
											.title;

										console.log(obj);
										// 上一句不加分号的话下面这个就执行不了
										console.log('查看数组：', that.Two_dimensional_array[listID].list[
											listIndex]);
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
				console.log('未添加前二维数组长度' + this.Two_dimensional_array.length);
				var i=0;
				for(;i<this.Two_dimensional_array.length;i++){
					if(this.Two_dimensional_array[i].isfull==false){
						break;
					}
					else{
						console.log('当前的i'+i+'不是')
					}
				}
				
				console.log('当前跳出时i='+i)
				
				let Length = this.Two_dimensional_array.length;
				if (i==Length) {
					this.Two_dimensional_array.push({
						
						id: Length,
						isfull:false,
						list: []


					})
				}
				console.log('此时二维数组长度' + this.Two_dimensional_array.length);
				let Two_dimensional_arrayLength=this.Two_dimensional_array.length;
				console.log('未添加前最新二维数组的一维数组长度' + this.Two_dimensional_array[Two_dimensional_arrayLength - 1].list.length);
				let ListLength = this.Two_dimensional_array[this.Two_dimensional_array.length - 1].list.length;
				
				for(var i2=0;i2<Two_dimensional_arrayLength;i2++){
					let eachLength = this.Two_dimensional_array[i2].list.length;
				if (eachLength < 9) {
					// 找到第一个长度为9的数组
					console.log('找到小于9的i：'+i2)
					this.Two_dimensional_array[i2].list.push({

						url: `/static/c${Math.floor(Math.random() * (12 - 1 + 1)) + 1}.png`,

						// url: `/static/c6.png`,
						text: this.value,
						badge: '0',
						type: "primary",


					});
					console.log('添加后最新二维数组的一维数组长度' + this.Two_dimensional_array[Two_dimensional_arrayLength - 1].list.length);
					
					if(this.Two_dimensional_array[i2].list.length==9){
						this.Two_dimensional_array[i2].isfull=true;
					}
					console.log('当前第'+i2+'个数组的isfull为：'+this.Two_dimensional_array[i2].isfull)
					// 一旦找到一个数组了，那就跳出for循环
					// i=Two_dimensional_arrayLength;
					break;
					

					}
					
				}
				
				// this.dynamicList.push({

				// 	// url: `/static/c${this.dynamicList.length+1}.png`,
				// 	// url: `/static/c${(this.dynamicList.length)%12+1}.png`,
				// 	// 随机函数产生1-12之间的随机数Math.floor(Math.random() * (max - min + 1)) + min
				// 	url: `/static/c${Math.floor(Math.random() * (12 - 1 + 1)) + 1}.png`,

				// 	// url: `/static/c6.png`,
				// 	text: this.value,
				// 	badge: '0',
				// 	type: "primary",
				// 	// color: this.dynamicList.length % 2 === 0 ? '#f5f5f5' : "#fff"

				// })

				
			},
			del(index,listindex) {
				console.log('当前长按了第'+index+'个数组的第'+listindex+'个宫格')
				var that = this;
				uni.showModal({
					title: '提示',
					content: `您确认要删除吗？`,
					success: function(res) {
						if (res.confirm) {

							console.log("(下标从0开始)删除第" + index + "个")
							that.Two_dimensional_array[index].list.splice(listindex,1);
							that.Two_dimensional_array[index].isfull=false
							// that.dynamicList.splice(index, 1)


						} else if (res.cancel) {
							console.log('用户点击取消')
						}
					},

				})
			},

		}
	}
</script>


<style lang="scss">
	.image {
		width: 25px;
		height: 25px;
	}

	.doneimage {
		width: 25px;
		height: 25px;

		margin: 20px auto;
		/* 设置左右外边距为auto，实现水平居中 */
		text-align: center;
		/* 设置文本居中，以修复可能的对齐问题 */


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

		// 使用flex布局
		display: flex;
		/* #endif */
		// 主轴以纵方向排布
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

	.swipeBox {
		box-shadow: -1px 1px 5px 1px rgba(0, 0, 0, 0.1), -1px 2px 1px 0 rgba(255, 255, 255) inset;
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

	.content-time-cycle {
		display: flex;
		flex-direction: row;
		font-size: 9px;
		justify-content: space-between;

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
	// .custom-modal{
	// 	//提示框圆角设计
	// 	border-radius: 30px;
	// }
</style>