import {
  uniHttpGet,
  uniHttpPost
} from '@/pages/index/libs/http.js'
// import { formatScheduleData } from './utils.js'

function formatScheduleData(data) {
  return data.reduce((prev, cur) => {
    const index = cur.index
    const weekday = cur.weekday
    prev[`${index}_${weekday}`] = cur
    return prev
  }, {})
}

export async function getInitialData() {
  const {
    duration,
    singleBox
  } = await uniHttpGet('scheduleTable')
  return Promise.resolve({
    duration,
    singleBox: formatScheduleData(singleBox)
  })
}

export async function setScheduleData(data) {
  const result = await uniHttpPost('setScheduleTable', data)
  return Promise.resolve({
    result
  })
}

export async function deleteScheduleData(data) {
  const result = await uniHttpPost('deleteCourse', data)
  return Promise.resolve({
    result
  })
}
