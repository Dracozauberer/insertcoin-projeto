import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Produto } from '../model/produto';
import { ProdutoService } from '../service/produto';

@Component({
  selector: 'app-produto-detalhe',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './detalhe-produto.html',
  styleUrl: './detalhe-produto.css'
})
export class DetalheProduto implements OnInit {
  
  produto: Produto = new Produto();
  carregando: boolean = true;
  mensagem: string = "";
  quantidade: number = 1;
  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: ProdutoService
  ) {}
  
  ngOnInit(): void {
    // Pega o código da URL
    const codigo = this.route.snapshot.paramMap.get('codigo');
    
    if (codigo) {
      this.carregarProduto(+codigo); // + converte string para número
    }
  }
  
  carregarProduto(codigo: number) {
    this.carregando = true;
    
    this.service.carregar(codigo).subscribe({
      next: (data) => {
        console.log("✅ Produto carregado:", data);
        this.produto = data;
        this.carregando = false;
      },
      error: (error) => {
        console.error("❌ Erro ao carregar:", error);
        this.mensagem = "Erro ao carregar produto!";
        this.carregando = false;
      }
    });
  }
  
  adicionarAoCarrinho() {
    // TODO: Implementar lógica do carrinho
    console.log(`Adicionando ${this.quantidade}x ${this.produto.nome} ao carrinho`);
    alert(`${this.quantidade}x ${this.produto.nome} adicionado ao carrinho!`);
  }
  
  voltarParaVitrine() {
    this.router.navigate(['/vitrine']);
  }
  
  aumentarQuantidade() {
    if (this.quantidade < this.produto.quantidade) {
      this.quantidade++;
    }
  }
  
  diminuirQuantidade() {
    if (this.quantidade > 1) {
      this.quantidade--;
    }
  }
  // Adicione dentro da classe ProdutoDetalhe
calcularDesconto(valorOriginal: number, valorPromo: number): number {
  return Math.round(((valorOriginal - valorPromo) / valorOriginal) * 100);
  }
}