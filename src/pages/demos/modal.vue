<template>
  <Page title="模态窗">
    <ListRow title="基本用法" link @onLink="handleModalClose(true)"/>
    <Modal :visible="modalVisible" @close="handleModalClose(false)"/>
  </Page>
</template>

<script>
import Page from './page'
import Button from '@/components/Button'
import Modal from '@/components/Modal'

export default {
  components: {
    Page, Button, Modal
  },

  data () {
    return {
      modalVisible: false
    }
  },

  methods: {
    handleModalClose (visible) {
      this.modalVisible = visible
    }
  }
}
</script>

<style scoped lang="less">
</style>
