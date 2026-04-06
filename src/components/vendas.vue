<script setup>

import { ref, onMounted, computed } from "vue"
import { collection, getDocs, addDoc } from "firebase/firestore"
import { db } from "@/firebase/config"
import { useAuthStore } from "@/stores/authStore"

const authStore = useAuthStore()
const filmes = ref([])
const sessoes = ref([])
const vendaAtiva = ref(false)
const filmeSelecionado = ref(null)
const sessaoSelecionada = ref(null)
const tipoIngresso = ref("inteira")
const quantidade = ref(0)

const carregarFilmes = async () => {

    const resposta = await getDocs(collection(db, "filmes"))

    filmes.value = resposta.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }))

}

const sessoesFiltradas = computed(() => {

    if (!filmeSelecionado.value) return []

    return sessoes.value.filter(sessao =>
        sessao.filmeTitulo === filmeSelecionado.value.titulo
    )

})

const finalizarVenda = async () => {

    await addDoc(collection(db, "vendas"), {
        filme: filmeSelecionado.value.titulo,
        sessao: sessaoSelecionada.value.sala,
        tipoIngresso: tipoIngresso.value,
        quantidade: quantidade.value,
        total: total.value,
        vendedor: authStore.user.email,
        data: new Date()
    })

    alert("Venda realizada com sucesso!")

    vendaAtiva.value = false
}

const total = computed(() => {

    let preco = tipoIngresso.value === "inteira" ? 25 : 12.5

    return preco * quantidade.value

})

const carregaSessao = async () => {
    const resposta = await getDocs(collection(db, "sessao"))

    sessoes.value = resposta.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }))
}

const iniciarVenda = () => {
    vendaAtiva.value = true
}

onMounted(() => {
    carregarFilmes()
    carregaSessao()

})






</script>

<template>
    <section id="container">
        <div class="venda-layout">
            <div id="venda-info">
                <p>Bem Vindo - {{ authStore.user.email }}</p>
                <button id="inicia-venda" @click="iniciarVenda">Iniciar Nova Venda</button>
            </div>

            <div id="form-venda" v-if="vendaAtiva">
                <h2>Tela de Vendas</h2>
                <form id="tela-vendas" action="">

                    <label>Selecione Filme</label>
                    <select v-model="filmeSelecionado">
                        <option v-for="filme in filmes" :key="filme.id" :value="filme">
                            {{ filme.titulo }}
                        </option>
                    </select>

                    <label>Selecione Sessão</label>
                    <select v-model="sessaoSelecionada">
                        <option v-for="sessao in sessoesFiltradas" :key="sessao.id" :value="sessao">
                             {{ sessao.sala }} - {{ sessao.horario }}
                        </option>
                    </select>

                    <label>Tipo de Ingresso</label>

                    <select v-model="tipoIngresso">

                        <option value="inteira">Inteira</option>
                        <option value="meia">Meia</option>

                    </select>


                    <label>Quantidade</label>

                    <input type="number" v-model="quantidade" min="1"/>


                    <p>Total: R$ {{ total }}</p>


                    <button type="button" @click="finalizarVenda">
                        Finalizar Venda
                    </button>

                </form>
            </div>
        </div>



    </section>
</template>

<style scoped>
#container {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    min-height: 100vh;
    background: #0a0f1a;
    font-family: "Jost";
}

.venda-layout {
    display: flex;
    flex-direction: column;
    width: 900px;
    background: #111827;
    padding: 30px;
    border-radius: 12px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
}

/* Cabeçalho */

#venda-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30px;
    color: white;
}

#venda-info p {
    font-size: 18px;
}

#venda-info button {
    padding: 12px 25px;
    border: none;
    border-radius: 8px;
    background: #e50914;
    color: white;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    transition: 0.3s;
}

#venda-info button:hover {
    background: #b20710;
    transform: scale(1.05);
}

/* Formulario */

#form-venda {
    background: #1f2937;
    padding: 25px;
    border-radius: 10px;
}

#form-venda h2 {
    text-align: center;
    margin-bottom: 20px;
    color: white;
    background: #e50914;
    padding: 10px;
    border-radius: 8px;
}

/* Grid do formulario */

#tela-vendas {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    color: white;
}

/* labels */

#tela-vendas label {
    font-size: 14px;
}

/* inputs e selects */

#tela-vendas select,
#tela-vendas input {
    width: 100%;
    padding: 10px;
    border: none;
    border-radius: 6px;
    background: #374151;
    color: white;
}

/* total */

#tela-vendas p {
    grid-column: span 2;
    font-size: 20px;
    font-weight: bold;
    text-align: center;
}

/* botão finalizar */

#tela-vendas button {
    grid-column: span 2;
    padding: 12px;
    border: none;
    border-radius: 8px;
    background: #22c55e;
    color: white;
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
    transition: 0.3s;
}

#tela-vendas button:hover {
    background: #16a34a;
    transform: scale(1.05);
}
</style>