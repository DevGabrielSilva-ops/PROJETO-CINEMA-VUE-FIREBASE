<script setup>
import { ref } from "vue"
import { db, auth, firebaseConfig } from "../firebase/config"

import { initializeApp } from "firebase/app"
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth"

import { doc, setDoc } from "firebase/firestore"

const email = ref("")
const senha = ref("")
const tipo = ref("")

const cadastrarUsuario = async () => {

  try {

    // cria uma segunda instância do Firebase Auth
    const secondApp = initializeApp(firebaseConfig, "SecondApp")
    const secondAuth = getAuth(secondApp)

    const credencial = await createUserWithEmailAndPassword(
      secondAuth,
      email.value,
      senha.value
    )

    const idUsuario = credencial.user.uid

    // transfere dados para o Firestore (sem salvar senha)
    await setDoc(doc(db, "usuarios", idUsuario), {
      email: email.value,
      senha: senha.value,
      tipo: tipo.value
    })

    alert("Usuário cadastrado com sucesso!")

    email.value = ""
    senha.value = ""
    tipo.value = ""

  } catch (error) {

    console.log(error)

  }

}
</script>

<template>

  <div class="form-container">
    <h2>Cadastrar Usuários</h2>

    <form @submit.prevent="cadastrarUsuario" >

      <label>E-mail</label>
      <input type="email" v-model="email" placeholder="Digite o e-mail..." required>

      <label>Senha</label>
      <input type="password" v-model="senha" placeholder="Digite a senha..." required>

      <label>Selecione Permissões</label>
      <select v-model="tipo" required>
        <option value="">Selecione...</option>
        <option value="Funcionario">Funcionário</option>
        <option value="Administrador">Administrador</option>
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
  width: 300px;
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
  font-family: "Jost", sans-serif;
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