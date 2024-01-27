<template>
	<view class="content">
		<view class="todo-header">
			<!-- 状态栏左侧 -->
			<view class="todo-header_left">
				<!-- <text class="active-text">{{ text }}</text>
				<text>{{ listData.length }}条</text> -->
				<view style="font-size: 20px; font-weight: 900px; margin: 5px; ">Today :</view>
				<view style="font-size: 13px; font-color: #ccc; margin: 8px;">{{today_year}}年{{today_day}}, {{todayWeekday}}</view>
			</view>
			<!-- 状态栏右侧 -->
			<view class="todo-header_right">
				<view class="todo-header_right-item" @tap="toggleOptions">
					<text class="button-text">{{ buttonText1 }} × {{ listData.length }}条 <text class="button-icon">﹀</text></text>
				</view>

				<!-- 选项列表 -->
				<view class="options" v-show="optionsVisible">
					<view class="option-item" v-for="(item, index) in tabList" :key="index"
						@click="selectOption(item,index)" :style="{'backgroundColor': option_color[index]}">{{ item }}</view>

				</view>
			</view>
		</view>
		<!-- 没有数据的状态 -->
		<view v-if="listData.length === 0" class="default">

			<view class="default-info">

				<view class="default-info__text">请点击下方按钮创建事项</view>
			</view>
		</view>

		<view class="todo-content-outside">
			<view class="todo-content" :class="{'today': (item.year==today_year && item.day==today_day), 'first': index==0}" style="z-index: 0" v-for="(item, index) in listData" :key="index">
				<view class="todo-time" v-if="item.flag_day" :class="{ 'todo-time_today': (item.year==today_year && item.day==today_day)}">
					<view class="todo-time_year" v-if="item.flag_year">{{item.year}}</view>
					<view class="todo-time_day_outside">
						<view class="todo-time_day">
							<view>{{item.day}}</view>
							<view>{{item.weekday}}</view>
						</view>
						<uni-icons type="smallcircle" size="20" color="#cccccc" :color="{'#518268':(item.year==today_year && item.day==today_day)}" class="todo-time_icon"></uni-icons>
					</view>
				</view>
				<view class="todo-list-outside">
					<view class="todo-list_time" >
						{{item.time}}
					</view>
					<view class="item-head" :style="{backgroundColor:item.color,color:item.color }" >1</view>
					<view class="todo-list" :class="{ 'todo--finish': item.select }"
					@click="childItem(item, index)">
						<view class="todo-list_checkbox">
							<view class="checkbox"></view>
						</view>
						<view>
							<view class="todo-list_title">{{ item.title }}</view>
							<view class="todo-list_content" v-if="item.mark">
								<view class="todo-list_content_inside">
									<uni-icons type="compose" size="17" color="#7e7e7e"></uni-icons>
									<view>{{ item.mark }}</view>
								</view>
								<view class="todo-list_content_inside" v-if="item.cycletime">
									<uni-icons type="refreshempty" size="17" color="#7e7e7e"></uni-icons>
									<view>{{item.cycletime}}</view>
								</view>
							</view>	
						</view>
						<!-- 新增删除按钮 -->
					</view>
					<uni-icons type="closeempty" size="13" color="#cccccc" class="delete-btn" @click="deleteEvent(item, index)"></uni-icons>
				
				</view>
			</view>
		</view>

		<!-- 字体图标 -->
		<view class="create-todo" @click="creat">
			<text class="iconfont iconhao1" :class="{ 'create-todo-active': tetxShow }">+</text>
		</view>
		<!-- 定位到“今天” -->
		<view v-if="today_button_flag" class="today_button" @click="goToToday">
			<text>今</text>
		</view>
		<!--日期时间选择器-->
		<SimpleDateTimePicker ref="myPicker" @submit="handleSubmit_dayAndTime" :start-year="2023" :end-year="2030" />
		
		<!-- 输入框 -->
		<view class="create-content" style="z-index: 99" v-if="activeInput" :class="{ 'create-show': tetxShow }">
			<view class="create-content-box">
				<view class="create-header">
					<view class="create-header_left">
						<uni-icons type="closeempty" size="28" @click="close()"></uni-icons>
						<text style="font-size: 17px; font-weight: 600;">新建事项</text>
					</view>
					<view class="create-header_right">
						<uni-icons type="checkmarkempty" size="28" @click="submitInput"></uni-icons>
					</view>
				</view>
				<view class="create-body">
					<view class="create-input_outside">
						<uni-icons type="font" size="25"></uni-icons>
						<view class="create-input">
							<input type="text" v-model="InputValue" placeholder="标题" />
						</view>
					</view>
					
					<!-- 新增备注输入框 -->
					<view class="create-input_outside">
						<uni-icons type="compose" size="25"></uni-icons>
						<view class="create-input">
							<input type="text" v-model="remark" placeholder="备注" />
						</view>
					</view>
					
					<!-- 类型选择器 -->
					<view class="create-select_outside">
						<uni-icons type="color" size="25"></uni-icons>
						<picker class="event-type-selector" :value="eventTypeIndex" :range="eventTypeNames" mode="selector" @change="handleEventTypeChange">
							<view>{{type}}</view>
							<uni-icons type="right" size="23" color="#ccc"></uni-icons>
						</picker>
					</view>
					<view class="create-select_outside">
						<uni-icons type="calendar" size="25"></uni-icons>
						<view class="allday">
							<text>全天</text>
							<switch color="#009688" class="allday_switch" @change="Allday"/>
						</view>
					</view>
					<!-- 截止时间选择 -->
					<view class="create_time-picker_outside">
						<text>时间</text>
						<picker v-if="allday_flag" mode="date" :value="selectedDate" @change="handleSubmit_day" class="create_time-picker">
							<view>{{day}}</view>
							<uni-icons type="right" size="23" color="#ccc"></uni-icons>
						</picker>
						<view v-if="!allday_flag" class="create_time-picker" @click="openDatetimePicker">
							<view>{{ buttonText }}</view>
							<uni-icons type="right" size="23" color="#ccc"></uni-icons>
						</view>
					</view>
					<view class="create-cycle_outside">
						<uni-icons type="loop" size="25"></uni-icons>
						<view class="create-cycle">
							<text>重复</text>
							<radio value="cycle" color="#009688" :checked="cycle" @click="cycleSwitch" />
						</view>
						
					</view>
					
					<!-- 周期时间选择器 -->
					<view v-if="cycle" class="cycle-seclct_outside">
						<picker mode="time" :value="time" @change="onChange">
							<view>
								<text>{{time }}</text>
							</view>
						</picker>
					
						<!-- 多选，循环遍历填充数据 -->
						<view class="list-box">
							<view v-for="(item,index) in list1" :key="index" @click="choice(index)"
								:class="[item.selected?'selde':'noselde']">
								{{item.selected?item.title:item.title}}
							</view>
						</view>
					</view>
					
				</view>
				
			</view>
		</view>


		<!-- 修改数据的弹窗 -->
		<view v-if="show" class="popupWindow">
			<text>时间:</text>
			<input class="input" type="text" v-model="Update.time" placeholder="请输入时间" />
			<text>地点:</text>
			<input class="input" type="text" v-model="Update.place" placeholder="请输入地点" />
			<text>事件:</text>
			<input class="input" type="text" v-model="Update.event" placeholder="请输入事件" />
			<button type="primary" @tap="confirm">确认</button>
		</view>
	</view>

	<view class="br"></view>
</template>

<script>
	import SimpleDateTimePicker from "./buuug7-simple-datetime-picker.vue";

	const EVENT_TYPES = [{
			name: '作业',
			color: '#1a7482'
		},
		{
			name: '考试',
			color: '#66c0a4'

		},
		{
			name: '运动',
			color: '#e95d54'
		},
		{
			name: '娱乐',
			color: '#f9cfc8'
		},
		{
			name: '社会工作',
			color: '#f9e9a0'
		}
	];
	export default {
		components: {
			SimpleDateTimePicker,
		},
		data() {
			return {
				option_color: ['#c2efee', '#7f9d8b', '#1a7482', '#66c0a4', '#e95d54', '#f9cfc8', '#f9e9a0'],
				option: 'deadline', // 默认选项为截止日期
				activeInput: false,
				tabIndex: 0,
				tetxShow: false,
				text: "全部",
				tabList: ['全部', '今天', '作业', '考试', '运动', '娱乐', '社会工作'],
				today_button_flag: false,
				type_range: [
					{ value: 0, text: "作业" },
					{ value: 1, text: "考试" },
					{ value: 2, text: "运动" },
					{ value: 3, text: "娱乐" },
					{ value: 4, text: "社会工作" },
				],
				//day：选择的截止日期(无时间)，date：选择的截止日期时间
				list: [{
						year:'2024',
						date:'',
						title: '学习java',
						mark: '图书馆',
						select: true,
						color: '#1a7482',
						cycletime: '周一, 周三, 周五',
						cycles: ["周一", "周三", "周五"],
						time: '09:00',
						day:'01月26日',
						weekday: '周五',
						flag_day: false,	//日期是否和前一个不一样
						flag_year: false,	//年份是否和前一个不一样
					},
					{
						year:'2024',
						title: '看电影',
						mark: '电影院',
						select: true,
						color: '#f9cfc8',
						date: '2024-01-24 13:00',
						day:'01月24日',
						time: '13:00',
						weekday: '周三',
						flag_day: false,
						flag_year: false,
					},
					{
						year:'2024',
						date:'2024-02-10 19:30',
						title: '打篮球',
						mark: '一期操场',
						select: false,
						color: '#e95d54',
						// cycletime: '每日',
						// cycles: ["每日"],
						time: '19:30',
						day: '02月10日',
						weekday: '周二',
						flag_day: false,
						flag_year: false,
					},
					{
						year:'2024',
						date:'',
						title: '义工活动',
						mark: '养老院',
						select: false,
						color: '#f9e9a0',
						cycletime: '周六, 周日',
						cycles: ["周六", "周日"],
						time: '09:00',
						day: '01月27日',
						weekday: '周六',
						flag_day: false,
						flag_year: false,
					},
					{
						year:'2024',
						title: '高数考试',
						mark: '学武楼',
						date: '2024-01-22 10:30',
						select: false,
						color: '#66c0a4',
						day: '01月22日',
						time:'10:30',
						weekday:'周一',
						flag_day: false,
						flag_year: false,
					},
					{
						year:'2024',
						title: '散步',
						mark: '溜公园儿',
						date: '2024-01-28 19:00',
						select: false,
						color: '#f9cfc8',
						day: '01月28日',
						time:'19:00',
						weekday:'周日',
						flag_day: false,
						flag_year: false,
					},
					{
						year:'2023',
						title: '计组作业',
						mark: '',
						date: '2023-12-31 10:00',
						select: false,
						color: '#1a7482',
						day: '12月31日',
						time:'10:00',
						weekday:'周日',
						flag_day: false,
						flag_year: false,
					}
				],
				//表单输入
				InputValue: '',
				remark: '',
				day: "",
				// 选择的日期，格式为yyyy-MM-dd HH:mm
				selectedDate: "",
				time: "",
				// 时间选择文本值
				buttonText: "",
				weekday: "",
				//定义前端选中的值
				selectList: "",
				year: "",
				type: "类型",
				
				//给标签赋值
				list1: [
					{
						selected: false,
						title: '一'
					},
					{
						selected: false,
						title: '二'
					}, {
						selected: false,
						title: '三'
					}, {
						selected: false,
						title: '四'
					},
					{
						selected: false,
						title: '五',

					},
					{
						selected: false,
						title: '六'
					},
					{
						selected: false,
						title: '日'
					}
				],
				selectId: [], //这里面是‘一’‘二’...‘日’这样的形式

				eventTypeIndex: -1,
				eventTypeNames: EVENT_TYPES.map(item => item.name),
				eventTypeColors: EVENT_TYPES.map(item => item.color),
				percent: 50,
				isAlertShown: false, // 新的属性：弹窗是否已经弹出
				optionsVisible: false, // 选项列表的显示状态
				allday_flag: false,
				buttonText1: "全部",
				selectedOption: "全部",
				cycle: false,
				showOptions: false, // 是否显示选项列表
				today_year:'',
				today_day:'',
				nowtime: '',
				todayWeekday:'',
				listAfterSort:[], //排序后的列表
			};
		},

		onLoad() {
			this.listAfterSort=this.sort_list();
			//this.getList()
		},
		onReady() {
			var that=this;
			setTimeout(()=>{
				that.goToToday()
			},300);		
		},
		//滚动监听生命周期函数，判断“今天”是否超出可视区域
		onPageScroll:function(e){
			var that=this;
			let query = uni.createSelectorQuery();
			let wh = uni.getSystemInfoSync().windowHeight;//可视区域高
			query.select('.today').boundingClientRect(rect => {
				let top = rect.top;//距离顶部高度
				let bottom = rect.bottom;
				let vh = rect.height;//元素高度
				if (top < 0 || bottom > (vh+wh)) {
					that.today_button_flag = true;
				}
				else{
					that.today_button_flag = false;
				}
			})
			.exec();
		},
		computed: {
			listData() {
				var that=this;
				let list = JSON.parse(JSON.stringify(that.listAfterSort)); //拷贝对象
				console.log(list);
				const date = new Date();
				const year = date.getFullYear();
				const month = date.getMonth() + 1;
				const day = date.getDate();
				const hour = date.getHours();
				const minute = date.getMinutes();
				const today = (month < 10 ? '0' + month : month) + '月' + (day < 10 ? '0' + day : day) + '日';
				const todayWeekday = '周' + ['日', '一', '二', '三', '四', '五', '六'][new Date().getDay()];
				const nowtime_day = year + '-' + (month < 10 ? '0' + month : month) + '-' + (day < 10 ? '0' + day : day)
				const time = (hour < 10 ? '0' + hour : hour) + ':' + (minute < 10 ? '0' + minute : minute)
				const nowtime = nowtime_day + ' ' + time;
				that.today_year=year;
				that.today_day=today;
				that.nowtime = nowtime;
				//对新建表项的数据进行修改，使得在用户仅填写标题时这些数据不会为空
				that.buttonText = nowtime;
				that.selectedDate = nowtime;
				that.day = today;
				that.year = `${year}年`;
				that.weekday = todayWeekday;
				that.time = time;
				that.todayWeekday = todayWeekday
				
				//点击全部
				if (this.tabIndex == 0) {
					let newList = JSON.parse(JSON.stringify(list));
					newList = that.judge_year_day(newList);
					console.log("现在的表：",newList);
					return newList;
				} else if (this.tabIndex == 2) {
					let newList = [];
					list.forEach(v => {
						if (v.color == '#1a7482') {
							newList.push(v);
						}
					});
					that.nowlist = JSON.parse(JSON.stringify(newList));
					newList = that.judge_year_day(newList);
					console.log(newList);
					return newList;
				} else if (this.tabIndex == 3) {
					let newList = [];
					list.forEach(v => {
						if (v.color == '#66c0a4') {
							newList.push(v);
						}
					});
					that.nowlist = JSON.parse(JSON.stringify(newList));
					newList = that.judge_year_day(newList);
					console.log(newList);
					return newList;
				} else if (this.tabIndex == 4) {
					let newList = [];
					list.forEach(v => {
						if (v.color == '#e95d54') {
							newList.push(v);
						}
					});
					that.nowlist = JSON.parse(JSON.stringify(newList));
					newList = that.judge_year_day(newList);
					console.log(newList);
					return newList;
				} else if (this.tabIndex == 5) {
					let newList = [];
					list.forEach(v => {
						if (v.color == '#f9cfc8') {
							newList.push(v);
						}
					});
					that.nowlist = JSON.parse(JSON.stringify(newList));
					newList = that.judge_year_day(newList);
					console.log(newList);
					return newList;
				} else if (this.tabIndex == 6) {
					let newList = [];
					list.forEach(v => {
						if (v.color == '#f9e9a0') {

							newList.push(v);
						}
					});
					that.nowlist = JSON.parse(JSON.stringify(newList));
					newList = that.judge_year_day(newList);
					console.log(newList);
					return newList;
				} else if (this.tabIndex == 1) {
					let newList = [];
					list.forEach(v => {
						if (!v.cycles && v.year==year && v.day == today) {
							newList.push(v);
						}
						if (v.cycles && v.cycles.includes("每日") && v.year==year && v.day == today) {
							newList.push(v);
						}

						if (v.cycles && v.cycles.includes(todayWeekday) && v.year==year && v.day == today) {
							newList.push(v);
						}
					});
					that.nowlist = JSON.parse(JSON.stringify(newList));
					newList = that.judge_year_day(newList);
					console.log(newList);
					return newList;
				}
			}

		},
		methods: {
			async saveList() {
				await uni.setStorage({
					key: 'todolist',
					data: this.list
				})
			},
		    getList() {
				let res = uni.getStorageSync('todolist')
				console.log(res);
				if(res){
					this.list = res
				}
				
			},
			sort_list(){
				var that=this;
				let list = JSON.parse(JSON.stringify(that.list)); //拷贝对象
				let list_sort=[];	//排序数组
				let list_cycles=[]; //有周期的项的数组，待处理
				list.forEach(v => {
					if(!v.cycles||v.cycles.length==0){
						list_sort.push(v);
					}
					else{
						list_cycles.push(v);
					}
				})
				console.log(list_sort);
				list_sort.sort((a,b)=>{
					return (new Date(a.date)).getTime()-(new Date(b.date)).getTime()
				})
				var date1 = list_sort[0].date;
				var date2 = list_sort[list_sort.length-1].date;
				let i = new Date(date1).setHours(0,0,0,0);
				let last = new Date(date2).setHours(0,0,0,0) + 86400000 - 1000;
				for( i ; i <= last; i += 86400000){//一天的时间戳为86400秒
					var i_year = new Date(i).getFullYear();
					var i_month = new Date(i).getMonth() + 1;
					var i_day = new Date(i).getDate();
					var i_date = (i_month < 10 ? '0' + i_month : i_month) + '月' + (i_day < 10 ? '0' + i_day : i_day) + '日';
					var i_weekday = '周' + ['日', '一', '二', '三', '四', '五', '六'][new Date(i).getDay()];
					list_cycles.forEach(v=>{
						if(v.cycles.includes(i_weekday)||v.cycles.includes("每日")){
							let obj={
									year: i_year,
									//date:'01-27',
									title: v.title,
									mark: v.mark,
									select: v.select,
									color: v.color,
									cycletime: v.cycletime,
									cycles: v.cycles,
									time: v.time,
									day: i_date,
									date: i_year + '-' + (i_month < 10 ? '0' + i_month : i_month) + '-' + (i_day < 10 ? '0' + i_day : i_day) + ' ' + v.time,
									weekday: i_weekday,
									flag_day: false,
									flag_year: false,
							};
							if(!list_sort.includes(obj)){
								list_sort.push(obj);
							}
						}
					})
				}
				list_sort.sort((a,b)=>{
					return (new Date(a.date)).getTime()-(new Date(b.date)).getTime()
				})
				
				return list_sort;
			},
			judge_year_day(list){
				//判断每一项的年份、日期是否和前一项一样
				list[0].flag_day=true;
				list[0].flag_year=true;
				var i;
				for(i=1; i<list.length; i++){
					if(list[i].day!=list[i-1].day){
						list[i].flag_day=true;
					}
					if(list[i].year!=list[i-1].year){
						list[i].flag_year=true;
					}
				}
				return list;
			},
			//选择按钮
			choice(index) {
				//当再次被选中时，取消当前选中项
				var that=this;
				if (this.list1[index].selected == true) {
					this.list1[index].selected = false;
					//取消选中时删除数组中的值
					for (var i = 0; i < this.selectId.length; i++) {
						if (this.selectId[i] === this.list1[index].title) {
							this.selectId.splice(i, 1);
						}
					}
					this.selectList = this.selectId
					console.log("选中的值", this.selectId)
				} else {
					this.list1[index].selected = true;
					this.selectId.push(this.list1[index].title)
					for (var i = 0; i < this.selectId.length; i++) {
						console.log("选中的值", this.selectId[i])
					}
					this.selectList = this.selectId
					console.log("选中的值", this.selectId)
					console.log(typeof this.selectId)
				}

			},

			//切换tab
			tabClick(item, index) {
				this.text = item;
				this.tabIndex = index;
			},
			toggleOptions() {
				this.optionsVisible = !this.optionsVisible;
			},



			selectOption(item, index) {
				this.text = item;
				this.tabIndex = index;
				this.optionsVisible = false;
				this.selectedOption = this.tabList[index];
				this.updateButtonName();
			},

			updateButtonName() {
				if (this.selectedOption) {
					this.buttonText1 = this.selectedOption;
				} else {
					this.buttonText1 = "全部";
				}
			},

			// 周期选项卡
			cycleSwitch(){
				var that=this;
				this.cycle=!this.cycle;
				if(this.cycle){
					that.list1[0].selected = false;
					that.list1[1].selected = false;
					that.list1[2].selected = false;
					that.list1[3].selected = false;
					that.list1[4].selected = false;
					that.list1[5].selected = false;
					that.list1[6].selected = false;
					that.time = "";
					that.selectId = [];
					that.selectList = "";
				}
				else{
					that.buttonText = that.nowtime;
					that.selectedDate = that.nowtime;
				}
			},
			// 点击打开添加待办事项表单
			creat() {
				this.activeInput = true;
				this.tetxShow = !this.tetxShow;
			},
			// 点击关闭添加待办事项表单
			close() {
				this.activeInput = false;
				this.tetxShow = false;
				this.clear();
			},
			childItem(item, index) {
				// 获取点击事件的名字
				const eventName = item.title;
				const eventName_date = item.date;
				// 遍历 list 数组
				this.listAfterSort.forEach((event, i) => {
					// 如果找到了名字一样的事件
					if (event.title === eventName && event.date === eventName_date) {
						// 切换状态
						event.select = !event.select;
						// 更新 list 数组
						this.$set(this.listAfterSort, i, event);
					}
				});
				this.list.forEach((event, i) => {
					// 如果找到了名字一样的事件
					if (!event.cycles && event.title === eventName) {
						// 切换状态
						event.select = !event.select;
						// 更新 list 数组
						this.$set(this.list, i, event);
					}
				});
			},
			deleteEvent(item, index) {
				var that=this
				if(!item.cycles){
					uni.showModal({
						title: '提示',
						content: '确定要删除该事件吗？',
						success: res => {
							if (res.confirm) {
								// 找到需要删除的事件
								const eventIndex = this.listAfterSort.findIndex(event => event.title === item.title);
								if (eventIndex !== -1) {
									// 从listAfterSort数组中删除该事件
									this.listAfterSort.splice(eventIndex, 1);
									// 使用 $set 更新 list 数组
									this.$set(this, 'listAfterSort', this.listAfterSort);
								}
								const eventIndex2 = this.list.findIndex(event => event.title === item.title);
								if (eventIndex2 !== -1) {
									// 从list数组中删除该事件
									this.list.splice(eventIndex2, 1);
									// 使用 $set 更新 list 数组
									this.$set(this, 'list', this.list);
								}
							}
						}
					});
				}
				else{
					uni.showModal({
						title: '提示',
						content: '删除当前项还是删除所有周期项？',
						confirmText: '删除当前项',
						cancelText: '删除所有周期项',
						success:function(res){
							if(res.confirm){
								that.listAfterSort.splice(index, 1);
								that.$set(that, 'listAfterSort', that.listAfterSort);
							}
							if(res.cancel){//删除所有周期项
								var j=that.listAfterSort.length;
								for(var i=0; i<j; i++){
									if(that.listAfterSort[i].title == item.title){
										that.listAfterSort.splice(i, 1);
									}
								}
								console.log(that.listAfterSort);
								that.$set(that, 'listAfterSort', that.listAfterSort);
								
								const eventIndex2 = that.list.findIndex(event => event.title === item.title);
								if (eventIndex2 !== -1) {
									// 从list数组中删除该事件
									that.list.splice(eventIndex2, 1);
									// 使用 $set 更新 list 数组
									that.$set(that, 'list', that.list);
								}
							}
						}
					})
				}
			},
			Allday(){
				this.allday_flag=!this.allday_flag
			},
			// 打开时间选择器
			openDatetimePicker() {
				this.$refs.myPicker.show();
			},
			// 关闭时间选择器
			closeDatetimePicker() {
				this.$refs.myPicker.hide();
			},

			submitInput() {
				if (this.InputValue === "") {
					uni.showToast({
						title: "请输入待办事项内容",
						icon: "none",
						duration: 2000,
					});
					return;
				}
				
				// 查找事件是否已经存在于数组中
				//console.log(this.list)
				const eventIndex = this.list.findIndex(event => (event.title === this.InputValue)
													&& (event.color === this.color)
													&& (event.date === this.selectedDate)
													&& (event.cycles === this.selectId));
				if (eventIndex !== -1 ) {
					uni.showModal({
						title: '提示',
						content: '该待办事项已经存在，请勿重复添加',
						showCancel: false
					});
					return; // 直接返回，不继续执行
				}
				
				var selectId = [];
				if(this.selectId.length==7){//全选
					selectId = ['每日']
				}
				else{
					selectId = this.selectId;
					selectId.forEach(v=>{
						v = '周' + v;
					})
				}
				this.activeInput = false;
				let obj={
					year: this.year,
					title: this.InputValue,
					mark: this.remark,
					date: this.selectedDate,
					select: false,
					day: this.day,
					color: this.eventTypeColors[this.eventTypeIndex],
					cycles: selectId,
					cycletime: `${selectId.join(', ')}`,
					time: this.time,
					weekday: this.weekday,
					flag_day: false,
					flag_year: false,
				}
				console.log(obj);
				this.list.unshift(obj);
				this.listAfterSort = this.sort_list();
				console.log(this.listAfterSort);
				//this.saveList()

				this.list1[0].selected = false;
				this.list1[1].selected = false;
				this.list1[2].selected = false;
				this.list1[3].selected = false;
				this.list1[4].selected = false;
				this.list1[5].selected = false;
				this.list1[6].selected = false;
				this.close();
				
				this.$set(this, 'listAfterSort', this.listAfterSort);
				this.$set(this, 'list', this.list);
			},
			//清空表单内容
			clear(){
				this.year = "";
				this.InputValue = "";
				this.remark = "";
				this.selectedDate = "";
				this.day = "";
				this.time = "";
				this.selectList = "";
				this.selectId = [];
				this.eventTypeIndex = -1;
				this.time = "";
				this.type = "类型"
			},
			// 处理选择时间事件
			handleSubmit_dayAndTime(e) {//非全天
				const year = e.year;
				const month = e.month;
				const day = e.day;
				const hour = e.hour;
				const minute = e.minute;
				this.selectedDate = `${year}-${month}-${day} ${hour}:${minute}`;
				this.year = `${year}年`;
				this.day = `${month}月${day}日`;
				this.time = `${hour}:${minute}`;
				this.buttonText = this.selectedDate;
				var date = new Date(this.selectedDate);
				this.weekday = '周' + ['日', '一', '二', '三', '四', '五', '六'][date.getDay()];
			},
			handleSubmit_day:function(e){//全天
				this.selectedDate = `${e.detail.value}`;
				this.buttonText=this.selectedDate;
				var day = this.selectedDate.split('-');
				this.year = `${day[0]}年`;
				this.day = `${day[1]}月${day[2]}日`;
				this.time = '09:00';
				var date = new Date(this.selectedDate);
				this.weekday = '周' + ['日', '一', '二', '三', '四', '五', '六'][date.getDay()];
			},
			handleEventTypeChange(event) {
				const {
					value
				} = event.detail;
				this.eventTypeIndex = value;
				this.type = EVENT_TYPES[value].name;
			},
			handleCycleChange() {
				// do something after cycle selection changes
			},

			onChange(event) {
				const time = event.detail.value;
				this.time = time;

			},
			//定位到“今天”
			goToToday(){
				uni.pageScrollTo({
					selector: '.today',
					duration: 0,
				})
				const query = uni.createSelectorQuery()
				query.select('.first').boundingClientRect((data) => {
					console.log("第一个", data);
					let height = Math.abs(data.top)+25;
					uni.pageScrollTo({
						scrollTop: height, //滚动的距离
						duration: 0, //过渡时间
					})
				})
				.exec();
			},
			
		},
	};
</script>
<style>
	@import './icon.css';

	.todo-header {
		display: flex;
		align-items: center;
		padding: 0 15px;
		font-size: 12px;
		color: #333333;
		height: 70px;
		box-shadow: -1px 1px 5px 0 rgba(0, 0, 0, 0.1);
		position: fixed;
		top: 0;
		width: 100%;
		z-index: 90;
		background-color: white;
	}

	.todo-header_left {
		width: 100%;
	}

	.active-text {
		font-size: 14px;
		color: #279abf;
		padding-right: 10px;
	}

	.todo-header_right {
		margin-right: 15px;
		display: flex;
		align-items: center;
		justify-content: flex-end;
		z-index: 1;
		height: 100%;
		border-width: 0 0 0 2px;
		border-radius: 50px;
		border-style: dashed;
		border-color: #323232;
	}

	.todo-header_right-item {
		padding: 0 15px;
		/* height: 100%; */
		justify-content: center;
		align-items: center;
		text-align: center;
		color: #323232;
		font-size: 18px;
		font-weight: 800;
	}


	.button-icon {

		margin-left: 5px;
		/* 可根据需要调整间距 */

	}

	.button-text {
		/* font-size: 14px; */
		white-space: nowrap;

	}

	.options {
		position: absolute;
		top: 60px;
		right: 45px;
		background: #fff;
		box-shadow: 0px 0px 4px rgba(30, 30, 30, 0.1);
		padding: 8px;
		border: 1px solid #ccc;
		border-radius: 4px;
	}

	.option-item {
		padding: 10px 15px;
		border: 1px solid #ccc;
		border-radius: 4px;
		cursor: pointer;
		margin-bottom: 8px;
		text-align: center;
		background-color: #c2efee;
	}

	.option-item:last-child {
		margin-bottom: 0;
	}

	.option-item:hover {
		background-color: #6dc4fe;
	}

	.active-tab {
		color: #279abf;
	}

	.todo-content-outside{
		position: relative;
		top: 80px;
		margin-top: 5%;
		margin-left: 25%;
		border-width: 0 0 0 2px;
		border-style: dashed;
		border-color: #CCCCCC;
		
	}
	.todo-content {
		position: relative;
	}
	.today{
		position: relative;
	}
	.first{
		position: relative;
	}
	.todo-time{
		margin-top: 20px;
		position: relative;
		left: -30%;
		width: 30%;
	}
	.todo-time_today{
		margin-top: 20px;
		position: relative;
		left: -30%;
		width: 30%;
		color: #518268;
	}
	.todo-time_year{
		display: flex;
		justify-content: center;
		align-items: center;
		width: 60%;
		height: 18px;
		border-radius: 3px;
		margin: 8px;
		font-size: 25px;
		font-weight: 900;
	}
	
	.todo-time_day_outside{
		position: relative;
		left: 10%;
		display: flex;
		align-items: center;
		width: 120%;
		margin: 3px;
	}
	
	.todo-time_day{
		font-size: 16px;
		position: relative;
		left: -10%;
		display: flex;
		flex-direction: column;
		align-items: center;
		font-weight: 600;
	}
	.todo-time_icon{
		background-color: white;
		position: relative;
		left: -10%;
		color: #cccccc;
	}
	/*.todo-time_time{
		display: flex;
		justify-content: flex-end;
		padding-right: 10%;
		margin: 3px;
	}*/
	.todo-list-outside{
		display: flex;
		justify-content: space-between;
		width: 118%;
		position: relative;
		left: -27%;
		margin: 13px;
	}
	.todo-list_time{
		font-size: 14px;
		font-weight: 450;
		width: 15%;
		margin-left: 3%;
		align-items: center;
		color: #656565;
	}
	
	.todo-list {
		position: relative;
		display: flex;
		align-items: center;
		width: 70%;
		margin-right: 3%;
		padding: 6px 15px 6px 10px;
		font-size: 14px;
		border-radius: 10px;
		box-shadow: -1px 1px 5px 1px rgba(0, 0, 0, 0.1), -1px 2px 1px 0 rgba(255, 255, 255) inset;
		overflow: hidden;
		z-index: 1;
	}
	.item-head{
		position: absolute;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		height:60%;
		width: 6px;
		border-radius: 30px;
		background-color: #aae0c3;
		color: #aae0c3;
		top: 20%;
		left: 17.5%;
	}
	/*.todo-list::after {
		position: absolute;
		content: '';
		top: 0;
		bottom: 0;
		left: 0;
		width: 5px;
		background: #66c0a4;
	}*/

	.todo-list_checkbox {
		padding-right: 15px;
	}

	.checkbox {
		width: 15px;
		height: 15px;
		border-radius: 50%;
		background: #ffffff;
		box-shadow: 0 0 5px 1px rgba(0, 0, 0, 0.1);
	}
	
	.todo-list_content{
		display: flex;
		justify-content: space-around;
		margin: 5px 0 0 0;
	}
	.todo-list_content_inside{
		display: flex;
		font-size: 13px;
		color: #7e7e7e;
		margin-right: 5px;
	}
	
	.todo--finish .checkbox {
		position: relative;
		background: #eee;
	}

	.todo--finish .checkbox::after {
		content: '';
		position: absolute;
		width: 10px;
		height: 10px;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		border-radius: 50%;
		margin: auto;
		background: #cfebfd;
		box-shadow: 0 0 2px 0px rgba(0, 0, 0, 0.2) inset;
	}

	.todo--finish .todo-list_title {
		color: #999;
	}

	.todo--finish .todo-list_date {
		color: #999;
	}

	.todo--finish .todo-list_cycles {
		color: #999;
	}

	.todo--finish .todo-list_mark {
		color: #999;
	}

	.todo--finish.todo-list:before {
		content: '';
		position: absolute;
		top: 0;
		bottom: 0;
		left: 40px;
		right: 25px;
		height: 2px;
		margin: auto 0;
		background: #bdcdd8;
	}

	.todo--finish.todo-list:after {
		background: #ccc;
	}
	.today_button{
		position: fixed;
		bottom: 190rpx;
		right: 40rpx;
		width: 90rpx;
		height: 90rpx;
		line-height: 90rpx;
		text-align: center;
		border-radius: 50%;
		background-color: #009688;
		color: #fff;
		font-size: 15px;
		z-index: 999997;
		box-shadow: 0px 5px 10px rgba(0, 150, 136, 0.4);
	}
	.create-todo {
		position: fixed;
		bottom: 100rpx;
		right: 40rpx;
		width: 90rpx;
		height: 90rpx;
		line-height: 90rpx;
		text-align: center;
		border-radius: 50%;
		background-color: #009688;
		color: #fff;
		font-size: 70rpx;
		z-index: 999997;
		box-shadow: 0px 5px 10px rgba(0, 150, 136, 0.4);
	}

	.create-todo {
		display: flex;
		align-items: center;
		justify-content: center;
		position: fixed;
		bottom: 20px;

		right: 20;
		margin: 0 auto;
		width: 50px;
		height: 50px;
		border-radius: 50%;
		background-color: #009688;
		box-shadow: 0px 5px 10px rgba(0, 150, 136, 0.4);
	}

	.create-content {
		display: flex;
		justify-content: center;
		align-items: center;
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		transition: all 0.3s;
		background-color: rgba(138, 138, 138, 0.8);
		opacity: 0;
		transform: scale(0) translateY(200%);
	}

	.create-show {
		opacity: 1;
		transform: scale(1) translateY(0);
	}

	.create-content-box {
		width: 80%;
		padding: 10px 18px 30px 18px;
		border-radius: 20rpx;
		background-color: #f3f3f3;
		/*box-shadow: -1px 1px 5px 2px rgba(0, 0, 0, 0.1), -1px 1px 1px 0 rgba(255, 255, 255) inset;*/
		z-index: 2;
	}
	.create-header{
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin: 5px 0 15px 0;
		background-color: #f3f3f3;
	}
	.create-header_left{
		resize: ;
		width: 45%;
		display: flex;
		justify-content: space-evenly;
		align-items: center;
	}
	.create-header_right{
		
	}
	.create-body{
		background-color: white;
		border-radius: 15px;
		padding: 5px 5px 10px 5px;
	}
	.create-input_outside{
		display: flex;
		margin: 17px 10px;
		justify-content: center;
		align-items: center;
	}
	.create-input {
		border-style: solid;
		border-width: 0 0 1px 0;
		border-color: #a7a7a7;
		padding: 7px;
		margin-left: 7px;
	}
	
	.create-select_outside{
		display: flex;
		margin: 0px 10px 15px 10px;
		justify-content: center;
		align-items: center;
	}
	.event-type-selector {
		color: #4c4c4c;
		display: inline-flex;
		justify-content: space-between;
		align-items: center;
		border-style: solid;
		border-color: #a7a7a7;
		padding: 7px;
		margin-left: 7px;
		border-width: 0 0 1px 0;
		width: 85%;
	}
	.allday{
		color: #4c4c4c;
		display: inline-flex;
		justify-content: space-between;
		align-items: center;
		border-style: solid;
		border-color: #a7a7a7;
		padding: 7px;
		margin-left: 7px;
		border-width: 0 0 1px 0;
		width: 85%;
	}
	.allday_switch{
		position: relative;
		right: -10px;
		transform:scale(0.7)
	}
	.create_time-picker_outside{
		position: relative;
		right: 0;
		color: #4c4c4c;
		display: inline-flex;
		justify-content: space-between;
		align-items: center;
		border-style: solid;
		border-color: #a7a7a7;
		padding: 7px;
		margin-left: 43px;
		margin-bottom: 15px;
		border-width: 0 0 1px 0;
		width: 76%;
	}
	.create_time-picker{
		color: #4c4c4c;
		display: inline-flex;
		justify-content: flex-end;
		align-items: center;
		width: 80%;
		margin-right: -10px;
	}
	.create-cycle_outside{
		display: flex;
		margin: 0px 10px 10px 10px;
		justify-content: center;
		align-items: center;
	}
	.create-cycle{
		color: #4c4c4c;
		display: inline-flex;
		justify-content: space-between;
		align-items: center;
		border-style: solid;
		border-color: #a7a7a7;
		padding: 7px;
		margin-left: 10px;
		border-width: 0 0 1px 0;
		width: 83%;
	}
	.cycle-seclct_outside{
		
	}
	.list-box {
		display: flex;
		justify-content: space-between;
		margin-left: 32px;
	}
	
	.list-box>view {
		width: 35px;
		margin: 2px;
		padding: 20rpx;
		border-radius: 30px;
		/* box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.1); */
		text-align: center;
		font-size: 10px;
	}
	
	.list-box>view.selde {
		background-color: #009688;
		color: #fff;
	}
	
	.list-box>view.noselde {
		background-color: rgba(0, 0, 0, 0.1);
		color: #333;
	}
	/* .creat-button {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 80rpx;
		line-height: 80rpx;
		font-size: 32rpx;
		background-color: #009688;
		color: #fff;
		border-radius: 50px;
		box-shadow: 0px 5px 10px rgba(0, 150, 136, 0.4);
		margin-left: auto;
		margin-right: auto;
		margin-top: 40rpx;
		width: 80%;
	}
 */
	.tab-box {
		display: flex;
		margin-bottom: 20rpx;
	}

	.tab-box>view {
		flex: 1;
		text-align: center;
		color: #666;
		font-size: 28rpx;
		padding: 20rpx;
		border: 1rpx solid #ccc;
		border-radius: 10rpx;
		margin-right: 20rpx;

		/* 默认情况下，设置为非选中状态 */
		background-color: #f3f3f3;
	}

	/* 选中状态 */
	.tab-box>view.active {
		color: #fff;
		background-color: #009688;
		border-color: #009688;
	}


	.iconhao {
		transform: rotate(135deg);
	}

	.default {
		transition: transform 0.3s;
	}

	.create-todo-active {
		padding-top: 100px;
	}

	.image-default {
		display: flex;
		justify-content: center;
	}

	.image-default image {
		width: 100%;
	}

	.default-info {
		text-align: center;
		font-size: 14px;
		color: #CCCCCC;
	}

	.delete-btn {
		position: absolute;
		right: 15px;
		top: 50%;
		width: 20px;
		height: 20px;
		transform: translateY(-50%);
		color: #494d45;
		cursor: pointer;
		transition: transform 0.3s;
		z-index: 3;
	}

	.delete-btn:hover {
		color: #81c0ab;
		transform: scale(1.2) translateY(-50%);
	}
	
	/*.todo-list_date {
		position: absolute;
		right: 20px;
		top: 50%;
		transform: translateY(-50%);
		font-size: 13px;
		color: #454545;
		cursor: pointer;
		transition: transform 0.3s;
	}

	.todo-list_cycles {
		position: absolute;
		right: 20px;
		top: 50%;
		transform: translateY(-50%);
		font-size: 13px;
		color: #454545;
		cursor: pointer;
		transition: transform 0.3s;
	}

	.todo-list_mark {
		position: absolute;
		left: 50px;
		top: 80%;
		transform: translateY(-50%);
		font-size: 10px;
		color: #454545;
		cursor: pointer;
		transition: transform 0.3s;
	}*/
	.br{/*留空*/
		height: 200px;
	}
</style>