import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Database } from '../../services/database';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.html'
})
export class Login {
  public database = inject(Database);
  private router = inject(Router);

  public modoCriarConta = signal<boolean>(false);

  public nome: string = '';
  public email: string = '';
  public pass: string = '';

  toggleModo(): void {
    this.modoCriarConta.update((val) => !val);
    this.limparFormulario();
  }

  async onSubmit(): Promise<void> {
    if (!this.email || !this.pass) {
      alert('Por favor, preencha o e-mail e a palavra-passe!');
      return;
    }

    if (this.modoCriarConta()) {
      if (!this.nome) {
        alert('Por favor, informe o seu nome!');
        return;
      }

      const sucesso = await this.database.cadastrarCliente({
        nome: this.nome,
        email: this.email,
        pass: this.pass
      });

      if (sucesso) {
        this.modoCriarConta.set(false);
        this.limparFormulario();
      }
    } else {
      const sucesso = await this.database.fazerLogin({
        email: this.email,
        pass: this.pass
      });

      if (sucesso) {
        this.router.navigate(['/']);
      }
    }
  }

  limparFormulario(): void {
    this.nome = '';
    this.email = '';
    this.pass = '';
  }
}