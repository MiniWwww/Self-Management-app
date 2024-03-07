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
				count: [1, 2, 3, 4, 5, 6, 7, 8, 9],
				
				my_saved_Pictures: []  //保存uni.saveFile保存到本地后的返回参数（即图片本地存储路径列表）
			}
		},
		onUnload() {
			this.my_saved_Pictures = [];
			
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

				/*
				//临时：查看一下保存到本地的都有什么了
				uni.getSavedFileList({
					success:function(res){
						console.log("看一下目前本地存储的东西有什么：",res.fileList);
					},
					fail() {
						console.log("查看目前本地存储失败！");
					}
				});*/
				
				console.log("------现在进入publish过程------");
				console.log("现在的图片列表长度为：" + this.imageList.length);
				console.log("其内容为：", this.imageList);
				
				var images = [];
				for(var i = 0,len = this.imageList.length; i < len; i++){  //把imageList内容循环放入images数组
					//var image_obj = {name:'image-'+i,url:this.imageList[i]};
					//images.push(image_obj);
					images.push(this.imageList[i]);
				}
				console.log("发布的图片集合",images);
				
				
				
				//var that = this;
				
				//下面准备进行图片路径的本地存储？------------------------------------------------？？？？？
				for(var j = 0,len = images.length; j < len; j++) {
					var my_tempFilePath = images[j];
					console.log("当前j为：" + j + ",当前my_tempFilePath为：" + my_tempFilePath);
					
					await this.my_save(my_tempFilePath, j, this.my_saved_Pictures);
					/*
					uni.saveFile({
					     tempFilePath: my_tempFilePath,
					     success: function (res) {
							 console.log("发布页图片" + j + "永久保存本地，路径为：" + res.savedFilePath);
							 
							 that.my_saved_Pictures[j] = res.savedFilePath;  //把这个保存到本地的图片路径放入数组my_saved_Pictures
					     }
					   });
					*/
				}
				//uni.setStorageSync('my_saved_Pictures',that.my_saved_Pictures);  //同步保存背景路径，以便于新发布数据传到父页面后，据此更换其中的图片路径
				//console.log("看一下保存到本地的发布页图片路径：" + uni.getStorageSync('my_saved_Pictures'));  //看一下…
				console.log("for循环结束，看一下my_saved_Pictures数组内容：",this.my_saved_Pictures);
				
				var that = this;
				setTimeout( function() {
					console.log("------下面准备页面间传递数据------");
					that.send(that.input_content,images);
				}, 500);
				
				
				
				/*
				console.log("------下面准备页面间传递数据------");
				this.send(this.input_content,images);
				*/
				
				//使用uni.uploadFile传输数据到服务器？-----------------------------------------------不考虑了
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
			
			
			my_save(temp,index,array) {
				uni.saveFile({
				     tempFilePath: temp,
				     success: function (res) {
						 console.log("发布页图片" + index + "永久保存本地，路径为：" + res.savedFilePath);
						 
						 var one_saved = res.savedFilePath;
						 array.push(one_saved);
						 console.log("******看一下my_saved_Pictures数组：",array);
						 //var one_saved = res.savedFilePath;
						 //var that = this;
						 //that.my_saved_Pictures.push(one_saved);  //把这个保存到本地的图片路径放入数组my_saved_Pictures
						 //console.log("******看一下my_saved_Pictures数组：",that.my_saved_Pictures);
				     },
					 fail(err) {
					 	console.log("！！！！！！uni.saveFile失败！！！！！！");
					 }
				   });
			},
			
			
			
			send(text,images) { //向self-record页面传递数据
				//-----------------------------------------------------------------!!!!!
				console.log("看一下my_saved_Pictures数组有没有存好本地存储路径：",this.my_saved_Pictures);//好像可以了！！！
				let savedImg = this.my_saved_Pictures;//下面把消息内容的图片路径换成本地存储的路径再传送数据
				
				let avator = uni.getStorageSync('avator')
				let userInfo = uni.getStorageSync('userInfo')
				let usr_data = {
					"uid": 2,
					"username": userInfo.nickname,
					"header_image": avator,
					"content": {
						"text": text,
						//"images": images
						"images": savedImg
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
					//sourceType: sourceType[this.sourceTypeIndex],
					//sizeType: sizeType[this.sizeTypeIndex],
					sourceType:["album", "camera"],
					sizeType:["compressed"],
					count: this.imageList.length + this.count[this.countIndex] > 9 ? 9 - this.imageList.length : this.count[this.countIndex],
					success: (res) => {
						
						//console.log("发布页，选择的图片数量：",this.imageList.length);//错，此时imageList.length是0，所以下面的循环也不会执行
						console.log("尚未保存本地，查看选择图片的路径：",res);
						
						//this.imageList = res.tempFilePaths;
						//var my_TempFilePaths = res.tempFilePaths;
						
						/*
						//接下来对选中的每张图片的路径进行保存到本地------------------------------------------？？？
						var my_TempFilePaths = [];
						var i = 0;
						for( ; i<this.imageList.length ; i++ ) {
							console.log("进入循环，i=" + i);
							this.imageList[i] = res.tempFilePaths[i];
							my_TempFilePaths[i] = res.tempFilePaths[i];
							
							uni.saveFile({
								tempFilePath: my_TempFilePaths[i],
								success: function(res) {
									console.log("------发布页面所选图片" + i + "已永久保存到本地，路径为：" + res.savedFilePath)
									
									//var my_publish_savedFilePath = res.savedFilePath;
									//选择图片同时保存图片路径到本地 错！ 下面这句如果要的话，待改
									//uni.setStorageSync("my_publish_savedFilePath",my_publish_savedFilePath);
								},
								fail: function(res) {
									console.log("发布页面图片保存到本地失败！");
								}
							});
						}
						console.log("啦啦啦------------定位-------------啦啦啦")
						*/
						
						
						
					
						// #ifdef APP-PLUS
						//提交压缩,因为使用了H5+ Api,所以自定义压缩目前仅支持APP平台
						var compressd = cp_images=> {
							this.imageList = this.imageList.concat(cp_images)//压缩后的图片路径
						}
						image.compress(res.tempFilePaths,compressd);//引入了common/image.js，称为image，调用其中的compress函数
						console.log("原写法，经过压缩，图片路径为：" + this.imageList);//这里在控制台输出的是空的……
						console.log("原写法，经过压缩，uni.chooseImage返回参数为：" + res.tempFilePaths);//这个有输出
						// #endif
						
						// #ifndef APP-PLUS
						this.imageList = this.imageList.concat(res.tempFilePaths);//非APP平台不支持自定义压缩,暂时没有处理,可通过uni-app上传组件的sizeType属性压缩
						console.log("原写法，没有压缩，图片路径为：" + this.imageList);
						console.log("原写法，没有压缩，uni.chooseImage返回参数为：" + res.tempFilePaths);
						// #endif
						
						
						var res_len = res.tempFilePaths.length;
						console.log("uni.chooseImage返回参数的长度：" + res_len);
						var list_len = this.imageList.length;
						console.log("此时imageList长度：" + list_len);
						
						
						
						
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