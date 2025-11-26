import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-contato',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contato.html',
  styleUrl: './contato.css',
})
export class Contato {
 alerta:string="";
  nome:string="";
  telefone:string="";
  email:string="";
  mensagem:string="";
  numeroPedido:number=0;
  assunto:string="";

constructor(private http: HttpClient){
  this.alerta="";
}

  public enviarEmail(){

      if (!this.nome || !this.email || !this.mensagem || !this.assunto) {
      this.alerta = "Erro: Preencha os campos obrigatórios.";
      return;
    }
      const dados = {
      nome: this.nome,
      telefone: this.telefone,
      email: this.email,
      assunto: this.assunto,
      numeroPedido: this.numeroPedido,
      mensagem: this.mensagem
    };

    // Chama o backend
    this.http.post('http://localhost:8080/api/contato', dados, { responseType: 'text' })
      .subscribe({
        next: (response) => {
          this.alerta = "Seu email foi enviado com sucesso, em breve entraremos em contato.";
          // Limpa o formulário
          this.nome = ""; this.telefone = ""; this.email = ""; this.mensagem = ""; this.numeroPedido = 0; this.assunto = "";
        },
        error: (err) => {
          this.alerta = "Erro ao enviar: " + err.error;
        }
      });
  }
  
}
