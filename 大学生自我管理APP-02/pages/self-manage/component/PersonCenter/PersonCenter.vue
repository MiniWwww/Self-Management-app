<template>
	<view>
		<!-- 头部-->
		<view class="head">
			<!-- 背景图片 -->
			<view class="head-background-pic">
				<image @click="onuploadphoto" src="../../../../static/night.png" mode=""></image>
			</view>
			<!-- 头像和昵称-->
			<view class="head-logo">

				<view class="head-logo-pic">
					<image @click="onuploadphoto" src="../../../../static/sun.png" mode="aspectFill"></image>
				</view>
				<text class="my-name" @click="changeNickName">我的昵称</text>
				<input type="text" placeholder="请输入我的昵称" class="myNickname">

			</view>
			<!-- 个人信息如性别年龄 -->
			<view class="my-data">

				<view class="my-data-box">
					<text class="my-data-box-title">姓名</text>
					<input type="text">
				</view>

				<view class="my-data-box">
					<text class="my-data-box-title">性别</text>
					<input type="text">
				</view>

				<view class="my-data-box">
					<text class="my-data-box-title">年龄</text>
					<input type="number">
				</view>

			</view>


		</view>

		<uni-list-item title="昵称" rightText="Corley" showIcon clickable :icon="iconType">
		</uni-list-item>
	</view>

</template>

<script>
	import uniListItem from '../../../../uni_modules/uni-list/components/uni-list/uni-list.vue';
	export default {
		data() {
			return {

				iconType: 'compose',

			}

		},
		components: {
			uniListItem
		},


		methods: {
			onuploadphoto() {
				uni.chooseImage({
					count: 1,
					sizeType: ["compressed"],
					sourceType: ["album", "camera"],
					success: (res) => {
						console.log(res);
						this.userpic = res.tempFilePaths[0]
					}
				})
			},





		}
	}
</script>

<style lang="scss">
	page {
		background: #f5f5f5;
	}

	.head {
		position: relative;
		padding-bottom: 15px;

		.head-background-pic {
			position: absolute;
			top: 0;
			right: 0;
			bottom: 0;
			left: 0; //撑开
			filter: blur; //模糊
			opacity: 0.3; //透明度

			image {
				width: 100%;
				height: 100%;
			}
		}

		.head-logo {


			flex-direction: column; //垂直排列
			with: 750rpx;

			text-align: center;
			align-items: center; //垂直居中
			justify-content: center; //水平居中（这个不要也行）
			display: flex; //这句话一定要写在align-item ：center后面才能居中
			padding-top: 30px;

			.myNickname {
				width: 120px;
				font-size: 16px;

			}

			.head-logo-pic {


				width: 60px;
				height: 60px;
				border-radius: 50%;
				overflow: hidden; //隐藏溢出

				image {

					width: 100%;
					height: 100%;
				}
			}

			.my-name {
				margin-top: 15px;
				font-size: 16px;
				font-weight: bold;
				margin-bottom: 15px;
			}
		}

		.my-data {
			margin-top: 15px;
			display: flex; //子元素横向排

			.my-data-box {

				flex-direction: column; //让两个text子元素竖着排
				justify-content: center;
				align-items: center;
				display: flex;
				width: 100%;
				font-size: 15px;
				color: #999;

				.my-data-box-title {
					font-size: 14px;
					color: #333;
				}
			}
		}

	}
</style>
