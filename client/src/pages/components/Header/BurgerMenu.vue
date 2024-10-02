<template>
    <button aria-label="Mobile Navigation Button" :class="menuOpen ? 'burger open' : 'burger' " @click="handleToggleMenu">
        <div class="line line-1"></div>
        <div class="line line-3"></div>
        <div class="line line-2"></div>
  </button>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const menuOpen = ref(false)

function handleToggleMenu() {
  menuOpen.value = !menuOpen.value
}
</script>

<style lang="scss" scoped>
.burger {
  border: none;
  background: none;
  width: 38px;
  height: 40px;
  cursor: pointer;
  z-index: 100;

  @media ( max-width: 490px ) {
    scale: 0.8;
  }

  .line {
    width: 100%;
    height: 4px;
    border-radius: 20px;
    background: $main-font-color;
    margin: 12px 0;
    transition: all 0.4s ease-out;


  }
  &.open {
    .line-1 {
      transform: translateY(15.5px) rotate(45deg);
    }
    .line-2 {
      transform: translateY(-15.5px) rotate(-45deg);
    }
    .line-3 {
      transform-origin: center;  
      transform: scale(0);
    }
  }
}
</style>