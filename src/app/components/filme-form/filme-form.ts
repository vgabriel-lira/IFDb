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

  // Propriedades do formulário
  public titulo: string = '';
  public genero: string = '';
  public ano: number | null = null;
  public sinopse: string = '';
  public imagemUrl: string = '';

  // Alias para tratar (ngSubmit)="onSubmit()" do filme-form.html
  onSubmit(): void {
    this.salvarFilme();
  }

  async salvarFilme(): Promise<void> {
    if (!this.titulo || (!this.sinopse && !this.sinopse)) {
      alert('Por favor, preencha pelo menos o título e a descrição!');
      return;
    }

    const novoFilme = {
      titulo: this.titulo,
      descricao: this.sinopse,
      sinopse: this.sinopse,
      categoria: this.genero || 'Geral',
      genero: this.genero || 'Geral',
      ano: this.ano ? Number(this.ano) : 2026,
      imagemUrl: this.imagemUrl
    };

    await this.database.addFilmeSupabase(novoFilme);
    this.limparFormulario();
  }

  limparFormulario(): void {
    this.titulo = '';
    this.genero = '';
    this.ano = null;
    this.sinopse = '';
    this.imagemUrl = '';
  }
}