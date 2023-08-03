'use strict';
const {
  readFileSync,
  writeFileSync
} = require('fs')
const {
  resolve
} = require('path')
exports.main = async (event, context) => {
  //event为客户端上传的参数
  console.log('event : ', event)
  const {
    index,
    weekday,
    course,
    teacher,
    adress,
    score
  } = event
  const singleBox = JSON.parse(readFileSync(resolve(__dirname, '../data/singleBox.json'), 'utf8'))
  const item = singleBox.find(item => item.index == index && item.weekday == weekday)
  let result = null
  if (item) {
    item.course = course
    item.teacher = teacher
    item.adress = adress
    item.score = score
    result = item
  } else {
    let lastId = singleBox[singleBox.length - 1].id
    const newData = {
      id: ++lastId,
      index,
      weekday,
      course,
      teacher,
      adress,
      score
    }
    singleBox.push(newData)
    result = newData
  }
  writeFileSync(resolve(__dirname, '../data/singleBox.json'), JSON.stringify(singleBox))
  //返回数据给客户端
  return result
};
