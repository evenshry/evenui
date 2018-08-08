<template>
  <Page title="标签切换">
    <section class="row">
      <h3>平均选项</h3>
      <Tabs :data="['选项一', '选项二', '选项三', '选项4']"/>
    </section>
    <section class="row">
      <h3>设定选项宽度100，超出可滑动</h3>
      <Tabs :data="['选项一', '选项二', '选项三', '选项4']" :itemWidth="100"/>
    </section>
    <section class="row">
      <h3>设定颜色背景</h3>
      <Tabs :data="['选项一', '选项二', '选项三', '选项4']" color="#2d8cf0" backgroundColor="#f9f9f9"/>
    </section>
  </Page>
</template>

<script>
import Page from './page'
import Tabs from '@/components/Tabs'

export default {
  components: {
    Page, Tabs
  },

  data () {
    return {
      modal: [false, false]
    }
  },

  methods: {
    handleModal (index, visible) {
      this.$set(this.modal, index, visible)
    }
  }
}
</script>

<style scoped lang="less">
.row {
  margin: 10px 10px 0px 10px;
  h3 {
    font-size: 14px;
    font-weight: normal;
    line-height: 40px;
  }
}
</style>
