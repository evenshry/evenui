<template>
  <section class="container">
    <button type="button" name="button" @click="handleModalClose(true)">弹窗</button>
    <Modal :visible="modalVisible" @close="handleModalClose(false)"/>
  </section>
</template>

<script>
import Modal from '@/components/Modal'
export default {
  components: {
    Modal
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
