import { Routes } from '@angular/router';
import { Vitrine } from './vitrine/vitrine';
import { Sobre } from './sobre/sobre';
import { Contato } from './contato/contato';
import { Cadastro } from './cadastro/cadastro';
import { Home } from './home/home';
import { Login } from './login/login';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: Home },
  { path: 'vitrine', component: Vitrine },
  { path: 'contato', component: Contato },
  { path: 'sobre', component: Sobre },
  { path: 'cadastro', component: Cadastro },
  { path: 'login', component: Login }
];


