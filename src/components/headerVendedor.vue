<script setup>
import { computed} from 'vue' 
import { useAuthStore } from '@/stores/authStore';
import { useRouter } from 'vue-router';
const authStore = useAuthStore()
const userEmail = computed(() => authStore.user?.email || 'Nenhum usuario logado')
const router = useRouter()


const RetornaLogin = () => {
    const button = document.getElementById("sair")
    if(button.click = true) {
        authStore.logout()
        router.push("/login")
    }
}
</script>


<template>
  <section id="container">
    
    <div class="top-logo">
      <img id="logo" src = "../assets/logo.png" alt="Error">

      <div id="user">
         <img  src="../assets/user.fw.png" alt="">
         <p>{{ userEmail }}</p>
         <button id="sair" @click="RetornaLogin()">Sair</button>
      </div>
    </div>
    
    <div class="top-side">
      <div class="menu">
        <img class="top-img" src="../assets/dashboard.png" alt="error"> 
        <router-link to="/vendas" class="meu-botao">
         <p>VENDAS</p>
         </router-link>
      </div>

      <div class="menu">
        <img class="top-img" src="../assets/sessões.svg" alt="error"> 
        <router-link to="/vendas" class="meu-botao">
         <p>SESSÕES</p>
         </router-link>
      </div>

      <div class="menu">
        <img class="top-img" src="../assets/sessões.svg" alt="error"> 
        <router-link to="/vendas" class="meu-botao">
         <p>HISTÓRICO</p>
         </router-link>
      </div>
      
      

    </div>

  
   
  </section>
</template>

<style scoped>
    
    @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Jost:ital,wght@0,100..900;1,100..900&family=Roboto:ital,wght@0,100..900;1,100..900&display=swap');
    .container{
      font-family: "Jost", sans-serif;
    }
    .top-side{
      display: flex;
      gap: 60px;
      padding: 20px;
      background-color: rgb(10, 15, 26);
      justify-content: center;
      align-items: center;
    }

    a{
      text-decoration: none;
      color: white;
    }

    a:hover{
      
      color: rgb(78, 78, 123);
    }

    .menu{
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 10px;
      padding: 10px;
      border-radius: 15px;
      cursor: pointer;
      font-size: 20px;
      font-weight: bold;
     
      
    }

    #logo{
      width: 200px;
      height:150px;
    }

    #user{
      display: flex;
      align-items: center;
      gap: 10px;
    }

    #user p{
      color: white;
      
    }

    #user img{
      width: 40px;
      height: 40px;
    }

    .top-logo{
      display: flex;
      justify-content: space-between;
      margin-left: 30px;
      margin-right: 30px;
    }

    .top-img{
      width: 40px;
      height: 40px;
    } 
    
    #sair{
      width: 50px;
      height: 30px;
      border-radius: 15px;
      border: none;
      background-color: red;
      font-family: "Jost", "san-serif";
      color: white;
      font-size: 15px;
      cursor: pointer;
    }

   
</style>