import { Component } from '@angular/core';
import { Cliente } from '../model/cliente';
import { ClienteService } from '../service/cliente';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cadastro.html',
  styleUrl: './cadastro.css',
})
export class Cadastro {
  mensagem:String = "";
  obj:Cliente = new Cliente();
  constructor(private service: ClienteService){}
  
  gravar(){
     this.service.gravar(this.obj).subscribe({
        next:(data)=>{
          this.mensagem = "Cliente cadastro com sucesso!";
        },
        error:(error)=>{
          this.mensagem = "Ocorreu um erro, tente mais tarde!";
        } 
     });
  }
}
