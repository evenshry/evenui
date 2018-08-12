<template>
  <Page title="模态窗">
    <ListRow title="基本用法" link @onLink="handleModal(0, true)"/>
    <ListRow title="无标题栏" link @onLink="handleModal(1, true)"/>
    <Modal title="基本用法" :visible="modal[0]" @close="handleModal(0, false)">
      <h1>基本用法的测试内容</h1>
    </Modal>
    <Modal :header="false" :visible="modal[1]" @close="handleModal(1, false)">
      <h1>无标题栏的测试内容</h1>
    </Modal>
  </Page>
</template>

<script>
import Page from './page'
import { Modal, ListRow } from '@/components'

export default {
  components: {
    Page, ListRow, Modal
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
h1 {
  font-size: 16px;
  font-weight: normal;
  line-height: 40px;
}
</style>
