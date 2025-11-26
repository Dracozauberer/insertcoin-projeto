import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Cliente } from '../model/cliente';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/cliente';
  private usuarioLogadoSubject: BehaviorSubject<Cliente | null>;
  public usuarioLogado$: Observable<Cliente | null>;
  
  public getUsuarioLogado(): Cliente | null {
    return this.usuarioLogadoSubject.value;
  }
  
  constructor(private http: HttpClient) {
    const usuarioSalvo = localStorage.getItem('usuario');
    const usuario = usuarioSalvo ? JSON.parse(usuarioSalvo) : null;
    
    this.usuarioLogadoSubject = new BehaviorSubject<Cliente | null>(usuario);
    this.usuarioLogado$ = this.usuarioLogadoSubject.asObservable();
  }

  solicitarRecuperacao(email: string) {
  return this.http.post('http://localhost:8080/api/cliente/solicitar-recuperacao', { email }, { responseType: 'text' });
  }

  redefinirSenha(token: string, novaSenha: string): Observable<string> {
    const body = {
      token,
      novaSenha
    };
    return this.http.post<string>(`${this.apiUrl}/redefinir-senha`, body, { responseType: 'text' as 'json' }) as Observable<string>;
  }
  
  get usuarioAtual(): Cliente | null {
    return this.usuarioLogadoSubject.value;
  }
  
  
  estaLogado(): boolean {
    return this.usuarioAtual !== null;
  }
  
 
  login(usuario: Cliente) {
    localStorage.setItem('usuario', JSON.stringify(usuario));
    this.usuarioLogadoSubject.next(usuario);
    console.log('✅ Login realizado:', usuario.nome);
  }
  
  logout() {
    localStorage.removeItem('usuario');
    this.usuarioLogadoSubject.next(null);
    console.log('👋 Logout realizado');
  }
  
  atualizarUsuario(usuario: Cliente) {
    localStorage.setItem('usuario', JSON.stringify(usuario));
    this.usuarioLogadoSubject.next(usuario);
  }
}
