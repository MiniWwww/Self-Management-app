<template>
  <!-- <uni-card v-for="(item ,index) in EventList" :index="item.Today" :key="index" >
	  <view class="DATAbox">
		  <text class="dataText">
			  {{item.Ev}}
		  </text>
	  	
	  </view>
	  
  </uni-card> -->
  
	
</template>

<script>
	
	export default {
		data() {
			return {
				
				EventList:[],

			}

		},

//生命周期函数监听页面显示
		onShow() {
			this.getEventData();
			
			
		},

		methods: {
			
			getEventData(){
				
				let sportContent = uni.getStorageSync('playEventData')
				this.EventList=sportContent
				console.log(this.EventList)
			}

			
		}
	}
</script>

<style>
	.dataText{
		background-color: red;
	}
</style>