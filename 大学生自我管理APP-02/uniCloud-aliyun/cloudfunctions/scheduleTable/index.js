'use strict';
const {
  readFileSync,
  writeFileSync
} = require('fs')
const {
  resolve
} = require('path')
exports.main = async (event, context) => {
  const duration = JSON.parse(readFileSync(resolve(__dirname, '../data/duration.json'), 'utf8'))
  const singleBox = JSON.parse(readFileSync(resolve(__dirname, '../data/singleBox.json'), 'utf8'))
  return {
    duration,
    singleBox
  }
};
