<template>
  <section class="container">
    <h2>{{title}}</h2>
    <section class="backBtn">
      <Button icon="icon-left" size="large" ghost @press="handleBackBtn"/>
    </section>
    <slot></slot>
  </section>
</template>

<script>
import Button from '@/components/Button'
export default {
  props: {
    title: {
      type: String,
      default: '标题'
    }
  },

  components: {
    Button
  },

  data () {
    return { }
  },

  methods: {
    handleBackBtn () {
      this.$router.go(-1)
    }
  }
}
</script>

<style scoped lang="less">
.container {
  padding: 10px;
  .backBtn {
    position: absolute;
    left: 10px;
    top: 10px;
  }
  h2 {
    text-align: center;
    line-height: 36px;
    font-weight: normal;
    font-size: 18px;
  }
}
</style>
