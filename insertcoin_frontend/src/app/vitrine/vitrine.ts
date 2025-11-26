import { Component, OnInit } from '@angular/core';
import { Produto } from '../model/produto';
import { ProdutoService } from '../service/produto';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CarrinhoService } from '../service/carrinho.service';

@Component({
  selector: 'app-vitrine',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './vitrine.html',
  styleUrl: './vitrine.css',
})
export class Vitrine implements OnInit {  
  termoBusca: string = "";
  mensagem: string = ""; 
  lista: Produto[] = [];
  carregando: boolean = false; 
  
  constructor(
    private service: ProdutoService, 
    private carrinhoService: CarrinhoService, 
    private route: ActivatedRoute
  ) {} 
  
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.termoBusca = params['busca'] || '';
      this.carregarLista();
    }); 
  }
  
  adicionarAoCarrinho(produto: any) {
    this.carrinhoService.adicionar(produto, 1);
    alert(`${produto.nome} adicionado ao carrinho!`);
  }

  carregarLista() {
    this.carregando = true; 
    
    if (this.termoBusca.trim()) {
      
      this.service.buscar(this.termoBusca).subscribe(
        (data) => {  
          console.log("✅ Produtos filtrados:", data);  
          this.mensagem = data.length > 0 ? "" : "Nenhum produto encontrado para '" + this.termoBusca + "'.";
          this.lista = data;
          this.carregando = false;  
        },
        (error) => {  
          console.error("❌ Erro na busca:", error);  
          this.mensagem = "Erro na busca, tente novamente!";
          this.carregando = false;  
        }
      );
    } else {
      
      this.service.vitrine().subscribe(
        (data) => {
          console.log("✅ Produtos da vitrine:", data);  
          this.mensagem = "";
          this.lista = data;
          this.carregando = false;  
        },
        (error) => {
          console.error("❌ Erro ao carregar vitrine:", error);  
          this.mensagem = "Ocorreu um erro, tente mais tarde!";
          this.carregando = false;  
        }
      );
    }
  }
}