import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Produto } from '../model/produto';
import { ProdutoService } from '../service/produto';
import { CarrinhoService } from '../service/carrinho.service';


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
    private service: ProdutoService,
    private carrinhoService: CarrinhoService
  ) {}
  
  ngOnInit(): void {
    
    const codigo = this.route.snapshot.paramMap.get('codigo');
    
    if (codigo) {
      this.carregando = true;
      this.service.carregar(+codigo).subscribe({
      next: (data) => {
        this.produto = data;
        this.carregando = false;
      },
      error: (error) => {
        this.carregando = false;
      }
    });
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
  
  adicionarAoCarrinho(produto: any) {
    this.carrinhoService.adicionar(produto, 1);
    alert(`${produto.nome} adicionado ao carrinho!`);
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