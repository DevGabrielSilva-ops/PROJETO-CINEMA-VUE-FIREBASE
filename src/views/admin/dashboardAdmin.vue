<script setup>
import { ref } from 'vue' 
import GraficoVendas from "@/components/GraficoVenda.vue"
import GraficoSessao from '@/components/GraficoSessao.vue';
import GraficoFilmes from '@/components/GraficoFilmes.vue';
import Header from '@/components/header.vue'



const FaturamnetoTotal = ref(3450.50)
</script>


<template>
  <section id="container">
    
  <Header></Header>

  <div class="DashBoard">
    
   
    <div class="Card-itens">
    <div id="Vendas-Card">
      <h2>Relátorio Vendas</h2>
      <GraficoVendas/>
    </div>
    </div>

    <div class="Card-itens">
    <div id="Vendas-Card">
      <h2>Filmes Mais Assitidos</h2>
      <GraficoFilmes/>
    </div>
    </div>
    


   
    <div class="Card-itens-f">
      <div class="Faturamento-Card">
       <h2>Faturamento Total</h2>
        <p>R$: {{ FaturamnetoTotal }}</p>
      </div>
    </div>

     <div class="Card-itens">
      <div class="Sessao-Card">
       <h2>Sessões</h2>
        <GraficoSessao/>
      </div>
    </div>


    
     
  </div>
  
   
  </section>
</template>

<style scoped>

    .DashBoard{
      display: grid;
      grid-template-columns: repeat(2,0fr);
      gap: 100px;
      margin-top: 100px;
      justify-content: center;
      align-items: center;
      
    }

    .DashBoard h2{
        color: white;
        text-align: center;
        background-color: red;
        width: 200px;
        padding: 15px;
        border-radius: 15px;
    }

    #Vendas-Card{
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 20px;
      
    }

    .Faturamento-Card p{
      color: rgb(243, 244, 242);
      font-size: 40px;
      text-align: center;
    }

    .Faturamento-Card {
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .Card-itens{
      background-color: rgb(10, 15, 26);
      border-radius: 15px;
      height: 100%;
      padding: 25px;
    }

    .Sessao-Card p{
        color: white;
    }

    .Sessao-Card{
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    canvas{
       max-width: 400px;
        max-height: 300px;
    }
    .Card-itens-f{
      background-color: rgb(10, 15, 26);
      border-radius: 15px;
      height: 80%;
      padding: 25px;
    }

  

   


   
</style>