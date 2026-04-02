<script setup>
import { ref } from "vue"
import { db,auth } from "../firebase/config"
import { createUserWithEmailAndPassword } from "firebase/auth"
import {  doc,setDoc } from "firebase/firestore"
const email = ref("")
const senha = ref("")
const tipo = ref([])

const cadastrarUsuario = async () => {
  
  
  try {
    
    const credencial = await createUserWithEmailAndPassword(
      auth,
      email.value,
      senha.value
    )

    
    const idUsuario = credencial.user.uid


    //Tranfere dados do Authentication para o firestore passando as permissões que o usuario deve ter
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

    <form @submit.prevent="cadastrarUsuario">

      <label>E-mail</label>
      <input type="text" v-model="email" placeholder="Digite o e-mail...">

      <label>Senha</label>
      <input type="text" v-model="senha" placeholder="Digite a senha...">

      <label>Selecione Permissões</label>
      <select v-model="tipo">
        <Option>Funcionário</Option>
        <Option>Administrador</Option>
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
  font-family: "Jost", "san-serif";
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