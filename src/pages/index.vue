<template>
  <section class="container">
    <h1>EVENUI</h1>
    <ListRow title="按钮" link @onLink="handleLink('/demo/button')" />
    <ListRow title="列表项" link @onLink="handleLink('/demo/listRow')" />
    <ListRow title="模态框" link @onLink="handleLink('/demo/modal')" />
    <ListRow title="标签切换" link @onLink="handleLink('/demo/tabs')" />
    <ListRow title="抽屉" link @onLink="handleLink('/demo/accordion')" />
    <ListRow title="日历" link @onLink="handleLink('/demo/calendar')" />
  </section>
</template>

<script>
import ListRow from '@/components/ListRow'
export default {
  components: {
    ListRow
  },

  data () {
    return {
    }
  },

  methods: {
    handleLink (path) {
      this.$router.push(path)
    }
  }
}
</script>

<style scoped lang="less">
h1 {
  font-size: 20px;
  font-weight: normal;
  line-height: 60px;
  text-align: center;
}
</style>
