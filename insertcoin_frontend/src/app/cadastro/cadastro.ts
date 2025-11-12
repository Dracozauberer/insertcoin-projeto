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
          console.log("Resposta do backend:", data);
          this.mensagem = "Cliente cadastro com sucesso!";
          this.obj = new Cliente();
        },
        error:(error)=>{
          
          this.mensagem = "Ocorreu um erro, tente mais tarde!";
        } 
     });
  }
  alterar(){
     this.service.alterar(this.obj).subscribe({
        next:(data)=>{
          this.mensagem = "Cliente alterado com sucesso!";
        },
        error:(error)=>{
          this.mensagem = "Ocorreu um erro, tente mais tarde!";
        } 
     });
}
  codigoCliente: number = 0;

  carregar(){
      this.service.carregar(this.codigoCliente).subscribe({
          next:(data)=>{
        this.obj = data;
        this.mensagem = "Cliente carregado com sucesso!";
      },
      error:(error)=>{
        this.mensagem = "Cliente não encontrado!";
      } 
   });
}
  lista: Cliente[] = [];

  listarTodos(){
   this.service.listar().subscribe({
      next:(data)=>{
        this.lista = data;
        this.mensagem = "";
      },
      error:(error)=>{
        this.mensagem = "Erro ao carregar lista!";
      } 
   });
}
  remover(codigo: number){
   if(confirm("Tem certeza que deseja remover este cliente?")){
      this.service.remover(codigo).subscribe({
          next:(data)=>{
          this.mensagem = "Cliente removido com sucesso!";
        },
        error:(error)=>{
          this.mensagem = "Erro ao remover!";
        } 
     });
   }
}
  listaInativos: Cliente[] = [];

    listarInativos(){
   this.service.listarInativos().subscribe({
      next:(data)=>{
        this.listaInativos = data;
        this.mensagem = "";
      },
      error:(error)=>{
        this.mensagem = "Erro ao carregar inativos!";
      } 
   });
}
}

