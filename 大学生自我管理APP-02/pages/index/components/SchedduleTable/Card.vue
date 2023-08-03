<template>
  <uni-card :is-full="true" padding="2px 0">
    <text class="course">{{ data.course }}</text>
    <br>
    <text class="teacher">{{ data.teacher }}</text>
    <br>
    <text class="adress">{{ data.adress }}</text>
    <br>
    <text class="score">{{ data.score }}学分</text>
  </uni-card>
</template>

<script setup>
  const props = defineProps({
    data: Object
  })
</script>

<style lang="scss">
  .course {
    font-size: 10px;
    font-weight: 700;
  }

  .teacher {
    font-size: 8px;
  }

  .adress {
    font-size: 8px;
  }

  .score {
    font-size: 8px;
  }
</style>
