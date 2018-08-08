<template>
  <section>
    <section :class="['modal-mask', visible ? 'modal-mask-show' : '']" @click="handleClickMask"></section>
    <section :class="['modal', visible ? 'modal-show' : '']">
      <section v-if="header" class="modal-header">
        <span class="title">{{title}}</span>
        <i class="close iconfont icon-close-circle" @click="handleClickMask"></i>
      </section>
      <section class="modal-body">
        <slot>这里是内容</slot>
      </section>
    </section>
  </section>
</template>

<script>
export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    header: {
      type: Boolean,
      default: true
    },
    title: {
      type: String,
      default: '标题'
    }
  },

  data () {
    return {

    }
  },

  created () {
  },

  methods: {
    handleClickMask () {
      this.handleClickCancel()
    },

    handleClickCancel () {
      this.$emit('close')
    }
  }
}
</script>

<style scoped lang="less">
@keyframes btn-spin {
  0% {transform: rotate(0)}
  100%{transform: rotate(360deg)}
}

.modal-mask {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, .4);
  z-index: 900;
  transition: all .2s ease-in-out;
  opacity: 0;
  visibility: hidden;
  &.modal-mask-show {
    opacity: 1;
    visibility: visible;
  }
}

.modal {
  position: fixed;
  width: 100%;
  box-sizing: border-box;
  left: 0;
  right: 0;
  bottom: 0;
  background: #fff;
  border-radius: 5px 5px 0px 0px;
  transform: translate3d(0, 100%, 0);
  transform-origin: center;
  transition: all .2s ease-in-out;
  z-index: 900;
  visibility: hidden;
  overflow: hidden;
  &.modal-show {
    transform: translate3d(0, 0, 0);
    visibility: visible;
  }

  .modal-header {
    background: #fff;
    text-align: center;
    position: relative;
    .title {
      font-size: 14px;
      line-height: 40px;
      color: #333;
    }
    .close {
      position: absolute;
      top: 0;
      right: 0;
      font-size: 16px;
      color: #999;
      margin: 10px;
    }
  }
  .modal-header::after {
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
  .modal-body {
    font-size: 12px;
    padding: 10px;
  }

}
</style>
