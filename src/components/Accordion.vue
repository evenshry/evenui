<template>
  <section class="ui-accordion">
    <section
    class="header"
    @click="handleClick"
    >
      <section class="arrow">
        <img class="arrow-image"/>
      </section>
      <section class="accordion-header">
        <slot name="header"></slot>
      </section>
    </section>
    <section class="content" ref="content">
        <slot name="content"></slot>
    </section>
  </section>
</template>

<script>
export default {
  props: {
    headerHeight: {
      type: Number,
      default: 50
    }
  },

  data () {
    return {

    }
  },

  mounted () {

  },

  methods: {
    handleClick () {
      if (this.selfShow) {
        this.selfShow = false
      } else {
        this.selfShow = true
      }
    }
  }
}

</script>

<style>
.ui-accordion {
  display: relative;
  width: 100%;
}

.content {
  width: 100%;
  overflow: hidden;
  transition: all .3s;
}

.header {
  width: 100%;
  min-height: 30px;
  background-size: 16px;
  text-align: center;
  line-height: 30px;
  position: relative;
  background-color: #e5e5e5;
}

.arrow {
  position: absolute;
  z-index: 9999;
  right: 8px;
}

.arrow-image {
  transition: all .3s;
  width: 14px;
  height: 8px;
}

</style>
