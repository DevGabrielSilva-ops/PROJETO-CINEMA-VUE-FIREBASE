import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/loginView.vue'
import DashboardViewAdmin from '../views/admin/dashboardAdmin.vue'
import VendaViewVendedor from '../views/vendedor/vendaView.vue'
import CadastroFilmesView from '../views/admin/filmesAdmin.vue'

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
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router