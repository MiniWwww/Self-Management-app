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
		var data = 'id VARCHAR(255) PRIMARY KEY,'
					+ 'begin INT NOT NULL,'
					+ 'end INT NOT NULL,'
					+ 'week INT NOT NULL,'
					+ 'name VARCHAR(255) NOT NULL,'
					+ 'week_begin INT NOT NULL,'
					+ 'week_end INT NOT NULL,'
					+ 'place VARCHAR(255) NOT NULL,'
					+ 'teacher VARCHAR(255) NOT NULL,'
					+ 'credit INT NOT NULL'
		const res = db.createTable(dbTable, data)
		return res;
	},
	// todo 创建时间段表
	
	// 插入课程
	addCourse(begin, end, week, name, week_begin, week_end, place, teacher, credit) {
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
					+ credit
		// console.log(data);
		let res = db.insertTableData(dbTable, data)
		return res
	},
	
	// 修改课程
	updateCourse(id, begin, end, week, name, week_begin, week_end, place, teacher, credit) {
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
					+ credit
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
	
	// 删除课程
	deleteCourseById(id) {
		var dbTable = 'schedule'
		var lname = 'id'
		var lvalue = id
		let res = db.deleteTableData(dbTable, lname, lvalue)
		return res
	}
	
}

export default dao
