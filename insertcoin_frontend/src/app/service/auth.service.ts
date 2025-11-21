import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Cliente } from '../model/cliente';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  private usuarioLogadoSubject: BehaviorSubject<Cliente | null>;
  public usuarioLogado$: Observable<Cliente | null>;
  
  constructor() {
    const usuarioSalvo = localStorage.getItem('usuario');
    const usuario = usuarioSalvo ? JSON.parse(usuarioSalvo) : null;
    
    this.usuarioLogadoSubject = new BehaviorSubject<Cliente | null>(usuario);
    this.usuarioLogado$ = this.usuarioLogadoSubject.asObservable();
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
