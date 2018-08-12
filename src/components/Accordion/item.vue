<template>
  <section class="ui-accordion-item">
    <section class="header" @click="handleClick">
      <span>{{title}}</span>
      <i class="arrow iconfont icon-right" :style="arrowStyle"></i>
    </section>
    <section class="content" ref="content" :style="contentStyle">
      <slot></slot>
    </section>
  </section>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: '标题'
    }
  },

  computed: {
    arrowStyle () {
      let style = {}
      if (this.selfShow) {
        style.transform = 'rotate(90deg)'
      } else {
        style.transform = 'rotate(0deg)'
      }
      return style
    },
    contentStyle () {
      let style = {}
      if (this.isMounted) {
        if (this.selfShow) {
          style.height = this.contentHeight + 'px'
        } else {
          style.height = 0
        }
      }
      return style
    }
  },

  watch: {
    show (value) {
      this.selfShow = value
    }
  },

  data () {
    return {
      isMounted: false,
      selfShow: false,
      contentHeight: 0
    }
  },

  mounted () {
    this.contentHeight = this.$refs.content.clientHeight
    this.selfShow = this.show
    this.isMounted = true
  },

  methods: {
    handleClick () {
      this.$parent.update(this._uid)
      this.selfShow = !this.selfShow
    },
    update (_uid) {
      if (this.selfShow && this._uid !== _uid) {
        this.selfShow = false
      }
    }
  }
}

</script>

<style lang="less">
.ui-accordion-item {
  position: relative;
  .header {
    min-height: 40px;
    line-height: 40px;
    position: relative;
    background-color: #fff;
    padding-left: 10px;
    color: #333;
    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 200%;
      height: 200%;
      transform: scale(.5);
      transform-origin: 0 0;
      pointer-events: none;
      box-sizing: border-box;
      border-bottom: 1px solid #e9eaec;
    }
    span {
      font-size: 14px;
    }
    .arrow {
      font-size: 14px;
      position: absolute;
      top: 0px;
      right: 10px;
      transition: all .3s;
    }
  }
  .content {
    overflow: hidden;
    color: #666;
    transition: all .3s;
  }
}
</style>
