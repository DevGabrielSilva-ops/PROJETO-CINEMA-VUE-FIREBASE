<script setup>
import { computed } from 'vue' 
import { useAuthStore } from '@/stores/authStore';
const authStore = useAuthStore()
const userEmail = computed(() => authStore.user?.email || 'Nenhum usuario logado')


import { ref, onMounted } from "vue"
import { collection, getDocs } from "firebase/firestore"
import { db } from "@/firebase/config"

const filmes = ref([])

const carregarFilmes = async () => {

  const querySnapshot = await getDocs(collection(db, "filmes"))

  filmes.value = querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }))

}

onMounted(() => {
  carregarFilmes()
})
</script>


<template>
  <section id="container">
    
    <div class="top-logo">
      <img id="logo" src = "../../assets/logo.png" alt="Error">

      <div id="user">
         <img src="../../assets/user.fw.png" alt="">
         <p>{{ userEmail }}</p>
      </div>
    </div>
    

     <div class="filme-background">

      <div class="filme-card">
         <div v-for="filme in filmes" :key="filme.id"  class="filme">
            <img :src="filme.poster" alt="">
          </div>

      </div>
    </div>

    
  </section>
</template>

<style scoped>

    #container{
      width: 100%;
      height: 100%;
      
    }
    .top-side{
      display: flex;
      gap: 60px;
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

    .filme-card{
      display: flex;
      gap: 30px;
      align-items: center;
      justify-content: center;
      
    }

    .filme{
      
      background-color: beige;
      width: 230px;
      height: 300px;
      border-radius: 15px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }

    .filme img{
       width: 230px;
      height: 300px;
      border-radius: 15px;
    }

    .filme-background{
      background-color:rgb(10, 15, 26) ;
      display: flex;
      justify-content: center;
      align-items: center;

      margin-top: 40px;
      width: 80%;
      
    }
   
</style>