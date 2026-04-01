<script setup>
import { onMounted, ref } from "vue"
import Chart from "chart.js/auto"

const canvasRef = ref(null)

onMounted(() => {
  new Chart(canvasRef.value, {
    type: "bar",

    data: {
      labels: ["Sala 1", "Sala 2", "Sala 3"],

      datasets: [
        {
          label: "Ocupação (%)",
          data: [70, 30, 100],
          backgroundColor: "#E50914"
        }
      ]
    },

    options: {
      indexAxis: 'y', // 🔥 deixa horizontal

      scales: {
        x: {
          max: 100
        }
      }
    }
  })
})
</script>

<template>
  <canvas ref="canvasRef"></canvas>
</template>