<template>
  <section class="ui-calendar">
    <section class="calendar-header">
      <section class="left">
        <i class="iconfont icon-left" @click="handlerMonthPrev"></i>
      </section>
      <section class="title">{{dateYear}} 年 {{dateMonth}} 月</section>
      <section class="right">
        <i class="iconfont icon-right" @click="handlerMonthNext"></i>
      </section>
    </section>
    <section class="calendar-title">
      <section
        class="calendar-weekday"
        v-for="(item, index) in ['日', '一', '二', '三', '四', '五', '六']"
        :key="index"
      >
        {{item}}
      </section>
    </section>
    <swiper
      :options="{ initialSlide: monthSwiperIndex, direction }"
      ref="mySwiper"
      class="calendar-wrap"
      current="monthSwiperIndex"
      @change="changeHandler"
      >
      <swiperSlide
        class="calendar-month-body"
        v-for="(monthItem, monthIndex) in monthsArray"
        :key="monthIndex"
      >
        <section
          class="calendar-day-wrap"
          v-for="(dayItem, dayIndex) in monthItem.data"
          @click="handleClickItem(monthIndex, dayIndex, dayItem)"
          :key="dayIndex"
        >
          <section
            :class="[
              'calendar-day-cell',
              disablePastDays && dayItem.isPastDay ? 'is-past-days' : '',
              dayItem.isHoliday && dayItem.isThisMonth ? 'is-holiday' : '',
              dayItem.isThisMonth ? 'is-this-month' : 'not-this-month',
              (myItem.value && dayItem.value && myItem.value === dayItem.value) ? 'is-selected' : '',
              dayItem.isRangeLeft ? 'is-selected-left' : '',
              dayItem.isRangeRight ? 'is-selected-right' : '',
              dayItem.isInRange? 'is-selected-in-range' : ''
            ]"
            :style="{
              backgroundColor: dayItem.isInRange ? rangeColor :
                dayItem.isRangeLeft ? startRangeColor :
                dayItem.isRangeRight ? endRangeColor :
                (myItem.value && dayItem.value && myItem.value === dayItem.value) ? themeColor : ''
            }"
          >
            {{dayItem.day}}
          </section>
        </section>
      </swiperSlide>
    </swiper>
  </section>
</template>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import Dater from '@/utils/date.js'
import moment from 'moment'

export default {
  components: {
    swiper,
    swiperSlide
  },
  props: {
    value: { // 默认日期
      type: [String, Array]
    },
    datePage: {
      type: [String, Number],
      default: 1
    },
    direction: {
      type: String,
      default: 'horizontal'
    },
    selectRangeMode: { // 是否时间段选择
      type: Boolean,
      default: false
    },
    dateRange: { //
      type: Array,
      default () {
        return [6, 6]
      }
    },
    disablePastDays: { //
      type: Boolean,
      default: false
    },
    disableForeDays: { //
      type: Boolean,
      default: false
    },
    startShow: { //
      type: [String, Array],
      default: 'today'
    },
    maxRange: { //
      type: [Number, String],
      default: 30
    },
    canSelectToday: { //
      type: Boolean,
      default: true
    },
    height: { // 高度
      type: [String, Number],
      default: 340
    },
    themeColor: { // 选中颜色
      type: String
    },
    startRangeColor: { //
      type: String,
      default: '#3399FF'
    },
    rangeColor: { //
      type: String,
      default: 'pink'
    },
    endRangeColor: { //
      type: String,
      default: 'red'
    }
  },

  data () {
    return {
      dateYear: null,
      dateMonth: null,
      selectItem: {},
      dayMap: {},
      monthsArray: [],
      oldItem: {
        value: null
      },
      myItem: {
        value: null
      },
      scrollTop: 0,
      oldRangeLeftItem: null,
      oldRangeRightItem: null,
      heightCount: 50,
      monthSwiperIndex: 0
    }
  },

  created () {
    this.ininData()
  },

  watch: {
    value (value) {
      if (typeof value === 'string') {
        let [year, month] = value.split('-').map((x) => Number(x))
        this.dateYear = year
        this.dateMonth = month
        for (let i = 0; i < this.monthsArray.length; i++) {
          if (year === this.monthsArray[i].year && month === this.monthsArray[i].month) {
            this.monthSwiperIndex = i
            let dIndex = this.momentTransToItem(moment(value)).dayIndex
            let mIndex = this.momentTransToItem(moment(value)).monthIndex
            this.selectSingle(mIndex, dIndex)
            break
          }
        }
      }
    },
    datePage (value) {
      let [year, month] = value.split('-').map((x) => Number(x))
      for (let i = 0; i < this.data.monthsArray.length; i++) {
        if (year === this.data.monthsArray[i].year && month === this.data.monthsArray[i].month) {
          this.monthSwiperIndex = i
          break
        }
      }
    }
  },

  methods: {

    ininData () {
      //
      this.monthsArray.splice(0, this.monthsArray.length)
      let startMonthAnchor
      let endMonthAnchor
      if (isNaN(Number(this.dateRange[0]))) {
        startMonthAnchor = this.dateRange[0] + '-01'
        endMonthAnchor = this.dateRange[1] + '-01'
      } else {
        startMonthAnchor = moment().subtract(this.dateRange[0], 'months').format('YYYY-MM') + '-01'
        endMonthAnchor = moment().add(this.dateRange[1], 'months').format('YYYY-MM') + '-01'
      }
      for (let i = 0; ; i++) {
        let year = moment(startMonthAnchor).year()
        let month = moment(startMonthAnchor).month() + 1
        let day = moment(startMonthAnchor).date()

        let startMonthDater = new Dater(year, month, day).monthDays
        let monthArray = this.getMonthArray(startMonthDater, i)
        monthArray.monthIndex = i
        this.monthsArray.push(monthArray)
        if (moment(startMonthAnchor).isSame(endMonthAnchor, 'month')) {
          break
        }
        startMonthAnchor = moment(startMonthAnchor).add(1, 'month')
      }

      if (this.value) {
        if (typeof this.value === 'string') {
          let [year, month] = this.value.split('-').map((x) => Number(x))
          this.dateYear = year
          this.dateMonth = month
          let dIndex = this.momentTransToItem(moment(this.value)).dayIndex
          let mIndex = this.momentTransToItem(moment(this.value)).monthIndex
          this.selectSingle(mIndex, dIndex)
        } else {
          let dIndex = this.momentTransToItem(moment(this.value[0])).dayIndex
          let mIndex = this.momentTransToItem(moment(this.value[0])).monthIndex
          this.selectRange(mIndex, dIndex, true)
          mIndex = this.momentTransToItem(moment(this.value[1])).monthIndex
          dIndex = this.momentTransToItem(moment(this.value[1])).dayIndex
          this.selectRange(mIndex, dIndex)
        }
      }
      this.monthsArray = this.monthsArray
      this.calendarWrapStyle = this.calendarWrapStyleObj()
    },

    changeHandler (e) {
      let index = e.detail.current
      this.$emit('monthchange',
        `${this.monthsArray[index].year}-${this.monthsArray[index].month >= 10 ? '' : '0'}${this.monthsArray[index].month}`)
    },

    calendarWrapStyleObj () {
      let style = {}
      style.height = this.height + 'px'
      return style
    },

    itemTransToMoment (item) {
      if (item.day) {
        return moment(`${item.year}-${item.month}-${item.day}`)
      } else {
        return moment(`${item.year}-${item.month}`)
      }
    },

    momentTransToItem (moment) {
      for (let i = 0; i < this.monthsArray.length; i++) {
        for (let j = 0; j < this.monthsArray[i].data.length; j++) {
          if (this.monthsArray[i].data[j].isThisMonth && moment.isSame(this.itemTransToMoment(this.monthsArray[i].data[j]))) {
            return this.monthsArray[i].data[j]
          }
        }
      }
    },

    inRangeSelect (rightItem, startI, endI, select) {
      for (let i = startI; i <= endI; i++) {
        for (let j = 0; j < this.monthsArray[startI].data.length; j++) {
          if (this.monthsArray[i].data[j].isThisMonth &&
          this.itemTransToMoment(this.monthsArray[i].data[j]).isAfter(this.itemTransToMoment(this.oldRangeLeftItem), 'day') &&
          this.itemTransToMoment(this.monthsArray[i].data[j]).isBefore(this.itemTransToMoment(rightItem), 'day')) {
            if (select) {
              this.monthsArray[i].data[j].isInRange = true
            } else {
              this.monthsArray[i].data[j].isInRange = false
            }
          }
          if (this.itemTransToMoment(this.monthsArray[i].data[j]).isSame(this.itemTransToMoment(rightItem), 'day')) {
            break
          }
        }
      }
    },

    // 上一月
    handlerMonthPrev () {
      this.$refs.mySwiper.swiper.slidePrev()
      let index = this.monthSwiperIndex
      index--
      if (index < 0) {
        index = 0
      }
      const item = this.monthsArray[index]
      this.monthSwiperIndex = index
      this.dateYear = item.year
      this.dateMonth = item.month
    },

    // 下一月
    handlerMonthNext () {
      this.$refs.mySwiper.swiper.slideNext()
      let index = this.monthSwiperIndex
      index++
      if (index > this.monthsArray.length - 1) {
        index = this.monthsArray.length - 1
      }
      const item = this.monthsArray[index]
      this.monthSwiperIndex = index
      this.dateYear = item.year
      this.dateMonth = item.month
    },

    // 选择日期范围
    selectRange (mIndex, dIndex, trans) {
      let selectItem = this.monthsArray[mIndex].data[dIndex]
      let selectMoment = this.itemTransToMoment(selectItem)
      if (selectItem.isPastDay && this.disablePastDays) {
        this.$emit('failed')
        return
      }
      if (selectItem.isForeDay && this.disableForeDays) {
        this.$emit('failed')
        return
      }
      if (selectItem.isToday && !this.canSelectToday) {
        this.$emit('failed')
        return
      }
      if (!this.oldRangeLeftItem && !this.oldRangeRightItem) {
        selectItem.isRangeLeft = true
        this.oldRangeLeftItem = selectItem
        this.$emit('selectedstart', selectItem.value)
      } else if (this.oldRangeLeftItem && !this.oldRangeRightItem) {
        if (this.maxRange) {
          if (this.itemTransToMoment(this.oldRangeLeftItem).add(this.maxRange, 'day').isBefore(selectMoment, 'day')) {
            this.$emit('failed')
            return
          }
        }
        if (this.itemTransToMoment(this.oldRangeLeftItem).isAfter(selectMoment, 'day')) {
          this.oldRangeLeftItem.isRangeLeft = false
          selectItem.isRangeLeft = true
          this.oldRangeLeftItem = selectItem
          this.$emit('selectedstart', selectItem.value)
        } else if (this.itemTransToMoment(this.oldRangeLeftItem).isBefore(selectMoment, 'day')) {
          selectItem.isRangeRight = true
          this.oldRangeRightItem = selectItem
          let startI = this.oldRangeLeftItem.monthIndex
          let endI = selectItem.monthIndex
          this.inRangeSelect(selectItem, startI, endI, true)
          this.$emit('selectedend', selectItem.value)
        } else {
          selectItem.isRangeLeft = false
          this.oldRangeLeftItem = undefined
        }
      } else {
        let startI = this.oldRangeLeftItem.monthIndex
        let endI = this.oldRangeRightItem.monthIndex
        this.inRangeSelect(this.oldRangeRightItem, startI, endI, false)
        this.oldRangeLeftItem.isRangeLeft = false
        this.oldRangeRightItem.isRangeRight = false
        this.oldRangeRightItem = undefined
        selectItem.isRangeLeft = true
        this.oldRangeLeftItem = selectItem
        this.$emit('selectedstart', selectItem.value)
      }
      if (trans) {
        this.monthSwiperIndex = mIndex
      }
    },

    // 日期单选
    selectSingle (mIndex, dIndex) {
      let selectItem = this.monthsArray[mIndex].data[dIndex]

      if (selectItem.isPastDay && this.disablePastDays) {
        this.$emit('failed')
        return
      }
      if (selectItem.isForeDay && this.disableForeDays) {
        this.$emit('failed')
        return
      }
      if (selectItem.isToday && !this.canSelectToday) {
        this.$emit('failed')
        return
      }

      if (this.oldItem) {
        this.oldItem.isClicked = false
      }
      this.monthsArray[mIndex].data[dIndex].isClicked = true

      this.oldItem = this.monthsArray[mIndex].data[dIndex]

      this.selectItem = this.oldItem
      this.monthSwiperIndex = mIndex
      this.myItem = this.selectItem
      this.oldItem = this.oldItem
      this.$emit('change', selectItem.value)
    },

    // 选择日期
    handleClickItem (monthIndex, dayIndex, dayItem) {
      let selectItem = this.monthsArray[monthIndex].data[dayIndex]
      if (selectItem.isThisMonth === false) {
        return
      }
      if (this.selectRangeMode) {
        this.selectRange(monthIndex, dayIndex)
      } else {
        this.selectSingle(monthIndex, dayIndex)
      }
    },

    getMonthArray (date, monthIndex) {
      let monthArray = {}
      let lineCount = 0
      var count = 0
      monthArray.data = []
      monthArray.year = date.year
      monthArray.month = date.month
      for (let i = 0; i < date.preMonthDays.length; i++) {
        let obj = {}
        obj.day = date.preMonthDays[i]
        if (date.month === 1) {
          obj.month = 12
          obj.year = date.year - 1
        } else {
          obj.month = date.month - 1
          obj.year = date.year
        }
        obj.value = `${obj.year}-${obj.month < 10 ? '0' : ''}${obj.month}-${obj.day < 10 ? '0' : ''}${obj.day}`

        obj.isThisMonth = false
        obj.isClicked = false
        obj.isRangeLeft = false
        obj.isRangeRight = false
        obj.isInRange = false
        obj.monthIndex = monthIndex
        obj.dayIndex = count
        this.dayMap[obj.value] = obj
        if ([0, 6].indexOf((moment(obj.value).weekday())) !== -1) {
          obj.isHoliday = true
        }
        monthArray.data.push(obj)
        count++
      }
      for (let i = 0; i < date.thisMonthDays.length; i++) {
        let obj = {}
        obj.day = date.thisMonthDays[i]
        obj.month = date.month
        obj.year = date.year
        obj.isThisMonth = true
        obj.isClicked = false
        obj.isRangeLeft = false
        obj.isRangeRight = false
        obj.isInRange = false
        obj.monthIndex = monthIndex
        obj.dayIndex = count
        obj.value = `${obj.year}-${obj.month < 10 ? '0' : ''}${obj.month}-${obj.day < 10 ? '0' : ''}${obj.day}`
        if ([0, 6].indexOf((moment(obj.value).weekday())) !== -1) {
          obj.isHoliday = true
        }
        if (moment(`${obj.year}-${obj.month}-${obj.day}`).isBefore(moment(), 'day')) {
          obj.isPastDay = true
          obj.isForeDay = true
          obj.isToday = false
        } else if (moment(`${obj.year}-${obj.month}-${obj.day}`).isAfter(moment(), 'day')) {
          obj.isPastDay = false
          obj.isForeDay = true
          obj.isToday = false
        } else {
          obj.isPastDay = false
          obj.isForeDay = false
          obj.isToday = true
        }
        monthArray.data.push(obj)
        count++
        this.dayMap[obj.value] = obj
      }
      for (let i = 0; i < date.nextMonthDays.length; i++) {
        let obj = {}
        obj.day = date.nextMonthDays[i]

        if (date.month === 12) {
          obj.month = 1
          obj.year = date.year + 1
        } else {
          obj.month = date.month + 1
          obj.year = date.year
        }
        obj.isThisMonth = false
        obj.isClicked = false
        obj.isRangeLeft = false
        obj.isRangeRight = false
        obj.isInRange = false
        obj.monthIndex = monthIndex
        obj.dayIndex = count
        obj.value = `${obj.year}-${obj.month < 10 ? '0' : ''}${obj.month}-${obj.day < 10 ? '0' : ''}${obj.day}`
        if ([0, 6].indexOf((moment(obj.value).weekday())) !== -1) {
          obj.isHoliday = true
        }
        monthArray.data.push(obj)
        count++
        this.dayMap[obj.value] = obj
      }
      monthArray.positionY = this.heightCount

      monthArray.value = `${date.year}-${date.month > 10 ? '' : '0'}${date.month}`

      if (lineCount === 0) {
        monthArray.monthHeight = 350
      } else if (lineCount === 1) {
        monthArray.monthHeight = 300
      } else {
        monthArray.monthHeight = 250
      }
      this.heightCount += monthArray.monthHeight
      return monthArray
    }
  }
}

</script>

<style lang="less">
.ui-calendar {
  background-color: #fff;
  .calendar-header {
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 50px;
    .left, .right {
      flex: 1 1 auto;
      i {
        font-size: 18px;
        line-height: 50px;
        width: 50px;
        color: #666;
      }
    }
    .left {
      text-align: right;
    }
    .title {
      width: 160px;
      text-align: center;
      font-size: 18px;
      color: #333;
    }
  }
  .calendar-title {
    height:50px;
    .calendar-weekday {
      height:50px;
      width:14.2857%;
      float: left;
      line-height: 50px;
      text-align: center;
    }
  }
  .calendar-wrap {
    height: 300px;
  }
  .calendar-month-body{
    .calendar-month-title{
      height: 50px;
      text-align: center;
      line-height: 50px;
    }
    .calendar-day-wrap {
      height:50px;
      width:14.2857%;
      float: left;
      text-align: center;
      horizontal-align: middle;
      line-height: 50px;
      .calendar-day-cell {
        width: 32px;
        height: 32px;
        line-height: 32px;
        margin: 9px auto;
        border-radius: 16px;
      }
      .not-this-month {
        color: #aaa;
      }
      .is-this-month {
        color: black
      }
      .is-holiday {
        color: red
      }
      .is-today {
        background-color: #808080;
        color: white;
      }
      .is-selected {
        background-color: #3399ff;
        color: white;
      }
      .is-selected-left {
        background-color: #3399ff;
        color: white;
      }
      .is-selected-right {
        background-color: red;
        color: white;
      }
      .is-selected-in-range {
        background-color: pink;
        color: white;
      }
      .is-past-days {
        color: #aaa;
      }
      .is-fore-days {
        color: #aaa;
      }
    }
  }
}
</style>
