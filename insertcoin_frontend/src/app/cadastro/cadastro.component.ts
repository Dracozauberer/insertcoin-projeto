import { Component } from '@angular/core';
import { Cliente } from '../model/cliente';
import { ClienteService } from '../service/cliente.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.css'
})
export class CadastroComponent {
  mensagem:String = "";
  obj:Cliente = new Cliente();
  constructor(private service: ClienteService){}
  
  gravar(){
     this.service.gravar(this.obj).subscribe({
        next:(data)=>{
          this.mensagem = "Cliente cadastrado com sucesso!";
        },
        error:(error)=>{
          this.mensagem = "Ocorreu um erro. Por favor, tente mais tarde!";
        } 
     });
  }
}
