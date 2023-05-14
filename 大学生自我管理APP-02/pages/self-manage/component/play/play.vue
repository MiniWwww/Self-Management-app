<template>
	<view class="wrap">
		<uni-card is-full :is-shadow="false">
					<text class="uni-h6">今天玩了什么呢</text>
		</uni-card>
		
		<uni-section title="(基本项目)" type="line" padding>
			<!--滑动换页-->
			<swiper class="swiper" :indicator-dots="true">
							<swiper-item>
					<uni-grid :column="3" :show-border="false" :square="false" @change="change">
						<uni-grid-item v-for="(item ,index) in list" :index="index" :key="index">
							<view class="grid-item-box">
								<image class="image" :src="item.url" mode="aspectFill" />
								<text class="text">{{item.text}}</text>
								<view v-if="item.badge" class="grid-dot">
									<uni-badge :text="item.badge" :type="item.type" />
								</view>
							</view>
						</uni-grid-item>
					</uni-grid>
					
					</swiper-item>
					
									<swiper-item>
							<uni-grid :column="3" :show-border="false" :square="false" @change="change2">
								<uni-grid-item v-for="(item ,index) in list2" :index="index" :key="index">
									<view class="grid-item-box">
										<image class="image" :src="item.url" mode="aspectFill" />
										<text class="text">{{item.text}}</text>
										<view v-if="item.badge" class="grid-dot">
											<uni-badge :text="item.badge" :type="item.type" />
										</view>
									</view>
								</uni-grid-item>
							</uni-grid>
							
							</swiper-item>
						</swiper>
		</uni-section>
		
				<uni-section title="动态更新" type="line" padding>
							<view class="grid-dynamic-box">
								<uni-grid :column="3" :highlight="true" @change="change" >
									<uni-grid-item v-for="(item, index) in dynamicList" :index="index" :key="index">
										<view class="grid-item-box" :style="{'backgroundColor':item.color}">
											<image :src="item.url" class="image" mode="aspectFill" />
											<text class="text">{{ item.text }}</text>
										</view>
									</uni-grid-item>
								</uni-grid>
							</view>
							<button type="primary" @click="inputModalToggle"><text
									class="button-text">添加新项目</text></button>
							<button v-if="dynamicList.length !== 0" type="primary" style="margin-top: 15px;"
								@click="del">点击删除新项目</button>
								
								<uni-popup ref="inputModal" type="dialog">
									<uni-popup-dialog ref="inputClose"  mode="input" title="输入事件名称" value="烧烤"
										placeholder="请输入内容" @confirm="dialogInputConfirm"></uni-popup-dialog>
								</uni-popup>		
							
							<!-- 新增 -->
				<!-- 
								<text class="dialog-text">输入内容：{{ value }}</text>
							<button type="primary" @click="inputDialogToggle"><text
									class="button-text">输入对话框</text></button> -->
									
							<!-- 输入框示例 -->
										<!-- <uni-popup ref="inputDialog" type="dialog">
											<uni-popup-dialog ref="inputClose"  mode="input" title="输入内容" value="对话框预置提示内容!"
												placeholder="请输入内容" @confirm="dialogInputConfirm"></uni-popup-dialog>
										</uni-popup> -->
									
				</uni-section>
				

				
	</view>
</template>

<script>
	
	export default {
			components: {},
			data() {
				return {
					// 新增
					value:'',
					dynamicList: [],
					list: [{
							url: '/static/Game.png',
							text: '打游戏',
							badge: '0',
							
							type: "primary"
						},
						{
							url: '/static/烧烤.png',
							text: '露营烧烤',
							badge: '1',
							type: "success"
						},
						{
							url: '/static/k歌.png',
							text: 'k歌',
							badge: '99',
							type: "warning"
						},
						{
							url: '/static/游乐园.png',
							text: '游园',
							badge: '0',
							type: "error"//type是角标的类型，比如errors红色的
						},
						{
							url: '/static/摄影.png',
							text: '摄影',
							badge:'0'
						},
						{
							url: '/static/艺术品.png',
							text: '看展',
							badge:'0'
						},
						{
							url: '/static/14-企业团建.png',
							text: '团建',
							badge:'0'
						},
						{
							url: '/static/密室预订.png',
							text: '密室逃脱',
							badge:'0'
						},
						{
							url: '/static/旅游.png',
							text: '旅游',
							badge:'0'
						}
					],
					
					list2: [{
							url: '/static/综合素质评价.png',
							text: '素拓',
							badge: '0',
							
							type: "primary"
						},
						{
							url: '/static/听歌.png',
							text: '听歌',
							badge: '1',
							type: "success"
						},
						{
							url: '/static/读小说.png',
							text: '看小说',
							badge: '99',
							type: "warning"
						},
						{
							url: '/static/电影.png',
							text: '看电影',
							badge: '0',
							type: "error"//type是角标的类型，比如errors红色的
						},
						{
							url: '/static/购物车空.png',
							text: '购物',
							badge:'0'
						},
						{
							url: '/static/画画.png',
							text: '画画',
							badge:'0'
						},
						{
							url: '/static/美食.png',
							text: '品尝美食',
							badge:'0'
						},
						{
							url: '/static/跳舞.png',
							text: '跳舞',
							badge:'0'
						},
						{
							url: '/static/桌球.png',
							text: '桌球',
							badge:'0'
						}
					]
				}
			},
			methods: {
				// 新增
				inputModalToggle() {
								this.$refs.inputModal.open()
							},
				inputDialogToggle() {
								this.$refs.inputDialog.open()
							},
							dialogClose() {
								console.log('点击关闭')
							},
							dialogInputConfirm(val) {
								uni.showLoading({
									title: '3秒后会关闭'
								})
				
				
								setTimeout(() => {
									uni.hideLoading()
									console.log(val)
									//将输入内容val存到value				
									this.value = val
									this.add(),
									// 关闭窗口后，恢复默认内容
									this.$refs.inputDialog.close()
									
								}, 3000)
							},
				change(e) {
					let {
						index
					} = e.detail
					this.list[index].badge && this.list[index].badge++
	
					uni.showToast({
						title: `点击第${index+1}个项目`,//$：当前
						icon: 'none'
					})
				},
				change2(e) {
					let {
						index
					} = e.detail
					this.list2[index].badge && this.list2[index].badge++
					
					uni.showToast({
						title: `点击第${index+1}个项目`,//$：当前
						icon: 'none'
					})
				},
				
				add() {
					if (this.dynamicList.length < 9) {
						this.dynamicList.push({
							url: `/static/${this.dynamicList.length+1}.png`,
							text: this.value,
							badge:'1',
							color: this.dynamicList.length % 2 === 0 ? '#f5f5f5' : "#fff"
						})
					} else {
						uni.showToast({
							title: '最多添加9个',
							icon: 'none'
						});
					}
				},
				del() {
					this.dynamicList.splice(this.dynamicList.length - 1, 1)
				}
			}
		}
</script>


	<style lang="scss">
		.image {
			width: 25px;
			height: 25px;
		}
	
		.text {
			font-size: 14px;
			margin-top: 5px;
		}
	
		.example-body {
			/* #ifndef APP-NVUE */
			// display: block;
			/* #endif */
		}
	
		.grid-dynamic-box {
			margin-bottom: 15px;
		}
	
		.grid-item-box {
			flex: 1;
			// position: relative;
			/* #ifndef APP-NVUE */
			display: flex;
			/* #endif */
			flex-direction: column;
			align-items: center;
			justify-content: center;
			padding: 15px 0;
		}
	
		.grid-item-box-row {
			flex: 1;
			// position: relative;
			/* #ifndef APP-NVUE */
			display: flex;
			/* #endif */
			flex-direction: row;
			align-items: center;
			justify-content: center;
			padding: 15px 0;
		}
	
		.grid-dot {
			position: absolute;
			top: 5px;
			right: 15px;
		}
	
		.swiper {
			height: 420px;
		}
	
		/* #ifdef H5 */
		@media screen and (min-width: 768px) and (max-width: 1425px) {
			.swiper {
				height: 630px;
			}
		}
	
		@media screen and (min-width: 1425px) {
			.swiper {
				height: 830px;
			}
		}
	
		/* #endif */
	
</style>
