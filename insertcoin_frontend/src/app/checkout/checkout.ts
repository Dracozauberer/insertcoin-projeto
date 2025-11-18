import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CarrinhoService, ItemCarrinho } from '../service/carrinho.service';
import { PedidoService } from '../service/pedido';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './checkout.html',
  styleUrl: './checkout.css'
})
export class Checkout implements OnInit {
  
  itens: ItemCarrinho[] = [];
  valorTotal: number = 0;
  usuario: any = null;
  
  processando: boolean = false;
  mensagem: string = "";
  
  constructor(
    private carrinhoService: CarrinhoService,
    private pedidoService: PedidoService,
    private router: Router
  ) {}
  
  ngOnInit(): void {
    // Verifica se está logado
    const usuarioStr = localStorage.getItem('usuario');
    if (!usuarioStr) {
      alert('Você precisa fazer login para finalizar a compra!');
      this.router.navigate(['/login']);
      return;
    }
    
    this.usuario = JSON.parse(usuarioStr);
    
    // Carrega carrinho
    this.itens = this.carrinhoService.getItens();
    this.valorTotal = this.carrinhoService.getValorTotal();
    
    // Se carrinho vazio, volta
    if (this.itens.length === 0) {
      alert('Seu carrinho está vazio!');
      this.router.navigate(['/carrinho']);
    }
  }
  
  getPreco(item: ItemCarrinho): number {
    return item.produto.promo > 0 && item.produto.promo < item.produto.valor
      ? item.produto.promo
      : item.produto.valor;
  }
  
  getSubtotal(item: ItemCarrinho): number {
    return this.getPreco(item) * item.quantidade;
  }
  
  finalizarPedido() {
    if (this.processando) return;
    
    this.processando = true;
    this.mensagem = "";
    
    // Montar objeto do pedido
    const pedido = {
      cliente: {
        codigo: this.usuario.codigo
      },
      itens: this.itens.map(item => ({
        produto: {
          codigo: item.produto.codigo
        },
        quantidade: item.quantidade,
        precoUnitario: this.getPreco(item).toString()
      }))
    };
    
    console.log('📦 Enviando pedido:', pedido);
    
    // Enviar para o backend
    this.pedidoService.gravar(pedido as any).subscribe({
      next: (response) => {
        console.log('✅ Pedido criado com sucesso!', response);
        
        // Limpar carrinho
        this.carrinhoService.limpar();
        
        // Mostrar mensagem de sucesso
        alert('🎉 Pedido realizado com sucesso!\nEm breve você receberá um email de confirmação.');
        
        // Redirecionar para página de sucesso ou pedidos
        this.router.navigate(['/pedido-confirmado']);
      },
      error: (error) => {
        console.error('❌ Erro ao criar pedido:', error);
        this.mensagem = 'Erro ao finalizar pedido. Tente novamente!';
        this.processando = false;
      }
    });
  }
  
  voltarParaCarrinho() {
    this.router.navigate(['/carrinho']);
  }
}
