import { Routes } from '@angular/router';
import { Vitrine } from './vitrine/vitrine';
import { Sobre } from './sobre/sobre';
import { Contato } from './contato/contato';
import { Cadastro } from './cadastro/cadastro';
import { Home } from './home/home';
import { Login } from './login/login';
import { DetalheProduto } from './detalhe-produto/detalhe-produto';
import { Carrinho } from './carrinho/carrinho';
import { Checkout } from './checkout/checkout';
import { PedidoConfirmado } from './pedido-confirmado/pedido-confirmado';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: Home },
  { path: 'vitrine', component: Vitrine },
  { path: 'contato', component: Contato },
  { path: 'sobre', component: Sobre },
  { path: 'cadastro', component: Cadastro },
  { path: 'produto/:codigo', component: DetalheProduto },
  { path: 'login', component: Login },
  { path: 'carrinho', component: Carrinho },
  { path: 'checkout', component: Checkout },         
  { path: 'pedido-confirmado', component: PedidoConfirmado }

];


