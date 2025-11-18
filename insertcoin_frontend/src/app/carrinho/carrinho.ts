import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CarrinhoService, ItemCarrinho } from '../service/carrinho.service';

@Component({
  selector: 'app-carrinho',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './carrinho.html',
  styleUrl: './carrinho.css'
})
export class Carrinho implements OnInit {
  
  itens: ItemCarrinho[] = [];
  valorTotal: number = 0;
  
  constructor(
    private carrinhoService: CarrinhoService,
    private router: Router
  ) {}
  
  ngOnInit(): void {
    this.carregarCarrinho();
    
    this.carrinhoService.itens$.subscribe(() => {
      this.carregarCarrinho();
    });
  }
  
  carregarCarrinho() {
    this.itens = this.carrinhoService.getItens();
    this.valorTotal = this.carrinhoService.getValorTotal();
  }
  
  getPreco(item: ItemCarrinho): number {
    return item.produto.promo > 0 && item.produto.promo < item.produto.valor
      ? item.produto.promo
      : item.produto.valor;
  }
  
  getSubtotal(item: ItemCarrinho): number {
    return this.getPreco(item) * item.quantidade;
  }
  
  aumentarQuantidade(item: ItemCarrinho) {
    if (item.quantidade < item.produto.quantidade) {
      this.carrinhoService.alterarQuantidade(item.produto.codigo, item.quantidade + 1);
    } else {
      alert(`Só temos ${item.produto.quantidade} unidades em estoque!`);
    }
  }
  
  diminuirQuantidade(item: ItemCarrinho) {
    if (item.quantidade > 1) {
      this.carrinhoService.alterarQuantidade(item.produto.codigo, item.quantidade - 1);
    }
  }
  
  remover(item: ItemCarrinho) {
    if (confirm(`Remover ${item.produto.nome} do carrinho?`)) {
      this.carrinhoService.remover(item.produto.codigo);
    }
  }
  
  limparCarrinho() {
    if (confirm('Deseja limpar todo o carrinho?')) {
      this.carrinhoService.limpar();
    }
  }
  
  continuarComprando() {
    this.router.navigate(['/vitrine']);
  }
  
  finalizarCompra() {
    
    const usuario = localStorage.getItem('usuario');
    
    if (!usuario) {
      alert('Você precisa fazer login para finalizar a compra!');
      this.router.navigate(['/login']);
      return;
    }
    
    if (this.itens.length === 0) {
      alert('Seu carrinho está vazio!');
      return;
    }
    
    this.router.navigate(['/checkout']);
  }
}
