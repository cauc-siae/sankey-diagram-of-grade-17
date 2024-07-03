<script setup lang="ts">
import SankeyDiagram from "./SankeyDiagram.vue";
</script>

<template>
  <main>
    <div style="width: calc(min(100vw, 1400px))">
      <SankeyDiagram/>
    </div>
  </main>
</template>

<style scoped>
main {
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: center;
  justify-items: center;
  align-items: center;
  min-height: 95vh;
  min-width: 98vw;
}
</style>
