<template>
  <section
    :class="['ui-button', type, size, disabled ? 'disabled' : '', ghost ? 'ghost' : '']"
    @click="handleClick"
  >
    <i v-if="icon" :class="['iconfont', icon]"></i>
    <slot></slot>
  </section>
</template>

<script>

export default {
  props: {
    ghost: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    icon: {
      type: String,
      default: null
    },
    size: {
      type: String,
      default: 'normal'
    },
    type: {
      type: String,
      default: 'default'
    }
  },

  methods: {
    handleClick () {
      this.$emit('press')
    }
  }
}
</script>

<style lang="less">
.ui-button {
  display: inline-block;
  text-align: center;
  border: 1px solid transparent;
  padding: 0px 10px;
  font-size: 14px;
  line-height: 28px;
  border-radius: 5px;
  transition: all .2s;
  color: #333;
  background-color: #fff;
  border-color: #dcdee2;
  &.primary {
    color: #fff;
    background-color: #2d8cf0;
    border-color: #2d8cf0;
  }
  &.info {
    color: #fff;
    background-color: #2db7f5;
    border-color: #2db7f5;
  }
  &.success {
    color: #fff;
    background-color: #19be6b;
    border-color: #19be6b;
  }
  &.warning {
    color: #fff;
    background-color: #f90;
    border-color: #f90;
  }
  &.error {
    color: #fff;
    background-color: #ed4014;
    border-color: #ed4014;
  }
  &.disabled {
    opacity: .5;
    cursor: not-allowed;
  }
  .iconfont { font-size: 14px; }

  &.small {
    padding: 0px 8px;
    font-size: 12px;
    line-height: 24px;
    .iconfont { font-size: 12px; }
  }
  &.normal {
    padding: 0px 10px;
    font-size: 14px;
    line-height: 28px;
    .iconfont { font-size: 14px; }
  }
  &.middle {
    padding: 0px 15px;
    font-size: 16px;
    line-height: 32px;
    .iconfont { font-size: 16px; }
  }
  &.large {
    padding: 0px 20px;
    font-size: 18px;
    line-height: 36px;
    .iconfont { font-size: 18px; }
  }

  &.ghost {
    background-color: transparent;
    border-color: transparent;
    padding: 0px 5px;
    &.primary { color: #2d8cf0; }
    &.info { color: #2db7f5; }
    &.success { color: #19be6b; }
    &.warning { color: #f90; }
    &.error { color: #ed4014; }
  }
}
</style>
