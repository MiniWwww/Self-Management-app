import {
  db
} from '@/pages/index/db/dbUtils.js'

function formatScheduleData(data) {
  return data.reduce((prev, cur) => {
    const index = cur.index
    const weekday = cur.weekday
    prev[`${index}_${weekday}`] = cur
    return prev
  }, {})
}

export async function getInitialData() {

}

/**
 * 向指定课程表新增课程
 * @param {INTEGER} courseTableId
 * @param {INTEGER} dayOfWeek
 * @param {INTEGER} timePeriodId
 * @param {TEXT} courseName
 * @param {TEXT} professor
 * @param {REAL} credits
 */
export async function setScheduleData(courseTableId, dayOfWeek, timePeriodId, courseName, professor, credits) {
  let conditionList = ['id', 'course_table_id', 'day_of_week', 'time_period_id', 'course_name', 'professor',
    'credits'
  ]
  let condition = conditionList.join(",")

  const snowflake = new SnowflakeId()
  let id = snowflake.generate()
  let data = `${id}. ${courseTableId}, ${dayOfWeek}, ${timePeriodId}, ${courseName}, ${professor}, ${credits}`
  // 插入数据库
  await db.insertTableData("course_tables", data, condition)
}

export async function deleteScheduleData(data) {
  const result = await uniHttpPost('deleteCourse', data)
  return Promise.resolve({
    result
  })
}