<script setup>
import { onMounted, ref } from "vue"
import { db } from "../firebase/config"
import { collection, addDoc, getDocs} from "firebase/firestore"
const sala = ref("")
const assentos = ref("")


//armaazena os dados do fireBase
const listaFilmes = ref([])
//identifica o filme selecionado
const filmeSelecionado = ref([])

//Função que busca os filmes no firebase
const buscarFilmes = async () => {
  //Acessa a coleção filmes
  const resposta = await getDocs(collection(db,"filmes"))
  
  // percorre os documentos e transforma em array
  listaFilmes.value = resposta.docs.map(filmes => ({
      id: filmes.id,
      ...filmes.data()
  }))
}

// executa a função quando o componente carregar
onMounted(() => {
  buscarFilmes()
})


const cadastrarSessao = async () => {

  try {

    await addDoc(collection(db, "Sessão"), {
        sala:  sala.value,
        assentos: assentos.value,
        filmeId: filmeSelecionado.value
    })

    

    alert("Sessão cadastrada com sucesso!")

    sala.value = ""
    assentos.value = ""
    filmeSelecionado.value = ""


  } catch (error) {

    console.log(error)

  }

}

</script>

<template>

  <div class="form-container">
    <h2>Cadastrar Sessão</h2>

    <form @submit.prevent="cadastrarSessao">

      <label>Sala</label>
      <input type="text" v-model="sala" placeholder="Digite qual sala...">

      <label>Assentos</label>
      <input type="number" v-model="assentos" placeholder="Número de assentos disponíveis...">

      <label>Selecione o filme</label>
      <select v-model="filmeSelecionado" >
        <option v-for="filmes in listaFilmes" :key="filmes.id" :value="filmes.id">
        {{ filmes.titulo }}
      </option>
      </select>

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

select{
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