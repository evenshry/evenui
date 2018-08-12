
  <section class="ui-accordion">
    <slot></slot>
  </section>
</template>

<script>
export default {
  props: {
    collapsible: {
      type: Boolean,
      default: false
    }
  },

  computed: {
  },

  data () {
    return {
    }
  },

  mounted () {
  },

  methods: {
    update (_uid) {
      if (this.collapsible) {
        for (let i = 0; i < this.$children.length; i++) {
          this.$children[i].update(_uid)
        }
      }
    }
  }
}

</script>

<style lang="less">
.ui-accordion {
  position: relative;

}
</style>
