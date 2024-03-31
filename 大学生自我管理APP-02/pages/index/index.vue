<template>
	<view>
		<SqTimetable @click="getCourse" @getTime="getTime" :time="time" :image="image" :timeColor="timeColor" :courseList="courseList"
			:showNotWeek="true"></SqTimetable>
		<!-- 字体图标 -->
		<view class="create-todo" @click="creat"><text class="iconfont iconhao1"
				:class="{ 'create-todo-active': textShow }">+</text></view>
		<view class="truncate" @click="open"><uni-icons type="trash" color="white" size="30"></uni-icons></view>
		<uni-popup ref="popupTime" type="center">
			<uni-card style="display: flex; justify-content: center;">
				<picker mode="time" value="{{beginTime}}" bindchange="bindBeginTimeChange">
				    <uni-card>
				      开始时间: {{time[timeIndex][0]}}
				    </uni-card>
				</picker>
				<picker mode="time" value="{{endTime}}" bindchange="bindEndTimeChange">
				    <uni-card>
				      结束时间: {{time[timeIndex][1]}}
				    </uni-card>
				</picker>
				<uni-button type="danger" @click="truncate">确定</uni-button>
				<uni-button type="primary" @click="cancelTruncate">取消</uni-button>
			</uni-card>
		</uni-popup>
		<uni-popup ref="popup" type="center">
			<uni-card style="display: flex; justify-content: center;">
				<text style="font-size: 20px;">确定要清空课程表吗？(此操作不可撤销)</text>
				<uni-button type="danger" @click="truncate">确定</uni-button>
				<uni-button type="primary" @click="cancelTruncate">取消</uni-button>
			</uni-card>
		</uni-popup>
		<!-- 输入框 -->
		<view class="create-content" style="z-index: 999998" v-if="activeInput" :class="{ 'create-show': textShow }">
			<view class="create-content-box">
				<uni-forms ref="form" :modelValue="formData" :rules="rules" label-width="80px">
					<uni-forms-item required label="起始节" name="begin">
						<uni-easyinput type="number" v-model="formData.begin" placeholder="这门课第几节开始？" />
					</uni-forms-item>
					<uni-forms-item required label="终止节" name="end">
						<uni-easyinput type="number" v-model="formData.end" placeholder="这门课第几节结束？" />
					</uni-forms-item>
					<uni-forms-item required label="星期" name="week">
						<uni-easyinput required type="number" v-model="formData.week" placeholder="这门课星期几上？" />                      
					</uni-forms-item>
					<uni-forms-item required label="课程名" name="name">
						<uni-easyinput type="text" v-model="formData.name" placeholder="请填写课程名" />
					</uni-forms-item>
					<uni-forms-item required label="单双周" name="odd_or_even">
						<uni-data-select
						      v-model="formData.odd_or_even"
						      :localdata="range"
						      @change="change"
						    ></uni-data-select>
					</uni-forms-item>
					<uni-forms-item required label="起始周" name="week_begin">
						<uni-easyinput type="number" v-model="formData.week_begin" placeholder="这节课从第几周开始？" />
					</uni-forms-item>
					<uni-forms-item required label="终止周" name="week_end">
						<uni-easyinput type="number" v-model="formData.week_end" placeholder="这节课到第几周结束？" />
					</uni-forms-item>
					<uni-forms-item required label="上课地点" name="place">
						<uni-easyinput type="text" v-model="formData.place" placeholder="请填写上课地点" />
					</uni-forms-item>
					<uni-forms-item required label="授课老师" name="teacher">
						<uni-easyinput type="text" v-model="formData.teacher" placeholder="请填写授课老师" />
					</uni-forms-item>
					<uni-forms-item required label="学分" name="credit">
						<uni-easyinput type="number" v-model="formData.credit" placeholder="请填写学分" />
					</uni-forms-item>
				</uni-forms>
				
				<view class="creat-button" v-if="creatButtonShow" @click="submit">创建</view>
				<view class="button-box" v-if="updateButtonShow">
					<view class="creat-button"  @click="update">更新</view>
					<view class="remove-button" @click="remove">删除</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
	import SqTimetable from '@/components/sq-timetable/sq-timetable.vue';
	import db from '@/pages/index/utils/sqlite.js'
	import dao from '@/pages/index/dao/dao.js'
	import {
		onMounted,
		ref,
		watch
	} from 'vue';
	
	const form = ref(null)
	
	const popup = ref()
	const popupTime = ref()
	const open = () => {
		popup.value.open()
	}
	const openPopupTiem = () => {
		popupTime.value.open()
	}
	
	const formData = ref({
		begin: null,
		end: null,
		week: null,
		name: '',
		week_begin: null,
		week_end: null,
		place: '',
		teacher: '',
		credit: null,
		odd_or_even: 0
	})
	
	const timeIndex = ref(0)
	const beginTime = ref("")
	const endTime = ref("")
	const bindBeginTimeChange = (e) => {
		console.log('开始时间改变' + e.detail.value);
		beginTime.value = e.detail.value
		console.log(beginTime);
	}
	const bindEndTimeChange = (e) => {
		console.log('结束时间改变' + e.detail.value);
		endTime.value = e.detail.value
	}
	
	const range = ref([
	        { value: 0, text: "每周" },
	        { value: 1, text: "单周" },
	        { value: 2, text: "双周" },
	])

	const rules = {
		// 对begin字段进行必填验证
		begin: {
			// begin 字段的校验规则
			rules: [
				// 校验 begin 不能为空
				{
					required: true,
					errorMessage: '请填写起始节',
				},
				// 对begin字段范围校验
				{
					mininum: 1,
					maxinum: 12,
					errorMessage: '{label}在 {mininum} 到 {maxinum} 之间',
				}
			],
			// 当前表单域的字段中文名，可不填写
			label: '起始节',
			validateTrigger: 'submit'
		},
		end: {
			rules: [{
					required: true,
					errorMessage: '请填写终止节',
				},
				{
					mininum: 1,
					maxinum: 12,
					errorMessage: '{label}在 {mininum} 到 {maxinum} 之间',
				},
				{
					validateFunction: function(rule, value, data, callback) {
						if (value < formData.value.begin) {
							callback('终止节不能小于起始节')
						}
						return true
					}
				}
			],
			label: '终止节',
			validateTrigger: 'submit'
		},
		week: {
			rules: [{
					required: true,
					errorMessage: '请填写星期',
				},
				{
					mininum: 1,
					maxinum: 7,
					errorMessage: '{label}在 {mininum} 到 {maxinum} 之间',
				}
			],
			label: '星期',
			validateTrigger: 'submit'
		},
		week_begin: {
			rules: [{
					required: true,
					errorMessage: '请填写起始周',
				},
				{
					mininum: 1,
					maxinum: 18,
					errorMessage: '{label}在 {mininum} 到 {maxinum} 之间',
				}
			],
			label: '起始周',
			validateTrigger: 'submit'
		},
		week_end: {
			rules: [{
					required: true,
					errorMessage: '请填写终止周',
				},
				{
					mininum: 1,
					maxinum: 18,
					errorMessage: '{label}在 {mininum} 到 {maxinum} 之间',
				},
				{
					validateFunction: function(rule, value, data, callback) {
						if (value < formData.value.week_begin) {
							callback('终止周不能小于起始周')
						}
						return true
					}
				}
			],
			label: '终止周',
			validateTrigger: 'submit'
		}
	}

	const submit = () => {
		addCourse(formData.value)
		loadCourses()
		close()
	}
	
	const update = () => {
		updateCourse(formData.value)
		loadCourses()
		close()
	}
	
	const remove = () => {
		deleteCourse(formData.value)
		loadCourses()
		close()
	}
	
	const truncate = () => {
		dao.truncateAllCourses()
		cancelTruncate()
		loadCourses()
	}
	
	const cancelTruncate = () => {
		popup.value.close()
	}
	
	const change = (e) => {
		formData.value.odd_or_even = e
	}

	const activeInput = ref(false)
	const textShow = ref(false)
	const creatButtonShow = ref(false)
	const updateButtonShow = ref(false)

	// 点击打开添加待办事项表单
	const creat = () => {
		activeInput.value = true;
		creatButtonShow.value = true
		updateButtonShow.value = false
		textShow.value = !textShow.value;
	}
	// 点击关闭添加待办事项表单
	const close = () => {
		activeInput.value = false;
		textShow.value = !textShow.value;
	}
	
	const getCourse = (item) => {
		formData.value = item
		creat()
		creatButtonShow.value = false
		updateButtonShow.value = true
	};
	
	const getTime = (item) => {
		timeIndex.value = item - 1
		openPopupTiem()
		console.log(item);
	}

	const time = ref([])

	const image =
		'https://img04.sogoucdn.com/app/a/100520093/ca86e620b9e623ff-f4709b64c5c0ee80-852ef8b2f248787b2f289ae80f88038c.jpg';
	const colorArrays = ['#70eb55', '#ffc450', '#ff9bd7', '#86affe', '#58eea4', '#ffa17d', '#1cbbb4', '#6964ad',
		'#d42245', '#218285'
	];
	const timeColor = '#000000';

	const courseList = ref([]);

	onMounted(() => {
		if (!db.isOpen()) {
			db.openSqlite()
		} else {
			console.log("数据库app已启动");
		}
		dao.createTableSchedule()
		dao.createTableTime()
		loadCourses()
		loadTime()
	})
	
	const loadCourses = () => {
		let resPromise = dao.queryAllCourses()
		resPromise.then(res => {
			courseList.value = res
		}).catch(err => {
			console.error(err);
		})
	}
	
	const loadTime = () => {
		let resPromise = dao.queryAllTime()
		resPromise.then(res => {
			// time.value = res
			console.log(res);
			time.value = [];
			res.forEach(item => {
				time.value.push([item.begin, item.end])
			})
		}).catch(err => {
			console.error(err);
		})
	}

	const addCourse = (course) => {
		let begin = course.begin
		let end = course.end
		let week = course.week
		let name = course.name
		let week_begin = course.week_begin
		let week_end = course.week_end
		let place = course.place
		let teacher = course.teacher
		let credit = course.credit
		let odd_or_even = course.odd_or_even
		let resPromise = dao.addCourse(begin, end, week, name, week_begin, week_end, place, teacher, credit, odd_or_even)
	}

	const updateCourse = (course) => {
		let id = course.id
		let begin = course.begin
		let end = course.end
		let week = course.week
		let name = course.name
		let week_begin = course.week_begin
		let week_end = course.week_end
		let place = course.place
		let teacher = course.teacher
		let credit = course.credit
		let odd_or_even = course.odd_or_even
		let resPromise = dao.updateCourseById(id, begin, end, week, name, week_begin, week_end, place, teacher, credit, odd_or_even)
	}

	const deleteCourse = (course) => {
		let id = course.id
		let resPromise = dao.deleteCourseById(id)
	}
</script>

<style>
	@import './icon.css';
	.truncate {
		position: fixed;
		bottom: 80rpx;
		right: 40rpx;
		width: 90rpx;
		height: 90rpx;
		line-height: 90rpx;
		text-align: center;
		border-radius: 50%;
		color: #fff;
		font-size: 30rpx;
		z-index: 999997;
		display: flex;
		align-items: center;
		justify-content: center;
		bottom: 80px;
		right: 20;
		margin: 0 auto;
		width: 50px;
		height: 50px;
		border-radius: 50%;
		background-color: #009688;
		box-shadow: 0px 5px 10px rgba(0, 150, 136, 0.4);
	}

	.create-todo {
		position: fixed;
		bottom: 80rpx;
		right: 40rpx;
		width: 90rpx;
		height: 90rpx;
		line-height: 90rpx;
		text-align: center;
		border-radius: 50%;
		color: #fff;
		font-size: 50rpx;
		z-index: 999999;
		display: flex;
		align-items: center;
		justify-content: center;
		bottom: 20px;
		right: 20;
		margin: 0 auto;
		width: 50px;
		height: 50px;
		border-radius: 50%;
		background-color: #009688;
		box-shadow: 0px 5px 10px rgba(0, 150, 136, 0.4);
	}

	.create-todo-active {
		transform: scale(1) rotate(45deg);
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
		padding: 40rpx;

		border-radius: 20rpx;
		background: #ffffff;
		box-shadow: -1px 1px 5px 2px rgba(0, 0, 0, 0.1), -1px 1px 1px 0 rgba(255, 255, 255) inset;
		z-index: 2;
	}
	
	.create-show {
		opacity: 1;
		transform: scale(1) translateY(0);
	}
	.button-box {
		width: 80%;
		padding: 1% 5%;
		display: flex;
		justify-content: space-between;
		margin-top: -20px;
		margin-left: 20px;
	}
	.creat-button {
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
		width: 100px;
	}
	.remove-button {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 80rpx;
		line-height: 80rpx;
		font-size: 32rpx;
		background-color: #E53F31;
		color: #fff;
		border-radius: 50px;
		box-shadow: 0px 5px 10px rgba(0, 150, 136, 0.4);
		margin-left: auto;
		margin-right: auto;
		margin-top: 40rpx;
		width: 100px;
	}
</style>
