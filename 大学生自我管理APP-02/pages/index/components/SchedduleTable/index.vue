<template>
  <view class="content">
<<<<<<< HEAD
    <uni-fab style="height: 40px;font-size: 8px;line-height: 40px;" @click="createSceduleTable">新增课程表</uni-fab>
    <uni-table border stripe emptyText="暂无更多数据">
      <!-- 星期 -->
      <uni-tr>
        <uni-th width="1">
          <uni-data-select v-model="value" :localdata="tableRange" @change="switchTable"></uni-data-select>
        </uni-th>
=======
    <uni-table border stripe emptyText="暂无更多数据">
      <!-- 星期 -->
      <uni-tr>
        <uni-th width="1"></uni-th>
>>>>>>> master
        <uni-th align="center" v-for="item in weekdays" :keyt="item.id" width="1">{{ item.title }}</uni-th>
      </uni-tr>
      <!-- 表格数据行 -->
      <uni-tr v-for="item in duration">
        <uni-td style="font-size: 8px;">
          <view>第{{ item.index }}节</view>
          <view>{{ item.title }}</view>
        </uni-td>
        <uni-td v-for="n in 5" :key="n" @click="$event => addCourse(item.index, n, '新增课程')"
          style="padding: 0; margin: 0;">
          <view @click.stop="">
            <Card v-if="singleBox[item.index + '_' + n]" :data="singleBox[item.index + '_' + n]"
              @click="$event => editCourse(item.index, n, '编辑课程', singleBox[item.index + '_' + n])"></Card>
          </view>
        </uni-td>
      </uni-tr>
    </uni-table>
<<<<<<< HEAD

    <!-- 弹窗部分 -->
    <view>
      <!-- 输入框示例 -->
      <uni-popup ref="inputDialog_CreateSchduleTable" type="dialog">
        <uni-popup-dialog ref="inputClose" mode="input" title="课程表标题" value="" placeholder="请给新课程表取个名字吧~"
          confirmText="确定" cancelText="取消" @confirm="createSceduleTableConfirm"></uni-popup-dialog>
      </uni-popup>
    </view>
  </view>
</template>

<script>
  import weekdays from '../../data/week.js'
  import Card from './Card.vue'
  import db from '../../db/dbUtils.js'
  // 使用雪花id生成id
  import SnowflakeId from "snowflake-id"
  export default {
    components: {
      Card
    },
    data() {
      return {
        weekdays: weekdays,
        tableName: "默认课表",
        value: 0,
        tableRange: [],
      }
    },
    methods: {
      async createDB() {
        if (!db.isOpen()) {
          db.openSqlite()
        }
        console.log(db.isOpen())
      },
      async createTables() {
        await db.createTable("course_tables", "id INTEGER PRIMARY KEY, name TEXT NOT NULL")
        await db.createTable("courses",
          "id INTEGER PRIMARY KEY,course_table_id INTEGER NOT NULL,day_of_week INTEGER NOT NULL,time_period_id INTEGER NOT NULL, course_name TEXT NOT NULL,professor TEXT NOT NULL,location TEXT NOT NULL,credits REAL NOT NULL,FOREIGN KEY(course_table_id) REFERENCES course_tables(id),FOREIGN KEY(time_period_id) REFERENCES time_periods(id)"
        )
        await db.createTable("time_periods", "id INTEGER PRIMARY KEY,start_time TEXT NOT NULL,end_time TEXT NOT NULL")
      },
      async loadData() {
        this.tableRange = await db.selectTableData("course_tables")
        this.tableName = this.tableRange[0].name
        this.tableId = this.tableRange[0].id
        let keymap = {
          id: "value",
          name: 'text'
        }
        this.tableRange.map(item => {
          Object.keys(item).map(keys => {
            let newKey = keymap[keys]
            if (newKey) {
              item[newKey] = item[keys]
              delete item[keys]
            }
          })
        })
        console.log(this.tableRange)
      },
      createSceduleTable() {
        this.$refs.inputDialog_CreateSchduleTable.open()
      },
      async createSceduleTableConfirm(name) {
        const snowflake = new SnowflakeId()
        let id = snowflake.generate()
        this.tableName = name
        await db.insertTableData("course_tables", `${id}, "${name}"`, "id, name")
      },
      switchTable(e) {
        console.log(e)
        this.loadData()
      }
    },
    mounted() {
      this.createDB()
      this.createTables()
      this.loadData()
    }
  }
</script>
=======
  </view>
</template>

<script setup>
  import {
    onMounted,
    onUpdated,
    reactive,
    ref,
    toRefs
  } from 'vue'
  import {
    getInitialData,
    setScheduleData
  } from './scripts/service.js'
  import {
    useInitialData
  } from './scripts/hooks.js'
  import weekdays from '../../data/week.js'
  import Card from './Card.vue'

  const [
    data,
    setInitialData,
    editSchedule,
    addSchedule
  ] = useInitialData()

  onMounted(async () => {
    setInitialData(await getInitialData())
  })

  onUpdated(() => {
    console.log(触发onUpdated)
  })

  let cardData = reactive({
    course: '',
    teacher: '',
    adress: '',
    score: ''
  })

  const addCourse = (index, weekday, formType) => {
    uni.navigateTo({
      url: '/pages/index/components/MessageBox/index'
    })
    uni.$emit('addCourse', {
      msg: {
        formType,
        weekday,
        index,
        btnCancelText: '取消',
        btnConfirmText: '确定',
      }
    })
  }

  const editCourse = (index, weekday, formType, singleBoxData) => {
    uni.navigateTo({
      url: '/pages/index/components/MessageBox/index'
    })
    uni.$emit('editCourse', {
      msg: {
        formType,
        weekday,
        index,
        course: singleBoxData.course,
        teacher: singleBoxData.teacher,
        adress: singleBoxData.adress,
        score: singleBoxData.score,
        btnCancelText: '取消',
        btnConfirmText: '确定',
        btnDeleteText: '删除'
      }
    })
  }
  const {
    duration,
    singleBox
  } = toRefs(data)
</script>
>>>>>>> master
