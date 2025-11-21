import { Component } from '@angular/core';
import { Cliente } from '../model/cliente';
import { ClienteService } from '../service/cliente';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  mensagem: String = "";
  obj: Cliente = new Cliente();
  
  constructor(
    private service: ClienteService,
    private authService: AuthService, 
    private router: Router
  ){}
  
  fazerLogin(){
     this.service.fazerLogin(this.obj).subscribe({
        next:(data)=>{
          if(data && data.codigo > 0){
            
          this.authService.login(data);
          alert(`Bem-vindo, ${data.nome}!`);

          setTimeout(() => {
              this.router.navigate(['/home']); 
            }, 1000);
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
