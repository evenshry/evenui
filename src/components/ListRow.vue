<template>
  <section class="listRow" @click="handleClick">
    <section class="left">
      <slot name="icon"></slot>
      <span class="title">{{title}}</span>
    </section>
    <section class="right">
      <slot name="detail">
        <span class="detail">{{detail}}</span>
      </slot>
      <i v-if="link" class="more iconfont icon-right"></i>
    </section>
  </section>
</template>

<script>
export default {
  props: {
    link: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: '标题'
    },
    detail: {
      type: String,
      default: ''
    }
  },

  data () {
    return {

    }
  },

  created () {
  },

  methods: {
    handleClick () {
      if (this.link) {
        this.$emit('onLink')
      }
    }
  }
}
</script>

<style scoped lang="less">
.listRow {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 10px;
  font-size: 14px;
  line-height: 30px;
  position: relative;
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
  .left {
    flex: 1;
    color: #333;
  }
  .right {
    text-align: right;
    font-size: 14px;
    .detail {
      color: #666;
    }
    .more {
      color: #999;
    }
  }
}
</style>
