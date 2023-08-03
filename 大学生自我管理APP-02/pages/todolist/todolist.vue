<template>
<<<<<<< HEAD
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
			
			
       <view class="todo-content" v-for="(item, index) in listData" :key="item.title">
       	<view class="todo-list" :class="{ 'todo--finish': item.select }" @click="childItem(item, index)">
       		<view class="todo-list_checkbox"><view class="checkbox"></view>
			</view>
       		<view class="todo-list_content">{{ item.title }}</view>
			<view class="todo-list_date">{{ item.date }}</view>
				
        <!-- 新增删除按钮 -->
        <view class="delete-btn" @click.stop="deleteEvent(item, index)">×</view>
		
      </view>
	  
    </view>
    <SimpleDateTimePicker
      ref="myPicker"
      @submit="handleSubmit"
      :start-year="2000"
      :end-year="2030"
    />
    <!-- 字体图标 -->
    <view class="create-todo" @click="creat"><text class="iconfont iconhao1" :class="{ 'create-todo-active': tetxShow }"></text></view>
    <!-- 输入框 -->
    <view class="create-content" v-if="activeInput" :class="{ 'create-show': tetxShow }">
      <view class="create-content-box">
        <view class="create-input"><input type="text" v-model="InputValue" placeholder="请输入你要创建的事项" /></view>
        <view class="create-date" @click="openDatetimePicker">{{ buttonText }}</view>
        <view class="creat-button" @click="submitInput">创建</view>
      </view>
    </view>
  </view>
</template>

<script>
import SimpleDateTimePicker from "./buuug7-simple-datetime-picker.vue";

export default {
  components: {
    SimpleDateTimePicker,
  },
  data() {
  		return {
  			InputValue: '',
  			activeInput: false,
  			tabIndex: 0,
  			tetxShow: false,
  			text: '全部',
  			tabList: ['全部', '待办', '已完成'],
  			list: [{ title:'写实验报告',date:'2023-05-01 23:59', select: false }, { title: '背英语单词',date:'2023-05-02 08:00' ,select: true }],
			// 选择的日期，格式为yyyy-MM-dd HH:mm
			selectedDate: "",
			// 按钮名称，默认为"选择时间"
			buttonText: "选择截止时间",
  		};
  	},
  	onLoad() {},
  	computed: {
  		listData() {
  			let list = JSON.parse(JSON.stringify(this.list)); //拷贝对象
  			let newList = [];
  			//点击全部
  			if (this.tabIndex == 0) {
  				return list;
  			}
  			//点击待办
  			if (this.tabIndex == 1) {
  				list.forEach(v => {
  					if (!v.select) {
  						newList.push(v);
  					}
  				});
  				return newList;
  			}
  			//点击已完成
  			if (this.tabIndex == 2) {
  				list.forEach(v => {
  					if (v.select) {
  						newList.push(v);
  					}
  				});
  				return newList;
  			}
  		}
  	},
  	methods: {
  		//切换tab
  		tabClick(item, index) {
  			this.text = item;
  			this.tabIndex = index;
  		},
  		//点击项目
  		childItem(item, index) {
  			this.list[index].select = !this.list[index].select;
			
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
    // 点击子项，切换是否完成
    childItem(item, index) {
     this.list[index].select = !this.list[index].select;
      
    },
    deleteEvent(item, index) {
        uni.showModal({
          title: '提示',
          content: '确定要删除该事件吗？',
          success: res => {
            if (res.confirm) {
              this.list.splice(index, 1);
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
    // 添加待办事项
    // 添加待办事项
    submitInput() {
      if (this.InputValue === "") {
        uni.showToast({
          title: "请输入待办事项内容",
          icon: "none",
          duration: 2000,
        });
        return;
      }
      else{
    	  
      this.activeInput = false;
      this.list.unshift({
        title: this.InputValue,
        select:false,
        // 保存选择的日期
        date: this.selectedDate,
      });
      
      this.InputValue = "";
     
      this.close();
      this.buttonText = "选择截止时间";
      }
    },
    // 处理选择时间事件
    handleSubmit(e) {
      const year = e.year;
      const month = e.month;
      const day = e.day;
      const hour = e.hour;
      const minute = e.minute;
      this.selectedDate = `${year}-${month}-${day} ${hour}:${minute}`;
      this.buttonText = this.selectedDate;
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
	display: flex;
	align-items: center;
	justify-content: center;
	position: fixed;
	bottom: 50px;
	left: 0;
	right: 0;
	margin: 0 auto;
	width: 50px;
	height: 50px;
	border-radius: 50%;
	background-color: #deeff5;
	box-shadow: -1px 1px 5px 2px rgba(0, 0, 0, 0.1), -1px 1px 1px 0 rgba(255, 255, 255) inset;
}
.iconhao1 {
	font-size: 30px;
	color: #add8e6;
}
.create-content {
	position: fixed;
	bottom: 115px;
	left: 20px;
	right: 20px;
	transition: all 0.3s;
	opacity: 0;
	transform: scale(0) translateY(200%);
}
.create-show {
	opacity: 1;
	transform: scale(1) translateY(0);
}
.create-content-box {
	display: flex;
	align-items: center;
	padding: 0 15px;
	padding-right: 0;
	border-radius: 50px;
	background: #deeff5;
	box-shadow: -1px 1px 5px 2px rgba(0, 0, 0, 0.1), -1px 1px 1px 0 rgba(255, 255, 255) inset;
	z-index: 2;
}
.create-input {
	width: 100%;
	padding-right: 15px;
	color: #add8e6;
}
.creat-button {
	display: flex;
	align-items: center;
	justify-content: center;
	flex-shrink: 0;
	height: 50px;
	width: 80px;
	border-radius: 50px;
	font-size: 16px;
	color: #88d4ec;
	box-shadow: -2px 0px 2px 1px rgba(0, 0, 0, 0.1);
}
.create-date{
	display: flex;
	align-items: center;
	justify-content: center;
	flex-shrink: 0;
	height: 50px;
	width: 100px;
	border-radius: 50px;
	font-size: 16px;
	color: #76b9cd;
	box-shadow: -2px 0px 2px 1px rgba(0, 0, 0, 0.1);
}
.create-content:after {
	content: '';
	position: absolute;
	right: 0;
	left: 0;
	bottom: -8px;
	width: 20px;
	height: 20px;
	background: #deeff5;
	transform: rotate(45deg);
	margin: 0 auto;
	box-shadow: 1px 1px 5px 2px rgba(0, 0, 0, 0.1);
	z-index: -1;
}
.create-content-box:after {
	content: '';
	position: absolute;
	right: 0;
	left: 0;
	bottom: -8px;
	width: 20px;
	height: 20px;
	background: #deeff5;
	transform: rotate(45deg);
	margin: 0 auto;
}
.iconhao1 {
	transition: transform 0.3s;
}
.create-todo-active {
	transform: rotate(135deg);
}
.default {
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
	  color: #443e52;
	  cursor: pointer;
	  transition: transform 0.3s;
	}
	
	.delete-btn:hover {
	  color: #f00;
	  transform: scale(1.2) translateY(-50%);
	}
	.todo-list_date {
	  position: absolute;
	  right: 15px;
	  top: 50%;
	  transform: translateY(-50%);
	  font-size: 10px;
	  color: #454545;
	  cursor: pointer;
	  transition: transform 0.3s;
	}
	
</style>

=======
  <view class="content">

    <view class="text">添加todo</view>
    <view class="addDataBox">
      <view class="group" v-if="showUI">
        <text>时间:</text>
        <input type="text" v-model="user.time" placeholder="时间" />
      </view>
      <view class="group" v-if="showUI">
        <text>地点:</text>
        <input type="text" v-model="user.place" placeholder="地点" />
      </view>
      <view class="group" v-if="showUI">
        <text>事件:</text>
        <input type="text" v-model="user.event" placeholder="事件" />
      </view>

      <button type="primary" @tap="addDate">添加事件</button>

    </view>


    <!--表单插件： https://ext.dcloud.net.cn/plugin?id=413 -->
    <view class="userList">
      <view class="warp">
        <view class="box">
          <view class="title text">事件列表</view>
          <t-table border="2" border-color="#95b99e" :is-check="true" @change="change">
            <t-tr font-size="16" color="#95b99e" align="left">
              <t-th align="center">时间</t-th>
              <t-th align="center">地点</t-th>
              <t-th align="center">事件</t-th>
              <t-th align="center">操作</t-th>
              <t-th align="center">操作</t-th>
            </t-tr>
            <t-tr font-size="14" color="#9fbda5" align="right" v-for="item in tableList" :key="item.id">
              <t-td align="center">{{ item.time }}</t-td>
              <t-td align="center">{{ item.place }}</t-td>
              <t-td align="center">{{ item.event }}</t-td>
              <t-td align="center">
                <button style="height: 50upx;line-height: 50upx;" size="mini" type="primary"
                  @tap="done(item)">已完成</button>
              </t-td>
              <t-td align="center">
                <button style="height: 50upx;line-height: 50upx;" size="mini" type="primary"
                  @tap="update(item)">修改</button>
              </t-td>
            </t-tr>
          </t-table>
        </view>
      </view>
    </view>
    <view class="btn-group">
      <button type="warn" @tap="allDel">清空数据</button>
      <button type="warn" @tap="selectDel">批量删除</button>
    </view>

    <!-- 修改数据的弹窗 -->
    <view v-if="show" class="popupWindow">
      <text>时间:</text>
      <input class="input" type="text" v-model="Update.time" placeholder="请输入时间" />
      <text>地点:</text>
      <input class="input" type="text" v-model="Update.place" placeholder="请输入地点" />
      <text>事件:</text>
      <input class="input" type="text" v-model="Update.event" placeholder="请输入事件" />
      <button type="primary" @tap="confirm">确认</button>
    </view>
  </view>





</template>

<script>
  import tTable from './components/t-table/t-table.vue';
  import tTh from './components/t-table/t-th.vue';
  import tTr from './components/t-table/t-tr.vue';
  import tTd from './components/t-table/t-td.vue';
  export default {
    data() {
      return {
        user: {
          time: '',
          place: '',
          event: '',
        },
        Update: {
          time: '',
          place: '',
          event: '',
        },
        item: {},
        showUI: true,
        show: false,
        selectArr: [],
        allSelectLength: '',
        tableList: []
      }
    },
    components: {
      tTable,
      tTh,
      tTr,
      tTd
    },
    methods: {
      addDate() {
        //添加数据

        console.log(this.user)
        if (this.user) {
          //this.showUI = true
          this.tableList.push(this.user);
          this.user = {}; //恢复初始化，显示请输入字样

        }

      },
      allDel() {
        //一键清空所有数据
        this.tableList = []
      },
      done(item) {
        //删除单项
        this.tableList.splice(item, 1)

      },
      update(item) {
        this.show = true
        this.item = item //拿到要更新数据的行
        this.showUI = false
      },
      confirm() {
        this.item.time = this.Update.time //更新时间
        this.item.place = this.Update.place //更新地点
        this.item.event = this.Update.event //更新事件
        this.show = false
        this.Update = {} //恢复输入状态
        this.showUI = true
      },
      change(e) {
        //获取选中状态
        //console.log(e.detail);
        this.selectArr = e.detail //
      },
      selectDel() {
        //实现批量删除功能
        //1.全选删除
        // if(this.tableList.length == this.allSelectLength) {//这也可以全选删除，不过只能使用一次
        //  this.tableList = []
        // }

        //实现全选删除和多选删除
        let arr = [];
        let len = this.tableList.length;
        for (let i = 0; i < len; i++) {
          if (this.selectArr.indexOf(i) >= 0) {
            // console.log(this.selectArr.indexOf(i))
            this.selectArr.indexOf(i);
          } else {
            arr.push(this.tableList[i]);
          }
        }
        this.tableList = arr; //重新渲染数据
        this.selectArr = [];

      }
    }
  }
</script>

<style lang="scss">
  .content {
    .text {
      font-size: 40upx;
      font-weight: bolder;
      text-align: center;
    }

    .addDataBox {
      width: 750upx;
      background-color: #9dd4e4;
      color: white;

      .group {
        padding: 15upx;
        border: 1upx solid #aaffff;
        border-radius: 20upx;
        margin: 0 auto;
        margin: 10upx;

        button {
          margin-left: 20upx;
        }

        input {
          width: 500upx;
          height: 60upx;
          border: 1upx solid #55ffff;
        }
      }
    }

  }

  .btn-group {
    margin-top: 20upx;
    display: flex;
  }

  .popupWindow {
    background-color: #eee;
    border: 1upx solid #82ca71;
    position: relative;
    top: 10upx;
  }

  .input {
    width: 170upx;
    height: 60upx;
    border: 1upx solid #55ffff;
  }
</style>
>>>>>>> master
