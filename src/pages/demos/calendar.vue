<template>
  <Page title="日历选择">
    <section class="row">
      <h3>左右滑动切换月</h3>
      <Calendar :value="currentDate"/>
      <h3>上下滑动切换月</h3>
      <Calendar :value="currentDate" direction="vertical"/>
    </section>
  </Page>
</template>

<script>
import Page from './page'
import { Calendar } from '@/components'
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
