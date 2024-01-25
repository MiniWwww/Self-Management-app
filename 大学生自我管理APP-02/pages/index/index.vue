<template>
	<view>
		<SqTimetable @click="getCourse" :time="time" :image="image" :timeColor="timeColor" :courseList="courseList"
			:showNotWeek="true"></SqTimetable>
		<!-- 字体图标 -->
		<view class="create-todo" @click="creat"><text class="iconfont iconhao1"
				:class="{ 'create-todo-active': textShow }">+</text></view>
		<!-- 输入框 -->
		<view class="create-content" style="z-index: 1" v-if="activeInput" :class="{ 'create-show': textShow }">
			<view class="create-content-box">
				<uni-forms ref="form" :modelValue="formData" :rules="rules">
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
					<uni-forms-item required label="起始周" name="week_begin">
						<uni-easyinput type="number" v-model="formData.week_begin" placeholder="请填写课程名" />
					</uni-forms-item>
					<uni-forms-item required label="终止周" name="week_end">
						<uni-easyinput type="number" v-model="formData.week_end" placeholder="请填写课程名" />
					</uni-forms-item>
					<uni-forms-item required label="上课地点" name="place">
						<uni-easyinput type="text" v-model="formData.place" placeholder="请填写课程名" />
					</uni-forms-item>
					<uni-forms-item required label="授课老师" name="teacher">
						<uni-easyinput type="text" v-model="formData.teacher" placeholder="请填写课程名" />
					</uni-forms-item>
					<uni-forms-item required label="学分" name="credit">
						<uni-easyinput type="number" v-model="formData.credit" placeholder="请填写课程名" />
					</uni-forms-item>
				</uni-forms>
				<view class="creat-button" v-if="creatButtonShow" @click="submit">创建</view>
				<view class="creat-button" v-if="updateButtonShow" @click="update">更新</view>
				<view class="remove-button" v-if="updateButtonShow" @click="remove">删除</view>
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
	
	const formData = ref({
		begin: null,
		end: null,
		week: null,
		name: '',
		week_begin: null,
		week_end: null,
		place: '',
		teacher: '',
		credit: null
	})

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

	const time = [
		['08:00', '08:45'],
		['08:55', '09:40'],
		['10:10', '10:55'],
		['11:05', '11:50'],
		['14:30', '15:15'],
		['15:25', '16:10'],
		['16:40', '17:25'],
		['17:35', '18:20'],
		['19:10', '19:55'],
		['20:05', '20:50'],
		['21:20', '22:05'],
		['22:15', '23:00']
	];

	const image =
		'https://img04.sogoucdn.com/app/a/100520093/ca86e620b9e623ff-f4709b64c5c0ee80-852ef8b2f248787b2f289ae80f88038c.jpg';
	const colorArrays = ['#70eb55', '#ffc450', '#ff9bd7', '#86affe', '#58eea4', '#ffa17d', '#1cbbb4', '#6964ad',
		'#d42245', '#218285'
	];
	const timeColor = '#000000';

	const courseList = ref([{
			id: 1000,
			begin: 2,
			end: 4,
			week: 2,
			name: '面向对象-JAVA实践教学',
			week_begin: 8,
			week_end: 8, //只在第8周有课
			place: '理泽楼314',
			teacher: '陆师',
			credit: 3
		},
		{
			id: 1001,
			begin: 1,
			end: 3,
			week: 4,
			name: '计算机网络（双语）',
			week_begin: 1,
			week_end: 16, //在第1-到第16周有课
			place: '理泽楼315',
			teacher: '刘师',
			credit: 3
		}
	]);

	onMounted(() => {
		if (!db.isOpen()) {
			db.openSqlite()
		} else {
			console.log("数据库app已启动");
		}
		dao.createTableSchedule()
		loadCourses()
	})
	
	const loadCourses = () => {
		let resPromise = dao.queryAllCourses()
		resPromise.then(res => {
			courseList.value = res
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
		let resPromise = dao.addCourse(begin, end, week, name, week_begin, week_end, place, teacher, credit)
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
		let resPromise = dao.updateCourse(id, begin, end, week, name, week_begin, week_end, place, teacher, credit)
	}

	const deleteCourse = (course) => {
		let id = course.id
		let resPromise = dao.deleteCourseById(id)
	}
</script>

<style>
	.create-todo {
		position: fixed;
		bottom: 80rpx;
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

	.create-todo-active {
		padding-top: 100px;
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
		width: 80%;
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
		width: 80%;
	}
</style>
