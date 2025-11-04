import { Component } from '@angular/core';
import { Produto } from '../model/produto';
import { ProdutoService } from '../service/produto';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-vitrine',
  imports: [CommonModule, FormsModule],
  templateUrl: './vitrine.html',
  styleUrl: './vitrine.css',
})
export class Vitrine {
  mensagem: String = "";
    lista: Produto[] = [];

    constructor(private service:ProdutoService){
       this.carregarLista();
    }

    carregarLista(){
      this.service.vitrine().subscribe({
        next:(data)=>{
          this.mensagem = "";
          this.lista = data;
        },
        error:(error)=>{
          this.mensagem = "Ocorreu um erro, tente mais tarde!";
        } 
      });
    }
}
