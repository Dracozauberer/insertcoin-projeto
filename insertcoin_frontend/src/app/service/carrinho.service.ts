import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface ItemCarrinho {
  produto: any;
  quantidade: number;
}

@Injectable({
  providedIn: 'root'
})
export class CarrinhoService {
  
  private itens: ItemCarrinho[] = [];
  private itensSubject = new BehaviorSubject<ItemCarrinho[]>([]);
  
  itens$ = this.itensSubject.asObservable();
  
  constructor() {
    
    this.carregarDoLocalStorage();
  }
  
  private carregarDoLocalStorage() {
    const carrinhoSalvo = localStorage.getItem('carrinho');
    if (carrinhoSalvo) {
      this.itens = JSON.parse(carrinhoSalvo);
      this.itensSubject.next(this.itens);
    }
  }
  
  private salvarNoLocalStorage() {
    localStorage.setItem('carrinho', JSON.stringify(this.itens));
    this.itensSubject.next(this.itens);
  }
  
  adicionar(produto: any, quantidade: number = 1) {
    
    const itemExistente = this.itens.find(item => item.produto.codigo === produto.codigo);
    
    if (itemExistente) {
      itemExistente.quantidade += quantidade;
    } else {
      this.itens.push({ produto, quantidade });
    }
    
    this.salvarNoLocalStorage();
    console.log('✅ Produto adicionado ao carrinho:', produto.nome);
  }
  
  remover(codigoProduto: number) {
    this.itens = this.itens.filter(item => item.produto.codigo !== codigoProduto);
    this.salvarNoLocalStorage();
    console.log('🗑️ Produto removido do carrinho');
  }
  
  alterarQuantidade(codigoProduto: number, quantidade: number) {
    const item = this.itens.find(item => item.produto.codigo === codigoProduto);
    if (item) {
      item.quantidade = quantidade;
      if (item.quantidade <= 0) {
        this.remover(codigoProduto);
      } else {
        this.salvarNoLocalStorage();
      }
    }
  }
  
  limpar() {
    this.itens = [];
    this.salvarNoLocalStorage();
    console.log('🧹 Carrinho limpo');
  }
  
  getItens(): ItemCarrinho[] {
    return this.itens;
  }
  
  getQuantidadeTotal(): number {
    return this.itens.reduce((total, item) => total + item.quantidade, 0);
  }
  
  getValorTotal(): number {
    return this.itens.reduce((total, item) => {
      const preco = item.produto.promo > 0 && item.produto.promo < item.produto.valor 
        ? item.produto.promo 
        : item.produto.valor;
      return total + (preco * item.quantidade);
    }, 0);
  }
}
