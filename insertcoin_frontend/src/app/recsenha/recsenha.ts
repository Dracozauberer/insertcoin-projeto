import { Component } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-recsenha',
  imports: [FormsModule, CommonModule],
  templateUrl: './recsenha.html',
  styleUrl: './recsenha.css',
})
export class Recsenha {
  email: string = '';
  novaSenha: string = '';
  token: string = '';
  mensagem: string = '';
  etapa: number = 1;
  carregando: boolean = false;

  constructor(private authService: AuthService) {}

  solicitarRecuperacao() {
    this.carregando = true;
    this.mensagem = '';

    this.authService.solicitarRecuperacao(this.email).subscribe(
      (response) => {
        this.mensagem = 'Email enviado! Verifique sua caixa de entrada.';
        this.etapa = 2;
      },
      (error) => {
        this.mensagem = 'Erro ao enviar email. Verifique o endereço.';
      }
    );
  }

  redefinirSenha() {
    this.authService.redefinirSenha(this.token, this.novaSenha).subscribe(
      (response) => {
        this.mensagem = 'Senha redefinida com sucesso!';
        setTimeout(() => {
          window.location.href = '/login'; 
        }, 2000);
      },
      (error) => {
        this.mensagem = 'Erro ao redefinir a senha. Por favor, tente novamente.';
      }
    );
  }
}