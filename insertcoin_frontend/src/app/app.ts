import { Component, OnInit, signal } from '@angular/core';
import { RouterOutlet, Router} from '@angular/router';
import { Home } from "./home/home";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { ProdutoService } from './service/produto';
import { Produto } from './model/produto'; 
import { CarrinhoService } from './service/carrinho.service';
import { AuthService } from './service/auth.service';
import { Cliente } from './model/cliente';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Home, FormsModule, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

  title = 'frontend';
  usuarioLogado: Cliente | null = null;
  termoBusca: string = "";
  produtosBusca: Produto[] = [];
  mostrarResultados: boolean = false;
  carregando: boolean = false;

  quantidadeCarrinho: number = 0; 

constructor(
    private produtoService: ProdutoService,
    private router: Router,
    private carrinhoService: CarrinhoService,
    private authService: AuthService

  ) {
    this.carrinhoService.itens$.subscribe(itens => {
      this.quantidadeCarrinho = this.carrinhoService.getQuantidadeTotal();
    });
  }
  ngOnInit(): void {
    
    this.authService.usuarioLogado$.subscribe(usuario => {
      this.usuarioLogado = usuario;
      console.log('Usuário logado:', usuario?.nome || 'Nenhum');
    });
  }  
  fazerLogout() {
    if (confirm('Deseja realmente sair?')) {
      this.authService.logout();
      this.router.navigate(['/home']);
    }
  }
  
  fazerBusca() {
  
    if (this.termoBusca.trim() === "") {
      this.mostrarResultados = false;
      return;
    }
    
    this.carregando = true;
    

    this.produtoService.buscar(this.termoBusca).subscribe({
      next: (dados) => {
        console.log("Produtos encontrados:", dados);
        this.produtosBusca = dados;
        this.mostrarResultados = true;
        this.carregando = false;
      },
      error: (erro) => {
        console.error("Erro na busca:", erro);
        alert("Erro ao buscar produtos!");
        this.carregando = false;
      }
    });
  }
  
  verProduto(codigo: number) {
    this.mostrarResultados = false;
    this.termoBusca = "";
    this.router.navigate(['/produto', codigo]);
    
  }
  irParaCarrinho() {
  this.router.navigate(['/carrinho']);
  }
  
}
