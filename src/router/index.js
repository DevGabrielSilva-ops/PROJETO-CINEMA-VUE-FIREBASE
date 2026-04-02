import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/loginView.vue'
import DashboardViewAdmin from '../views/admin/dashboardAdmin.vue'
import VendaViewVendedor from '../views/vendedor/vendaView.vue'
import CadastroFilmesView from '../views/admin/filmesAdmin.vue'
import SessaoViewAdmin from '../views/admin/sessaoAdmin.vue'
import FuncionarioViewAdmin from '../views/admin/funcionarioAdmin.vue'

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    component: LoginView
  },
  {
    path: '/dashboard',
    component: DashboardViewAdmin
  },
  {
    path: '/vendas',
    component: VendaViewVendedor
  },

  {
    path: '/cadFilme',
    component: CadastroFilmesView
  },

  {
    path: '/cadSessao',
    component: SessaoViewAdmin
  },

   {
    path: '/cadFuncionario',
    component: FuncionarioViewAdmin
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router