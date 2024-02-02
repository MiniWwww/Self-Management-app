import db from '@/pages/index/utils/sqlite.js'
import { v4 as uuidv4 } from 'uuid';

const dao = {
	// 保存当前周
	saveWeek(week) {
		uni.setStorage({
		  key: 'week',
		  data: week,
		  success: function () {
		    // console.log('success');
		  }
		})
	},
	async loadWeek(week) {
		let res = await uni.getStorage({
		  key: 'week'
		})
		// console.log(res);
		return res.data
	},
	// 创建schedule表
	createTableSchedule() {
		var dbTable = 'schedule'
		var data = 'id INT PRIMARY KEY,'
					+ 'begin INT NOT NULL,'
					+ 'end INT NOT NULL,'
					+ 'week INT NOT NULL,'
					+ 'name VARCHAR(255) NOT NULL,'
					+ 'week_begin INT NOT NULL,'
					+ 'week_end INT NOT NULL,'
					+ 'place VARCHAR(255) NOT NULL,'
					+ 'teacher VARCHAR(255) NOT NULL,'
					+ 'credit INT NOT NULL,'
					+ 'odd_or_even INT NOT NULL'
		const res = db.createTable(dbTable, data)
		return res;
	},
	// 创建时间段表
	createTableTime() {
		var dbTable = 'time'
		var data = 'id INT PRIMARY KEY,'
					+ 'begin VARCHAR(20) NOT NULL,'
					+ 'end VARCHAR(20) NOT NULL'
		const res = db.createTable(dbTable, data)
		console.log(res);
		
		// 插入初始化数据
		try{
			db.insertTableData(dbTable, '1,' + '"08:00",' + '"08:45"')
			db.insertTableData(dbTable, '2,' + '"08:55",' + '"09:40"')
			db.insertTableData(dbTable, '3,' + '"10:10",' + '"10:55"')
			db.insertTableData(dbTable, '4,' + '"11:05",' + '"11:50"')
			db.insertTableData(dbTable, '5,' + '"14:30",' + '"15:15"')
			db.insertTableData(dbTable, '6,' + '"15:25",' + '"16:10"')
			db.insertTableData(dbTable, '7,' + '"16:40",' + '"17:25"')
			db.insertTableData(dbTable, '8,' + '"17:35",' + '"18:20"')
			db.insertTableData(dbTable, '9,' + '"19:10",' + '"19:55"')
			db.insertTableData(dbTable, '10,' + '"20:05",' + '"20:50"')
			db.insertTableData(dbTable, '11,' + '"21:20",' + '"22:05"')
			db.insertTableData(dbTable, '12,' + '"22:15",' + '"23:00"')
		}catch(e){
			console.log("初始数据已插入");
		}
		
		return res;
	},
	
	// 插入课程
	addCourse(begin, end, week, name, week_begin, week_end, place, teacher, credit, odd_or_even) {
		const id = uuidv4();
		var dbTable = 'schedule'
		var data = '"' + id + '",'
					+ begin + ','
					+ end + ','
					+ week + ',"'
					+ name + '",'
					+ week_begin + ','
					+ week_end + ',"'
					+ place + '","'
					+ teacher + '",'
					+ credit + ','
					+ odd_or_even
		// console.log(data);
		let res = db.insertTableData(dbTable, data)
		return res
	},
	
	// 修改课程
	updateCourseById(id, begin, end, week, name, week_begin, week_end, place, teacher, credit, odd_or_even) {
		var dbTable = 'schedule'
		var data = 'begin='
					+ begin + ',end='
					+ end + ',week='
					+ week + ',name="'
					+ name + '",week_begin='
					+ week_begin + ',week_end='
					+ week_end + ',place="'
					+ place + '",teacher="'
					+ teacher + '",credit='
					+ credit + ',odd_or_even='
					+ odd_or_even
		console.log(data);
		var lname = 'id'
		var lvalue = id
		let res = db.updateTableData(dbTable, data, lname, lvalue)
		return res
	},
	
	// 修改时间
	updateCourse(id, begin, end) {
		var dbTable = 'time'
		var data = 'begin="'
					+ begin + '",end="'
					+ end +'"'
		var lname = 'id'
		var lvalue = id
		let res = db.updateTableData(dbTable, data, lname, lvalue)
		return res
	},
	
	// 获取全部课程
	queryAllCourses() {
		var dbTable = 'schedule'
		let res = db.selectTableData(dbTable)
		return res
	},
	
	// 获取全部课程
	findCourseById(id) {
		var dbTable = 'schedule'
		let res = db.selectTableData(dbTable, "id", id)
		return res
	},
	
	// 获取全部时间段
	queryAllTime() {
		var dbTable = 'time'
		let res = db.selectTableData(dbTable)
		return res
	},
	
	// 删除课程
	deleteCourseById(id) {
		var dbTable = 'schedule'
		var lname = 'id'
		var lvalue = id
		let res = db.deleteTableData(dbTable, lname, lvalue)
		return res
	},
	
	// 清空课程表
	truncateAllCourses() {
		db.truncateTable('schedule');
		this.createTableSchedule()
	}
	
}

export default dao
