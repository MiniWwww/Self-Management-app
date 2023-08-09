<template>
  <view class="content">
    <uni-table border stripe emptyText="暂无更多数据">
      <!-- 星期 -->
      <uni-tr>
        <uni-th width="1"></uni-th>
        <uni-th align="center" v-for="item in weekdays" :keyt="item.id" width="1">{{ item.title }}</uni-th>
      </uni-tr>
      <!-- 表格数据行 -->
      <uni-tr v-for="item in duration">
        <uni-td style="font-size: 8px;">
          <view>第{{ item.index }}节</view>
          <view>{{ item.title }}</view>
        </uni-td>
        <uni-td v-for="n in 5" :key="n" @click="$event => addCourse(item.index, n, '新增课程')"
          style="padding: 0; margin: 0;">
          <view @click.stop="">
            <Card v-if="singleBox[item.index + '_' + n]" :data="singleBox[item.index + '_' + n]"
              @click="$event => editCourse(item.index, n, '编辑课程', singleBox[item.index + '_' + n])"></Card>
          </view>
        </uni-td>
      </uni-tr>
    </uni-table>
  </view>
</template>

<script setup>
  import {
    onMounted,
    onUpdated,
    reactive,
    ref,
    toRefs
  } from 'vue'
  import {
    getInitialData,
    setScheduleData
  } from './scripts/service.js'
  import {
    useInitialData
  } from './scripts/hooks.js'
  import weekdays from '../../data/week.js'
  import Card from './Card.vue'

  const [
    data,
    setInitialData,
    editSchedule,
    addSchedule
  ] = useInitialData()

  onMounted(async () => {
    setInitialData(await getInitialData())
  })

  onUpdated(() => {
    console.log(触发onUpdated)
  })

  let cardData = reactive({
    course: '',
    teacher: '',
    adress: '',
    score: ''
  })

  const addCourse = (index, weekday, formType) => {
    uni.navigateTo({
      url: '/pages/index/components/MessageBox/index'
    })
    uni.$emit('addCourse', {
      msg: {
        formType,
        weekday,
        index,
        btnCancelText: '取消',
        btnConfirmText: '确定',
      }
    })
  }

  const editCourse = (index, weekday, formType, singleBoxData) => {
    uni.navigateTo({
      url: '/pages/index/components/MessageBox/index'
    })
    uni.$emit('editCourse', {
      msg: {
        formType,
        weekday,
        index,
        course: singleBoxData.course,
        teacher: singleBoxData.teacher,
        adress: singleBoxData.adress,
        score: singleBoxData.score,
        btnCancelText: '取消',
        btnConfirmText: '确定',
        btnDeleteText: '删除'
      }
    })
  }
  const {
    duration,
    singleBox
  } = toRefs(data)
</script>
