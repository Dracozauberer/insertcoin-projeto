import { Component, OnInit } from '@angular/core';
import { Produto } from '../model/produto';
import { ProdutoService } from '../service/produto';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CarrinhoService } from '../service/carrinho.service';


@Component({
  selector: 'app-vitrine',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './vitrine.html',
  styleUrl: './vitrine.css',
})
export class Vitrine implements OnInit {  
  
  mensagem: string = ""; 
  lista: Produto[] = [];
  carregando: boolean = false; 
  
  constructor(private service: ProdutoService, private carrinhoService: CarrinhoService) {} 
  
  ngOnInit(): void {
    this.carregarLista();
  }
  
  adicionarAoCarrinho(produto: any) {
    this.carrinhoService.adicionar(produto, 1);
    alert(`${produto.nome} adicionado ao carrinho!`);
  }

  carregarLista() {
    this.carregando = true; 
    
    this.service.vitrine().subscribe({
      next: (data) => {
        console.log("✅ Produtos carregados:", data);  
        this.mensagem = "";
        this.lista = data;
        this.carregando = false;  
      },
      error: (error) => {
        console.error("❌ Erro ao carregar:", error);  
        this.mensagem = "Ocorreu um erro, tente mais tarde!";
        this.carregando = false;  
      } 
    });
  }
}