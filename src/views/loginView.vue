<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from 'firebase/auth'
import Logo from '../assets/logo.png'


import { auth } from '../firebase/config' 


const router = useRouter()



const email = ref('')
const senha = ref('')
const erro = ref('')


const fazerlogin = async () => {
  erro.value = ''
  try {
    await signInWithEmailAndPassword(auth, email.value, senha.value)
    router.push('/dashboard')
  } catch (e) {
    erro.value = 'Nao foi possivel entrar. Verifique email e senha.'
  }
}

const registrar = async () => {
  erro.value = ''
  try {
    // Cria o usuário no Firebase Authentication.
    // Se o e-mail já existir ou a senha for fraca, o Firebase lança erro.
    await createUserWithEmailAndPassword(auth, email.value, senha.value)

    // Conta criada e usuário já autenticado — redireciona direto.
    router.push('/dashboard')
  } catch (e) {
    erro.value = 'Nao foi possivel cadastrar. Verifique os dados.'
  }
}
</script>

<template>
  <div class="login-container">

    <div class="login-card">

      <div id="top-login">
       
        <img id="logoCine" src = "../assets/logo.png" alt="">
        
      </div>

      <p class="subtitulo">Faça login para continuar</p>

      <input
        v-model="email"
        type="email"
        placeholder="Seu email"
        class="input"
      />

      <input
        v-model="senha"
        type="password"
        placeholder="Sua senha"
        class="input"
      />

      <button class="login-btn" @click="fazerlogin">
        Entrar
      </button>

      <button class="registrar-btn" @click="registrar">
        Registrar
      </button>

    </div>

  </div>
</template>

<style scoped>

.login-container{
  height:100vh;
  display:flex;
  justify-content:center;
  align-items:center;

  background:
  linear-gradient(rgba(0,0,0,0.75), rgba(0,0,0,0.85)),
  url('/src/assets/cinema-bg.jpg');

  background-size:cover;
  background-position:center;
}

.login-card{
  width:380px;
  padding:40px;

  background:rgba(20,20,20,0.95);
  border-radius:12px;

  box-shadow:0px 10px 40px rgba(0,0,0,0.7);

  display:flex;
  flex-direction:column;
  gap:15px;

  text-align:center;
}

.logo{
  color:#e50914;
  font-size:28px;
}

.subtitulo{
  color:#aaa;
  margin-bottom:10px;
}

.input{
  padding:12px;
  border:none;
  border-radius:6px;

  background:#2a2a2a;
  color:white;

  outline:none;
}

.login-btn{
  padding:12px;
  margin-top:10px;

  background:#e50914;
  border:none;

  color:white;
  font-weight:bold;

  border-radius:6px;
  cursor:pointer;

  transition:0.3s;
}

.login-btn:hover{
  background:#ff1e28;
}

.registrar-btn{
  display: flex;
  justify-content: flex-end;
  margin-top:5px;

  background: none;
  border:none;

  color:white;
  font-weight:bold;

  border-radius:6px;
  cursor:pointer;

  transition:0.3s;
}

#logoCine{
  width: 300px;
  height:180px;
}


</style>