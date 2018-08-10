<template>
  <Page title="折叠面板">
    <section class="row">
      <h3>基本用法</h3>
      <Accordion>
        <AccordionItem title="标题1">
          <h3>这里是折叠面板内容</h3>
        </AccordionItem>
        <AccordionItem title="标题2">
          <h3>这里是折叠面板内容</h3>
        </AccordionItem>
        <AccordionItem title="标题3">
          <h3>这里是折叠面板内容</h3>
        </AccordionItem>
      </Accordion>
      <h3>只展示一个</h3>
      <Accordion collapsible>
        <AccordionItem title="标题1">
          <h3>这里是折叠面板内容</h3>
        </AccordionItem>
        <AccordionItem title="标题2">
          <h3>这里是折叠面板内容</h3>
        </AccordionItem>
        <AccordionItem title="标题3">
          <h3>这里是折叠面板内容</h3>
        </AccordionItem>
      </Accordion>
    </section>
  </Page>
</template>

<script>
import Page from './page'
import { Accordion, AccordionItem } from '@/components'

export default {
  components: {
    Page, Accordion, AccordionItem
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
  h3 {
    font-size: 14px;
    font-weight: normal;
    line-height: 40px;
  }
}
</style>
