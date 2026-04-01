<script setup>
import { computed, ref } from 'vue' 
import { useAuthStore } from '@/stores/authStore';
const authStore = useAuthStore()
const userEmail = computed(() => authStore.user?.email || 'Nenhum usuario logado')

</script>


<template>
  <section id="container">
    
    <div class="top-logo">
      <img id="logo" src = "../assets/logo.png" alt="Error">

      <div id="user">
         <img  src="../assets/user.fw.png" alt="">
         <p>{{ userEmail }}</p>
      </div>
    </div>
    
    <div class="top-side">
      <div class="menu">
        <router-link to="/dashboard" class="meu-botao">
         <i>🖥️</i> DASHBOARD
         </router-link>
      </div>
      
      
      <div class="menu">
        <router-link to="/cadFilme">
         <i>🖥️</i> FILMES
         </router-link>
      </div>
      
     

      <div class="menu">
        <router-link to="/login" class="meu-botao">
          <i>🪑</i>SESSÕES
         </router-link>
      </div>

      <div class="menu">
        <router-link to="/login" class="meu-botao">
          <i>🪑</i>FUNCIONÁRIOS
         </router-link>
      </div>
    </div>

  
   
  </section>
</template>

<style scoped>

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
      
      padding: 10px;
      border-radius: 15px;
      cursor: pointer;
      font-size: 20px;
      font-weight: bold;
      font-family: Arial, Helvetica, sans-serif;
      
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
   
</style>