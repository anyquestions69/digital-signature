<template>
  <div class="wrapper">
    <RouterView />
  </div>
</template>

<script setup lang="ts">
  import { RouterView } from 'vue-router'
</script>

<style lang="scss">


.wrapper {
  width: 100%;
  overflow: hidden;
}
</style>