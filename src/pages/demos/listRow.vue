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
        <input type="text" placeholder="请输入"/>
      </section>
    </ListRow>
    <ListRow title="标题">
      <i slot="icon" class="more iconfont icon-user"></i>
      <section slot="detail">
        <Button type="primary">详情</Button>
      </section>
    </ListRow>
  </Page>
</template>

<script>
import Page from './page'
import { Button, ListRow } from '@/components'

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
input {
  border: 0px solid #e5e5e5;
  border-bottom-width: 1px;
  line-height: 30px;
  padding: 0px 10px;
  text-align: right;
  &:focus {
    outline: none;
    box-shadow: none;
  }
}

</style>
