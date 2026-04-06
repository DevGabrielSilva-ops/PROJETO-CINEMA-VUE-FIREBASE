<script setup>
import { ref, onMounted } from "vue"
import { collection, getDocs } from "firebase/firestore"
import { db } from "@/firebase/config"

const vendas = ref([])

const carregarVendas = async () => {

    const resposta = await getDocs(collection(db, "vendas"))

    vendas.value = resposta.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }))

}

onMounted(() => {
    carregarVendas()
})
</script>


<template>

    <section id="historico">

        <h2>Histórico de Vendas</h2>

        <table>

            <thead>
                <tr>

                    <th>Filme</th>
                    <th>Sessão</th>
                    <th>Tipo</th>
                    <th>Quantidade</th>
                    <th>Total</th>
                    <th>Vendedor</th>

                </tr>
            </thead>

            <tbody>

                <tr v-for="venda in vendas" :key="venda.id">

                    <td>{{ venda.filme }}</td>
                    <td>{{ venda.sessao }}</td>
                    <td>{{ venda.tipoIngresso }}</td>
                    <td>{{ venda.quantidade }}</td>
                    <td>R$ {{ venda.total }}</td>
                    <td>{{ venda.vendedor }}</td>

                </tr>

            </tbody>

        </table>

    </section>
</template>

<style scoped>
#historico {
    margin-top: 40px;
    color: white;
}

table {
    width: 100%;
    border-collapse: collapse;
}

th {
    background-color: red;
    padding: 10px;
}

td {
    padding: 10px;
    text-align: center;
    border-bottom: 1px solid gray;
}

tr:hover {
    background-color: rgba(255, 255, 255, 0.1);
}
</style>
