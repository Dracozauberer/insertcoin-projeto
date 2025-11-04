import { Routes } from '@angular/router';
import { Vitrine } from './vitrine/vitrine';
import { Sobre } from './sobre/sobre';
import { Contato } from './contato/contato';
import { Cadastro } from './cadastro/cadastro';

export const routes: Routes = [
    {path:"vitrine", component:Vitrine},
    {path:"contato", component:Contato},
    {path:"sobre", component:Sobre},
    {path:"cadastro", component:Cadastro}
];
