<template>
  <Page title="按钮">
    <section class="row">
      <Button >default</Button>
      <Button type="info">info</Button>
      <Button type="primary">primary</Button>
    </section>
    <section class="row">
      <Button type="success">success</Button>
      <Button type="warning">warning</Button>
      <Button type="error">error</Button>
    </section>
    <section class="row">
      <Button disabled>disabled</Button>
      <Button type="primary" disabled>disabled</Button>
    </section>
    <section class="row">
      <Button icon="icon-user">用户</Button>
      <Button icon="icon-user"/>
    </section>
    <section class="row">
      <Button ghost>default</Button>
      <Button type="primary" ghost>primary</Button>
      <Button type="info" ghost>info</Button>
      <Button type="success" ghost>success</Button>
      <Button type="warning" ghost>warning</Button>
      <Button type="error" ghost>error</Button>
      <Button type="primary" icon="icon-user" ghost>用户</Button>
      <Button type="primary" icon="icon-user" ghost/>
    </section>
    <section class="row">
      <Button type="primary" size="small">small</Button>
      <Button type="primary" size="normal">normal</Button>
      <Button type="primary" size="middle">middle</Button>
      <Button type="primary" size="large">large</Button>
    </section>
  </Page>
</template>

<script>
import Page from './page'
import Button from '@/components/Button'

export default {
  components: {
    Page, Button
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
.row {
  margin: 10px 10px 0px 10px;
}
</style>
