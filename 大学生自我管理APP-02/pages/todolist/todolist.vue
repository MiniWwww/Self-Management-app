<template>
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
