<template>
  <view>
    <SqTimetable @click="getCourse" :time="time" :image="image" :timeColor="timeColor" :courseList="courseList"
      :showNotWeek="true" :week="12"></SqTimetable>
  </view>
</template>

<script setup>
  import SqTimetable from '@/components/sq-timetable/sq-timetable.vue';
  import {
    ref
  } from 'vue';

  const time = [
    ['8:20', '9:00'],
    ['9:05', '9:45'],
    ['10:00', '10:40'],
    ['10:45', '11:25'],
    ['11:30', '12:10'],
    ['13:30', '14:10'],
    ['14:15', '14:55'],
    ['15:10', '15:50'],
    ['15:55', '16:35'],
    ['16:40', '17:20'],
    ['18:00', '18:40'],
    ['18:45', '19:25'],
    ['19:40', '20:20'],
    ['20:25', '21:05']
  ];

  const image =
    'https://img04.sogoucdn.com/app/a/100520093/ca86e620b9e623ff-f4709b64c5c0ee80-852ef8b2f248787b2f289ae80f88038c.jpg';
  const colorArrays = ['#70eb55', '#ffc450', '#ff9bd7', '#86affe', '#58eea4', '#ffa17d', '#1cbbb4', '#6964ad',
    '#d42245', '#218285'
  ];
  const timeColor = '#000000';

  const courseList = ref([{
      id: 1000,
      begin: 2,
      end: 4,
      week: 2,
      name: '面向对象-JAVA实践教学',
      week_begin: 8,
      week_end: 8, //只在第8周有课
      place: '理泽楼314',
      teacher: '陆师'
    },
    {
      id: 1001,
      begin: 1,
      end: 3,
      week: 4,
      name: '计算机网络（双语）',
      week_begin: 1,
      week_end: 16, //在第1-到第16周有课
      place: '理泽楼315',
      teacher: '刘师'
    }
  ]);

  const getCourse = (item) => {
    console.log(item);
  };
</script>

<style>
  /* Your styles go here */
</style>
