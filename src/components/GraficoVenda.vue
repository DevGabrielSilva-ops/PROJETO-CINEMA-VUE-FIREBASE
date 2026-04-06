<script setup>
import { onMounted } from "vue"
import { collection, getDocs } from "firebase/firestore"
import { db } from "@/firebase/config"
import Chart from "chart.js/auto"

onMounted(async () => {

  const vendasSnapshot = await getDocs(collection(db, "vendas"))

  const vendasPorDia = [0,0,0,0,0,0,0]

  vendasSnapshot.docs.forEach(doc => {

    const venda = doc.data()
    const data = venda.data.toDate()
    const dia = data.getDay()

    vendasPorDia[dia] += venda.quantidade

  })

  const ctx = document.getElementById("graficoVendas")

  new Chart(ctx, {

    type: "bar",

    data: {
      labels: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"],

      datasets: [
        {
          label: "Ingressos vendidos",
          data: vendasPorDia,
          backgroundColor: "red"
        }
      ]
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