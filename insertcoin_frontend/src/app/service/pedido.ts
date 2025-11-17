import { Injectable } from '@angular/core';
import { Pedido } from '../model/pedido';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PedidoService {
  

  private apiUrl = 'http://localhost:8080/api';
  
  constructor(private http: HttpClient) { }

  gravar(obj: Pedido): Observable<any> {
    return this.http.post(`${this.apiUrl}/pedido`, obj);
  }

  carregar(codigo: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/pedido/${codigo}`);
  }

  listarTodos(): Observable<any> {
    return this.http.get(`${this.apiUrl}/pedidos`);
  }

  listarPorCliente(clienteId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/pedidos/cliente/${clienteId}`);
  }
}