<template>
  <view class="container">
    <uni-section :title="formType" type="line" class="FormCard">
      <view class="example">
        <uni-forms ref="customForm" :rules="customRules" :modelValue="customFormData">
          <uni-forms-item label="星期" required name="weekday">
            <uni-easyinput v-model="customFormData.weekday" :value="customFormData.weekday" placeholder="请输入课程名" />
          </uni-forms-item>
          <uni-forms-item label="节数" required name="index">
            <uni-easyinput v-model="customFormData.index" :value="customFormData.index" placeholder="请输入课程名" />
          </uni-forms-item>
          <uni-forms-item label="课程" required name="course">
            <uni-easyinput v-model="customFormData.course" :value="customFormData.course" placeholder="请输入课程名" />
          </uni-forms-item>
          <uni-forms-item label="老师" required name="teacher">
            <uni-easyinput v-model="customFormData.teacher" :value="customFormData.teacher" placeholder="请输入老师" />
          </uni-forms-item>
          <uni-forms-item label="教室" required name="adress">
            <uni-easyinput v-model="customFormData.adress" :value="customFormData.adress" placeholder="请输入教室" />
          </uni-forms-item>
          <uni-forms-item label="学分" required name="score">
            <uni-easyinput v-model="customFormData.score" :value="customFormData.score" placeholder="请输入学分" />
          </uni-forms-item>
        </uni-forms>
        <view class="button-group">
          <button type="default" @click="handleCancelClick"></button>
          <button type="warn" @click="handleDeleteClick" v-if="formType === '编辑课程'"></button>
          <button type="primary" @click="handleConfirmClick"></button>
        </view>
      </view>
    </uni-section>
  </view>
</template>
<script setup>
  import {
    reactive,
    onMounted,
    onUnmounted,
    toRefs,
    ref
  } from 'vue'
  import {
    setScheduleData,
    deleteScheduleData
  } from '../SchedduleTable/scripts/service.js'

  let formType = ref('')
  // let receiveData = reactive({
  //   weekday: 0,
  //   index: 0,
  //   course: '',
  //   teacher: '',
  //   adress: '',
  //   score: ''
  // })

  const {
    receiveData
  } = new Promise((resolve, reject) => {
    uni.$once('addCourse', function(data) {
      resolve(data.msg)
    })
  })


  uni.$once('editCourse', function(data) {
    console.log(data.msg);
    formType = data.msg.formType
    receiveData.weekday = data.msg.weekday
    receiveData.index = data.msg.index
    receiveData.course = data.msg.course
    receiveData.teacher = data.msg.teacher
    receiveData.adress = data.msg.adress
    receiveData.score = data.msg.score
  })

  console.log(receiveData)

  // 自定义表单数据
  const customFormData = reactive({
    weekday: receiveData.weekday,
    index: receiveData.index,
    course: receiveData.course,
    teacher: receiveData.teacher,
    adress: receiveData.adress,
    score: receiveData.score,
  })
  // 自定义表单校验规则
  const customRules = reactive({
    course: {
      rules: [{
        required: true,
        errorMessage: '课程名不能为空'
      }]
    },
    teacher: {
      rules: [{
        required: false
      }]
    },
    adress: {
      rules: [{
        required: false
      }]
    },
    score: {
      rules: [{
        required: false,
        pattern: /-?[1-9]\d*/,
        errorMessage: '学分为数字'
      }]
    }
  })


  function handleCancelClick() {
    uni.navigateBack()
  }

  function handleConfirmClick() {
    const data = {
      weekday: customFormData.weekday,
      index: customFormData.index,
      course: customFormData.course,
      teacher: customFormData.teacher,
      adress: customFormData.adress,
      score: customFormData.score
    }
    setScheduleData(data)
    uni.navigateBack()
  }

  function handleDeleteClick() {
    const data = {
      weekday: customFormData.weekday,
      index: customFormData.index,
      course: customFormData.course,
      teacher: customFormData.teacher,
      adress: customFormData.adress,
      score: customFormData.score
    }
    deleteScheduleData(data)
    uni.navigateBack()
  }
</script>
<style lang="scss" scoped>
  .container {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    z-index: 999;

    .FormCard {
      width: 100%;
      height: 100%;
    }

    .example {
      padding: 15px;
      background-color: #fff;

      .segmented-control {
        margin-bottom: 15px;
      }

      .button-group {
        margin-top: 15px;
        display: flex;
        justify-content: space-evenly;
      }

      .form-item {
        display: flex;
        align-items: center;
      }
    }
  }
</style>
