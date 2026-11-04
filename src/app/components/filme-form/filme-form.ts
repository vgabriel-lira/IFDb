import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Database } from '../../services/database';

@Component({
  selector: 'app-filme-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './filme-form.html'
})
export class FilmeForm {
  public database = inject(Database);

  public titulo: string = '';
  public genero: string = '';
  public ano: number = new Date().getFullYear();
  public sinopse: string = '';
  public imagemUrl: string = '';

  async onSubmit(): Promise<void> {
    if (!this.titulo || !this.genero || !this.ano) {
      alert('Por favor, preencha o título, gênero e ano!');
      return;
    }

    const novoFilme = {
      titulo: this.titulo,
      genero: this.genero,
      ano: Number(this.ano),
      sinopse: this.sinopse,
      imagemUrl: this.imagemUrl
    };

    const sucesso = await this.database.addFilmeSupabase(novoFilme);

    if (sucesso) {
      alert('Filme cadastrado com sucesso!');
      this.limparFormulario();
    }
  }

  limparFormulario(): void {
    this.titulo = '';
    this.genero = '';
    this.ano = new Date().getFullYear();
    this.sinopse = '';
    this.imagemUrl = '';
  }
}