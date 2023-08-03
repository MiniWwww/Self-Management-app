import {
  reactive
} from 'vue'

const data = reactive({
  singleBox: [],
  duration: [],
})

export function useInitialData() {
  function setInitialData({
    duration,
    singleBox
  }) {
    data.singleBox = singleBox
    data.duration = duration
  }

  function editSchedule(result) {
    // console.log(data.singleBox)
    // const tag = result.index + '_' + result.weekday
    // console.log(tag)
    // data.singleBox.tag.course = result.course
    // data.singleBox.tag.teacher = result.teacher
    // data.singleBox.tag.adress = result.adress
    // data.singleBox.tag.score = result.score
  }

  function addSchedule(result) {
    // const tag = result.index + '_' + result.weekday
    // data.singleBox.tag = result
  }

  return [data, setInitialData, editSchedule, addSchedule]
}
