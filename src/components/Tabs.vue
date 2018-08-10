<template>
  <section class="ui-tabs">
    <section
      class="tabContainer"
      :style="{
        width: tabStyle.width === 'auto' ? 'auto' : tabStyle.width + 'px',
        backgroundColor: backgroundColor,
        height: height + 'px',
        lineHeight: height + 'px'
      }"
    >
      <section
        v-for="(item, index) in data"
        :key="index"
        :class="['item', index === current ? 'active' : '']"
        :style="{
          flex: itemStyle.flex,
          width: itemStyle.width === 'auto' ? 'auto' : itemStyle.width + 'px',
          color: index === current ? color : '#333'
        }"
        @click="handleChange(index)"
      >{{item}}</section>
      <section
        class="indicator"
        :style="{
          left: offsetLeft + 'px',
          backgroundColor: color,
        }"
      ></section>
    </section>
  </section>
</template>

<script>

export default {
  props: {
    // 当前选项索引
    initValue: {
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
      default: 40
    },
    color: {
      type: String,
      default: '#FF921C'
    },
    backgroundColor: {
      type: String,
      default: '#fff'
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
      pWidth: 0,
      current: this.initValue,
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

  mounted () {
    this.pWidth = this.$el.clientWidth
    this.ininStyle()
  },

  methods: {
    ininStyle () {
      if (this.itemWidth > 0) {
        this.itemStyle.flex = 'none'
        this.itemStyle.width = this.itemWidth
        const tWidth = this.itemWidth * this.data.length
        this.tabStyle.width = tWidth > this.pWidth ? tWidth : this.pWidth
        const itemWidth = this.itemWidth
        this.offsetLeft = itemWidth * (this.current + (1 / 2))
      } else {
        this.itemStyle.flex = 1
        this.tabStyle.width = 'auto'
        const itemWidth = this.pWidth / this.data.length
        this.offsetLeft = itemWidth * (this.current + (1 / 2))
      }
    },
    handleChange (index) {
      if (index !== this.current) {
        const itemWidth = this.itemWidth > 0
          ? this.itemWidth
          : this.pWidth / this.data.length
        this.offsetLeft = itemWidth * (index + (1 / 2))
        this.current = index
        this.$emit('change', index)
      }
    }
  }
}
</script>

<style lang="less">
.ui-tabs {
  overflow-x: auto;
  .tabContainer {
    height: 40px;
    line-height: 40px;
    background-color: #fff;
    display: flex;
    flex-direction: row;
    align-items: center;
    position: relative;
    .item {
      flex: 1;
      height: 100%;
      text-align: center;
      font-size: 14px;
      color: #333;
      transition: all .2s;
      &.active {
        color: #FF921C;
      }
    }
    .indicator {
      position: absolute;
      width: 24px;
      height: 4px;
      bottom: 0px;
      left: 0px;
      margin-left: -12px;
      border-radius: 2px;
      background: #FF921C;
      transition: all .2s;
    }
  }
}
</style>
