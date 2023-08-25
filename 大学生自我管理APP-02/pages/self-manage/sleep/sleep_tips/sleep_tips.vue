<template>
	<view>
		<uni-list>
			<uni-list-item show-arrow="true" link to="/pages/self-manage/sleep/harm-of-staying-up-late/harm-of-staying-up-late">
				<template v-slot:header>
					<image class="img" src="/static/熬夜.jpg" mode="aspectFill"></image>
				</template>
				<template v-slot:body>
					<text class="title">熬夜的危害</text>
				</template>
			</uni-list-item>
			<uni-list-item show-arrow="true" link to="/pages/self-manage/sleep/save/save">
				<template v-slot:header>
					<image class="img" src="/static/熬夜冠军.jpg" mode="aspectFill"></image>
				</template>
				<template v-slot:body>
					<text class="title">熬夜补救指南</text>
				</template>
			</uni-list-item>
			<uni-list-item show-arrow="true" link to="/pages/self-manage/sleep/help/help">
				<template v-slot:header>
					<image class="img" src="/static/睡觉.jpg" mode="aspectFill"></image>
				</template>
				<template v-slot:body>
					<text class="title">助眠小技巧</text>
				</template>
			</uni-list-item>
			<uni-list-item show-arrow="true" link to="/pages/self-manage/sleep/tips-for-insomnia/tips-for-insomnia">
				<template v-slot:header>
					<image class="img" src="/static/失眠.jpg" mode="aspectFill"></image>
				</template>
				<template v-slot:body>
					<text class="title">失眠小妙招</text>
				</template>
			</uni-list-item>
		</uni-list>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style>
	.tips_box{
		justify-content: center;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.tips_item{
		width: 90%;
		background-color: #f4f4f4;
		border-radius: 10px;
		margin: 8px;
		height: 50px;
	}
	.img{
		flex-shrink: 0;
		margin-right: 10px;
		width: 80px;
		height: 80px;
		border-radius: 6px;
		overflow: hidden;
		border:1px #f5f5f5 solid;
	}
	.title{
		display: flex;
		flex-direction: row;
		align-items: center;
	}
</style>
