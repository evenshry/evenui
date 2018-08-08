<template>
  <section class="container">
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

</style>
