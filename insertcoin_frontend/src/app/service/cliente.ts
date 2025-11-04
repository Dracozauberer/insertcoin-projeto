import { Injectable } from '@angular/core';
import { Cliente } from '../model/cliente';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ClienteService {
  constructor(private http: HttpClient) {  }
  
  gravar(obj:Cliente) : Observable<any> {
    return this.http.post("http://localhost:8080/api/cliente", obj);
  }
  alterar(obj:Cliente) : Observable<any> {
    return this.http.put("http://localhost:8080/api/cliente", obj);
  }
  carregar(codigo:number) : Observable<any> {
    return this.http.get("http://localhost:8080/api/cliente/"+ codigo);
  }
  remover(codigo:number) : Observable<any> {
    return this.http.delete("http://localhost:8080/api/cliente/"+ codigo);
  }
  listar(): Observable<any> {
    return this.http.get("http://localhost:8080/api/clientes");
  }
}
