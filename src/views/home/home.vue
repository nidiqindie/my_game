<template>
  <div>
    <Nav :items="items"></Nav>
  </div>


</template>

<script setup lang="ts">
import Nav from '@/components/nav/nav.vue';
import type { navItem } from '@/components/nav/nav_item';
const items: navItem[] = [
  {name: '打字游戏', path: 'Typing_Practice'},
]
</script>

<style scoped lang="scss">

</style>
