<template>
  <Page title="标签切换">
    <section class="row">
      <h3>平均选项</h3>
      <Accordion>
        <section slot="header">标题</section>
        <section slot="content">
          <h3>平均选项</h3>
        </section>
      </Accordion>
      <Accordion>
        <section slot="header">标题</section>
        <section slot="content">
          <h3>平均选项</h3>
        </section>
      </Accordion>
      <Accordion>
        <section slot="header">标题</section>
        <section slot="content">
          <h3>平均选项</h3>
        </section>
      </Accordion>
    </section>
  </Page>
</template>

<script>
import Page from './page'
import Accordion from '@/components/Accordion'

export default {
  components: {
    Page, Accordion
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
