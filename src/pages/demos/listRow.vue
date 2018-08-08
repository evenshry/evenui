<template>
  <Page title="列表项">
    <ListRow title="标题" detail="内容" />
    <ListRow title="标题" detail="内容" link />
    <ListRow title="标题" detail="内容" link>
      <i slot="icon" class="more iconfont icon-user"></i>
    </ListRow>
    <ListRow title="标题">
      <i slot="icon" class="more iconfont icon-user"></i>
      <section slot="detail">
        <input type="file" />
      </section>
    </ListRow>
  </Page>
</template>

<script>
import Page from './page'
import Button from '@/components/Button'
import ListRow from '@/components/ListRow'

export default {
  components: {
    Page, Button, ListRow
  },

  data () {
    return {
    }
  },

  methods: {

  }
}
</script>

<style scoped lang="less">
</style>
