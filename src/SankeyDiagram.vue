<script setup lang="ts">
import useEcharts from "./assets/useEcharts.ts";
import {onMounted, ref} from "vue";

const useSvg = ref<boolean>(false);
const style_settings = {width: "1440px", height: "780px"};

function switchUseSvgValue() {
  useSvg.value = !useSvg.value;
}

onMounted(() => {
  const svgContainer = document.getElementById("svgContainer");
  const canvasContainer = document.getElementById("canvasContainer");

  try {
    useEcharts(svgContainer as HTMLDivElement, true, switchUseSvgValue);
    useEcharts(canvasContainer as HTMLDivElement, false, switchUseSvgValue);
  } catch (e) {
    console.error(e);
  }
});

</script>

<template>
  <div v-show="useSvg" :style="style_settings" id="svgContainer"></div>
  <div v-show="!useSvg" :style="style_settings" id="canvasContainer"></div>
</template>

<style scoped>

</style>
