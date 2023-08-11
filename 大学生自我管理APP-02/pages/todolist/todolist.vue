<template>
	<view class="content">
		<view class="todo-header">
			<!-- 状态栏左侧 -->
			<view class="todo-header_left">
				<text class="active-text">{{ text }}</text>
				<text>{{ listData.length }}条</text>
			</view>
			<!-- 状态栏右侧 -->
			<view class="todo-header_right" v-for="(item, index) in tabList" :key="index">
				<view class="todo-header_right-item" :class="{ 'active-tab': tabIndex == index }" @click="tabClick(item, index)">{{ item }}</view>
			</view>
		</view>
		<!-- 没有数据的状态 -->
				<view v-if="listData.length === 0" class="default">
					
					<view class="default-info">
						
						<view class="default-info__text">请点击下方按钮创建事项</view>
					</view>
				</view>
			
			
       <view class="todo-content" style="z-index: 0" v-for="(item, index) in listData" :key="item.title">
       	
		 <view class="todo-list" :style="{ backgroundColor: item.color }" :class="{ 'todo--finish': item.select }" @click="childItem(item, index)">	
       		<view class="todo-list_checkbox"><view class="checkbox"></view>
			</view>
       		<view class="todo-list_content">{{ item.title }}</view>
			<view class="todo-list_mark">{{ item.mark }}</view>
			<view class="todo-list_date">{{ item.date }}</view>
			 
		
		<view class="todo-list_cycles">{{item.cycletime}}</view>
		
        <!-- 新增删除按钮 -->
        <view class="delete-btn" @click.stop="deleteEvent(item, index)">x</view>
		
      </view>
	  
    </view>
	
    <SimpleDateTimePicker
      ref="myPicker"
      @submit="handleSubmit"
      :start-year="2023"
      :end-year="2030"
    />
	
    <!-- 字体图标 -->
    <view class="create-todo" @click="creat"><text class="iconfont iconhao1" :class="{ 'create-todo-active': tetxShow }"></text></view>
    <!-- 输入框 -->
    <view class="create-content" style="z-index: 1" v-if="activeInput" :class="{ 'create-show': tetxShow }">
      <view class="create-content-box">
        <view class="create-input"><input type="text" v-model="InputValue" placeholder="请输入你要创建的事项" /></view>
	 <!-- 新增备注输入框 -->
		    <view class="mark-input"><input type="text" v-model="remark" placeholder="请输入备注信息" /></view>
		<!-- 类型选择器 -->
		<picker :value="eventTypeIndex" :range="eventTypeNames" mode="selector" @change="handleEventTypeChange">
		  <view class="event-type-selector">
		    <text>请选择类型:</text>
		    <text>{{ eventTypeNames[eventTypeIndex] }}</text>
		  </view>
		</picker>
		
		 <view class="tab-box">
		      <view :class="{ active: option === 'deadline' }" @click="switchOption('deadline')">设置截止时间</view>
		      <view :class="{ active: option === 'cycle' }" @click="switchOption('cycle')">设置周期时间</view>
		    </view>
		<!-- 截止日期选择器 -->
		<view v-if="option === 'deadline'">
        <view class="create-date" @click="openDatetimePicker">{{ buttonText }}</view>
		</view>
        <!-- 周期时间选择器 -->
		<view v-if="option === 'cycle'">
       <picker mode="time" :value="time" @change="onChange">
		  <view class="cycletime-selector">
		    <text>请选择周期时间 </text>
		    <text>{{time }}</text>
		  </view>
	   </picker>
        
      
		<!-- 多选，循环遍历填充数据 -->
        <view class="list-box">
            <view v-for="(item,index) in list1" :key="index" @click="choice(index)" :class="[item.selected?'selde':'noselde']">
                {{item.selected?item.title:item.title}}
            </view>
        	</view>
       </view>
		
		<view class="creat-button" @click="submitInput">创建</view>
      </view>
    </view>
  </view>
</template>

<script>
	import SimpleDateTimePicker from "./buuug7-simple-datetime-picker.vue";

const EVENT_TYPES = [
  {
    name: '作业',
    color: '#FFB6C1'
  },
  {
	  name: '考试',
	  color: '#fca800'
    
  },
  {
    name: '运动',
    color: '#90EE90'
  },
  {
    name: '娱乐',
    color: '#ADD8E6'
  },
  {
    name: '社会工作',
    color: '#aaaaff'
  }
];
export default {
  components: {
    SimpleDateTimePicker,
  },
  data() {
  		return {
			 option: 'deadline', // 默认选项为截止日期
  			InputValue: '',
			remark:'',
  			activeInput: false,
  			tabIndex: 0,
  			tetxShow: false,
  			text: '全部',
  			tabList: ['全部','今天', '作业', '考试','运动','娱乐','社会工作'],
  			list: [
  			  { title: '学习java',mark:'图书馆', select: true, color: '#FFB6C1',cycletime: '周一, 周三, 周五 20:30' },
  			  { title: '看电影',mark:'电影院', select: true,color: '#ADD8E6',date: '2023-05-16 11:10',},
  			  { title: '打篮球',mark:'一期操场',select: false, color: '#90EE90',cycletime:'每日 14:00',cycles:["每日"] },
  			  { title: '义工活动',mark:'养老院',  select: false, color: '#aaaaff',cycletime:'周六, 周日 9:30',cycles:["周六","周日"] },
			 { title: '高数考试',mark:'学武楼', day:'2023-05-21',select: false,color: '#fca800', date: '2023-05-21 8:00', },
  			],
		    day:"",
			// 选择的日期，格式为yyyy-MM-dd HH:mm
			selectedDate: "",
			  time: "",
			// 按钮名称，默认为"选择时间"
			buttonText: "请选择截止时间",
			name1:"",
			//定义前端选中的值
				selectList:"",
				//给标签赋值
			    list1: [
			        {
			            selected: false,
			            title: '每日'
			        },
			        
			        {
			            selected: false,
			            title: '周一'
			        },
			        {
			            selected: false,
			            title: '周二'
			        }, {
			            selected: false,
			            title: '周三'
			        }, {
			            selected: false,
			            title: '周四'
			        },
					{
					    selected: false,
					    title: '周五',
						
					},
					{
					    selected: false,
					    title: '周六'
					},
					{
					    selected: false,
					    title: '周日'
					}
			    ],
			    selectId: [],
			
			eventTypeIndex: 0,
			eventTypeNames: EVENT_TYPES.map(item => item.name),
			eventTypeColors: EVENT_TYPES.map(item => item.color),
			percent: 50,
			isAlertShown: false, // 新的属性：弹窗是否已经弹出
  		};
  	},
	
  	onLoad() {},
  	computed: {
  		listData() {
  			let list = JSON.parse(JSON.stringify(this.list)); //拷贝对象
  			let newList = [];
			const date = new Date();
			const year = date.getFullYear();
			const month = date.getMonth() + 1;
			const day = date.getDate();
			const today = year + '-' + (month < 10 ? '0' + month : month) + '-' + (day < 10 ? '0' + day : day);
		 const todayWeekday = '周' + ['日', '一', '二', '三', '四', '五', '六'][new Date().getDay()];
			
			
  			//点击全部
  			if (this.tabIndex == 0) {
				
  				  return list;
  			}
  			
  			else if (this.tabIndex == 2) {
  				list.forEach(v => {
  					if (v.color=='#FFB6C1') {
  						newList.push(v);
  					}
  				});
  				return newList;
  			}
  			
  			else if (this.tabIndex == 3) {
  				list.forEach(v => {
  					if (v.color=='#fca800') {
  						newList.push(v);
  					}
  				});
  				return newList;
  			}
			else if (this.tabIndex == 4) {
				list.forEach(v => {
					if (v.color=='#90EE90') {
						newList.push(v);
					}
				});
				return newList;
			}
			else if (this.tabIndex == 5) {
				list.forEach(v => {
					if (v.color=='#ADD8E6') {
						newList.push(v);
					}
				});
				return newList;
			}
			else if (this.tabIndex == 6) {
				list.forEach(v => {
					if (v.color=='#aaaaff') {
						
						newList.push(v);
					}
				});
				return newList;
			}
			else if (this.tabIndex == 1) {
			    list.forEach(v => {
			    if(v.day && v.day==today) {
			    			newList.push(v);
			    		} 	
				if(v.cycles && v.cycles.includes("每日")) {
							newList.push(v);
						} 
			   
			if(v.cycles && v.cycles.includes(todayWeekday)) {
						newList.push(v);
					} 
			});
    return newList;
  }
}

  	},
  	methods: {
		//选择按钮
		    choice(index) {
				//当再次被选中时，取消当前选中项
		        if (this.list1[index].selected == true) {
		            this.list1[index].selected = false;
		            //取消选中时删除数组中的值
		            for (var i = 0; i < this.selectId.length; i++) {
		                if (this.selectId[i] === this.list1[index].title) {
		                    this.selectId.splice(i, 1);
							
		                }
		            }
					this.selectList=this.selectId
		            console.log("选中的值", this.selectId)
		        } else {
		            this.list1[index].selected = true;
		            this.selectId.push(this.list1[index].title)
					for (var i=0;i<this.selectId.length;i++) {
						console.log("选中的值", this.selectId[i])
					}
					this.selectList=this.selectId
		            console.log("选中的值", this.selectId)
					console.log(typeof this.selectId)
		        }
				
		    },
		
  		//切换tab
  		tabClick(item, index) {
  			this.text = item;
  			this.tabIndex = index;
  		},
  		
 // 切换选项卡
    switchOption(newOption) {
      if (this.option !== newOption) {
        this.option = newOption

        // 切换选项卡后，将另一个选项的相关数据清空
        if (newOption === 'deadline') {
          this.list1[0].selected =false;
           this.list1[1].selected =false;
           this.list1[2].selected =false;
          this.list1[3].selected =false;
           this.list1[4].selected =false;
            this.list1[5].selected =false;
            this.list1[6].selected =false;
            this.list1[7].selected =false;
		  this.time ="";
		 this.selectId=[];
		 this.selectList="";
        } else if (newOption === 'cycle') {
         this.buttonText = '请选择截止日期';
         this.selectedDate="";
        }
      }
    },

    
    // 点击打开添加待办事项表单
    creat() {
      this.activeInput = true;
      this.tetxShow = !this.tetxShow;
    },
    // 点击关闭添加待办事项表单
    close() {
      this.InputValue = "";
      this.activeInput = false;
	  
    },
   childItem(item, index) {
     // 获取点击事件的名字
     const eventName = item.title;
     // 遍历 list 数组
     this.list.forEach((event, i) => {
       // 如果找到了名字一样的事件
       if (event.title === eventName) {
         // 切换状态
         event.select = !event.select;
         // 更新 list 数组
         this.$set(this.list, i, event);
       }
     });
   },
  deleteEvent(item, index) {
    uni.showModal({
      title: '提示',
      content: '确定要删除该事件吗？',
      success: res => {
        if (res.confirm) {
          // 找到需要删除的事件
          const eventIndex = this.list.findIndex(event => event.title === item.title);
          if (eventIndex !== -1) {
            // 从数组中删除该事件
            this.list.splice(eventIndex, 1);
            // 使用 $set 更新 list 数组
            this.$set(this, 'list', this.list);
          }
        }
      }
    });
  },
    // 打开时间选择器
    openDatetimePicker() {
      this.$refs.myPicker.show();
    },
    // 关闭时间选择器
    closeDatetimePicker() {
      this.$refs.myPicker.hide();
    },
	
	
  
    submitInput() {
      if (this.InputValue === "") {
        uni.showToast({
          title: "请输入待办事项内容",
          icon: "none",
          duration: 2000,
        });
        return;
      }
      // 查找事件是否已经存在于数组中
        const eventIndex = this.list.findIndex(event => event.title === this.InputValue);
        if (eventIndex !== -1) {
          uni.showModal({
            title: '提示',
            content: '该待办事项已经存在，请勿重复添加',
            showCancel: false
          });
          return; // 直接返回，不继续执行
        }
      
     
      this.activeInput = false;
      this.list.unshift({
        title: this.InputValue,
		mark:this.remark,
        select: false,
        date: this.selectedDate,
		day:this.day,
        color: this.eventTypeColors[this.eventTypeIndex],
       cycles:this.selectId,
    	 cycletime: `${this.selectId.join(', ')} ${this.time}`,
			time:this.time,
	});
		
      
	   this.list1[0].selected =false;
	  this.list1[1].selected =false;
	  this.list1[2].selected =false;
	 this.list1[3].selected =false;
	  this.list1[4].selected =false;
	   this.list1[5].selected =false;
	   this.list1[6].selected =false;
	   this.list1[7].selected =false;
	   this.day="";
	   this.remark="";
	  this.time="";
      this.selectList="";
	  this.selectId=[];
      this.InputValue = "";
      this.eventTypeIndex = 0;
      this.close();
      this.selectedDate = "";
      this.buttonText = "选择截止时间";
    },
    // 处理选择时间事件
    handleSubmit(e) {
      const year = e.year;
      const month = e.month;
      const day = e.day;
      const hour = e.hour;
      const minute = e.minute;
      this.selectedDate = `${year}-${month}-${day} ${hour}:${minute}`;
	  this.day=`${year}-${month}-${day}`;
      this.buttonText = this.selectedDate;
    },
	handleEventTypeChange(event) {
	  const { value } = event.detail;
	  this.eventTypeIndex = value;
	},
	handleCycleChange() {
	      // do something after cycle selection changes
	    },
  
      onChange(event) {
        const time = event.detail.value;
        this.time = time;
        
      },
    
  
  },
};
</script>
<style>
@import './icon.css';
.todo-header {
	display: flex;
	align-items: center;
	padding: 0 15px;
	font-size: 12px;
	color: #333333;
	height: 45px;
	box-shadow: -1px 1px 5px 0 rgba(0, 0, 0, 0.1);
	background-color: #ffffff;
}
.todo-header_left {
	width: 100%;
}
.active-text {
	font-size: 14px;
	color: #279abf;
	padding-right: 10px;
}
.todo-header_right {
	display: flex;
	flex-shrink: 0;
}
.todo-header_right-item {
	padding: 0 5px;
}
.active-tab {
	color: #279abf;
}
.todo-content {
	position: relative;
}
.todo-list {
	position: relative;
	display: flex;
	align-items: center;
	padding: 15px;
	margin: 15px;
	color: #0c3854;
	font-size: 14px;
	border-radius: 10px;
	background: #cfebfd;
	box-shadow: -1px 1px 5px 1px rgba(0, 0, 0, 0.1), -1px 2px 1px 0 rgba(255, 255, 255) inset;
	overflow: hidden;
}
.todo-list::after {
	position: absolute;
	content: '';
	top: 0;
	bottom: 0;
	left: 0;
	width: 5px;
	background: #91d1e8;
}
.todo-list_checkbox {
	padding-right: 15px;
}
.checkbox {
	width: 20px;
	height: 20px;
	border-radius: 50%;
	background: #ffffff;
	box-shadow: 0 0 5px 1px rgba(0, 0, 0, 0.1);
}
.todo--finish .checkbox {
	position: relative;
	background: #eee;
}
.todo--finish .checkbox::after {
	content: '';
	position: absolute;
	width: 10px;
	height: 10px;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	border-radius: 50%;
	margin: auto;
	background: #cfebfd;
	box-shadow: 0 0 2px 0px rgba(0, 0, 0, 0.2) inset;
}
.todo--finish .todo-list_content {
	color: #999;
}
.todo--finish .todo-list_date {
	color: #999;
}
.todo--finish .todo-list_cycles {
	color: #999;
}
.todo--finish .todo-list_mark {
	color: #999;
}
.todo--finish.todo-list:before {
	content: '';
	position: absolute;
	top: 0;
	bottom: 0;
	left: 40px;
	right: 10px;
	height: 2px;
	margin: auto 0;
	background: #bdcdd8;
}
.todo--finish.todo-list:after {
	background: #ccc;
}
.create-todo {
  position: fixed;
  bottom: 80rpx;
  right: 40rpx;
  width: 90rpx;
  height: 90rpx;
  line-height: 90rpx;
  text-align: center;
  border-radius: 50%;
  background-color: #009688;
  color: #fff;
  font-size: 70rpx;
  z-index: 999997;
  box-shadow: 0px 5px 10px rgba(0, 150, 136, 0.4);
}
.create-todo {
	display: flex;
	align-items: center;
	justify-content: center;
	position: fixed;
	bottom: 20px;
	
	right: 20;
	margin: 0 auto;
	width: 50px;
	height: 50px;
	border-radius: 50%;
	background-color: #009688;
	box-shadow: 0px 5px 10px rgba(0, 150, 136, 0.4);
}

.create-content {
	display: flex;
	justify-content: center;
	align-items: center;
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	transition: all 0.3s;
	background-color: rgba(138, 138, 138, 0.8);
	opacity: 0;
	transform: scale(0) translateY(200%);
}
.create-show {
	opacity: 1;
	transform: scale(1) translateY(0);
}

.create-content-box {
   width: 80%;
  padding: 40rpx;
  
  border-radius: 20rpx;
  background: #ffffff;
  box-shadow: -1px 1px 5px 2px rgba(0, 0, 0, 0.1), -1px 1px 1px 0 rgba(255, 255, 255) inset;
  z-index: 2;
}
.create-input {
  margin-bottom: 40rpx;
}
.mark-input {
  margin-bottom: 40rpx;
}

.list-box {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.list-box > view {
  width: calc(50% - 20px);
  margin-bottom: 20rpx;
  padding: 20rpx;
  border-radius: 10rpx;
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.list-box > view.selde {
  background-color: #009688;
  color: #fff;
}

.list-box > view.noselde {
  background-color: rgba(0, 0, 0, 0.1);
  color: #333;
}

.event-type-selector {
  display: inline-flex;
  text-align: center;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40rpx;
}
.create-date {
  display: inline-flex;
  text-align: center;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40rpx;
}
.creat-button {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80rpx;
  line-height: 80rpx;
  font-size: 32rpx;
  background-color: #009688;
  color: #fff;
  border-radius: 50px;
  box-shadow: 0px 5px 10px rgba(0, 150, 136, 0.4);
  margin-left: auto;
  margin-right: auto;
  margin-top: 40rpx;
  width: 80%;
}
.tab-box {
  display: flex;
  margin-bottom: 20rpx;
}

.tab-box > view {
  flex: 1;
  text-align: center;
  color: #666;
  font-size: 28rpx;
  padding: 20rpx;
  border: 1rpx solid #ccc;
  border-radius: 10rpx;
  margin-right: 20rpx;

  /* 默认情况下，设置为非选中状态 */
  background-color: #f3f3f3;
}

/* 选中状态 */
.tab-box > view.active {
  color: #fff;
  background-color: #009688;
  border-color: #009688;
}


.iconhao
{
	transform: rotate(135deg);
}

.default {
	transition: transform 0.3s;
}
.create-todo-active {
		padding-top: 100px;
	}

	.image-default {
		display: flex;
		justify-content: center;
	}

	.image-default image {
		width: 100%;
	}

	.default-info {
		text-align: center;
		font-size: 14px;
		color: #CCCCCC;
	}
	.delete-btn {
	  position: absolute;
	  right: 2px;
	  top: 50%;
	  transform: translateY(-50%);
	  font-size: 15px;
	  color: #494d45;
	  cursor: pointer;
	  transition: transform 0.3s;
	}
	
	.delete-btn:hover {
	  color: #f00;
	  transform: scale(1.2) translateY(-50%);
	}
	.todo-list_date {
	  position: absolute;
	  right: 20px;
	  top: 50%;
	  transform: translateY(-50%);
	  font-size: 13px;
	  color: #454545;
	  cursor: pointer;
	  transition: transform 0.3s;
	}
	.todo-list_cycles{
	  position: absolute;
	  right: 20px;
	  top: 50%;
	  transform: translateY(-50%);
	  font-size: 13px;
	  color: #454545;
	  cursor: pointer;
	  transition: transform 0.3s;
	}
	.todo-list_mark{
	  position: absolute;
	  left: 50px;
	  top: 80%;
	  transform: translateY(-50%);
	  font-size: 10px;
	  color: #454545;
	  cursor: pointer;
	  transition: transform 0.3s;
	}
	
</style>

