<template>
  <view class="uni-form-item-content">
    <view class="input-container">
      <uni-easyinput type="textarea" :placeholder="Description" v-model="Description"></uni-easyinput>
    </view>

  </view>
</template>

<script>
export default {
	onNavigationBarButtonTap:function(e){
		var that=this;
	                console.log(e.text);//提交
	
	                console.log(e.fontSize);//16px
					//返回上一页
					const eventChannel = that.getOpenerEventChannel();
					var that=this;
					{
						eventChannel.emit('newEvendescription', that.Description);
						console.log('editEventDescription界面成功返回数据给CountEvenTimes!', that.Description);
						
					
						uni.navigateBack();
					}
					
	 },
  data() {
    return {
		EventList:[
			
			
		],
		Description:String,
		
	};
  },
  onShow() {
  
  	var that = this;
	let Data=uni.getStorageSync('currentEventDescription');
  	that.Description=Data.currentDescription;
  	console.log(that.Description);
	
	
  
  },
  methods: {}
};
</script>

<style >
.input-container {
  width: 90%; /* 设置一个固定的宽度，例如80% */
  margin: 0 auto; /* 水平居中 */
  padding-top: 5%;
  padding-bottom: 5%;
}

</style>
