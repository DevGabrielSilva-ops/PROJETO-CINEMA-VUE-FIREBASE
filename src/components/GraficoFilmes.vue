<script setup>

import { onMounted, ref } from "vue"
import { collection, getDocs } from "firebase/firestore"
import { db } from "@/firebase/config"
import Chart from "chart.js/auto"

const canvasRef = ref(null)

onMounted(async () => {

  const vendasSnapshot = await getDocs(collection(db, "vendas"))

  const vendasPorFilme = {}

  vendasSnapshot.docs.forEach(doc => {

    const venda = doc.data()

    if(!vendasPorFilme[venda.filme]){
      vendasPorFilme[venda.filme] = 0
    }

    vendasPorFilme[venda.filme] += venda.quantidade

  })

  const labels = Object.keys(vendasPorFilme)
  const data = Object.values(vendasPorFilme)

  new Chart(canvasRef.value, {

    type: "pie",

    data: {

      labels: labels,

      datasets: [
        {
          label: "Ingressos vendidos",

          data: data,

          backgroundColor: [
            "#E50914",
            "#3B82F6",
            "#10B981",
            "#F59E0B",
            "#8B5CF6"
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