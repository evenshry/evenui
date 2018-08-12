<template>
  <section class="appContianer">
    <transition
      mode="out-in"
      enter-active-class="animate slideUp"
      leave-active-class="animate fadeOut"
    >
      <router-view/>
    </transition>
  </section>
</template>

<script>
export default {}
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
.appContianer {

}
</style>
