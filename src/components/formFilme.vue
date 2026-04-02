<script setup>
import { ref } from "vue"
import { db } from "../firebase/config"
import { collection, addDoc } from "firebase/firestore"
const titulo = ref("")
const genero = ref("")
const duracao = ref("")
const poster = ref("")
const preco = ref("")

const cadastrarFilme = async () => {

  try {

    await addDoc(collection(db, "filmes"), {
      titulo: titulo.value,
      genero: genero.value,
      duracao: duracao.value,
      poster: poster.value,
      preco: preco.value
    })

    alert("Filme cadastrado com sucesso!")

    titulo.value = ""
    genero.value = ""
    duracao.value = ""
    imagem.value = ""
    preco.value = ""

  } catch (error) {

    console.log(error)

  }

}

</script>

<template>

  <div class="form-container">
    <h2>Cadastrar Filme</h2>

    <form @submit.prevent="cadastrarFilme">

      <label>Título do Filme</label>
      <input type="text" v-model="titulo" placeholder="Digite o título">

      <label>Gênero</label>
      <input type="text" v-model="genero" placeholder="Ex: Ação">

      <label>Duração</label>
      <input type="number" v-model="duracao" placeholder="Minutos">

      <label>Valor</label>
      <input type="number" v-model="preco" placeholder="R$">

      <label>URL da Imagem</label>
      <input type="text" v-model="poster" placeholder="Link do poster">

      <button type="submit">Cadastrar</button>

    </form>
  </div>
</template>

<style scoped>
   @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Jost:ital,wght@0,100..900;1,100..900&family=Roboto:ital,wght@0,100..900;1,100..900&display=swap');
 
    .form-container{
  background-color: #0a0f1a;
  padding: 30px;
  border-radius: 15px;
  width: 400px;
  margin: 100px auto;
  font-family: "Jost", sans-serif;

}

.form-container h2{
    color: white;
    background-color: red;
    width: 200px;
    text-align: center;
    padding: 15px;
    border-radius: 15px;
}

form{
  display: flex;
  flex-direction: column;
  gap: 10px;
}

label{
  color: white;
  font-weight: bold;
}

input{
  padding: 10px;
  border-radius: 8px;
  border: none;
}

button{
  margin-top: 10px;
  padding: 10px;
  background-color: red;
  color: white;
  border: none;
  border-radius: 10px;
  cursor: pointer;
}
</style>