<script setup>
import { onMounted } from "vue"
import Chart from "chart.js/auto"

onMounted(() => {

  const ctx = document.getElementById("graficoVendas")

  new Chart(ctx, {
    type: "bar",

    data: {
      labels: ["Seg", "Ter", "Qua", "Qui", "Sex", "Sab", "Dom"],

      datasets: [
        {
          label: "Ingressos vendidos",

          

          backgroundColor: "red"
        }
      ]
    },

    options: {
      responsive: true
    }

  })

})
</script>

<template>
  <div class="grafico">
    <canvas id="graficoVendas"></canvas>
  </div>
</template>

<style scoped>
.grafico{
  width:600px;
}
</style>