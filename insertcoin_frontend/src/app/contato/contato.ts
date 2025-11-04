import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

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

constructor(){
  this.alerta="";
}

  public enviarEmail(){
   
      this.alerta = "Seu email foi enviado com sucesso, em breve entraremos em contato";     
     let corpoEmail = "nome:"+ this.nome +"<br>"+
      "telefone:"+this.telefone +"<br>" +
      "email:"+this.email + "<br>" +
      "assunto:"+ this.assunto + "<br>"+
      "mensagem:"+ this.mensagem + "<br>";
      console.log(corpoEmail);
      localStorage.setItem("emailContato", corpoEmail);
  }
  
}
