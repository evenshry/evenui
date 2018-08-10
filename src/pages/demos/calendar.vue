<template>
  <Page title="标签切换">
    <section class="row">
      <h3>平均选项</h3>
      <Calendar :value="currentDate"/>
    </section>
  </Page>
</template>

<script>
import Page from './page'
import Calendar from '@/components/Calendar'
import moment from 'moment'

export default {
  components: {
    Page, Calendar
  },

  data () {
    return {
      currentDate: moment().format('YYYY-MM-DD')
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
