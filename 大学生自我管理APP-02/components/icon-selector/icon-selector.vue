<template>
	<view style="position: relative;">
	 <!-- <button class="btn btn-primary btn-sm" @click="showIconSelector = !showIconSelector">选择图标</button> -->
	 <switch @change="showIconSelector = !showIconSelector" style="transform:scale(0.7); position: absolute; top: -35px; right: 5px;"/>
  <view class="icon-selector" v-show="showIconSelector">
     <view class="icon-item" v-for="(icon, index) in iconList" :key="index"  
	  @tap="handleIconSelect(icon)" :style="{width: iconWidth + 'rpx', marginRight: marginRight + 'rpx'}">
		 	<image :src="icon" class="icon-image"  @click="handleIconClick(index)"
      :class="{ 'active': activeIcon === index }"></image>
     </view>
   </view>
   </view>
</template>
<script>
export default {
  data() {
    return {
		activeIcon: null,
		showIconSelector: false, // 初始状态为隐藏
      iconList: [
        '/static/c1.png',
        '/static/c2.png',
        '/static/c3.png',
		'/static/c4.png',
		'/static/c5.png',
		'/static/c6.png',
		'/static/c7.png',
		'/static/c8.png',
		'/static/c9.png',
		'/static/c10.png',
		'/static/c11.png',
		'/static/c12.png',
		'/static/c13.png',
		'/static/c14.png',
		'/static/c15.png',
		'/static/c16.png',
		'/static/c17.png',
		'/static/c18.png',
		'/static/c19.png',
		'/static/c20.png',
		'/static/c21.png',
		'/static/c22.png',
		'/static/c23.png',
		'/static/c24.png',
		'/static/c25.png',
		'/static/c26.png',
		'/static/c27.png',
		'/static/c28.png',
		'/static/c29.png',
		'/static/c30.png',
		'/static/c31.png',
		'/static/c32.png',
		'/static/c33.png',
		'/static/c34.png',
		'/static/c35.png',
		'/static/c36.png',
        // 添加更多图标URL
      ]
    };
  },
  methods: {
    handleIconSelect(icon) {
      this.$emit('select', icon);
	  // this.activeIcon = icon;
    },
	handleIconClick(index) {
	   this.activeIcon = index;
	    //this.showIconSelector = false; // 选择完毕后隐藏选择器
		
		uni.showToast({
		         title: "选择成功！",
		         icon: 'success',
		         success: function (res) {
		          
		         },
		         fail: function (res) {
		           
		         },
		       });

	    }
  }
};
</script>

<style>
	.icon-selector {
	  display: flex;
	  flex-wrap: wrap;
	  justify-content: center;
	}
	.icon-item {
	  /* 设置每行显示 3 个图标 */
	  width: calc(33.33% - 10rpx); /* 宽度占比，减去间距 */
	   margin-right: 10rpx; /* 右侧间距 */
	   margin-bottom: 10rpx; /* 下方间距 */
	   display: flex;
	   justify-content: center;
	  /* background-color: aqua; */
	}
	
	
	.icon-image{
		padding: 3px;
		width: 30px;
		height:30px;
		margin: 3px;
	}
	.active {
	  /* 定义点击后的样式，例如修改背景颜色 */
	  
	  background-color: #e9e9e9;
	  border-radius: 50%;
	  border-style: solid;
	  border-width: 2px;
	  border-color: #009688;
	}
	
</style>