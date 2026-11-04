import { Injectable, inject, signal } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { Filme } from '../models/filme';

export interface Cliente {
  id?: number;
  nome: string;
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class Database {
  private http = inject(HttpClient);

  public filmes = signal<Filme[]>([]);
  public isSaving = signal<boolean>(false);
  public usuarioLogado = signal<Cliente | null>(null);

  private get headers(): HttpHeaders {
    return new HttpHeaders({
      'apikey': environment.supabaseKey,
      'Authorization': `Bearer ${environment.supabaseKey}`,
      'Content-Type': 'application/json',
      'Prefer': 'return=representation'
    });
  }

  constructor() {
    this.carregarFilmes();
  }

  carregarFilmes(): void {
    const url = `${environment.supabaseRestUrl}/filmes?select=*`;
    this.http.get<Filme[]>(url, { headers: this.headers }).subscribe({
      next: (dados) => this.filmes.set(dados),
      error: (err) => console.error('Erro GET filmes:', err)
    });
  }

  addFilmeSupabase(novoFilme: Omit<Filme, 'id'>): Promise<boolean> {
    this.isSaving.set(true);
    const url = `${environment.supabaseRestUrl}/filmes`;

    return new Promise((resolve) => {
      this.http.post<Filme[]>(url, novoFilme, { headers: this.headers }).subscribe({
        next: (resposta) => {
          if (resposta && resposta.length > 0) {
            this.filmes.update((lista) => [...lista, resposta[0]]);
          } else {
            this.carregarFilmes();
          }
          this.isSaving.set(false);
          resolve(true);
        },
        error: (err) => {
          console.error('Erro POST filme:', err);
          this.isSaving.set(false);
          resolve(false);
        }
      });
    });
  }

  deleteFilmeSupabase(id: number): void {
    const url = `${environment.supabaseRestUrl}/filmes?id=eq.${id}`;
    this.http.delete(url, { headers: this.headers }).subscribe({
      next: () => this.filmes.update((lista) => lista.filter((f) => f.id !== id)),
      error: (err) => console.error('Erro DELETE filme:', err)
    });
  }

  cadastrarCliente(cliente: { nome: string; email: string; pass: string }): Promise<boolean> {
    this.isSaving.set(true);
    const url = `${environment.supabaseRestUrl}/clientes`;

    const payload = {
      nome: cliente.nome,
      email: cliente.email.trim().toLowerCase(),
      senha: cliente.pass
    };

    return new Promise((resolve) => {
      this.http.post(url, payload, { headers: this.headers }).subscribe({
        next: () => {
          alert('Conta criada com sucesso! Faça login para continuar.');
          this.isSaving.set(false);
          resolve(true);
        },
        error: (err) => {
          alert('Erro ao criar conta: ' + (err.error?.message || err.message));
          this.isSaving.set(false);
          resolve(false);
        }
      });
    });
  }

  fazerLogin(credenciais: { email: string; pass: string }): Promise<boolean> {
    this.isSaving.set(true);
    const emailFmt = credenciais.email.trim().toLowerCase();
    const url = `${environment.supabaseRestUrl}/clientes?email=ilike.${encodeURIComponent(emailFmt)}&senha=eq.${encodeURIComponent(credenciais.pass)}&select=*`;

    return new Promise((resolve) => {
      this.http.get<any[]>(url, { headers: this.headers }).subscribe({
        next: (resultado) => {
          this.isSaving.set(false);
          if (resultado && resultado.length > 0) {
            const cliente = resultado[0];
            this.usuarioLogado.set({
              id: cliente.id,
              nome: cliente.nome,
              email: cliente.email
            });
            alert(`Bem-vindo(a), ${cliente.nome}!`);
            resolve(true);
          } else {
            alert('E-mail ou palavra-passe incorretos.');
            resolve(false);
          }
        },
        error: (err) => {
          console.error('Erro no login:', err);
          this.isSaving.set(false);
          resolve(false);
        }
      });
    });
  }

  logout(): void {
    this.usuarioLogado.set(null);
  }
}