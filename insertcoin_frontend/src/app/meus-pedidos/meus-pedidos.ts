import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { PedidoService } from '../service/pedido';  
import { AuthService } from '../service/auth.service';  

@Component({
  selector: 'app-meus-pedidos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './meus-pedidos.html',
  styleUrl: './meus-pedidos.css'
})
export class MeusPedidos implements OnInit {
  pedidos: any[] = [];
  carregando: boolean = false;
  mensagem: string = "";
  usuario: any = null;

  constructor(
    private pedidoService: PedidoService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.usuario = this.authService.getUsuarioLogado(); 
    if (!this.usuario) {
      alert('Faça login para ver seus pedidos!');
      this.router.navigate(['/login']);
      return;
    }
    this.carregarPedidos();
  }

  carregarPedidos() {
    this.carregando = true;
    this.pedidoService.listarPorCliente(this.usuario.codigo).subscribe({
      next: (data) => {
        this.pedidos = data;
        this.carregando = false;
        if (data.length === 0) {
          this.mensagem = "Você ainda não fez pedidos.";
        }
      },
      error: (err) => {
        console.error('Erro ao carregar pedidos:', err);
        this.mensagem = "Erro ao carregar pedidos.";
        this.carregando = false;
      }
    });
  }
}