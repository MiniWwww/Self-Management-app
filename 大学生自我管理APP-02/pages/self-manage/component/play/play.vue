<template>
	<view style="overflow-y: auto; min-height: 100vh;" @touchstart="closePop">
		<view class="header">
			<view class="header-text">今天玩了什么呢</view>
			<view class="wenhao">?</view>
		</view>


		<!-- 基本项目 -->
		<!--滑动换页-->

		<swiper class="swiper" :indicator-dots="true">
			<!-- 尝试把这三个放一起，行得通 -->
			<swiper-item v-if="boolGetPlayEvent" v-for="(item ,index) in Two_dimensional_array" :index="item.id"
				:key="item.list">
				<uni-grid :column="3" :show-border="false" :square="false">
					<uni-grid-item v-for="(griditem ,gridindex) in item.list" :index="index" :key="index"
						@longpress="del(item.id,gridindex)" @click="changeTwo_dimen(item.id,gridindex)"
						@dblclick="minusBadge(item.id,gridindex)">
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



		<!-- <uni-card title="目标列表"> -->
		<!-- <uni-collapse> -->
		<!-- <uni-collapse-item title="目标列表" :open="true"> -->
		<view class="target_header">
			<view class="header-text">我的目标</view>
			<view class="wenhao">!</view>
		</view>
		<view class="target-box">
			<view class="content-box" :class="{'targetDone': item.isdone}" v-for="(item, index) in swipeList"
				:key="item.id">
				<view class="content-title">
					{{ item.title }}
					<view class="pop_select" @touchstart.stop @click="popup(index)"> <!--弹出-->
						<uni-icons type="more" size="20" color="#009688"
							style="position: absolute; right: 9%;"></uni-icons>
					</view>
				</view>
				<view class="content" @click="showGoalDetail()">
					<view v-if="item.timetype0" class="content-time">
						<text>时间：{{ item.starttime }}——{{ item.endttime }}</text>
						<!-- <view style="width: 90%;">
							<text v-if="item.content" style="font-size: 14px; color: grey; word-wrap: break-word;">
							            {{ item.content }}
							        </text>
						</view> -->
						<image v-if="item.isNotStart" src="../../../../static/未开始.png"
							style="height: 25px;width: 50px;justify-content: end"></image>
						<image v-if="item.istargetDate" src="../../../../static/待完成2.png"
							style="height: 25px;width: 50px;justify-content: end"></image>
						<image v-if="item.isoverdue" src="../../../../static/已过期.png"
							style="height: 25px;width: 25px;justify-content: end"></image>

					</view>

					<view v-if="item.timetype1" class="content-cycle">
						时间：<text decode="true" v-for="(day, dayindex) in item.checkbox2" :index="dayindex" :key="dayindex" >{{day}}&emsp;
						</text>
						<image v-if="item.istargetDate&&!item.isTodayDone" src="../../../../static/待完成2.png"
							style="height: 25px;width: 25px;justify-content: end"></image>

						<image v-if="item.isTodayDone" src="../../../../static/今日已完成.png"
							style="height: 25px;width: 25px;justify-content: end"></image>

					</view>
					<view class="content-content" v-if="item.content">
						<text style="color: gray;">畅想：{{item.content}}</text>
					</view>
				</view>
				
				<view class="more_list" v-if="item.pop_flag" @touchstart.stop>
					<view v-for="(option_item, option_index) in item.options" :key="option_item.text"
						class="more_list_item" @click.stop="swipeClick(option_item, index, item)">
						{{option_item.text}}
					</view>
				</view>
				<view class="showDown" v-if="item.isdone">
					<image src="/static/小红花.png" class="doneimage" mode="aspectFill" />
				</view>
			</view>
			<!-- <uni-swipe-action ref="swipeAction">
				<uni-swipe-action-item  :left-options="item.options"
					 @change="swipeChange($event, index)" @click="swipeClick($event, index)">
					
				</uni-swipe-action-item>
			</uni-swipe-action> -->
		</view>
		<!-- </uni-collapse-item> -->
		<!-- </uni-collapse> -->
		<!-- </uni-card> -->



		<!-- 点击后通过调用inputModalToggle方法来打开下面的uni-pop弹出窗口 -->
		<!-- <button type="primary" @click="inputModalToggle"><text class="button-text">添加新项目</text>
			</button> -->

		<uni-popup ref="inputModal" type="dialog">
			<uni-popup-dialog ref="inputClose" mode="input"  title="输入事件名称" value="烧烤" placeholder="请输入内容" 
				@confirm="dialogInputConfirm">
			</uni-popup-dialog>
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
		<view class="br"></view>
	</view>
</template>

<script>
	export default {
		inject:['reload'],
		// props:["SendTOplay_SwipeList"],
		components: {},
		//钩子
		// mounted() {
		//   // 监听事件
		//   this.$bus.$on('updateSwipeList', swipeList => {
		//     this.swipeList = swipeList
		//   })
		// },

		data() {
			return {
				week: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"],
				today: '',
				today_year: '',
				today_date: '',
				today_week: '',
				nowtime: [{
					hour: ''
				}, {
					minute: ''
				}],
				clickTimeout: null, // 单击延迟任务的标识符
				doubleClickDelay: 200, // 定义双击事件的时间间隔阈值（单位：毫秒）
				// 2023-10-21新增
				boolGetPlayEvent: true,
				playGoalSuccessList: [],
				Current_Two_dimen_array_index: 0,
				testLIst: this.SendTOplay_SwipeList,
				Two_dimensional_array: [{
						id: 0,
						isfull: true,
						list: [{
								listindex: 0,

								url: '/static/c22.png',
								text: '打游戏',
								badge: '0',
								type: "success"
							},
							{
								listindex: 1,
								url: '/static/c23.png',
								text: '露营烧烤',
								badge: '0',
								type: "success"
							},
							{
								listindex: 2,
								url: '/static/c20.png',
								text: 'k歌',
								badge: '0',
								type: "success"
							},
							{
								listindex: 3,
								url: '/static/c24.png',
								text: '游园',
								badge: '0',
								type: "success" //type是角标的类型，比如errors红色的
							},
							{
								listindex: 4,
								url: '/static/c25.png',
								text: '摄影',
								badge: '0',
								type: "success"
							},
							{
								listindex: 5,
								url: '/static/c27.png',
								text: '看展',
								badge: '0',
								type: "success"
							},
							{
								listindex: 6,
								url: '/static/c26.png',
								text: '团建',
								badge: '0',
								type: "success"
							},
							{
								listindex: 7,
								url: '/static/密室预订.png',
								text: '密室逃脱',
								badge: '0',
								type: "success"
							},
							{
								listindex: 8,
								url: '/static/旅游.png',
								text: '旅游',
								badge: '0',
								type: "success"
							}
						]
					},

					{
						id: 1,
						isfull: true,
						list: [{
								listindex: 0,
								url: '/static/综合素质评价.png',
								text: '素拓',
								badge: '0',
								type: "success"
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
								type: "success"
							},
							{
								listindex: 3,
								url: '/static/电影.png',
								text: '看电影',
								badge: '0',
								type: "success" //type是角标的类型，比如errors红色的
							},
							{
								listindex: 4,
								url: '/static/购物车空.png',
								text: '购物',
								badge: '0',
								type: "success"
							},
							{
								listindex: 5,
								url: '/static/画画.png',
								text: '画画',
								badge: '0',
								type: "success"
							},
							{
								listindex: 6,
								url: '/static/美食.png',
								text: '品尝美食',
								badge: '0',
								type: "success"
							},
							{
								listindex: 7,
								url: '/static/跳舞.png',
								text: '跳舞',
								badge: '0',
								type: "success"
							},
							{
								listindex: 8,
								url: '/static/桌球.png',
								text: '桌球',
								badge: '0',
								type: "success"
							}
						],
					},

					{
						id: 2,
						isfull: true,
						list: [{
								listindex: 0,
								url: '/static/爬山.png',
								text: '爬山',
								badge: '0',
								type: "success"
							},
							{
								listindex: 1,
								url: '/static/c21.png',
								text: '骑行',
								badge: '0',
								type: "success"
							}, {
								listindex: 2,
								url: '/static/射击射箭.png',
								text: '射击射箭',
								badge: '0',
								type: "success"
							},
							{
								listindex: 3,
								url: '/static/弹钢琴.png',
								text: '弹钢琴',
								badge: '0',
								type: "success"
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
								type: "success"
							},
							{
								listindex: 6,
								url: '/static/DIY手工.png',
								text: 'DIY手工',
								badge: '0',
								type: "success"

							},
							{
								listindex: 7,
								url: '/static/玩手机.png',
								text: '玩手机',
								badge: '0',
								type: "success"

							}, {
								listindex: 8,
								url: '/static/演出.png',
								text: '演出',
								badge: '0',
								type: "success"

							},
						],
					}

				],
				// 2023-10-21新增结束


				// 2023-7-31新增
				testList: [],
				swipeList: [],

				// 2023-7-31新增结束

				// 2023-7-30新增
				showPopup: false,
				fabpattern: {
					color: '#7A7E83',
					backgroundColor: '#fff',
					selectedColor: '#009688',
					buttonColor: '#009688',
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
					},
					{
						iconPath: '/static/统计.png',
						selectedIconPath: '/static/addgoalSelected.png',
						text: '统计',
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
		//在这里onshow不起作用，因为play.vue是被引入到self-management.vue界面了
		//实际上根本不能到达play.vue界面
		// onShow不起作用，就读不到数据
		// 所以要到self-management.vue那里写
		onShow() {

		},
		onPageScroll: function(e) {
			console.log("???")
			this.swipeList.forEach(v => {
				v.pop_flag = false
			})
		},

		// // 钩子：
		mounted() {
			console.log('这是play页面的mounted监听函数');

			// 移除监听事件
			// uni.$off('addnewGoal');
		},
		beforeMount() {
			console.log('这是play页面的beforeMount监听函数');

		},
		created() {
			var that = this;
			console.log('这是play页面的created监听函数');
			console.log('当前swipeList:', this.swipeList);
			//能获取成功，但报别的错误
			var that = this;
			let List = uni.getStorageSync('update_playEvent');
			if (List) {
				console.log('获取娱乐事件数组成功', List);
				//swiper一定要先销毁，不然报错
				that.boolGetPlayEvent = false;
				that.Two_dimensional_array = List;
				that.boolGetPlayEvent = true;
				console.log('获取后的Two_dimensional_array：', that.Two_dimensional_array);
			}
			// uni.getStorage({
			// 	key:'update_playEvent',
			// 	success(res) {
			// 		console.log('获取娱乐事件数组成功',res.data);
			// 				//swiper一定要先销毁，不然报错
			// 				that.boolGetPlayEvent=false;
			// 		that.Two_dimensional_array=res.data;
			// 				that.boolGetPlayEvent=true;
			// 		console.log('获取后的Two_dimensional_array：',that.Two_dimensional_array);
			// 	}
			// }),
			uni.getStorage({
				key: 'playGoalDATA',
				success(res) {
					if (res != null) {
						that.swipeList = res.data.PlayGoalList;
						console.log('uni.getTorage接收后的swipeList:', that.swipeList);
						that.swipeList.forEach(v => {
							v.pop_flag = false;
						})
						that.getNowTime()

					}
				},
				fail() {
					console.log('获取失败');
					that.swipeList = [{
							id: 0,
							options: [{
									text: '删除',
									style: {
										backgroundColor: 'rgb(255,58,49)'
									}
								},

								{
									text: '完成',
									style: {
										backgroundColor: 'rgb(254,156,1)'
									}
								}, {
									text: '置顶'
								}

							],
							title: '例:去一次livehouse',
							content: '五月的帆布小镇或者六月的棱镜都可以！',
							starttime: '2023-7-21',
							endttime: '2023-7-22',
							timetype0: true,
							timetype1: false,
							isdone: false, //整个目标是否结束
							isTodayDone: false, //今日是否已做
							currentWeekDone: false, //当前周是否完成
							istargetDate: false,
							isoverdue: false,
							isNotStart: false,
							checkbox2: [],
							weeklyDone: [], //用于记录该目标在当前周已完成的天数
							askedForNextWeek: false,
							weeklyDoneWeek: Number, //记录weeklyDone对应的周数，以便识别新的一周并重置状态
							completedWeeks: [], //完成的周数以及内容
							pop_flag: false,
						},
						{
							id: 1,
							options: [{
									text: '删除',
									style: {
										backgroundColor: 'rgb(255,58,49)'
									}
								},

								{
									text: '完成',
									style: {
										backgroundColor: 'rgb(254,156,1)'
									}
								}, {
									text: '置顶'
								}
							],
							title: '例:散散步',
							content: '每天晚上饭后走一走',
							starttime: '2023-7-23',
							endttime: '2023-7-25',
							timetype0: false,
							timetype1: true,
							isdone: false, //整个目标是否结束
							isTodayDone: false, //今日是否已做
							currentWeekDone: false, //当前周是否完成
							istargetDate: false,
							isoverdue: false,
							isNotStart: false,
							checkbox2: ["每周一", "每周二", "每周三"],
							weeklyDone: [],
							askedForNextWeek: false,
							weeklyDoneWeek: Number,
							completedWeeks: [], //完成的周数以及内容
							pop_flag: false,
						}
					]
					
				}

			});



			//用uni.$emit发射，play页面uni.$on接收总是有延迟，每次都得uni.$emit 娱乐页面才有数据，所以弃用
			// uni.$on('updateSwipeList', (list) => {
			// 	if(list!=null){
			//   this.swipeList = list;
			//   console.log('play页面监听到self-management传来的值了！',list);
			//   }
			// });
		},
		methods: {
			showGoalDetail(){
				console.log("点击查看目标详情")
			},
			addTimes(m) {
				return m < 10 ? '0' + m : m
			},
			// 用于判断今天是年内的第几周
			getWeekNumber(d) {
				// 复制日期，因此不会修改原始日期
				d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
				// 设置为最近的星期四：当前日期 + 4 - 当前星期数
				// 将星期日的星期数设置为7
				d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
				// 获取年份的第一天
				let yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
				// 计算到最近的星期四的完整周数
				let weekNo = Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
				return weekNo;
			},
			getNowTime() { //获取当前时间
				var time = new Date(new Date().getTime());
				let y = time.getFullYear();
				let m = time.getMonth() + 1;
				let d = time.getDate();
				let h = time.getHours();
				let mi = time.getMinutes();
				let day = time.getDay();

				this.today = y + '年' + this.addTimes(m) + '月' + this.addTimes(d) + '日' + ' ' + this.week[day];
				this.today_year = y + '年';
				var date = this.addTimes(m) + '月' + this.addTimes(d) + '日';
				if (this.today_date != date) {
					this.today_date = date;
				}
				this.today_week = this.week[day]
				this.nowtime.hour = this.addTimes(h);
				this.nowtime.minute = this.addTimes(mi);
				console.log(this.today);

				// 以下是新增的部分，用于更新swipeList中的istargetDate
				let formattedToday = `${y}-${this.addTimes(m)}-${this.addTimes(d)}`; // YYYY-MM-DD格式的今天日期
				console.log('formattedToday', formattedToday)
				let todayDate = new Date(formattedToday);
				console.log('todayDate', todayDate)
				let todayDay = todayDate.getDay(); // 获取今天是星期几，0代表星期日，1代表星期一，以此类推
				console.log('todayDay', todayDay)
				// 星期数组，用于匹配周期性目标的checkbox2
				const weekDays = ["每周日", "每周一", "每周二", "每周三", "每周四", "每周五", "每周六"];

				console.log('this.swipeList', this.swipeList)
				// 遍历swipeList
				for (let item of this.swipeList) {
					// console.log('item', item)
					item.istargetDate = false; // 默认设置为false
					// 如果是具有确定开始和结束日期的目标
					if (item.timetype0) {
						console.log('这是范围性目标', item.title)
						// console.log('item.starttime',item.starttime)
						let startDate = new Date(item.starttime);
						console.log('startDate',startDate)
						// console.log('item.endttime',item.endttime)
						let endDate = new Date(item.endttime);
						console.log('endDate',endDate)
						//这是固定的8点
						console.log('todayDate',todayDate)
						
						let currenTime = new Date();
						console.log('currenTime',currenTime)
						// 检查今天的日期是否在开始和结束日期之间
						if ((item.isdone == false) && (currenTime >= startDate && currenTime <= endDate)) {
							item.istargetDate = true
							item.isNotStart = false;
							item.isoverdue = false;
							// console.log('范围性目标' + item.title + 'istargetDate已经设置为true')
						} else if ((item.isdone == false) && currenTime > endDate) {
							item.isoverdue = true;
							item.isNotStart = false;
							item.istargetDate = false;
							// console.log('范围性目标' + item.title + 'isoverdue已经设置为true')
						} else if ((item.isdone == false) && currenTime < startDate) {
							item.isNotStart = true;
							item.isoverdue = false;
							item.istargetDate = false;
							// console.log('范围性目标' + item.isNotStart + 'isNotStart已经设置为true')
						}
					}

					// 如果是周期性目标
					if (item.timetype1) {
						// console.log('这是周期性目标', item.title)
						let currentWeek = this.getWeekNumber(new Date());
						// console.log('当前周', currentWeek)
						// 如果已经询问过用户，用户确认下周继续则跳过
						if (item.askedForNextWeek && item.weeklyDoneWeek === currentWeek) continue;
						let todayDay = (new Date()).getDay();
						let todayWeekDay = weekDays[todayDay];
						//重设isToday的状态
						this.resetDailyStatus(item);
						// 检查今天是否在目标的周期内
						if (item.checkbox2.includes(weekDays[todayDay]) && (item
								.isdone == false) && ((item
								.isTodayDone == false))) {
							// 如果这是新的一周，重置weeklyDone和askedForNextWeek
							if (item.weeklyDoneWeek !== currentWeek) {
								// 如果上周没有达到预定次数，提示用户本周未完成
								if (item.checkbox2.length !== item.weeklyDone.length) {
									console.log(`目标"${item.title}"上周未完成。`);
									let content = '目标' + item.title + '上周未完成'
									this.judgeGoOn(item, content)
								} else if (item.checkbox2.length === item.weeklyDone.length && !item.askedForNextWeek) {
									// 如果上周达到预定次数且未询问过用户是否继续
									console.log(`目标"${item.title}"上周已完成。`);
									let content = '目标' + item.title + '上周已完成'
									// 记录完成情况
									if (!item.completedWeeks) {
										item.completedWeeks = [];
									}
									item.completedWeeks.push({
										week: currentWeek - 1,
										days: item.weeklyDone.slice(), //浅拷贝
									}); // 记录上周完成的周数和天数
									this.judgeGoOn(item, content)
								}
								//重置状态
								item.weeklyDone = [];
								item.askedForNextWeek = false;
								item.weeklyDoneWeek = currentWeek;
								item.currentWeekDone = false; // 新的一周开始，重置当前周完成状态
								console.log('新的一周，已经重置')
							}
							item.istargetDate = true;
							// console.log('周期性istargetDate已经设置为true')



						}
					}
				}

			},
			resetDailyStatus(item) {
			    const today = new Date().toDateString(); // 获取当前日期，忽略时间部分
				// const today = new Date(2024, 2, 23).toDateString();//指定一个日期来测试
			    const lastCheckDate = uni.getStorageSync('lastCheckDate'); // 获取上次检查日期
			console.log("上次完成的日期：",lastCheckDate)
			console.log("今天：",today)
			    if (lastCheckDate != today) {
			        // 如果不是同一天，则重置isTodayDone为false
					console.log('新的一天了，isTodayDone要设为false')
			            item.isTodayDone = false;
			        // 更新lastCheckDate
					
			      
			    }
			},
			judgeGoOn(item, content) {
				var that = this
				uni.showModal({
					title: content,
					content: `是否本周继续执行该目标？`,
					success: function(res) {
						if (res.confirm) {
							console.log('用户点击确定本周继续执行该目标');
							item.currentWeekDone = false; // 重置当前周完成状态
							item.isdone = false; // 目标继续，未完成
							item.askedForNextWeek = true;
						} else if (res.cancel) {
							console.log('用户点击取消');
							item.currentWeekDone = true; // 标记当前周完成
							item.isdone = true; // 目标不再继续，完成
							console.log(
								`完成的周数：${item.completedWeeks.length}周，执行日：${item.completedWeeks.map(w => `第${w.week}周: ${w.days.join(", ")}`).join("; ")}`
							);
							let obj = {
								doneWeekCount: item.completedWeeks.length,
								completedWeeks: item.completedWeeks,
							}
							uni.setStorage({
								key: 'doneWeekMessage',
								data: obj,
								success() {
									console.log('上一周的娱乐目标完成情况存储成功')
								}
							})

						}
					}
				})
			},
			handleClick(id, gridindex) {
				if (this.clickTimeout) {
					// 取消单击延迟任务，并执行双击操作
					clearTimeout(this.clickTimeout)
					this.clickTimeout = null
					this.minusBadge(id, gridindex)
				} else {
					// 设置单击延迟任务
					this.clickTimeout = setTimeout(() => {
						this.clickTimeout = null
						this.plusOne(id, gridindex)
					}, this.doubleClickDelay)
				}
			},
			plusOne(listID, listIndex) {
				console.log(listID);
				console.log('单击了第', listIndex, '个宫格');
				this.Two_dimensional_array[listID].list[listIndex].badge++;
			},
			//2023-9-10添加
			minusBadge(listID, listIndex) {
				console.log(listID);
				console.log('双击了第', listIndex, '个宫格');
				this.Two_dimensional_array[listID].list[listIndex].badge && this
					.Two_dimensional_array[listID].list[listIndex].badge--;
			},
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

			swipeClick(e, index, item) {
				item.pop_flag = false;
				if (e.text === '置顶') {
					// uni.showModal({
					// 	title: '提示',
					// 	content: '是否置顶',
					// 	success: res => {
					// 		if (res.confirm) {
					// 			console.log(this.swipeList)
					// 			console.log(index);
					// 			this.swipeList.unshift(this.swipeList[index]); //把查找到的数据复制添加到数组的首位
					// 			console.log('置顶后删除前', this.swipeList)
					// 			console.log(index);
					// 			this.swipeList.splice(index + 1, 1);
					// 			console.log('置顶后删除后', this.swipeList)
					// 		} else if (res.cancel) {
					// 			console.log('用户点击取消');
					// 		}
					// 	}
					// });

					console.log(this.swipeList)
					console.log(index);
					this.swipeList.unshift(this.swipeList[index]); //把查找到的数据复制添加到数组的首位
					console.log('置顶后删除前', this.swipeList)
					console.log(index);
					this.swipeList.splice(index + 1, 1);
					console.log('置顶后删除后', this.swipeList);
					uni.showToast({
						title: "置顶成功",
						icon: 'success',
						success: function(res) {

						},
						fail: function(res) {

						},
					});
					this.savePlayGoalList();



				} else if (e.text === '完成') {
					//确保在执行时间内
					if (item.istargetDate) {
						if (this.swipeList[index].timetype0) {
							this.swipeList[index].isdone = true;
							this.swipeList[index].istargetDate = false;
							// 成功弹窗
							this.messageToggle("success");
							var that = this;
							//2023-10-21添加
							this.saveGoalSuccess(item);
							

						} else if (this.swipeList[index].timetype1) {
							//如果是周期类型
							this.swipeList[index].istargetDate = false;
							this.swipeList[index].isTodayDone = true;
							const today = new Date().toDateString()
							let todayDay = (new Date()).getDay();
							//记录今天已经做了
							uni.setStorageSync('lastCheckDate',today);
							const weekDays = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
							let todayWeekDay = weekDays[todayDay];
							// if (!item.weeklyDone.includes(todayWeekDay)) 
							item.weeklyDone.push(todayWeekDay);
							console.log('item.weeklyDone', item.weeklyDone)
							this.saveGoalSuccess(item);
							// 如果这周的目标都完成了
							if (item.checkbox2.length === item.weeklyDone.length) {
								item.currentWeekDone = true;

								var that = this
								uni.showModal({
									title: '目标' + item.title + '提醒',
									content: `是否在下一周继续执行该目标？`,
									success: function(res) {
										if (res.confirm) {
											console.log('用户点击确定下一周继续执行该目标');
											item.isdone = false; //目标未结束，继续
											item.askedForNextWeek = true;
											// that.saveGoalSuccess(item);
										} else if (res.cancel) {
											console.log('用户点击取消');
											item.isdone = true; //目标结束
											console.log('that.swipeList[index].isdone:', that.swipeList[index]
												.isdone)
											console.log('item.isdone', item.isdone)
											item.askedForNextWeek = false;
											let currentWeek = that.getWeekNumber(new Date());
											item.completedWeeks.push({
												week: currentWeek,
												days: item.weeklyDone.slice(), //浅拷贝
											});
											console.log('item.completedWeeks', item.completedWeeks)
											console.log(
												`完成的周数：${item.completedWeeks.length}周，执行日：${item.completedWeeks.map(w => `第${w.week}周: ${w.days.join(", ")}`).join("; ")}`
											);
											let weekDoneobj = {
												title: item.title,
												doneWeekCount: item.completedWeeks.length,
												completedWeeks: item.completedWeeks,
											}
											uni.setStorage({
												key: 'doneWeekMessage',
												data: weekDoneobj,
												success() {
													console.log('本周的娱乐目标完成情况存储成功')
												}
											})
											//2023-10-21添加
											//存储成功数组，让self-record接收到
											that.saveGoalSuccess(item);

										}
									}
								})
								console.log("提示用户是否下周还要执行该目标");
							}
							//2023-10-21添加结束

						}
					}else{
						uni.showModal({
							title:'注意',
							content:'今日不是执行时间'
						});
					}
				} else if (e.text === '删除') {
					var that = this
					uni.showModal({
						title: '提示',
						content: '是否删除',
						success: res => {
							if (res.confirm) {
								that.swipeList.splice(index, 1);

								that.savePlayGoalList();
							} else if (res.cancel) {
								console.log('用户点击取消');
							}
						}
					});
				}
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
											let currentWeek = that.getWeekNumber(new Date());
											
											let obj = {
												id: new Date().getTime(),
												options: [{
														text: '删除',
														style: {
															backgroundColor: 'rgb(255,58,49)'
														}
													},

													{
														text: '完成',
														style: {
															backgroundColor: 'rgb(254,156,1)'
														}
													}, {
														text: '置顶'
													}
												],
												title: data.title,
												content: data.content,
												timetype0: data.timetype0,
												timetype1: data.timetype1,
												starttime: data.startDate,
												endttime: data.endDate,
												checkbox2: data.checkbox2,
												isdone: false, //整个目标是否结束
												isTodayDone: false, //今日是否已做
												currentWeekDone: false, //当前周是否完成
												istargetDate: false,
												isoverdue: false,
												isNotStart: false,
												weeklyDone: [],//当前周有具体几天是做的
												askedForNextWeek: false,
												weeklyDoneWeek: currentWeek,//当前要做的周
												completedWeeks: [], //完成的周数以及内容
												pop_flag: false,
											}
											that.swipeList.push(obj);
											console.log(obj);
											// 上一句不加分号的话下面这个就执行不了
											console.log('查看数组：', that.swipeList);
											that.savePlayGoalList();
											console.log('play页面成功接收到add_playgoal的数据');
											that.reload();
										},

									}
								});

							} else if (res.cancel) {
								console.log('用户点击取消')
							}
						},

					})

				} else if (e.index == 2) {

					uni.navigateTo({
						url: '/pages/self-manage/play/CountEventTimes'
					})


				}
				// 关闭高亮显示
				this.fabcontent[e.index].active = !e.item.active


			},
			saveGoalSuccess(item) {
					var that = this
				const actionDone = uni.getStorageSync('playActionDone');
				console.log('接受到playActionDone了吗',actionDone)
				        if (actionDone) {
				            // 执行需要的动作
				            	that.playGoalSuccessList=[];
				            	console.log('that.playGoalSuccessList是否置空：',that.playGoalSuccessList);
								// 执行完动作后，清除'playActionDone'标记
								uni.removeStorageSync('playActionDone');
				
				        }
				let obj = {
					id: that.playGoalSuccessList.length + 1,
					title: item.title,
					timetype0: item.timetype0,
					timetype1: item.timetype1,
					isdone: item.isdone,
					content: item.content,

				}
				console.log(obj);

				that.playGoalSuccessList.push(obj);
				that.savePlayGoalList();

				uni.setStorage({ //存入Storage
					key: 'playGoalSuccess', //自己取个名字
					data: { //存的数据可以是很多条

						playGoalSuccessList:that.playGoalSuccessList


					},

					success() {
						console.log('playGoalSuccess储存成功');
						console.log('playGoalSuccess内容：',that.playGoalSuccessList)
					}
				});
				
			},
			savePlayGoalList() {
				var that = this
				console.log("当前playGoal：", that.swipeList)
				uni.setStorage({ //存入Storage
					key: 'playGoalDATA', //自己取个名字
					data: { //存的数据可以是很多条

						PlayGoalList: that.swipeList


					},

					success() {
						console.log('playGoalDATA储存成功');
					}
				});
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
					this.$refs.inputModal.close();


			},
			savePlayEvent() {
				var that = this;
				uni.setStorage({
					key: 'update_playEvent',
					data: that.Two_dimensional_array,
					success: function() {
						console.log('娱乐事件的二维数组存储成功！');
					}
				})
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

							that.savePlayEvent();

							let Indexobj = {
								ListID: listID,
								ListIndex: listIndex,
								ListImage: that.Two_dimensional_array[listID].list[listIndex].url,
							};

							uni.setStorage({ //存入Storage
								key: 'CurrentTitle', //自己取个名字
								data: { //存的数据可以是很多条
									TitleName: that.Two_dimensional_array[listID].list[listIndex].text,
									iconUrl: that.Two_dimensional_array[listID].list[listIndex].url,

								},

								success() {
									console.log('CurrentTitle储存成功');
								}
							});


							uni.navigateTo({
								url: '/pages/self-manage/play/EventFormRecord',
								success: (res) => {
									// 跳转成功后，触发事件'GridIndexEmit', 并可携带数据（即第一个参数是事件名，第二个参数是数据包）
									res.eventChannel.emit('GridIndexEmit', {
										data: Indexobj
									})
								},
								events: {
									aditorEvent(data) {
										let obj = {
											title: data.title,
											Content_value: data.Content_value,
											url: data.iconUrl
										}
										that.testList.push(obj);
										// 改变后的名称覆盖过去
										that.Two_dimensional_array[listID].list[listIndex].text = data
											.title;
										that.Two_dimensional_array[listID].list[listIndex].url = data
											.iconUrl;

										that.savePlayEvent();
										console.log(obj);
										// 上一句不加分号的话下面这个就执行不了
										console.log('查看数组：', that.Two_dimensional_array[listID].list[
											listIndex]);
										console.log('play页面成功接收到EventFormRecord的数据');

									},

								},


							});

						} else if (res.cancel) {
							console.log('用户点击取消')
						}
					},

				})
			},



			add() {
				console.log('未添加前二维数组长度' + this.Two_dimensional_array.length);
				var i = 0;
				for (; i < this.Two_dimensional_array.length; i++) {
					if (this.Two_dimensional_array[i].isfull == false) {
						break;
					} else {
						console.log('当前的i' + i + '不是')
					}
				}

				console.log('当前跳出时i=' + i)

				let Length = this.Two_dimensional_array.length;
				if (i == Length) {
					this.Two_dimensional_array.push({

						id: Length,
						isfull: false,
						list: []


					})
				}
				console.log('此时二维数组长度' + this.Two_dimensional_array.length);
				let Two_dimensional_arrayLength = this.Two_dimensional_array.length;
				console.log('未添加前最新二维数组的一维数组长度' + this.Two_dimensional_array[Two_dimensional_arrayLength - 1].list.length);
				let ListLength = this.Two_dimensional_array[this.Two_dimensional_array.length - 1].list.length;

				for (var i2 = 0; i2 < Two_dimensional_arrayLength; i2++) {
					let eachLength = this.Two_dimensional_array[i2].list.length;
					if (eachLength < 9) {
						// 找到第一个长度为9的数组
						console.log('找到小于9的i：' + i2)
						this.Two_dimensional_array[i2].list.push({

							url: `/static/c${Math.floor(Math.random() * (12 - 1 + 1)) + 1}.png`,

							// url: `/static/c6.png`,
							text: this.value,
							badge: '0',
							type: "success",


						});

						console.log('添加后最新二维数组的一维数组长度' + this.Two_dimensional_array[Two_dimensional_arrayLength - 1].list
							.length);

						if (this.Two_dimensional_array[i2].list.length == 9) {
							this.Two_dimensional_array[i2].isfull = true;
						}
						console.log('当前第' + i2 + '个数组的isfull为：' + this.Two_dimensional_array[i2].isfull)
						// 一旦找到一个数组了，那就跳出for循环
						// i=Two_dimensional_arrayLength;
						this.savePlayEvent();
						break;



					}

				}



			},
			del(index, listindex) {
				console.log('当前长按了第' + index + '个数组的第' + listindex + '个宫格')
				var that = this;
				uni.showModal({
					title: '提示',
					content: `您确认要删除吗？`,
					success: function(res) {
						if (res.confirm) {

							console.log("(下标从0开始)删除第" + index + "个")
							that.Two_dimensional_array[index].list.splice(listindex, 1);
							that.Two_dimensional_array[index].isfull = false;
							that.savePlayEvent();
							// that.dynamicList.splice(index, 1)


						} else if (res.cancel) {
							console.log('用户点击取消')
						}
					},

				})
			},
			popup(index) {
				this.swipeList.forEach(v => {
					if (v.id != this.swipeList[index].id) {
						v.pop_flag = false;
					}
				})
				if (this.swipeList[index].pop_flag) {
					this.swipeList[index].pop_flag = false
				} else {
					this.swipeList[index].pop_flag = true;
				}
			},
			closePop() {
				this.swipeList.forEach(v => {
					v.pop_flag = false;
				})
			}
		}
	}
</script>


<style lang="scss">
	.header {
		display: flex;
		text-align: left;
		font-size: 23px;
		font-weight: 800;
		margin: 25px 0 0 30px;
	}

	.target_header {
		display: flex;
		text-align: left;
		font-size: 23px;
		font-weight: 800;
		margin: 5px 0 0 30px;
	}

	.header-text {
		background: -webkit-linear-gradient(top, #000000, #aeaeae);
		/*设置线性渐变*/
		/*为了支持更多的浏览器*/
		-webkit-background-clip: text;
		/*背景被裁剪到文字*/
		-webkit-text-fill-color: transparent;
		/*设置文字的填充颜色*/
	}

	.wenhao {
		font-size: 15px;
		font-weight: 800;
		font-family: 'Courier New', Courier, monospace;
		width: 20px;
		height: 20px;
		background-color: #009688;
		color: #f6f6f6;
		border-radius: 20px 100px 80px 120px;
		margin: 20px 0 10px 8px;
		text-align: center;
		align-items: center;
		display: flex;
		justify-content: center;
	}

	.image {
		width: 25px;
		height: 25px;
	}

	.doneimage {
		width: 80px;
		height: 80px;
		margin: 30px auto;
		filter: alpha(opacity=80);
		-moz-opacity: 0.85;
		-khtml-opacity: 0.85;
		opacity: 0.85;
		/* 设置左右外边距为auto，实现水平居中 */
		// text-align: center;
		// /* 设置文本居中，以修复可能的对齐问题 */


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
		top: -5px;
		right: 15px;
	}

	.swiper {
		margin-top: 20px;
		height: 380px;
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
	.target-box {
		margin: 20px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.content-box {
		position: relative;
		box-shadow: -1px 1px 5px 1px rgba(0, 0, 0, 0.1), -1px 2px 1px 0 rgba(255, 255, 255) inset;
		border-radius: 10px;
		display: flex;
		flex-direction: column;
		width: 88%;
		margin: 10px 0;
	}

	.targetDone {
		position: relative;
		box-shadow: -1px 1px 5px 1px rgba(0, 0, 0, 0.1), -1px 2px 1px 0 rgba(255, 255, 255) inset;
		border-radius: 10px;
		display: flex;
		flex-direction: column;
		width: 88%;
		margin: 10px 0;
		color: #989898;
	}

	.content-title {
		width: 90%;
		font-size: 20px;
		font-weight: 700;
		margin: 15px 0 10px 20px;
		display: flex;
		justify-content: space-between;
		border-width: 0 0 2px 0;
		border-style: dashed;
		border-color: #989898;
	}

	.pop_select {
		display: flex;
		flex-direction: column;
		justify-content: center;
		// margin-right: -15px;
	}

	.content {
		// background-color: rebeccapurple;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		justify-content: flex-start;
		text-align: left;
		width: 90%;
		margin: 0 0 10px 20px;
		padding-right: 20px;
	}

	.content-time {
		// 跟外边的间距上、左右、下
		display: flex;
		/* flex-direction: column; */
		font-size: 13px;
		align-items: flex-start;
	}

	.content-cycle {
		display: flex;
		font-size: 13px;
		// margin: 5rpx 30rpx 0rpx;
		// text-align: center;
		justify-content: flex-start;
		align-items: center;
	}
	.content-content{
		display: flex;
		font-size: 13px;
		justify-content: flex-start;
		text-align: left;
	}
	.more_list {
		z-index: 10;
		position: absolute;
		right: -15px;
		top: 52px;
		background: white;
		border-radius: 4px;
		width: 80px;
		box-shadow: 0px 0px 4px rgba(30, 30, 30, 0.1);
		padding: 8px 8px 2px 8px;
		border: 1px solid #ccc;
	}

	.more_list_item {
		color: white;
		font-size: 14px;
		z-index: 3;
		padding: -5px 0;
		border: 1px solid #ccc;
		border-radius: 4px;
		background-color: #009688;
		// box-shadow: -1px 1px 5px 1px rgba(0, 0, 0, 0.1), -1px 2px 1px 0 rgba(255, 255, 255) inset;
		text-align: center;
		display: flex;
		justify-content: center;
		align-items: center;
		margin-bottom: 8px;
		height: 40px;
	}

	.test {
		// background-color: #18a0c2;
		margin: 15px;
	}

	.showDown {
		position: absolute;
		justify-content: flex-end;
		margin-left: auto;
		width: 100px;
		top: -50px;
		left: -40px;
		// background-color:crimson;
	}

	.warp {
		z-index: 100;
	}

	// .custom-modal{
	// 	//提示框圆角设计
	// 	border-radius: 30px;
	// }
	.br {
		/*留空*/
		height: 200px;
	}
</style>