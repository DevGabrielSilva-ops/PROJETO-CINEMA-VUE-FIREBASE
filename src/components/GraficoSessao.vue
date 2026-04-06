<script setup>

import { onMounted, ref } from "vue"
import { collection, getDocs } from "firebase/firestore"
import { db } from "@/firebase/config"
import Chart from "chart.js/auto"

const canvasRef = ref(null)

onMounted(async () => {

  const vendasSnapshot = await getDocs(collection(db, "vendas"))

  const vendasPorSala = {}

  vendasSnapshot.docs.forEach(doc => {

    const venda = doc.data()

    if(!vendasPorSala[venda.sessao]){
      vendasPorSala[venda.sessao] = 0
    }

    vendasPorSala[venda.sessao] += venda.quantidade

  })

  const labels = Object.keys(vendasPorSala)
  const ingressosVendidos = Object.values(vendasPorSala)

  const capacidadeSala = 100

  const ocupacao = ingressosVendidos.map(v =>
    Math.round((v / capacidadeSala) * 100)
  )

  new Chart(canvasRef.value, {

    type: "bar",

    data: {
      labels: labels,

      datasets: [
        {
          label: "Ocupação (%)",
          data: ocupacao,
          backgroundColor: "#E50914"
        }
      ]
    },

    options: {
      indexAxis: "y",

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