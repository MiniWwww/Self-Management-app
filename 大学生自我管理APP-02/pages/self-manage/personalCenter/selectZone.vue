<template>
	
	<uni-indexed-list :options="citylist" :show-select="true" @click="bindClick" />
</template>

<script>
	import city from '/pages/self-manage/personalCenter/city.js'
	export default {
		components: {},
		
		data() {
			return {
				mydata:{
				zone:''
				},
				citylist: city.list,
			}
		},
		methods: {
			bindClick(e) {
				console.log('点击item，返回数据' + JSON.stringify(e));
				console.log(e.item.name);
				
				
				var that = this;
				that.mydata.zone=e.item.name;
							const eventChannel = that.getOpenerEventChannel();
				
							{
								eventChannel.emit('editZone', that.mydata);
								console.log('selectZone界面成功返回数据给PersonalCenter!', that.mydata);
								uni.navigateBack()
								
							}
				
						
			}
		}
	}
</script>

<style>
</style>