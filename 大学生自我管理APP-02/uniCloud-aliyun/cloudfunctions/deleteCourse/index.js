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
  const itemToDelete = singleBox.find(item => item.index == index && item.weekday == weekday)
  let result = null
  const newSingleBox = singleBox.filter(item => item.id != itemToDelete.id)
  writeFileSync(resolve(__dirname, '../data/singleBox.json'), JSON.stringify(newSingleBox))
  //返回数据给客户端
  return newSingleBox
};
