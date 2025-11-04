import { Injectable } from '@angular/core';
import { Produto } from '../model/produto';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ProdutoService {
  constructor(private http: HttpClient) { }

  gravar(obj:Produto) : Observable<any> {
    return this.http.post("http://localhost:8080/api/produto", obj);
  }
  alterar(obj:Produto) : Observable<any> {
    return this.http.put("http://localhost:8080/api/produto", obj);
  }
  carregar(codigo:number) : Observable<any> {
    return this.http.get("http://localhost:8080/api/produto/"+ codigo);
  }
  remover(codigo:number) : Observable<any> {
    return this.http.delete("http://localhost:8080/api/produto/"+ codigo);
  }
  listar(): Observable<any> {
    return this.http.get("http://localhost:8080/api/produtos");
  }
  vitrine(): Observable<any> {
    return this.http.get("http://localhost:8080/api/produtos/vitrine");
  }
}
