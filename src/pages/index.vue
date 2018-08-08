<template>
  <section class="container">
    <h1>EVENUI</h1>
    <ListRow title="按钮" link @onLink="handleLink('/demo/button')" />
    <ListRow title="列表项" link @onLink="handleLink('/demo/listRow')" />
    <ListRow title="模态框" link @onLink="handleLink('/demo/modal')" />
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
