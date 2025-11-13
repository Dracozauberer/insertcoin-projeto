import { Component } from '@angular/core';
import { Cliente } from '../model/cliente';
import { ClienteService } from '../service/cliente';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  mensagem: String = "";
  obj: Cliente = new Cliente();
  
  constructor(
    private service: ClienteService,
    private router: Router
  ){}
  
  fazerLogin(){
     this.service.fazerLogin(this.obj).subscribe({
        next:(data)=>{
          if(data.codigo > 0){
            
            localStorage.setItem('usuario', JSON.stringify(data));
            this.mensagem = "Login efetuado com sucesso!";
            this.router.navigate(['/vitrine']); 
          } else {
            this.mensagem = "Email ou senha incorretos!";
          }
        },
        error:(error)=>{
          this.mensagem = "Erro ao fazer login!";
        } 
     });
  }
  
  logout(){
    localStorage.removeItem('usuario');
    this.router.navigate(['/login']);
  }
}
