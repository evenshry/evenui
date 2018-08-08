<template>
  <section class="scrollContainer">
    <section
      class="tabContainer"
      :style="{
        width: tabStyle.width === 'auto' ? 'auto' : tabStyle.width + 'px',
        backgroundColor: backgroundColor,
        height: height + 'rpx',
        lineHeight: height + 'rpx'
      }"
    >
      <section
        v-for="(item, index) in data"
        :key="index"
        :class="['item', index === current ? 'active' : '']"
        :style="{
          flex: itemStyle.flex,
          width: itemStyle.width === 'auto' ? 'auto' : itemStyle.width + 'px'
        }"
        @click="handleChange(index)"
      >{{item}}</section>
      <section class="indicator" :style="{ left: offsetLeft + 'px' }"></section>
    </section>
  </section>
</template>

<script>
const wWidth = document.documentElement.clientWidth

export default {
  props: {
    // 当前选项索引
    current: {
      type: Number,
      default: 0
    },
    // 每项的宽度，设置0则自适应
    itemWidth: {
      type: Number,
      default: 0
    },
    height: {
      type: Number,
      default: 92
    },
    backgroundColor: {
      type: String,
      default: '#F9F9F9'
    },
    data: {
      type: Array,
      default () {
        return ['选项一', '选项二']
      }
    }
  },

  data () {
    return {
      current: 0,
      offsetLeft: 0,
      tabStyle: {
        width: 'auto'
      },
      itemStyle: {
        flex: 1,
        width: 'auto'
      }
    }
  },

  created () {
    if (this.itemWidth > 0) {
      this.itemStyle.flex = 'none'
      this.itemStyle.width = this.itemWidth
      const tWidth = this.itemWidth * this.data.length
      this.tabStyle.width = tWidth > wWidth ? tWidth : wWidth
      const itemWidth = this.itemWidth
      this.offsetLeft = itemWidth * (this.current + (1 / 2))
    } else {
      this.itemStyle.flex = 1
      this.tabStyle.width = 'auto'
      const itemWidth = wWidth / this.data.length
      this.offsetLeft = itemWidth * (this.current + (1 / 2))
    }
  },

  methods: {
    handleChange (index) {
      if (index !== this.current) {
        const itemWidth = this.itemWidth > 0
          ? this.itemWidth
          : wWidth / this.data.length
        this.offsetLeft = itemWidth * (index + (1 / 2))
        this.current = index
        this.$emit('change', index)
      }
    }
  }
}
</script>

<style scoped lang="less">
.scrollContainer {
  overflow-x: auto;
}
.tabContainer {
  height: 92rpx;
  line-height: 92rpx;
  background-color: #F9F9F9;
  display: flex;
  flex-direction: row;
  align-items: center;
  position: relative;
  .item {
    flex: 1;
    height: 100%;
    text-align: center;
    font-size: 30rpx;
    color: #333;
    transition: all .2s;
    &.active {
      color: #FF921C;
    }
  }
  .indicator {
    position: absolute;
    width: 48rpx;
    height: 6rpx;
    bottom: 0rpx;
    left: 0rpx;
    margin-left: -24rpx;
    border-radius: 3rpx;
    background: #FF921C;
    transition: all .2s;
  }
}
</style>
