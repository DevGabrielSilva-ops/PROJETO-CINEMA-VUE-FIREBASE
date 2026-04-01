<script setup>
import { onMounted, ref } from "vue"
import Chart from "chart.js/auto"

const canvasRef = ref(null)

onMounted(() => {

  new Chart(canvasRef.value, {
    type: "pie",

    data: {
      labels: ["Avatar 2", "Batman", "Vingadores", "Interestelar"],

      datasets: [
        {
          label: "Ingressos vendidos",

          data: [120, 90, 70, 50],

          backgroundColor: [
            "#E50914",
            "#3B82F6",
            "#10B981",
            "#F59E0B"
          ]
        }
      ]
    }

  })

})
</script>

<template>
  <canvas ref="canvasRef"></canvas>
</template>