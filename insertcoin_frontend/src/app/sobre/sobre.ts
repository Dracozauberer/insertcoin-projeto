import { CommonModule, formatCurrency } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-sobre',
  imports: [CommonModule, FormsModule],
  templateUrl: './sobre.html',
  styleUrl: './sobre.css',
})
export class Sobre {
  public teste(){
    console.log("teste");
  }
}
