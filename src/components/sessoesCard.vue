<script setup>

import { ref, onMounted } from "vue"
import { collection, getDocs } from "firebase/firestore"
import { db } from "@/firebase/config"

const listarSessoes = ref([])

const carregarSessoes = async () => {
    const resposta = await getDocs(collection(db, "sessao"))

    listarSessoes.value = resposta.docs.map(documento => ({
        id: documento.id,
        ...documento.data()
    }))

}

onMounted(() => {
    carregarSessoes()
})
</script>

<template>
    <section class="container">

        <div class="background-sessao">


            <h2 id="titulo-sessao">SESSÕES DISPONIVEIS</h2>
            <div id="lista-sessoes">



                <table>

                    <thead>
                        <tr>

                            <th>Sessão</th>
                            <th>Horário</th>
                            <th>Filme</th>


                        </tr>
                    </thead>

                    <tbody>

                        <tr v-for="sessao in listarSessoes" :key="sessao.id">

                            <td>{{ sessao.sala }}</td>
                            <td>{{ sessao.horario }}</td>
                            <td>{{ sessao.filmeTitulo }}</td>

                        </tr>

                    </tbody>

                </table>

            </div>

        </div>

    </section>
</template>

<style scoped>
.container {
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: "Jost";
}

.background-sessao {
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: rgb(10, 15, 26);
    border-radius: 15px;
    margin-top: 80px;
    width: 80%;
}

#titulo-sessao {
    text-align: center;
    color: white;
    background-color: red;
    padding: 15px;
    border-radius: 15px;
}

#lista-sessoes {
    color: white;
    font-size: 25px;


}

#lista-sessoes ul {
    list-style-type: none;
}

#lista-layout {
    display: flex;
    flex-direction: column;
    gap: 25px;
}

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