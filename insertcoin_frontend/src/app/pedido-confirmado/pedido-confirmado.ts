import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pedido-confirmado',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pedido-confirmado.html',
  styleUrl: './pedido-confirmado.css'
})
export class PedidoConfirmado {
  
  constructor(private router: Router) {}
  
  irParaVitrine() {
    this.router.navigate(['/vitrine']);
  }
  
  verMeusPedidos() {
    this.router.navigate(['/meus-pedidos']);
  }
}