<script setup>

import { ref, onMounted } from "vue"
import { collection, getDocs } from "firebase/firestore"
import { db } from "@/firebase/config"


const filmes = ref([])

const carregarFilmes = async () => {

    const resposta = await getDocs(collection(db, "filmes"))

    filmes.value = resposta.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }))

}

onMounted(() => {
    carregarFilmes()
})


//Função Carrosel
const posicao = ref(0)


function proximoFilme() {
    if (posicao.value < filmes.value.length - 4) {
        posicao.value++
    }
}

function voltarFilme() {
    if (posicao.value > 0) {
        posicao.value--
    }
}

//Modal

const modalAberto = ref(false)
const filmeSelecionado = ref(null)

function abrirModal(filme) {
    filmeSelecionado.value = filme
    modalAberto.value = true
}
</script>

<template>
    <section id="container">

        <div class="filme-background">

            <h2 id="titulo">FILMES DISPONIVEIS</h2>

            <div class="filme-card">

                <img @click="voltarFilme()" src="../assets/setaesquerda.svg" alt="">


                <div class="carrosel-container">

                    <div class="carrosel-elementos" :style="{ transform: `translateX(-${posicao * 25}%)` }">

                        <div v-for="filme in filmes" :key="filme.id" class="filme">
                            <img :src="filme.poster" alt=""> <button @click="abrirModal(filme)">SAIBA MAIS</button>
                        </div>

                    </div>


                </div>


                <img @click="proximoFilme()" src="../assets/setadireita.svg" alt="">

                <div v-if="modalAberto" class="modal">

                    <div class="modal-content">
                       <div class="modal-layout">
                            <button @click="modalAberto = false">
                                 Fechar
                            </button>
                            <div class="informacoes-layout">
                                <img id="modal-img" :src= "filmeSelecionado.poster" alt="">
                                <h2>{{ filmeSelecionado.titulo }}</h2>
                                
                            </div>
                            
                            <div class="valor">
                                <div id="valor-layout">
                                    <p>Duração: {{ filmeSelecionado.duracao }} min</p>
                                    <p>Gênero: {{ filmeSelecionado.genero }}</p>
                                </div>
                                
                                <p id="preco">R$: {{ filmeSelecionado.preco }}</p>
                            </div>
                            
                        </div> 
                    </div>

                </div>

            </div>

        </div>


    </section>
</template>

<style scoped>
#container {
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: "Jost";
}

.filme-card {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 30px;
}

.filme {
    position: relative;
    background-color: beige;
    width: 230px;
    height: 300px;
    border-radius: 15px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-width: 23.5%;

}

.filme img {
    width: 230px;
    height: 300px;
    border-radius: 15px;
    width: 100%;

}

.filme-background {
    background-color: rgb(10, 15, 26);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    margin-top: 40px;
    width: 80%;

}

#titulo {
    color: white;
    background-color: red;
    padding: 20px;
    border-radius: 15px
}

.carrosel-container {
    overflow: hidden;
    width: 920px;
}

.carrosel-elementos {
    display: flex;
    gap: 15px;
    transition: transform 0.4s ease;
}

.carrosel-elementos button{
    cursor: pointer;
}

.filme:hover {
    transform: scale(1.05);
    transition: 0.3s;
}

.filme:hover button {
    opacity: 1;
}

.filme button {
    position: absolute;

    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    font-family: "Jost";
    font-weight: bold;
    padding: 8px 15px;
    border: none;
    border-radius: 8px;

    background-color: rgb(243, 7, 7);
    color: white;

    opacity: 0;

    transition: 0.3s;
}

.modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;

    background: rgba(0, 0, 0, 0.7);

    display: flex;
    justify-content: center;
    align-items: center;
}

.modal-content {
    background: rgb(10, 15, 26);
    padding: 30px;
    border-radius: 10px;
    width: 400px;
    
}

.modal-layout button{ 
    border-radius: 15px;
    border: none;
    background-color: red;
    font-family: "Jost", "san-serif";
    color: white;
    font-size: 15px;
    cursor: pointer;
    margin-left: 350px;
    padding: 8px;
    

}


.informacoes-layout{
    display: flex;
    flex-direction: column;
    color: white;
    justify-content: center;
    align-items: center;
}

#modal-img{
    width: 200px;
    height: 300px;
}

.valor{
    color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
}

#valor-layout{
    display: flex;
    justify-content: center;
    gap: 120px;
    font-size: 15px;
}

#preco{
    font-weight: bold;
    font-size: 20px;
    color: rgb(43, 218, 43);
}
</style>