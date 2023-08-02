<template>
	<!--<view class="page" @touchstart="touchStart" @touchend="touchEnd">-->
	<view class="page">
		<form>
			<view class="uni-textarea">
				<textarea placeholder="这一刻的想法..." v-model="input_content" />
				</view>
			<view class="uni-list list-pd">
				<view class="uni-list-cell cell-pd">
					<view class="uni-uploader">
						<view class="uni-uploader-head">
							<view class="uni-uploader-title"></view>
							<view class="uni-uploader-info">{{imageList.length}}/9</view>
						</view>
						<view class="uni-uploader-body">
							<view class="uni-uploader__files">
								<block v-for="(image,index) in imageList" :key="index">
									<view class="uni-uploader__file" style="position: relative;">
										<image class="uni-uploader__img" mode="aspectFill" :src="image" :data-src="image" @tap="previewImage"></image>
										<view class="close-view" @click="close(index)">×</view>
									</view>
								</block>
								<view class="uni-uploader__input-box" v-show="imageList.length < 9">
									<view class="uni-uploader__input" @tap="chooseImage"></view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			
			<view class="footer">
				<button type="default" class="feedback-submit" @click="publish">提交</button>
			</view>
		</form>
	</view>
</template>

<script>
	import image from '@/common/image.js'; //压缩图片
	import mytime from '../mytime.js'; //时间格式的处理
	
	var sourceType = [
		['camera'],
		['album'],
		['camera', 'album']
	]
	var sizeType = [
		['compressed'],
		['original'],
		['compressed', 'original']
	]
	export default {
		data() {
			return {
				input_content:'',
				imageList: [],
				
				
				sourceTypeIndex: 2,
				sourceType: ['拍照', '相册', '拍照或相册'],
				sizeTypeIndex: 2,
				sizeType: ['压缩', '原图', '压缩或原图'],
				countIndex: 8,
				count: [1, 2, 3, 4, 5, 6, 7, 8, 9]
			}
		},
		onUnload() {
			this.imageList = [],
			this.sourceTypeIndex = 2,
			this.sourceType = ['拍照', '相册', '拍照或相册'],
			this.sizeTypeIndex = 2,
			this.sizeType = ['压缩', '原图', '压缩或原图'],
			this.countIndex = 8;
		},
		
		methods: {
			async publish(){
				if (!this.input_content) {
					uni.showModal({
						content: '内容不能为空',
						showCancel: false,
					});
					return;
				}
				
				uni.showLoading({title:'发布中'});
				
				var images = [];
				for(var i = 0,len = this.imageList.length; i < len; i++){
					//var image_obj = {name:'image-'+i,url:this.imageList[i]};
					//images.push(image_obj);
					images.push(this.imageList[i]);
				}
				console.log("发布的图片集合",images);
				
				this.send(this.input_content,images);
				
				//使用uni.uploadFile传输数据到服务器？-----------------------------------------------待考虑
				/*
				uni.uploadFile({
					url: 'moment/moments', //上传到的服务器接口地址……
					files:images, //有files时,会忽略filePath和name
					filePath: '',
					name: '',
					formData: { //后台以post方式接收
						'user_id': 2, //自己系统中的用户id
						'text': this.input_content //moment文字部分
					},
					success: (uploadFileRes) => {
						uni.hideLoading();
						uni.showToast({
							icon:'success',
							title:"发布成功"
						})
						uni.navigateBack({ //返回上级页面
							delta:1
						});
					},
					fail: (e) => {
						console.log("e: " + JSON.stringify(e));
						uni.hideLoading();
						uni.showToast({
							icon:'none',
							title:"发布失败,请检查网络"
						})
					}
				});
				*/
			},
			
			send(text,images) { //向self-record页面传递数据
				let usr_data = {
					"uid": 2,
					"username": "我",
					"header_image": "/static/self-record/user-head.png",
					"content": {
						"text": text,
						"images": images
					},
					"islike": 0,
					"like": [{
							"uid": 1,
							"username": "系统"
						}
					],
					"comments": {
						"total": 0,
						"comment": []
					},
					"timestamp": mytime.traversalTime(new Date().getTime())
				}
				
				uni.$emit('publish', usr_data); //此处uni.$emit一旦发生，上级页面的uni.$on立即响应，然后才会回来执行下面的代码
				console.log('publish页面发布新记录',usr_data);
				
				uni.navigateBack({
					delta:1
				});
			},
			
			close(e){
			    this.imageList.splice(e,1);
			},
			
			chooseImage: async function() {
				if (this.imageList.length === 9) {
					let isContinue = await this.isFullImg();
					console.log("是否继续?", isContinue);
					if (!isContinue) {
						return;
					}
				}
				uni.chooseImage({
					sourceType: sourceType[this.sourceTypeIndex],
					sizeType: sizeType[this.sizeTypeIndex],
					count: this.imageList.length + this.count[this.countIndex] > 9 ? 9 - this.imageList.length : this.count[this.countIndex],
					success: (res) => {

						// #ifdef APP-PLUS
						//提交压缩,因为使用了H5+ Api,所以自定义压缩目前仅支持APP平台
						var compressd = cp_images=> {
							this.imageList = this.imageList.concat(cp_images)//压缩后的图片路径
						}
						image.compress(res.tempFilePaths,compressd);
						// #endif
						
						// #ifndef APP-PLUS
						this.imageList = this.imageList.concat(res.tempFilePaths)//非APP平台不支持自定义压缩,暂时没有处理,可通过uni-app上传组件的sizeType属性压缩
						// #endif
					}
				})
			},
			
			isFullImg: function() {
				return new Promise((res) => {
					uni.showModal({
						content: "已经有9张图片了,是否清空现有图片？",
						success: (e) => {
							if (e.confirm) {
								this.imageList = [];
								res(true);
							} else {
								res(false)
							}
						},
						fail: () => {
							res(false)
						}
					})
				})
			},
			
			previewImage: function(e) {
				var current = e.target.dataset.src
				uni.previewImage({
					current: current,
					urls: this.imageList
				})
			}
		}
	}
</script>

<style scoped>
	
	@import url("../../../common/uni.css"); /*部分样式在该CSS文件中*/
	
	.footer {
		margin-top: 80upx;
	}
	
	.cell-pd {
		padding: 20upx 30upx;
	}

	.uni-textarea {
		width: auto;
		padding: 20upx 25upx;
		line-height: 1.6;
		height: 150upx;
	}
	.uni-list::before {
		height: 0;
	}
	.uni-list::after {
		height: 0;
	}
	.list-pd {
		margin-top: 0;
	}
	.close-view{
	    text-align: center;
		line-height:30upx;
		height: 35upx;
		width: 35upx;
		background: #ef5350;
		color: #FFFFFF;
		position: absolute;
		top: 1upx;
		right: 1upx;
		font-size: 35upx;
		border-radius: 8upx;
	}
	.page {
		width: 750upx;
		height: 100%;
	}
</style>